import { Request, Response } from 'express'

class PointController {
	async store(req: Request, res: Response): Promise<Response> {
		return res.send('')
	}
}

export default new PointController()
