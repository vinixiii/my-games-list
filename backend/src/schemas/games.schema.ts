import { z } from 'zod';

export const createGameSchema = z
  .object({
    name: z
      .string({
        required_error: 'O campo [name] é obrigatório',
        invalid_type_error: 'O campo [name] deve ser uma string',
      })
      .min(1, 'O campor [name] não deve ser vazio'),
    description: z
      .string({
        required_error: 'O campo [description] é obrigatório',
        invalid_type_error: 'O campo [description] deve ser uma string',
      })
      .min(1, 'O campor [description] não deve ser vazio'),
    developedBy: z
      .string({
        required_error: 'O campo [developedBy] é obrigatório',
        invalid_type_error: 'O campo [developedBy] deve ser uma string',
      })
      .min(1, 'O campor [developedBy] não deve ser vazio'),
    year: z
      .number({
        required_error: 'O campo [year] é obrigatório',
        invalid_type_error: 'O campo [year] deve ser um número',
      })
      .min(1, 'O campo [year] deve ser um número positivo'),
    minimumAge: z
      .number({
        required_error: 'O campo [minimumAge] é obrigatório',
        invalid_type_error: 'O campo [minimumAge] deve ser um número',
      })
      .min(1, 'O campo [year] deve ser um número positivo'),
  })
  .strict();
