import { Router } from 'express'

import * as controllers from './app/controllers'
import * as middlewares from './app/middlewares'
import * as validators from './app/validators'

const router = Router()

/**
 * Public Items
 */
router.post('/items', middlewares.async(controllers.ItemController.index))

/**
 * Public Points
 */
// router.post(
// 	'/points',
// 	validators.PointValidator.store,
// 	controllers.PointController.store
// )

export default router
