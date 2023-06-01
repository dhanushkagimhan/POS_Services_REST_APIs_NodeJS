import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer {
    name: string;
}

export interface ICustomerModel extends ICustomer, Document { }

const CustomerSchema: Schema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ICustomerModel>('Customer', CustomerSchema)