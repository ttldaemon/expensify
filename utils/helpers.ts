import { IUser } from '@/models/user';
import jwt from 'jsonwebtoken';


export function generateToken(user: IUser): string {
  const payload = { _id: user._id } as jwt.JwtPayload
  const secret = process.env.JWT_SECRET as jwt.Secret
  const signInOptions = { expiresIn: process.env.JWT_EXPIRY || '3d' } as jwt.SignOptions

  return jwt.sign(payload, secret, signInOptions)
}