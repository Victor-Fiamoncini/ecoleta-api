import { RequestHandler } from 'express'
import multer from 'multer'
import multerConfig from '../config/multer'

export default {
	single: (requestFieldName: string): RequestHandler => {
		return multer(multerConfig).single(requestFieldName)
	},
}
