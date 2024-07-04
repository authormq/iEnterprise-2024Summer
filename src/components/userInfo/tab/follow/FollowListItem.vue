<template>
    <div class="follow-list-container">
        <div class="avatar">
            <img :src="userAvatar" class="avatar-image" />
        </div>
        <span class="username" @click="jumpToUser">{{ userName }}</span>
        <div class="follow" v-if="followed" @click="changeFollow">
            已关注
        </div>
        <div class="unfollow" v-else @click="changeFollow">
            未关注
        </div>
    </div>
</template>

<script>
import { NAvatar, NFlex } from 'naive-ui'
import { User } from '@/api/User'

export default {
    name: "FollowListItem",
    components: { NAvatar, NFlex },
    data() {
        return {
            userAvatar: `/api/users/${this.userId}/avatar/`,
            followed: true,
        }
    },
    props: {
        userId: {
            type: Number,
            default: 0
        },
        userName: {
            type: String,
            default: '关注的用户名'
        }
    },
    methods: {
        jumpToUser() {
            // location.reload()
            this.$router.push(`/user/${this.userId}`)
        },
        changeFollow() {
            const data = {
                user_id: this.userId
            }
            if (this.followed) {
                User.unfollowUser(data).then(res => {
                    console.log(res)
                    this.followed = false
                }).catch(err => {
                    console.log(err)
                })
            }
            else {
                User.followUser(data).then(res => {
                    console.log(res)
                    this.followed = true
                }).catch(err => {
                    console.log(err)
                })
            }
        },
    }


}
</script>

<style scoped>
div.follow-list-container {
    display: flex;
    align-items: center;
    padding: 20px 20px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
}

div.follow-list-container:hover {
    background: var(--theme-color-similar);
}

div.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    /* background: skyblue; */
}

.avatar-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    /* background: skyblue; */
}

span.username {
    font-size: 20px;
    margin-left: 20px;
}

div.follow {
    position: absolute;
    right: 20px;
    background: var(--theme-color);
    padding: 5px 10px;
    border-radius: 3px;
    color: var(--bg-like);
}

div.unfollow {
    position: absolute;
    right: 20px;
    background: transparent;
    padding: 5px 10px;
    border-radius: 3px;
    border: 1px solid var(--theme-color);
    color: var(--theme-color);
}
</style>