const path = require('path');

module.exports = {
    mode: 'development', // Set the mode to development
    entry: './src/index.js', // Your entry point
    output: {
        filename: 'bundle.js', // Output bundle file name
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // Serve files from the dist directory
        compress: true, // Enable gzip compression
        port: 9000, // Port to run the server
        allowedHosts: [
            'localhost', // Allow localhost
            'your-domain.com', // Replace with your domain if needed
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Transpile JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Use Babel loader
                    options: {
                        presets: ['@babel/preset-env'], // Use the env preset
                    },
                },
            },
        ],
    },
};