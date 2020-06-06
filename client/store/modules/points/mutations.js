import Types from './types'

export default {
	[Types.STORE_POINT]: state => {
		state.errors = []
	},
	[Types.STORE_POINT_ERROR]: (state, payload) => {
		state.errors = [...state.errors, payload]
	},
}
