import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/database/model';
import { ApiError } from 'src/common/api-response';
import { Utils } from 'src/common/utils';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const { privateKey, password, username, nickname } = createAdminDto;
    if (privateKey !== process.env.PRIVATE_KEY)
      throw new ApiError('Private key is invalid');
    const hashKey = await Utils.encryptUserPassword(password);
    const admin = {
      username,
      nickname,
      password: hashKey,
    };
    return await this.adminModel.create(admin);
  }

  async findAll() {
    return await this.adminModel.find({}, { password: 0 });
  }

  async findOne(id: string) {
    return await this.adminModel.findOne({ _id: id }, { password: 0 });
  }

  async update(updateAdminDto: UpdateAdminDto, user) {
    const admin = await this.adminModel.findOne({ username: user.username });
    const pw = await Utils.decrypt(updateAdminDto.password, admin.password);
    if (!pw) throw new ApiError('Password is invalid');
    const updateUser = {
      username: updateAdminDto.username,
      nickname: updateAdminDto.nickname,
      password: await Utils.encryptUserPassword(updateAdminDto.newPassword),
    };
    const newAdmin = await this.adminModel.findOneAndUpdate(
      { _id: admin._id },
      updateUser,
      { new: true },
    );
    if (!newAdmin) throw new ApiError('User in invalid');
    return newAdmin;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
