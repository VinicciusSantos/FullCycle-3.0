package events

import "errors"

type EventDispatcher struct {
	handlers map[string][]EventHandlerInterface
}

func NewEventDispatcher() *EventDispatcher {
	return &EventDispatcher{
		handlers: make(map[string][]EventHandlerInterface),
	}
}

func (d *EventDispatcher) Register(eventName string, handler EventHandlerInterface) error {
	if _, ok := d.handlers[eventName]; ok {
		for _, h := range d.handlers[eventName] {
			if h == handler {
				return errors.New("handler already registered")
			}
		}
	}

	d.handlers[eventName] = append(d.handlers[eventName], handler)
	return nil
}

func (ed *EventDispatcher) Has(eventName string, handler EventHandlerInterface) bool {
	if _, ok := ed.handlers[eventName]; ok {
		for _, h := range ed.handlers[eventName] {
			if h == handler {
				return true
			}
		}
	}
	return false
}

func (d *EventDispatcher) Clear() error {
	d.handlers = make(map[string][]EventHandlerInterface)
	return nil
}

func (d *EventDispatcher) Dispatch(event EventInterface) error {
	if handlers, ok := d.handlers[event.GetName()]; ok {
		for _, handler := range handlers {
			go handler.Handle(event)
		}
	}

	return nil
}

func (d *EventDispatcher) Remove(eventName string, handler EventHandlerInterface) error {
	if _, ok := d.handlers[eventName]; ok {
		for i, h := range d.handlers[eventName] {
			if h == handler {
				d.handlers[eventName] = append(d.handlers[eventName][:i], d.handlers[eventName][i+1:]...)
			}
		}
	}

	return nil
}