export default class PointDTO {
	private name: string
	private email: string
	private whatsapp: string
	private image: string
	private latitude: number
	private longitude: number
	private city: string
	private uf: string

	constructor(
		name: string,
		email: string,
		whatsapp: string,
		image: string,
		latitude: number,
		longitude: number,
		city: string,
		uf: string
	) {
		this.name = name
		this.email = email
		this.whatsapp = whatsapp
		this.image = image
		this.latitude = latitude
		this.longitude = longitude
		this.city = city
		this.uf = uf
	}

	public get _name(): string {
		return this.name
	}

	public get _email(): string {
		return this.email
	}

	public get _whatsapp(): string {
		return this.whatsapp
	}

	public get _image(): string {
		return this.image
	}

	public get _latitude(): number {
		return this.latitude
	}

	public get _longitude(): number {
		return this.longitude
	}

	public get _city(): string {
		return this.city
	}

	public get _uf(): string {
		return this.uf
	}
}
