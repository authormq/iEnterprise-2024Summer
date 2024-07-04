<template>
    <n-flex vertical class="recruit-scroll">
        <n-flex vertical class="top">
            <n-flex align="baseline" justify="flex-start" class="title-line" :size="50">
                <span class="recruitment-title">{{ title }}</span>
                <n-flex align="end" justify="center" :size="25">
                    <span class="salary">薪资：{{ salary }}</span>
                    <span class="cnt">已招人数：{{ recruitedNum }} / {{ totalNum }}</span>
                </n-flex>
            </n-flex>
            <n-flex align="baseline" justify="flex-start" class="second-line" :size="30" v-if="this.identity.length === 0">
                <n-popconfirm :show-icon="false"
                    @positive-click="submitApplication" :positive-text="'确认'" :negative-text="'取消'">
                    <template #trigger>
                        <button class="submit-button">投递简历</button>
                    </template>
                    确认投递？
                </n-popconfirm>
                <button @click="jumpToChat" class="chat-button">立即沟通</button>
            </n-flex>
        </n-flex>

        <n-flex align="flex-start" justify="center" :warp="false" :size="30">
            <recruitment-detail-box class="left" :title="title" :location="location" :time="time" :education="education"
                :description="description"></recruitment-detail-box>
            <enterprise-box 
                class="right" 
                :enterpriseId="enterpriseId" 
                :enterprise-name="enterpriseName"
                :enterprise-avatar="enterpriseAvatar" 
                :enterprise-fans="enterpriseFans"
                :enterprise-profile="enterpriseProfile"
                :enterprise-recruitment-count="enterpriseRecruitmentCount"
            ></enterprise-box>
        </n-flex>
    </n-flex>
</template>

<script>
import Enterprise from '@/api/Enterprise';
import Recruit from '@/api/Recruit';
import Conversation from '@/api/Conversation';
import { NFlex, NPopconfirm, useMessage } from 'naive-ui';
import EnterpriseBox from '@/components/recruitmentInfo/EnterpriseBox.vue';
import RecruitmentDetailBox from '@/components/recruitmentInfo/RecruitmentDetailBox.vue';
import { User } from '@/api/User';
export default {
    name: "RecruitDetailView",
    components: {
        NFlex, NPopconfirm, EnterpriseBox, RecruitmentDetailBox, Conversation
    },
    data() {
        return {
            recruitmentId: undefined,
            position: "岗位类别",
            createTime: "创建时间",
            title: "岗位名称",
            totalNum: "招聘总额",
            recruitedNum: "已招人数",
            location: "工作地点",
            time: "工作时长",
            education: "学历要求",
            description: "岗位描述",
            salary: "岗位薪资",
            enterpriseId: 0,
            enterpriseName: "企业名称",
            enterpriseAvatar: "企业头像",
            enterpriseFans: 20,
            enterpriseProfile: "企业简介",
            enterpriseRecruitmentCount: 0,
            managerId: 0,
            message: useMessage(),
            identity: ''
        }
    },
    methods: {
        //投递简历
        submitApplication() {
            if (this.$cookies.get('user_id') === null) {
                this.jumpToLogin()
                return
            }

            Recruit.applyRecruitment({ id: this.recruitmentId }).then(() => {
                this.message.success('投递简历成功')
            }, (obj) => {
                this.message.error(obj.response.data.msg)
            })
        },
        jumpToChat() {
            if (!this.$cookies.get('user_id')) {
                this.$router.push('/login')
                return
            }

            Conversation.getConversationWithUser(this.managerId).then(
                (response) => {
                    console.log(response);
                    this.$router.push('/chat/' + response.data.id);
                },
                (error) => {
                    console.log(error.message);
                }
            )
            // this.message.success("很抱歉，我不是该公司的HR，不能和你就当前岗位进行进一步的沟通。如果你需要其他帮助，请随时告诉我，我会尽力帮助您。")
        },
        jumpToLogin() {
            this.$router.push('/login')
        },
        getUserIdentify() {
            User.getOnlyIdentity().then(
                (response) => {
                    this.identity = response.data.identity
                    console.log(this.identity);
                },
                (error) => {
                    console.error(error)
                }
            )
        }
    },
    mounted() {
        this.recruitmentId = this.$route.params.id
        //获取岗位详情
        Recruit.getRecruitments(this.recruitmentId, "recruitment_id").then((response) => {
            let data = response.data[0]
            this.position = data.position
            this.createTime = data.create_time
            this.title = data.title
            this.totalNum = data.num
            this.recruitedNum = data.recruited_num
            this.location = data.location
            this.time = data.time
            this.education = data.education
            this.description = data.description
            this.salary = data.salary
            this.enterpriseId = data.enterprise
            // console.log(this.description)
            //获取企业信息
            Enterprise.showEnterprise({ id: data.enterprise }).then(
                (response) => {
                    let data = response.data
                    console.log('data', data)
                    this.enterpriseName = data.name
                    this.enterpriseProfile = data.profile
                    this.enterpriseAvatar = data.avatar
                    this.enterpriseFans = data.followers_count
                    this.enterpriseRecruitmentCount = data.recruitments_count
                    this.managerId = data.manager_id
                }, 
                (error) => {
            })
        }, () => {
            // alert("获取岗位详情失败！")
        })
        this.getUserIdentify()
    }
}
</script>

<style scoped>
.recruit-scroll {
    height: 100%;
    overflow: auto;
    scrollbar-width: 0;
}

.recruit-scroll::-webkit-scrollbar {
    display: none;
}

.recruitment-title {
    font-weight: 700;
    font-size: 40px;
}

.title-line {
    margin: 20px 0;
}

.top {
    margin-left: 5%;
}

.left {
    min-width: 50%;
    max-width: 70%;
}

.right {
    max-width: 300px;
}


.cnt {
    font-size: 16px;
}

.salary {
    background-color: var(--theme-color);
    padding: 0 5px;
    border-radius: 5px;
    color: var(--bg-color);
    font-size: 20px;
    font-weight: 700;
}

.submit-button,
.chat-button {
    padding: 0 20px;
    font-size: 25px;
    width: fit-content;
}
</style>