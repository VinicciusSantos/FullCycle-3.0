package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNewClient(t *testing.T) {
	client, err := NewClient("John Doe", "j@mail.com")
	assert.Nil(t, err)
	assert.NotNil(t, client)
	assert.Equal(t, "John Doe", client.Name)
	assert.Equal(t, "j@mail.com", client.Email)
}

func TestNewClientError(t *testing.T) {
	client, err := NewClient("", "")
	assert.NotNil(t, err)
	assert.Nil(t, client)
}

func TestClient_Update(t *testing.T) {
	client, _ := NewClient("John Doe", "a")
	client.Update("John Doe updated", "b")
	assert.Equal(t, "b", client.Email)
	assert.Equal(t, "John Doe updated", client.Name)
}

func TestClient_InvalidUpdate(t *testing.T) {
	client, _ := NewClient("John Doe", "a")
	err := client.Update("", "b")
	assert.NotNil(t, err)
}

func TestClient_AddAccount(t *testing.T) {
	client, _ := NewClient("John Doe", "a")
	account := NewAccount(client)
	err := client.AddAccount(account)
	assert.Nil(t, err)
	assert.Equal(t, 1, len(client.Accounts))
}

