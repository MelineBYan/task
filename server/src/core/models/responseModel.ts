export interface IResponse {
    status: number;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    data: any;
    message: string;
    error: boolean;
}

export class ApiResponse implements IResponse {
    constructor(
        public status = 500,
        public data = null,
        public message = 'Something went wrong please try again later',
        public error = true,
    ) {}

    public static generateDefaultErrorResponse(): ApiResponse {
        return new ApiResponse();
    }
    public static generateNotFoundErrorResponse(resource: string): ApiResponse {
        return new ApiResponse(404, null, `${resource} is not found`, true);
    }
    public static generateBadRequestErrorResponse(): ApiResponse {
        return new ApiResponse(400, null, 'Invalid data is provided', true);
    }

    public static generateNotAuthorizedErrorResponse(): ApiResponse {
        return new ApiResponse(401, null, 'Not authorized!', true);
    }
    public static generateDuplicationErrorResponse(): ApiResponse {
        return new ApiResponse(409, null, 'Duplication detected', true);
    }
    public static generateBearerInvalidErrorResponse(): ApiResponse {
        return new ApiResponse(401, null, 'Bearer is invalid', true);
    }
    public static generateLoginInvalidErrorResponse(): ApiResponse {
        return new ApiResponse(401, null, 'INVALID_PASSWORD_OR_EMAIL', true);
    }
}
