import { Router } from 'express';
import { createItem, getMyItems } from '../controller/itemController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/add', authenticate, createItem);
router.get('/my-items', authenticate, getMyItems);

export default router;