import service from "../http";
const url = {
    users: "/users",
    avatar: "/avatar",
    followers: "/followers",
    following_users: "/following_users",
    moments: "/moments"
}

export class User {
    // /users/{id} GET
    static async getUser(id) {
        return service(url.users + "/" + id, {
            method: "get"
        })
    }
    // /users/{id} PUT
    static async updateUser(id, data) {
        return service(url.users + "/" + id + "/", {
            method: "put",
            data
        })
    }
    // /users/{id} PATCH
    static async patchUser(id, data) {
        return service(url.users + "/" + id + "/", {
            method: "patch",
            data
        })
    }

    // /users/{id}/avatar GET
    static async getUserAvatar(id) {
        console.log(url.users + "/" + id + url.avatar)
        return service(url.users + "/" + id + url.avatar, {
            method: "get"
        })
    }

    // /users/{id}/follows GET
    static async getUserFollow(id) {
        console.log(url.users + "/" + id + url.followers)
        return service(url.users + "/" + id + url.followers, {
            method: "get"
        })
    }

    // /users/{id}/following_users GET
    static async getUserFollowingUsers(id) {
        return service(url.users + "/" + id + url.following_users, {
            method: "get"
        })
    }

    // /users/{id}/moments
    static async getUserMoments(id) {
        return service(url.users + "/" + id + url.moments, {
            method: "get"
        })
    }

    // /users/follow POST
    static async followUser(data) {
        return service(url.users + "/follow/", {
            method: "post",
            data
        })
    }

    // /users/follow DELETE
    static async unfollowUser(data) {
        return service(url.users + "/follow/", {
            method: "delete",
            data
        })
    }

    static async getRecommendUsers() {
        return service(url.users + "/user_recommends/", {
            method: "get"
        })
    }

    static async getSearchResult(keyword) {
        return service(url.users + "/search/?keyword=" + keyword, {
            method: "get",
        })
    }
    static async getOnlyIdentity() {
        return service(url.users + "/only_get_identity/", {
            method: "get",
        })
    }
}