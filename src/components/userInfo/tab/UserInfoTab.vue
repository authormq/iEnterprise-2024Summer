<template>
  <div class="tabs-container float-box">
    <n-tabs v-model:value="activeTab">
      <n-tab-pane name="moment" tab="动态">
        <moment-list @delete-moment="handleDeleteMoment" :items="moments"></moment-list>
      </n-tab-pane>
      <n-tab-pane v-if="isMyPage" name="fan" tab="粉丝">
        <fan-list :items="fans"></fan-list>
      </n-tab-pane>
      <n-tab-pane v-if="isMyPage" name="followUser" tab="关注的用户">
        <follow-list :items="followUserList"></follow-list>
      </n-tab-pane>
      <n-tab-pane v-if="isMyPage" name="followEnterprise" tab="关注的企业">
        <enterprise-follow-list :items="followEnterpriseList"></enterprise-follow-list>
      </n-tab-pane>
      <n-tab-pane v-if="isMyPage" name="history" tab="历史投递">
        <delivery-record-list :items="deliveryRecordList"></delivery-record-list>
      </n-tab-pane>
      <n-tab-pane v-if="isMyPage" name="resume" tab="个人简历">
        <Resume></Resume>
      </n-tab-pane>

    </n-tabs>
  </div>
</template>

<script>
import { NTabs, NTabPane } from "naive-ui";
import MomentList from "./moment/MomentList.vue";
import FollowList from "./follow/FollowList.vue";
import EnterpriseFollowList from "./follow/EnterpriseFollowList.vue";
import DeliveryRecordList from "./delivery/DeliveryRecordList.vue";
import FanList from "./fan/FanList.vue";
import Resume from "../../resume/Resume.vue";
import { User } from "@/api/User";
import Enterprise from "@/api/Enterprise";
import Recruit from "@/api/Recruit";
export default {
  name: "UserInfoTab",
  components: { NTabs, NTabPane, MomentList, FollowList, EnterpriseFollowList, DeliveryRecordList, FanList, Resume },
  props: {
    // isMyPage,Default is true
    isMyPage: {
      type: Boolean,
      default: true,
    },
    userID: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      id: this.$cookies.get('user_id'),
      followUserList: null,
      followEnterpriseList: null,
      deliveryRecordList: null,
      fans: null,
      moments: null,
      activeTab: 'moment'
    }
  },
  watch: {
    userID: {
      handler: function (newVal, oldVal) {
        this.id = newVal;
        this.moments = null;
        this.getFollowList(newVal);
        this.getFanList(newVal);
        this.getMomentList(newVal);
        this.getEnterpriseFollowList();
        this.getDeliveryRecordList();
        this.activeTab = 'moment'
      },
      //   immediate: true,
    },
  },
  mounted() {
    // this.id = this.$cookies.get('user_id');
    this.getFollowList(this.userID);
    this.getFanList(this.userID);
    this.getMomentList(this.userID);
    this.getEnterpriseFollowList();
    this.getDeliveryRecordList();
  },

  methods: {
    getFanList(id) {
      //粉丝
      User.getUserFollow(id)
        .then((res) => {
          console.log(res);
          this.fans = res.data;
        })
        .catch((err) => {
          // alert(1)
          console.log(err);
        });
    },

    getFollowList(id) {
      //关注
      User.getUserFollowingUsers(id)
        .then((res) => {
          console.log(res);
          this.followUserList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getEnterpriseFollowList() {
      //关注的企业
      Enterprise.getFollowingEnterprises()
        .then((res) => {
          console.log(222, res);
          this.followEnterpriseList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDeliveryRecordList(id) {
      //历史投递记录
      Recruit.getHistoryRecruitments()
        .then((res) => {
          console.log(333, res);
          this.deliveryRecordList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMomentList(id) {
      User.getUserMoments(id)
        .then((res) => {
          console.log(res);
          this.moments = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleDeleteMoment(id) {
      // // alert("delete " + id)
      let index = this.moments.findIndex((moment) => moment.id === id);
      this.moments.splice(index, 1);
      console.log(this.moments)
    },

  },
};
</script>

<style scoped>
.tabs-container {
  height: 98%;
  border-radius: 10px;
}
</style>