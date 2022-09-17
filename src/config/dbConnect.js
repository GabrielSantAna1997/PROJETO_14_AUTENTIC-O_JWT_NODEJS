import mongoose from "mongoose"
import * as dotenv from 'dotenv'
dotenv.config()

mongoose.connect(`mongodb+srv://gabrielsantana:${process.env.DATABASE_PASSWORD}@clusterestudo.jidjgaz.mongodb.net/${process.env.DATABASE_USERNAME}`)

let db = mongoose.connection;

export default db;