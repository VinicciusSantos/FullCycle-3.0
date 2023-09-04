package createtransaction

import (
	"micro-wallet/internal/entity"
	"micro-wallet/internal/gateway"
)

type CreateTransactionInputDto struct {
	AccountIDFrom string
	AccountIDTo   string
	Amount        float64
}

type CreateTransactionOutputDto struct {
	ID            string
}

type CreateTransactionUseCase struct {
	transactionGateway gateway.TransactionGateway
	accountGateway     gateway.AccountGateway
}

func NewCreateTransactionUseCase(transactionGateway gateway.TransactionGateway, accountGateway gateway.AccountGateway) *CreateTransactionUseCase {
	return &CreateTransactionUseCase{
		transactionGateway: transactionGateway,
		accountGateway:     accountGateway,
	}
}

func (uc *CreateTransactionUseCase) Execute(inputDto *CreateTransactionInputDto) (*CreateTransactionOutputDto, error) {
	accountFrom, err := uc.accountGateway.FindByID(inputDto.AccountIDFrom)
	if err != nil {
		return nil, err
	}
	accountTo, err := uc.accountGateway.FindByID(inputDto.AccountIDTo)
	if err != nil {
		return nil, err
	}
	transaction, err := entity.NewTransaction(accountFrom, accountTo, inputDto.Amount)
	if err != nil {
		return nil, err
	}
	err = uc.transactionGateway.Create(transaction)
	if err != nil {
		return nil, err
	}
	return &CreateTransactionOutputDto{
		ID: transaction.ID,
	}, nil
}