// import { create } from "naive-ui";
import service from "../http";
const url = {
    notice: "/notice",
    create: "/create",
    deleteAll: "/receiveDeleteAllRead",
    receiveList: "/receiveList",
    readAll: "/receiveReadAll",
    read: "/singleNoticeRead",
    delete: "/singleNoticeDelete"
}

export class Notice {
    static async createNotice(data) {
        return service(url.notice + url.create + "/", {
            method: "post",
            data
        })
    }

    static async deleteAllReadNotice() {
        return service(url.notice + url.deleteAll + "/", {
            method: "delete"
        })
    }

    static async getNotice(data) {
        return service(url.notice + url.receiveList + "/", {
            method: "get",
            data
        })
    }

    static async readAllNotice() {
        return service(url.notice + url.readAll + "/", {
            method: "patch"
        })
    }  

    static async readSingleNotice(id) {
        return service(url.notice + "/" + id + url.read + "/", {
            method: "post"
        })
    }  

    static async deleteSingleNotice(id) {
        return service(url.notice + "/" + id + url.delete, {
            method: "delete"
        })
    }  
    
}