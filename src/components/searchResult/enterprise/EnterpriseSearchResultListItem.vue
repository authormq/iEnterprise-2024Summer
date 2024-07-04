<template>
    <div class="search-list-container">
        <div class="avatar">
            <img :src="enterpriseAvatar" class="avatar-image" />
        </div>
        <span class="enterprise-name" @click="jumpToEnterprise">{{ enterprise.name }}</span>
    </div>
</template>

<script>
import { NAvatar, NFlex } from 'naive-ui'

export default {
    name: "EnterpriseSearchResultListItem",
    components: { NAvatar, NFlex },
    data() {
        return {
            enterpriseAvatar: this.enterprise.avatar
        }
    },
    props: {
        enterprise: {
            type: Object,
            default: null
        }
    },
    methods: {
        jumpToEnterprise() {
            this.$router.push(`/enterprise/${this.enterprise.id}`)
        },
    }


}
</script>

<style scoped>
div.search-list-container {
    display: flex;
    align-items: center;
    padding: 20px 20px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
}

div.search-list-container:hover {
    background: var(--theme-color-similar);
}

div.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    /* background: skyblue; */
}

.avatar-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    /* background: skyblue; */
}

span.enterprise-name {
    font-size: 20px;
    margin-left: 20px;
}

div.follow {
    position: absolute;
    right: 20px;
    background: var(--theme-color);
    padding: 5px 10px;
    border-radius: 3px;
    color: var(--bg-like);
}
div.unfollow {
    position: absolute;
    right: 20px;
    background: transparent;
    padding: 5px 10px;
    border-radius: 3px;
    border: 1px solid var(--theme-color);
    color: var(--theme-color);
}
</style>