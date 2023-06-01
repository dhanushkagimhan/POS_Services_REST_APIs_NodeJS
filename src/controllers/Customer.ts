import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Customer from "../models/Customer";

const createCustomer = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const customer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return customer.save().then((customer) => {
        res.status(201).json({ customer });
    }).catch((error) => {
        res.status(500).json({ error });
    })
};

const readCustomer = (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.params.customerId;

    return Customer.findById(customerId).then((customer) => {
        customer ? res.status(200).json({ customer }) : res.status(404).json({ message: 'Not found' })
    }).catch((error) => {
        res.status(500).json({ error });
    })
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Customer.find().then((customers) => {
        res.status(200).json({ customers })
    }).catch((error) => {
        res.status(500).json({ error });
    })
};

const updateCustomer = (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.params.customerId;

    return Customer.findById(customerId).then((customer) => {
        if (customer) {
            customer.set(req.body)
            return customer.save().then((customer) => {
                res.status(201).json({ customer });
            }).catch((error) => {
                res.status(500).json({ error });
            })
        }
        else {
            res.status(404).json({ message: 'Not found' })
        }
    }).catch((error) => {
        res.status(500).json({ error });
    })
};
const deleteCustomer = (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.params.customerId;

    return Customer.findByIdAndDelete(customerId).then((customer) => {
        customer ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })
    }).catch((error) => {
        res.status(500).json({ error });
    })
};

export default { createCustomer, readCustomer, readAll, updateCustomer, deleteCustomer }