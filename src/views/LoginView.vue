<template>
  <div class="login-centered">
    <div class="login-container float-box">
      <section>
        <h3>登录：让职业旅程继续</h3>
      </section>

      <section>
        <div class="login-item-title">邮箱</div>
        <input v-model="loginInfo.email" />
      </section>      

      <section>
        <div class="login-item-title">密码</div>
        <input type="password" v-model="loginInfo.password" @keydown.enter="login" />
      </section>

      <span class="hint">
        尚未拥有账号？<a @click="jumpToRegister">前往注册</a>
      </span>
      <section>
        <button @click="login">登录</button>
      </section>

    </div>
  </div>
</template>

<script>
import { Account } from "@/api/Account";
import MessageWebSocket from "@/api/MessageWebSocket";
import { useMessage } from 'naive-ui';


export default {
  name: "LoginView",
  data() {
    return {
      loginInfo: {
        email: "",
        password: "",
      },
      message: useMessage(),
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
    jumpToRegister() {
      this.$router.push('/register')
    },
    login() {
      if(this.loginInfo.email === '') {
        this.message.error('请输入邮箱！')
        return
      }
      if(this.loginInfo.password === '') {
        this.message.error('请输入密码！')
        return
      }
      const loginForm = {
        email: this.loginInfo.email,
        password: this.loginInfo.password,
      };
      console.log(this.loginForm);
      Account.accounts_login(loginForm)
        .then((res) => {
          console.log(res);
          this.message.success('登录成功')
          this.loginRes = res.data;
          this.$cookies.set("user_id", this.loginRes.id);
          this.$bus.emit('already-login')
          this.$router.push("/main");
          MessageWebSocket.connect(this.loginRes.id)
        })
        .catch((err) => {
          console.log(err);
          this.message.error('登录失败，请检查邮箱与密码！')
        });
    },
  },
};
</script>

<style scoped>
div.login-centered {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

div.login-container {
    width: 500px;
    height: 300px;
    border-radius: 10px;
    background: var(--bg-like);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

section {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

section:first-child {
    margin-top: 15px;
    justify-content: center;
}

section:nth-of-type(3) {
  margin-bottom: 5px;
}

section:last-of-type {
    justify-content: center;
}

section>div {
    font-weight: bold;
    width: 75px;
    text-align: right;
    font-size: 16px;
}

h3 {
    font-size: 30px;
    font-weight: bold;
    color: var(--theme-color);
}

span.hint {
  width: 70%;
  display: flex;
  justify-content: flex-end;
}

span.hint a {
  color: var(--theme-color);
  cursor: pointer;
}

span.hint a:hover {
  text-decoration: underline;
}

</style>