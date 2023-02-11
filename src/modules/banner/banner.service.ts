import {
    Injectable
}
from '@nestjs/common';
import {
    InjectModel
}
from '@nestjs/mongoose';
import {
    Model
}
from 'mongoose';
import {
    Banner
}
from 'src/database/model';
import {
    CreateBannerDto
}
from './dto/create-banner.dto';
import {
    UpdateBannerDto
}
from './dto/update-banner.dto';

@Injectable() export class BannerService {
    constructor(@InjectModel(Banner.name) private readonly bannerModel: Model<Banner > , ) {}
    async create(createBannerDto: CreateBannerDto) {
        return await this.bannerModel.create(createBannerDto)
    }

    async findAll() {
        return await this.bannerModel.find({ isDeleted: false });
    }

    findOne(id: number) {
        return `This action returns a #$ {
            id
        }
        banner`;
    }

    async update(id: string, updateBannerDto: UpdateBannerDto) {
        return await this.bannerModel.findOneAndUpdate({ _id: id }, { url: updateBannerDto.url }, { new: true });
    }

    async remove(id: string) {
        return await this.bannerModel.findOneAndUpdate({ _id: id }, { isDeleted:true }, { new: true });
    }
}
