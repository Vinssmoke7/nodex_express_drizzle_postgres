import { Router } from 'express';
import { getPets, getPetById, createPet, updatePet, deletePet } from '../controllers/pets.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticateToken);

router.get('/getPets', getPets);
router.get('/getPetById/:id', getPetById);
router.post('/createPet', createPet);
router.put('/updatePet/:id', updatePet);
router.delete('/deletePet/:id', deletePet);

export default router;