import { Request, Response } from 'express'
import { PointDTO } from '../models/dto'
import { PointDAO, PointItemDAO } from '../models/dao'

import errors from '../messages/errors'

class PointController {
	public async index(request: Request, response: Response) {
		const { city = '', uf = '' } = request.query

		try {
			const pointDao = new PointDAO()
			const points = await pointDao.findAll(String(city), String(uf))

			if (points.length === 0) {
				return response.status(404).json({ error: errors.points.notFound })
			}

			const { APP_URL, UPLOAD_URL_PREFIX } = process.env

			const serializedItems = points.map(point => ({
				...point,
				image_url: `${APP_URL}/${UPLOAD_URL_PREFIX}/${point.image}`,
			}))

			return response.status(200).json(serializedItems)
		} catch (err) {
			return response.status(500).json(err)
		}
	}

	public async show(request: Request, response: Response) {
		try {
			const pointDao = new PointDAO()
			const pointWithItems = await pointDao.findWithItems(
				parseInt(request.params.id)
			)

			if (pointWithItems.length === 0) {
				return response
					.status(404)
					.json({ error: errors.points.notFoundSingle })
			}

			const { APP_URL, FILE_URL_PREFIX, UPLOAD_URL_PREFIX } = process.env

			const serializedItems = pointWithItems.map(pointWithItem => ({
				title: pointWithItem.title,
				image_url: `${APP_URL}/${FILE_URL_PREFIX}/${pointWithItem.image}`,
			}))

			const serializedPoint = pointWithItems[0]
			delete serializedPoint.image
			delete serializedPoint.title

			return response.status(200).json({
				...serializedPoint,
				image_url: `${APP_URL}/${UPLOAD_URL_PREFIX}/${serializedPoint.image_url}`,
				items: serializedItems,
			})
		} catch (err) {
			return response.status(500).json(err)
		}
	}

	public async store(request: Request, response: Response) {
		const { items, name } = request.body

		try {
			const pointDao = new PointDAO()

			if (await pointDao.findByName(name)) {
				return response.status(400).json({ error: errors.points.alreadyExists })
			}

			request.body.image = request.file ? request.file.filename : ''
			const pointDto = new PointDTO(request.body)
			const point = await pointDao.create(pointDto)

			const pointItems = items
				.split(',')
				.map((item: string) => item.trim())
				.map((item: number) => ({
					item_id: item,
					point_id: point.id,
				}))

			const pointItemDao = new PointItemDAO()
			await pointItemDao.create(pointItems)

			return response.status(201).json(point)
		} catch (err) {
			return response.status(500).json(err)
		}
	}
}

export default new PointController()
