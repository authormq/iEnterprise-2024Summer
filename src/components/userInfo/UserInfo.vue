<template>
    <div class="info float-box vertical-box">
        <div class="avatar">
            <img :src="userInfo.avatar" class="avatar-image" />
        </div>
        <div class="text-info">
            <div class="info-item username">{{ userInfo.userName }}</div>
            <div class="info-item" v-if="isMyPage">真实姓名：{{ userInfo.realName }}</div>
            <div class="info-item">邮箱：{{ userInfo.email }}</div>
            <div class="info-item">学历：{{ userInfo.degree }}</div>
            <div class="info-item">用户身份：{{ userInfo.identity }}</div>
            <div class="info-item">
                个人网站：
                <div class="website">
                    <a v-for="(item, index) in userInfo.websites" class="info-item-website" :key="index"
                        @click.prevent="jumpToWebsite(item)">{{ item }}
                    </a>
                </div>
            </div>

            <div class="info-item uploader" v-if="isMyPage">
                个人简历：
                <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
                <a v-if="this.userInfo.resume === null" @click.prevent="activateInput">未上传</a>
                <span v-else>
                    <a :href="this.userInfo.resume" target="_blank" style="margin-right: 10px">已上传</a>
                    <a @click.prevent="activateInput">重新上传</a>
                </span>
            </div>
            <!-- 修改个人信息按钮：定位实现 -->
            <svg t="1719301642760" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4294"
                width="30" height="30" @click="editUserInfo" v-if="isMyPage">
                <path
                    d="M358.165868 554.624796c-0.533143 0.680499-1.066285 1.391696-1.303692 2.251274l-41.104163 150.700257c-2.400676 8.772804 0.059352 18.226107 6.550183 24.892947 4.860704 4.742001 11.261485 7.350408 18.077727 7.350408 2.252297 0 4.504594-0.267083 6.727215-0.860601l149.630902-40.808428c0.23843 0 0.357134 0.207731 0.534166 0.207731 1.718131 0 3.408633-0.62217 4.683672-1.927909l400.113747-400.054395c11.883655-11.897981 18.404162-28.109198 18.404162-45.74281 0-19.989263-8.476045-39.963177-23.324218-54.767348l-37.786605-37.844933c-14.81645-14.848173-34.822087-23.338544-54.797024-23.338544-17.631566 0-33.842783 6.520507-45.75816 18.388812L358.758362 553.232077C358.344946 553.615816 358.462626 554.179658 358.165868 554.624796M862.924953 257.19778l-39.742143 39.71349-64.428382-65.451688 39.180348-39.179324c6.193049-6.222725 18.194384-5.318122 25.308409 1.822508l37.813211 37.845956c3.943822 3.941775 6.195096 9.18622 6.195096 14.372336C867.223862 250.574942 865.710392 254.42769 862.924953 257.19778M429.322487 560.907896l288.712541-288.728914 64.459081 65.49569L494.314711 625.838721 429.322487 560.907896zM376.718409 677.970032l20.863167-76.580143 55.656601 55.657624L376.718409 677.970032z"
                    p-id="4295"></path>
                <path
                    d="M888.265084 415.735539c-15.144932 0-27.562752 12.313443-27.620058 27.665083l0 372.98283c0 19.559475-15.885805 35.444257-35.475979 35.444257L194.220958 851.827709c-19.559475 0-35.504632-15.883759-35.504632-35.444257L158.716326 207.602222c0-19.575848 15.945157-35.474956 35.504632-35.474956l406.367171 0c15.231913 0 27.592428-12.371772 27.592428-27.606755 0-15.202237-12.360516-27.590382-27.592428-27.590382L190.013123 116.930129c-47.684022 0-86.49291 38.779212-86.49291 86.49291L103.520213 820.59231c0 47.713698 38.808888 86.47756 86.49291 86.47756l639.334083 0c47.715745 0 86.509283-38.763862 86.509283-86.47756L915.856489 443.222567C915.794068 428.048983 903.408993 415.735539 888.265084 415.735539"
                    p-id="4296"></path>
            </svg>

            <div class="info-item">兴趣标签：</div>
            <div class="label-list">
                <div class="info-item label" v-for="(interest, index) in userInfo.interests" :key="interest">
                    <n-tag closable @close="handleClose(index)" v-if="isMyPage">{{ interest.name }}</n-tag>
                    <n-tag @close="handleClose(index)" v-else>{{ interest.name }}</n-tag>
                </div>
            </div>
            <n-dropdown :options="labelList" placement="bottom-start" trigger="click" @select="handleSelect"
                v-if="isMyPage">
                <button>+</button>
            </n-dropdown>
            <br>
            <button v-if="!isMyPage" @click="chatWithUser">去聊天</button>
            &nbsp;
            <button v-if="!isMyPage && !isFollowed" @click="handleFollow">关注</button>
            <n-popconfirm :show-icon="false" v-if="!isMyPage && isFollowed" @positive-click="handleUnfollow"
                positive-text="确定" negative-text="取消">
                <template #trigger>
                    <button>取关</button>
                </template>
                是否取消关注？
            </n-popconfirm>
        </div>
    </div>
