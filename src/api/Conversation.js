

/**
 * GET /conversations/
GET /conversations/{user id}/
POST /conversations/messages/
conversations list
conversations read
conversations messages create
 */

import service from "../http";
const url = {

}

export default class Conversation{
    static async getConversations(){
        return service("/conversations/", {
            method: "get"
        })
    }
    static async getConversation(id){
        return service("/conversations/" + id + "/", {
            method: "get"
        })
    }
    static async patchConversationReadAll(id){
        return service("/conversations/" + id + "/read_all/", {
            method: "patch"
        })
    }
    static async getConversationWithUser(id){
        return service("/conversations/with_user/" + id + "/", {
            method: "get"
        })
    }
    static async getMessages(id, limit, offset){
        return service("/conversations/" + id + `/messages/?limit=${limit}&offset=${offset}`, {
            method: "get"
        })
    }
    static async postMessage(data){
        return service("/conversations/messages/", {
            method: "post",
            data
        })
    }
    static async patchParticipant(id, data){
        return service("/conversations/" + id + "/participant/", {
            method: "patch",
            data
        })
    }
}