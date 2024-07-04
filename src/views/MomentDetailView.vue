<template>
    <div class="moment-centered">
        <div class="moment-container">
            <div class="top">
                <div class="moment-title">
                    {{ momentItem.title }}
                    <span>{{ momentItem.sender.username }}</span>
                </div>
                <div>
                    <!-- 这个是点赞 -->
                    <svg 
                        :class="{'filled': isLiked }"
                        @click="handleLike" t="1719307337301" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="6404" width="30" height="30">
                        <path
                            d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                            p-id="6405"></path>
                    </svg>
                    <!-- 这个是转发 -->
                    <n-tooltip trigger="click">
                        <template #trigger>
                            <svg t="1719307351286" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="7415" width="30" height="30">
                                <path
                                    d="M865.922728 583.211878c-16.276708 0-29.580712 13.246699-29.667693 29.727045l0 215.125569c0 17.992793-14.58723 32.637328-32.520671 32.637328L181.762717 860.70182c-17.935488 0-32.520671-14.645558-32.520671-32.637328L149.242046 292.155966c0-17.992793 14.586207-32.637328 32.520671-32.637328l291.230897 0c16.304338-0.029676 29.580712-13.363356 29.580712-29.724998 0-16.392342-13.276375-29.727045-29.610388-29.727045l-295.336402 0c-48.358381 0-87.721901 39.450501-87.721901 87.925538l0 544.205493c0 48.475038 39.36352 87.925538 87.721901 87.925538l630.239961 0c48.358381 0 87.720877-39.450501 87.720877-87.925538L895.588375 612.762915C895.501394 596.458577 882.19739 583.211878 865.922728 583.211878z"
                                    p-id="7416"></path>
                                <path
                                    d="M930.818761 338.183256l0-0.318248L727.07645 133.511783l-6.435573-6.259564-0.814552 0.844228c-4.511757-2.532683-9.606799-3.873214-14.876826-3.873214-16.974603 0-30.774911 13.829983-30.774911 30.832216 0 5.298679 1.338485 10.393721 3.873214 14.907525l-0.903579 0.931209 141.845589 142.224212-145.573493 0.057305C436.396091 342.726735 378.197598 489.375723 361.049033 717.050096c0 17.004279 13.800307 30.832216 30.772864 30.832216 13.858636 0 25.620517-9.229199 29.464055-21.893636l1.397836-8.181333c18.022469-215.329207 60.470233-321.567833 251.839749-342.937536l144.466276 0L683.433464 510.804778l-5.502317 7.744381c-1.951445 4.104481-2.969635 9.112542-2.969635 13.654998 0 17.002232 13.799284 30.832216 30.772864 30.832216 4.832052 0 10.160407-1.164522 14.439874-3.37691L929.954067 350.740246c1.860371-1.305739 4.140297-4.52506 4.140297-6.970762C934.093341 341.323782 932.679132 339.488994 930.818761 338.183256z"
                                    p-id="7417"></path>
                            </svg>
                        </template>
                        <ul>
                            <li class="link">复制链接转发：http://10.251.254.187/moment/{{momentId}}</li>
                            <li class="user" v-for="user in chatUserList" :key="user" @click="handleChatForward(user.chatId)">
                                <img :src="user.avatar" class="avatar-image" width="20" height="20" style="margin-right: 5px; border-radius: 50%;"/>
                                <div>{{ user.name }}</div>
                            </li>
                        </ul>
                    </n-tooltip>
                </div>
            </div>
            <!-- Markdown Displayer -->
            <markdown-displayer :value="momentItem.content"></markdown-displayer>
            <div class="comment-container">
            <!-- 注释列表 -->
                <div class="comment-title">
                    评论
                </div>
                <div class="edit-wrapper" v-if="!showCommentEditor">
                    <button @click="showCommentEditor = true" >发表评论</button>
                </div>
                <div class="edit-wrapper" v-if="showCommentEditor">
                    <textarea class="comment" v-model="commentContent"></textarea>
                    <button @click="showCommentEditor = false, this.commentContent = ''">取消</button>
                    <button @click="submitComment">提交</button>
                </div>
                <comment-list :Comments="this.commentList"></comment-list>
            </div>
        </div>

    </div>
</template>

