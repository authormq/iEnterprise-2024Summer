<template>
    <div class="container" v-if="show">
        <div class="resume">
            <div class="pdf-container">
                <PdfObject :url="resumeUrl" :options="{ page: 2 }" class="resume-container" />
            </div>
            <!-- <iframe :src="resumeUrl" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe> -->
            <div class="info-item uploader">
                <span>
                    <a :href="resumeUrl" target="_blank" style="margin-right: 30px">已上传</a>
                    <a @click.prevent="activateInput">重新上传</a>
                </span>
            </div>
        </div>
        <div class="chat">
            <ChatGPT></ChatGPT>
        </div>
    </div>
    <div class="no-hint" v-else>
        暂无简历，<a @click.prevent="activateInput">去上传</a>
    </div>
    <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
</template>

<script>
import ChatGPT from "../chatgpt/ChatGPT.vue";
import { User } from "@/api/User";
import { useMessage } from "naive-ui";

export default {
    name: "Resume",
    data() {
        return {
            resumeUrl: '',
            // resumeUrl: 'https://www.baidu.com'
            userID: 0,
            message: useMessage(),
            show: false
        };
    },
    components: {
        ChatGPT,
    },
    mounted() {
        this.userID = this.$cookies.get('user_id');
        User.getUser(this.$cookies.get('user_id')).then(
            response => {
                if (response.data.resume !== null) {
                    this.show = true
                }
            }
        )
        this.resumeUrl = '/api/users/' + this.userID + '/resume/';
    },
    methods: {
        activateInput() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            if (event.target.files) {
                const file = event.target.files[0];
                if (file) {
                    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
                    if (file.size > maxSize) {
                        this.message.error('请上传小于10MB的文件！');
                        return;
                    }
                    if (file.type !== 'application/pdf') {
                        this.message.error('请上传PDF格式的文件！');
                        return;
                    }
                    // alert(file.name);
                    this.uploadResume(file);
                }
            }
        },
        uploadResume(file) {
            // User.patchUser(file).then()
            const formData = new FormData();
            formData.append("resume", file);
            User.patchUser(this.userID, formData)
                .then((res) => {
                    console.log(res);
                    this.message.success('上传成功');
                    location.reload();
                })
                .catch((err) => {
                    console.log(err);
                    this.message.error('上传失败');
                });
        },
    },
};
</script>

<style scoped>
.container {
    height: 100%;
    display: flex;
    justify-content: space-between;
}

.resume {
    /* flex: 2; */
    width: 450px;
    margin-right: 20px;
}

.chat {
    flex: 1;
    height: 100%;
    overflow: auto;
    scrollbar-width: 0;
}

.chat::-webkit-scrollbar {
    display: none;
}

.resume-container {
    height: 650px;
    width: 100%;
    border-radius: 10px;
}

.info-item {
    white-space: nowrap;
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 10px;
}

.info-item.uploader a {
    cursor: pointer;
    transition: none;
}

.info-item.uploader a:hover {
    text-decoration: underline;
    color: var(--theme-color);
}

.no-hint a {
    color: var(--theme-color);
    cursor: pointer;
}

.no-hint a:hover {
    text-decoration: underline;
}
</style>
