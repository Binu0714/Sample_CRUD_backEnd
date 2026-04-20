import { Router } from 'express';
import { createItem, getMyItems, updateItem } from '../controller/itemController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/add', authenticate, createItem);
router.get('/my-items', authenticate, getMyItems);
router.put('/update/:id', authenticate, updateItem);

export default router;