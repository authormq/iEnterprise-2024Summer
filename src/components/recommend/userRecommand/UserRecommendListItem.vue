<template>
    <div>
        <n-popover trigger="hover" style="width:200px;padding:10px">
            <template #trigger>
                <img class="user-avatar" @click="jumpToUser" :src="avatar">
            </template>
            <n-flex vertical :size="10">
                <n-flex vertical :size="20" align="center">
                    <img class="popover-avatar" :src="avatar">
                    <n-ellipsis style="max-width: 150px;">
                        <span class="user-name">{{ userName }}</span>
                    </n-ellipsis>
                </n-flex>
                <n-flex align="center" justify="space-between">
                    <span>关注</span>
                    <span>{{ follows }}</span>
                </n-flex>
                <n-flex align="center" justify="space-between">
                    <span>粉丝</span>
                    <span>{{ fans }}</span>
                </n-flex>
                <n-flex v-if="tags && tags.length > 0" align="center" justify="space-between">
                    <span>兴趣标签</span>
                    <n-tag v-for="tag in tags" :key="tag"
                        >{{
                            tag.name }}</n-tag>
                </n-flex>
                <n-flex justify="center">
                    <button class="follow-button" @click="toggleFollowUser">{{ followed ? '取消关注' : '关注' }}</button>
                </n-flex>
            </n-flex>
        </n-popover>
    </div>

</template>

<script>
import { User } from '@/api/User';
import { NFlex, NTag, NEllipsis, NPopover } from 'naive-ui';
export default {
    name: "UserRecommendListItem",
    components: { NFlex, NTag, NEllipsis, NPopover },
    data() {
        return {
            avatar: `/api/users/${this.userId}/avatar/`,
            followed: false
        }
    },
    props: {
        userId: {
            type: Number,
            default: 0
        },
        userName: {
            type: String,
            default: "推荐的用户名"
        },
        fans: {
            type: Number,
            default: 100
        },
        follows: {
            type: Number,
            default: 20
        },
        tags: {
            type: Array,
            default: [{
                id: 'id1',
                name: "兴趣1"
            }, {
                id: 'id2',
                name: "兴趣2"
            }, {
                id: 'id3',
                name: "兴趣3"
            }]
        }
    },
    methods: {
        jumpToUser() {
            this.$router.push(`/user/${this.userId}`)
        },
        toggleFollowUser() {
            if (!this.$cookies.get('user_id')) {
                this.$router.push('/login')
                return
            }
            if (this.followed) {
                User.unfollowUser({ user_id: this.userId }).then(() => {
                    this.followed = false
                    this.$emit('unfollow')
                }, () => {
                    // alert("取消关注失败！")
                })
            } else {
                User.followUser({ user_id: this.userId }).then(() => {
                    this.followed = true
                    this.$emit('follow')
                }, () => {
                    // alert("关注失败！")
                })
            }
        },
    }

}
</script>

<style scoped>
img {
    height: 40px;
    aspect-ratio: 1;
    border-radius: 100%;
}

.user-avatar {
    cursor: pointer;
}

.user-name {
    font-weight: 700;
    font-size: 20px;
}

.popover-avatar {
    height: 50px;
    aspect-ratio: 1;
    border-radius: 100%;
}

.follow-button {
    margin: 10px;
}
</style>