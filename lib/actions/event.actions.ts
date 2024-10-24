import { CreateEventParams } from "@/types";
import { connectToDatabase } from "../mongodb/database";
import User from "../mongodb/database/modals/user.model";
import Event from "../mongodb/database/modals/event.model";


export const createEvent= async({event,clerkId,path}: CreateEventParams)=>{
    try{
        await connectToDatabase();

        console.log(User.findById(clerkId));
        const organiser = await User.findById(clerkId);

        if(!organiser){
            console.log("Organiser not found");
        }

        const newEvent=await Event.create({...event , category: event.categoryId ,  organiser: clerkId});
        console.log(newEvent);

        return JSON.parse(JSON.stringify(newEvent));
    }
    catch(error){
        console.log(error);
    }
    
}