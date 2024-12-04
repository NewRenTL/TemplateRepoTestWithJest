import { Router } from "express";
import accountRoutes from "./account.routes";
import mensajeriaRoutes from "./mensajeria.routes"

const router = Router();

router.use("/accounts", accountRoutes);
router.use("/message",mensajeriaRoutes)

export default router;
