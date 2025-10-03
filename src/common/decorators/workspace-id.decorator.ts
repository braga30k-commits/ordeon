import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const WorkspaceId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.workspaceId || "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"; // Default for testing purposes
});
