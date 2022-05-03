import { useObserver } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {useRootStore} from '../../mobx/index'
import {Link, useNavigate} from 'react-router-dom'
import { autorun } from 'mobx';
import { toast } from 'react-toastify';

type RegisterPageProps = {}

const RegisterPage:React.FC<RegisterPageProps> = (props) => {
    const navigate = useNavigate();
    const {authStore} = useRootStore();

    useEffect(() => {
        autorun(() => {
            if(authStore.message !== '') {
                toast.success(authStore.message)
            }
        })
    },[authStore.message])

    useEffect(() => {
        autorun(() => {
            if(authStore.errors !== '') {
                toast.error(authStore.errors)
            }
        })
    },[authStore.errors])

    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault();
        authStore.register().then((res) => {
            if(authStore.message !== ''){
                navigate('/auth/login')
            }
        })
    }
    
    return useObserver(() => (
        <React.Fragment>
            <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register Account</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address" 
                                    onChange={(e) => authStore.setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password" 
                                    onChange={(e) => authStore.setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Confirm Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm Password" 
                                    onChange={(e) => authStore.setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="text-sm">
                            <Link to={'/'}>
                                <p className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Login Account
                                </p>
                            </Link>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    ))

};

export default RegisterPage;