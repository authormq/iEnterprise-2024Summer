<template>
    <div class="edit-container">
        <div class="wrapper">
            <section>
                <h3>
                    编辑个人信息
                </h3>
            </section>
            <section>
                <div>头像</div>
                <img :src="userInfo.avatar" class="avatar-image" alt="User Avatar" />
                <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
                <button @click.prevent="activateInput">上传头像</button>
            </section>

            <section>
                <div>用户名</div>
                <input v-model="userInfo.userName">
            </section>
            <section>
                <div>真实姓名</div>
                <input v-model="userInfo.realName">
            </section>
            <section>
                <div>学历</div>
                <input v-model="userInfo.degree">
            </section>
            <section>
                <div>个人网站</div>
                <input v-model="userInfo.websites">
            </section>
            <section>
                <button @click="cancelEdit">取消</button>
                <button @click="commitEdit">确认</button>
            </section>
        </div>
    </div>
</template>

<script>
import { NTabs, NTabPane, useMessage } from "naive-ui";
import { User } from "@/api/User";

export default {
    name: "EditInfo",
    components: { NTabs, NTabPane },
    props: {
        userInfo: {
            type: Object,
            required: true
        }
    },
    // setup() {
    //     const message = useMessage()
    //     return { message }
    // },
    data() {
        return {
            message: useMessage(),
            id: 1,

        }
    },
    mounted() {

    },

    methods: {
        cancelEdit() {
            this.$emit('cancelEdit', false);
        },
        commitEdit() {
            const id = this.userInfo.id;
            // console.log(this.userInfo.websites)
            let arr = [];
            if (this.userInfo.websites instanceof Array) {
                arr = this.userInfo.websites;

            }
            else {
                arr = this.userInfo.websites.split(',').map(item => item.trim());
                console.log(typeof arr)
            }
            const data = {
                username: this.userInfo.userName,
                real_name: this.userInfo.realName,
                degree: this.userInfo.degree,
                websites: arr,
            }
            // let check = true
            //检查所有的必填值是否都不为空
            if (data.username.length === 0) {
                this.message.error('未填写用户名')
                return
            }
            if (data.real_name.length === 0) {
                this.message.error('未填写真实姓名')
                return
            }
            if (data.degree.length === 0) {
                this.message.error('未填写学历')
                return
            }
            User.updateUser(id, data).then((res) => {
                console.log(res);
                location.reload();
            }).catch((err) => {
                console.log(err);
                console.log(data);
            });

        },
        activateInput() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            if (event.target.files) {
                const file = event.target.files[0];
                if (file) {
                    // // alert(file.name);
                    this.uploadAvatar(file);
                }
            }
        },
        uploadAvatar(file) {
            // User.patchUser(file).then()
            const formData = new FormData();
            formData.append("avatar", file);
            User.patchUser(this.userInfo.id, formData)
                .then((res) => {
                    console.log(111);
                    console.log(res);
                    this.userInfo.avatar = '';
                    this.userInfo.avatar = "/api/users/" +
                        this.userInfo.id +
                        "/avatar?key=" + Date.now();
                    this.$bus.emit('change-avatar');
                    // location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped>
.edit-container {
    width: 70%;
    height: 600px;
    margin: 0 20px;
    background: yellow;
    border-radius: 10px;
    background: var(--bg-like);
    display: flex;
    justify-content: center;
}

.wrapper {
    width: 50%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.avatar-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

section {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

section:first-child {
    margin-top: 15px;
    justify-content: center;
}

section:last-child {
    justify-content: space-around;
}

section>div {
    font-weight: bold;
    width: 75px;
    text-align: right;
    font-size: 16px;
}

h3 {
    font-size: 24px;
    font-weight: bold;
    color: var(--theme-color);
}
</style>