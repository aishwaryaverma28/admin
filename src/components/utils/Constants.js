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
    //   // Clear JWT token from local storage
    // localStorage.removeItem("jwtToken");
    // localStorage.removeItem("landingUrl");
    // localStorage.removeItem("id");
    // localStorage.removeItem("encryptedUserPathTot");
    // // Redirect to the home page or any other desired path
    //   window.location.href = "https://www.leadplaner.com/user/login";
    localStorage.clear();
    window.location.href = "http://core.leadplaner.com/";
  };
// =============================================================apis used  
const start = "http://core.leadplaner.com:3001/";
const userId = localStorage.getItem('id');
export const USER_INFO = start + "api/user/getuserinfo";
export const USER_UPDATE = start + "api/user/update";
export const COUNTRIES = start+"api/user/getcountries";
export const ELIGIBLE_LOANS = start + "api/user/geteligibilitycriteria";
//===============================================================login apis
export const LOGIN = start+"api/user/login";
export const CREATE_ACC = start+"api/user/createaccount";
export const OTP = start + "api/user/send-otp";
export const MAIN_PASS = start + "api/user/forgot-password";
export const VERIFY_OTP = start + "api/user/verify-otp"
//==============================================================blog apis
export const BLOG_ADD = start+"api/blog/add"
export const BLOG_EDIT = start+"api/blog/edit/";
export const BLOG_GET = start+"api/blog/get";
export const BLOG_GETID = start + "/api/blog/get/";
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
export const GET_USER_EMPLOYEE = start+"api/user/getuserinfo"; 
//====================================================================site pages
export const GET_SITEPGS = start+"api/site/getAll";
export const PUT_SITEPGS = start+"api/site/edit/";
export const ADD_SITEPGS = start+"api/site/add";
export const PAYSLIPS = start+"api/employee/getpayslips";
export const PAYSLIP = start+"api/employee/getpayslip/";

//===================================================================leadplaner
export const GET_LEAD = start+"api/lead/getall";
export const GET_LEAD_ID = start+"api/lead/get/";
export const ADD_LEAD = start+"api/lead/add";
export const IMPORT_CSV = start+"api/lead/importcsv";
export const EXPORT_CSV = start+"api/lead/exporttocsv";
export const UPDATE_LEAD = start+"api/lead/edit";
export const ADD_USER = start+"api/user/addteammember";
export const GET_TEAM_MEM = start+"api/user/getteammember";
export const MOVELEAD_TO_TRASH = start+"api/lead/movetotrash"
export const GET_ALL_LEAD_TRASH = start + "api/lead/getallfromtrash";
export const RESTORE_LEAD_TRASH = start + "api/lead/restorefromtrash";
export const DELETE_LEAD_TRASH = start + "api/lead/deletefromtrash";
export const GET_ALL_FROM_TRASH = start + "api/lead/getallfromtrash";
export const GET_ALL_ROLES = start + "api/user/getallroles";
export const GET_LABEL = start + "api/setting/label/getAll";
export const ADD_LABEL = start + "api/setting/label/add";
export const UPDATE_TEAM_MEM = start + "api/user/updateteammember/";
export const GET_ROLES_BY_USER = start +"api/user/getrolesByUser/";
export const UPDATE_LABEL = start + "api/setting/label/edit/1";
export const GET_PASSWORD = start + "api/setting/password/get";
export const EDIT_PASSWORD = start + "api/setting/password/edit";
//=======================================================================notes
export const ADD_NOTES = start+"api/note/add";
export const GETNOTEBYSOURCE = start+"api/note/getbysource/lead/";
export const GETNOTEDEAL = start+"api/note/getbysource/deal/";
export const UPDATE_NOTE = start+"api/note/edit/";
export const DELETE_NOTE = start+"api/note/delete/";
export const MOVENOTE_TO_TRASH = start +"api/note/movetotrash";
export const GETNOTE_FROM_TRASH = start +"api/note/getnotesfromtrash";
export const RESTORE_NOTE_TRASH = start + "api/note/restorefromtrash";
export const DELETE_NOTE_TRASH = start + "api/note/deletefromtrash";

//========================================================================COMPANY settings
export const ADD_TICKET = start + "api/user/ticket/raise";
export const SERVICE_SUPPORT = start + "api/user/ticket/getAll/all";
export const UPDATE_TICKET = start + "api/user/ticket/update/";
export const GET_AUDIT = start + "api/setting/getAll";
export const UPDATE_AUDIT = start + "api/setting/edit/";
export const GET_SERVICE = start + "api/user/ticket/getmytickets";

export const GET_ALL_SEARCH = start + "api/user/help/searchquestion";
export const GET_SEARCH_ID = start + "api/user/help/getbyid/";

export const ADD_PRODUCT = start + "api/product/add";
export const UPDATE_PRODUCT = start + "api/product/edit/";
export const GET_ALL_PRODUCT = start + "api/product/getall";

export const REQ_DOCUMENT = start + "api/setting/requireddocs/";
export const ADD_DOCUMENT = start + "api/setting/adddocindocumentmaster";
export const UPDATE_DOCUMENT = start + "api/setting/updatedocmaster";

//========================================================================Deals
export const GET_ALL_DEAL = start + "api/deal/getall";
export const ADD_DEAL = start + "api/deal/add";
export const GET_DEAL_ID = start + "api/deal/get/";
export const MOVEDEAL_TO_TRASH = start + "api/deal/movetotrash";
export const GETDEAL_FROM_TRASH = start + "api/deal/getallfromtrash";
export const RESTORE_DEAL_TRASH = start + "api/deal/restorefromtrash";
export const DELETE_DEAL_TRASH = start + "api/deal/deletefromtrash";
export const UPDATE_DEAL = start + "api/deal/edit/";
export const GET_ALL_STAGE = start + "api/deal/getAllStages";
export const ADD_STAGE = start + "api/deal/stages/add";

//========================================================================= master settings

export const ADD_HELP = start+"api/user/help/addquation";
export const GET_HELP_ID = start+"api/user/help/getbyid/";
export const UPDATE_HELP = start+"api/user/help/update/";


//===============================================================================Activity api
export const ADD_ACTIVITY = start + "api/leaddeal/activity/add";
export const GET_ACTIVITY = start + "api/leaddeal/activity/getbysource/";
export const DELETE_LEAD_ACTIVITY = start + "api/leaddeal/activity/delete/";
export const UPDATE_LEAD_ACTIVITY = start + "api/leaddeal/activity/edit/";

//=================================================================================upload documents
export const UPLOADED_DOCS = start + "api/deal/getuplaoddoc/";
export const UPLOAD_ATTACHMENTS = start + "api/deal/uplaoddoc";
export const VIEW_DOC = start + "deal/doc/";

//==================================================================fields api

export const GET_FIELDS = start + "api/lead/getleaddealactivefields/"
export const ADD_FIELDS = start + "api/lead/changecoloumns"

//==================================================owner api

export const GET_OWNER_LEAD = start + "api/lead/getbyowner/"
export const GET_OWNER_DEAL = start + "api/deal/getbyowner/"