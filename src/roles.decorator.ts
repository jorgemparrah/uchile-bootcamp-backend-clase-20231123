import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';
export const Roles = (...params: string[]) => SetMetadata(ROLES_KEY, params);