import express from "express";
import auth from "../middleware/auth.js";
import { getAnnunci, creaAnnuncio } from "../controllers/annunciController.js";

const router = express.Router();

// Accetta sia /api/annunci che /api/annunci/
router.get("/", getAnnunci);
router.get("", getAnnunci);

// Accetta sia /api/annunci che /api/annunci/ (Evita il blocco CORS del Preflight)
router.post("/", auth, creaAnnuncio);
router.post("", auth, creaAnnuncio);

export default router;

