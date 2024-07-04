<template>
    <div class="moment-item-container">
        <div class="upper">
            <div class="left">
                <div class="title" @click="jumpToMoment">
                    <NEllipsis style="max-width: 350px" :tooltip="false">
                        {{ title }}
                    </NEllipsis>
                </div>
                <div class="time">{{ timestamp }}</div>
            </div>
            <div class="right">
                <span>评论数 {{ commentsCount }}</span>
                <span>点赞数 {{ likesCount }}</span>
                <span>转发数 {{ forwardsCount }}</span>
            </div>
        </div>
        <div class="lower">
            <div class="left">
                <div class="avatar">
                    <img :src="userAvatar" class="avatar-image"/>
                </div>
                <div class="author">
                    <div class="username" @click="jumpToUser">
                        <NEllipsis style="max-width: 200px" :tooltip="false">
                            {{ userName }}
                        </NEllipsis>
                    </div>
                    <div class="enterprise-name" v-if="enterpriseName !== undefined" @click="jumpToEnterprise">
                        <NEllipsis style="max-width: 200px" :tooltip="false">
                            {{ enterpriseName == 0 ? '暂未加入企业' : enterpriseName }}
                        </NEllipsis>
                    </div>
                </div>
            </div>
            <div class="right">
                <!-- 点赞 -->
                <span @click="handleLike" v-if="showLikeIcon">
                    <svg :class="{ 'filled': isLiked }"
                        t="1719307337301" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="6404" width="30" height="30">
                        <path
                            d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                            p-id="6405"></path>
                    </svg>
                </span>
                <n-tooltip trigger="click" v-if="showForwardIcon">
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
                        <li class="link">复制链接转发：http://10.251.254.187/moment/{{this.momentId}}</li>
                        <li class="user" v-for="user in chatUserList" :key="user" @click="handleChatForward(user.chatId)">
                            <img :src="user.avatar" class="avatar-image" width="20" height="20" style="margin-right: 5px; border-radius: 50%;"/>
                            <div>{{ user.name }}</div>
                        </li>
                    </ul>
                </n-tooltip>
                <NPopconfirm v-if="!isMainView && showDeleteIcon && $cookies.get('user_id') && $route.path === '/user'" :show-icon="false" positive-text="确认" negative-text="取消" @positive-click="handleDelete">
                    <template #trigger>
                        <svg t="1719307423964" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="9568" width="30" height="30">
                            <path
                                d="M202.666667 256h-42.666667a32 32 0 0 1 0-64h704a32 32 0 0 1 0 64H266.666667v565.333333a53.333333 53.333333 0 0 0 53.333333 53.333334h384a53.333333 53.333333 0 0 0 53.333333-53.333334V352a32 32 0 0 1 64 0v469.333333c0 64.8-52.533333 117.333333-117.333333 117.333334H320c-64.8 0-117.333333-52.533333-117.333333-117.333334V256z m224-106.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z m-32 288a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z m170.666666 0a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z"
                                p-id="9569"></path>
                        </svg>
                    </template>
                    确认删除动态？
                </NPopconfirm>
            </div>
        </div>
    </div>
</template>

<script>
import { NEllipsis, NPopconfirm, NPopselect, NTooltip } from 'naive-ui'
import Conversation from '@/api/Conversation'
import Moment from '@/api/Moment'
export default {
    name: "MomentListItem",
    components: {
        NEllipsis,
        NPopconfirm,
        NPopselect,
        NTooltip
    },
    data() {
        return {
            userAvatar: `/api/users/${this.userId}/avatar/`,
            newComment: undefined,
            isMainView: false,
            chatUserList: [],
            showChatList: false
        }
    },
    mounted() {
        this.isMainView = this.$route.path === '/main'
        // // alert(this.isMainView)
        this.getChatUserList()
    },
    props: {
        // ===== props for styles =====

        titleMaxWidth: {
            type: String,
            default: '350px'
        },

        // ===== props for show icon =====
        showDeleteIcon: {
            type: Boolean,
            default: true
        },
        showLikeIcon: {
            type: Boolean,
            default: true
        },

        showForwardIcon: {
            type: Boolean,
            default: true
        },

        // ===== props for data =====
        momentId: {
            type: Number,
            default: 0
        },
        showAvatar: {
            type: Boolean,
            default: true
        },
        userId: {
            type: Number,
            default: 0
        },
        userName: {
            type: String,
            default: ""
        },
        enterpriseId: {
            type: Number,
            default: 0
        },
        enterpriseName: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        isLiked: {
            type: Boolean,
            default: true
        },
        likesCount: {
            type: Number,
            default: 10
        },
        commentsCount: {
            type: Number,
            default: 100
        },
        comments: {
            type: Array,
            default: ["评论"]
        },
        timestamp: {
            type: String,
            default: "时间戳"
        },
        forwardsCount: {
            type: Number,
            default: 50
        }
    },
    methods: {
        handleLike() {
            if (!this.$cookies.get('user_id')) {
                this.$router.push('/login')
                return
            }
            console.log("emit" + this.isLiked);
            this.$emit('like-moment',this.momentId)
        },
        handleForward() {
            console.log("emit");
            this.$emit('forward-moment', this.momentId);
        },
        handleDelete() {
            console.log("emit");
            this.$emit('delete-moment', this.momentId)
        },
        jumpToEnterprise() {
            this.$router.push(`/enterprise/${this.enterpriseId}`)
        },
        jumpToUser() {
            this.$router.push(`/user/${this.userId}`)
        },
        jumpToMoment() {
            this.$router.push(`/moment/${this.momentId}`)
        },
        handleUrlForward() {
            console.log("url");
            // this.$emit('url-forward', this.momentId)
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
            // this.$emit('chat-forward', this.momentId)
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
                    console.log(this.chatUserList);
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
.moment-item-container {
    padding: 10px;
    padding-bottom: 8px;
    border-radius: 5px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    /* background: skyblue; */
}

.avatar-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    /* background: skyblue; */
}


.upper {
    margin-bottom: 5px;
    /* display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; */
}

.upper .right span {
    margin-right: 10px;
}

.upper .left {
    display: flex;
    align-items: center;
}

.upper .left .title {
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
}

.upper .left .time {
    margin-top: 10px;
    font-size: 14px;
    margin-left: 10px;
}

.lower {
    display: flex;
    justify-content: space-between;
}

.lower .left {
    display: flex;
    align-items: center;
}

.lower .left .author {
    margin-left: 10px;
}

.lower .left .author .username {
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
}

.lower .left .author .username:hover * {
    text-decoration: underline;
}

.lower .left .author .enterprise-name {
    font-size: 12px;
    cursor: pointer;
}

.lower .left .author .enterprise-name:hover * {
    text-decoration: underline;
}

.lower .right {
    display: flex;
    align-items: center;
}

.lower .right svg {
    margin-right: 10px;
    cursor: pointer;
    fill: var(--font-color);
}

.lower .right svg:first-of-type {
    margin-top: 3px;
}

svg.filled {
    fill: var(--theme-color) !important;
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