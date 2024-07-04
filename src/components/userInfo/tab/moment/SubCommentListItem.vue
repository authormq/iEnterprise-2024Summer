<template>
    <div class="wrapper">
        <div class="comment-top">
            <img class="avatar" :src="userAvatar" @click="jumpToUser" />
            <span @click="jumpToUser">{{ userName }}</span>
        </div>
        <p>
            {{ content }}
        </p>
        <p class="timestamp">
            {{ timestamp }}
        </p>
        <div class="icon-wrapper">
            <n-popconfirm
                @positive-click="deleteComment"
                :show-icon="false"
                positive-text="确定"
                negative-text="取消"
                v-if="showDeleteIcon"
            >
                <template #trigger>
                    <svg
                        t="1719307423964" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="9568" width="30" height="30">
                        <path
                            d="M202.666667 256h-42.666667a32 32 0 0 1 0-64h704a32 32 0 0 1 0 64H266.666667v565.333333a53.333333 53.333333 0 0 0 53.333333 53.333334h384a53.333333 53.333333 0 0 0 53.333333-53.333334V352a32 32 0 0 1 64 0v469.333333c0 64.8-52.533333 117.333333-117.333333 117.333334H320c-64.8 0-117.333333-52.533333-117.333333-117.333334V256z m224-106.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z m-32 288a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z m170.666666 0a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z"
                            p-id="9569">
                        </path>
                    </svg>
                </template>
                确认删除评论？
            </n-popconfirm>
        </div>
    </div>
</template>

<script>
import { NPopconfirm } from 'naive-ui'
import Moment from '@/api/Moment'

export default {
    name: "SubCommentListItem",
    components: { NPopconfirm },
    data() {
        return {
            showDeleteIcon: false
        }
    },
    props: {
        commentId: {
            type: Number,
            default: 0
        },
        userId: {
            type: Number,
            default: 0
        },
        userAvatar: {
            type: String,
            default: ""
        },
        userName: {
            type: String,
            default: "评论用户的名称"
        },
        content: {
            type: String,
            default: "评论的内容"
        },
        timestamp: {
            type: String,
            default: "时间戳"
        },
    },
    mounted() {
        this.showDeleteIcon = this.$cookies.get('user_id') == this.userId ? true : false
    },
    methods: {
        jumpToUser() {
            this.$router.push('/user/' + this.userId)
        },
        deleteComment() {
            Moment.deleteComment(this.commentId).then(
                (response) => {
                    console.log('delete comment successfully');
                    this.$bus.emit('update-comment')
                },
                (error) => {
                    console.log(error.message)
                }
            )   
        }
    }
}
</script>

<style scoped>
.wrapper {
    margin-left: 50px;
    position: relative;
}

img.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

div.comment-top {
    display: flex;
    align-items: center;
}

div.comment-top span {
    margin-left: 10px;
    font-size: 16px;
    cursor: pointer;
}

p {
    padding-left: 50px;
}

.timestamp {
    /* color: var(--bg-grey); */
    margin-bottom: 10px;
}

.icon-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
    position: absolute;
    bottom: 0;
}

.icon-wrapper svg {
    margin-right: 10px;
} 
</style>