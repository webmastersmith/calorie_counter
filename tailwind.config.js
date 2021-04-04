// const colors = require("tailwindcss/colors")
const customWidth = {
	10: "10%",
	20: "20%",
	25: "25%",
	30: "30%",
	33: "33.3333%",
	40: "40%",
	50: "50%",
	60: "60%",
	70: "70%",
	75: "75%",
	80: "80%",
	90: "90%",
	100: "100%",
}
module.exports = {
	purge: {
		enabled: false,
		content: ["./src/**/*.html", "./src/**/*.js", "./src/components/**/*.js"],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			container: {
				center: true,
				padding: "1.5rem",
			},
			// colors,
			width: customWidth,
			maxWidth: {
				...customWidth,
				"1/12": "8.333333%",
				"2/12": "16.666667%",
				"3/12": "25%",
				"4/12": "33.333333%",
				"5/12": "41.666667%",
				"6/12": "50%",
				"7/12": "58.333333%",
				"8/12": "66.666667%",
				"9/12": "75%",
				"10/12": "83.333333%",
				"11/12": "91.666667%",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
