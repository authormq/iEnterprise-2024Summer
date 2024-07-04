import service from "../http";
/*
enterprises_control_enterprise_follow_create
enterprises_control_enterprise_follow_delete
enterprises_get_hot_staff_moment_list
enterprises_get_staff_list_list
enterprises_show_enterprise_list
enterprises_control_staff_create
enterprises_control_staff_delete
enterprises_create_enterprise_create
*/
const url = {

}
export default class Enterprise {
    static async followEnterprise(id) {
        return service("/enterprises/" + id + "/control_enterprise_follow/", {
            method: "post",
        })
    }
    static async unfollowEnterprise(id) {
        return service("/enterprises/" + id + "/control_enterprise_follow/", {
            method: "delete",
        })
    }
    static async getHotStaffMoment(id) {
        return service("/enterprises/" + id + "/get_hot_staff_moment", {
            method: "get",
        })
    }
    static async getStaffList(id) {
        return service("/enterprises/" + id + "/get_staff_list", {
            method: "get",
        })
    }
    static async showEnterprise(data) {
        return service("/enterprises/" + data.id + "/show_enterprise", {
            method: "get",
            data
        })
    }
    static async controlStaff(data) {
        return service("/enterprises/" + data.id + "/control_staff/", {
            method: "post",
            data
        })
    }
    static async deleteStaff(data) {
        return service("/enterprises/" + data.id + "/control_staff/", {
            method: "delete",
            data
        })
    }
    static async createEnterprise(data) {
        return service("/enterprises/create_enterprise/", {
            method: "post",
            data
        })
    }
    static async showEnterpriseFollowers(data) {
        return service("/enterprises/show_enterprise_followers", {
            method: "get",
            data
        })
    }
    static async getRecommendEnterprises() {
        return service("/enterprises/recommend", {
            method: "get"
        })
    }
    static async modifyEnterpriseInfo(id, data) {
        return service("/enterprises/" + id + "/", {
            method: "patch",
            data
        })
    }
    static async getEnterpriseInfo(id) {
        return service("/enterprises/" + id + "/", {
            method: "get"
        })
    }
    static async getFollowingEnterprises() {
        return service("/enterprises/following_enterprises/", {
            method: "get"
        })
    }

    static async approveLeaveEnterprises(id) {
        return service("/enterprises/" + id + "/approve_leave_enterprises/", {
            method: "post"
        })
    }

    static async disapproveLeaveEnterprises(id) {
        return service("/enterprises/" + id + "/disapprove_leave_enterprises/", {
            method: "post"
        })
    }

    static async approveManagerChangeRequest(id) {
        return service("/enterprises/" + id + "/approve_manager_change_request/", {
            method: "post"
        })
    }

    static async disapproveManagerChangeRequest(id) {
        return service("/enterprises/" + id + "/disapprove_manager_change_request/", {
            method: "post"
        })
    }

    static async requestChangeManager(id) {
        return service("/enterprises/" + id + "/request_change_manager/", {
            method: "post"
        })
    }
    static async leaveEnterprise() {
        return service("/enterprises/leave_enterprises/", {
            method: "post"
        })
    }
}