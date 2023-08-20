package application_test

import (
	"fmt"
	"testing"

	uuid "github.com/satori/go.uuid"
	"github.com/stretchr/testify/require"
	"github.com/vinicciussantos/arquitetura-hexagonal/application"
)	

func TestProductEnable(t *testing.T) {
	product := application.Product{
		Name: "Test",
		Status: application.DISABLED,
		Price: 10.0,
	}

	err := product.Enable()
	require.Nil(t, err)
	
	product.Price = 0
	err = product.Enable()
	require.Equal(t, "The price must be greater than zero to enable the product", err.Error())
}

func TestProductDisable(t *testing.T) {
	product := application.Product{
		Name: "Test",
		Status: application.ENABLED,
		Price: 0,
	}

	err := product.Disable()
	require.Nil(t, err)
	
	product.Price = 10
	err = product.Disable()
	require.Equal(t, "The price must be zero to disable the product", err.Error())
}

func TestProductIsValid(t *testing.T) {
	product := application.Product{
		ID: uuid.NewV4().String(), 
		Name: "Test",
		Status: application.DISABLED,
		Price: 10.0,
	}

	fmt.Println(product)

	_, err := product.IsValid()
	require.Nil(t, err)
	
	product.Status = "invalid"
	_, err = product.IsValid()
	require.Equal(t, "The status must be enabled or disabled", err.Error())

	product.Status = application.ENABLED
	_, err = product.IsValid()
	require.Nil(t, err)

	product.Status = application.ENABLED
	product.Price = -10
	_, err = product.IsValid()
	require.Equal(t, "The price must be greater than zero", err.Error())
}