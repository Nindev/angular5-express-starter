import { join } from 'path';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const OB_SERVER_PORT: number = process.env.OB_SERVER_PORT || 4000;
const OB_DIST_FOLDER: string = join(process.cwd(), 'dist');
const OB_MONGODB_HOST: string = process.env.OB_MONGODB_HOST;
const OB_MONGODB_PORT: number = process.env.OB_MONGODB_PORT;
const OB_MONGODB_NAME: string = process.env.OB_MONGODB_NAME;
const OB_JWT_SECRET: string = process.env.JWT_SECRET || 'not so secret...';
const OB_CRYPTO_KEY_LENGTH: number = +process.env.OB_CRYPTO_KEY_LENGTH || 128;
const OB_CRYPTO_DIGEST: string = process.env.OB_CRYPTO_DIGEST || 'sha512';
const OB_CRYPT_SALT: string = process.env.OB_CRYPTO_SALT;

export const Config = {
    OB_SERVER_PORT,
    OB_DIST_FOLDER,
    OB_MONGODB_HOST,
    OB_MONGODB_PORT,
    OB_MONGODB_NAME,
    OB_JWT_SECRET,
    OB_CRYPTO_KEY_LENGTH,
    OB_CRYPTO_DIGEST,
    OB_CRYPT_SALT
};
