import redis from 'redis'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '@shared/errors/AppError';



const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379
})

const Limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 5, 
  duration: 5
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void>{
  try {
    await Limiter.consume(request.ip);
    
    return next()
  } catch (err){
    throw new AppError("To many requests", 429)
  }
}