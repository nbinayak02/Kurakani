// catches the errors thrown in async functions and passes them to 
// the global error handler middleware by calling next(err)

import type { NextFunction, Request, Response } from "express"

const asyncErrorHandler = (fn:Function) => {
    return (req:Request, res:Response, next:NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}

export default asyncErrorHandler;