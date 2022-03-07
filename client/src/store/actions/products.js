import {VIEWPRODUCT,VIEWALLPRODUCT} from '../constants/actionTypes';
import { toast } from 'react-toastify';
import * as api from '../api/index.js';
export const ViewProducts = (query) => async (dispatch) => {
    try {
      const { data } = await api.ViewProducts(query);
      dispatch({ type: VIEWPRODUCT, payload: data });
    } catch (error) {
      toast.error(error)
    }
  };
  
  export const ViewAllProducts = () => async (dispatch) => {
    try {
      const { data } = await api.ViewAllProducts();
      dispatch({ type: VIEWALLPRODUCT, payload: data });
    } catch (error) {
      toast.error(error)
    }
  };