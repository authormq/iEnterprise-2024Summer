<template>
    <div class="follow-list-container float-box">
        <a class="unread" v-if="!notificationInfo.is_read" @click="readNotice"> 未读 </a>
        <a v-else>已读</a>
        <div class="content">
            {{ notificationInfo.content }}
        </div>
        <div class="time">
            {{ notificationInfo.timestamp }}
        </div>
        <div class="option" v-if="notificationInfo.is_confirmable && !isConfirmed">
            <button @click="handleNotification(1)">通过</button>
            <button @click="handleNotification(0)">拒绝</button>
        </div>
        <div class="delete">
            <button @click="deleteNotification">删除</button>
        </div>
        <!-- <span class="username" @click="jumpToUser">{{ userName }}</span> -->
        <!-- <div class="follow" v-if="followed" @click="changeFollow">
            已关注
        </div>
        <div class="unfollow" v-else @click="changeFollow">
            未关注
        </div> -->
    </div>
</template>

<script>
import { NAvatar, NFlex } from 'naive-ui'
import { Notice } from '@/api/Notice'
import Enterprise from "@/api/Enterprise"
import Recruit from '@/api/Recruit'
import { useMessage } from "naive-ui"

export default {
    name: "NotificationListItem",
    components: { NAvatar, NFlex },
    data() {
        return {
            message: useMessage(),
            isConfirmed: false
        }
    },
    props: {
        notificationInfo: {
            type: Object,
            default: null
        }
    },
    methods: {
        readNotice() {
            Notice.readSingleNotice(this.notificationInfo.id).then(res => {
                console.log("readSingle", res)
                this.message.success('成功将信息置为已读');
                this.notificationInfo.is_read = true;
            }).catch(err => {
                console.log(err)
                this.message.success('将信息置为已读失败');
            })
        },
        handleNotification(op) {
            if (op === 1) {
                if (this.notificationInfo.subject === "exit_notice") {
                    // alert(111);
                    Enterprise.approveLeaveEnterprises(this.notificationInfo.id).then(res => {
                        console.log("approveLeave", res)
                        this.message.success('成功通过');
                        this.isConfirmed = true
                        // alert()
                    }).catch(err => {
                        console.log(err)
                        this.message.error('通过失败');
                    })
                }
                else if (this.notificationInfo.subject === "admin_transfer_request") {
                    Enterprise.approveManagerChangeRequest(this.notificationInfo.id).then(res => {
                        console.log("approveChangeManager", res)
                        this.message.success('成功通过');
                        this.isConfirmed = true
                        // alert()
                    }).catch(err => {
                        console.log(err)
                        this.message.error('通过失败');
                    })
                } else if (this.notificationInfo.subject === "existing_employee_join") {
                    const data = {
                        reply: "true"
                    }
                    Recruit.replyBetaRecruitment(this.notificationInfo.id, data).then(res => {
                        console.log("approveBetaRecruit", res)
                        this.message.success('成功通过');
                        this.isConfirmed = true
                        // alert()
                    }).catch(err => {
                        console.log(err)
                        this.message.error('通过失败');
                    })
                } else if (this.notificationInfo.subject === "interview_passed") {
                    const data = {
                        reply: "true"
                    }
                    Recruit.replyRecruitment(this.notificationInfo.id, data).then(res => {
                        console.log("approveInterviewRecruit", res)
                        this.message.success('成功通过');
                        this.isConfirmed = true
                        // alert()
                    }).catch(err => {
                        console.log(err)
                        this.message.error('通过失败');
                    })
                }
            } else {
                if (this.notificationInfo.subject === "exit_notice") {
                    // alert(222);
                    Enterprise.disapproveLeaveEnterprises(this.notificationInfo.id).then(res => {
                        console.log("disapproveLeave", res)
                        this.message.success('成功拒绝');
                        this.isConfirmed = true
                        // alert("disapproveLeave");
                    }).catch(err => {
                        console.log(err)
                        this.message.error('拒绝失败');
                    })
                }
                else if (this.notificationInfo.subject === "admin_transfer_request") {
                    Enterprise.disapproveManagerChangeRequest(this.notificationInfo.id).then(res => {
                        console.log("disapproveChangeManager", res)
                        this.message.success('成功拒绝');
                        this.isConfirmed = true
                        // alert()
                    }).catch(err => {
                        console.log(err)
                        this.message.error('拒绝失败');
                    })
                } else if (this.notificationInfo.subject === "existing_employee_join") {
                    const data = {
                        reply: "false"
                    }
                    Recruit.replyBetaRecruitment(this.notificationInfo.id, data).then(res => {
                        console.log("disapproveBetaRecruit", res)
                        this.message.success('成功拒绝');
                        this.isConfirmed = true
                        // alert()
                    }).catch(err => {
                        console.log(err)
                        this.message.error('拒绝失败');
                    })
                } else if (this.notificationInfo.subject === "interview_passed") {
                    const data = {
                        reply: "false"
                    }
                    Recruit.replyRecruitment(this.notificationInfo.id, data).then(res => {
                        console.log("disapproveInterviewRecruit", res)
                        this.message.success('成功拒绝');
                        this.isConfirmed = true
                        // alert()
                    }).catch(err => {
                        console.log(err)
                        this.message.error('拒绝失败');
                    })
                }
            }
            this.readNotice();
            location.reload();
        },
        deleteNotification() {
            Notice.deleteSingleNotice(this.notificationInfo.id).then(res => {
                console.log("deleteSingle", res)
                // this.notificationInfo.is_read = true;
                location.reload();
            }).catch(err => {
                console.log(err)
            })
        }
    }


}
</script>

<style scoped>
div.follow-list-container {
    display: flex;
    align-items: center;
    padding: 20px 30px;
    border-radius: 10px;
    /* cursor: pointer; */
    position: relative;
    margin-bottom: 25px;
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

span.username {
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

a {
    font-size: 18px;
    margin-right: 20px;
}

a.unread {
    font-weight: bold;
    color: var(--theme-color);
    cursor: pointer;
}

a.unread:hover {
    text-decoration: underline;
}

.content {
    font-size: 18px;
    margin-right: 20px;
}

.timestamp {
    font-size: 14px;
}

button {
    width: 60px;
    height: 30px;
    font-size: 14px;
}

div.option {
    position: absolute;
    right: 100px;
}

div.option button:first-child {
    margin-right: 20px;
}

div.delete {
    position: absolute;
    right: 20px;
}

</style>