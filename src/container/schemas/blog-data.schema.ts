import * as mongoose from 'mongoose';

export const blogDataSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    body: String,
    author: String,
    data_posted: String,
  },
  {
    versionKey: false,
  },
);
