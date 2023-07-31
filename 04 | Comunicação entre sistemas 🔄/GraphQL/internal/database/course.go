package database

import "database/sql"

type Course struct {
	db *sql.DB
	ID string
	Name string
	Description string
}

func NewCourse(db *sql.DB) *Course {
	return &Course{db: db}
}

func (c *Course) Create(name string, description string) (Course, error)