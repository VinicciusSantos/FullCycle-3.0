package createaccount

import (
	"micro-wallet/internal/entity"
	"micro-wallet/internal/gateway"
)

type CreateAccountInputDto struct {
	ClientID string
}

type CreateAccountOutputDto struct {
	ID string
}

type CreateAccountUseCase struct {
	accountGateway gateway.AccountGateway
	clientGateway  gateway.ClientGateway
}

func NewCreateAccountUseCase(accountGateway gateway.AccountGateway, clientGateway gateway.ClientGateway) *CreateAccountUseCase {
	return &CreateAccountUseCase{
		accountGateway: accountGateway,
		clientGateway:  clientGateway,
	}
}

func (uc *CreateAccountUseCase) Execute(inputDto *CreateAccountInputDto) (*CreateAccountOutputDto, error) {
	client, err := uc.clientGateway.Get(inputDto.ClientID)
	if err != nil {
		return nil, err
	}
	account := entity.NewAccount(client)
	err = uc.accountGateway.Save(account)
	if err != nil {
		return nil, err
	}
	outputDto := &CreateAccountOutputDto{
		ID: account.ID,
	}
	return outputDto, nil
}