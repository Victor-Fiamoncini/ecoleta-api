import { resolve } from 'path'
import { config } from 'dotenv'

config({ path: resolve(__dirname, '.env') })

export default {
	mode: 'spa',
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || '',
			},
			{
				hid: 'theme_color',
				name: 'theme_color',
				content: '#34CB79',
			},
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/images/favicon.png' },
			{
				rel: 'stylesheet',
				href:
					'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
			},
			{
				rel: 'stylesheet',
				href: 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css',
			},
		],
		script: [
			{
				src:
					'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/js/all.min.js',
				body: true,
			},
		],
	},
	loading: { color: '#34CB79' },
	css: [
		'@/static/css/App.css',
		'@/static/css/CreatePoint.css',
		'@/static/css/Home.css',
	],
	plugins: ['@/plugins/locations'],
	buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/router'],
	modules: ['@nuxtjs/dotenv', 'nuxt-leaflet', '@nuxtjs/toast'],
	axios: {},
	env: {
		apiUrl: process.env.MAIN_API_URL,
	},
	toast: {
		iconPack: 'fontawesome',
		position: 'top-right',
	},
	build: {
		extend(config, ctx) {},
	},
}
