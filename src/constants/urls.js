
export const baseUrl = 'http://localhost:3000';
export const flaskBaseUrl = 'http://localhost:5000';

export const loginUrl = () => `${baseUrl}/auth/login`;
export const signupUrl = () => `${baseUrl}/auth/signup`;
export const retrieveDealsUrl = () => `${baseUrl}/users/deals`;

export const classifySnap = () => `${flaskBaseUrl}/search`;
export const uploadImage = () => `${flaskBaseUrl}/uploadImage`;