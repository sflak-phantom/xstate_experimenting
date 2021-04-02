import mongoose, { Schema, Document } from 'mongoose';

type starRating = 0 | 1 | 2 | 3 | 4 | 5;

export interface IDaily extends Document {
  date: Date;
  rating: starRating;
}

const DailySchema = new Schema({
  date: Date,
  rating: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
  },
});

export default mongoose.model<IDaily>('Daily', DailySchema);