import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';

// NOTE: https://github.com/typestack/class-validator

enum CatBreed {
  PERSIAN = 'PERSIAN',
  SPHYNX = 'SPHYNX',
  SIAMESE = 'SIAMESE',
}

export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsInt()
  @Min(0)
  @Max(25)
  readonly age: number;

  @IsEnum(CatBreed)
  readonly breed: string;
}
