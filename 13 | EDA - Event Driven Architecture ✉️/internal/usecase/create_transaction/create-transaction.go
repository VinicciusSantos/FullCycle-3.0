package create_transaction

import (
	"micro-wallet/internal/entity"
	"micro-wallet/internal/gateway"
	"micro-wallet/pkg/events"
)

type CreateTransactionInputDto struct {
	AccountIDFrom string `json:"account_id_from"`
	AccountIDTo   string `json:"account_id_to"`
	Amount        float64 `json:"amount"`
}

type CreateTransactionOutputDto struct {
	ID string `json:"id"`
}

type CreateTransactionUseCase struct {
	transactionGateway gateway.TransactionGateway
	accountGateway     gateway.AccountGateway
	eventDispatcher    events.EventDispatcherInterface
	transactionCreated events.EventInterface
}

func NewCreateTransactionUseCase(
	transactionGateway gateway.TransactionGateway,
	accountGateway gateway.AccountGateway,
	eventDispatcher events.EventDispatcherInterface,
	transactionCreated events.EventInterface,
) *CreateTransactionUseCase {
	return &CreateTransactionUseCase{
		transactionGateway: transactionGateway,
		accountGateway:     accountGateway,
		eventDispatcher:    eventDispatcher,
		transactionCreated: transactionCreated,
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

	err = uc.accountGateway.UpdateBalance(accountFrom)
	if err != nil {
		return nil, err
	}

	err = uc.accountGateway.UpdateBalance(accountTo)
	if err != nil {
		return nil, err
	}

	err = uc.transactionGateway.Create(transaction)
	if err != nil {
		return nil, err
	}

	output := &CreateTransactionOutputDto{
		ID: transaction.ID,
	}

	uc.transactionCreated.SetPayload(output)
	uc.eventDispatcher.Dispatch(uc.transactionCreated)

	return output, nil
}
