import mongoose, { Schema } from 'mongoose';

const PaymentModeSchema = new Schema(
  {
    payment_mode_name: {
      type: String,
      required: true,
      default: 'Cash',
    },
    payment_mode_type: {
      type: String,
      required: true,
      default: 'Cash',
      enum: [
        'Credit Card',
        'Debit Card',
        'Checkin Account',
        'Savings Account',
        'Cash',
      ],
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const PaymentMode =
  mongoose.models.PaymentMode ||
  mongoose.model('PaymentMode', PaymentModeSchema);
export default PaymentMode;
