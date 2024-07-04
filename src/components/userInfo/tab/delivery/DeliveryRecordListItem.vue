<template>
    <div class="record-container float-box" @click="openLink">
        <div class="record-enterprise">
            {{ delivery.recruitment.enterprise_name }}
        </div>
        <div class="record-position">
            申请岗位：{{ delivery.recruitment.title }}
        </div>
        <div class="record-time">
            申请时间：{{ delivery.apply_time }}
        </div>
        <!-- <div class="record-link">
            <a :href="delivery.resume">上传的简历</a>
        </div> -->
    </div>
</template>

<script>
export default {
    name: "DeliveryRecordListItem",
    data() {
        return {
            // userAvatar: `/api/users/${this.userId}/avatar/`
        }
    },
    props: {
        delivery: {
            type: Object,
            default: null
        },
    },
    mounted() {
        // console.log(this.delivery)
    },
    methods: {
        openLink() {
            window.open(this.delivery.resume, '_blank');
        }
    }


}
</script>

<style scoped>
.record-container {
    margin: 0 5px;
    border-radius: 10px;
    margin-bottom: 18px;
    box-sizing: border-box;
    padding: 10px 20px;
    cursor: pointer;
}

.record-enterprise {
    font-size: 18px;
    font-weight: bold;
}

</style>