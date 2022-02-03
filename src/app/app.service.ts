import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto, UserUpdateDto } from 'src/app/dto/user.dto';
import { IQuery } from 'src/app/interface/query.interface';
import { User, UserDocument } from 'src/app/schema/app.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModul: Model<UserDocument>) {}

  async getAll(
    LIMIT: number = 10,
    PAGE: number = 1,
    obj: IQuery = {},
  ): Promise<Object> {
    try {
      obj.limit = null;
      obj.page = null;

      //convert all values to regexp values
      this.ForQuery(obj);

      let total_page = Math.ceil(
        (await this.userModul.countDocuments(obj).exec()) / LIMIT,
      );
      let data = await this.userModul
        .find(obj, null, { skip: (PAGE - 1) * LIMIT, limit: LIMIT })
        .exec();

      return { data, page: { total_page, LIMIT, PAGE } };
    } catch (xato) {
      console['log'](xato);
    }
  }

  async create(userDto: UserDto): Promise<User> {
    try {
      const newUser = new this.userModul(userDto);
      let res = await newUser.validate();
      console['log']('yangi user validatsiyasi: ', res);

      return newUser.save();
    } catch (xato) {
      console['log'](xato);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return this.userModul.findByIdAndRemove(id);
    } catch (xato) {
      console['log'](xato);
    }
  }

  async update(id: string, userDto: UserUpdateDto): Promise<User> {
    try {
      return this.userModul.findByIdAndUpdate(id, userDto);
    } catch (xato) {
      console['log'](xato);
    }
  }

  async UserAddPost(userId: string, postId: string) {
    try {
      await this.userModul.updateOne(
        { _id: userId },
        {
          $push: {
            posts: postId,
          },
        },
      );
    } catch (xato) {
      console['log'](xato);
    }
  }

  ForQuery(obj: IQuery) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (!value || key === '_id') continue;
        obj[key] = new RegExp(
          value.replace(/[^a-z0-9]/gi, (e: string) => '\\' + e),
          'gi',
        );
      }
    }
  }
}
