import { Router } from 'express'

import * as controllers from './app/controllers'
import * as middlewares from './app/middlewares'
import * as validators from './app/validators'

const router = Router()

router.post(
	'/points',
	validators.PointValidator.store,
	middlewares.async(controllers.PointController.store)
)

export default router
