<template>
  <div class="register-centered">
    <div class="register-container float-box">
      <section>
        <h3>注册：开启职业探索之旅</h3>
      </section>
      <section>
        <div>用户名</div>
        <input v-model="registerInfo.username" />
      </section>
      <section>
        <div>邮箱</div>
        <input v-model="registerInfo.email" />
      </section>

      <section>
        <div>密码</div>
        <input type="password" v-model="registerInfo.password" />
      </section>

      <section>
        <div>确认密码</div>
        <input type="password" v-model="registerInfo.password_confirm" />
      </section>

      <section>
        <div>真实姓名</div>
        <input v-model="registerInfo.real_name">
      </section>

      <section>
        <div>学历</div>
        <select v-model="registerInfo.degree">
          <option>小学</option>
          <option>初中</option>
          <option>中专</option>
          <option>高中</option>
          <option>大专</option>
          <option>本科</option>
          <option>硕士</option>
          <option>博士</option>
        </select>
      </section>
      <section>
        <div>兴趣标签</div>
        <div class="label-list">
          <div class="info-item label" v-for="(interest, index) in registerInfo.interests" :key="interest">
            <n-tag closable @close="handleClose(index)">{{ interest.name }}</n-tag>&nbsp;&nbsp;
          </div>
          <n-dropdown :options="totalInterests" placement="bottom-start" trigger="click" @select="handleSelect">
            <button class="plus" :class="{'full': registerInfo.interests.length === 0}">+</button>
        </n-dropdown>
        </div>
      </section>

      <section>
        <button @click="cancel">取消</button>
        <button @click="register">注册</button>
      </section>
    </div>
  </div>
</template>

<script>
import { Account } from "@/api/Account";
import Recruit from "@/api/Recruit";
// import { User } from "@/api/User";
import { NDropdown, NTag, useMessage } from "naive-ui";
export default {
  name: "RegisterView",
  components: {
    NDropdown, NTag
  },
  data() {
    return {
      message: useMessage(),
      registerInfo: {
        username: "",
        email: "",
        password: "",
        password_confirm: "",
        real_name: "",
        degree: "",
        interests: [],
      },
      totalInterests: []
    };
  },
  mounted() {
    //获取所有一级标签
    Recruit.getFirstRecruitList().then(res => {
      res.data.forEach(element => {
        let ele = {
          key: element.id,
          label: element.name,
          children: []
        };
        //填充一级标签和二级标签
        Recruit.getSecondRecruitList(element.id).then(res => {
          res.data.forEach(second => {
            let item = {
              key: second.id,
              label: second.name
            };
            ele.children.push(item);
          });
        }).catch(err => {
          console.log(err)
        })
        this.totalInterests.push(ele);
      });
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    handleClose(index) {
      this.registerInfo.interests.splice(index, 1)
    },
    handleSelect(key, option) {
      if (this.registerInfo.interests.length === 5) {
        this.message.error('最多添加5个标签！');
        return
      }
      for (let i = 0; i < this.registerInfo.interests.length; i++) {
        if (this.registerInfo.interests[i].id === option.key) {
          this.message.error('不能重复添加一种岗位！');
          return;
        }
      }
      this.registerInfo.interests.push({
        name: option.label,
        id: option.key,
      })
    },
    register() {
      const registerInfo = this.registerInfo
      // check any empty fields

      if (registerInfo.username.length === 0) {
        this.message.error('请输入用户名');
        return;
      }
      if (registerInfo.email.length === 0) {
        this.message.error('请输入邮箱地址')
        return
        // デイース.メッセージ.エラー('メール入力しろ、お前。')
      }
      // check if the email is valid
      if (!registerInfo.email.includes("@")) {
        this.message.error('无效的邮箱地址');
        return;
      }
      if (registerInfo.password.length === 0) {
        this.message.error('请输入密码');
        return;
      }
      // check if the password is the same
      if (registerInfo.password !== registerInfo.password_confirm) {
        this.message.error('两次输入的密码不一致');
        return;
      }
      //检查附加的用户信息
      if (registerInfo.real_name.length === 0) {
        this.message.error("未填写真实姓名")
        return;
      }
      if (registerInfo.degree.length === 0) {
        this.message.error("未填写学历")
        return;
      }
      if (registerInfo.interests.length === 0) {
        this.message.error("未填写兴趣标签")
        return
      }
      Account.accounts_register(registerInfo)
        .then((res) => {
          console.log("Register response:", res);
          this.message.success("注册成功，请前往邮箱验证")
          // jump to login page
          this.$router.push("/login");
        }, (err) => {
          if (err.response) {
            // 服务器返回了响应
            console.error("Register error response:", err.response.data);
            this.message.error("注册失败")
          } else {
            // 其他错误
            this.message.error("注册失败")
          }
        })
    },
  },
};
</script>

<style scoped>
div.register-centered {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.register-container {
  width: 600px;
  /* height: 600px; */
  border-radius: 10px;
  background: var(--bg-like);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px 0;
}

section {
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

section:first-child {
  margin-top: 15px;
  justify-content: center;
}

section:last-child {
  justify-content: space-around;
}

section>div {
  font-weight: bold;
  width: 90px;
  text-align: right;
  font-size: 16px;
}

h3 {
  font-size: 30px;
  font-weight: bold;
  color: var(--theme-color);
}

select {
  box-sizing: border-box;
  width: 250px; 
  height: 40px;
  background: transparent;
  border-radius: 5px;
  border: 1px solid var(--theme-color);
  padding: 0 5px;
}

select:focus-visible {
  outline: 0;
}

button.plus {
  height: 28px;
}

button.full {
  box-sizing: border-box;
  width: 250px;
  height: 40px;
}

.label-list {
  width: 250px;
  display: flex;
  flex-wrap: wrap;
}
</style>