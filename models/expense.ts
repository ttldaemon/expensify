import mongoose, {Document, Schema} from "mongoose";

export interface IExpense extends Document {
  title: string,
  amount: number,
  owner: mongoose.Types.ObjectId,
  createdAt: Date
}

const expenseSchema: Schema<IExpense> = new Schema({
  title: {
    type: String,
    required: true
  }, 
  amount: {
    type: Number,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true
  }
}, {timestamps: true})


export const Expense = mongoose.models.Expense as mongoose.Model<IExpense> || mongoose.model("Expense", expenseSchema)