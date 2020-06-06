import api from '../../../plugins/axios'
import Types from './types'

export async function actionFetchItems({ commit }) {
	try {
		const res = await api.get('/items')

		commit(Types.FETCH_ITEMS, res.data)
	} catch (err) {
		commit(Types.FETCH_ITEMS_ERROR)
	}
}
