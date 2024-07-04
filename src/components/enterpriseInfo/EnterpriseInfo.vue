<template>
    <div class="enterprise-info-container float-box">
        <img :src="enterpriseAvater" />
        <div class="info">
            <div class="enterprise-name" v-if="!isEditing">{{ enterpriseName }}</div>
            <span class="manager-name" v-if="!isEditing" @click="jumpToManager">企业管理员：{{ managerName }}</span>
        </div>
        <div class="right">
            <div class="upper">
                <div class="cnt"><em>{{ this.followersCount }}</em>关注用户</div>
                <div class="cnt"><em>{{ this.recruitmentsCount }}</em>在招岗位</div>
                <div v-if="$cookies.get('user_id')">
                    <n-tooltip trigger="click">
                        <template #trigger>
                            <svg t="1719841195264" class="icon" viewBox="0 0 1084 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6980" width="30" height="30"><path d="M1072.147851 406.226367c-6.331285-33.456782-26.762037-55.073399-52.047135-55.073399-0.323417 0-0.651455 0.003081-0.830105 0.009241l-4.655674 0c-73.124722 0-132.618162-59.491899-132.618162-132.618162 0-23.731152 11.447443-50.336101 11.546009-50.565574 13.104573-29.498767 3.023185-65.672257-23.427755-84.127081l-1.601687-1.127342-134.400039-74.661726-1.700252-0.745401c-8.753836-3.805547-18.334698-5.735272-28.479231-5.735272-20.789593 0-41.235746 8.344174-54.683758 22.306575-14.741683 15.216028-65.622973 58.649474-104.721083 58.649474-39.450789 0-90.633935-44.286652-105.438762-59.784516-13.518857-14.247316-34.128258-22.753199-55.127302-22.753199-9.945862 0-19.354234 1.861961-27.958682 5.531982l-1.746455 0.74078-139.141957 76.431283-1.643269 1.139662c-26.537186 18.437884-36.675557 54.579032-23.584845 84.062398 0.115506 0.264895 11.579891 26.725075 11.579891 50.634877 0 73.126262-59.491899 132.618162-132.618162 132.618162l-4.581749 0c-0.318797-0.00616-0.636055-0.01078-0.951772-0.01078-25.260456 0-45.672728 21.618157-52.002472 55.0811-0.462025 2.453354-11.313456 60.622322-11.313456 106.117939 0 45.494078 10.85143 103.659965 11.314996 106.119479 6.334365 33.458322 26.758957 55.076479 52.036353 55.076479 0.320337 0 0.651455-0.00616 0.842426-0.012321l4.655674 0c73.126262 0 132.618162 59.491899 132.618162 132.616622 0 23.760413-11.444363 50.333021-11.546009 50.565574-13.093793 29.474125-3.041666 65.646075 23.395414 84.151722l1.569346 1.093459 131.838879 73.726895 1.675611 0.7377c8.750757 3.84251 18.305437 5.790715 28.397607 5.790715 21.082208 0 41.676209-8.706094 55.0888-23.290689 18.724339-20.347588 69.527086-62.362616 107.04815-62.362616 40.625872 0 92.72537 47.100385 107.759669 63.583903 13.441852 14.831008 34.176001 23.689571 55.470741 23.695731l0.00616 0c9.895039 0 19.27877-1.883523 27.893999-5.598205l1.711034-0.73924 136.659342-75.531873 1.617088-1.128882c26.492523-18.456365 36.601633-54.600594 23.538642-84.016195-0.115506-0.267974-11.595291-27.082374-11.595291-50.67646 0-73.124722 59.49344-132.616622 132.618162-132.616622l4.517066-0.00154c0.300316 0.00616 0.599092 0.009241 0.899409 0.009241 25.331299-0.00154 45.785153-21.619697 52.107197-55.054918 0.112426-0.589852 11.325776-59.507301 11.325776-106.14104C1083.464388 466.640776 1072.609877 408.67356 1072.147851 406.226367zM377.486862 945.656142l-115.32764-64.487932c5.082277-13.052211 15.437801-43.51815 15.437801-75.017486 0-109.382917-84.176364-199.816642-192.587488-208.134635-2.647404-15.427021-8.873963-54.967133-8.873963-85.667166 0-30.65691 6.223479-70.232445 8.869343-85.671786 108.415744-8.311832 192.592108-98.745557 192.592108-208.134635 0-31.416171-10.300081-61.797405-15.371577-74.854236l122.721583-67.40331c0.003081 0 0.00462 0.00154 0.007701 0.00154 4.423121 4.518606 22.121764 22.080182 46.558275 39.493911 39.929754 28.46229 77.952885 42.894416 113.014434 42.894416 34.716571 0 72.437845-14.151831 112.115025-42.06431 24.282503-17.07953 41.896442-34.302288 46.308782-38.74543 0.009241-0.00154 0.018481-0.00462 0.026182-0.00616l118.301542 65.726159c-5.077657 13.055291-15.416239 43.499669-15.416239 74.958962 0 109.389077 84.174824 199.822802 192.590568 208.134635 2.645865 15.462442 8.872423 55.107281 8.872423 85.671786 0 30.687711-6.223479 70.241685-8.869343 85.673326C890.042174 606.334084 805.86427 696.767809 805.86427 806.158426c0 31.450053 10.317022 61.851309 15.393138 74.903519l-119.783103 66.198965c-5.168521-5.490399-22.603811-23.363073-46.740005-41.288109-40.701336-30.224145-79.662378-45.549521-115.800446-45.549521-35.79155 0-74.458435 15.038919-114.927219 44.694774C400.22004 922.554885 382.666163 940.255068 377.486862 945.656142zM731.271848 511.646647c0-105.803762-86.081448-191.88059-191.888289-191.88059-105.803762 0-191.88059 86.076827-191.88059 191.88059 0 105.803762 86.076827 191.882129 191.88059 191.882129C645.19194 703.528777 731.271848 617.450409 731.271848 511.646647zM539.383558 395.903184c63.825696 0 115.751164 51.922387 115.751164 115.743463 0 63.825696-51.925468 115.751164-115.751164 115.751164-63.821076 0-115.743463-51.925468-115.743463-115.751164C423.640095 447.824031 475.562482 395.903184 539.383558 395.903184z" p-id="6981"></path></svg>
                        </template>
                        <!-- todo:判断当前用户不是任何企业的员工 -->
                        <n-popconfirm v-if="this.noEnterprise" :show-icon="false" positive-text="提交" negative-text="取消"
                            @positive-click="submitJoinEnterprise">
                            <input v-model="invitationCode" type="text" placeholder="请输入邀请码">
                            <template #trigger>
                                <button class="block">加入企业</button>
                            </template>
                        </n-popconfirm>
                        <n-popover v-if="isManager && canSetInfo" trigger="click" @update:show="updateInvitationCode">
                            <template #trigger>
                                <button class="block">生成企业邀请码</button>
                            </template>
                            <div style="width: 200px">
                                <em style="font-weight: bold">企业邀请码：</em>
                                {{ invitationCode }}
                            </div>
                        </n-popover>

                        <button class="block" v-if="isManager && canSetInfo" @click="jumpToCreateRecruitment">新建招聘</button>
                        <button class="block" @click="jumpToEditor" v-if="isManager && canSetInfo">编辑信息</button>
                        <button class="block" @click="jumpToEditorPerson" v-if="!isManager && canSetInfo">编辑个人信息</button>
                        <button class="block" v-if="isManager && canSetInfo" @click="jumpToApplication">查看应聘</button>
                        <n-popconfirm v-if="!isManager && canSetInfo" :show-icon="false" positive-text="确认" negative-text="取消"
                            @positive-click="submitQuitEnterprise">
                            <template #trigger>
                                <button class="block">退出企业</button>
                            </template>
                            确认操作？
                        </n-popconfirm>
                        <n-tooltip trigger="click" v-if="isManager && canSetInfo">
                            <template #trigger>
                                <button class="block">转让管理员</button>
                            </template>
                            <ul class="change">
                                <li 
                                    v-for="staff in this.staffList" :key="staff">
                                    <n-popconfirm :show-icon="false"
                                    @positive-click="requestChangeManager(staff.id)"
                                    positive-text="确定" negative-text="取消">
                                        <template #trigger>
                                            {{staff.username}}
                                        </template>
                                        确定将管理员身份转让给：{{staff.username}}？   
                                    </n-popconfirm>
                                </li>
                            </ul>
                        </n-tooltip>
                    </n-tooltip>
                </div>
                <div>
                    <button class="follow" v-if="!isFollowed" @click="handleFollow">关注</button>
                    <button class="follow" v-else @click="handleFollow">取消关注</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { NEllipsis, NPopconfirm, NPopover, useMessage, NTooltip } from 'naive-ui'
