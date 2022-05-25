import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;
const urlSchema = new Schema(
    {
        url: {
            type: String,
            unique: true,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
);

export default model('Url', urlSchema);
