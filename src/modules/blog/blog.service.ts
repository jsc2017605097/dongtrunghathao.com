import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, Blog, Category } from 'src/database/model';
import { Model } from 'mongoose';
import { ApiError } from 'src/common/api-response';
import { BlogListDTO } from './dto/get-blog-list.dto';
import { PAGINATION } from 'src/common/constant';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}
  async create(createBlogDto: CreateBlogDto, admin) {
    const category = await this.categoryModel.findOne({
      _id: createBlogDto.categoryId,
      isDeleted: false,
    });
    if (!category) throw new ApiError('CategoryId is invalid');

    const blog = {
      title: createBlogDto.title,
      content: createBlogDto.content,
      blogPhotoUrl: createBlogDto.blogPhotoUrl,
      createdBy: admin._id,
      updatedBy: admin._id,
      categoryId: createBlogDto.categoryId,
    };
    const newBlog = await this.blogModel.create(blog);
    return newBlog;
  }

  async findAll(blogListDTO: BlogListDTO) {
    const { categoryId, keyword } = blogListDTO;
    const query = { isDeleted: false };
    if (categoryId) query['categoryId'] = categoryId;
    if (keyword) query['title'] = { $regex: keyword, $options: 'i' };

    const result = await this.blogModel
      .find(query)
      .skip(blogListDTO.offset || PAGINATION.OFFSET)
      .limit(blogListDTO.limit || PAGINATION.LIMIT)
      .sort({ createdAt: -1 })
      .populate('categoryId')
      .populate('createdBy')
      .populate('updatedBy')
      .exec();
    const total = await this.blogModel.find(query).count();
    return { result, total };
  }

  async findOne(id: string) {
    return await this.blogModel.findOne({ _id: id }).populate('categoryId');
  }

  async update(id: string, updateBlogDto: UpdateBlogDto, admin: Admin) {
    const category = await this.categoryModel.findOne({
      _id: updateBlogDto.categoryId,
      isDeleted: false,
    });
    if (!category) throw new ApiError('CategoryId is invalid');

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
