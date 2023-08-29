import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUsecase from "../../../usecase/product/list/list.product.usecase";
import CreateProductUsecase from "../../../usecase/product/create/create.product.usecase";
import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUsecase(new ProductRepository());
  try {
    const productDto: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
    };
    const output = await usecase.execute(productDto);
    res.status(201).json(output);
  } catch (error) {
    res.status(500).json(error);
  }
});

productRoute.get("/", async (_req: Request, res: Response) => {
  const usecase = new ListProductUsecase(new ProductRepository());
  try {
    const output = await usecase.execute();
    res.status(200).json(output);
  } catch (error) {
    res.status(500).json(error);
  }
});
