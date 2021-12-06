import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostService } from './post.service';
import { PostResponseInterface } from './types/postResponse.interface';
import { PostsResponseInterface } from './types/postsResponse.interface';

@Controller('/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  findAll(@Query() query: any): Promise<PostsResponseInterface> {
    return this.postService.findAll(query);
  }

  @Get(':id')
  async findOne(
    @Param('id') postId: typeof ObjectID,
  ): Promise<PostResponseInterface> {
    const post = await this.postService.findOne(postId);
    return this.postService.buildPostResponse(post);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body('post') createPostDto: CreatePostDto,
  ): Promise<PostResponseInterface> {
    const post = await this.postService.create(createPostDto);
    return this.postService.buildPostResponse(post);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') postId: typeof ObjectID,
    @Body('post') updatePostDto: UpdatePostDto,
  ): Promise<PostResponseInterface> {
    const post = await this.postService.update(postId, updatePostDto);
    return this.postService.buildPostResponse(post);
  }

  @Delete(':id')
  delete(@Param('id') postId: typeof ObjectID) {
    return this.postService.delete(postId);
  }
}
