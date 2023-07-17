import CryptoJS from 'crypto-js';
const secretKey = 'miyamura';
  const encryptedToken = localStorage.getItem('jwtToken'); // Assuming the encrypted token is stored in the 'token' key of the local storage
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  export const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
//=============================================================session time error handle
export const handleApiError = (error,navigate) => {
    // const navigate = useNavigate();
    // if (
    //   error.response &&
    //   error.response.data &&
    //   error.response.data.message === "Invalid or expired token."
    // ) {
    //   // Display an alert to the user
    //   alert("Your session has expired. Please login again.");
    //   // Clear JWT token from localStorage
    //   localStorage.removeItem("jwtToken");
  
    //   // Redirect to the login page
    //   navigate("/");
    // } else {
      console.log(error.response);
    // }
  };
// =============================================================apis used  
const start = "http://core.leadplaner.com:3001/";
//===============================================================login apis
export const LOGIN = start+"api/user/login";
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
export const EMPLOYEE_GETID = start+"api/employee/get/1";
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