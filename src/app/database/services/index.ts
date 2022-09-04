import PostServices from './postServices'
import dataSource from '../config'

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const Post = new PostServices()

const Service = {
  Post
}

export default Service
