import express from 'express';
import { getAllUsers, getUserById, updateUserRole, deleteUser } from '../controllers/userController.js';
import { protect, admin, superAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', protect, admin, getAllUsers);

router.get('/:id', protect, getUserById);
router.put('/:id/role', protect, superAdmin, updateUserRole); 
router.delete('/:id', protect, superAdmin, deleteUser); 


export default router;