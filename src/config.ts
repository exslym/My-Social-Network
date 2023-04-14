import dotenv from 'dotenv';
// import path from 'path-browserify';

//! BAD PRACTICE!!! - add to node_modules/react_scripts/config/webpack.config.js in resolve section:
// fallback:{path : require.resolve("path-browserify")},
// fallback: { "os": require.resolve("os-browserify/browser") },
// fallback: { "fs": false, },

const path = require('path-browserify');

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
	BASE_URL: string | undefined;
	API_KEY: string | undefined;
}

interface Config {
	BASE_URL: string;
	API_KEY: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
	return {
		BASE_URL: process.env.BASE_URL,
		API_KEY: process.env.API_KEY,
	};
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
	for (const [key, value] of Object.entries(config)) {
		if (value === undefined) {
			throw new Error(`Missing key ${key} in config.env`);
		}
	}
	return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
