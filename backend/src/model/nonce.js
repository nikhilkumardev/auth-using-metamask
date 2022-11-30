import mongoose from "mongoose";

export const nonceSchema = new mongoose.Schema({
    publicAddress: { type: String, trim: true, required: true, unique: true },
    nonce: { type: String, trim: true, required: true }
}, { timestamps: true });

export default mongoose.model( `users-nonce`, nonceSchema, `users-nonce`);