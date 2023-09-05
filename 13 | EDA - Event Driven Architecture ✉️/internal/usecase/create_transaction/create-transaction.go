package create_transaction

import (
	"context"
	"micro-wallet/internal/entity"
	"micro-wallet/internal/gateway"
	"micro-wallet/pkg/events"
	"micro-wallet/pkg/uow"
)

type CreateTransactionInputDto struct {
	AccountIDFrom string `json:"account_id_from"`
	AccountIDTo   string `json:"account_id_to"`
	Amount        float64 `json:"amount"`
}

type CreateTransactionOutputDto struct {
	ID string `json:"id"`
	AccountIDFrom string `json:"account_id_from"`
	AccountIDTo   string `json:"account_id_to"`
	Amount        float64 `json:"amount"`
}

type CreateTransactionUseCase struct {
	uow uow.UowInterface
	eventDispatcher    events.EventDispatcherInterface
	transactionCreated events.EventInterface
}

func NewCreateTransactionUseCase(
	uow uow.UowInterface,
	eventDispatcher events.EventDispatcherInterface,
	transactionCreated events.EventInterface,
) *CreateTransactionUseCase {
	return &CreateTransactionUseCase{
		uow: uow,
		eventDispatcher:    eventDispatcher,
		transactionCreated: transactionCreated,
	}
}

func (uc *CreateTransactionUseCase) Execute(ctx context.Context, inputDto CreateTransactionInputDto) (*CreateTransactionOutputDto, error) {
	output := &CreateTransactionOutputDto{}
	err := uc.uow.Do(ctx, func(_ *uow.Uow) error {
		accountRepository := uc.getAccountReposiitory(ctx)
		transactionRepository := uc.getTransactionReposiitory(ctx)

		accountFrom, err := accountRepository.FindByID(inputDto.AccountIDFrom)
		if err != nil {
			return err
		}
		accountTo, err := accountRepository.FindByID(inputDto.AccountIDTo)
		if err != nil {
			return err
		}
		transaction, err := entity.NewTransaction(accountFrom, accountTo, inputDto.Amount)
		if err != nil {
			return err
		}
	
		err = accountRepository.UpdateBalance(accountFrom)
		if err != nil {
			return err
		}
	
		err = accountRepository.UpdateBalance(accountTo)
		if err != nil {
			return err
		}
	
		err = transactionRepository.Create(transaction)
		if err != nil {
			return err
		}
	
		output.ID = transaction.ID
		output.Amount = transaction.Amount
		output.AccountIDFrom = transaction.AccountFrom.ID
		output.AccountIDTo = transaction.AccountTo.ID
		return nil
	})

	if err != nil {
		return nil, err
	}

	uc.transactionCreated.SetPayload(output)
	uc.eventDispatcher.Dispatch(uc.transactionCreated)

	return output, nil
}

func (uc *CreateTransactionUseCase) getAccountReposiitory(ctx context.Context) gateway.AccountGateway {
	repo, err := uc.uow.GetRepository(ctx, "AccountDB")
	if err != nil {
		panic(err)
	}
	return repo.(gateway.AccountGateway)
}

func (uc *CreateTransactionUseCase) getTransactionReposiitory(ctx context.Context) gateway.TransactionGateway {
	repo, err := uc.uow.GetRepository(ctx, "TransactionDB")
	if err != nil {
		panic(err)
	}
	return repo.(gateway.TransactionGateway)
}