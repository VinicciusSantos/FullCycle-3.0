package database

import (
	"database/sql"
	"micro-wallet/internal/entity"
	"testing"

	"github.com/stretchr/testify/suite"
)

type AccountDbTestSuite struct {
	suite.Suite
	db       *sql.DB
	clientDB *ClientDB
	client   *entity.Client
}

func (s *AccountDbTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	s.Nil(err)
	s.db = db
	db.Exec("CREATE TABLE clients (id string, name string, email string, created_at date, updated_at date)")
	db.Exec("CREATE TABLE accounts (id string, client_id string, balance string, created_at date)")
	s.clientDB = NewClientDB(db)
	s.client, _ = entity.NewClient("John Doe", "j@a.com")
}

func (s *AccountDbTestSuite) TearDownSuite() {
	defer s.db.Close()
	s.db.Exec("DROP TABLE clients")
	s.db.Exec("DROP TABLE accounts")
}

func TestAccountDb(t *testing.T) {
	suite.Run(t, new(AccountDbTestSuite))
}

func (s *AccountDbTestSuite) TestSave() {
	account := entity.NewAccount(s.client)
	accountDB := NewAccountDB(s.db)
	err := accountDB.Save(account)
	s.Nil(err)
}

func (s *AccountDbTestSuite) TestFindById() {
	s.db.Exec("INSERT INTO clients(id, name, email, created_at, updated_at) VALUES(?,?,?,?,?)", s.client.ID, s.client.Name, s.client.Email, s.client.CreatedAt, s.client.UpdatedAt)

	account := entity.NewAccount(s.client)
	accountDB := NewAccountDB(s.db)
	accountDB.Save(account)
	accountFromDB, err := accountDB.FindById(account.ID)
	s.Nil(err)
	s.Equal(account.ID, accountFromDB.ID)
	s.Equal(account.Client.ID, accountFromDB.Client.ID)
	s.Equal(account.Balance, accountFromDB.Balance)
}