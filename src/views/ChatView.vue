<template>
  <div class="chat-centered">
    <div class="chat-container">
      <keep-alive>
        <vue-advanced-chat
          ref="chat"
          :current-user-id="currentUserId"
          :rooms="JSON.stringify(rooms)"
          rooms-order="asc"
          :rooms-loaded="roomsLoaded"
          :load-first-room="true"
          :custom-search-room-enabled="true"
          :messages="JSON.stringify(messages)"
          :username-options="JSON.stringify(usernameOptions)"
          :messages-loaded="messagesLoaded"
          :menu-actions="JSON.stringify(menuActions)"
          :message-actions="JSON.stringify(messageActions)"
          :room-actions="JSON.stringify(roomActions)"
          :text-messages="JSON.stringify(textMessages)"
          :room-info-enabled="true"
          :textarea-auto-focus="false"
          :user-tags-enabled="userTagsEnabled"
          :show-reaction-emojis="false"
          @fetch-messages="fetchMessages($event.detail[0])"
          @room-action-handler="roomActionHandler($event.detail[0])"
          @menu-action-handler="menuActionHandler($event.detail[0])"
          @send-message="sendMessage($event.detail[0])"
          @open-file="openFile($event.detail[0])"
          @add-room="addRoom"
          @search-room="searchRoom($event.detail[0])"
          @room-info="roomInfo($event.detail[0])"
          :styles="JSON.stringify(styles)"
        >

        <div slot="room-header-info">
          <input
            v-if="isEditRemarks"
            v-model="remarks"
            type="text"
            autocomplete="off"
            @blur="editRemarks"
            :style="remarksInputStyle"
          />
          <div v-else :style="roomHeaderInfoStyle">{{ currentRoomName }}</div>
        </div>

        <div
          v-for="room in rooms"
          :key="room.roomId" 
          :slot="'room-list-info_' + room.roomId"
          :style="roomListInfoStyle"
        >
          {{ room.roomName }}
        </div>

      </vue-advanced-chat>
    </keep-alive>
  </div>
</div>
</template>

<script>
import { register } from 'vue-advanced-chat'
import Conversation from '@/api/Conversation'

import { ChatStyle } from './ChatStyle.js'

