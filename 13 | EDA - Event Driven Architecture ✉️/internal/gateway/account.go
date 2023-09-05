package gateway

import "micro-wallet/internal/entity"

type AccountGateway interface {
	FindByID(id string) (*entity.Account, error)
	Save(account *entity.Account) error
	UpdateBalance(account *entity.Account) error
}