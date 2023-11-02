class Api {
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

    //загрузка информации о пользователе с сервера
    getUserInfo() {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then(res => this._handleResponse(res))
    }

    //загрузка карточек с сервера
    getCardList() {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then(res => this._handleResponse(res))

    }

    //загрузка новой информации о пользователе на сервер
    patchUserInfo({ name, about }) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, about })
        })
            .then(res => this._handleResponse(res))
    }

    //обновление аватара пользователя
    updateUserAvatar(avatar) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(avatar)
        })
            .then(res => this._handleResponse(res))
    }

    //загрузка новой карточки на сервер
    addCard({ name, link}) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, link })
        })
            .then(res => this._handleResponse(res))
    }

    //запрос на удаление карточки
    deleteCard(id) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then(res => this._handleResponse(res))
    }

    changeLikeCardStatus(id, isLike) {
        const token = localStorage.getItem('jwt');

        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: isLike ? 'PUT' : 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._handleResponse(res))
    }
}

export const api = new Api({
    baseUrl: 'https://api.ryumin.nomoredomainsrocks.ru',
})
