import { Request, Response } from 'express'

class PointController {
	async store(req: Request, res: Response) {
		return res.send('')
	}
}

export default new PointController()
