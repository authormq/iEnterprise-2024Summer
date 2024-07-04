<template>
    <template v-if="currentItems.length > 0">
        <fan-list-item v-for="item in currentItems" :key="item" :user-id="item.id" :user-name="item.username" />
        <div class="pagination-wrapper">
            <n-pagination v-model:page="currentPage" v-model:page-size="itemsPerPage" :item-count="totalItemsCount"
                @update:page="handleUpdatePage" :show-quick-jump-dropdown="false">
                <template #goto>
                    跳转到
                </template>
            </n-pagination>
        </div>
    </template>
    <div class="no-hint" v-else>暂无用户</div>
</template>

<script>
import { NPagination } from 'naive-ui'
import FanListItem from './FanListItem.vue'
export default {
    //获取头像直接写专门的url
    name: "FanList",
    components: {
        NPagination, FanListItem

    },
    data() {
        return {
            itemsPerPage: 5,
            currentPage: 1,
        }
    },
    computed: {
        totalItemsCount() {
            if (this.items) {
                return this.items.length
            }
            else {
                return 0
            }
        },
        currentItems() {
            if (this.items) {
                let start = (this.currentPage - 1) * this.itemsPerPage
                let end = Math.min(this.currentPage * this.itemsPerPage, this.totalItemsCount)
                return this.items.slice(start, end)
            } else {
                return []
            }
        }
    },
    props: {
        items: {
            type: Array,
            default: []
        }
    },
    methods: {
        handleUpdatePage(page) {
            this.currentPage = page
        },

    }
}
</script>

<style scoped>
.pagination-wrapper {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>