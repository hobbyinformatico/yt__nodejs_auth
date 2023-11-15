
export default class Urls {

    static BASE_URL = 'http://localhost:4000';
    static LOGIN = `${Urls.BASE_URL}/auth/login`;
    static LOGIN_ADMIN = `${Urls.BASE_URL}/auth/login_admin`;
    static APPLICATION_LIST = `${Urls.BASE_URL}/auth/application/list`;
    static APPLICATION_FORM_FIELDS = `${Urls.BASE_URL}/auth/application/form_fields`;
    static APPLICATION_CREATE = `${Urls.BASE_URL}/auth/application/create`;
    static APPLICATION_UPDATE = `${Urls.BASE_URL}/auth/application/update`;
    static APPLICATION_DELETE = `${Urls.BASE_URL}/auth/application/delete`;
    static USER_LIST = `${Urls.BASE_URL}/auth/user/list`;
    static USER_FORM_FIELDS = `${Urls.BASE_URL}/auth/user/form_fields`;
    static USER_CREATE = `${Urls.BASE_URL}/auth/user/create`;
    static USER_UPDATE = `${Urls.BASE_URL}/auth/user/update`;
    static USER_DELETE = `${Urls.BASE_URL}/auth/user/delete`;

}