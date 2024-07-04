<template>
    <div class="user-container">
        <user-info :isMyPage="isMyPage" :userID="userID" @isEditing="editUserInfo" :labelList="firsts" />
        <user-info-tab :isMyPage="isMyPage" :userID="userID" v-if="isEditing === false" />
        <edit-info  :userInfo="userInfo" @cancelEdit="cancelEdit" v-else />
    </div>
</template>

<script>
import UserInfoTab from '@/components/userInfo/tab/UserInfoTab.vue'
import UserInfo from '../components/userInfo/UserInfo.vue'
import EditInfo from '../components/userInfo/EditInfo.vue'
import { User } from '@/api/User'
import Recruit from '@/api/Recruit'
import {NFloatButton, NIcon} from 'naive-ui'

export default {
    name: 'UserView',
    components: {
        UserInfo,
        UserInfoTab,
        EditInfo,
        NFloatButton,
        NIcon,
    },
    
    computed: {
        userID() {
            return this.$route.params.id ? this.$route.params.id:this.$cookies.get('user_id');
        }
    },
    data() {
        return {
            // is this page my page?
            isMyPage: true,
            isEditing: false,
            userInfo: {
                id: -1,
                avatar: "",
                userName: "",
                realName: "",
                degree: "",
                websites: [],
                interests: [],
                identity: ""
            },
            firsts: [],

        }
    },
    mounted() {
        this.getFirstRecruit();
        // console.log(555, this.$route.params.id)
        this.checkAuthority();
    },

    watch: {
        $route(to, from) {
            console.log(to)
            console.log(from)
            if (to.params) {
                console.log(to.params);
                // this.isMyPage = false;
                this.checkAuthority();
                this.userInfo.id = to.params.id;
            } else {
                // this.isMyPage = true;
                this.checkAuthority();
            }
        }
    },

    methods: {
        // get followers
        getUserFollow(id) {
            User.getUserFollow(id).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },

        // get avatar
        getUserAvatar(id) {
            User.getUserAvatar(id).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },

        // get following_users
        getUserFollowingUsers(id) {
            User.getUserFollowingUsers(id).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },


        // get moments (动态)
        getUserMoments(id) {
            User.getUserMoments(id).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },

        // followUser
        followUser(id) {
            User.followUser(id).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },

        // unfollowUser
        unfollowUser(id) {
            User.unfollowUser(id).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        editUserInfo(userInfo, isEditing) {
            this.userInfo.avatar = userInfo.avatar;
            this.userInfo.id = userInfo.id;
            this.userInfo.userName = userInfo.userName;
            if (userInfo.realName === "暂未填写") this.userInfo.realName = "";
            else this.userInfo.realName = userInfo.realName;
            if (userInfo.degree === "暂未填写") this.userInfo.degree = "";
            else this.userInfo.degree = userInfo.degree;
            if (userInfo.websites === "暂未填写") this.userInfo.websites = [];
            else this.userInfo.websites = userInfo.websites;
            if (userInfo.identity === "暂未填写") this.userInfo.identity = [];
            else this.userInfo.identity = userInfo.identity;
            this.userInfo.interests = userInfo.interests;
            console.log(this.userInfo)
            this.isEditing = true;
        },
        cancelEdit() {
            this.isEditing = false;
        },

        async getFirstRecruit() {
            // 获取一级标签和二级标签，并且写入assets文件夹里面Tags.json
            Recruit.getFirstRecruitList().then(res => {
                // console.log(res)
                // for each first tag, get second tag
                res.data.forEach(element => {
                    let ele = {
                        key: element.id,
                        label: element.name,
                        children: []
                    };
                    // ele.second = this.getSecondRecruit(element.id)
                    Recruit.getSecondRecruitList(element.id).then(res => {
                        // console.log(res)
                        res.data.forEach(second => {
                            let item = {
                                key: second.id,
                                label: second.name
                            };
                            ele.children.push(item);
                        });
                    }).catch(err => {
                        console.log(err)
                    })
                    this.firsts.push(ele);
                });
                console.log(111);
                console.log(this.firsts);
            }).catch(err => {
                console.log(err)
            })
        },

        checkAuthority() {
            let id = this.$route.params.id;
            let selfID = this.$cookies.get('user_id');
            if(id === undefined || id === selfID) this.isMyPage = true;
            else this.isMyPage = false;
        },

        onViewChange(){
            // 
        }
    }
}
</script>

<style scoped>
.user-container {
    height: 100%;
    display: flex;
    align-items: flex-start;
    /* position: relative; */
}
.add-moment {
    position: fixed;
    right: 50px;
    bottom: 50px;
}
</style>