import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, Blog, Category } from 'src/database/model';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto, admin: Admin) {
    const category = {
      name: createCategoryDto.name,
      CategoryPhotoUrl: createCategoryDto.CategoryPhotoUrl,
      createdBy: admin['_id'],
      updatedBy: admin['_id'],
    };

    return await this.categoryModel.create(category);
  }

  async findAll() {
    return await this.categoryModel
      .find({ isDeleted: false })
      .populate('createdBy')
      .populate('updatedBy');
  }

  async findOne(_id: string) {
    return await await this.categoryModel.findOne({ _id });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, admin) {
    const category = {
      name: updateCategoryDto.name,
      CategoryPhotoUrl: updateCategoryDto.CategoryPhotoUrl,
      updatedBy: admin['_id'],
    };
    return await this.categoryModel.findOneAndUpdate({ _id: id }, category, {
      new: true,
    });
  }

  async remove(id: string, admin: Admin) {
    const category = await this.categoryModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true, updatedBy: admin['_id'] },
      {
        new: true,
      },
    );
    await this.blogModel.updateMany(
      { categoryId: category._id },
      { isDeleted: true },
      { new: false },
    );
    return true;
  }
}
