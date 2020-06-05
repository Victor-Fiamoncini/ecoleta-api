import { Request, Response } from 'express'
import { ItemDAO } from '../models/dao'

import errors from '../messages/errors'

class ItemController {
	public async index(request: Request, response: Response) {
		try {
			const itemDao = new ItemDAO()
			const items = await itemDao.findAll()

			if (items.length === 0) {
				return response.status(404).json({ error: errors.items.notFound })
			}

			const { APP_URL, FILE_URL_PREFIX } = process.env

			const serializedItems = items.map(item => ({
				id: item.id,
				name: item.title,
				image_url: `${APP_URL}/${FILE_URL_PREFIX}/${item.image}`,
			}))

			return response.status(200).json(serializedItems)
		} catch (err) {
			return response.status(500).json(err)
		}
	}
}

export default new ItemController()
