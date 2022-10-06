import { Router } from "express";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";

import multer from "multer";

const categoriesRoute = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoute.post("/", createCategoryController.handle);

categoriesRoute.get("/", listCategoriesController.handle);

categoriesRoute.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoute };
