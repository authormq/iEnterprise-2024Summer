<template>
    <div class="edit-centered">
        <div class="edit-wrapper float-box">
            <div class="title">编辑员工信息</div>
            <div class="editor">
                <div class="right">
                    <div class="right-item">
                        <div>
                            工龄
                        </div>
                        <input type="text" v-model="seniority" placeholder="工龄">
                    </div>
                    <div class="right-item">
                        <div>
                            岗位
                        </div>
                        <input type="text" v-model="post" placeholder="岗位">
                    </div>
                </div>
            </div>
            <div class="btn">
                <button @click="goBack">取消</button>
                <button @click="modifyEmployeeInfo">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
// import Enterprise from '@/api/Enterprise'
import { User } from '@/api/User'
import { useMessage } from 'naive-ui'

export default {
    name: 'ModifyEmployeeInfoView',
    // props: {
    //     enterpriseId: {
    //         type: String,
    //         default: ''
    //     },
    //     enterpriseAvatar: {
    //         type: String,
    //         default: '/api/users/47/avatar/'
    //     },
    //     enterpriseName: {
    //         type: String,
    //         default: ''
    //     },
    //     enterpriseProfile: {
    //         type: String,
    //         default: ''
    //     },
    // },
    data() {
        return {
            userID: 1,
            seniority: '',
            post: '',
            message: useMessage()
        }
    },
    methods: {
        modifyEmployeeInfo() {
            const data = {
                seniority: this.seniority,
                post: this.post
            }
            // console.log(data);
            User.updateUser(this.userID, data).then((res) => {
                console.log(res);
                this.message.success('成功修改企业内个人信息')
                this.$router.go(-1)
            })
                .catch((err) => {
                    console.log(err);
                    this.message.success('修改企业内个人信息失败')
                });
            // console.log(this.userInfo);
            // location.reload();
        },
        goBack() {
            this.message.info('已取消')
            this.$router.go(-1)
        }
    },
    mounted() {
        this.userID = this.$cookies.get('user_id')
        User.getUser(this.userID).then(
            response => {
                console.log(response)
                this.seniority = response.data.seniority
                this.post = response.data.post
            },
            error => {
                console.log(error.message)
            }
        )
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
    min-width: 500px;
    box-sizing: border-box;
    padding: 20px 30px;
    border-radius: 10px;
}

div.editor {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
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

input,
textarea {
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

div.right-item {
    display: flex;
    font-size: 16px;
    white-space: nowrap;
}

div.right-item div {
    margin-right: 20px;
    margin-top: 5px;
}

div.btn {
    display: flex;
    width: 30%;
    justify-content: space-around;
}
</style>