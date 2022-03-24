export function getStorage(){
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setStorage(data){
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearStorage(){
    sessionStorage.removeItem('userData');
}