import knex from '../database'
import Point from '../models/Point'

export default class PointRepository {
	private points: Point[] = []

	public findAll(): Point[] {
		return this.points
	}

	public findByName(name: string): Point | undefined {
		return this.points.find(value => value.name === name)
	}

	public create(point: Point): Point {
		this.points.push(point)

		return point
	}
}
