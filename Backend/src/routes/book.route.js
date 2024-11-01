import { Router } from 'express';

import {
    createBookController,
    findAllBooksController,
    deleteBookController,
    addBookToAuthorController
} from '../controllers/book.controller.js';

const bookRouter = Router();

bookRouter.post('/create', createBookController);
bookRouter.get('/books', findAllBooksController);
bookRouter.delete('/:id', deleteBookController);
bookRouter.put('/:bookId/:authorId', addBookToAuthorController);

export { bookRouter };