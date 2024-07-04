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
        <div class="icon-wrapper" v-if="!showCommentEditor">
            <!-- 评论 -->
            <svg @click="showCommentEditor = true"
                t="1719729154281" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4442" width="30" height="30"><path d="M878.3 98.2H145.7c-44.7 0-81 36.3-81 81V714c0 44.7 36.3 81 81 81h192.8l149.2 121.8c7.4 6 16.3 9 25.3 9 8.9 0 17.9-3 25.2-9l150-121.8h190c44.7 0 81-36.3 81-81V179.2c0.1-44.7-36.3-81-80.9-81z m1 615.8c0 0.5-0.5 1-1 1H674.1c-9.2 0-18.1 3.2-25.2 9L513.1 834.2 378.1 724c-7.1-5.8-16.1-9-25.3-9H145.7c-0.5 0-1-0.5-1-1V179.2c0-0.5 0.5-1 1-1h732.5c0.5 0 1 0.5 1 1V714z" p-id="4443"></path><path d="M322.1 447.6m-50 0a50 50 0 1 0 100 0 50 50 0 1 0-100 0Z" p-id="4444"></path><path d="M513.1 447.6m-50 0a50 50 0 1 0 100 0 50 50 0 1 0-100 0Z" p-id="4445"></path><path d="M704.3 447.6m-50 0a50 50 0 1 0 100 0 50 50 0 1 0-100 0Z" p-id="4446"></path></svg>
            <!-- 删除 -->
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
        <div class="edit-wrapper" v-if="showCommentEditor">
            <textarea class="comment" v-model="commentContent"></textarea>
            <button @click="showCommentEditor = false, this.commentContent = ''">取消</button>
            <button @click="submitComment">提交</button>
        </div>
    </div>
    <div>
        <!-- 二级评论 -->
        <sub-comment-list :Comments="this.children" v-if="this.children.length"></sub-comment-list>
    </div>
</template>

<script>
import { NPopconfirm } from 'naive-ui'
import SubCommentList from './SubCommentList.vue'
import Moment from '@/api/Moment'

export default {
    name: "CommentListItem",
    components: { NPopconfirm, SubCommentList },
    data() {
        return {
            userAvatar: `/api/users/${this.userId}/avatar/`,
            commentContent: '',
            showCommentEditor: false,
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
        children: {
            type: Array,
            default: []
        },
        momentId: {
            type: Number,
            default: 0
        }
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
        },
        submitComment() {
            let formData = new FormData();
            formData.append('content', this.commentContent);
            formData.append('moment', this.momentId);
            formData.append('parent', this.commentId);
            Moment.createComment(formData).then(
                (response) => {
                    this.showCommentEditor = false
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
    position: relative;
}

img.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
}

textarea.comment {
    width: 100%;
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

/* 微调评论的 icon */
.icon-wrapper svg:first-of-type {
    margin-top: 1px;
}

div.edit-wrapper {
    width: 98%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
}

div.edit-wrapper button:not(:last-of-type) {
    margin-right: 10px;
}

textarea.comment {
    width: 100%;
    margin-bottom: 10px;
}
</style>