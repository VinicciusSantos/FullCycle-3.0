package cli_test

import (
	"fmt"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/require"
	"github.com/vinicciussantos/arquitetura-hexagonal/adapters/cli"
	mock_application "github.com/vinicciussantos/arquitetura-hexagonal/application/mocks"
)

func TestRun(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	productName := "Product 1"
	productPrice := 10.0
	productStatus := "enabled"
	productId := "abc"

	product := mock_application.NewMockProductInterface(ctrl)
	product.EXPECT().GetID().Return(productId).AnyTimes()
	product.EXPECT().GetName().Return(productName).AnyTimes()
	product.EXPECT().GetPrice().Return(productPrice).AnyTimes()
	product.EXPECT().GetStatus().Return(productStatus).AnyTimes()

	service := mock_application.NewMockProductServiceInterface(ctrl)
	service.EXPECT().Create(productName, productPrice).Return(product, nil).AnyTimes()
	service.EXPECT().Get(productId).Return(product, nil).AnyTimes()
	service.EXPECT().Enable(gomock.Any()).Return(true, nil).AnyTimes()
	service.EXPECT().Disable(gomock.Any()).Return(true, nil).AnyTimes()

	resultExpected := fmt.Sprintf("Product ID %s with the name %s has been created with the price %f and status %s", product.GetID(), product.GetName(), product.GetPrice(), product.GetStatus())
	result, err := cli.Run(service, "create", "", productName, productPrice)
	require.Nil(t, err)
	require.Equal(t, resultExpected, result)

	resultExpected = fmt.Sprintf("Product %s has been enabled", product.GetName())
	result, err = cli.Run(service, "enable", productId, "", 0)
	require.Nil(t, err)
	require.Equal(t, resultExpected, result)

	resultExpected = fmt.Sprintf("Product %s has been disabled", product.GetName())
	result, err = cli.Run(service, "disable", productId, "", 0)
	require.Nil(t, err)
	require.Equal(t, resultExpected, result)

	resultExpected = fmt.Sprintf("Product ID: %s\nName: %s\nStatus: %s\nPrice: %f", product.GetID(), product.GetName(), product.GetStatus(), product.GetPrice())
	result, err = cli.Run(service, "", productId, "", 0)
	require.Nil(t, err)
	require.Equal(t, resultExpected, result)
}
