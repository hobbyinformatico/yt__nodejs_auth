import RestManager from '../providers/RestManager';
import Urls from '../settings/Urls';

export default class Api {

    ///
    static async test_auth_get() {
        const url = `${Urls.BASE_URL}/test_auth_get`;
        const res = await RestManager.get(url);
        return res;
    }

    ///
    static async test_auth_post() {
        const url = `${Urls.BASE_URL}/test_auth_post`;
        const res = await RestManager.post(url);
        return res;
    }

    ///
    static async applicationsList() {
        const url = Urls.APPLICATION_LIST;
        const res = await RestManager.post(url);
        return res;
    }

    ///
    static async applicationsFormFields() {
        const url = Urls.APPLICATION_FORM_FIELDS;
        const res = await RestManager.post(url);
        if (res.status === RestManager.STATUS_OK) {
            return res;
        }
        return [];
    }

    ///
    static async applicationCreate(data) {
        const url = Urls.APPLICATION_CREATE;
        const res = await RestManager.post(url, data);
        return res;
    }

    ///
    static async applicationUpdate(data) {
        const url = Urls.APPLICATION_UPDATE;
        const res = await RestManager.post(url, data);
        return res;
    }

    ///
    static async applicationDelete(id) {
        const url = Urls.APPLICATION_DELETE;
        const res = await RestManager.post(url, { id: id });
        return res;
    }

    ///
    static async usersList() {
        const url = Urls.USER_LIST;
        const result = await RestManager.post(url);
        return result;
    }

    ///
    static async usersFormFields() {
        const url = Urls.USER_FORM_FIELDS;
        const res = await RestManager.post(url);
        if (res.status === RestManager.STATUS_OK) {
            return res;
        }
        return [];
    }

    ///
    static async userCreate(data) {
        const url = Urls.USER_CREATE;
        const result = await RestManager.post(url, data);
        return result;
    }

    ///
    static async userUpdate(data) {
        const url = Urls.USER_UPDATE;
        const res = await RestManager.post(url, data);
        return res;
    }

    ///
    static async userDelete(id) {
        const url = Urls.USER_DELETE;
        const res = await RestManager.post(url, { id: id });
        return res;
    }
}