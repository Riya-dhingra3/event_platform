import { model, models, Schema, Document } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
}

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

// Check if the model already exists in models, otherwise create it
const Category = models?.Category || model('Category', categorySchema);

export default Category;
