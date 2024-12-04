import { Router } from "express";
import { addContactPost, getContactsByAlias, listReceivedMessages, sentMessage } from "../controller/mensajeria.controler";

const router = Router();    

router.get("/mensajeria/contactos",getContactsByAlias);
router.post("/mensajeria/contactos",addContactPost);
router.post("/mensajeria/enviar",sentMessage);
router.get("/mensajeria/recibidos",listReceivedMessages)
//router.post("/mensajeria/contactos", makePayment);
//router.get("/mensajeria/historial", getHistory);
// router.get("/mensajeria/recibidos")
export default router;
