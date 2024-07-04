<template>
    <div class="edit-centered">
        <div class="edit-wrapper float-box">
            <div class="title">注销个人账号</div>
            <div class="editor">
                <div class="right">
                    <div style="margin-bottom: 10px">
                        在下方输入框中输入用户名、真实姓名以及邮箱信息以验证身份。<br>
                        在注销账号前须确保已经退出企业。
                    </div> 
                    <input type="text" v-model="name" placeholder="用户名">
                    <input type="text" v-model="realName" placeholder="真实姓名">
                    <input type="text" v-model="email" placeholder="邮箱">
                </div>
            </div>
            <div class="btn">
                <button @click="goBack">取消</button>
                <n-popconfirm :show-icon="false"
                positive-text='确认' negative-text='取消' :show="showPopconfirm"
                @positive-click="submitUnsubscribe" @negative-click="showPopconfirm = false">
                    <template #trigger>
                        <button @click="verifyUnsubscribeSubmit">确认</button>    
                    </template>
                    注销操作不可撤回，确认注销账号？
                </n-popconfirm>
            </div>
        </div>
    </div>
</template>

<script>
import { useMessage, NPopconfirm } from "naive-ui";
import { User } from '@/api/User';
import { Account } from '@/api/Account';
// import { flatten } from 'naive-ui/es/_utils';
export default {
    name: 'UnsubscribeView',
    components: { NPopconfirm },
    data() {
        return {
            userId: '',
            name: '',
            realName: '',
            email: '',
            originalName: '',
            originalRealName: '',
            originalEmail: '',
            inEnterprise: '',
            showPopconfirm: false,
            message: useMessage(),
        }
    },
    created() {
    },
    mounted() {
        this.userId = this.$cookies.get('user_id')
        User.getUser(this.userId).then(
            (response) => {
                this.originalName = response.data.username
                this.originalRealName = response.data.real_name
                this.originalEmail = response.data.email
                this.inEnterprise = response.data.enterprise == null ? false : true
            }
        )
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        verifyUnsubscribeSubmit() {
            if (this.name === '' || this.realName === '' || this.email === '') {
                this.message.error('请填写完整信息')
                return
            }
            if (this.name !== this.originalName || this.realName !== this.originalRealName || this.email !== this.originalEmail) {
                this.message.error('信息填写错误')
                return
            }
            if (this.inEnterprise) {
                this.message.error('请先退出企业')
                return
            }
            this.showPopconfirm = true
        },
        submitUnsubscribe() {
            Account.accountsCancel().then(
                (response) => {
                    this.showPopconfirm = false
                    this.message.success('注销成功')
                    this.$router.push('/main')
                    this.$cookies.remove('user_id')
                    this.$cookies.remove('token')
                    location.reload()
                },
                (error) => {
                    this.showPopconfirm = false
                    console.log(error.message);
                    this.message.error('注销失败')
                }
            )
        }
    }
}
</script>
<style scoped>
.edit-centered {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.edit-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 50%;
    min-width: 600px;
    box-sizing: border-box;
    padding: 20px 30px;
    border-radius: 10px;
}

div.editor {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
}

div.title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}

img {
    width: 270px;
    height: 270px;
    border-radius: 10px;
    cursor: pointer;
    transition: .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

img:hover {
    transform: translate(-1px, -1px) scale(1.02);
}

input, textarea {
    width: 500px;
}

input {
    margin-bottom: 20px;
}

textarea {
    height: 200px;
}

div.right {
    width: 500px;
    display: flex;
    flex-wrap: wrap;
}

div.btn {
    display: flex;
    width: 30%;
    justify-content: space-around;
}
</style>