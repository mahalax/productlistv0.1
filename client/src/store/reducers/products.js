
import { VIEWPRODUCT,VIEWALLPRODUCT} from '../constants/actionTypes';

export default (products = [], action) => {
  
  switch (action.type) {
    case VIEWPRODUCT:
      return  action.payload;
   
    case VIEWALLPRODUCT:
      return action.payload; 
    default:
      return products;
  }
};