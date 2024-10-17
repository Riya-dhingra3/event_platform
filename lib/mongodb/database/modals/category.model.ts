import { model, models, Schema } from "mongoose";

export interface ICategory extends Document{
    _id:String,
    name:String
}

const categorySchema= new Schema({
    name:{type:String, required:true, unique:true }
})


const Category=models.category || model('Category',categorySchema);

export default Category