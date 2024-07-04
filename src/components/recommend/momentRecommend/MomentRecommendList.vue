<template>
    <moment-list :items="items" :items-per-page="5"></moment-list>
</template>

<script>
import MomentList from '@/components/userInfo/tab/moment/MomentList.vue'
import Moment from '@/api/Moment'
export default {
    name: "MomentRecommendList",
    components: { MomentList },
    data() {
        return {
            items: []
        }
    },
    mounted() {
        Moment.getMoments().then((response) => {
            this.items = response.data
        }, () => {
            // alert('获取推荐动态失败！')
        })
    }
}
</script>

<style scoped></style>