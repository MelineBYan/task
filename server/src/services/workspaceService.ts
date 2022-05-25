import { ApiResponse } from './../core/models/responseModel';
import Workspace from '../db/models/workspace';
import { WorkspaceData } from '../core/models/workspaceModel';
import { NextFunction } from 'express';

export default class WorkspaceService {
    public async getWorkspaceById(
        id: string,
        next: NextFunction,
    ): Promise<WorkspaceData> {
        try {
            const workspace = await Workspace.findById(id);
            return new WorkspaceData(
                workspace._id,
                workspace.name,
                workspace.url,
                workspace.project,
                workspace.createdByUserId,
                workspace.users,
            );
        } catch (e) {
            next(e);
        }
    }
    public async getWorkspace(
        url:string,
        next: NextFunction,
    ): Promise<WorkspaceData> {
        try {
            const workspace = await Workspace.findOne({url});
            if(!workspace)return null;
            return new WorkspaceData(
                workspace._id,
                workspace.name,
                workspace.url,
                workspace.project,
                workspace.createdByUserId,
                workspace.users,
            );
        } catch (e) {
            next(e);
        }
    }

    public async deleteWorkspaceById(
        id: string,
        next: NextFunction,
    ): Promise<WorkspaceData> {
        try {
            const workspace = await Workspace.findByIdAndDelete(id);
            return new WorkspaceData(
                workspace._id,
                workspace.name,
                workspace.url,
                workspace.project,
                workspace.createdByUserId,
                workspace.users,
            );
        } catch (e) {
            next(e);
        }
    }

    public async updateWorkspaceById(
        id: string,
        workspaceData,
        next: NextFunction,
    ): Promise<WorkspaceData> {
        try {
            const workspace = await Workspace.findByIdAndUpdate(
                id,
                workspaceData,
                {
                    new: true,
                },
            );
            return new WorkspaceData(
                workspace._id,
                workspace.name,
                workspace.url,
                workspace.project,
                workspace.createdByUserId,
                workspace.users,
            );
        } catch (e) {
            next(e);
        }
    }
    public async getAll(
        id: string,
        next: NextFunction,
    ): Promise<WorkspaceData[]> {
        try {
            const workspaces = await Workspace.find();
            // const workspaces = await Workspace.aggregate([
            //     {
            //         $match: {
            //             $expr: {
            //                 $in: [new mongoose.Types.ObjectId(id), '$users'],
            //             },
            //         },
            //     },
            // {
            //     $lookup: {
            //         from: 'users',
            //         let: { users: '$users' },
            //         pipeline: [
            //             {
            //                 $match: {
            //                     $expr: { $in: ['$_id', '$$users'] },
            //                 },
            //             },
            //         ],
            //         as: 'workspaceUsers',
            //     },
            // },
            // {
            //     $unwind: {
            //         path: '$users',
            //         preserveNullAndEmptyArrays: true,
            //     },
            // },
            // {
            //     $project: {
            //         users: `$workspaceUsers`,
            //         instructionType: `$instruction.instructionType`,
            //         instruction: `$instruction.instruction`,
            //         assessmentQuestion: `$assessment.assessmentQuestion`,
            //         answerChoices: `$assessment.answerChoices`,
            //         topicId: 1,
            //         createdByUserId: 1,
            //     },
            // },
            // ]);
            return workspaces;
        } catch (e) {
            next(e);
        }
    }
    public async addNewWorkspace(
        { name, url, project, createdByUserId, users }: WorkspaceData,
        next: NextFunction,
    ): Promise<WorkspaceData> {
        try {
            const workspace = new Workspace({
                name,
                url,
                project,
                createdByUserId,
                users,
            });
            await workspace.save();
            return new WorkspaceData(
                workspace._id,
                workspace.name,
                workspace.url,
                workspace.project,
                workspace.createdByUserId,
                workspace.users,
            );
        } catch (e) {
            next(e);
        }
    }

}
