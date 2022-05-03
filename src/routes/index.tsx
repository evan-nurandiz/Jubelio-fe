import { useObserver } from 'mobx-react-lite';
import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useRootStore } from '../mobx';
import {LoginPage, RegisterPage} from '../pages'
import ProductsPage from '../pages/admin/products';

const Router: React.FC = (): JSX.Element => {
  return useObserver(() => (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <Navigate to="/auth/login" replace />
          }/>
          <Route path='/admin/*' element={
            <RouteMiddleware redirectTo={'/auth/login'}>
              <Routes>
                <Route path='product' element={<ProductsPage/>}/>
              </Routes>
            </RouteMiddleware>
          }/> :
          <Route path='/auth/*' element={
            <AuthMiddleware redirectTo={'/admin/product'}>
              <Routes>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='register' element={<RegisterPage/>}/>
              </Routes>
            </AuthMiddleware>
          } />
        </Routes>
      </BrowserRouter>
    </>
  ));
};

const AuthMiddleware = ({children, redirectTo}:any) => {
  const {authStore} = useRootStore()
  let isLogedIn = false

  const userData = localStorage.getItem('user')
  
  if(userData){
    authStore.setCurrentUser(JSON.parse(userData))
    isLogedIn = true
  }

  return !isLogedIn ? children : <Navigate to={redirectTo}/>;
}

export const RouteMiddleware = ({ children, redirectTo }:any) => {    
  let isValid = false

  const userData = localStorage.getItem('user')
  
  if(userData){
    isValid = true
  }

  return isValid ? children : <Navigate to={redirectTo}/>;
}

export default Router;