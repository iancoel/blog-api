import { Request, Response } from 'express'
import { middlewares } from '../middlewares'

import Service from '../database/services'

const { responses, messages, codes } = middlewares

const { Post } = Service

class BlogControllers {
  findPosts = async (req: Request, res: Response) => {
    const response = await Post.findPosts()

    if (!response) {
      return responses.error(codes.error(), messages.error(), res)
    }

    return responses.success(
      codes.ok(),
      messages.ok(),
      {
        count: response[1],
        data: response[0],
      },
      res
    )
  }

  findPost = async (req: Request, res: Response) => {
    const { postId } = req.params

    const response = await Post.findOnePost(parseInt(postId))

    if (!response) {
      return responses.error(codes.error(), messages.notFound(), res)
    }

    return responses.success(codes.ok(), messages.ok(), response, res)
  }

  createPost = async (req: Request, res: Response) => {
    const {
      title,
      content,
    }: {
      title: string
      content: string
    } = req.body

    const response = await Post.createPost({
      title,
      content,
    })

    if (!response) {
      return responses.error(codes.error(), messages.notFound(), res);
    }

    const postId = response.raw.insertId

    return responses.success(
      codes.created(),
      messages.created(),
      { postId, title, content },
      res
    )
  }

  updatePost = async (req: Request, res: Response) => {
    const {
      title,
      content,
    }: {
      title: string
      content: string
    } = req.body

    const { postId } = req.params

    const response = await Post.updatePost(parseInt(postId), {
      title,
      content,
    })

    if (!response) {
      return responses.error(codes.error(), messages.error(), res)
    }

    return responses.success(
      codes.ok(),
      messages.ok(),
      { postId, title, content },
      res
    )
  }

  deletePost = async (req: Request, res: Response) => {
    const { postId } = req.params

    const response = await Post.deletePost(parseInt(postId))

    if (!response) {
      return responses.error(codes.error(), messages.error(), res)
    }

    return responses.ok(codes.ok(), messages.ok(), res)
  }
}

export default BlogControllers
