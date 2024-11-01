import { Router } from 'express';
import {
    createAuthorController,
    getAuthorsController,
    assingBookToAuthorController,
    deleteAuthorController
} from '../controllers/author.controller.js';

const authorRouter = Router();

authorRouter.post('/create', createAuthorController);
authorRouter.get('/authors', getAuthorsController);
authorRouter.put('/:authorId/:bookId', assingBookToAuthorController);
authorRouter.delete('/:id', deleteAuthorController);

export { authorRouter };