import store from '../store';
import types from '../types';
import actions from '.';
import {auth} from '../../config/firebaseConfig';
const {dispatch} = store;

export function loginUser(email, password) {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_START,
    });
    actions
      .signInUserToFirebase(auth, email, password)
      .then(res => {
        dispatch({
          type: types.LOGIN,
          payload: res,
        });
      })
      .catch(err => {
        dispatch({
          type: types.ERROR,
        });
      });
  };
}

export function logoutUser() {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_START,
    });
    actions
      .signOutUserFromFirebase(auth)
      .then(res => {
        dispatch({
          type: types.LOGOUT,
        });
      })
      .catch(err => {
        dispatch({
          type: types.ERROR,
        });
      });
  };
}

export function getUserProducts() {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_START,
    });
    actions
      .getProducts()
      .then(res => {
        console.log("CHECK PRODS RES : ", res)
        const productList = res.docs.map(doc =>
          ({
          ...doc.data(), id:doc.id
          }));
        dispatch({
          type: types.GET_USER_PRODUCTS,
          payload: productList,
        });
      })
      .catch(err => {
        dispatch({
          type: types.ERROR,
        });
      });
  };
}
