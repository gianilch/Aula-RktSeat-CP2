import { Router } from "express";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import  multer  from "multer";

const categoriesRoute = Router();

const upload = multer({
  dest: "./tmp",
})

categoriesRoute.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoute.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoute.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handle(request, response);
})

export { categoriesRoute };
