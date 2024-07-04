<template>
    <user-list-item v-for="item in currentItems" :key="item" :userId="item.id" :userName="item.username" :email="item.email" :profile="item.enterprise.profile"/>
    <div class="pagination-wrapper">
        <n-pagination v-model:page="currentPage" v-model:page-size="itemsPerPage" :item-count="totalItemsCount"
            @update:page="handleUpdatePage" :show-quick-jump-dropdown="false">
            <template #goto>
                跳转到
            </template>
        </n-pagination>
    </div>
</template>

<script>
import { NPagination } from 'naive-ui'
import UserListItem from "./UserListItem.vue"
export default {
    name: "UserList",
    components: {
        UserListItem, NPagination
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
    }
}
</script>

<style>

</style>
