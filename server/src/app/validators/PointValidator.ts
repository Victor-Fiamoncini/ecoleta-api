import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import validate from '../utils/validate'

class PointValidator {
	public async store(req: Request, res: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			name: Joi.string().min(2).required(),
			email: Joi.string().email().required(),
		})

		await validate(res, next, req.body, schema)
	}

	public async update(req: Request, res: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			name: Joi.string().min(2).required(),
			email: Joi.string().email().required(),
		})

		await validate(res, next, req.body, schema)
	}
}

export default new PointValidator()
