<template>
    <div class="app-centered">
        <div class="app-container">
            <h3>应聘详情</h3>
            <div class="bottom">
                <div class="left">
                    <input v-model="searchText" placeholder="筛选岗位...">
                    <ul>
                        <li class="recruitment-type-item" v-for="item in currentRecruitmentList" :key="item">
                            <a @click="selectRecruitment(item)">{{ item.title }} {{ item.position }} [{{ item.location }}]({{
                                item.applications.length }})</a>
                        </li>
                    </ul>
                </div>
                <div class="right float-box">
                    <div class="list-title">
                        {{ currentRecruitmentItem.title }} {{ currentRecruitmentItem.position }} [{{ currentRecruitmentItem.location }}] 的申请列表
                    </div>
                    <ul>
                        <li class="app" v-for="item in applicationList" :key="item">
                            <section class="app-left">
                                <img class="avatar" :src="`/api/users/${item.user}/avatar`" @click="jumpToUser(item)">
                                <div>
                                    <div class="username" @click="jumpToUser(item)">{{ item.username }}</div>
                                    <div>申请时间：{{ item.apply_time }}</div>
                                </div>
                            </section>
                            <section class="app-right">
                                <button>
                                    <a :href="`/api/users/${item.user}/resume/`" target="_blank">下载简历</a>
                                </button>
                                <n-popconfirm :show-icon="false"
                                    positive-text="通过" 
                                    negative-text="拒绝" 
                                    @positive-click="acceptApplication(item)"
                                    @negative-click="rejectApplication(item)" 
                                    :disabled="item.status !== 'waiting'">
                                    <template #trigger>
                                        <button :disabled="item.status !== 'waiting'">
                                            <span v-if="item.status === 'waiting'">标记申请</span>
                                            <span v-if="item.status === 'enterprise_approved'">等待中</span>
                                            <span v-if="item.status === 'enterprise_rejected'">已拒绝</span>
                                            <span v-if="item.status === 'user_approved'">用户已同意</span>
                                            <span v-if="item.status === 'user_rejected'">用户已拒绝</span>
                                        </button>
                                    </template>
                                    标记申请
                                </n-popconfirm>
                                <button @click="jumpToChat(item)">发送消息</button>
                            </section>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    </div>
    <!-- <n-flex align="flex-start" justify="space-between" :wrap="false" class="container">
        <n-flex vertical align="center" justify="flex-start" class="left">
            <n-flex align="center" justify="center" class="search-input">
                <input v-model="searchText" placeholder="筛选岗位...">
            </n-flex>
            <ul>
                <li class="recruitment-type-item" v-for="item in currentRecruitmentList" :key="item">
                    <a @click="selectRecruitment(item)"> {{ item.title }} {{ item.position }} {{ item.location }}({{
                        item.applications.length }})</a>
                </li>
            </ul>
        </n-flex>
        <n-flex vertical align="center" justify="flex-start" class="right">
            {{ currentRecruitmentItem.title }} {{ currentRecruitmentItem.position }} {{ currentRecruitmentItem.location
            }} 的申请列表
            <ul>
                <li v-for="item in applicationList" :key="item">
                    <img class="avatar" :src="`/api/users/${item.user}/avatar`">
                    <span class="username" @click="jumpToUser(item)">{{ item.username }}</span>
                    <span>申请时间：{{ item.apply_time }}</span>
                    <button>
                        <a :href="`/api/users/${item.user}/resume/`">下载简历</a>
                    </button>
                    <n-popconfirm positive-text="通过申请" negative-text="拒绝申请" @positive-click="acceptApplication(item)"
                        @negative-click="rejectApplication(item)" :disabled="item.status !== 'waiting'">
                        <template #trigger>
                            <button :disabled="item.status !== 'waiting'">
                                <span v-if="item.status === 'waiting'">标记申请</span>
                                <span v-if="item.status === 'enterprise_approved'">已同意，等待用户同意</span>
                                <span v-if="item.status === 'enterprise_rejected'">已拒绝</span>
                                <span v-if="item.status === 'user_approved'">用户已同意</span>
                                <span v-if="item.status === 'user_rejected'">用户已拒绝</span>
                            </button>
                        </template>
                        请确认通过/拒绝该申请
                    </n-popconfirm>
                    <button @click="jumpToChat(item)">发送消息</button>
                </li>
            </ul>
        </n-flex>
    </n-flex> -->
</template>

<script>
import Enterprise from '@/api/Enterprise';
import Recruit from '@/api/Recruit';
import { NFlex, NPopconfirm, useMessage } from 'naive-ui'
import Conversation from '@/api/Conversation';

