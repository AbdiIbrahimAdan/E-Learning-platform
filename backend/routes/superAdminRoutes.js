import express from 'express';
import { protect, superAdmin } from '../middleware/authMiddleware.js';
import { getAllAdmins, deleteAdmin, promoteToAdmin } from '../controllers/superAdminController.js';

const router = express.Router();

// Get all admins (Super Admin only)
router.get('/admin-list', protect, superAdmin, getAllAdmins);

// Promote a user to Admin (Super Admin only)
router.put('/promote/:id', protect, superAdmin, promoteToAdmin);

// Delete an Admin (Super Admin only)
router.delete('/delete/:id', protect, superAdmin, deleteAdmin);

export default router;
