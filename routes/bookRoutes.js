import express from 'express';
import { addBook, editBook, deleteBook, getAllBooks } from '../controllers/booksController.js';
const router = express.Router();
router.route('/users/:userId').get(getAllBooks);
router.route('/').post(addBook);
router.route('/:id').put(editBook);
router.route('/:id').delete(deleteBook);
export default router;
