import express from 'express'
import { Request, Response, NextFunction } from 'express'
import "express-async-errors"
import { routes } from './routes';
import swaggerUi from 'swagger-ui-express'
import 'reflect-metadata'
import 'dotenv/config'

import createConneciton from './typeorm'

import swaggerFle  from '../../../swagger.json'

import './typeorm'

import '@shared/container'
import { AppError } from '@shared/errors/AppError';
import upload from '@config/upload';

createConneciton()
const app = express();

app.use(express.json())
    
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFle))

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))


app.use(routes)

app.use((err: Error, request: Request, response: Response, next:NextFunction) =>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
            
        })
        
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server Error - ${err.message}`
    })
})

export { app }