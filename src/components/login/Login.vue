<template>
  <div class="login">
    <h1>登录</h1>
    <div class="login-item">
      <div class="login-item-title">邮箱</div>
      <input v-model="loginInfo.email" @keydown.enter="login"/>
    </div>
    <div class="login-item">
      <div class="login-item-title">密码</div>
      <input v-model="loginInfo.password"  />
    </div>
    <div>
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import { Account } from "@/api/Account";
export default {
  name: "Login",
  data() {
    return {
      loginInfo: {
        email: "user@example.com",
        password: "string",
      },

      loginRes: {
        id: 1,
        username: "KaQyn",
        email: "3140573900@qq.com",
        real_name: "",
        degree: "",
        websites: [],
        interests: [],
        resume: "/api/media/resume/%E4%B8%AA%E4%BA%BA%E7%AE%80%E5%8E%86.pdf",
        enterprise: null,
        identity: "",
        seniority: "",
        post: " ",
      },
    };
  },
  created() {},
  methods: {
    login() {
      // alert(232)
      const loginForm = {
        email: this.loginInfo.email,
        password: this.loginInfo.password,
      };
      console.log(this.loginForm);
      Account.accounts_login(loginForm)
        .then((res) => {
          console.log(res);
          this.loginRes = res.data;
          // set user id to cookie
          this.$cookies.set("user_id", this.loginRes.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.login-item {
  display: flex;
  margin-bottom: 10px;
}
.login-item-title {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
</style>