import { Schema, model } from 'mongoose';

const jobSchema = new Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  contract: { type: String, required: true },
  location: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Job = model('Job', jobSchema);
export default Job;
