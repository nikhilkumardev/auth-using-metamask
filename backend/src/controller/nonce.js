
import { nonce as NonceService } from "../services/index.js";
export const createNonce = async (req, res) => {
    const {publicAddress} = req.params;
    console.log("hi", publicAddress);
    const query = { publicAddress };
    const nonce = `I am signing my one-time nonce: ${Date.now()}`;
    const updateObj = {
        publicAddress,
        nonce
    }
    try {
        const data = await NonceService.createNonce(query, updateObj);
        return res.status(200).json({
            message: `Nonce is successfully created!`,
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: `Error, while creating nonce!`,
            data: error
        }) 
    }
    
}

export default { createNonce };