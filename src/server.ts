import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import customerRoutes from "./routes/Customer";

const router = express();

mongoose.connect(config.mongo.url).then(() => {
    console.log("Conected database")
    startServer()
}).catch((error) => {
    console.log("Database connection issue : ", error)
})

const startServer = () => {
    router.use((req, res, next) => {
        console.log(`incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            console.log(`incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`)
        });

        next();
    })

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    })

    // Routers
    router.use('/customer', customerRoutes);

    // Health check
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }))

    router.use((req, res, next) => {
        const error = new Error('Not found');
        console.log(error);

        return res.status(404).json({ message: error.message });
    })

    http.createServer(router).listen(config.server.port, () => console.log(`server running port ${config.server.port}`))
}

