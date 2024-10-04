// ROUTES CONSTANTS
export const routes = {
	ROOT: "/",
	SIGNUP: "/signup",
	VERIFICTAION: "/verification",
	RESET_PASSWORD: "/resetpassword/:id",
	FORGOT_PASSOWRD: "/forgot",
	ADMIN:`/admin/1`,
	EMPLOYEES:"/employees/1",
	PROFILE:"/profile",
} 

// For Further Use IF Needed Globally

// ROLES CONSTANTS
export const roles = {
	USER:"user",
	ADMIN:"admin",
	CUSTOMER:"customer"
}

// EXCHANGES CONSTANTS
export const exchanges = {
	BINANCE:"binance",
	OKX:"okx",
	COINBASE:"coinbase",
}

export const exchangesOptions = [
	{ name: "binance", value: "binance" },
	{ name: "coinbase", value: "coinbase" },
	{ name: "okx", value: "okx" },
];

export const eyeIcon = require("../Astes/eye.svg").default;
export const downloadIcon = require("../Astes/download.svg").default;
export const refreshIcon = require("../Astes/refresh.svg").default;