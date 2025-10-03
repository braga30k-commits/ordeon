import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class WorkspaceMiddleware implements NestMiddleware {
  use(req: Request & { workspaceId?: string }, res: Response, next: NextFunction) {
    const workspaceId = req.header('x-workspace-id');
    if (!workspaceId) {
      throw new BadRequestException('x-workspace-id header is required');
    }
    req.workspaceId = workspaceId;
    next();
  }
}
