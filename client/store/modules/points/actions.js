import api from '../../../services/axios'
import Types from './types'

export async function actionStorePoint({ commit }, payload) {
	try {
		await api.post('/points', payload)

		commit(Types.STORE_POINT)
		this.$router.push({ name: 'Home' })

		this.$toast.success('Ponto de coleta cadastrado com sucesso', {
			duration: 4000,
			singleton: true,
		})
	} catch (err) {
		commit(Types.STORE_POINT_ERROR, 'Erro ao cadastrar ponto de coleta')
		this.$toast.error(
			'Erro ao cadastrar ponto de coleta, verifique seu formulário',
			{
				duration: 4000,
				singleton: true,
			}
		)
	}
}
