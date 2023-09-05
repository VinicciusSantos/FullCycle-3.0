package main

import (
	"database/sql"
	"fmt"
	"micro-wallet/internal/database"
	"micro-wallet/internal/event"
	"micro-wallet/internal/usecase/create_account"
	"micro-wallet/internal/usecase/create_client"
	"micro-wallet/internal/usecase/create_transaction"
	"micro-wallet/internal/web"
	"micro-wallet/internal/web/webserver"
	"micro-wallet/pkg/events"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", "root", "root", "localhost", "3306", "wallet"))
	if err != nil {
		panic(err)
	}
	defer db.Close()

	eventDispatcher := events.NewEventDispatcher()
	transactionCreatedEvent := event.NewTransactionCreated()
	// eventDispatcher.Register("transaction.created", handler)

	clientDb := database.NewClientDB(db)
	accountDb := database.NewAccountDB(db)
	transactionDb := database.NewTransactionDB(db)

	createClientUsecase := create_client.NewCreateClientUseCase(clientDb)
	createAccountUsecase := create_account.NewCreateAccountUseCase(accountDb, clientDb)
	createTransactionUsecase := create_transaction.NewCreateTransactionUseCase(transactionDb, accountDb, eventDispatcher, transactionCreatedEvent)

	webServer := webserver.NewWebServer(":3000")
	clientHandler := web.NewWebClientHandler(*createClientUsecase)
	accountHandler := web.NewWebAccountHandler(*createAccountUsecase)
	transactionHandler := web.NewWebTransactionHandler(*createTransactionUsecase)

	webServer.AddHandler("/clients", clientHandler.CreateClient)
	webServer.AddHandler("/accounts", accountHandler.CreateAccount)
	webServer.AddHandler("/transactions", transactionHandler.CreateTransaction)

	webServer.Start()
}
