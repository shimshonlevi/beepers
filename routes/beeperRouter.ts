import express, { Router } from 'express';
import {createBeeper,getAllBeepers,getBeeperById,updateStatusBeeper,deleteBeeperById,getBeeperByStatus} from '../controllers/beepersController.js' 


const router: Router = express.Router();

router.route('/').post(createBeeper)
router.route('/').get(getAllBeepers);
router.route('/:id').get(getBeeperById);
router.route('/:id/status').put(updateStatusBeeper);
router.route('/:id').delete(deleteBeeperById)
router.route('/status/:status').get(getBeeperByStatus)

export default router;