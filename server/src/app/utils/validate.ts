import { ObjectSchema } from 'joi'
import { NextFunction, Response } from 'express'

import errors from '../messages/errors'

export default async (
	res: Response,
	next: NextFunction,
	data: Record<string, unknown>,
	schema: ObjectSchema
): Promise<void | Response> => {
	try {
		await schema.validate(data)

		return next()
	} catch (err) {
		return res.status(400).json({
			error: errors.validation,
			details: err.details,
		})
	}
}
