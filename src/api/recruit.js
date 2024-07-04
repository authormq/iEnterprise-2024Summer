/**
 * 
 POST /recruit/{enterprise id)/recruitment/  recruit recruitment create
DELETE /recruit/lenterprise id)/recruitment/  recruit_recruitment_delete
POST /recruit/{recruitment id}/apply/  recruit apply create
POST /recruit/{recruitment id)/recruit/  recruit recruit create
POST /recruit/{recruitment id)}/reply/  recruit reply createv
POST /recruit/manage_type/  recruit_manage_type_create
GET /recruit/recruitments/  recruit recruitments list



GET /recruit/recommend/
GET /recruit/recruitList/{parent id)/second/
GET /recruit/recruitList/first/
GET /recruit/recruitments/
 */
import service from "../http";
const url = {

}

export default class Recruit {
    static async createRecruitment(id, data) {
        return service("/recruit/" + id + "/create/", {
            method: "post",
            data
        })
    }
    static async deleteRecruitment(data) {
        return service("/recruit/" + data.id + "/recruitment/", {
            method: "delete",
            data
        })
    }
    static async applyRecruitment(data) {
        return service("/recruit/" + data.id + "/apply/", {
            method: "post",
            data
        })
    }
    static async recruitRecruitment(id, data) {
        return service("/recruit/" + id + "/recruit/", {
            method: "post",
            data
        })
    }
    static async createManageType(data) {
        return service("/recruit/manage_type/", {
            method: "post",
            data
        })
    }
    static async ApplyBetaRecruit(data) {
        return service("/recruit/beta_apply/", {
            method: "post",
            data
        })
    }
    static async GenerateInvitationCode() {
        return service("/recruit/generate_invitation_code/", {
            method: "post",
        })
    }
    static async getRecruitments(id, token) {
        return service(`/recruit/recruitments/?` + token + `=${id}`, {
            method: "get",
        })
    }
    static async getRecommendRecruitments() {
        return service("/recruit/recommend/", {
            method: "get"
        })
    }
    static async getSecondRecruitList(id) {
        return service("/recruit/recruitList/" + id + "/second/", {
            method: "get"
        })
    }
    static async getFirstRecruitList() {
        return service("/recruit/recruitList/first/", {
            method: "get"
        })
    }
    static async getHistoryRecruitments() {
        return service("/recruit/applications/", {
            method: "get"
        })
    }
    static async getApplications(id) {
        return service("/recruit/" + id + "/applyList/", {
            method: "get"
        })
    }
    static async getBetaList(id) {
        return service("/recruit/beta_list/" + id + "/", {
            method: "get"
        })
    }


    static async replyBetaRecruitment(id, data) {
        return service("/recruit/" + id + "/beta_reply/", {
            method: "post", 
            data
        })
    }

    static async replyRecruitment(id, data) {
        return service("/recruit/" + id + "/reply/", {
            method: "post", 
            data
        })
    }
}