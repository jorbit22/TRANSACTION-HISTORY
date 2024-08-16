import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  userId: string;
  amount: number;
  transactionType: "credit" | "debit";
  status: "pending" | "completed" | "failed";
  date: Date;
}

const TransactionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionType: { type: String, enum: ["credit", "debit"], required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    required: true,
  },
  date: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
