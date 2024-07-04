<template>
    <template v-if="currentItems.length > 0">
        <staff-list-item v-for="item in currentItems" :key="item" 
            :userId="item.id" 
            :userName="item.username" 
            :realName="item.real_name"
            :websites="item.websites" 
            :identity="item.identity" 
            :email="item.email"
            :years="item.seniority"
            :position="item.post"
        />
        <div class="pagination-wrapper">
            <n-pagination v-model:page="currentPage" v-model:page-size="itemsPerPage" :item-count="totalItemsCount"
                @update:page="handleUpdatePage" :show-quick-jump-dropdown="false">
                <template #goto>
                    跳转到
                </template>
            </n-pagination>
        </div>
    </template>
    <div class="no-hint" v-else>
        员工列表不可见
    </div>
</template>

<script>
import { NPagination } from 'naive-ui'
import StaffListItem from './StaffListItem.vue'
export default {
    //获取头像直接写专门的url
    name: "StaffList",
    components: {
        NPagination, StaffListItem
    },
    data() {
        return {
            itemsPerPage: 7,
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
                // let start = (this.currentPage - 1) * this.itemsPerPage
                // let end = Math.min(this.currentPage * this.itemsPerPage, this.totalItemsCount)
                // return this.items.slice(start, end)
                return this.items
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
.pagination-wrapper {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>