import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectID } from 'mongodb';
import { FilterQuery, Model } from 'mongoose';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostDocument } from './post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<PostDocument>) {}

  async findAll(query: any) {
    const filters: FilterQuery<PostDocument> = query.startId
      ? {
          _id: {
            $gt: query.startId,
          },
        }
      : {};

    if (query.search) {
      filters.$text = {
        $search: query.search,
      };
    }

    const findQuery = this.postModel.find(filters).sort({ _id: 'DESC' });
    const findedPosts = await findQuery;
    return { posts: findedPosts };
  }

  async findOne(postId: typeof ObjectID) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new HttpException('Post does not exist', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async create(createPostDto: CreatePostDto) {
    const post = new this.postModel(createPostDto);
    return await post.save();
  }

  async update(postId: typeof ObjectID, updatePostDto: UpdatePostDto) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new HttpException('Post does not exist', HttpStatus.NOT_FOUND);
    }
    Object.assign(post, updatePostDto);
    return await post.save();
  }

  async delete(postId: typeof ObjectID) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new HttpException('Post does not exist', HttpStatus.NOT_FOUND);
    }
    return await post.delete();
  }
  buildPostResponse(post: PostDocument) {
    return { post };
  }
}
