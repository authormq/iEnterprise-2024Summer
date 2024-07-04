<template>
<div class="outer float-box">
    <n-flex class="recruit-recommend-list-item-container" justify="space-between" @click="jumpToRecruitment" :size="0">
        <n-flex align="center" justify="flex-start" :size="5">
            <n-flex vertical align="flex-start" justify="flex-start" :size="0">
                <n-ellipsis style="max-width: 250px;">
                    <span class="position-name">{{ title }}&nbsp;&nbsp;[{{ workPlace }}]</span>
                </n-ellipsis>
                <div class="salary-text">
                    <span class="recruitment-salary">{{ salary }}</span>
                    <span class="recruit-tag">{{ workTime }}</span>
                    <span class="recruit-tag">{{ education }}</span>
                </div>
            </n-flex>
        </n-flex>
        <n-flex align="center" justify="space-around" :size="5">
            <img class="enterprise-avatar" :src="enterpriseAvatar">
            <n-ellipsis style="max-width: 250px;">
                    <span class="enterprise-name" >{{ enterpriseName }}</span>
                </n-ellipsis>
        </n-flex>
    </n-flex>
    <div class="appendix">
        <NEllipsis style="max-width: 600px" :tooltip="false">
            {{ description }}
        </NEllipsis>
    </div>
</div>
    
</template>

<script>
import { NFlex, NEllipsis } from 'naive-ui';
export default {
    name: "RecruitRecommendListItem",
    components: {
        NFlex, NEllipsis
    },
    props: {
        recruitmentId: {
            type: Number,
            default: 0
        },
        enterpriseId: {
            type: Number,
            default: 0
        },
        enterpriseName: {
            type: String,
            default: "企业名称未知"
        },
        enterpriseAvatar: {
            type: String,
            default: "企业头像未知"
        },
        position: {
            type: String,
            default: "岗位名称未知"
        },
        salary: {
            type: String,
            default: "薪资未知"
        },
        workPlace: {
            type: String,
            default: "工作地点未知"
        },
        workTime: {
            type: String,
            default: "工作时间未知"
        },
        education: {
            type: String,
            default: "暂无学历要求"
        },
        description: {
            type: String,
            default: "暂无简介"
        },
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        jumpToRecruitment() {
            this.$router.push(`/enterprise/recruit/detail/${this.recruitmentId}`)
        },
        jumpToEnterprise() {
            this.$router.push(`/enterprise/${this.enterpriseId}`)
        }
    }
}
</script>

<style scoped>
div.outer {
    flex: 99%;
    transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    margin-bottom: 10px;
    border-radius: 10px;
}

div.outer:hover {
    transform: translate(-1px, -1px) scale(1.02);
}

.enterprise-name {
    font-weight: 700;
    font-size: 16px;
}

.enterprise-avatar {
    display: inline;
    height: 40px;
    width: 40px;
    border-radius: 5px;
}

.recruit-recommend-list-item-container {
    padding: 10px 20px;
    cursor: pointer;
    /* width: 130px; */
    /* height: min-content; */
    border-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background: var(--bg-like);
    /* border: #aaa 1px solid; */
    box-sizing: border-box;
}

.position-name {
    font-size: 20px;
    font-weight: bold;
}

.enterprise-name {
    font-size: 16px;
    margin-left: 10px;
}

.salary-text {
    font-size: 12px;
}

.recruitment-salary {
    font-weight: 700;
    font-size: 18px;
    color: var(--theme-color);
}

span.recruit-tag {
    display: inline-block;
    margin-left: 20px;
    padding: 0 5px;
    font-size: 14px;
    background: var(--bg-grey);
    border-radius: 3px;
}

div.appendix {
    background: var(--theme-color-lighter);
    border-radius: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 8px 10px;
    padding-left: 20px;

}
</style>