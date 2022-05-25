import { WorkspaceData } from '../core/models/workspaceModel';
import Workspace from '../services/workspaceService';
import { ApiResponse } from '../core/models/responseModel';
import type { NextFunction, Request, Response } from 'express';
import { UserData } from '../core/models/userModel';

const workspaceService = new Workspace();

export default class WorkspaceController {
    public async getWorkspace(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        const { id } = req.params;
        try {
            const workspace = await workspaceService.getWorkspaceById(id, next);
            if (!workspace) {
                return res
                    .status(404)
                    .send(
                        ApiResponse.generateNotFoundErrorResponse('Workspace'),
                    );
            }
            res.status(200).send(
                new ApiResponse(200, workspace, 'Workspace data'),
            );
        } catch (error) {
            return res
                .status(500)
                .send(ApiResponse.generateDefaultErrorResponse());
        }
    }

    public async deleteWorkspace(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        const { id } = req.params;
        try {
            const workspace = await workspaceService.deleteWorkspaceById(
                id,
                next,
            );
            if (!workspace) {
                return res
                    .status(404)
                    .send(
                        ApiResponse.generateNotFoundErrorResponse('Workspace'),
                    );
            }
            res.status(200).send(
                new ApiResponse(
                    200,
                    null,
                    'Workspace deleted successfully',
                    true,
                ),
            );
        } catch (error) {
            return res
                .status(500)
                .send(ApiResponse.generateDefaultErrorResponse());
        }
    }

    public async getAll(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const { id } = req.user as UserData;
            const workspaces = await workspaceService.getAll(id, next);
            if (!workspaces) {
                return res
                    .status(404)
                    .send(
                        ApiResponse.generateNotFoundErrorResponse('Workspaces'),
                    );
            }
            res.status(200).send(
                new ApiResponse(200, workspaces, 'Workspaces data'),
            );
        } catch (error) {
            return res
                .status(500)
                .send(ApiResponse.generateDefaultErrorResponse());
        }
    }

    public async create(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const { id: userId } = req.user as UserData;
            const { name, url } = req.body;
            if (!name || !url) {
                return res
                    .status(400)
                    .send(ApiResponse.generateBadRequestErrorResponse());
            }
            const workspace = await workspaceService.addNewWorkspace(
                { ...req.body, createdByUserId: userId, users: [userId] },
                next,
            );
            if (workspace) {
                return res
                    .status(200)
                    .send(
                        new ApiResponse(
                            200,
                            workspace,
                            'Workspace successfully saved',
                        ),
                    );
            }
        } catch (error) {
            return res
                .status(500)
                .send(ApiResponse.generateDefaultErrorResponse());
        }
    }

    public async update(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const { id: userId } = req.user as UserData;
            const { id } = req.params;
            const { name, url, project } = req.body;
            if (!name || !url) {
                return res
                    .status(400)
                    .send(ApiResponse.generateBadRequestErrorResponse());
            }
            const workspaces = await workspaceService.updateWorkspaceById(
                id,
                {
                    name,
                    url,
                    project,
                    createdByUserId: userId,
                    users: [userId],
                } as WorkspaceData,
                next,
            );
            if (workspaces) {
                return res
                    .status(200)
                    .send(
                        new ApiResponse(
                            200,
                            workspaces,
                            'Workspace successfully updated',
                        ),
                    );
            }
        } catch (error) {
            return res
                .status(500)
                .send(ApiResponse.generateDefaultErrorResponse());
        }
    }
    
}
