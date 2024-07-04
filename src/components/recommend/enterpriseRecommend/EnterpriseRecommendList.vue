<template>
    <div class="enterprise-recommend-container" v-if="items && items.length > 0">
        <div class="title">热门公司</div>
        <n-flex justify="flex-start" :size="20" class="list-container">
            <enterprise-recommend-list-item v-for="item in items" :key="item" :enterprise-id="item.id"
                :enterprise-name="item.name" :enterprise-avatar="item.avatar" :fans="item.followers_count" :recruitment-count="item.recruitments_count"
                @follow="handleFollow(item)" @unfollow="handleUnfollow(item)" />
        </n-flex>
    </div>
</template>

<script>
import { NFlex } from 'naive-ui';
import EnterpriseRecommendListItem from './EnterpriseRecommendListItem.vue';
import Enterprise from '@/api/Enterprise';

export default {
    name: "EnterpriseRecommendList",
    components: { EnterpriseRecommendListItem, NFlex },
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
        Enterprise.getRecommendEnterprises().then((response) => {
            this.items = response.data
        }, () => {
            // alert("获取推荐企业失败！")
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