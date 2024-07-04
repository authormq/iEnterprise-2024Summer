<template>
    <div class="msg-centered">
        <div class="msg-container">
            <div class="btn" v-if="notificationList.length > 0">
                <button @click="readAll" style="margin-right: 20px;">
                全部已读
                </button>
                <button @click="deleteAllRead">
                    删除已读
                </button>
            </div>
            <div class="list-wrapper">
                <notification-list :items="notificationList"></notification-list>
            </div>
        </div>
    </div>
</template>

<script>
import NotificationList from '@/components/notification/NotificationList.vue';
import { Notice } from '@/api/Notice';
import { useMessage } from "naive-ui";

export default {
    name: 'NotificationView',
    components: {
        NotificationList
    },
    data() {
        return {
            notificationList: [],
            message: useMessage()
        }
    },
    mounted() {
        this.getNotification();
    },
    methods: {
        getNotification() {
            Notice.getNotice().then(res => {
                console.log(111, res)
                this.notificationList = res.data;
            }).catch(err => {
                console.log(err)
            })
        },
        readAll() {
            Notice.readAllNotice().then(res => {
                console.log(222, res)
                this.message.success('成功将全部信息置为已读')
                location.reload()
                // this.notificationList = res.data;
            }).catch(err => {
                this.message.error('将全部信息置为已读失败')
                console.log(err)
            })
        },
        deleteAllRead() {
            Notice.deleteAllReadNotice().then(res => {
                console.log(333, res)
                this.message.success('成功删除全部已读信息')
                location.reload()
                // this.notificationList = res.data;
            }).catch(err => {
                this.message.success('删除全部已读信息失败')
                console.log(err)
            }) 
        },
    },
}
</script>

<style scoped>
.msg-centered {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.msg-container {
    width: 80%;
    height: 98%;
    overflow: auto;
    scrollbar-width: 0;
}

.msg-container::-webkit-scrollbar {
    display: none;
}

div.btn {
    margin-bottom: 20px;
}

div.list-wrapper {
    padding: 0 10px;
    height: 690px;
    box-sizing: border-box;
    overflow: auto;
    scrollbar-width: 0;
}

div.list-wrapper::-webkit-scrollbar {
    display: none;
}
</style>