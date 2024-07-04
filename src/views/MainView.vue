<template>
  <n-flex align="flex-start" justify="flex-start" class="main-view-container" :size=30 :wrap="false">
    <n-flex vertical align="flex-start" justify="flex-start" :size="20" class="left">
      <div class="recruitment-recommend">
        <recruit-recommend-list />
      </div>
      <!-- <n-flex vertical align="flex-start" :size="20" class="user-and-enterprise-recommend"> -->
        <div class="lower">
          <enterprise-recommend-list />
          <br>
          <user-recommend-list />
        </div>
      <!-- </n-flex> -->
    </n-flex>
    
    <div class="right">
      <h2>
        精彩动态
      </h2> 
      <div class="float-box">
        <moment-recommend-list></moment-recommend-list>
      </div>
    </div>
    
  </n-flex>
  <div></div>
</template>

<script>
import { NFlex } from 'naive-ui';

import EnterpriseRecommendList from '@/components/recommend/enterpriseRecommend/EnterpriseRecommendList.vue';
import UserRecommendList from '@/components/recommend/userRecommand/UserRecommendList.vue';
import RecruitRecommendList from '@/components/recommend/recruitRecommend/RecruitRecommendList.vue';
import MomentRecommendList from '@/components/recommend/momentRecommend/MomentRecommendList.vue';

export default {
  name: 'MainView',
  components: {
    NFlex,
    RecruitRecommendList,
    EnterpriseRecommendList,
    UserRecommendList,
    MomentRecommendList
  }
}
</script>

<style scoped>
.main-view-container {
  height: 100%;
  width: 100%;
  gap: 0 !important;
}

.left {
  max-width: 800px;
  padding: 15px 0;
  padding-top: 0;
  box-sizing: border-box;
  height: 95%;
  /* background: var(--bg-color); */
  /* background: yellow; */
  border-radius: 10px;
  overflow-y: auto;
  scrollbar-width: none;
}

.left::-webkit-scrollbar {
  display: none;
}

.right {
  /* width: 40%; */
  flex: 1;
  height: 95%;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 0;
  margin-right: 20px;
}

.right>div {
  background: var(--bg-like);
  border-radius: 10px;
  padding: 5px 20px;
  height: 92%;
  overflow-y: auto;
  scrollbar-width: 0;
}

.right>div::-webkit-scrollbar {
  display: none;
}

.right h2 {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}

div.lower {
  margin-left: 10px;
}
</style>