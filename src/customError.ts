export default class CustomError extends Error {
    code: string
    statusCode: number

    constructor(message: string, code?: string, statusCode?: number) {
        super(message)
        this.name = 'CustomError'
        this.code = code ?? 'InternalServerError'
        this.statusCode = statusCode ?? 500
    }

    toJSON() {
        return {
            code: this.code,
            message: this.message
        }
    }
}

const customErrorHandler = (err: any, req: any, res: any, next: any) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json(err.toJSON())
    } else {
        console.error(err)
        res.status(500).json({ code: 'InternalServerError', message: 'Something Went Wrong!' })
    }
    next()
}

class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, 'BadRequestError', 400)
    }
}

class UnauthorizedError extends CustomError {
    constructor(message: string) {
        super(message, ' UnauthorizedError', 401)
    }
}

class ForbiddenError extends CustomError {
    constructor(message: string) {
        super(message, 'ForbiddenError', 403)
    }
}

export {
    CustomError,
    customErrorHandler,
    BadRequestError,
    ForbiddenError,
    UnauthorizedError
}
