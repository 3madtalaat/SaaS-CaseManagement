import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

type RequestWithUser = Request & { user?: JwtPayload };

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: 'Server configuration error' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === 'string') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    (req as RequestWithUser).user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Forbidden' });
  }
}
