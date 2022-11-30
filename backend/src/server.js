import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config.js';
import mainRoutes from './routes/index.js';

const app = express();
app.use(express.json());
app.use(cors());
app.on('db-connected', function() { 
    app.listen(config.PORT, function(){ 
        console.log(`Server started on PORT ${config.PORT} `)
    }); 
}); 

app.use('/api/v1', mainRoutes);

app.get('/',(req,res)=>{
    return res.status(200).json({a:5})
});

const initApp = async () => {
    try {
        // Connection With DB
        mongoose.connect(config.mongoURI, config.mongoOptions);
        mongoose.connection.once('open', function() { 
            console.log(`Mongoose default connection is open to ${config.mongoURI}`);
            app.emit('db-connected'); 
        });
    } catch (err) {
        console.log(`Mongoose default connection has occurred ${err} error`);
        initApp();
    }
}

await initApp();
