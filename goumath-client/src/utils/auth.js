import jwt from 'jsonwebtoken'
const TOKEN_KEY = 'jwt';

//save jwt token in localstorage 
export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

//remove jwt token in localstorage
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

//check if jwt token is saved in localstorage and not expired
export const isLogin = () => {
    let token = localStorage.getItem(TOKEN_KEY)
    let stt = -1
    if(token){
        jwt.verify(token, 'privateKey', function(err, decoded){
            if(err){
                stt = 0
            }else{
                stt = 1
            }
        })   
    }else{
        stt = 0
    }
    if(stt == 0){
        return false
    }else{
        return true
    }
}

//save user role
export const setUserRole = (role) => {
    localStorage.setItem('role', role);
}

//check user's role
export const getUserRole = () => {
    return localStorage.getItem('role')
}

//set username
export const setUsername = (username) => {
    return localStorage.setItem('username', username)
}