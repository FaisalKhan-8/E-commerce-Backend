import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: Buffer, required: true },
    role: { type: String, required: true, default: 'user' },
    addresses: { type: [Schema.Types.Mixed] },
    // TODO:  We can make a separate Schema for this
    name: { type: String },
    salt: Buffer,
    resetPasswordToken: { type: String, default: '' },
  },
  { timestamps: true }
);

const virtual = userSchema.virtual('id');
virtual.get(function () {
  return this._id;
});
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
const User = model('User', userSchema);

export default User;
