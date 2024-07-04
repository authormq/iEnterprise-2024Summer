<template>
  <div class="enterprise">
    <div class="basic-info">
      <enterprise-info v-if="this.enterpriseId" />
      <!-- <modify-enterprise-info-view :enterpriseId="this.$route.params.id" ></modify-enterprise-info-view> -->
    </div>
    <div class="lower">
      <EnterpriseIntro v-if="this.enterpriseId" />
      <enterprise-tab v-if="this.enterpriseId" />
    </div>
    <!-- <create-recruit-view></create-recruit-view> -->
  </div>
</template>
<script>
import EnterpriseInfo from '@/components/enterpriseInfo/EnterpriseInfo.vue';
import EnterpriseTab from '@/components/enterpriseInfo/tab/EnterpriseTab.vue';
import EnterpriseIntro from '@/components/enterpriseInfo/EnterpriseIntro.vue';
import { User } from '@/api/User';
import { watch } from 'vue';
// import ModifyEnterpriseInfoView from './ModifyEnterpriseInfoView.vue';
export default {
  name: 'EnterpriseAdminView',
  components: {
    EnterpriseInfo,
    EnterpriseTab,
    EnterpriseIntro,
    // ModifyEnterpriseInfoView
  },
  data() {
    return {
      enterpriseId: this.$route.params.id
    }
  },
  created() {
      // 缺少了权限的判定。
    if (this.$route.params.id) {
      this.enterpriseId = this.$route.params.id
      return
    }
    //判断当前用户是否登录
    if (this.$cookies.get('user_id') === null) {
      this.jumpToLogin()
    }
    //判断当前用户有没有所属企业
    else if (!this.enterpriseId) {
      let userId = this.$cookies.get('user_id')
      User.getUser(userId).then((response) => {
        if (response.data.enterprise) {
          this.enterpriseId = response.data.enterprise.id
          this.jumpToEnterprise(this.enterpriseId)
        } else {
          this.jumpToCreateEnterprise()
        }
      })
    }
    },
    watch: {
      '$route.params.id': {
        handler(newVal) {
          console.log(this.$route.params.id);
          if (!newVal) {
            let userId = this.$cookies.get('user_id')
            User.getUser(userId).then((response) => {
              if (response.data.enterprise) {
                this.enterpriseId = response.data.enterprise.id
                this.jumpToEnterprise(this.enterpriseId)
              } else {
                this.jumpToCreateEnterprise()
              }
            })
          } else {
            this.enterpriseId = newVal
            this.jumpToEnterprise(this.enterpriseId)
          }
        }
    }
  },
  methods: {
    jumpToLogin() {
      this.$router.push('/login')
    },
    jumpToCreateEnterprise() {
      this.$router.push('/enterprise/create')
    },
    jumpToEnterprise(id) {
      this.$router.push('/enterprise/' + id + "/")
    }
  },
}
</script>
<style scoped>
div.enterprise {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin-left: 10px;
  /* padding: 20px 0; */
  overflow: auto;
  scrollbar-width: 0;
}

div.enterprise::-webkit-scrollbar {
  display: none;
}

div.basic-info {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

div.lower {
  display: flex;
  height: calc(100% - 150px);
  justify-content: space-between;
}
</style>