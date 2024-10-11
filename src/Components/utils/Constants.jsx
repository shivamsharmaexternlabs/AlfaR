// ROUTES CONSTANTS
export const routes = {
	ROOT: "/",
	SIGNUP: "/signup",
	VERIFICTAION: "/verification",
	RESET_PASSWORD: "/resetpassword/:id",
	RESEND_LINK: "/resendlink",
	FORGOT_PASSOWRD: "/forgot",
	ADMIN: `/admin`,
	EMPLOYEES: "/user",
	PROFILE: "/profile",
}

// For Further Use IF Needed Globally

// ROLES CONSTANTS
export const roles = {
	USER: "user",
	ADMIN: "admin",
	CUSTOMER: "customer"
}

// EXCHANGES CONSTANTS
export const exchanges = {
	BINANCE: "binance",
	OKX: "okx",
	COINBASE: "coinbase",
}

// CUSTOMERS
export const CUSTOMERS = {
	ADD_CUSTOMER: "Add Customer",
	UPDATE_CUSTOMERS: "Edit Customer",
}

export const DEPARTMENTS_NAME = {
	ACCOUNTS: "Accounts",
	ACCOUNT_MANAGEMENT: "Account Management",
	RISK_ANALYST: "Risk Analyst",
	CUSTOMER_SUPPORT: "Customer Support"
}

//STATUS
// Array of status options
export const statusOptions = ["All", "Active", "Inactive"];


//DEPARTMENTS

export const DEPARTMENTS = [
	{ name: "Accounts", value: "Accounts" },
	{ name: "Account Management", value: "Account Management" },
	{ name: "Risk Analyst", value: "Risk Analyst" },
	{ name: "Customer Support", value: "Customer Support" },
]



export const exchangesOptions = [
	{ name: "Binance", value: "binance" },
	{ name: "Coinbase", value: "coinbase" },
	{ name: "Okx", value: "okx" },
];

export const eyeIcon = require("../Astes/eye.svg").default;
export const closeIcon = require("../Astes/closeeye.svg").default;
export const downloadIcon = require("../Astes/download.svg").default;
export const refreshIcon = require("../Astes/refresh.svg").default;
export const editIcon = require("../Astes/editIcon.svg").default;
export const customerWhite = require("../Astes/customers-white.svg").default;
export const customerBlack = require("../Astes/customers-black.svg").default;
export const employeesBlack = require("../Astes/employees-black.svg").default;
export const employeesWhite = require("../Astes/employees-white.svg").default;
export const profileBlack = require("../Astes/profile-black.svg").default;
export const profileWhite = require("../Astes/profile-white.svg").default;
export const informationIcon = require("../Astes/information.svg").default;
export const greyDownloadIcon = require("../Astes/greyDownload.svg").default;