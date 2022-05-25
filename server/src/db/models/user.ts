import { Schema, model } from 'mongoose';
import crypto from 'crypto';
import beautifyUnique from 'mongoose-beautiful-unique-validation';

const salt = process.env.SALT;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
});
userSchema.plugin(beautifyUnique, {
    defaultMessage: 'uniqueInstitution',
});

userSchema.methods.setPassword = function (password) {
    this.password = crypto
        .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
        .toString(`hex`);
};

userSchema.methods.validPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
        .toString(`hex`);
    return this.password === hash;
};

export default model('User', userSchema);
