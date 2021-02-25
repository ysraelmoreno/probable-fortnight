import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import ProductsController from '../controller/ProductsController'

const productsRouter = Router();

productsRouter.use(ensureAuthenticated)

const upload = multer(uploadConfig);
const productController = new ProductsController();

productsRouter.post('/', upload.single('video'), productController.create)
productsRouter.patch('/', upload.single('video'), productController.update)
export default productsRouter;
