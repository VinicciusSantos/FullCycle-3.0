package create_account

import (
	"micro-wallet/internal/entity"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type ClientGatewayMock struct {
	mock.Mock
}

func (m *ClientGatewayMock) Save(client *entity.Client) error {
	args := m.Called(client)
	return args.Error(0)
}

func (m *ClientGatewayMock) Get(id string) (*entity.Client, error) {
	args := m.Called(id)
	return args.Get(0).(*entity.Client), args.Error(1)
}

type AccountGatewayMock struct {
	mock.Mock
}

func (m *AccountGatewayMock) Save(account *entity.Account) error {
	args := m.Called(account)
	return args.Error(0)
}

func (m *AccountGatewayMock) FindByID(id string) (*entity.Account, error) {
	args := m.Called(id)
	return args.Get(0).(*entity.Account), args.Error(1)
}

func (m *AccountGatewayMock) UpdateBalance(account *entity.Account) error {
	args := m.Called(account)
	return args.Error(0)
}

func TestCreateAccount(t *testing.T) {
	mc := &ClientGatewayMock{}
	mc.On("Get", mock.Anything).Return(&entity.Client{
		ID:    "1",
		Name:  "John Doe",
	}, nil)

	ma := &AccountGatewayMock{}
	ma.On("Save", mock.Anything).Return(nil)

	uc := NewCreateAccountUseCase(ma, mc)
	inputDto := &CreateAccountInputDto{
		ClientID: "1",
	}
	outputDto, err := uc.Execute(inputDto)
	assert.Nil(t, err)
	assert.NotNil(t, outputDto)
	assert.NotEmpty(t, outputDto.ID)
	assert.Equal(t, inputDto.ClientID, outputDto.ID)
	mc.AssertExpectations(t)
	mc.AssertNumberOfCalls(t, "Get", 1)
}