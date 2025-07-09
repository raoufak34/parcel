import express from 'express';
import * as controller from '../controllers/parcelController';

const router = express.Router();

router.post('/', controller.create);
router.get('/search/tracking', controller.findByTrackingNumber);
router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/track/:tracking_number', controller.findByTrackingNumber);
router.get('/status/:status', controller.findByStatus); 




export default router;
