import { Request, NextFunction, Response } from 'express'

export default (fn: (req: Request, res: Response) => Promise<Response>) => (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void | Response> => {
	return Promise.resolve(fn(req, res)).catch(next)
}
