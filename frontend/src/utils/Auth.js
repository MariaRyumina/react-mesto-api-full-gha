class Auth {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    //проверка корректности ответа, вызывать при каждом запросе
    _handleResponse (res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(res.status)
    }

    register( email, password ) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => this._handleResponse(res))
    }

    authorize( email, password ) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => this._handleResponse(res))
            .then((data) => {
                if (data != null && data.token) {
                    localStorage.setItem('jwt', data.token);
                    return true;
                }
            })
    }

    //запрос для проверки валидности токена и получения email для вставки в шапку сайта
    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                return this._handleResponse(res)
            })
    }
}

export const auth = new Auth ({
    baseUrl: 'https://api.ryumin.nomoredomainsrocks.ru'
})
