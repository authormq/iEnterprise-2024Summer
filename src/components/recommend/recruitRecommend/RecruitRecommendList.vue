<template>
    <div class="recruit-recommend-list">
        <div class="title">热招岗位</div>
        <n-flex v-if="items && items.length > 0" align="center" justify="space-between" :size="10">
            <recruit-recommend-list-item v-for="item in items" :recruitment-id="item.id" :key="item"
                :title="item.title"
                :enterprise-avatar="item.enterprise_avatar" :enterprise-id="item.enterprise"
                :enterprise-name="item.enterprise_name" :position="item.position" :salary="item.salary" 
                :workPlace="item.location" :workTime="item.time" :education="item.education"    
                :description="item.description"
            />
        </n-flex>
    </div>
</template>

<script>
import Recruit from '@/api/Recruit';
import RecruitRecommendListItem from './RecruitRecommendListItem.vue'
import { NFlex } from 'naive-ui';

export default {
    name: "RecruitRecommendList",
    components: {
        RecruitRecommendListItem, NFlex
    },
    data() {
        return {
            items: []
        }
    },
    mounted() {
        Recruit.getRecommendRecruitments().then(response => {
            this.items = response.data
            console.log('f66', this.items)
        })
    },
}
</script>

<style scoped>
.recruit-recommend-list {
    padding: 10px;
    padding-top: 0;
}

.title {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 10px;
}
</style>