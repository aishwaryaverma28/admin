import CryptoJS from 'crypto-js';
// import { id } from 'date-fns/locale';

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
    localStorage.clear();
    window.location.href = "http://core.leadplaner.com/";
    // window.location.href = " https://fiduciagroup.leadplaner.com/";
  };
// =============================================================apis used  
const start = "http://core.leadplaner.com:3001/";
// const start = "https://fiduciagroup.leadplaner.com//api/"
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
export const BLOG_GETID = start + "api/blog/get/";
export const GET_TAG = start+"api/blog/tag/getall";
export const GET_TAG_CATEGORY = start+"api/blog/tag/getcategories";
export const GET_TAG_BY_SITE = start+"api/blog/tag/getbysite/";
export const SEC_GET = start+"api/blog/section/getbyblog/";
export const IMAGE_UP = start+"api/blog/addImg";
export const IMAGE_DEL = start+"api/blog/deleteImg/";
export const IMG_BASE = start+"blog/";
export const SEC_UPDATE = start+"api/blog/section/update/";
export const SEC_ADD = start+"api/blog/section/add/";
// ====================================================================employee apis
export const EMPLOYEE_UPDATE = start+"api/employee/edit/";
export const EMPLOYEE_ADD = start+"api/employee/add";
export const EMPLOYEE_GET = start+"api/employee/getall";
export const EMPLOYEE_GETID = start+"api/employee/get/"+userId;
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
export const UPDATE_LEAD = start+"api/lead/edit";
export const ADD_USER = start+"api/user/addteammember";
export const GET_TEAM_MEM = start+"api/user/getteammember/all";
export const GET_ACTIVE_TEAM_MEM = start+"api/user/getteammember/active";
export const GET_DEACTIVE_TEAM_MEM = start+"api/user/getteammember/deactive";
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
export const GETNOTECOMPANY = start+"api/note/getbysource/xx_company/";
export const GETNOTEPEOPLE = start+"api/note/getbysource/xx_contact_person/";
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
export const IMPORT_DETAILS = start + "api/setting/getlogs/";
//========================================================================Deals
export const GET_ALL_DEAL = start + "api/deal/getall";
export const ADD_DEAL = start + "api/deal/add";
export const GET_DEAL_ID = start + "api/deal/get/";
export const MOVEDEAL_TO_TRASH = start + "api/deal/movetotrash";
export const GETDEAL_FROM_TRASH = start + "api/deal/getallfromtrash";
export const RESTORE_DEAL_TRASH = start + "api/deal/restorefromtrash";
export const DELETE_DEAL_TRASH = start + "api/deal/deletefromtrash";
export const UPDATE_DEAL = start + "api/deal/edit";
export const GET_ALL_STAGE = start + "api/deal/getAllStages";
export const ADD_STAGE = start + "api/deal/stages/add";
export const IMPORT_DEAL = start+"api/deal/import";
//========================================================================= master settings

export const ADD_HELP = start+"api/user/help/addquation";
export const GET_HELP_ID = start+"api/user/help/getbyid/";
export const UPDATE_HELP = start+"api/user/help/update/";
export const CHECK_LEAD_DEAL = start+"api/user/getleaddealbymember";


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


//=================================================================================email apis
export const ADD_EMAIL = start + "api/lead/sendleaddealemail";
export const POST_EMAIL =start + "api/lead/getleaddealsentemail";

//=================================================================================company apis
export const IMPORT_COMPANY = start + "api/contact/company/import";
export const ADD_COMPANY = start + "api/contact/company/add";
export const UPDATE_COMPANY = start + "api/contact/company/edit/";
export const ALL_COMPANY = start+ "api/contact/company/get";
export const MOVE_TO_BIN = start + "api/contact/movetotrash";
export const GET_BIN_COMPANY = start + "api/contact/getfromtrash";
export const RESTORE_COMPANY = start + "api/contact/removefromtrash";
export const DELETE_COMPANY = start + "api/contact/deletefromtrash";
export const GET_COMPANY = start + "api/contact/getById";
//=======================================people apis
export const IMPORT_PEOPLE = start + "api/contact/person/import";
export const ADD_PEOPLE = start + "api/contact/person/add";
export const UPDATE_PEOPLE = start + "api/contact/person/edit/";
export const ALL_PEOPLE = start + "api/contact/person/get";

//=========================================================log api

export const LOG_RECORD = start + "api/user/createlog";
