package web

import (
	"encoding/json"
	"micro-wallet/internal/usecase/create_account"
	"net/http"
)

type WebAccountHandler struct {
	CreateAccountUsecase create_account.CreateAccountUseCase
}

func NewWebAccountHandler(createAccountUsecase create_account.CreateAccountUseCase) *WebAccountHandler {
	return &WebAccountHandler{
		CreateAccountUsecase: createAccountUsecase,
	}
}

func (h *WebAccountHandler) CreateAccount(w http.ResponseWriter, r *http.Request) {
	var inputDto create_account.CreateAccountInputDto
	err := json.NewDecoder(r.Body).Decode(&inputDto)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	outputDto, err := h.CreateAccountUsecase.Execute(&inputDto)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(outputDto)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
