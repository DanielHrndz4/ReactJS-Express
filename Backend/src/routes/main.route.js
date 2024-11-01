import {bookRouter} from './book.route.js';
import {authorRouter}  from './author.route.js';
import { Router } from 'express';

const mainRouter = Router();

mainRouter.use('/book', bookRouter);
mainRouter.use('/author', authorRouter);

export { mainRouter };

