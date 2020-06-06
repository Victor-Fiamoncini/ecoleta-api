import Types from './types'

export default {
	[Types.FETCH_ITEMS]: (state, payload) => {
		state.items = payload
	},
	[Types.FETCH_ITEMS_ERROR]: (state, payload) => {
		state.items = []
		state.errors = [...state.errors, payload]
	},
}
