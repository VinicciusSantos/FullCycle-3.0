import express, { Request, Response } from "express";
import CreateCustomerUsecase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import { InputCreateCustomerDto } from "../../../usecase/customer/create/create.customer.dto";
import ListCustomersUseCase from "../../../usecase/customer/list/list.custumer.usecase";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUsecase(new CustomerRepository());
  try {
    const customerDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip,
      },
    };

    const output = await usecase.execute(customerDto);
    res.status(201).json(output);
  } catch (error) {
    res.status(500).json(error);
  }
});

customerRoute.get("/", async (_req: Request, res: Response) => {
  const usecase = new ListCustomersUseCase(new CustomerRepository());
  try {
    const output = await usecase.execute();
    res.format({
      json: async () => res.status(200).json(output),
      xml: async () => res.status(200).send(CustomerPresenter.listXML(output)),
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
