import { SetMetadata } from "@nestjs/common";

export const PERMISOS_KEY = 'permisos';
export const Permisos = (...params: string[]) => SetMetadata(PERMISOS_KEY, params);