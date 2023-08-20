package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
	db2 "github.com/vinicciussantos/arquitetura-hexagonal/adapters/db"
	"github.com/vinicciussantos/arquitetura-hexagonal/application"
)

func main() {
	db, _ := sql.Open("sqlite3", "sqlite.db")	
	productDb := db2.NewProductDb(db)
	productService := application.NewProductService(productDb)
	productService.Create("Product 1", 10)
	
	product, _ := productService.Create("Product 1", 10)
	
}