import AuthenticationHelper from "helpers/AuthenticationHelper";

class FetchService {
    static async handleErrors(response) {
        if (response.status === 401) {
            AuthenticationHelper.removeToken();
            if (window.location.pathname !== "/login") {
                window.location = "/login";
            }
        }
        if (!response.ok) {
            const error = await response.text();
            throw Error(error);
        }
        return response;
    }

    static async get(url) {
        const token = AuthenticationHelper.getToken();
        const headers = {};
        if (token) {
            headers.Authorization = token.tokenType + " " + token.accessToken;
        }
        return await fetch(url, {
            headers: headers,
        })
            .then(this.handleErrors)
            .then((response) => response.json());
    }

    static async post(url, body, contentType = "application/json") {
        const token = AuthenticationHelper.getToken();
        const headers = { "Content-Type": contentType };
        if (token) {
            headers.Authorization = token.tokenType + " " + token.accessToken;
        }
        return await fetch(url, {
            method: "POST",
            headers: headers,
            body: body,
        })
            .then(this.handleErrors)
            .then((response) => response.json());
    }

    static async put(url, body, contentType = "application/json") {
        const token = AuthenticationHelper.getToken();
        const headers = { "Content-Type": contentType };
        if (token) {
            headers.Authorization = token.tokenType + " " + token.accessToken;
        }
        return await fetch(url, {
            method: "PUT",
            headers: headers,
            body: body,
        })
            .then(this.handleErrors)
            .then((response) => response.json());
    }

    static async upload(url, body) {
        return await fetch(url, {
            method: "POST",
            body: body,
        }).then(this.handleErrors);
    }

    static async delete(url) {
        const token = AuthenticationHelper.getToken();
        const headers = {};
        if (token) {
            headers.Authorization = token.tokenType + " " + token.accessToken;
        }
        return await fetch(url, {
            method: "DELETE",
            headers: headers,
        }).then(this.handleErrors);
    }
}

export default FetchService;
