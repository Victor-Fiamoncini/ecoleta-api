import knex from '../../database'
import { PointDTO } from '../dto'
import { PointWithItem } from '../types'

export default class PointDAO {
	private readonly table = 'points'

	public async findAll(city?: string, uf?: string): Promise<PointWithItem[]> {
		return await knex(this.table)
			.select('points.*')
			.distinct()
			.join('point_items', 'points.id', '=', 'point_items.point_id')
			.where(builder => {
				if (city) {
					builder.where('city', city)
				}
				if (uf) {
					builder.where('uf', uf)
				}
			})
	}

	public async findWithItems(id: number): Promise<PointWithItem[]> {
		return await knex(this.table)
			.select(
				'points.name',
				'points.email',
				'points.whatsapp',
				'points.image AS image_url',
				'points.latitude',
				'points.longitude',
				'points.city',
				'points.uf',
				'items.image',
				'items.title'
			)
			.join('point_items AS pi', 'points.id', '=', 'pi.point_id')
			.join('items', 'items.id', '=', 'pi.item_id')
			.where('points.id', '=', id)
	}

	public async findByName(name: string): Promise<PointDTO> {
		return await knex(this.table).select('*').where('name', '=', name).first()
	}

	public async create(point: PointDTO): Promise<PointDTO> {
		const [id] = await knex(this.table).insert(point)
		point.id = id

		return point
	}
}
