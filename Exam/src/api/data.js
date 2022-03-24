import * as api from './api.js';


export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAllSongs(){
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function createSong(song){
    return api.post('/data/albums', song);
}

export async function getSongById(id){
    return api.get('/data/albums/' + id);
}

export async function editSong(id, song){
    return api.put('/data/albums/' + id, song);
}

export async function deleteSong(id){
    return api.del('/data/albums/' + id);
}

export async function searchAlbum(query){
    return api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}