import { Router } from "express";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";

import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureadmin";

const categoriesRoute = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoute.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoute.get("/", listCategoriesController.handle);

categoriesRoute.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated, ensureAdmin, importCategoryController.handle
);

export { categoriesRoute };
