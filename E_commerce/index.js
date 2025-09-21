import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connection.js'
import { bootStrap } from './src/bootStrap.js'
import { scheduleJob } from 'node-schedule'
import { User } from './db/index.js'
import { status } from './src/utlis/constant/enums.js'

// create server
const app = express()
const port = process.env.PORT || 3000

dotenv.config({ path: path.resolve('./config/.env')})
// connect db
connectDB()

bootStrap(app,express)

// listen
app.listen(port, () => {
    console.log('server is running on port', port);  
})

const job = scheduleJob('1 1 1 * * *', async function(){
    const deletedUsers = await User.find({
        status: status.DELETED,
        updatedAt: {$lte: Date.now() - 3 * 30 * 24 * 60 * 60 * 1000}
    }) //[{}], []
    const userIds = deletedUsers.map((user) => user._id)
    await User.deleteMany({ _id: { $in: userIds }})
  });

  