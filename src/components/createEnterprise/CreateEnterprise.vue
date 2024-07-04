<template>
    <div class="create-centered">
        <div class="create-container float-box">
            <section>
                <h3>
                    创建企业
                </h3>
            </section>
            <section>
                <div>
                    企业名
                </div>
                <input v-model="enterpriseInfo.name">
            </section>
            <section>
                <div>
                    企业简介
                </div>
                <textarea v-model="enterpriseInfo.profile"></textarea>
            </section>
            <section>
                <button @click="CreateEnterprise">创建</button>
            </section>
        </div>
    </div>
    
</template>

<script>
// import { Account } from "@/api/account";
import Enterprise from "@/api/Enterprise";
export default {
    name: "CreateEnterprise",
    data() {
        return {
            enterpriseInfo: {
                name: '',
                profile: ''
            },
        };
    },
    created() { },
    methods: {
        CreateEnterprise() {
            Enterprise.createEnterprise(this.enterpriseInfo)
                .then((res) => {
                    console.log(res);
                    //jump to the enterprise page
                    this.$router.push({ path: "/enterprise/" + res.data.id });
                    // alert("创建成功");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
};
</script>

<style scoped>
div.create-centered {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.create-container {
    width: 600px;
    height: 350px;
    border-radius: 10px;
    background: var(--bg-like);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 20px;
}

h3 {
    font-size: 30px;
    font-weight: bold;
    color: var(--theme-color);
}

section {
    width: 80%;
    display: flex;
    /* justify-content: space-around; */
    align-items: center;
    margin-bottom: 20px;
}

section:first-child,
section:last-child {
    justify-content: center;
}

section>div {
    font-weight: bold;
    width: 75px;
    text-align: right;
    font-size: 16px;
}

section input,
section textarea {
    flex: 1;
    margin-left: 20px;
}
</style>