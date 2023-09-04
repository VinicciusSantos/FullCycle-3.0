package createclient

import (
	"micro-wallet/internal/entity"
	"micro-wallet/internal/gateway"
	"time"
)

type CreateClientInputDto struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type CreateClientOutputDto struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type CreateClientUseCase struct {
	ClientGateway gateway.ClientGateway
}

func NewCreateClientUseCase(clientGateway gateway.ClientGateway) *CreateClientUseCase {
	return &CreateClientUseCase{
		ClientGateway: clientGateway,
	}
}

func (uc *CreateClientUseCase) Execute(inputDto *CreateClientInputDto) (*CreateClientOutputDto, error) {
	client, err := entity.NewClient(inputDto.Name, inputDto.Email)
	if err != nil {
		return nil, err
	}
	err = uc.ClientGateway.Save(client)
	if err != nil {
		return nil, err
	}
	outputDto := &CreateClientOutputDto{
		ID:        client.ID,
		Name:      client.Name,
		Email:     client.Email,
		CreatedAt: client.CreatedAt,
		UpdatedAt: client.UpdatedAt,
	}
	return outputDto, nil
}