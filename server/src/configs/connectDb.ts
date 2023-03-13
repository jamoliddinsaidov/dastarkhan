import mongoose, { ConnectOptions } from 'mongoose'

export const connectDb = () => {
  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions

  return mongoose.connect(process.env.MONGO_URI!, connectionOptions)
}
