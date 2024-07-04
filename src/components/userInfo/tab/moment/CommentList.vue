<template>
    <!-- <n-infinite-scroll :style="{ height: height }" :distance="10" @load="handleLoad"> -->
        <comment-list-item v-for="i in Comments" :key="i" :commentId="i.id" :momentId="this.momentId"
        :userId="i.sender.id"
        :userAvatar="i.sender.avatar" :userName="i.sender.username" :content="i.content" :timestamp="i.timestamp"
        :children="i.children"/>
        <!-- <div v-if="currentCount < totalCount">加载中...</div>
        <div v-else>已加载全部内容</div> -->
    <!-- </n-infinite-scroll> -->
</template>

<script>
import { NInfiniteScroll } from 'naive-ui'
import CommentListItem from './CommentListItem.vue'
export default {
    //获取头像直接写专门的url
    name: "CommentList",
    components: {
        NInfiniteScroll, CommentListItem
    },
    data() {
        return {
            //评论区高度
            height: '1000px',
            // currentCount: Math.min(this.Comments.length, 5),
            // totalCount: this.Comments.length
            momentId: this.$route.params.id
        }
    },
    props: {
        Comments: {
            type: Array,
            default: []
        },
    },
    methods: {
        handleLoad() {
            // if (this.currentCount < this.totalCount) {
            //     setTimeout(() => {
            //         this.currentCount = Math.min(this.totalCount, this.currentCount + 5)
            //     }, 250)
            // } else {
            //     this.currentCount = this.totalCount
            // }
        }
    },
}
</script>

<style></style>