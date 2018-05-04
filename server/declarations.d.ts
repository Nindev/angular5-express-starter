import { Document } from "mongoose";

interface User extends Document {
    email?: string;
    name?: string;
    hashedPassword?: string;
    sysAdmin?: boolean;
    admin?: boolean;
}