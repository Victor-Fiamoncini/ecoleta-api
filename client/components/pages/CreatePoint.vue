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
			<form>
				<h1>
					Cadastro do
					<br />ponto de coleta
				</h1>
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
					<Map />
					<div class="field-group">
						<div class="field">
							<label for="uf">Estado (UF)</label>
							<select id="uf" name="uf">
								<option value="0" disabled selected>Selecione uma UF</option>
							</select>
						</div>
						<div class="field">
							<label for="city">Cidade</label>
							<select id="city" name="city">
								<option value="0" disabled selected
									>Selecione uma cidade</option
								>
							</select>
						</div>
					</div>
				</fieldset>
				<fieldset v-if="items">
					<legend>
						<h2>Ítens de coleta</h2>
						<span>Selecione um ou mais items abaixo</span>
					</legend>
					<ul class="items-grid">
						<li v-for="(item, i) in items" :key="i">
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
			uf: '',
			city: '',
			image: '',
			seletedItems: [],
		},
	}),
	computed: {
		...mapGetters('items', ['items']),
	},
	async created() {
		await this.actionFetchItems()
	},
	methods: {
		...mapActions('items', ['actionFetchItems']),

		doSubmit() {
			return ''
		},
	},
	head: () => ({
		title: 'Cadastro - Ecoleta',
	}),
}
</script>
