<template>
	<div id="page-create-point">
		<div class="content">
			<header>
				<img
					src="@/static/images/logo.svg"
					alt="Ecoleta"
					title="Cadastro - Ecoleta"
				/>
				<nuxt-link to="/">
					<i class="fas fa-home" />
					<span>Voltar para home</span>
				</nuxt-link>
			</header>
			<form @submit.prevent="doStorePoint">
				<h1>Cadastro do <br />ponto de coleta</h1>
				<fieldset>
					<legend>
						<h2>Dados</h2>
					</legend>
					<div class="field">
						<label for="name">Nome da entidade</label>
						<input id="name" v-model="form.name" type="text" name="name" />
					</div>
					<div class="field-group">
						<div class="field">
							<label for="email">E-mail</label>
							<input
								id="email"
								v-model="form.email"
								type="email"
								name="email"
							/>
						</div>
						<div class="field">
							<label for="whatsapp">Whatsapp</label>
							<input
								id="whatsapp"
								v-model="form.whatsapp"
								type="text"
								name="whatsapp"
							/>
						</div>
					</div>
				</fieldset>
				<fieldset>
					<legend>
						<h2>Endereço</h2>
						<span>Selecione o endereço no mapa</span>
					</legend>
					<Map
						:latitude="form.latitude"
						:longitude="form.longitude"
						@doSetCoordinates="doSetCoordinates"
					/>
					<div class="field-group">
						<div class="field">
							<label for="uf">Estado (UF)</label>
							<select id="uf" name="uf" @change="doChangeStateAndCities">
								<option v-if="states.length === 0" disabled selected>
									Carregando...
								</option>
								<option
									v-for="state in states"
									v-else
									:key="state.sigla"
									:value="state.sigla"
								>
									{{ state.sigla }}
								</option>
							</select>
						</div>
						<div class="field">
							<label for="city">Cidade</label>
							<select id="city" name="city" @change="doSelectCity">
								<option v-if="cities.length === 0" disabled selected>
									Carregando...
								</option>
								<option
									v-for="city in cities"
									v-else
									:key="city.id"
									:value="city.nome"
								>
									{{ city.nome }}
								</option>
							</select>
						</div>
					</div>
				</fieldset>
				<fieldset v-if="fetchedItems">
					<legend>
						<h2>Ítens de coleta</h2>
						<span>Selecione um ou mais items abaixo</span>
					</legend>
					<ul class="items-grid">
						<li
							v-for="item in fetchedItems"
							:key="item.id"
							:class="{ selected: form.items.includes(item.id) }"
							@click="doSelectItem(item.id)"
						>
							<img :src="item.image_url" :alt="item.name" />
							<span>{{ item.name }}</span>
						</li>
					</ul>
				</fieldset>
				<button type="submit">Cadastrar ponto de coleta</button>
			</form>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Map from '@/components/utils/Map'

export default {
	name: 'CreatePoint',
	components: {
		Map,
	},
	data: () => ({
		form: {
			name: 'Ponto de coleta de Rodeio',
			email: 'victor.fiamoncini@gmail.com',
			whatsapp: '47988897443',
			image: 'default.png',
			uf: '',
			city: '',
			latitude: 0,
			longitude: 0,
			items: [],
		},
		states: [],
		cities: [],
	}),
	computed: {
		...mapGetters('items', {
			fetchedItems: ['items'],
		}),
	},
	async created() {
		await this.actionFetchItems()

		const states = await this.$locations.states()
		const citiesOfFirstState = await this.$locations.byUf(states[0].sigla)

		this.states = states
		this.cities = citiesOfFirstState

		this.form.uf = states[0].sigla
		this.form.city = citiesOfFirstState[0].nome

		navigator.geolocation.getCurrentPosition(({ coords }) => {
			this.form.latitude = coords.latitude
			this.form.longitude = coords.longitude
		})
	},
	methods: {
		...mapActions('items', ['actionFetchItems']),
		...mapActions('points', ['actionStorePoint']),

		async doChangeStateAndCities({ target }) {
			this.form.uf = target.value

			this.cities = await this.$locations.byUf(target.value)
			this.form.city = this.cities[0].nome
		},
		doSelectCity({ target }) {
			this.form.city = target.value
		},
		doSetCoordinates({ latitude, longitude }) {
			this.form.latitude = latitude
			this.form.longitude = longitude
		},
		doSelectItem(id) {
			const alreadySeleted = this.form.items.includes(id)

			if (!alreadySeleted) {
				this.form.items = [...this.form.items, id]
			} else {
				this.form.items = this.form.items.filter(item => item !== id)
			}
		},
		async doStorePoint() {
			await this.actionStorePoint(this.form)
		},
	},
	head: () => ({
		title: 'Cadastro - Ecoleta',
	}),
}
</script>
