import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;
const workspaceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        project: {
            type: String,
        },
        createdByUserId: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        users: [{ type: String }],
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
);

export default model('Workspace', workspaceSchema);
