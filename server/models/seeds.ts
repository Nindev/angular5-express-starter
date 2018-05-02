import { Users } from "./user.model";
import { User } from "../../declarations";
import { Config } from "../config";
import { pbkdf2Sync } from "crypto";

export class Seeds {
    static createSystemAdmin = async () => {
        const sysEmail = 'admin@admin.io';
        const sysAdmin: User = await Users.findOne({ email: sysEmail });
        if (!sysAdmin) {
            const salt = new Buffer(Config.OB_CRYPT_SALT).toString('base64');
            const hash = pbkdf2Sync('admin', salt, 10000, Config.OB_CRYPTO_KEY_LENGTH, Config.OB_CRYPTO_DIGEST);
            const hashedPassword = hash.toString('hex');
            Users.create({
                email: sysEmail,
                hashedPassword,
                sysAdmin: true,
                admin: true
            }).then(user => {
                console.log('System admin created');
            }).catch(err => console.log(err));
        }
    }
}
