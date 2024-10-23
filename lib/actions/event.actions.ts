import { CreateEventParams } from "@/types";
import { connectToDatabase } from "../mongodb/database";
import User from "../mongodb/database/modals/user.model";
import Event from "../mongodb/database/modals/event.model";


export const createEvent= async({event,userId,path}: CreateEventParams)=>{
    try{
        await connectToDatabase();

        const organiser = await User.findById(userId);

        if(!organiser){
            console.log("Organiser not found");
        }

        const newEvent=await Event.create({...event , category: event.categoryId ,  organiser: userId});

        return JSON.parse(JSON.stringify(newEvent));
    }
    catch(error){
        console.log(error);
    }
    
}