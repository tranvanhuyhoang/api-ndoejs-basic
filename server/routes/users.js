import express from 'express';
import {verify} from '../auth/checkToken';
import { createUser, userLogin, checkToken } from '../controllers/users';

const router = express.Router();
router.post('/register', createUser);
router.post('/login', userLogin);
router.post('/', verify, checkToken);

export default router;

