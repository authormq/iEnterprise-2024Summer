<template>
    <div class="recruitment-detail-box">
        <n-flex vertical justify="flex-start" :size="20">
            <div>
                <span class="title">{{ title }}</span>
            </div>
            <n-flex :size="50" align="center" justify="flex-start" class="top-row">
                <n-flex align="center" justify="space-between">
                    <span>地点</span>
                    <span>{{ location }}</span>
                </n-flex>
                <n-flex align="center" justify="space-between">
                    <span>工作时间</span>
                    <span>{{ time }}</span>
                </n-flex>
                <n-flex align="center" justify="space-between">
                    <span>学历要求</span>
                    <span>{{ education }}</span>
                </n-flex>
            </n-flex>

            <n-flex vertical align="left" justify="flex-start" >
                <span class="description">岗位介绍</span>
                <pre>{{ description }}</pre>
            </n-flex>
        </n-flex>
    </div>
</template>

<script>
import { NFlex } from 'naive-ui';
export default {
    name: "RecruitmentDetailBox",
    components: { NFlex },
    props: {
        title: {}, location: {}, time: {}, education: {}, description: {}
    }
}
</script>

<style scoped>
.title {
    font-weight: 700;
    font-size: 20px;
}

.recruitment-detail-box {
    /* background: var(--bg-color); */
    width: 70%;
    padding: 20px;
    border-radius: 10px;
    /* height: 500px; */
    /* overflow: auto; */
    /* scroll-behavior: 0; */
}

/* .recruitment-detail-box::-webkit-scrollbar {
    display: none;
} */

.description{
    font-weight: 700;
    font-size: 20px;
}

pre {
    width: 100%;
    word-break: break-all;
    white-space: pre-wrap;
    line-height: 2em;
    padding-left: 10px;
    font-size: 16px;
}
</style>