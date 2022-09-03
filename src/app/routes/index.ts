import { Request, Response, Application } from 'express'
import BlogControllers from '../controllers/BlogControllers'
import { middlewares } from '../middlewares'

const Blog = new BlogControllers()
const {
  responses,
  messages,
  codes,
} = middlewares

class Routes {
  public router = (app: Application): any => {
    app.get('/', (req: Request, res: Response) => {
      responses.ok(codes.ok(), messages.welcomeMessage(), res)
    })

    app.get("/post", Blog.findPosts);
    app.get("/post/post_id", Blog.findPost);
    app.post("/create", Blog.createPost);
    app.put("/update/post_id", Blog.updatePost);
    app.delete("/delete/post_id", Blog.deletePost);

    app.all("*", (req: Request, res: Response) => {
      responses.ok(codes.notFound(), messages.pageNotFound(), res);
    });
  }
}

export const route = new Routes().router
