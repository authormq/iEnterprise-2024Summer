<template>
    <div class="enterprise-box float-box" @click="jumpToEnterprise">
        <n-flex vertical justify="flex-start">
            <n-flex align="center" justify="center">
                <img class="avatar" :src="`${enterpriseAvatar}`">
            </n-flex>
            <n-flex align="center" justify="center" class="name">{{ enterpriseName }}</n-flex>
            <n-flex align="center" justify="space-between">
                <span>粉丝</span>
                <span>{{ enterpriseFans }}</span>
            </n-flex>
            <n-flex align="center" justify="space-between">
                <span>在招岗位</span>
                <span>{{ enterpriseRecruitmentCount }}</span>
            </n-flex>
            <div class="profile">
                {{ enterpriseProfile }}
            </div>
        </n-flex>
    </div>
</template>

<script>
// import router from '@/router';
import { NFlex } from 'naive-ui';
export default {
    name: "EnterpriseBox",
    components: { NFlex },
    props: {
        enterpriseId: {
            type: Number,
            default: 0
        }, enterpriseName: {}, enterpriseAvatar: {}, enterpriseFans: {
            type: Number,
            default: 0
        }, enterpriseProfile: {}, enterpriseRecruitmentCount: {}
    },
    methods: {
        jumpToEnterprise() {
            this.$router.push(`/enterprise/${this.enterpriseId}`)
        }
    }

}
</script>

<style scoped>
.avatar {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 100%;
}

.name {
    font-weight: 700;
}

.enterprise-box {
    width: 180px;
    background: var(--bg-like);
    border-radius: 10px;
    padding: 10px 20px;
    cursor: pointer;
}
</style>