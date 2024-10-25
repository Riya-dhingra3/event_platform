import { model, models, Schema } from "mongoose";

export interface IEvent extends Document{
    _id: string;
    title: string;
    description?: string;
    location: Location; // Make sure this matches with the schema definition
    createdAt: Date;
    imagreUrl: string; // Note: if this should be `imageUrl`, update it in the schema as well
    startDateTime: Date;
    endDateTime: Date;
    price?: string;
    isFree: boolean;
    url?: string;
    category: {
      _id: String;
      name: string;
    };
    organizer: {
      _id:String;
      firstname: string;
      lastname: string;
    };
  }

  import mongoose from "mongoose";

  const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    price: { type: Number, required: false },
    isFree: { type: Boolean, default: false },
    url: { type: String },
    imageUrl: { type: String }, // New field to store the uploaded image URL
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }
  });
  

const Event= models?.Event || model('Event',EventSchema)

export default Event;