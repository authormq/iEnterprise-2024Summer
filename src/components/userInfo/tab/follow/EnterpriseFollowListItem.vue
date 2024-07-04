<template>
    <div class="follow-list-container">
        <div class="avatar">
            <img :src="enterpriseAvatar" class="avatar-image" />
        </div>
        <span class="enterprise-name" @click="jumpToEnterprise">{{ enterprise.name }}</span>

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
import Enterprise from "@/api/Enterprise"

export default {
    name: "EnterpriseFollowListItem",
    components: { NAvatar, NFlex },
    data() {
        return {
            enterpriseAvatar: this.enterprise.avatar,
            followed: true,
        }
    },
    props: {
        enterprise: {
            type: Object,
            default: null
        }
    },
    mounted() {
        // console.log(this.enterprise);
    },
    methods: {
        jumpToEnterprise() {
            this.$router.push(`/enterprise/${this.enterprise.id}`)
        },
        changeFollow() {
            if (this.followed) {
                Enterprise.unfollowEnterprise(this.enterprise.id).then(res => {
                    console.log(res)
                    this.followed = false
                }).catch(err => {
                    console.log(err)
                })
            }
            else {
                Enterprise.followEnterprise(this.enterprise.id).then(res => {
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

span.enterprise-name {
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