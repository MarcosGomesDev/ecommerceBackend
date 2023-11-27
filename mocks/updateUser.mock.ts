import { UpdatePasswordDTO } from 'src/user/dtos/updatePassword.dto';

export const updatePasswordMock: UpdatePasswordDTO = {
  lastPassword: 'root',
  newPassword: '1234567',
};

export const invalidUpdatePasswordMock: UpdatePasswordDTO = {
  lastPassword: 'asfasfasf',
  newPassword: '123',
};
