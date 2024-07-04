<template>
    <div>
    </div>
</template>

<script>
// import CreateEnterprise from '@/components/createEnterprise/CreateEnterprise.vue';
import { useNotification, NButton } from 'naive-ui'
import { h } from 'vue';
export default {
    name: 'NotificationWebsocket',
    components: {
        useNotification, NButton
    },
    data() {
        return {
            websocket: null,
            messages: [],
            notification: useNotification(),
            item: null
        };
    },
    created() {
        this.connectWebSocket();
    },
    beforeDestroy() {
        this.closeWebSocket();
    },
    methods: {
        handleNotification(content, timestamp) {
            const n = this.notification.create({
                title: '新的通知',
                content: content,
                meta: timestamp,
                action: () =>
                    h(
                        NButton,
                        {
                            text: true,
                            onClick: () => {
                                this.$router.push('/notification')
                                n.destroy()
                            }
                        },
                        {
                            default: () => '查看'
                        }
                    ),
                onClose: () => {
                }
            })
        },
        connectWebSocket() {
            let userID = this.$cookies.get('user_id');
            this.websocket = new WebSocket('ws://10.251.254.187:9995/ws/notice/?user_id=' + userID);

            this.websocket.onopen = () => {
                console.log('Notification webSocket connection opened');
            };
            let _this = this;
            this.websocket.onmessage = (event) => {
                // this.messages.push(event.data);
                // alert('收到消息！')
                // console.log(typeof event.data)
                // console.log(event.data.content, event.data.timestamp)
                let data = JSON.parse(event.data)
                console.log(data.content, data.timestamp)
                _this.handleNotification(data.content, data.timestamp)
                _this.item = event.data
                console.log(_this.item)
            };

            this.websocket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            this.websocket.onclose = () => {
                console.log('Notification WebSocket connection closed');
            };
        },
        closeWebSocket() {
            if (this.websocket) {
                this.websocket.close();
            }
        }
    }
}
</script>

<style scoped></style>