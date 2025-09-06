export function validatePassword(password){
    return password.match(/^(([a-z](?=[^\s]*[A-Z]+[^\s]*))|([A-Z](?=[^\s]*[a-z]+[^\s]*)))(?=[^\s]*[^a-zA-Z0-9]+[^\s]*)(?=[^\s]*[0-9]+[^\s]*)[^\s]*/g);
}

export function validateUsername(username){
    return username.match(/[a-z][a-z0-9\.]*@myHR\.in/g);
}