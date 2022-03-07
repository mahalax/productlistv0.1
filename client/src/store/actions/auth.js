import { AUTH_SIGNIN,AUTH_SIGNUP } from '../constants/actionTypes.js';
import * as api from '../api/index.js';
import { toast } from 'react-toastify';
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);   
    dispatch({ type: AUTH_SIGNIN, data });
    router.push("/")   
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message)
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log('sign up data : ' + JSON.stringify(data))
    dispatch({ type: AUTH_SIGNUP, data });
    alert('successfully registered')
    router.push("/")
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message)
  }
};