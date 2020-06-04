import knex from '../database'
import Item from '../models/Item'

export default class ItemRepository {
	private items: Item[] = []

	public index(): Item[] {
		return this.items
	}
}
