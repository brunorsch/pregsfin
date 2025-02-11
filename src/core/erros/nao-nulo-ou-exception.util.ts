import { HttpException } from '@nestjs/common';

export default function naoNuloOuException<T>(
  objeto: T | undefined | null,
  exception: HttpException,
): T {
  if (objeto === undefined || objeto === null) {
    throw exception;
  } else return objeto;
}
