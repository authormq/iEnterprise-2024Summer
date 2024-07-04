<template>
    <div>
        <div class="avatar"></div>
        <span>{{ userName }}</span>
        <span>{{ email }}</span>
        <span>{{ profile }}</span>
        <button @click="AddStaff">添加到企业</button>
    </div>
</template>

<script>

export default {
    name: "UserListItem",
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
            default: '用户名'
        },
        email: {
            type: String,
            default: ''
        },
        profile: {
            type: String,
            default: ''
        }
    },
    methods: {
        AddStaff() {

        },
    }
}

</script>