<script>
import { NEllipsis, NPopconfirm, NTooltip } from 'naive-ui'
import Moment from '@/api/Moment';
import CommentList from '@/components/userInfo/tab/moment/CommentList.vue';
import MarkdownDisplayer from '@/components/userInfo/tab/moment/markdown/MarkdownDisplayer.vue';
import CreateMomentView from './CreateMomentView.vue';
import Conversation from '@/api/Conversation';
export default {
    name: 'MomentDetailView',
    components: {
        NEllipsis,
        NPopconfirm,
        CommentList,
        MarkdownDisplayer,
        CreateMomentView,
        NTooltip
    },
    data() {
        return {
            momentId: this.$route.params.id,
            momentItem: {},
            commentList: [],
            showCommentEditor: false,
            commentContent: '',
            isLiked: false,
            chatUserList: []
        }
    },
    created() {
        this.momentId = this.$route.params.id
        Moment.getSingleMoment(this.momentId).then(
            (response) => {
                this.isLiked = response.data.is_liked
                this.momentItem = response.data
                this.commentList = response.data.comments
            },
            (error) => {
                console.log(error.message);
            }
        )
        this.$bus.on('update-comment', this.updateCommentList)
    },
    mounted() {
        this.getChatUserList()
    },
    methods: {
        submitComment() {
            let formData = new FormData();
            formData.append('content', this.commentContent);
            formData.append('moment', this.momentId);
            Moment.createComment(formData).then(
                (response) => {
                    this.showCommentEditor = false
                    this.$bus.emit('update-comment')
                },
                (error) => {
                    console.log(error.message)
                }
            )
        },
        updateCommentList() {
            Moment.getSingleMoment(this.momentId).then(
                (response) => {
                    this.commentList = response.data.comments
                },
                (error) => {
                    console.log(error.message);
                }
            )
        },
        handleLike() {
            let id = this.momentId;
            if (!this.isLiked) {
                Moment.likeMoment(id).then(
                    (response) => {
                        console.log(response);
                        this.isLiked = !this.isLiked;
                        console.log("like")
                    },
                    (error) => {
                        console.log(error.message);
                    }
                );
            } else {
                Moment.unlikeMoment(id).then(
                    (response) => {
                        console.log(response);
                        this.isLiked = !this.isLiked;
                        console.log("unlike")
                    },
                    (error) => {
                        console.log(error.message);
                    }
                );
            }
        },
        handleUrlForward() {
            console.log("url");
            console.log(`http://10.251.254.187/moment/${this.momentId}`);
        },
        handleChatForward(id) {
            console.log('chat');
            Moment.forwardMoment(this.momentId, id).then(
                (response) => {
                    console.log(response);
                    this.$router.push(`/chat/` + id)
                },
                (error) => {
                    console.log(error.message)
                }
            )
        },
        getChatUserList() {
            Conversation.getConversations().then(
                (response) => {
                    response.data.forEach(element => {
                        let option = {
                            name: element.name,
                            chatId: element.id,
                            avatar: element.avatar
                        }
                        this.chatUserList.push(option)
                    });
                },
                (error) => {
                    console.log(error.message);
                }
            )
        }
    }
}
</script>

<style scoped>
div.moment-centered {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px 0;
    display: flex;
    justify-content: center;
}

div.moment-container {
    width: 80%;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: 0;
}

div.moment-container::-webkit-scrollbar {
    display: none;
}

div.top {
    padding-left: 25px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

svg {
    fill: var(--font-color);
    cursor: pointer;
}

svg:not(:last-of-type) {
    margin-right: 10px;
}

.moment-title {
    font-size: 30px;
    font-weight: bold;
    color: var(--theme-color);
}

.moment-title span {
    font-size: 16px;
    font-weight: normal;
}

div.comment-container {
    margin-left: 20px;
    padding: 0 5px;
    box-sizing: border-box;
    margin-top: 30px;
}

div.comment-title {
    font-size: 30px;
    font-weight: bold;
    color: var(--theme-color);
     margin-bottom: 10px;
}

div.edit-wrapper {
    width: 100%;
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

svg.filled {
    fill: var(--theme-color);
}


li.link {
    padding: 5px;
    font-size: 14px;
}

li.user {
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

li.user div {
    margin-left: 10px;
}

li.user:hover {
    background: var(--bg-grey);
}
</style>