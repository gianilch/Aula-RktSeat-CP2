import { Router } from "express";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import  multer  from "multer";

const categoriesRoute = Router();

const upload = multer({
  dest: "./tmp",
})

const createCategoryController = new CreateCategoryController();

categoriesRoute.post("/", createCategoryController.handle);

categoriesRoute.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoute.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handle(request, response);
})

export { categoriesRoute };
