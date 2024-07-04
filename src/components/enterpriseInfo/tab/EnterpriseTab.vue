<template>
    <n-tabs animated>
        <n-tab-pane name="动态" tab="企业动态">
            <!-- <enterprise-moment-list :items="this.hotStaffMoments"></enterprise-moment-list> -->
                <moment-list :items="hotStaffMoments" :showDeleteIcon="false" :showForwardIcon="false" :showLikeIcon="false"></moment-list>
        </n-tab-pane>
        <n-tab-pane name="员工" tab="员工列表" v-if="showStaffList">
            <!-- <button>增加员工（需要去搜索）</button> -->
            <staff-list :items="staffList"></staff-list>
        </n-tab-pane>
        <!-- <n-tab-pane name="招聘" tab="招聘信息">
            <button @click="jumpToCreateRecruit">新建招聘</button>
            <recruitment-list :items="this.recruitmentList"></recruitment-list>
            <div v-if="this.recruitmentList.length == 0">暂无已发布的招聘信息</div>
        </n-tab-pane> -->
    </n-tabs>
</template>

<script>
import { NTabs, NTabPane } from 'naive-ui'
import Enterprise from '@/api/Enterprise'
import Recruit from '@/api/Recruit';
import MomentList from '@/components/userInfo/tab/moment/MomentList.vue';
import StaffList from './staff/StaffList.vue'
import RecruitmentList from './recruit/RecruitmentList.vue';
import { User } from '@/api/User'
export default {
    name: 'EnterpriseTab',
    components: {
        NTabs,
        NTabPane,
        MomentList,
        StaffList,
        RecruitmentList
    },
    data() {
        return {
            enterpriseId: this.$route.params.id,
            hotStaffMoments: [],
            staffList: [],
            recruitmentList: [],
            showStaffList: false
        }
    },
    watch: {
        '$route.params.id': {
            handler(newVal) {
                if(newVal){
                    this.enterpriseId = newVal
                    this.hotStaffMoments = Enterprise.getHotStaffMoment(this.enterpriseId).then(
                        (response) => {
                            this.hotStaffMoments = response.data
                        },
                        (error) => {
                            console.log(error.message);
                        }
                    )
                    this.staffList = Enterprise.getStaffList(this.enterpriseId).then(
                        (response) => {
                            this.staffList = response.data
                        },
                        (error) => {
                            console.log(error.message);
                        }
                    )
                    this.recruitmentList = Recruit.getRecruitments(this.enterpriseId, "enterprise_id").then(
                        (response) => {
                            this.recruitmentList = response.data
                        },
                        (error) => {
                            console.log(error.message);
                        }
                    )
                    User.getUser(this.$cookies.get('user_id')).then(
                        (response) => {
                            this.showStaffList = response.data.enterprise != null && response.data.enterprise.id === parseInt(this.$route.params.id)
                        },
                        (error) => {
                            console.log(error.message);
                        }
                    )
                }
            }
        }
    },
    mounted() {
        if(this.$route.params && this.$route.params.id) {
            this.enterpriseId = this.$route.params.id
            this.hotStaffMoments = Enterprise.getHotStaffMoment(this.enterpriseId).then(
                (response) => {
                    this.hotStaffMoments = response.data
                },
                (error) => {
                    console.log(error.message);
                }
            )
            this.staffList = Enterprise.getStaffList(this.enterpriseId).then(
                (response) => {
                    this.staffList = response.data
                },
                (error) => {
                    console.log(error.message);
                }
            )
            this.recruitmentList = Recruit.getRecruitments(this.enterpriseId, "enterprise_id").then(
                (response) => {
                    this.recruitmentList = response.data
                },
                (error) => {
                    console.log(error.message);
                }
            )
            User.getUser(this.$cookies.get('user_id')).then(
                (response) => {
                    this.showStaffList = response.data.enterprise != null && response.data.enterprise.id === parseInt(this.$route.params.id)
                },
                (error) => {
                    console.log(error.message);
                }
            )
        }
    },
    methods: {
        jumpToCreateRecruit() {
            this.$router.push('/enterprise/' + this.enterpriseId + '/recruit/create')
        }
    }
}
</script>

<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
</style>