</template>

<script>
import { User } from "@/api/User";
import { NCascader, NDropdown, NSpace, NTag, useMessage, NPopconfirm } from "naive-ui";
import Conversation from '@/api/Conversation';

export default {
    name: "UserInfo",
    props: {
        labelList: {
            type: Object,
            required: true,
        },
        userID: 1,
        isMyPage: {
            type: Boolean,
            default: true,
        },
    },
    watch: {
        userID: {
            handler: function (newVal, oldVal) {
                this.userInfo.id = newVal;
                this.getUserInfo(newVal);
            },
            //   immediate: true,
        },
    },
    components: { NDropdown, NTag, NSpace, NCascader, Conversation, NPopconfirm },
    data() {
        return {
            showAdd: false,
            message: useMessage(),
            fileList: [
                {
                    id: "",
                    name: "",
                    status: "",
                },
            ],
            userInfo: {
                avatar: '',
                id: 1,
                userName: "",
                email: "",
                realName: "",
                degree: "",
                websites: [],
                interests: [],
                resume: "",
                identity: "",
            },
            options: [],
            isFollowed: false,
        };
    },
    mounted() {
        this.userInfo.id = this.userID
        this.$bus.on('change-avatar', () => {
            this.userInfo.avatar = "/api/users/" + this.userInfo.id + "/avatar?key=" + Date.now();
        })
        this.getUserInfo(this.userID)
    },
    computed: {

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
        getUserInfo(id) {
            User.getUser(id)
                .then((res) => {
                    this.userInfo.userName = res.data.username;
                    if (res.data.real_name === "") this.userInfo.realName = "暂未填写";
                    else this.userInfo.realName = res.data.real_name;
                    if (res.data.email === "") this.userInfo.email = "暂未填写";
                    else this.userInfo.email = res.data.email;
                    if (res.data.degree === "") this.userInfo.degree = "暂未填写";
                    else this.userInfo.degree = res.data.degree;
                    if (res.data.identity === "") this.userInfo.identity = "无业游民";
                    else this.userInfo.identity = res.data.identity;
                    this.userInfo.resume = res.data.resume;
                    if (res.data.websites.length === 0)
                        this.userInfo.websites = "暂未填写";
                    else this.userInfo.websites = res.data.websites;
                    // this.userInfo.websites = res.data.websites;
                    this.userInfo.interests = res.data.interests;
                    this.userInfo.avatar =
                        "/api/users/" +
                        this.userInfo.id +
                        "/avatar/";
                    this.isFollowed = res.data.is_followed;

                })
                .catch((err) => {
                    console.log(err);
                });
        },
        editUserInfo() {
            this.$emit("isEditing", this.userInfo, true);
        },
        uploadResume(file) {
            // User.patchUser(file).then()
            const formData = new FormData();
            formData.append("resume", file);
            User.patchUser(this.userInfo.id, formData)
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
        handleSelect(key, option) {
            this.showAdd = false;
            if (this.userInfo.interests.length === 5) {
                // alert("最多添加5个标签！");
                return;
            }
            for (let i = 0; i < this.userInfo.interests.length; i++) {
                if (this.userInfo.interests[i].id === option.key) {
                    this.message.error('不能重复添加一种岗位！');
                    return;
                }
            }
            this.userInfo.interests.push({
                name: option.label,
                id: option.key,
            });
            const data = {
                interests: this.userInfo.interests,
            };
            User.patchUser(this.userInfo.id, data)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleClose(index) {
            if (this.userInfo.interests.length <= 1) {
                this.message.error('兴趣标签不能为空')
                return
            }
            this.userInfo.interests.splice(index, 1);
            const data = {
                interests: this.userInfo.interests,
            };
            User.patchUser(this.userInfo.id, data)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    // console.log(data);
                });
        },
        jumpToWebsite(web) {
            // alert(web);
            const url = web.startsWith('http') ? web : 'http://' + web;
            window.open(url, '_blank');
        },
        chatWithUser() {
            if (!this.$cookies.get('user_id')) {
                this.$router.push('/login')
                return
            }
            Conversation.getConversationWithUser(this.userInfo.id).then(
                (response) => {
                    console.log(response);
                    this.$router.push('/chat/' + response.data.id);
                },
                (error) => {
                    console.log(error.message);
                }
            )
        },
        handleFollow() {
            if (!this.$cookies.get('user_id')) {
                this.$router.push('/login')
                return
            }
            User.followUser({ user_id: this.userInfo.id })
                .then((res) => {
                    this.isFollowed = true;
                    this.message.success('关注成功');
                })
                .catch((err) => {
                    this.message.error('关注失败');
                }
                );
        },
        handleUnfollow() {
            User.unfollowUser({ user_id: this.userInfo.id })
                .then((res) => {
                    this.isFollowed = false;
                    this.message.success('取关成功');
                })
                .catch((err) => {
                    this.message.error('取关失败');
                }
                );
        },
    },
};
</script>

