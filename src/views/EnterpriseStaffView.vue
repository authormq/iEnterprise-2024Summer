<template>
  <div>
    <enterprise-info></enterprise-info>
    <enterprise-tab></enterprise-tab>
  </div>
</template>
<script>
import EnterpriseInfo from '@/components/enterpriseInfo/EnterpriseInfo.vue';
import EnterpriseTab from '@/components/enterpriseInfo/tab/EnterpriseTab.vue';
export default {
name: 'EnterpriseStaffView',
components: {
  EnterpriseInfo,
  EnterpriseTab
}

}
</script>
<style scoped>

</style>