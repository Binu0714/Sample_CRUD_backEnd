import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized.No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload: any = jwt.verify(token, JWT_SECRET);

        req.user = { id: payload.id, ...payload };
        next();
    }catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ error: 'Unauthorized.Invalid or expired token' });
    }
}