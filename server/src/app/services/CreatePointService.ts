import PointRepository from '../repositories/PointRepository'
import Point from '../models/Point'

import errors from '../config/messages/errors'

export default class CreatePointService {
	private repository: PointRepository

	public constructor(repository: PointRepository) {
		this.repository = repository
	}

	public run(point: Point): Point {
		const pointByName = this.repository.findByName(point.name)

		if (pointByName) {
			throw new Error(errors.points.alreadyExists)
		}

		return point
	}
}
