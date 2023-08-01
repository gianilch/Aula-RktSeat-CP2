import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/", ensureAuthenticated, devolutionRentalController.handle);

export { rentalRoutes };
