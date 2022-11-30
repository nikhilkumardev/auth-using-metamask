
import { nonce as NonceService } from "../services/index.js";
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import jwt from 'jsonwebtoken'
export const login = async (req, res) => {
    try {
        const {publicAddress, signature} = req.body;
        const query = {
            publicAddress
        }
        const {nonce} = await NonceService.getNonce(query);
        const msgBufferHex = bufferToHex(Buffer.from(nonce, 'utf8'));
        const address = recoverPersonalSignature({
          data: msgBufferHex,
          signature,
        });
  
        if (address.toLowerCase() !== publicAddress.toLowerCase() && !userList.includes(publicAddress)) {
          return res.status(401).send({ message: 'Signature verification failed!' });
        }
        var token = jwt.sign({publicAddress}, 'msgBufferHex' , { expiresIn: '1h' });
        return res.status(200).json({
            message: `You have loged in successfully!`,
            data :{token, publicAddress}
        })
    } catch (error) {
        return res.status(500).json({
            message: `Error, while fetching nonce!`,
            data: error
        }) 
    }
    
}

export default { login };