<template>
    <div class="user-recommend-container" v-if="items && items.length > 0">
        <div class="title">活跃用户</div>
        <n-flex align="center" justify="flex-start" :size="20" class="list-container">
            <user-recommend-list-item v-for="item in items" :key="item" :user-id="item.id" :user-name="item.username"
                :fans="item.followers_count" :follows="item.following_users_count" :tags="item.interests"
                @follow="handleFollow(item)" @unfollow="handleUnfollow(item)" />
        </n-flex>
    </div>
</template>

<script>
import { NFlex } from 'naive-ui';
import UserRecommendListItem from './UserRecommendListItem.vue';
import { User } from '@/api/User';

export default {
    name: "UserRecommendList",
    components: {
        UserRecommendListItem, NFlex
    },
    data() {
        return {
            items: []
        }
    },
    methods: {
        handleFollow(item) {
            item.followers_count++
        },
        handleUnfollow(item) {
            item.followers_count--
        }
    },
    mounted() {
        User.getRecommendUsers().then((response) => {
            this.items = response.data
        }, () => {
            // alert("获取推荐用户失败！")
        })
    }

}
</script>

<style scoped>
.list-container {
    margin-top: 10px;
}

.title{
    font-size: 20px;
    font-weight: 700;
}
</style>