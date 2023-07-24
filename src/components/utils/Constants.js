import CryptoJS from 'crypto-js';

const secretKey = 'mySecretKey123';
// const secretKey = "miyamura"; // Set your secret key for login

const getDecryptedToken = () => {
  const encryptedToken = localStorage.getItem('jwtToken');

  if (encryptedToken) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }

  return '';
};

export { getDecryptedToken };
const getDecryptedUserPath = () => {
const encryptedUserPathTot = localStorage.getItem("encryptedUserPathTot");
if (encryptedUserPathTot) {
// Decrypt the userPathTot
const decryptedBytes = CryptoJS.AES.decrypt(encryptedUserPathTot, secretKey);
return decryptedBytes.toString(CryptoJS.enc.Utf8);
}
return '';
}
export {getDecryptedUserPath}
  
  //=============================================================logout function
  export const handleLogout = () => {
      // Clear JWT token from local storage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("landingUrl");
    localStorage.removeItem("id");
    localStorage.removeItem("encryptedUserPathTot");
    // Redirect to the home page or any other desired path
      window.location.href = "https://www.leadplaner.com/user/login";
  };
// =============================================================apis used  
const start = "http://core.leadplaner.com:3001/";
const userId = localStorage.getItem('id');
export const USER_INFO = start + "api/user/getuserinfo";
//===============================================================login apis
export const LOGIN = start+"api/user/login";
export const CREATE_ACC = start+"api/user/createaccount";
//==============================================================blog apis
export const BLOG_ADD = start+"api/blog/add"
export const BLOG_EDIT = start+"api/blog/edit/";
export const BLOG_GET = start+"api/blog/get";
export const GET_TAG = start+"api/blog/tag/getall";
export const SEC_GET = start+"api/blog/section/getbyblog/";
export const IMAGE_UP = start+"api/blog/addImg";
export const IMAGE_DEL = start+"api/blog/deleteImg/";
export const IMG_BASE = start+"blog/";
// ====================================================================employee apis
export const EMPLOYEE_UPDATE = start+"api/employee/edit/";
export const EMPLOYEE_ADD = start+"api/employee/add";
export const EMPLOYEE_GET = start+"api/employee/getall";
export const EMPLOYEE_GETID = start+"api/employee/get/"+userId;
// export const EMPLOYEE_GETID = start+"api/employee/get/1";
export const REMOVE_DOC = start+"api/employee/removeDoc/";
export const UPLOAD_DOC = start+"api/employee/uploadDoc";
export const VIEW_IMG = start+"employee/doc/";
//====================================================================site pages
export const GET_SITEPGS = start+"api/site/getAll";
export const PUT_SITEPGS = start+"api/site/edit/";
export const ADD_SITEPGS = start+"api/site/add";
export const PAYSLIPS = start+"api/employee/getpayslips";
export const PAYSLIP = start+"api/employee/getpayslip/";

//===================================================================leadplaner
export const GET_LEAD = start+"api/lead/getall";
export const ADD_LEAD = start+"api/lead/add";
export const IMPORT_CSV = start+"api/lead/importcsv";
export const UPDATE_LEAD = start+"api/lead/edit/";
export const ADD_NOTES = start+"api/note/add";
export const GETNOTEBYSOURCE = start+"api/note/getbysource/lead/";
export const UPDATE_NOTE = start+"api/note/edit/"

export const ADD_USER = start+"api/user/addteammember";
export const GET_TEAM_MEM = start+"api/user/getteammember";