import { Router } from 'express';
import { createItem, deleteItem, getMyItems, updateItem } from '../controller/itemController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/add', authenticate, createItem);
router.get('/my-items', authenticate, getMyItems);
router.put('/update/:id', authenticate, updateItem);
router.delete('/delete/:id', authenticate, deleteItem);

export default router;