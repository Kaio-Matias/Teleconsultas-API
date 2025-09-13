import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

// CORREÇÃO: Exportando como uma função nomeada para ser explícito.
export async function authentication(req: Request, res: Response, next: NextFunction) {
  const authHeader: string | undefined = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }
  const token: string = req.header('Authorization');
  const jwtApp = await jwt.sign(
    {
      token: 'Bearer ' + token,
    },
    token,
  );
  try {
    const verified = await jwt.verify(jwtApp, 'Bearer ' + process.env.APP_SECRET);
    if (verified) {
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token Invalid', error });
  }
}

