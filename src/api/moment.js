/*
GET /moments/ moments_list
POST /moments/ moments_create
DELETE /moments/fid}/ moments_delete
PATCH /moments/fid}/forward/ moments_forward partial_update
POST /moments/{id}/like/ moments_like_createv
DELETE /moments/{id}/like/ moments_like_delete
POST /moments/comments/ moments_comments_create
DELETE /moments/comments/fid)/ moments comments delete
*/
import service from "../http";
const url = {

}

export default class Moment {
    static async getMoments(){
        return service("/moments/", {
            method: "get"
        })
    }
    static async createMoment(data){
        return service("/moments/", {
            method: "post",
            data
        })
    }
    static async deleteMoment(id){
        return service("/moments/" + id + "/", {
            method: "delete"
        })
    }
    static async forwardMoment(momentId, conversationId){
        return service("/moments/" + momentId + "/forward/" + conversationId + "/", {
            method: "patch",
        })
    }
    static async likeMoment(id){
        return service("/moments/" + id + "/like/", {
            method: "post"
        })
    }
    static async unlikeMoment(id){
        return service("/moments/" + id + "/like/", {
            method: "delete"
        })
    }
    static async createComment(data){
        return service("/moments/comments/", {
            method: "post",
            data
        })
    }
    static async deleteComment(id){
        return service("/moments/comments/" + id + "/", {
            method: "delete"
        })
    }
    static async getSingleMoment(id) {
        return service("/moments/" + id + "/", {
            method: "get"
        })
    }
    static async addImage(data) {
        return service("/moments/files/", {
            method: "post",
            data
        })
    }
    static async getEnterpriseMoments() {
        return service("/moments/enterprises/", {
            method: "get"
        })
    }
}