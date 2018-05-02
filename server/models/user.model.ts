import { Schema, model, Document } from 'mongoose';

const UserSchema = new Schema({
    email: { type: String, index: true },
    name: String,
    hashedPassword: String,
    sysAdmin: Boolean,
    admin: Boolean
});

export const Users = model('User', UserSchema);
