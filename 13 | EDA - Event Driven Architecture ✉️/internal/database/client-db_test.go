package database

import (
	"database/sql"
	"fmt"
	"micro-wallet/internal/entity"
	"testing"

	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/suite"
)

type ClientDbTestSuite struct {
	suite.Suite
	db *sql.DB
	clientDB *ClientDB
}

func (s *ClientDbTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	s.Nil(err)
	s.db = db
	db.Exec("CREATE TABLE clients (id string, name string, email string, created_at date, updated_at date)")
	s.clientDB = NewClientDB(db)
}

func (s *ClientDbTestSuite) TearDownSuite() {
	defer s.db.Close()
	s.db.Exec("DROP TABLE clients")
}

func TestClientDb(t *testing.T) {
	suite.Run(t, new(ClientDbTestSuite))
}

func (s *ClientDbTestSuite) TestGet() {
	client, _  := entity.NewClient("John Doe","j@mail.com")
	s.clientDB.Save(client)
	
	clientFromDB, err := s.clientDB.Get(client.ID)
	if err != nil {
		fmt.Println(err)
	}
	s.Equal(client.ID, clientFromDB.ID)
	s.Equal(client.Name, clientFromDB.Name)
	s.Equal(client.Email, clientFromDB.Email)
}
