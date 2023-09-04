package database

import (
	"database/sql"
	"micro-wallet/internal/entity"

	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/suite"
)

type TransactionDBTestSuite struct {
	suite.Suite
	db            sql.DB
	client        *entity.Client
	client2       *entity.Client
	accountFrom   *entity.Account
	accountTo     *entity.Account
	transactionDB *TransactionDB
}

func (suite *TransactionDBTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	suite.Nil(err)
	suite.db = *db
	db.Exec("CREATE TABLE clients (id string, name string, email string, created_at date, updated_at date)")
	db.Exec("CREATE TABLE accounts (id string, client_id string, balance string, created_at date)")
	db.Exec("CREATE TABLE transactions (id string, account_id_from string, account_id_to string, amount float, created_at date)")
	suite.transactionDB = NewTransactionDB(*db)
}

func (suite *TransactionDBTestSuite) TearDownSuite() {
	defer suite.db.Close()
	suite.db.Exec("DROP TABLE clients")
	suite.db.Exec("DROP TABLE accounts")
	suite.db.Exec("DROP TABLE transactions")
}

func (s *TransactionDBTestSuite) TestCreate() {
	s.client, _ = entity.NewClient("John Doe", "john@j")
	s.client2, _ = entity.NewClient("Jane Doe", "jane@j")
	s.accountFrom = entity.NewAccount(s.client)
	s.accountTo = entity.NewAccount(s.client2)
	transaction, _ := entity.NewTransaction(s.accountFrom, s.accountTo, 100)
	s.transactionDB.Create(transaction)

	createdTransaction := &entity.Transaction{}
	s.db.QueryRow("SELECT * FROM transactions WHERE id = ?", transaction.ID).Scan(&createdTransaction.ID, &createdTransaction.AccountFrom.ID, &createdTransaction.AccountTo.ID, &createdTransaction.Amount, &createdTransaction.CreatedAt)
	s.Equal(transaction.ID, createdTransaction.ID)
	s.Equal(transaction.AccountFrom.ID, createdTransaction.AccountFrom.ID)
	s.Equal(transaction.AccountTo.ID, createdTransaction.AccountTo.ID)
	s.Equal(transaction.Amount, createdTransaction.Amount)
	s.Equal(transaction.CreatedAt, createdTransaction.CreatedAt)
}
