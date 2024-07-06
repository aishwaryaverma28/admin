import CryptoJS from "crypto-js";
const secretKey = "mySecretKey123";
const secretKey2 = "IzumiMiyamura";
const getDecryptedToken = () => {
  const encryptedToken = localStorage.getItem("jwtToken");
  if (encryptedToken) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }

  return "";
};

export { getDecryptedToken };
const getDecryptedUserPath = () => {
  const encryptedUserPathTot = localStorage.getItem("encryptedUserPathTot");
  if (encryptedUserPathTot) {
    // Decrypt the userPathTot
    const decryptedBytes = CryptoJS.AES.decrypt(
      encryptedUserPathTot,
      secretKey
    );
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }
  return "";
};
export { getDecryptedUserPath };
//=============================================================config
const encryptedId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
let decryptedId = "";
if (encryptedId) {
  decryptedId = CryptoJS.AES.decrypt(encryptedId, secretKey2).toString(CryptoJS.enc.Utf8);
}

const encryptedKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
let decryptedKey = "";
if (encryptedKey) {
  decryptedKey = CryptoJS.AES.decrypt(encryptedKey, secretKey2).toString(CryptoJS.enc.Utf8);
}

export const config = {
  bucketName: "bmp1",
  region: "ap-south-1",
  dirName: "test/17",
  accessKeyId: decryptedId,
  secretAccessKey: decryptedKey,
};
// export const config = {
//     bucketName: "bmp1",
//     region: "ap-south-1",
//     dirName: "test/17",
//     accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//   };
//=============================================================logout function
export const handleLogout = () => {
  if (localStorage.length === 0) {
    window.location.href = "https://core.leadplaner.com/login";
  } else {
    localStorage.clear();
    window.location.href = "https://core.leadplaner.com/login";
  }
};
// =============================================================apis used
// export const cdnurl = "https://d2bdxhtfh3zsqc.cloudfront.net/";
export const cdnurl = "https://d146zb2foqhwdd.cloudfront.net/";
const start = "https://core.leadplaner.com/api/api";
const bmpStart = "https://bmp.leadplaner.com/api/api";
const userId = localStorage.getItem("id");
export const USER_INFO = start + "/user/getuserinfo";
export const BMP_USER = start + "/bmp/getUser";
export const USER_UPDATE = start + "/user/update";
export const COUNTRIES = start + "/user/getcountries";
export const ELIGIBLE_LOANS = start + "/user/geteligibilitycriteria";
//===============================================================login apis
export const LOGIN = start + "/user/login";
export const CREATE_ACC = start + "/user/createaccount";
export const OTP = start + "/user/send-otp";
export const MAIN_PASS = start + "/user/forgot-password";
export const VERIFY_OTP = start + "/user/verify-otp";
//==============================================================blog apis
export const BLOG_ADD = bmpStart + "/blog/add";
export const BLOG_EDIT = bmpStart + "/blog/edit/";
export const BLOG_GET = bmpStart + "/blog/get";
export const BLOG_GETID = bmpStart + "/blog/get/";
export const GET_TAG = bmpStart + "/blog/tag/getall";
export const GET_TAG_CATEGORY = bmpStart + "/blog/tag/getcategories/";
export const GET_TAG_BY_SITE = bmpStart + "/blog/tag/getbysite/";
export const SEC_GET = bmpStart + "/blog/section/getbyblog/";
export const SEC_UPDATE = bmpStart + "/blog/section/update/";
export const SEC_ADD = bmpStart + "/blog/section/add/";
export const BACKLINKS = bmpStart + "/bmp/backlinks/getall";
// ====================================================================employee apis
export const EMPLOYEE_UPDATE = start + "/employee/edit/";
export const EMPLOYEE_ADD = start + "/employee/add";
export const EMPLOYEE_GET = start + "/employee/getall";
export const EMPLOYEE_GETID = start + "/employee/get/" + userId;
export const REMOVE_DOC = start + "/employee/removeDoc/";
export const UPLOAD_DOC = start + "/employee/uploadDoc";
export const VIEW_IMG = start + "employee/doc/";
export const GET_USER_EMPLOYEE = start + "/user/getuserinfo";
export const GET_USER_ID = start + "/user/getuserinfobyid";
//====================================================================site pages
export const GET_SITEPGS = start + "/site/getAll";
export const PUT_SITEPGS = start + "/site/edit/";
export const ADD_SITEPGS = start + "/site/add";
export const PAYSLIPS = start + "/employee/getpayslips";
export const PAYSLIP = start + "/employee/getpayslip/";
//===================================================================leadplaner
export const GET_LEAD = start + "/lead/getall";
export const GET_LEAD_ID = start + "/lead/get/";
export const ADD_LEAD = start + "/lead/add";
export const IMPORT_CSV = start + "/lead/importcsv";
export const UPDATE_LEAD = start + "/lead/edit";
export const ADD_USER = start + "/user/addteammember";
export const GET_TEAM_MEM = start + "/user/getteammember/all";
export const GET_ACTIVE_TEAM_MEM = start + "/user/getteammember/active";
export const GET_DEACTIVE_TEAM_MEM = start + "/user/getteammember/deactive";
export const MOVELEAD_TO_TRASH = start + "/lead/movetotrash";
export const GET_ALL_LEAD_TRASH = start + "/lead/getallfromtrash";
export const RESTORE_LEAD_TRASH = start + "/lead/restorefromtrash";
export const DELETE_LEAD_TRASH = start + "/lead/deletefromtrash";
export const GET_ALL_FROM_TRASH = start + "/lead/getallfromtrash";
export const GET_ALL_ROLES = start + "/user/getallroles";
export const GET_LABEL = start + "/setting/label/getAll";
export const ADD_LABEL = start + "/setting/label/add";
export const UPDATE_TEAM_MEM = start + "/user/updateteammember/";
export const GET_ROLES_BY_USER = start + "/user/getrolesByUser/";
export const UPDATE_LABEL = start + "/setting/label/edit/1";
export const GET_PASSWORD = start + "/setting/password/get";
export const EDIT_PASSWORD = start + "/setting/password/edit";
//=======================================================================notes
export const ADD_NOTES = start + "/note/add";
export const GETNOTEBYSOURCE = start + "/note/getbysource/lead/";
export const GETNOTEDEAL = start + "/note/getbysource/deal/";
export const GETNOTECOMPANY = start + "/note/getbysource/xx_company/";
export const GETNOTEPEOPLE = start + "/note/getbysource/xx_contact_person/";
export const UPDATE_NOTE = start + "/note/edit/";
export const DELETE_NOTE = start + "/note/delete/";
export const MOVENOTE_TO_TRASH = start + "/note/movetotrash";
export const GETNOTE_FROM_TRASH = start + "/note/getnotesfromtrash";
export const RESTORE_NOTE_TRASH = start + "/note/restorefromtrash";
export const DELETE_NOTE_TRASH = start + "/note/deletefromtrash";
//========================================================================COMPANY settings
export const GET_ORG_DATA = start + "/user/getorg/";
export const ADD_TICKET = start + "/user/ticket/raise";
export const SERVICE_SUPPORT = start + "/user/ticket/getAll/all";
export const UPDATE_TICKET = start + "/user/ticket/update/";
export const GET_AUDIT = start + "/setting/getAll";
export const UPDATE_AUDIT = start + "/setting/edit/";
export const GET_SERVICE = start + "/user/ticket/getmytickets/";

