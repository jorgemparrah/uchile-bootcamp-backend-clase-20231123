import { SetMetadata } from "@nestjs/common";

export const CLAVE = 'EJEMPLO';
export const Ejemplo = (...params: string[]) => SetMetadata(CLAVE, params);