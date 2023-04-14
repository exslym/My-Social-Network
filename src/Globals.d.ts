declare module '*.css';
declare module '*.module.css';
declare module '*.scss';
declare module '*.module.scss';
declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.gif';
declare module '*.mp4';
declare module '*.webp';

namespace NodeJS {
	interface ProcessEnv {
		BASE_URL: string;
		API_KEY: string;
	}
}
