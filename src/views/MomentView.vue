<template>
    <div class="moment">
        <div class="moment-list">
            <div>
                <div class="title">
                    <h2 v-if="!showEnterpriseMoment">
                        用户动态
                    </h2>
                    <h2 v-else> 
                        企业动态
                    </h2>
                    <svg @click="showEnterpriseMoment = !showEnterpriseMoment"
                        t="1719840224591" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5950" width="30" height="30"><path d="M938.336973 255.26894c-16.685369-6.020494-35.090879 2.752226-40.939358 19.437594l-24.770032 69.493701c-29.070385-65.537376-74.998152-123.162103-133.48295-166.337645-185.947253-137.611288-450.848984-100.112212-590.180413 83.942886C81.534688 350.908785 52.980346 460.653788 68.805644 570.742819c15.825298 110.605073 74.48211 208.481102 164.789518 275.394591 75.686209 55.904586 164.273476 83.082815 252.172686 83.082815 128.494541 0 255.26894-57.624727 338.007727-166.853687 36.639006-48.335965 61.581052-102.348396 74.48211-160.833193 3.78431-17.373425-7.224593-34.402822-24.426004-38.187133-17.201411-3.78431-34.402822 7.052579-38.187133 24.426004-10.836889 49.36805-31.994625 95.123803-62.957164 135.891147-118.173694 156.016798-342.996136 187.839409-500.90509 70.869814-76.546279-56.592642-126.086343-139.33143-139.503444-232.907106-13.417101-93.059634 10.664875-185.775239 67.77356-261.11742C318.05409 144.491853 542.704519 112.497228 700.785486 229.466823c57.280699 42.315471 100.112212 100.972283 123.334117 167.197715l-110.261045-43.003528c-16.513355-6.364522-35.090879 1.720141-41.627415 18.233496-6.536536 16.513355 1.720141 35.090879 18.233496 41.627415l162.38132 63.473207c3.78431 1.548127 7.740635 2.236183 11.69696 2.236183 0.516042 0 1.032085-0.172014 1.548127-0.172014 1.204099 0.172014 2.408198 0.688056 3.612296 0.688056 13.245087 0 25.630102-8.256677 30.274483-21.32975l57.796741-161.693264C963.623047 279.694944 955.022342 261.289434 938.336973 255.26894z" p-id="5951"></path></svg>
                </div>
                <button @click="jumpToCreateView">新建动态</button>
                <div class="list-wrapper float-box">
                    <div v-if="!showEnterpriseMoment">
                        <moment-list :items="moments" :items-per-page="5" :showDeleteIcon="false"></moment-list>
                    </div>
                    <div v-else>
                        <div >
                            <!-- <span>全部企业动态</span> -->
                            <!-- <img v-for="enterprise in enterpriseFollowList" :key="enterprise" :src="enterprise.avatar" width="20" height="20" style="margin-right: 5px; border-radius: 50%;"/> -->
                            <moment-list :items="enterpriseMomentList" :items-per-page="5" :showDeleteIcon="false"></moment-list>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { NTooltip } from 'naive-ui'
import Moment from '@/api/Moment'
import MarkdownDisplayer from '@/components/userInfo/tab/moment/markdown/MarkdownDisplayer.vue';
import MomentList from '@/components/userInfo/tab/moment/MomentList.vue'
import Conversation from '@/api/Conversation';
// import Enterprise from '@/api/Enterprise';
export default {
    name: 'MomentView',
    components: {
        MarkdownDisplayer, MomentList, NTooltip
    },
    data() {
        return {
            momentId: -1,
            momentItem: {},
            moments: [],
            isLiked: false,
            chatUserList: [],
            showEnterpriseMoment: false,
            enterpriseFollowList: [],
            enterpriseMomentList: []
        }
    },
    created() {
        this.getMomentList();
    },
    mounted() {
        this.getChatUserList()
        this.getEnterpriseMomentList()
        // Enterprise.getFollowingEnterprises().then(
        //     (response) => {
        //         this.enterpriseFollowList = response.data
        //     },
        //     (error) => {
        //         console.log(error.message)
        //     }
        // )
    },
    methods: {
        handleLike() {
            let id = this.momentId
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
                    },
                    (error) => {
                        console.log(error.message);
                    }
                );
            }
        },
        jumpToMomentDetail() {
            this.$router.push('/moment/' + this.momentId);
        },
        jumpToUser() {
            this.$router.push('/user/' + this.momentItem.sender.id);
        },
        getMomentList() {
            Moment.getMoments().then((response) => {
                this.moments = response.data
            }, () => {
                // alert('获取关注用户动态失败！')
            })
        },
        getEnterpriseMomentList() {
            Moment.getEnterpriseMoments().then((response) => {
                this.enterpriseMomentList = response.data
            }, () => {
                // alert('获取关注企业动态失败！')
            })
        },
        jumpToCreateView() {
            this.$router.push('/moment/create');
        },
        handleUrlForward() {
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
div.moment {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
}

div.moment-detail {
    width: 50%;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: 0;
    margin-left: 20px;
}

div.moment-detail::-webkit-scrollbar {
    display: none;
}

div.top {
    padding-left: 25px;
    display: flex;
    justify-content: space-between;
}

svg {
    fill: var(--font-color);
    cursor: pointer;
}

svg.filled {
    fill: var(--theme-color);
}

svg:not(:last-of-type) {
    margin-right: 10px;
}

.moment-title {
    font-size: 30px;
    font-weight: bold;
    color: var(--theme-color);
    cursor: pointer;
}

.moment-title span {
    font-size: 16px;
    font-weight: normal;
}

.moment-list {
    margin-left: 0px;
    flex: 1;
    height: 95%;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 0;
    margin-right: 20px;
    width: 45%;
    position: relative;
}

.moment-list button {
    position: absolute;
    right: 0;
    top: 0;
}

.moment-list h2 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 0;
}

.moment-list>div {
    height: 94%;
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

.title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.title svg {
    margin-left: 10px;
}

.list-wrapper {
    border-radius: 10px;
    padding: 5px 20px;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: 0;
    box-sizing: border-box;
}

.list-wrapper::-webkit-scrollbar {
    display: none;
}
</style>