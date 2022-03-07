import moment from "moment";


const tools = {
    // date
   
    utcToLocal(date) {
      return moment(new Date(date)).format("DD-MM-YYYY");
    },

    // input
    ValidateEmail(mail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      } else {
        return false;
      }
    },
  
    isAllNumeric(value) {
      return new RegExp(/^-?\d+(\.\d{1,64})?$/).test(value);
    },
    isNumeric(value) {
      return new RegExp(/^-?\d+$/).test(value);
    },
  }
  export default tools;