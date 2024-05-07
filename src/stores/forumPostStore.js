import { defineStore } from 'pinia';

export const useForumPostStore = defineStore('forumPost', {
  state: () => ({
    postTitle: "",
    postDate: "",
    postText: "",
  }),

  actions: {
    discardEntry() {
      this.postTitle = "";
      this.postDate = "";
      this.postText = "";
    },
    setCurrentDate() {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().substr(0, 10);
      this.postDate = formattedDate;
    }
  }
});