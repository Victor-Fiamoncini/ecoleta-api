import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { resolve } from 'path'

import routes from './routes'

export default class App {
	private app: Application

	constructor() {
		this.app = express()

		this.configs()
		this.middlewares()
	}

	public get _app(): Application {
		return this.app
	}

	private configs(): void {
		this.app.disable('x-powered-by')
	}

	private middlewares(): void {
		const { CLIENT_HOST, FILE_URL_PREFIX, NODE_ENV } = process.env

		if (NODE_ENV === 'production') {
			this.app.use(cors({ origin: CLIENT_HOST }))
			this.app.use(helmet())
		}

		this.app.use(express.json())
		this.app.use(morgan('dev'))
		this.app.use(
			`/${FILE_URL_PREFIX}`,
			express.static(resolve(__dirname, '..', 'temp', 'static'))
		)

		this.app.use(routes)
	}
}
