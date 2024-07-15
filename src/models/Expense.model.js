import mongoose, { Schema } from 'mongoose';

const ExpenseSchema = new Schema(
  {
    category: {
      type: String,
      default: 'Other Services',
      enum: [
        'Travel',
        'Dining & Sipping',
        'Entertainment',
        'Automotive',
        'Grocery',
        'Healthcare',
        'Online Purchase',
        'Subscription',
        'Grooming/Self Care',
        'Utilities',
        'Money Transfer',
        'Other Services',
      ],
    },
    name: {
      type: String,
      required: true,
      min: 5,
      max: 30,
    },
    amount: {
      type: Number,
      required: [true, 'Problem! Transaction Amount cannot be empty'],
      type: Number,
      get: (v) => (v / 100).toFixed(2),
      set: (v) => v * 100,
    },
    payment_mode_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMode',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ['pending', 'canceled', 'completed'],
      default: 'completed',
    },
    state : {
     type : String,
     default: 'MN',
     max: 2
    },
    desc : {
      type: String
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Expense =
  mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
export default Expense;
