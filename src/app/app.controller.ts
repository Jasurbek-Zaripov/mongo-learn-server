import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserDto, UserUpdateDto } from 'src/app/dto/user.dto';
import { IQuery } from 'src/app/interface/query.interface';
import { AppService } from './app.service';

@Controller('api/users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll(@Query() query: IQuery) {
    return this.appService.getAll(query.limit, query.page, query);
  }

  @Post()
  create(@Body() userDto: UserDto) {
    this.appService.create(userDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userUpdateDto: UserUpdateDto) {
    this.appService.update(id, userUpdateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.remove(id);
  }
}
