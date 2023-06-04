import express from "express";
import controller from '../controllers/Customer';

const router = express.Router();

router.post('/', controller.createCustomer);
router.get('/:customerId', controller.readCustomer);
router.get('/', controller.readAll);
router.patch('/:customerId', controller.updateCustomer);
router.delete('/:customerId', controller.deleteCustomer);

export = router;