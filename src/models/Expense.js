import mongoose, { Schema } from 'mongoose';

const ExpenseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 5,
      max: 60,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    state: {
      type: String,
      uppercase: true,
      default: 'MN',
    },
    payment_mode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMode',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Canceled', 'Completed'],
      default: 'Completed',
    },
    desc: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, 'Problem! Transaction Amount cannot be empty'],
      type: Number,
      get: (v) => (v / 100).toFixed(2),
      set: (v) => v * 100,
    },
    category: {
      type: String,
      enum: [
        'Travel',
        'Dining',
        'Entertainment',
        'Automotive',
        'Grocery',
        'Healthcare',
        'Online',
        'Subscription',
        'Grooming',
        'Other',
      ],
      default: 'Other',
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);
const Expense =
  mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
export default Expense;
