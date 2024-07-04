<template>
    <div>
        <n-popover trigger="hover" style="width:180px;padding:10px">
            <template #trigger>
                <img class="enterprise-avatar" @click="jumpToEnterprise" :src="enterpriseAvatar">
            </template>
            <n-flex vertical :size="10">
                <n-flex vertical :size="20" align="center">
                    <img class="popover-avatar" :src="enterpriseAvatar">
                    <n-ellipsis style="max-width: 150px;">
                        <div class="enterprise-name">{{ enterpriseName }}</div>
                    </n-ellipsis>
                </n-flex>
                <n-flex align="center" justify="space-between">
                    <span>粉丝</span>
                    <span>{{ fans }}</span>
                </n-flex>
                <n-flex align="center" justify="space-between">
                    <span>在招岗位</span>
                    <span>{{ recruitmentCount }}</span>
                </n-flex>
                <n-flex justify="center">
                    <button class="follow-button" @click="toggleFollowEnterprise">{{ followed ? '取消关注' : '关注'
                        }}</button>
                </n-flex>
            </n-flex>
        </n-popover>
    </div>

</template>

<script>
import Enterprise from '@/api/Enterprise';
import { NPopover, NFlex, NEllipsis } from 'naive-ui';
export default {
    name: "EnterpriseRecommendListItem",
    components: { NPopover, NFlex, NEllipsis },
    data() {
        return {
            followed: false
        }
    },
    props: {
        enterpriseId: {
            type: Number,
            default: 0
        },
        enterpriseName: {
            type: String,
            default: "推荐的企业名"
        },
        enterpriseAvatar: {
            type: String,
            default: "企业头像"
        },
        fans: {
            type: Number,
            default: 100
        },
        recruitmentCount: {
            type: Number,
            default: 50
        }
    },
    methods: {
        jumpToEnterprise() {
            this.$router.push(`/enterprise/${this.enterpriseId}`)
        },
        toggleFollowEnterprise() {
            if (!this.$cookies.get('user_id')) {
                this.$router.push('/login')
                return
            }
            if (this.followed) {
                Enterprise.unfollowEnterprise(this.enterpriseId).then(() => {
                    this.followed = false
                    this.$emit('unfollow')
                }, () => {
                    // alert('取消关注失败！')
                })
            } else {
                Enterprise.followEnterprise(this.enterpriseId).then(() => {
                    this.followed = true
                    this.$emit('follow')
                }, () => {
                    // alert('关注失败！')
                })
            }
        }
    }

}
</script>

<style scoped>
img {
    height: 40px;
    width: 40px;
    border-radius: 5px;
}

.enterprise-avatar {
    cursor: pointer;
}

.enterprise-name {
    font-weight: 700;
    font-size: 20px;
}

.popover-avatar {
    height: 50px;
    width: 50px;
    border-radius: 5px;
}

.follow-button {
    margin: 10px;
}
</style>