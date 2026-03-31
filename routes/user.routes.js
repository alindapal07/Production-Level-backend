import {Router} from 'express';
import { getUserById,getAllUsers,deleteUser } from '../controllers/user.controller.js';
import { authorize } from '../middleware/auth.middleware.js';
import authorizeByRole from '../middleware/role.middleware.js';
const userRouter = Router ();

userRouter .get('/',authorize,authorizeByRole("admin"), getAllUsers);
userRouter .get('/:id',authorize,authorizeByRole("admin","user") getUserById);
userRouter .post('/', (req,res)=> res.send ({title : 'Create a new user'}));
userRouter .put('/:id', (req,res)=> res.send ({title : 'Update user details'}));
userRouter .delete('/:id',authorize,authorizeByRole("admin"), deleteUser);

export default userRouter ;