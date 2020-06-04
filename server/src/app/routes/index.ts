import { Router } from 'express'

const router = Router()

import itemsRoutes from './items.routes'
import pointRoutes from './point.routes'

router.use('/items', itemsRoutes)
router.use('/points', pointRoutes)

export default router
