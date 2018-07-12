export const baseUrl = "http://localhost:8000/api/v1";
export const flaskBaseUrl = "http://localhost:5000";

export const signupUrl = () => `${baseUrl}/users`;
export const uploadSnapUrl = () => `${baseUrl}/snaps`;
export const getUserUrl = () => `${baseUrl}/users`;
export const retrieveDealsUrl = () => `${baseUrl}/users/deals`;

export const classifySnap = () => `${flaskBaseUrl}/search`;
export const uploadImage = () => `${flaskBaseUrl}/uploadImage`;
