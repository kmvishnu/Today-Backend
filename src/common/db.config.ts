import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

  //details from the env
  const mongoUsername = process.env.mongoUsername
  const mongoPassword = process.env.mongoPassword

  const dbName = 'Post'
  
//   const connectionString = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.e8bv6uf.mongodb.net/?retryWrites=true&w=majority`;
const connectionString = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.e8bv6uf.mongodb.net/?retryWrites=true&w=majority`;
  

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

//db connection
export const db = mongoose.connect(connectionString, options)
.then(res => {
    if(res){
        console.log(`Database connection succeffully to ${dbName}`)
    }
    
}).catch(err => {
    console.log(err)
})