import axios from "axios";

export const APIClient = async (api, method, body) => {
    let token = localStorage.getItem("Token");

    try {
        token = localStorage.getItem("Token");
        var config = {
            method: method,
            url: `${process.env.REACT_APP_BASE_URL}${api}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(body),
        };
        const res = await axios(config);
        return res;
    } catch (error) {
        //    console.log("ERR------->> :", error)
        throw error;
    }
};

export * from "../../utils/Constants";