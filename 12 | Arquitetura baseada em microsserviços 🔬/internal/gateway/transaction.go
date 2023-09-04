package gateway

import "micro-wallet/internal/entity"

type TransactionGateway interface {
	Create(transaction *entity.Transaction) error
}