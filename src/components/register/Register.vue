<template>
  <div class="register">
    <h1>注册</h1>
    <div class="register-item">
      <div class="register-item-title">用户名</div>
      <input v-model="registerInfo.username" />
    </div>

    <div class="register-item">
      <div class="register-item-title">邮箱</div>
      <input v-model="registerInfo.email" />
    </div>

    <div class="register-item">
      <div class="register-item-title">密码</div>
      <input v-model="registerInfo.password" />
    </div>

    <div class="register-item">
      <div class="register-item-title">确认密码</div>
      <input v-model="registerInfo.password_confirm" />
    </div>

    <div>
      <button @click="register">注册</button>
    </div>
  </div>
</template>

<script>
import { Account } from "@/api/Account";
export default {
  name: "Register",
  data() {
    return {
      registerInfo: {
        username: "string",
        email: "user@example.com",
        password: "stringst",
        password_confirm: "string",
      },
    };
  },
  created() { },
  methods: {
    register() {
      const registerInfo = {
        username: this.registerInfo.username,
        email: this.registerInfo.email,
        password: this.registerInfo.password,
        password_confirm: this.registerInfo.password_confirm,
      };
      // check any empty fields
      for (const key in registerInfo) {
        if (registerInfo[key] === "") {
          // console.error("Empty field:", key);
          message.error('Empty field:', key);
          return;
        }
      }
      
      // check if the email is valid
      if (!registerInfo.email.includes("@")) {
        message.error('Invalid email');
        return;
      }
      // check if the password is the same
      if (registerInfo.password !== registerInfo.password_confirm) {
        message.error('Passwords do not match');
        return;
      }
      console.log("Sending register info:", registerInfo);

      Account.accounts_register(registerInfo)
        .then((res) => {
          console.log("Register response:", res);
        })
        .catch((err) => {
          if (err.response) {
            // 服务器返回了响应
            console.error("Register error response:", err.response.data);
          } else {
            // 其他错误
            console.error("Register error:", err.message);
            message.error('Register error:', err.message);
          }
        });
    },
  },
};
</script>

<style scoped>
.register-item {
  display: flex;
  margin-bottom: 10px;
}

.register-item-title {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
</style>