export const GET_ALL_SEARCH = start + "/user/help/searchquestion";
export const GET_SEARCH_ID = start + "/user/help/getbyid/";

export const ADD_PRODUCT = start + "/product/add";
export const UPDATE_PRODUCT = start + "/product/edit/";
export const GET_ALL_PRODUCT = start + "/product/getall";

export const REQ_DOCUMENT = start + "/setting/requireddocs/";
export const ADD_DOCUMENT = start + "/setting/adddocindocumentmaster";
export const UPDATE_DOCUMENT = start + "/setting/updatedocmaster";
export const IMPORT_DETAILS = start + "/setting/getlogs/";
//========================================================================Deals
export const GET_ALL_DEAL = start + "/deal/getall";
export const ADD_DEAL = start + "/deal/add";
export const GET_DEAL_ID = start + "/deal/get/";
export const MOVEDEAL_TO_TRASH = start + "/deal/movetotrash";
export const GETDEAL_FROM_TRASH = start + "/deal/getallfromtrash";
export const RESTORE_DEAL_TRASH = start + "/deal/restorefromtrash";
export const DELETE_DEAL_TRASH = start + "/deal/deletefromtrash";
export const UPDATE_DEAL = start + "/deal/edit";
export const GET_ALL_STAGE = start + "/deal/getAllStages";
export const ADD_STAGE = start + "/deal/stages/add";
export const IMPORT_DEAL = start + "/deal/import";
//========================================================================= master settings
export const ADD_HELP = start + "/user/help/addquation";
export const GET_HELP_ID = start + "/user/help/getbyid/";
export const UPDATE_HELP = start + "/user/help/update/";
export const CHECK_LEAD_DEAL = start + "/user/getleaddealbymember";
//===============================================================================Activity api
export const ADD_ACTIVITY = start + "/leaddeal/activity/add";
export const GET_ACTIVITY = start + "/leaddeal/activity/getbysource/";
export const DELETE_LEAD_ACTIVITY = start + "/leaddeal/activity/delete/";
export const UPDATE_LEAD_ACTIVITY = start + "/leaddeal/activity/edit/";
//=================================================================================upload documents
export const UPLOADED_DOCS = start + "/deal/getuplaoddoc/";
export const UPLOAD_ATTACHMENTS = start + "/deal/uplaoddoc";
export const VIEW_DOC = start + "deal/doc/";
//==================================================================fields api
export const GET_FIELDS = start + "/lead/getleaddealactivefields/";
export const ADD_FIELDS = start + "/lead/changecoloumns";
//==================================================owner api
export const GET_OWNER_LEAD = start + "/lead/getbyowner/";
export const GET_OWNER_DEAL = start + "/deal/getbyowner/";
//=================================================================================email apis
export const ADD_EMAIL = start + "/lead/sendleaddealemail";
export const POST_EMAIL = start + "/lead/getleaddealsentemail";
//=================================================================================company apis
export const IMPORT_COMPANY = start + "/contact/company/import";
export const ADD_COMPANY = start + "/contact/company/add";
export const UPDATE_COMPANY = start + "/contact/company/edit/";
export const ALL_COMPANY = start + "/contact/company/get";
export const MOVE_TO_BIN = start + "/contact/movetotrash";
export const GET_BIN_COMPANY = start + "/contact/getfromtrash";
export const RESTORE_COMPANY = start + "/contact/removefromtrash";
export const DELETE_COMPANY = start + "/contact/deletefromtrash";
export const GET_COMPANY = start + "/contact/getById";
//=======================================people apis
export const IMPORT_PEOPLE = start + "/contact/person/import";
export const ADD_PEOPLE = start + "/contact/person/add";
export const UPDATE_PEOPLE = start + "/contact/person/edit/";
export const ALL_PEOPLE = start + "/contact/person/get";
//=========================================================log api
export const LOG_RECORD = start + "/user/createlog";
//===========================================================docusign apis
export const ENVELOPE_TOKEN =
  start + "/thirdPartyApiRouter/docusign/refreshtoket/get";
