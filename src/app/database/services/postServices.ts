import Post from '../entity/post'

class PostServices {
  findPosts = async (): Promise<any | null> => {
    const result = await Post.findAndCount()
    if (!result) {
      return null
    }
    return result
  }

  findOnePost = async (post_id: number): Promise<any | null> => {
    const result = await Post.findOne({ where: { post_id } })
    if (!result) {
      return null
    }
    return result
  }

  createPost = async (data: object): Promise<any | null> => {
    const result = await Post.insert(data)
    if (!result) {
      return null
    }
    return result
  }

  updatePost = async (post_id: number, data: any): Promise<any | null> => {
    const { title, description } = data
    const result = await Post
      .createQueryBuilder()
      .update()
      .set({
        title,
        description
      })
      .where({
        post_id
      })
      .execute()
    if(!result) {
      return null
    }
    return result
  }

  deletePost = async (post_id: number): Promise<any | null> => {
    const result = await Post.delete({ post_id })
    if (!result) {
      return null
    }
    return result
  }
}

export default PostServices
