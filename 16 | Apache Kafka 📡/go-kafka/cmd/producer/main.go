package main

import (
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log"
)

func main() {
	deliveryChan := make(chan kafka.Event)
	producer := NewKafkaProducer()

	err := Publish("transferiu", "teste", producer, []byte("transferência"), deliveryChan)
	if err != nil {
		log.Println(err.Error())
	}
	go DeliveryReport(deliveryChan)
	producer.Flush(5000)
}

// NewKafkaProducer creates a new kafka producer
func NewKafkaProducer() *kafka.Producer {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers":   "go-kafka_kafka_1:9092",
		"delivery.timeout.ms": "0",
		"acks":                "all",
		"enable.idempotence":  "true",
	}
	p, err := kafka.NewProducer(configMap)
	if err != nil {
		log.Println(err.Error())
	}
	return p
}

// Publish publishes a message to a topic
func Publish(msg string, topic string, producer *kafka.Producer, key []byte, deliveryChan chan kafka.Event) error {
	message := &kafka.Message{
		Value:          []byte(msg),
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Key:            key,
	}
	err := producer.Produce(message, deliveryChan)
	if err != nil {
		return err
	}
	return nil
}

// DeliveryReport reports the delivery status of a message
func DeliveryReport(deliveryChan chan kafka.Event) {
	for e := range deliveryChan {
		switch ev := e.(type) {
		case *kafka.Message:
			if ev.TopicPartition.Error != nil {
				log.Println("Error sending message")
			} else {
				log.Println("Message sent:", ev.TopicPartition)
			}
		}
	}
}
