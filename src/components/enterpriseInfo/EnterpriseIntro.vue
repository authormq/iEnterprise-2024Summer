<template>
  <div class="intro-container float-box">
    <div class="intro">企业简介</div>
    <p class="intro-content">{{ enterpriseIntro }}</p>
    <div class="intro">招聘岗位</div>
    <div class="recruit">
      <template v-if="recruitmentList.length > 0">
        <recruit-recommend-list-item v-for="item in recruitmentList"
          :key="item"
          :recruitment-id="item.id"
          :title="item.title"
          :enterprise-avatar="item.enterprise_avatar" :enterprise-id="item.enterprise"
          :enterprise-name="item.enterprise_name" :position="item.position" :salary="item.salary" 
          :workPlace="item.location" :workTime="item.time" :education="item.education"    
        />
      </template>
      <div class="no-hint" v-else>
        暂无招聘信息
      </div>
    </div>
  </div>
  
</template>

<script>
import Enterprise from '@/api/Enterprise'
import Recruit from '@/api/Recruit'

import RecruitRecommendListItem from '../recommend/recruitRecommend/RecruitRecommendListItem.vue'

export default {
  name: 'EnterpriseIntro',
  components: {
    RecruitRecommendListItem
  },
  data() {
    return {
      enterpriseIntro: '',
      recruitmentList: []
    }
  },
  watch: {
    '$route.params.id': {
      handler(newVal) {
        // const id = this.$route.params.id
        Enterprise.getEnterpriseInfo(newVal).then(
          (response) => {
            this.enterpriseIntro = response.data.profile
          },
          (error) => { 
            console.error(error)
          }
        )
        this.recruitmentList = Recruit.getRecruitments(newVal, "enterprise_id").then(
            (response) => {
                this.recruitmentList = response.data
            },
            (error) => {
                console.error(error)
            }
        )
      }
    }
  },
  mounted() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      Enterprise.getEnterpriseInfo(id).then(
        (response) => {
          this.enterpriseIntro = response.data.profile
        },
        (error) => { 
          console.error(error)
        }
      )
      this.recruitmentList = Recruit.getRecruitments(id, "enterprise_id").then(
          (response) => {
              this.recruitmentList = response.data
          },
          (error) => {
              console.error(error)
          }
      )
    }
  }
}
</script>

<style scoped>
.intro-container {
  width: 60%;
  height: 100%;
  border-radius: 10px;
  margin-right: 20px;
  box-sizing: border-box;
  padding: 15px 25px;
  overflow: auto;
  scrollbar-width: 0;
}

.intro-container::-webkit-scrollbar {
  display: none;
}

.intro {
  font-size: 24px;
  font-weight: bold;
  margin-left: 5px;
}

.intro-content {
  font-size: 16px;
  margin-bottom: 20px;
  margin-left: 5px;
}

.recruit {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>