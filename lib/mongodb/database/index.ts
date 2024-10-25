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
const MONGODB_URI = process.env.MONGODB_URI;
console.log("URL OF MONGO DB IS before", MONGODB_URI);

// The cached object is used to store the connection information to prevent creating multiple connections
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    console.log('In connect to database function');
    console.log("URL OF MONGO DB IS", MONGODB_URI);
    // If there is already an existing connection (cached.conn), return that connection immediately
    if (cached.conn) return cached.conn;

    // Check if the MongoDB URI is defined
    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is missing");
    }

    // If there is no existing promise, create a new connection promise
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: 'evently',
            bufferCommands: false
        });
    }

    try {

        cached.conn = await cached.promise;
        console.log("Connected to database successfully");
        return cached.conn;
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