import Enterprise from '@/api/Enterprise'
import Recruit from '@/api/Recruit'
import { User } from '@/api/User'
export default {
    name: 'EnterpriseInfo',
    components: {
        NEllipsis,
        NPopconfirm,
        NPopover,
        NTooltip
    },
    data() {
        return {
            message: useMessage(),
            hasRight: true, // 本企业企业管理员身份
            isEditing: false,
            enterpriseId: '',
            enterpriseName: '',
            enterpriseIntro: '',
            enterpriseAvater: '',
            followersCount: 0,
            recruitmentsCount: 0,
            managerId: '',
            managerName: '',
            invitationCode: undefined,
            noEnterprise: false, // 未加入任何企业
            isManager: false, // 当前用户是企业管理员
            staffList: [],
            canSetInfo: false,
            isFollowed: false
        }
    },
    watch: {
        '$route.params.id': {
            handler(newVal) {
                if (newVal) {
                    this.enterpriseId = newVal
                    this.getEnterpriseInfo(this.enterpriseId)
                    Enterprise.getStaffList(this.enterpriseId).then(
                        (response) => {
                            this.staffList = response.data
                            console.log(this.staffList);
                        },
                        (error) => {
                            console.log(error.message);
                        }
                    )
                    User.getUser(this.$cookies.get('user_id')).then(
                        (response) => {
                            this.canSetInfo = response.data.enterprise != null && response.data.enterprise.id === parseInt(this.$route.params.id)
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
        if (this.$route.params && this.$route.params.id) {
            this.enterpriseId = this.$route.params.id
            this.getEnterpriseInfo(this.enterpriseId)
            Enterprise.getStaffList(this.enterpriseId).then(
                (response) => {
                    this.staffList = response.data
                    console.log(this.staffList);
                },
                (error) => {
                    console.log(error.message);
                }
            )
            User.getUser(this.$cookies.get('user_id')).then(
                (response) => {
                    this.canSetInfo = response.data.enterprise != null && response.data.enterprise.id === parseInt(this.$route.params.id)
                },
                (error) => {
                    console.log(error.message);
                }
            )
        }
        User.getOnlyIdentity().then(
            (response) => {
                this.noEnterprise = response.data.identity.length === 0
            },
            (error) => {
                console.log(error.message);
            }
        )
        this.$bus.on('change-enterprise-avatar', this.changeAvatar)
    },
    methods: {
        getEnterpriseInfo(id) {
            Enterprise.getEnterpriseInfo(id).then(
                response => {
                    console.log('all', response.data)
                    this.enterpriseName = response.data.name
                    this.enterpriseIntro = response.data.profile
                    this.enterpriseAvater = response.data.avatar.slice(response.data.avatar.indexOf('/api'))
                    // this.enterpriseAvater = response.data.avatar
                    this.followersCount = response.data.followers_count
                    this.recruitmentsCount = response.data.recruitments_count
                    this.managerId = response.data.manager_id
                    this.managerName = response.data.manager_name
                    this.isManager = (this.managerId === parseInt(this.$cookies.get('user_id')))
                    this.isFollowed = response.data.is_followed
                },
                error => {
                    this.message.error(error.message)
                }
            )
        },
        modifyEnterpriseInfo() {
            this.isEditing = true
            let formData = new FormData()
            // formData.append("avatar", )
            formData.append("name", this.enterpriseName)
            formData.append("profile", this.enterpriseIntro)
            Enterprise.modifyEnterpriseInfo(this.enterpriseId, formData).then(
                (response) => {
                    console.log(response.data);
                },
                (error) => {
                    this.message.error(error.message);
                }
            )
        },
        confirmModifyEnterpriseInfo() {
            this.isEditing = false
        },
        jumpToCreateRecruitment() {
            this.$router.push('/enterprise/' + this.$route.params.id + '/recruit/create')
        },
        changeAvatar() {
            Enterprise.getEnterpriseInfo(this.enterpriseId).then(
                response => {
                    this.enterpriseAvater = response.data.avatar
                },
                error => {
                    this.message.error(error.message)
                }
            )
        },
        updateInvitationCode(show) {
            if (show) {
                Recruit.GenerateInvitationCode().then((response) => {
                    this.invitationCode = response.data.code
                    this.message.success(response.data.msg)
                }, (obj) => {
                    this.message.error(obj.response.data.msg)
                })
            }
        },
        submitJoinEnterprise() {
            if (this.invitationCode && this.invitationCode.length > 0) {
                Recruit.ApplyBetaRecruit({ code: this.invitationCode }).then((response) => {
                    this.invitationCode = ''
                    this.message.success(response.data.msg)
                }, (obj) => {
                    this.invitationCode = ''
                    this.message.error(obj.response.data.msg)
                })
            }
            else {
                this.invitationCode = ''
                this.message.error('邀请码格式错误')
            }
        },
        submitQuitEnterprise() {
            Enterprise.leaveEnterprise().then(
                (response) => {
                    this.message.success('已向企业管理员发送退出企业申请')
                },
                (error) => {
                    this.message.error('申请失败')
                }
            )
        },
        jumpToManager() {
            this.$router.push('/user/' + this.managerId)
        },
        jumpToEditor() {
            this.$router.push('/enterprise/' + this.$route.params.id + '/modify')
        },
        jumpToEditorPerson() {
            this.$router.push('/enterprise/' + this.$route.params.id + '/modify/employee')
        },
        jumpToApplication() {
            this.$router.push('/enterprise/' + this.$route.params.id + '/application')
        },
        requestChangeManager(id) {
            Enterprise.requestChangeManager(id).then(
                (response) => {
                    this.message.success('转让管理员申请发送成功')
                },
                (error) => {
                    this.message.error('转让管理员申请发送失败')
                }
            )
        },
        handleFollow() {
            if (!this.$cookies.get('user_id')) {
                this.$router.push('/login')
                return
            }
            if (this.isFollowed) {
                Enterprise.unfollowEnterprise(this.$route.params.id).then(res => {
                    this.isFollowed = false
                    this.message.success('取消关注成功')
                }).catch(err => {
                    this.message.error('取消关注失败')
                })
            }
            else {
                Enterprise.followEnterprise(this.$route.params.id).then(res => {
                    this.isFollowed = true
                    this.message.success('关注成功')
                }).catch(err => {
                    this.message.error('关注失败')
                })
            }
        }
    }
}
</script>

<style scoped>
div.enterprise-info-container {
    width: 100%;
    height: 120px;
    /* padding: 20px 0; */
    /* background: var(--bg-color); */
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
}

div.enterprise-info-container div.info {
    width: 60%;
}

div.enterprise-info-container div.info>div {
    margin-bottom: 10px;
}

div.enterprise-info-container div.info>div:last-child {
    margin-bottom: 0;
}

.enterprise-name {
    font-size: 30px;
    font-weight: bold;
}

.enterprise-admin,
.enterprise-time,
.enterprise-intro {
    font-size: 16px;
}

div.cnt {
    font-size: 18px;
    color: var(--theme-color);
    margin-right: 20px;
}

div.cnt em {
    font-size: 28px;
    margin-right: 5px;
    color: var(--theme-color);
    font-weight: bold;
}

.manager-name {
    font-size: 16px;
    cursor: pointer;
}

.manager-name:hover {
    text-decoration: underline;
}

.right {
    width: 30%;
    padding-left: 40px;
    box-sizing: border-box;
}

.right .upper {
    display: flex;
    align-items: center;
}



button.block {
    display: block;
    border: none;
    width: 120px;
}

button.block {
    color: var(--font-color) !important;
}

ul.change {
    width: 200px;
}

ul.change li {
    cursor: pointer;
    padding: 5px 10px;
}

ul.change li:hover,
ul.change li:hover * {
    display: block;
    width: 100%;
    color: var(--theme-color);
}

.right svg {
    margin-top: 5px;
}

button.follow {
    margin: 0 20px;
    margin-top: 5px;
}
</style>