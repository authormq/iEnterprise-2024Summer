<template>
    <template v-if="currentItems.length > 0">
        <div class="content-wrapper">
            <delivery-record-list-item v-for="item in currentItems" :key="item.user" :delivery="item" />
            <div class="pagination-wrapper">
                <n-pagination v-model:page="currentPage" v-model:page-size="itemsPerPage" :item-count="totalItemsCount"
                    @update:page="handleUpdatePage" :show-quick-jump-dropdown="false">
                </n-pagination>
            </div>
        </div>
    </template>
    <div class="no-hint" v-else>
        暂无历史投递
    </div>
</template>

<script>
import { NPagination } from 'naive-ui'
import DeliveryRecordListItem from './DeliveryRecordListItem.vue'
export default {
    name: "DeliveryRecordList",
    components: {
        NPagination, DeliveryRecordListItem

    },
    data() {
        return {
            itemsPerPage: 6,
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
    },
}
</script>

<style scoped>
.content-wrapper {
    height: 95%;
    /* overflow: auto;
    scrollbar-width: 0; */
}


.pagination-wrapper {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>