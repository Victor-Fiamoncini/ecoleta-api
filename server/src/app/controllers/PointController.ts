import { Request, Response } from 'express'
import { PointDTO } from '../models/dto'
import { PointDAO, PointItemDAO } from '../models/dao'

import errors from '../messages/errors'

class PointController {
	public async index(request: Request, response: Response) {
		try {
			const { city = '', uf = '' } = request.query

			const pointDao = new PointDAO()
			const points = await pointDao.findAll(String(city), String(uf))

			if (points.length === 0) {
				return response.status(404).json({ error: errors.points.notFound })
			}

			return response.status(200).json(points)
		} catch (err) {
			return response.status(500).json(err)
		}
	}

	public async show(request: Request, response: Response) {
		try {
			const pointDao = new PointDAO()
			const pointsWithItem = await pointDao.findWithItems(
				parseInt(request.params.id)
			)

			if (pointsWithItem.length === 0) {
				return response
					.status(404)
					.json({ error: errors.points.notFoundSingle })
			}

			const { APP_URL, FILE_URL_PREFIX } = process.env

			const serializedItems = pointsWithItem.map(pointWithItem => ({
				title: pointWithItem.title,
				image_url: `${APP_URL}/${FILE_URL_PREFIX}/${pointWithItem.image}`,
			}))

			const serializedPoint = pointsWithItem[0]
			delete serializedPoint.image
			delete serializedPoint.title

			return response.status(200).json({
				...serializedPoint,
				items: serializedItems,
			})
		} catch (err) {
			return response.status(500).json(err)
		}
	}

	public async store(request: Request, response: Response) {
		try {
			const { items } = request.body

			const pointDao = new PointDAO()
			const pointDto = new PointDTO(request.body)
			const point = await pointDao.create(pointDto)

			const pointItemDao = new PointItemDAO()
			const pointItems = items.map((itemId: number) => ({
				item_id: itemId,
				point_id: point.id,
			}))

			await pointItemDao.create(pointItems)

			return response.status(201).json(point)
		} catch (err) {
			return response.status(500).json(err)
		}
	}
}

export default new PointController()
