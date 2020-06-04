interface PointDTO {
	name: string
	email: string
	whatsapp: string
	image: string
	latitude: number
	longitude: number
	city: string
	uf: string
}

export default class Point {
	private props: PointDTO

	public constructor(props: PointDTO) {
		this.props = props
	}

	public get name(): string {
		return this.props.name
	}

	public get email(): string {
		return this.props.email
	}

	public get whatsapp(): string {
		return this.props.whatsapp
	}

	public get image(): string {
		return this.props.image
	}

	public get latitude(): number {
		return this.props.latitude
	}

	public get longitude(): number {
		return this.props.longitude
	}

	public get city(): string {
		return this.props.city
	}

	public get uf(): string {
		return this.props.uf
	}
}
