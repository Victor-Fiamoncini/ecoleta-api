import { Request, Response } from 'express'
import { ItemDAO } from '../models/dao'

class ItemController {
	public async index(req: Request, res: Response) {
		const items = await ItemDAO.index()

		return res.status(200).json('dao')
	}

	public async store(req: Request, res: Response) {
		return res.send()
	}
}

export default new ItemController()
