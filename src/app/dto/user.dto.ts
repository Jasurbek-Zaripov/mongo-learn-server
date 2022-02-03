export class UserDto {
  private readonly first_name: string;
  private readonly last_name: string;
  private readonly gender: string;
  private readonly email: string;
  private readonly birth: string;
  private readonly contact: string;
}

export class UserUpdateDto {
  private readonly first_name?: string;
  private readonly last_name?: string;
  private readonly contact?: string;
  private readonly email?: string;
}
