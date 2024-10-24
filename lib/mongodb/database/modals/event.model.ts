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

const EventSchema = new Schema({
    title: {type:String, required:true},
    description: {type:String},
    location: {type:String, required:true},
    createdAt: {type:Date, default: Date.now()},
    imagreUrl: {type:String, required:true},
    startDateTime: {type:Date, default: Date.now()},
    endDateTime: {type:Date, default: Date.now()},
    price: {type:String },
    isFree: {type:Boolean,default: false},
    url: {type:String},
    category: {type: Schema.Types.ObjectId, ref:"Category"},
    organizer: {type: Schema.Types.ObjectId, ref:"User"}
})


const Event= models?.Event || model('Event',EventSchema)

export default Event;