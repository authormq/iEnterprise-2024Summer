<!-- 添加企业员工，有一个搜索栏，可以搜索全局的用户，并且将其添加为企业员工 -->
 <!-- 需要在点击搜索之后可以直接返回搜索的结果并且在当前页面进行渲染 -->
<template>
    <div>
        <input type="text" v-model="username">
        <button @click="selectUser">搜索</button>
    </div>
    <div>
        <user-list :items="userList"></user-list>
    </div>
</template>

<script>
import UserList from '@/components/enterpriseInfo/tab/user/UserList.vue'
export default {
    name: 'AddEnterpriseStaffView',
    components: {
        UserList,
    },
    data() {
        return{
            username: '',
            userList: [
            {
                id:1,
                username: "abcd",
                email: "123455@qq.com",
                enterprise: {
                    profile:"profile"
                }
            },
            {
                id:2,
                username: "name",
                email: "44557788@qq.com",
                enterprise: {
                    profile:"profile"
                }
            },
            ]
        }
    },
    methods: {
        selectUser() {
            
        }
    }
}
</script>
<style>

</style>
