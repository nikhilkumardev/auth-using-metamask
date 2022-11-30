import { nonce as NonceModel } from '../model/index.js'

export const createNonce = async (query, updateObj) => {
    const response = await NonceModel.findOneAndUpdate(query, updateObj, { new: true, upsert: true });
    return response;
}
export const getNonce = async (query) => {
    const response = await NonceModel.findOne(query);
    return response;
}
export default { createNonce, getNonce };