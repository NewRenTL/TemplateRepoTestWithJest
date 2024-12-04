import { Router } from "express";
import { getContacts, makePayment, getHistory } from "../controller/account.controler";

const router = Router();    

router.get("/billetera/contactos", getContacts);
router.get("/billetera/pagar", makePayment);
router.get("/billetera/historial", getHistory);

export default router;
