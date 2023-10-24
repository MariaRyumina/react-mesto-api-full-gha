class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
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
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => this._handleResponse(res))
    }

    //загрузка карточек с сервера
    getCardList() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => this._handleResponse(res))

    }

    //загрузка новой информации о пользователе на сервер
    patchUserInfo({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name, about })
        })
            .then(res => this._handleResponse(res))

    }

    //обновление аватара пользователя
    updateUserAvatar({ avatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ avatar })
        })
            .then(res => this._handleResponse(res))

    }

    //загрузка новой карточки на сервер
    addCard({ name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ name, link })
        })
            .then(res => this._handleResponse(res))
    }

    //запрос на удаление карточки
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._handleResponse(res))
    }

    changeLikeCardStatus(id, isLike) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: isLike ? 'PUT' : 'DELETE',
                headers: this._headers
            }
        )
            .then(res => this._handleResponse(res))
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
    headers: {
        authorization: '4007c4a6-1dc8-477b-8692-004338e6361b',
        'Content-Type': 'application/json'
    }
})

