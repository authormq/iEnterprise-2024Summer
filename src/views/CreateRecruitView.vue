<template>
    <div class="create-recruit-centered">
        <div class="create-recruit-container">
            <section>
                <h3>发布招聘信息</h3>
            </section>
            <section>
                <div>招聘项目<sup>*</sup></div>
                <input type="text" v-model="this.title">
                <!-- <div v-if="this.noTitle">招聘项目信息未填写</div> -->
            </section>

            <section>
                <div>招聘岗位<sup>*</sup></div>
                <!-- <input type="text" v-model="this.position"> -->
                <div v-if="this.selectedTag" style="display: flex; justify-content: center; width: 500px">
                    <n-tag 
                        :style="{
                            'width': '500px',
                            'height': '40px'
                        }"
                        closable @close="handleClose">{{ this.selectedTag.name }}</n-tag>
                </div>
                <n-dropdown v-if="!this.selectedTag" :options="labelList" placement="bottom-start" trigger="click" @select="handleSelect">
                    <button style="width: 500px">+</button>
                </n-dropdown>
                <!-- <div v-if="this.noPosition">招聘岗位信息未填写</div> -->
            </section>

            <section>
                <div>薪资待遇<sup>*</sup></div>
                <!-- v-model -->
                <input type="text" v-model="this.salary">
                <!-- <div v-if="this.noSalary">薪资待遇信息未填写</div> -->
            </section>

            <section>
                <div>工作地点<sup>*</sup></div>
                <!-- v-model -->
                <input type="text" v-model="this.location">
                <!-- <div v-if="this.noLocation">工作地点信息未填写</div> -->
            </section>

            <section>
                <div>工作时长<sup>*</sup></div>
                <!-- v-model -->
                <input type="text" v-model="this.timeLimit">
                <!-- <div v-if="this.noTimeLimit">工作时长信息未填写</div> -->
            </section>

            <section>
                <div>学历要求<sup>*</sup></div>
                <!-- v-model -->
                <input type="text" v-model="this.education">
                <!-- <div v-if="this.noEducation">学历要求信息未填写</div> -->
            </section>

            <section>
                <div>招聘简介<sup>*</sup></div>
                <textarea v-model="this.profile"></textarea>
                <!-- <div v-if="this.noProfile">招聘简介信息未填写</div> -->
            </section>
            
            <section>
                <div>招聘人数<sup>*</sup></div>
                <input type="number" v-model="this.quota">
                <!-- <div v-if="this.noQuota">招聘人数信息未填写</div> -->
            </section>
            
            <section>
                <button @click="cancel">取消</button>
                <button @click="submitCreaterRecruit">确认</button>
            </section>
        </div>
    </div>
</template>
<script>
import Recruit from '@/api/Recruit';
import { NCascader, NDropdown, NSpace, NTag, useMessage } from "naive-ui";
export default {
    name: 'CreateRecruitView',
    components: { NDropdown, NTag, NSpace, NCascader },
    data() {
        return {
            enterpriseId: '',
            title: '',
            profile: '',
            requirement: '',
            quota: null,
            salary: '',
            location: '',
            timeLimit: '',
            education: '',
            labelList: [],
            selectedTag: null,
            noTitle: false,
            noPosition: false,
            noProfile: false,
            noSalary: false,
            noQuota: false,
            noTimeLimit: false,
            noEducation: false,
            noLocation: false,
            message: useMessage()
        }
    },
    mounted() {
        if(this.$route.params && this.$route.params.id) {
            this.enterpriseId = this.$route.params.id
        }
        this.getRecruitTags()
    },
    methods: {
        verifyInfoFull() {
            let fullTag = true
            if (this.quota === null || this.quota <= 0) {
                this.noQuota = true
                this.message.error('招聘人数信息未填写！')
                fullTag = false
            }
            if (this.title.trim() === '') {
                this.noTitle = true
                this.message.error('招聘项目信息未填写！')
                fullTag = false
            }
            if (this.profile.trim() === '') {
                this.noProfile = true
                this.message.error('招聘简介信息未填写！')
                fullTag = false
            }
            if (this.selectedTag === null) {
                this.noPosition = true
                this.message.error('招聘岗位信息未填写！')
                fullTag = false
            }
            if (this.salary.trim() === '') {
                this.noSalary = true
                this.message.error('薪资待遇信息未填写！')
                fullTag = false
            }
            if (this.location.trim() === '') {
                this.noLocation = true
                this.message.error('工作地点信息未填写！')
                fullTag = false
            }
            if (this.timeLimit.trim() === '') {
                this.noTimeLimit = true
                this.message.error('工作时长信息未填写！')
                fullTag = false
            }
            if (this.education.trim() === '') {
                this.noEducation = true
                this.message.error('学历要求信息未填写！')
                fullTag = false
            }
            return fullTag
        },
        submitCreaterRecruit() {
            if (!this.verifyInfoFull()) {
                console.log('信息不完全');
                return 
            }
            let formData = new FormData()
            formData.append("num", this.quota)
            formData.append("title", this.title)
            formData.append("position", this.selectedTag.id)
            formData.append("location", this.location)
            formData.append("time", this.timeLimit)
            formData.append("education", this.education)
            formData.append("description", this.profile)
            formData.append("salary", this.salary)
            Recruit.createRecruitment(this.enterpriseId, formData).then(
                (response) => {
                    console.log(response.data);
                    this.message.success('创建岗位成功')
                    this.$router.push('/enterprise/recruit/detail/' + response.data.id)
                },
                (error) => {
                    console.log(error.message);
                    this.message.error('创建岗位失败')
                }
            )
        },
        cancel() {
            this.message.info('已取消')
            this.$router.go(-1)
        },
        getRecruitTags() {
            Recruit.getFirstRecruitList().then(res => {
                // for each first tag, get second tag
                res.data.forEach(element => {
                    let ele = {
                        key: element.id,
                        label: element.name,
                        children: []
                    };
                    // ele.second = this.getSecondRecruit(element.id)
                    Recruit.getSecondRecruitList(element.id).then(res => {
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
                    this.labelList.push(ele);
                });
            }).catch(err => {
                console.log(err)
            })
            console.log(this.labelList);
        },
        handleSelect(key, option) {
            this.selectedTag = {
                name: option.label,
                id: option.key,
            };
        },
        handleClose() {
            this.selectedTag = null
        }
    } 
}
</script>

<style scoped>
div.create-recruit-centered {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.create-recruit-container {
    width: 750px;
    height: 700px;
    border-radius: 10px;
    background: var(--bg-like);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow-y: auto;
    scrollbar-width: 0;
}

div.create-recruit-container::-webkit-scrollbar {
    display: none;
}

section {
    width: 80%;
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
}

h3 {
    font-size: 30px;
    font-weight: bold;
} 

input, textarea {
    width: 500px;
}

sup {
    color: var(--theme-color);
}
</style>