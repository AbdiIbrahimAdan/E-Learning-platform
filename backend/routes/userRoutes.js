import express from 'express';
import { getAllUsers, getUserById, updateUserRole, deleteUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', protect, admin, getAllUsers);

router.get('/:id', protect, getUserById);
router.put('/:id/role', protect, admin, updateUserRole);
router.delete('/:id', protect, admin, deleteUser);

export default router;