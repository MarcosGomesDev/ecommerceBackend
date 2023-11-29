import { Controller } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';

@Roles(UserType.User)
@Controller('cart')
export class CartController {}
