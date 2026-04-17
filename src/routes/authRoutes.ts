import { Router } from 'express';
import { signUp,LogIn } from '../controller/authController';

const router = Router();

router.post('/signup', signUp);
router.post('/login', LogIn);

export default router;