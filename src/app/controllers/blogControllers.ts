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
    const { post_id } = req.params

    const response = await Post.findOnePost(parseInt(post_id))

    if (!response) {
      return responses.error(codes.error(), messages.notFound(), res)
    }

    return responses.success(codes.ok(), messages.ok(), response, res)
  }

  createPost = async (req: Request, res: Response) => {
    const {
      title,
      description,
    }: {
      title: string
      description: string
    } = req.body

    const response = await Post.createPost({
      title,
      description,
    })

    if (!response) {
      return responses.error(codes.error(), messages.notFound(), res);
    }

    const postId = response.raw.insertId

    return responses.success(
      codes.created(),
      messages.created(),
      { postId, title, description },
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

    const { post_id } = req.params

    const response = await Post.updatePost(parseInt(post_id), {
      title,
      content,
    })

    if (!response) {
      return responses.error(codes.error(), messages.error(), res)
    }

    return responses.success(
      codes.ok(),
      messages.ok(),
      { post_id, title, content },
      res
    )
  }

  deletePost = async (req: Request, res: Response) => {
    const { post_id } = req.params

    const response = await Post.deletePost(parseInt(post_id))

    if (!response) {
      return responses.error(codes.error(), messages.error(), res)
    }

    return responses.ok(codes.ok(), messages.ok(), res)
  }
}

export default BlogControllers
