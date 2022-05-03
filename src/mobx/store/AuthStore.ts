import {observable, action, makeObservable} from 'mobx';
import {UserType} from '../../datatype/user'
import {loginAction,saveToLocalStorageAction,registerAction,DeleteUserFromLocalStorageAction} from '../action/Auth'

export class AuthStore {
    constructor() {
        makeObservable(this);
    }

    @observable isLogin = false
    @observable inProgress = false;
    @observable errors = undefined;
    @observable message = ''

    @observable values = {
        email: '',
        password: '',
        password_confirmation:''
    };

    @observable user: Array<UserType> = []

    @action 
    setEmail(email:string) {
        console.log(email);
        this.values.email = email;
    }
    
    @action 
    setPassword(password:string) {
        this.values.password = password;
    }

    @action
    setConfirmPassword(password_confirmation:string) {
        this.values.password_confirmation = password_confirmation;
    }

    @action
    setCurrentUser(data:UserType) {
        this.user[0] = data
    }

    @action
    login = () => {
        this.inProgress = true;
        this.errors = undefined
        return loginAction(this.values.email,this.values.password)
        .then((response:any) => {
            this.message = 'login success'
            this.user = response.data.data
            this.isLogin = true;
            saveToLocalStorageAction(response.data.data)
        })
        .catch((err) => {
            this.errors = err.response.data.data.message
        }).finally(action(() => {
            this.inProgress = false
            this.message = ''
        }))
    }

    @action
    register = () => {
        this.inProgress = true;
        this.errors = undefined
        return registerAction(this.values.email,this.values.password,this.values.password_confirmation)
        .then((response:any) => {
            this.message = 'register success'
        })
        .catch((err) => {
            this.errors = err.response.data.message
        }).finally(action(() => {
            this.inProgress = false
        }))
    }

    @action 
    logout = () => {
        return DeleteUserFromLocalStorageAction()
    }
}