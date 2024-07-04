<template>
    <div class="search-centered">
        <div class="tabs-container">
            <n-tabs>
                <n-tab-pane name="moment" tab="岗位">
                    <recruit-list :items="searchResult.recruitments"></recruit-list>
                </n-tab-pane>
                <n-tab-pane name="fan" tab="企业">
                    <enterprise-list :items="searchResult.enterprises"></enterprise-list>
                </n-tab-pane>
                <n-tab-pane name="followUser" tab="用户">
                    <fan-list :items="searchResult.users"></fan-list>
                </n-tab-pane>
                <n-tab-pane name="followEnterprise" tab="动态">
                    <moment-list :items="searchResult.moments" :items-per-page="5"></moment-list>
                </n-tab-pane>
            </n-tabs>
        </div>
    </div>
</template>

<script>

import { NTabs, NTabPane } from "naive-ui"
import RecruitList from '@/components/searchResult/RecruitList.vue'
import EnterpriseList from '@/components/searchResult/enterprise/EnterpriseSearchResultList.vue'
import FanList from "@/components/userInfo/tab/fan/FanList.vue"
import MomentList from '@/components/userInfo/tab/moment/MomentList.vue'
import { User } from "@/api/User"

export default {
    name: 'SearchResultView',
    components: {
        NTabs, NTabPane, RecruitList, EnterpriseList, FanList, MomentList
    },
    data() {
        return {
            searchResult: {
                enterprises: [],
                moments: [],
                recruitments: [],
                users: []
            }
        }
    },
    mounted() {
        console.log(this.$route.params.content)
        this.$bus.emit('set-content', this.$route.params.content)
        this.getSearchResult()
    },
    watch: {
        '$route.params.content': {
            handler(newValue) {
                // console.log(newValue)
                this.getSearchResult()
            }
        }
    },
    methods: {
        getSearchResult() {
            User.getSearchResult(this.$route.params.content)
                .then((res) => {
                    console.log(res);
                    this.searchResult = res.data.res;
                    console.log(this.searchResult);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
}
</script>

<style scoped>
.search-centered {
    width: 100%;
    height: 98%;
    display: flex;
    justify-content: center;
}

.tabs-container {
    width: 80%;
    display: flex;
    justify-content: center;
}
</style>