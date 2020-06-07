import { Router } from 'express'

import * as controllers from './app/controllers'
import * as middlewares from './app/middlewares'
import * as validators from './app/validators'

const router = Router()

/**
 * Public Items
 */
router.get('/items', controllers.ItemController.index)

/**
 * Public Points
 */
router.get('/points', controllers.PointController.index)
router.get('/points/:id', controllers.PointController.show)
router.post(
	'/points',
	[middlewares.upload.single('image'), validators.PointValidator.store],
	controllers.PointController.store
)

export default router
