import { Router } from 'express';
import { createItem } from '../controller/itemController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/add', authenticate, createItem);

export default router;