export const SEND_ENVELOPE =
  start + "/thirdPartyApiRouter/docusign/envelope/send";
export const ENVELOPE_DETAILS =
  start + "/thirdPartyApiRouter/docusign/envelope/get";

//============================================================bmp apis
export const BMP_LOGIN = start + "/bmp/login";
export const GET_ACADEMY = bmpStart + "/bmp/academy/get";
export const UPDATE_ACADEMY = bmpStart + "/bmp/academy/update/";
export const ADD_BATCH = start + "/bmp/batch/add";
export const GET_BATCH = start + "/bmp/batch/get";
export const UPDATE_BATCH = start + "/bmp/batch/update/";
export const GET_ALL_REVIEW = start + "/bmp/academy/getreviews";
export const GET_REVIEW_REPLY = start + "/bmp/academy/getreviewreply";
export const GET_ACC_REVIEW = start + "/bmp/academy/getreviewreport";
export const GET_ACC_LEAD = start + "/bmp/academy/leads/get/";
export const ADD_REPLY = start + "/bmp/academy/review/reply";
export const RESTRICTED_KEYWORDS = start + "/bmp/getrestrictedkeywords";
//==============================================================bmp reviews
export const BMP_ACADEMY_ALL_REVIEWS = start + "/bmp/academy/getreviewsbytype";
export const UPDATE_ACADEMY_REVIEW = start + "/bmp/academy/review/update/";

//===============================================================league apis
export const GET_ALL_LEAGUE = start + "/bmp/league/getall";
export const ADD_LEAGUE = start + "/bmp/league/add";
export const GET_LEAGUE_BY_ID = start + "/bmp/league/get/";
export const UPDATE_LEAGUE = start + "/bmp/league/update/";

//=====================================================================lead review
export const GET_ALL_LEADS = start + "/ezuka/leads/get-all";

export const ADD_BMP_LEADS = bmpStart +"/bmp/createLeads";
export const GET_STATS = bmpStart + "/bmp/getstats";
export const UPDATE_LEADS = bmpStart + "/bmp/updateLead/";
export const EMAIL_PHONE= bmpStart+"/bmp/checkLeadsExist";
export const GET_ALL_BMP_LEADS = bmpStart+"/bmp/leads/getall";

