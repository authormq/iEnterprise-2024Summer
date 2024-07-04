<template>
    <div class="fan-list-container" @click="jumpToUser">
        <div class="avatar">
            <img :src="userAvatar" class="avatar-image"/>
        </div>
        <span class="username">{{ userName }}</span>
    </div>
</template>

<script>

export default {
    name: "FanListItem",
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
        }
    },
    methods: {
        jumpToUser() {
            this.$router.push(`/user/${this.userId}`)
        },
    }


}
</script>

<style scoped>
div.fan-list-container {
    display: flex;
    align-items: center;
    padding: 20px 20px;
    border-radius: 5px;
    cursor: pointer;
}

div.fan-list-container:hover {
    background: var(--theme-color-similar);
}

div.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: skyblue;
}

.avatar-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: skyblue;
}

span.username {
    font-size: 20px;
    margin-left: 20px;
}
</style>