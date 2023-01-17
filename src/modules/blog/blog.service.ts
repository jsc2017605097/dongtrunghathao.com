import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, Blog } from 'src/database/model';
import { Model } from 'mongoose';
import { ApiError } from 'src/common/api-response';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}
  async create(createBlogDto: CreateBlogDto, admin) {
    const blog = {
      title: createBlogDto.title,
      content: createBlogDto.content,
      blogPhotoUrl: createBlogDto.blogPhotoUrl,
      createdBy: admin._id,
      updatedBy: admin._id,
    };
    const newBlog = await this.blogModel.create(blog);
    return newBlog;
  }

  async findAll() {
    return await this.blogModel
      .find({ isDeleted: false })
      .skip(0)
      .limit(10)
      .sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    return await this.blogModel.findOne({ _id: id });
  }

  async update(id: string, updateBlogDto: UpdateBlogDto, admin: Admin) {
    const blog = {
      ...updateBlogDto,
      updatedBy: admin['_id'],
    };
    const updateBlog = await this.blogModel.findOneAndUpdate(
      { _id: id },
      blog,
      { new: true },
    );
    if (!updateBlog) throw new ApiError('blog ID is invalid');
    return updateBlog;
  }

  async remove(id: string) {
    return await this.blogModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true },
    );
  }
}
