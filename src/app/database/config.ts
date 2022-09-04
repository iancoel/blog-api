import { DataSource  } from 'typeorm'
import * as dotenv from 'dotenv'
import entities from './entity'

const { Post } = entities

dotenv.config()

const { DB_USER_DEV, DB_PASSWORD_DEV, DB_NAME_DEV, DB_HOST_DEV } = process.env

const dataSource =  new DataSource({
  type: "mysql",
  host: DB_HOST_DEV,
  port: 3306,
  username: DB_USER_DEV,
  password: DB_PASSWORD_DEV,
  database: DB_NAME_DEV,
  synchronize: true,
  logging: true,
  entities: [Post],
  subscribers: [],
  migrations: [],
})

export default dataSource
