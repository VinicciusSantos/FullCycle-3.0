package application_test

import (
	"github.com/vinicciussantos/arquitetura-hexagonal/application"
	"testing"
	"github.com/stretchr/testify/require"
)	

func testProductEnable(t *testing.T) {
	product := application.Product{
		Price: 10.0,
	}

	err := product.Enable()
	require.Nil(t, err)
	require.Equal(t, application.ENABLED, product.Status)
}
