<template>
    <div>
      <button @click="getAdvise" :disabled="times === 0">优化简历</button> 
      &nbsp;&nbsp;&nbsp;
      剩余次数：{{ times }} / 10
    </div>
    <MarkdownDisplayer :value="dialogue" v-if="dialogue !== ''"></MarkdownDisplayer>
</template>
  
<script>
import { User } from '@/api/User';
import ResumeOptimize from '@/api/ResumeOptimize';
import MarkdownDisplayer from '../userInfo/tab/moment/markdown/MarkdownDisplayer.vue';
  export default {
    name: "ChatGPT",
    components: {
      MarkdownDisplayer
    },
  
    data() {
      return {
        dialogue: "",
        ws: null,
        times: 0
      };
  
      //
    },
    mounted() {
      User.getUser(this.$cookies.get('user_id')).then(
        response => {
          this.times = response.data.quota
        }, 
        error => {
          console.error(error)
        }
      )
    },
    methods: {
      getAdvise(){
        this.times--
        this.dialogue = ''
        if(!this.ws){
            const url = `ws://10.251.254.187:9995/ws/chatgpt/?user_id=${this.$cookies.get('user_id')}`;
            this.ws = new WebSocket(url);
            
            this.ws.onmessage = this.handleMessage;
            console.log(this.ws)
        }else if(this.ws.readyState === WebSocket.CLOSED){
            const url = `ws://10.251.254.187:9995/ws/chatgpt/?user_id=${this.$cookies.get('user_id')}`;
            this.ws = new WebSocket(url);
            
            this.ws.onmessage = this.handleMessage;
            this.ws.onerror = () => {
                console.log("error")
            }
            this.ws.onclose = () => {
                console.log("close")
            }
            console.log(this.ws)
        }
        ResumeOptimize.resume_optimize().then(res => {
            console.log(res)
        })
      },
      handleMessage(event) {
        // console.log(event)
        if (event.data.finish_reason === "stop") {
            console.log(event.data)
        } else {
          const data = JSON.parse(event.data);
          // console.log(data);
          if (data.content) {
            this.dialogue += data.content;
          }
        }
      },
      wsHandleClose() {
        if (this.ws) {
          this.ws.close();
        }
      },
    },
  };
  </script>
  
  <style>
  .floating {
    position: fixed;
    top: 50px;
    right: 50px;
    z-index: 1000;
    background: white;
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  </style>