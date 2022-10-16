import { IsEmpty, IsString } from 'class-validator';

export class CreateShortcutDto {
  @IsEmpty()
  creatorId: number;

  @IsString()
  title: string;

  @IsString()
  payload: string;
}
