<template>
    <div class="edit-centered">
        <div class="edit-wrapper float-box">
            <div class="title">编辑企业信息</div>
            <div class="editor">
                <div class="left">
                    <img :src="avatar" class="avatar-image" alt="User Avatar" @click.prevent="activateInput" />
                    <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
                </div>
                <div class="right">
                    <input type="text" v-model="name" placeholder="企业名称">
                    <textarea v-model="profile" placeholder="企业简介"></textarea>
                </div>
            </div>
            <div class="btn">
                 <button @click="goBack">取消</button>
                <button @click="modifyEnterpriseInfo">确认</button>    
            </div>
        </div>
    </div>
</template>

<script>
import Enterprise from '@/api/Enterprise'
import { useMessage } from "naive-ui";

export default {
    name: 'ModifyEnterpriseInfoView',
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
            avatar: '',
            name: '',
            profile: '',
            message: useMessage(),
            enterpriseId: 1
        }
    },
    created() {
        this.enterpriseId = this.$route.params.id
        console.log(this.enterpriseId)
    },
    methods: {
        modifyEnterpriseInfo() {
            let formData = new FormData();
            if (this.name != this.enterpriseName) {
                formData.append('name', this.name);
            }
            formData.append('profile', this.profile);
            Enterprise.modifyEnterpriseInfo(this.enterpriseId, formData)
                .then((response) => {
                    console.log(response.data);
                    this.message.success('修改企业信息成功')
                    console.log(this.profile);
                    this.$router.go(-1)
                    // location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    this.message.error('修改企业信息失败')
                }
            )
        },
        handleFileChange(event) {
            if (event.target.files) {
                const file = event.target.files[0];
                if (file) {
                    this.uploadAvatar(file);
                }
            }
        },
        uploadAvatar(file) {
            const formData = new FormData();
            formData.append("avatar", file);
            Enterprise.modifyEnterpriseInfo(this.enterpriseId, formData)
                .then((response) => {
                    console.log(111);
                    this.message.success('上传企业头像成功')
                    this.avatar = response.data.avatar
                    this.$bus.emit('change-enterprise-avatar');
                    
                })
                .catch((error) => {
                    this.message.error('上传企业头像失败')
                    console.log(error);
                }
            )
        },
        activateInput() {
            this.$refs.fileInput.click();
        },
        goBack() {
            this.message.info('已取消')
            this.$router.go(-1)
        }
    },
    mounted() {
        if(this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id
            Enterprise.getEnterpriseInfo(id).then(
                response => {
                    this.name = response.data.name
                    this.profile = response.data.profile
                    this.avatar = response.data.avatar.slice(response.data.avatar.indexOf('/api'))
                },
                error => {
                    console.log(error.message)
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
    width: 70%;
    min-width: 750px;
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