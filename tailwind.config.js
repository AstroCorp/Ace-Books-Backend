/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,twig}"],
	theme: {
		extend: {},
	},
	plugins: [],
	// Configuración necesaria para que se omitan variables de css
	// ya que no se pueden usar en el HTML de los emails
	experimental: {
		optimizeUniversalDefaults: true,
	},
	corePlugins: {
		backdropOpacity: false,
		backgroundOpacity: false,
		borderOpacity: false,
		divideOpacity: false,
		ringOpacity: false,
		textOpacity: false,
	},
}