register()
export default {
  name: 'ChatView',
  mounted() {
    // ===== DO NOT MODIFY =====
    // ========= Start =========

    // 谁敢改下面的直接 **毙了**

    const style = document.createElement('style')
    style.textContent = `
      *::-webkit-scrollbar {
        display: none !important;
      }

      * {
        scrollbar-width: 0 !important;
      }

      .vac-app-border-r {
        border-right: 1px solid var(--bg-grey) !important;
        height: 105% !important;
      }

      .vac-app-border-b {
        border-bottom: 1px solid var(--bg-grey) !important;
      }

      .vac-file-container {
        background: rgba(255, 255, 255, .1) !important;
        border: rgba(255, 255, 255, .1) !important;
      }

      .vac-card-window {
        height: 98% !important;
      }

      .vac-chat-container, .vac-card-window {
        height: 95% !important;
      }

      .vac-messages-container {
        box-sizing: border-box !important;
        padding: 0 20px !important;
      }

      .vac-message-wrapper {
        margin-bottom: 10px !important;
      }

      input.vac-input,
      textarea#roomTextarea {
        border-radius: 5px !important;
      }

      .vac-box-footer.vac-box-footer-border {
         border-bottom-right-radius: 10px !important;
      }

      .vac-badge-counter.vac-room-badge {
        background: var(--theme-color) !important;
      }

      .markdown a {
        color: var(--font-color) !important;
      }

      .vac-col-messages {
        height: 104% !important;
      }
    `
    this.$refs.chat.shadowRoot.appendChild(style)

    // ========== End ==========
    // ===== DO NOT MODIFY =====
    // =========================

    this.currentUserId = this.$cookies.get('user_id')
    this.roomsLoaded = false
    this.onBus()
    this.fetchRooms()
    console.log(this.styles)
  },
  unmounted() {
    this.offBus()
  },
  computed: {
    roomHeaderInfoStyle() {
      return {
        fontSize: '17px',
        fontWeight: '500',
        lineHeight: '22px',
        color: 'var(--chat-header-color-name)'
      };
    },
    roomListInfoStyle() {
      return {
        flex: '1',
        color: 'var(--chat-room-color-username)',
        fontWeight: '500'
      }
    },
    remarksInputStyle() {
      return {
          height: '38px',
          width: '100%',
          background: 'transparent',
          color: 'var(--font-color)',
          fontSize: '16px',
          outline: '0',
          caretColor: 'var(--theme-color)',
          padding: '5px 10px',
          border: '1px solid var(--theme-color)',
          borderRadius: '5px'
      }
    }
  },
  data() {
    return {
      styles: ChatStyle,
      currentUserId: '',
      currentRoomId: '',
      currentRoomName: '',
      rooms: [],
      allRooms: [],
      roomsLoaded: false,
      messages: [],
      usernameOptions: {
        minUsers: 2,
        currentUser: true
      },
      messagesLoaded: false,
      messageActions: [
        {
          name: 'replyMessage',
          title: '回复'
        }
      ],
      roomActions: [
        {
          name: 'stickyRoom',
          title: '置顶/取消'
        }
      ],
      menuActions: [
        {
          name: 'editRemarks',
          title: '修改备注'
        }
      ],
      textMessages: {
        ROOMS_EMPTY: '没有会话',
        ROOM_EMPTY: '未选择会话',
        NEW_MESSAGES: '新消息',
        MESSAGE_DELETED: '此消息已删除',
        MESSAGES_EMPTY: '没有消息',
        CONVERSATION_STARTED: '会话开始于：',
        TYPE_MESSAGE: '输入消息',
        SEARCH: '搜索',
        IS_ONLINE: '在线',
        LAST_SEEN: '最后在线时间 ',
        IS_TYPING: '正在输入...',
        CANCEL_SELECT_MESSAGE: '取消选择'
      },
      userTagsEnabled: false,
      isEditRemarks: false,
      remarks: '',
      maxRooms: 10000,
    }
  },
  methods: {
    onBus() {
      this.$bus.on('message-received', message => this.receiveMessage(message))
    },

    offBus() {
      this.$bus.off('message-received')
    },

    getRoomI(roomId) {
      if (!roomId) {
        return -1
      }
      for (let i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].roomId == roomId) {
          return i;
        }
      }
      return -1;
    },

    movetoTop(i) {
      for (let j = 0; j < this.rooms.length; j++) {
        if (this.rooms[j].is_sticky) {
          this.rooms[j].index += this.maxRooms
        }
      }
      for (let j = 0; j < this.rooms.length; j++) {
        if (this.rooms[j].index < this.rooms[i].index) {
          this.rooms[j].index++
        }
      }
      this.rooms[i].index = 0
      for (let j = 0; j < this.rooms.length; j++) {
        if (this.rooms[j].is_sticky) {
          this.rooms[j].index -= this.maxRooms
        }
      }
    },

    transformRoom(conversation, index) {
      if (conversation == null) {
        return null
      }
      return {
        i: index,
        index: conversation.is_sticky ? index - this.maxRooms : index,
        roomId: conversation.id,
        roomName: conversation.remarks == '' ? conversation.name : conversation.remarks,
        originalName: conversation.name,
        avatar: conversation.avatar,
        unreadCount: conversation.unread_count,
        users: conversation.participants.map((participant) => ({
          _id: participant.id,
          username: participant.username
        })),
        lastMessage: this.transformMessage(conversation.latest_message),
        is_private: conversation.is_private,
        is_sticky: conversation.is_sticky
      }
    },

    fetchRooms() {
      Conversation.getConversations().then(
        (response) => {
          this.rooms = response.data.map(this.transformRoom)
          if (this.rooms.length > 0) {
            const roomId = this.$route.params.roomId
            const i = this.getRoomI(roomId)
            if (i != -1) {
              this.movetoTop(i)
              this.currentRoomId = this.rooms[i].roomId
              this.currentRoomName = this.rooms[i].roomName
            }
            else {
              this.currentRoomId = this.rooms[0].roomId
              this.currentRoomName = this.rooms[0].roomName
            }
          }
          this.allRooms = this.rooms
          this.roomsLoaded = true
        },
        (error) => {
          console.log(error.message)
        }
      )
    },

    transformMessage(message) {
      if (message == null) {
        return null
      }
      return {
        _id: message.id,
        content: message.content,
        senderId: `${message.sender.id}`,
        username: message.sender.username,
        avatar: message.sender.avatar,
        timestamp: message.timestamp.substring(11, 16),
        date: message.timestamp.substring(5, 10),
        files: message.files,
        replyMessage: this.transformMessage(message.reply_message)
      }
    },

    fetchMessages({ room, options = {} }) {
      this.currentRoomId = room.roomId
      this.currentRoomName = room.roomName
      const offset = options.reset ? 0 : this.messages.length
      if (options.reset) {
				this.messages = []
				this.messagesLoaded = false
        if (room.unreadCount != 0) {
          Conversation.patchConversationReadAll(room.roomId)
          room.unreadCount = 0
        }
        this.userTagsEnabled = !room.is_private
			}
      Conversation.getMessages(room.roomId, 30, offset).then(
        (response) => {
          if (response.data.results.length == 0) {
            this.messagesLoaded = true
          }
          const messages = response.data.results.map(this.transformMessage).reverse()
          if (this.$options.reset) {
            this.messages = messages
          }
          else {
            this.messages = [...messages, ...this.messages]
          }
        },
        (error) => {
          console.log(error.message)
        }
      )
    },

    roomActionHandler({ roomId, action }) {
      if (action.name === 'stickyRoom') {
          const i = this.getRoomI(roomId)
          this.rooms[i].is_sticky = !this.rooms[i].is_sticky
          if (this.rooms[i].is_sticky) {
            this.rooms[i].index -= this.maxRooms
          }
          else {
            this.rooms[i].index += this.maxRooms
          }
          Conversation.patchParticipant(roomId, {is_sticky: this.rooms[i].is_sticky})
      }
    },

    menuActionHandler({ roomId, action }) {
      if (action.name === 'editRemarks') {
          this.isEditRemarks = true
      }
    },

    editRemarks() {
      const remarks = this.remarks.trim()
      this.remarks = ''
      this.isEditRemarks = false
      Conversation.patchParticipant(this.currentRoomId, {remarks: remarks})
      const i = this.getRoomI(this.currentRoomId)
      if (remarks != '') {
        this.rooms[i].roomName = remarks
        this.currentRoomName = remarks
      }
      else {
        this.rooms[i].roomName = this.rooms[i].originalName
        this.currentRoomName = this.rooms[i].originalName
      }
    },

    sendMessage({ roomId, content, files, replyMessage, usersTag}) {
      let formData = new FormData()
      formData.append("conversation", roomId)
      formData.append("content", content)
      if (replyMessage != null) {
        formData.append("reply_message", replyMessage._id)
      }
      if (files != null) {
        for (let i = 0; i < files.length; i++) {
          let filename = files[i].name
          if (files[i].audio) {
            if (files[i].duration < 0.5) {
              console.log('说话时间过短')
              return
            }
          }
          else {
            filename += `.${files[i].extension}`
          }
          formData.append("files", files[i].blob, filename)
        }
      }
      Conversation.postMessage(formData)
    },

    receiveMessage(message) {
      const roomId = message.conversation.id
      let i = this.getRoomI(roomId);

      if (i == -1) {
        i = this.rooms.length
        const room = this.transformRoom(message.conversation, i)
        this.rooms = [...this.rooms, room]
      }

      message = this.transformMessage(message)
      this.rooms[i].lastMessage = message
      if (this.currentRoomId == roomId) {
        this.messages = [...this.messages, message]
      }
      else {
        this.rooms[i].unreadCount++
      }

      this.movetoTop(i)
    },

    openFile({ message, file }) {
      if (file.action == 'download') {
        fetch(file.file.url)
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = file.file.name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
          })
          .catch(err => console.error('Error downloading file:', err));
			}
    },

    addRoom() {
      console.log('add room')
    },

    searchRoom({ roomId, value }) {
      const tmpRooms = this.allRooms.filter(room => room.roomName.includes(value))
			if (tmpRooms.length != 0) {
				this.rooms = tmpRooms
			}
			else {
				this.rooms = this.allRooms
			}
		},

    roomInfo(room) {
      console.log(room)
    }
  }
}
</script>

<style scoped>
.chat-centered {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-container {
  width: 95%;
  height: 95%;
  margin: auto;
}
</style>