const start = "http://core.leadplaner.com:3001/";
export const BLOG_ADD = start+"api/admin/blog/add"
export const BLOG_EDIT = start+"api/admin/blog/edit/";
export const BLOG_GET = start+"api/admin/blog/get";
export const GET_TAG = start+"api/admin/blog/tag/getAll";
export const SEC_GET = start+"api/admin/blog/section/getByBlog/";
export const IMAGE_UP = start+"api/admin/blog/addImg";
export const IMAGE_DEL = start+"api/admin/blog/deleteImg/";
export const IMG_BASE = start+"blog/";
// ====================================================================employee apis
export const EMPLOYEE_UPDATE = start+"api/employee/edit/";
export const EMPLOYEE_ADD = start+"api/employee/add";
export const EMPLOYEE_GET = start+"api/employee/getAll";
export const EMPLOYEE_GETID = start+"api/employee/get/1";
export const REMOVE_DOC = start+"api/employee/removeDoc/";
export const UPLOAD_DOC = start+"api/employee/uploadDoc";
export const VIEW_IMG = start+"employee/doc/";
//====================================================================site pages
export const GET_SITEPGS = start+"api/site/getAll";
export const PUT_SITEPGS = start+"api/site/edit/";
export const ADD_SITEPGS = start+"api/site/add";
export const SALARY_SLIP = start+"api/employee/getPayslip/1";