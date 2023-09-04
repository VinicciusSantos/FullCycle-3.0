package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateAccount(t *testing.T) {
	client, _ := NewClient("John Doe", "a@a")
	account := NewAccount(client)
	assert.NotNil(t, account)
	assert.Equal(t, client, account.Client)
	assert.Equal(t, 0.0, account.Balance)
}

func TestCreateAccountNilClient(t *testing.T) {
	account := NewAccount(nil)
	assert.Nil(t, account)
}

func TestAccount_Credit(t *testing.T) {
	client, _ := NewClient("John Doe", "a@a")
	account := NewAccount(client)
	account.Credit(100)
	assert.Equal(t, 100.0, account.Balance)
}

func TestAccount_Debit(t *testing.T) {
	client, _ := NewClient("John Doe", "a@a")
	account := NewAccount(client)
	account.Credit(100)
	account.Debit(50)
	assert.Equal(t, 50.0, account.Balance)
}