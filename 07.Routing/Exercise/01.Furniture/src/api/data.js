
import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    all: '/data/catalog',
    create: '/data/catalog',
    getDetails: '/data/catalog/',
    updateId: '/data/catalog/',
    myItems: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
    deleteById: '/data/catalog/'
}

export async function getAll(){
    return api.get(endpoints.all);
}

export async function getById(id){
    return api.get(endpoints.getDetails + id);
}

export async function getMyItems(userId){
    return api.get(endpoints.myItems(userId));
}

export async function createItem(data){
    return api.post(endpoints.create, data);
}

export async function updateById(id, data){
    return api.put(endpoints.updateId + id, data)
}

export async function deleteItem(id){
    return api.del(endpoints.deleteById + id);
}


