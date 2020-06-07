import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import validate from '../utils/validate'

class PointValidator {
	public async store(req: Request, res: Response, next: NextFunction) {
		const schema = Joi.object().keys({
			name: Joi.string().min(2).required(),
			email: Joi.string().email().required(),
			whatsapp: Joi.string(),
			image: Joi.string(),
			latitude: Joi.number(),
			longitude: Joi.number(),
			city: Joi.string(),
			uf: Joi.string().max(2).uppercase(),
			items: Joi.string().required(),
		})

		await validate(res, next, req.body, schema)
	}
}

export default new PointValidator()
