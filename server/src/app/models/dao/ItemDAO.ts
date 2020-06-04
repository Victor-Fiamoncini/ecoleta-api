import knex from '../../database'
import { ItemDTO } from '../dto'

export default class ItemDAO {
	private readonly tableName = 'items'

	public async index(): Promise<ItemDTO[]> {
		return await knex(this.tableName).select('*')
	}
}
