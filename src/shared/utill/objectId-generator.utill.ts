import { Types } from 'mongoose';

export function ObjectIdGenerator(id: string): Types.ObjectId {
  return Types.ObjectId(id);
}
