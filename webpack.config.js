module.exports = {
	entry: "./src/index.js",
	devtool: "inline-source-map",
	output: {
		filename: "bundle.js",
	},
	mode: "development",
	devServer: {
		watchContentBase: true,
		inline: true,
		hot: true,
		contentBase: "./src",
		compress: true,
		port: 9000,
		open: true,
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				exclude: /node_modules/,
				use: ["html-loader"],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: [require("babel-plugin-transform-object-rest-spread")],
					},
				},
			},
		],
	},
}
