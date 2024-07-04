<template>
  <div>
    <template v-if="currentItems.length > 0">
      <moment-list-item
        @delete-moment="handleDelete"
        @forward-moment="handleForward"
        @like-moment="handleLike"
        v-for="item in currentItems"
        :key="item"
        :title="item.title"
        :moment-id="item.id"
        :user-id="item.sender.id"
        :user-name="item.sender.username"
        :enterprise-id="item.enterprise ? item.enterprise.id : undefined"
        :enterprise-name="item.enterprise ? item.enterprise.name : undefined"
        :is-liked="item.is_liked"
        :likes-count="item.likes_count"
        :comments-count="item.comments_count"
        :comments="item.comments"
        :timestamp="item.timestamp"
        :forwards-count="item.forwards_count"
        :show-avatar="false"
        :showDeleteIcon="showDeleteIcon"
        :showForwardIcon="showForwardIcon"
        :showLikeIcon="showLikeIcon"
      />
      <div class="pagination-wrapper">
        <n-pagination
          v-model:page="currentPage"
          :page-size="itemsPerPage"
          :item-count="totalItemsCount"
          @update:page="handleUpdatePage"
          :show-quick-jump-dropdown="false"
        >
        </n-pagination>
      </div>
    </template>
    <div class="no-hint" v-else>
      暂无动态
    </div>
  </div>
</template>
<script>
import { NPagination } from "naive-ui";
import MomentListItem from "./MomentListItem.vue";
import Moment from "@/api/Moment";
export default {
  //获取头像直接写专门的url
  name: "MomentList",
  components: {
    NPagination,
    MomentListItem,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  props: {
    items: {
      type: Array,
      default: []
    },
    itemsPerPage: {
      type: Number,
      default: 4
    },

    // =========== props for show icon  ===========
    showForwardIcon: {
      type: Boolean,
      default: true
    },
    showLikeIcon: {
      type: Boolean,
      default: true
    },
    showDeleteIcon: {
      type: Boolean,
      default: true
    },

  },
  /**
   * handleDelete() {
            Moment.deleteMoment(this.momentId).then(
                (response) => {
                    console.log(response);
                    this.$emit('delete-moment', this.momentId)
                },
                (error) => {
                    console.log(error.message)
                }
            )
        },
        it is in chile
   */
  computed: {
    totalItemsCount() {
      if (this.items) {
        return this.items.length;
      } else {
        return 0;
      }
    },
    currentItems() {
      if (this.items && this.items.slice) {
        let start = (this.currentPage - 1) * this.itemsPerPage;
        let end = Math.min(
          this.currentPage * this.itemsPerPage,
          this.totalItemsCount
        );
        return this.items.slice(start, end);
      } else {
        return [];
      }
    },
  },
  methods: {
    handleUpdatePage(page) {
      this.currentPage = page;
    },

    handleLike(id) {
      let item = this.items.find((item) => item.id === id);
      console.log(item);
      if (!item.is_liked) {
        Moment.likeMoment(id).then(
          (response) => {
            console.log(response);
            item.is_liked = !item.is_liked;
            console.log("like")
            item.likes_count += 1;
            console.log(item.likes_count)
          },
          (error) => {
            console.log(error.message);
          }
        );
      } else {
        Moment.unlikeMoment(id).then(
          (response) => {
            console.log(response);
            item.is_liked = !item.is_liked;
            console.log("unlike")
            item.likes_count -= 1;
            console.log(item.likes_count)
          },
          (error) => {
            console.log(error.message);
          }
        );
      }
    },
    handleForward(id) {
      Moment.forwardMoment(id).then(
        (response) => {
          console.log(response);
          let item = this.items.find((item) => item.id === id);
          item.forwards_count += 1;
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    handleDelete(id) {
      Moment.deleteMoment(id).then(
        (response) => {
          console.log(response);
          // let item = this.items.find((item) => item.id === id);
          // remove item from items don't use filter
          // this.handleUpdatePage();
          // emit event to parent
          // // alert("emit")
          this.$emit("delete-moment", id);   
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
  }
};
</script>

<style scoped>
.pagination-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.moment-list {
  width: 100%;
  /* height: 100px; */
  /* overflow: hidden; */
  padding: 0 20px;
  box-sizing: border-box;
  padding-bottom: 10px;
  scrollbar-width: 0;
}

.moment-list::-webkit-scrollbar {
  display: none;
}
</style>