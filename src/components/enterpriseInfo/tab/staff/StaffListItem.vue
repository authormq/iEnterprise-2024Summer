<template>
    <div class="staff-list-container" @click="jumpToUser">
        <img class="avatar" :src="userAvatar"/>
        <div class="right">
            <div class="upper">
                <span class="staff-info username">{{ userName }}</span>
                <span class="staff-info">{{ realName }}</span>
                <span class="staff-info">{{ email }}</span>
            </div>
            <div class="lower">
                <span class="staff-info">工龄：{{ years }}</span>
                <span class="staff-info">岗位：{{ position }}</span>
            </div>
        </div>
        <!-- <span class="username">{{ identity }}</span> -->
        <!-- <span v-for="website in websites" :key="website">{{ website }}</span> -->
    </div>
</template>

<script>

export default {
    name: "StaffListItem",
    data() {
        return {
            userAvatar: `/api/users/${this.userId}/avatar/`
        }
    },
    props: {
        userId: {
            type: Number,
            default: 0
        },
        userName: {
            type: String,
            default: '关注的用户名'
        },
        realName: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        websites: {
            type: Array,
            default: []
        },
        identity: {
            type: String,
            default: ''
        },
        years: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: ''
        }
    },
    methods: {
        jumpToUser() {
            this.$router.push({ path: `/user/${this.userId}` })
        },
    }


}
</script>

<style scoped>
div.staff-list-container {
    display: flex;
    align-items: center;
    padding: 20px 5px;
    border-radius: 5px;
    cursor: pointer;
}

div.staff-list-container:hover {
    background: var(--theme-color-lighter);
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

span.staff-info {
    font-size: 14px;
    margin-left: 10px;
}

span.username {
    font-weight: bold;
}
</style>