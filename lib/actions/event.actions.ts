import { CreateEventParams } from "@/types";
import { connectToDatabase } from "../mongodb/database";
import User from "../mongodb/database/modals/user.model";
import Event from "../mongodb/database/modals/event.model";
import { revalidatePath } from "next/cache";


export async function createEvent({ userId, event, path }: CreateEventParams) {
    try {
      await connectToDatabase()
  
      console.log(userId);
      const organizer = await User.findById(userId)
      if (!organizer) throw new Error('Organizer not found')
  
      const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId })
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(newEvent))
    } catch (error) {
      console.log(error);
    }
  }
  
  // GET ONE EVENT BY ID
  export async function getEventById(eventId: string) {
 
  }