import { ItemDTO, PointDTO } from './dto'

export type PointWithItem = PointDTO &
	ItemDTO & {
		image_url?: string
	}
