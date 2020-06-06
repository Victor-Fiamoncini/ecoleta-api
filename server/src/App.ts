import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { resolve } from 'path'

import { IApp } from './types'
import routes from './routes'

export default class App {
	private props: IApp

	public constructor(props: IApp) {
		this.props = props

		this.configs()
		this.middlewares()
	}

	public get app(): Application {
		return this.props.app
	}

	private configs(): void {
		this.app.disable('x-powered-by')
	}

	private middlewares(): void {
		const {
			CLIENT_HOST,
			FILE_URL_PREFIX,
			NODE_ENV,
			UPLOAD_URL_PREFIX,
		} = process.env

		if (NODE_ENV === 'production') {
			this.app.use(cors({ origin: CLIENT_HOST }))
			this.app.use(helmet())
		} else {
			this.app.use(cors())
			this.app.use(morgan('dev'))
		}

		this.app.use(express.json())
		this.app.use(
			`/${FILE_URL_PREFIX}`,
			express.static(resolve(__dirname, '..', 'temp', 'static'))
		)

		this.app.use(
			`/${UPLOAD_URL_PREFIX}`,
			express.static(resolve(__dirname, '..', 'temp', 'uploads'))
		)

		this.app.use(routes)
	}
}
