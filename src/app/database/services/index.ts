import PostServices from './postServices'
import DBConfig from '../config'

new DBConfig()

const Post = new PostServices()

const Service = {
  Post
}

export default Service
