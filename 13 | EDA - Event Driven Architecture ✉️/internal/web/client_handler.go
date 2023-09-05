package web

import (
	"encoding/json"
	"micro-wallet/internal/usecase/create_client"
	"net/http"
)

type WebClientHandler struct {
	CreateClientUsecase create_client.CreateClientUseCase
}

func NewWebClientHandler(createClientUsecase create_client.CreateClientUseCase) *WebClientHandler {
	return &WebClientHandler{
		CreateClientUsecase: createClientUsecase,
	}
}

func (h *WebClientHandler) CreateClient(w http.ResponseWriter, r *http.Request) {
	var inputDto create_client.CreateClientInputDto
	err := json.NewDecoder(r.Body).Decode(&inputDto)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	outputDto, err := h.CreateClientUsecase.Execute(&inputDto)
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