//==============================================================bmp lead apis
export const ACADMEY_SEARCH = bmpStart + "/bmp/academy/search";
export const ACADMEY_NOTE = bmpStart+ "/bmp/note/add";
export const ACADMEY_NOTE_SOURCE = bmpStart+ "/bmp/note/getBySource";
export const ACADMEY_NOTE_UPDATE= bmpStart + "/bmp/note/update/";
export const ACADMEY_SEARCH_API = bmpStart + "/bmp/academy/search/entity/";
export const SEARCH_ACADMEY_ID = bmpStart+"/bmp/academy/search/id/";
export const ACADMEY_ACTIVITY = bmpStart + "/bmp/activity/add";
export const ACADMEY_ACTIVITY_SOURCE = bmpStart+ "/bmp/activity/getBySource";
export const ACADMEY_ACTIVITY_UPDATE = bmpStart+ "/bmp/activity/update/";
export const ADD_NEW_ACADMEY = bmpStart+"/bmp/academy/add";
export const ASSIGN_ACADEMY = bmpStart+"/bmp/user/assignacademy";
export const ASSIGN_NEW_ACADEMY= bmpStart+"/bmp/user/assignnewacademy";
export const BACKLIST_DATA = bmpStart+"/blog/backlink/getstats";
export const ACADMEY_LEADS_DETAILS = bmpStart + "/bmp/leads/get";
export const ADD_COACH= bmpStart+"/bmp/coach/add"
export const GET_COACH = bmpStart + "/bmp/getEntities";
export const GET_COACH_ID = bmpStart+"/bmp/coach/get";
export const UPDATE_COACH = bmpStart+"/bmp/coach/update/";
export const ASSIGN_NEW_COACH = bmpStart+"/bmp/user/assignnewcoach";
export const ALL_BMP_USER = bmpStart+"/bmp/user/getall";
export const BMP_USER_UPDATE = bmpStart+"/bmp/user/update/";
export const BMP_USER_DATA = bmpStart+ "/bmp/user/get";
export const BMP_USER_TICKETS= bmpStart+"/bmp/user/getTickets";
export const UPDATE_PLAYER = bmpStart+"/bmp/player/update/";
export const GET_BMPUSER_ID = bmpStart+"/bmp/user/getbyobj";
export const USER_LOG = bmpStart+"/bmp/log/getUserActivity";
export const MOST_LEADS= bmpStart+"/bmp/entity/getstats";
export const ACADMEY_VEREFIED = bmpStart+"/bmp/entity/getverified";

export const FILTER_TICKETS = bmpStart+"/bmp/tickets/filter"; 
export const REPLY_TICKET = bmpStart+"/bmp/tickets/addreply";

export const GET_PLAYER_ID = bmpStart+"/bmp/player/getById";
export const ADD_PLAYER = bmpStart+"/bmp/player/add";
// academy leads apis need to be deleted with folder 
export const DISTANCE_API = bmpStart+"/bmp/academy/getnearby";
export const LEADS_CITY = bmpStart+"/bmp/leads/getbycity";
export const ASSIGN_LEADS_USER = bmpStart+"/bmp/leads/assign";

export const SHOW_URL = bmpStart+"/bmp/redirect/get";
export const GET_OTP = bmpStart+"/bmp/log/getOtps";
export const LEADS_BY_CITY = bmpStart+"/bmp/leads/getByCities";
export const LEADS_BY_ENTITY = bmpStart+"/bmp/entity/getByCities";
export const ALL_SPORTS = bmpStart+ "/bmp/master/sport";
export const REDIRECT_FIND = bmpStart+"/bmp/redirect/find"
export const ALL_REVIEWS = bmpStart+"/bmp/review/get-by-entity";
export const GET_ALL_CITY = bmpStart+"/bmp/master/get-cities";
export const UPDATE_REVIEW = bmpStart+"/bmp/review/update";
export const SEARCH_CITY = bmpStart+"/bmp/master/search-city";
export const ADD_CITY = bmpStart+"/bmp/master/insert/city";
export const APPROVE_CITY =bmpStart+"/bmp/master/city/mark-correct";
export const SEARCH_API = bmpStart+"/bmp/searchEntity/";

export const ADD_FAQ = bmpStart+"/bmp/coach/addfaq";
export const GET_FAQS = bmpStart+"/bmp/coach/getfaqs/";
export const DELETE_FAQS = bmpStart+"/bmp/coach/deletefaqs/";
export const UPDATE_FAQS =bmpStart+"/bmp/coach/updatefaq/";
// academy tickets
export const  ACADEMY_TICKETS = bmpStart+"/bmp/tickets/get-all";
export const REPLY_TO_TICKET = bmpStart+"/bmp/ticket/update/";
// archive table
export const GET_ARCHIVED = bmpStart+"/bmp/entities/getbyarchivestatus";
// support apis
export const ADD_NEW_TICKET =bmpStart+"/bmp/ticket/add";
export const ADD_TICKET_REPLY = bmpStart+"/bmp/ticket/add-reply";
export const GET_USER_TICKETS = bmpStart+"/bmp/ticket/get/";