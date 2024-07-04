<template>
    <div class="editor-centered">
        <div class="editor-container">
            <h2>新建动态</h2>
            <!-- 上面是大标题 -->
            <div class="title-wrapper">
                <span class="title">动态标题</span><input type="text" v-model="this.title">
            </div>
            
            <markdown-editor v-model="this.content" :value="this.content"></markdown-editor>
            <div class="button-wrapper">
                <button @click="cancel">取消</button>
                <button @click="createMoment">发布</button>
            </div>
        </div>
    </div>
</template>

<script>
import MarkdownEditor from '@/components/userInfo/tab/moment/markdown/MarkdownEditor.vue'
import Moment from '@/api/Moment'
import { useMessage } from 'naive-ui'
export default {
    name: 'CreateMomentView',
    components: {
        MarkdownEditor
    },
    data() {
        return {
            title: '',
            content: '',
            file: '',
            message: useMessage()
        }
    },
    methods: {
        cancel() {
            this.$router.go(-1)
            this.message.info('已取消')
        },
        createMoment() {
            let formData = new FormData()
            formData.append("title", this.title)
            formData.append("content", this.content)
            Moment.createMoment(formData).then(
                (response) => {
                    console.log("Successful!");
                    this.message.info('成功创建动态');
                    // jump to moment page
                    this.$router.push({ path: `/moment/${response.data.id}` })
                },
                (error) => {
                    console.log(error.message)
                    this.message.info('创建动态失败');
                }
            )
        }
    }
}
</script>

<style scoped>
div.editor-centered {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.editor-container {
    width: 90%;
    height: 90%;
    box-sizing: border-box;
    padding: 0 20px;
    overflow-y: auto;
    overflow-x: visible;
    scrollbar-width: 0;
}

div.editor-container::-webkit-scrollbar {
    display: none;
}

h3 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
}
h2 {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 20px;
}
div.title-wrapper {
    margin-bottom: 25px;
}

span.title {
    font-size: 20px;
    font-weight: bold;
    margin-right: 20px;
}

div.button-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

div.button-wrapper button:first-of-type{
    margin-right: 20px;
}

div.button-wrapper button:last-of-type {
    margin-right: 2px;
}
</style>