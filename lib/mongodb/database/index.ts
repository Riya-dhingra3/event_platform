// import mongoose from 'mongoose';
// const MONGODB_URI= process.env.MONGODB_URL

// // The cached object is used to store the connection information to prevent creating multiple connections
// // It stores two things:

// // conn: The current database connection, if it exists.
// // promise: The promise of the ongoing connection attempt, to avoid triggering multiple connection attempts at the same time.
// let cached= (global as any).mongoose || {conn:null, promise:null}

// export const connectToDatabase = async () =>{
//     console.log('in connect to database function')
//     // If there is already an existing connection (cached.conn), it returns that connection immediately.
//     if(cached.conn) return cached.conn;

//     if(!MONGODB_URI){
//         throw new Error("MONGODB_URI is missing");
//     }

//     if(cached.promise){
//         try{
//             cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
//                 dbName: 'evently',
//                 bufferCommands: false
//             })
    
//             cached.conn=await cached.promise;
//             console.log("Connected")
//             return cached.conn;

//         }catch(error)
//         {
//             console.log('Error while connection database',error)
//         }
//     }
// }

import mongoose from 'mongoose';
// The cached object is used to store the connection information to prevent creating multiple connections
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    const MONGODB_URI = process.env.MONGODB_URL;
    console.log("Mongodb url is ", MONGODB_URI)
    if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

    try {
        const connection = await mongoose.connect(MONGODB_URI, {
            dbName: 'evently',
            bufferCommands: false,
        });
        console.log("Connected to database successfully");
        return connection;
    } catch (error) {
        console.error('Error while connecting to the database:', error);
        throw new Error('Failed to connect to the database');
    }
};



// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;

// let cached = (global as any).mongoose || { conn: null, promise: null };

// export const connectToDatabase = async () => {
//   if (cached.conn) return cached.conn;

//   if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

//   cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
//     dbName: 'evently',
//     bufferCommands: false,
//   })

//   cached.conn = await cached.promise;

//   return cached.conn;
// }