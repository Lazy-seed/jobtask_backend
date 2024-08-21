import { Router } from 'express';
import { createJob, getAllJobs, deleteJob } from '../controllers/jobController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/').post(protect, admin, createJob).get(getAllJobs);
router.route('/:id').delete(protect, admin, deleteJob);

export default router;