export default {
    name: "RecruitmentApplicationListView",
    components: { NFlex, NPopconfirm },
    data() {
        return {
            enterpriseId: 0,
            currentRecruitmentItem: {},
            currentRecruitmentList: [],
            searchText: "",
            recruitmentList: [],
            applicationList: [],
            message: useMessage()
        }
    },
    watch: {
        searchText(text) {
            this.currentRecruitmentList = []
            this.recruitmentList.forEach(item => {
                if (item.title.indexOf(text) >= 0) {
                    this.currentRecruitmentList.push(item)
                }
                else if (item.position.indexOf(text) >= 0) {
                    this.currentRecruitmentList.push(item)
                }
                else if (item.location.indexOf(text) >= 0) {
                    this.currentRecruitmentList.push(item)
                }
            });
        }
    },
    methods: {
        jumpToMainView() {
            this.$router.push('/')
        },
        selectRecruitment(item) {
            if (item.id) {
                Recruit.getApplications(item.id).then((response) => {
                    this.applicationList = response.data
                }, () => {
                    this.message.error('获取申请列表失败')
                })
            }
        },
        acceptApplication(item) {
            Recruit.recruitRecruitment(item.recruitment, {
                recruit: 'true',
                user_id: item.user
            }).then(() => {
                item.status = 'enterprise_approved'
                this.message.success('通过申请成功')
            }, () => {
                this.message.error('通过申请失败')
            })
        },
        rejectApplication(item) {
            Recruit.recruitRecruitment(item.recruitment, {
                recruit: 'false',
                user_id: item.user
            }).then(() => {
                item.status = 'enterprise_rejected'
                this.message.success('拒绝申请成功')
            }, () => {
                this.message.error('拒绝申请失败')
            })
        },
        jumpToUser(item) {
            this.$router.push(`/user/${item.user}`)
        },
        jumpToChat(item) {
            Conversation.getConversationWithUser(item.user).then(
                (response) => {
                    console.log(response);
                    this.$router.push('/chat/' + response.data.id);
                },
                (error) => {
                    console.log(error.message);
                }
            )
        }
    },
    mounted() {
        //判断用户是否登录
        let userId = this.$cookies.get('user_id')
        if (userId === null) {
            this.jumpToMainView()
            return
        }
        //判断用户是否为当前企业管理员
        this.enterpriseId = this.$route.params.id;
        Enterprise.getEnterpriseInfo(this.enterpriseId).then((response) => {
            let managerId = response.data.manager_id
            if (userId != managerId) {
                console.log(userId, managerId);
                this.message.error('没有权限访问该页面')
                this.jumpToMainView()
            }
            else {
                Recruit.getRecruitments(this.enterpriseId, "enterprise_id").then((response) => {
                    this.recruitmentList = response.data
                    this.currentRecruitmentList = this.recruitmentList
                    this.currentRecruitmentItem = this.currentRecruitmentList[0]
                    this.selectRecruitment(this.currentRecruitmentItem)
                }, () => {
                    this.message.error('获取岗位列表失败')
                })
            }
        }, () => {
            this.message.error('企业ID不合法')
            this.jumpToMainView()
        })

    }
}
</script>

<style scoped>
.app-centered {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.app-container {
    width: 80%;
    height: 80%;
}

h3 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
}

.bottom {
    display: flex;
    justify-content: space-around;
}

.left {
    height: 100%;
    overflow: auto;
    scrollbar-width: 0;
    position: relative;
}

input {
    position: sticky;
    top: 0;
    margin-bottom: 20px;
}

.left::-webkit-scrollbar {
    display: none;
}

img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
}

.recruitment-type-item a {
    font-size: 16px;
    padding-left: 5px;
    cursor: pointer;
}

.recruitment-type-item a:hover {
    color: var(--theme-color);
    text-decoration: underline;
    font-weight: bold;
}

.right {
    width: 630px;
    max-height: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px 30px;
    overflow: auto;
    scrollbar-width: 0;
}

.right::-webkit-scrollbar {
    display: none;
}

.list-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}

li.app {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.app-left {
    display: flex;
}

.app-left>div {
    margin-left: 10px;
}

/* 用户名 */
.app-left>div>div:first-child {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}

li.app button {
    width: 80px;
    height: 30px;
    margin-right: 10px;
}

li.app button, 
li.app button * {
    font-size: 14px;
}

button a, button span {
    color: var(--theme-color);
}
</style>