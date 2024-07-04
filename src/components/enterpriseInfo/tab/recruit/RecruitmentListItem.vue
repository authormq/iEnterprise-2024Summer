<template>
    <n-flex vertical class="recruit-recommend-list-item-container" @click="jumpToRecruitment(this.recruitmentId)">
        <n-flex align="center" justify="start" :size="20">
            <n-flex vertical align="center">
                <span class="enterprise-name" @click.stop="jumpToEnterprise">{{ recruitmentName }}</span>
                <span class="position-name">{{ enterprisePosition }}</span>
            </n-flex>
        </n-flex>
        <n-flex justify="center">
            <span class="recruitment-salary">岗位薪资：{{ recruitmentSalary }}</span>
        </n-flex>
        <button>Modify</button>
    </n-flex>
</template>

<script>
import { NFlex } from 'naive-ui';
export default {
    name: "RecruitmentListItem",
    components: {
        NFlex
    },
    props: {
        recruitmentId: {
            type: Number,
            default: 0
        },
        recruitmentName: {
            type: String,
            default: '招聘信息'
        },
        recruitProfile: {
            type: String, 
            default: ''
        }, 
        recruitRequirement: {
            type: String,
            default: ''
        },
        recruitmentSalary: {
            type: String,
            default: '10.5K'
        },
        enterprisePosition: {
            type: String,
            default: '北京'
        },
        recruitmentDegree: {
            type: String,
            default: ''
        }

    },
    methods: {
        jumpToRecruitment(id) {
            this.$router.push('/enterprise/recruit/detail/' + id)
        },
        jumpToEnterprise() {

        }
    }
}
</script>

<style scoped>
.enterprise-avatar {
    display: inline;
    height: 50px;
    aspect-ratio: 1;
    border-radius: 100%;
}
.recruit-recommend-list-item-container {
    cursor: pointer;
    width: 200px;
    padding: 10px;
    margin: 20px;
    border-radius: 10px;
    border: var(--theme-color) 2px solid;
}
</style>