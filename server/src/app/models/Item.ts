interface ItemDTO {
	title: string
	image: string
}

export default class Item {
	private props: ItemDTO

	public constructor(props: ItemDTO) {
		this.props = props
	}

	public get title(): string {
		return this.props.title
	}

	public get image(): string {
		return this.props.image
	}
}
