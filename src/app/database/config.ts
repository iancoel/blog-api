import { DataSource  } from 'typeorm'
import * as dotenv from 'dotenv'
import entities from './entity'

const { Post } = entities

dotenv.config()

const { DB_USER_DEV, DB_PASSWORD_DEV, DB_NAME_DEV, DB_HOST_DEV } = process.env

class DBConfig {
  constructor() {
    this.dbConfig()
  }

  dbConfig = () => {
    console.log('Initializing database config')
    return new DataSource({
      type: "mysql",
      host: DB_HOST_DEV,
      database: DB_NAME_DEV,
      username: DB_USER_DEV,
      password: DB_PASSWORD_DEV,
      logging: false,
      synchronize: true,
      entities: [Post],
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    })
  }
}

export default DBConfig