<style scoped>
.avatar {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.info {
    width: 25%;
    height: 600px;
    margin: 0 20px;
    border-radius: 10px;
    background: var(--bg-like);
    overflow-y: auto;
    scrollbar-width: 0;
}

.info::-webkit-scrollbar {
    display: none;
}

.info-button {
    width: 110px;
    margin: auto;
    justify-self: center;
}

div.text-info {
    width: 100%;
    box-sizing: border-box;
    padding: 0 60px;
    position: relative;
}

.info-item {
    white-space: nowrap;
    font-size: 16px;
    margin-bottom: 10px;
}

.info-item-website {
    margin-right: 10px;
    cursor: pointer;
    margin-top: 10px;
}

.website {
    display: flex;
    flex-wrap: wrap;
}

.website a:hover {
    text-decoration: underline;
    color: var(--theme-color);
}

.info-item.username {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
}

.info-item.uploader a {
    cursor: pointer;
    transition: none;
}

.info-item.uploader a:hover {
    text-decoration: underline;
    color: var(--theme-color);
}

div.text-info svg {
    position: absolute;
    top: 100%;
    right: 60px;
    cursor: pointer;
    fill: var(--font-color);
}

.avatar-image {
    border-radius: 50%;
    width: 200px;
    height: 200px;
}

.upload {
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
}

.upload-container {
    display: flex;
    white-space: nowrap;
}

.upload-button {
    /* border: unset !important; */
    margin-left: 20px;
}

.label {
    margin-right: 10px;
}

.label-list {
    display: flex;
    flex-wrap: wrap;
}
</style>