import { API_BASE_URL, ACCESS_TOKEN } from '../_constants';


const request = async (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    const response = await fetch(options.url, options);

    console.log('@@@@@@@: ', response)

    if (response.status === 204 || response.status === 404) {
        return response
    }

    const json = await response.json();
    
    if (!response.ok) {
        return Promise.reject(json);
    }
    return json;
};


export function searchClients() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('Nenhum token de acesso definido.');
    }

    return request({
        url: `${API_BASE_URL}/clients/search`,
        method: 'GET'
    });
}


export function searchClientsFilter(filter) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('Nenhum token de acesso definido.');
    }

    return request({
        url: `${API_BASE_URL}/clients/search`,
        method: 'POST',
        body: JSON.stringify(filter)
    });
}


export function newClient(client) {

    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('Nenhum token de acesso definido.');
    }

    console.log('ACCESS_TOKEN: ', ACCESS_TOKEN)

    return request({
        url: `${API_BASE_URL}/clients`,
        method: 'POST',
        body: JSON.stringify(client)
    });
}


export function updateClient(client) {

    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('Nenhum token de acesso definido.');
    }

    return request({
        url: `${API_BASE_URL}/clients/${client.id}`,
        method: 'PUT',
        body: JSON.stringify(client)
    });
}


export function deleteClient(id) {

    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('Nenhum token de acesso definido.');
    }

    return request({
        url: `${API_BASE_URL}/clients/${id}`,
        method: 'DELETE'
    });
}
