import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from 'mongodb';
import { Model } from 'mongoose';
import { LoginDTO } from './dto/login.dto';
import { ApiError } from 'src/common/api-response';
import { Utils } from 'src/common/utils';
import { AdminDocument } from 'src/database/model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
  ) {}

  async login(loginDTO: LoginDTO) {
    const { username, password } = loginDTO;
    const admin = await this.adminModel.findOne({ username });
    if (!admin) throw new ApiError('User name is invalid');
    const pw = await Utils.decrypt(password, admin.password);
    if (!pw) throw new ApiError('Password is invalid');
    const payload = {
      username,
      nickname: admin.nickname,
      id: admin._id,
    };
    const signData = await this.jwtService.signAsync(payload);
    return signData;
  }
}
