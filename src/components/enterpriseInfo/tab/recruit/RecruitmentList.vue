<template>
    <div class="recruitment-list-container">
        <recruitment-list-item v-for="item in items" :key="item" 
        :recruitmentId="item.id"
        :recruitmentName="item.title"
        :recruitProfile="item.description"
        :recruitmentSalary="item.salary"
        :enterprisePosition="item.location"
        :recruitmentDegree="item.education"/>
    </div>
</template>

<script>
import RecruitmentListItem from './RecruitmentListItem.vue'
export default {
    name: "RecruitmentList",
    components: {
        RecruitmentListItem
    },
    props: {
        items: {
            type: Array,
            default: []
        }
    },
    methods: {
    },
    mounted() {

    },
}
</script>

<style scoped>
.recruitment-list-container {
    height: 100%;
    overflow-y: auto;
}
</style>