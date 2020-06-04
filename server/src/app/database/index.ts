import '../../bootstrap'
import knex from 'knex'
import configs from './knexfile'

const { NODE_ENV } = process.env

export default knex(
	// NODE_ENV === 'development' || NODE_ENV === 'test'
	configs.development
	// : configs.production
)
