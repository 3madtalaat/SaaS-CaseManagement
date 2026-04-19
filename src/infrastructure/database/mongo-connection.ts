import mongoose from 'mongoose';
import type { AppConfig } from '../../config/env';

export async function connectMongoAsync(config: AppConfig): Promise<typeof mongoose> {
  mongoose.set('strictQuery', true);
  await mongoose.connect(config.mongodbUri, { dbName: config.mongodbDbName });
  return mongoose;
}

export async function disconnectMongoAsync(): Promise<void> {
  await mongoose.disconnect();
}
