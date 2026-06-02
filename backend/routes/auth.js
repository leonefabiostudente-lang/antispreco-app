import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Rotte per la registrazione (con e senza slash)
router.post('/register', register);
router.post('/register/', register);

// Rotte per il login (con e senza slash)
router.post('/login', login);
router.post('/login/', login);

export default router;

