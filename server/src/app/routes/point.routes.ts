import { Router } from 'express'

import PointRepository from '../repositories/PointRepository'
import CreatePointService from '../services/CreatePointService'
import Point from '../models/Point'

const router = Router()
const pointRepository = new PointRepository()

router.get('/', (request, response) => {
	return response.json(pointRepository.findAll())
})

router.post('/', (request, response) => {
	try {
		const createPointService = new CreatePointService(pointRepository)
		const point = new Point(request.body)

		createPointService.run(point)

		return response.json(pointRepository.findAll())
	} catch (err) {
		return response.status(500).json({ error: err.message })
	}
})

export default router
