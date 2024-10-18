import mongoose from 'mongoose';
const MONGODB_URI= process.env.MONGODB_URL

// The cached object is used to store the connection information to prevent creating multiple connections
// It stores two things:

// conn: The current database connection, if it exists.
// promise: The promise of the ongoing connection attempt, to avoid triggering multiple connection attempts at the same time.
let cached= (global as any).mongoose || {conn:null, promise:null}

export const connectToDatabase = async () =>{
    console.log('in connect to database function')
    // If there is already an existing connection (cached.conn), it returns that connection immediately.
    if(cached.conn) return cached.conn;

    if(!MONGODB_URI){
        throw new Error("MONGODB_URI is missing");
    }

    if(cached.promise){
        try{
            cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
                dbName: 'evently',
                bufferCommands: false
            })
    
            cached.conn=await cached.promise;
            console.log("Connected")
            return cached.conn;

        }catch(error)
        {
            console.log('Error while connection database',error)
        }
    }
}