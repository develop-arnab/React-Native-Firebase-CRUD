import React from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useSelector, useDispatch } from 'react-redux';
export default function AppNavigation() {
  const user = useSelector((state) => state.userReducer.userData)
  const  isLoggedIn  = user?._tokenResponse.registered ? true : false;

  return isLoggedIn ? <MainStack /> : <AuthStack />;
}
