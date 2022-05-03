import { UserType } from "../../datatype/user"
import connection from "../connection"

export const loginAction = (email:string,password:string):Promise<any[]> => {
    return connection.post('/auth/login',{
        email:email,
        password:password,
    })
}

export const registerAction = (email:string,password:string,password_confirmation:string):Promise<any[]> => {
    return connection.post('/auth/register',{
        email:email,
        password:password,
        password_confirmation:password_confirmation
    })
}


export const saveToLocalStorageAction = (data:UserType) => {
    return localStorage.setItem('user',JSON.stringify(data));
}

export const DeleteUserFromLocalStorageAction = () => {
    return localStorage.removeItem('user');
}

export const getUserFromLocalStorageAction = () => {
    return JSON.parse(localStorage.getItem('user')!);
}