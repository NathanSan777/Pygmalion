<template>
  <div v-if="!showDetail">
    <div v-if="!showNewEntry">
      <div class="card">
        <div class="card-body">
          <h1>Forum</h1>
          <button @click="createNewPost" class="btn btn-primary" style="flex-grow: 1;">New Post</button>
          <br>
          <p v-if="forumPosts.length === 0"> There's no posts so far. Let's change that!</p>
          <div v-else>
            <div class="row">
              <div class="col-mid-4" v-for="entry in paginatedEntries" :key="entry.id">
                <!-- Display forum post details -->
                  <div @click="showEntryDetail(entry)" class="card entry-card" style="display: flex; flex-direction: column;" :style="{backgroundColor: entry.userColor}">
                    <div class="card-body entry-content" style="display: flex; flex-direction: row;">
                      <h2 class="post-title">{{ entry.title }}</h2>
                      <h6 class="post-date">{{ entry.createdAt }}</h6>
                    </div>
                    <p style="margin-left:15px">By: {{ entry.originalPoster }}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center pagination-pills">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
              <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <div class="card" v-if="showNewEntry" style="background:none;">
    <div class="card-body">
      <ForumPost @discard-post="discardNewPost">
      </ForumPost>
    </div>
  </div>
  <ForumPostDetail v-if="showDetail" :entry="selectedPost" @close="closeEntryDetail"></ForumPostDetail>
</template>

<script>
import { useStoreAuth } from '../stores/storeAuth'
import { useForumStore } from '../stores/forumStore'
import ForumPost from './ForumPost.vue';
import ForumPostDetail from './ForumPostDetail.vue';

export default {
    data() {
      return {
        currentUser: null,
        userDataDoc: null,
        forumPosts : [],
        showDetail: false,
        showNewEntry: false,
        selectedPost: null,
      }
    },
    components: {
      ForumPost, 
      ForumPostDetail
    },
    created(){
      console.log("Inside the created hook of Forum.vue.")
      this.forumPosts = [
        {
          id: 1, 
          title: "Test Post", 
          originalPoster: "Nathan", 
          userColor:"#00bfff", 
          content: "Test content. Simple sentence", 
          createdAt: "April 18, 2024",
          comments: 
          [
            {
              commenterName: "John",
              content: "A funny response or something",
              userColor: "#11890f",
              createdAt: "April 18, 2024"
            },
            {
              commenterName: "Nathan",
              content: "A response",
              userColor: "#00bfff",
              createdAt: "April 23, 2024"
            },
          ]
        },

        {
          id: 2, 
          title: "Another Post", 
          originalPoster: "John", 
          userColor:"#11890f", 
          content: "Yet another tet post.", 
          createdAt: "April 20, 2024",
          comments: 
          [
            {
              commenterName: "John",
              content: "Please ignore the typo",
              userColor: "#11890f",
              createdAt: "April 21, 2024"
            },
            {
              commenterName: "Some Guy",
              content: "Bro can't spell",
              userColor: "#fedcba",
              createdAt: "April 22, 2024"
            },
            {
              commenterName: "Another Guy",
              content: "Typo spotted, opinion discarded",
              userColor: "#abcdef",
              createdAt: "April 22, 2024"
            },
            {
              commenterName: "Walter White",
              content: "Jesse we need to cook",
              userColor: "#aaaaaa",
              createdAt: "April 29, 2024"
            },
          ]
        }
      ]
    },
    methods: {
      showEntryDetail(entry){
        this.showDetail = true;
        this.selectedPost = entry; 
      },
      closeEntryDetail(){
        this.showDetail = false;
        this.selectedPost = null;
      },
      createNewPost(){
        this.showNewEntry = true;
      },
      discardNewPost(){
        this.showNewEntry = false;
      }
    
    },
    computed: {
    fetchedForumPosts() {
      return useForumStore().forumPostEntries;
      },

    perPage() {
      return useForumStore().perPage;
      },

    currentPage() {
      return useForumStore().currentPage;
      },
    sortedEntries(){
        return this.forumPosts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      },
    paginatedEntries(){
        const startIndex = (this.currentPage - 1) * this.perPage;
        const endIndex = startIndex + this.perPage;
        return this.sortedEntries.slice(startIndex, endIndex);
      },
    totalPages(){
        return Math.ceil(this.forumPosts.length / this.perPage);
      },
  }
}
</script>

<style scoped>
.card {
    width: fit-content; 
    height: fit-content;
    background: hsla(0, 0%, 100%, 0.45); 
    backdrop-filter: blur(30px); 
    border: none; 
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}
.entry-card {
    width: 75%; /* Ensures each card takes up full width */
    margin-bottom: 5px; /* Adjust as needed for spacing between cards */
    padding: 0;
    cursor: pointer;
}
.entry-content {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  
}
.card-body{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
 
}
.post-title {
  margin-right: 10px; /* Add space between title and date */
}
.post-date {
  margin-left: auto; /* Add space between date and title */
}


.btn, .btn-primary{
    background-color: transparent;
    border-color: black;
    color: black;  
    font-family: "Montserrat";
    font-weight: bold; 
    text-align: center; 
    display: block;  
    margin: auto;
    box-shadow: 0 0 30px rgba(182, 208, 226, 0.2);
}
.btn:hover{
    background-color: rgba(0, 0, 0, 0.2);
    transition: 1s;
}
.entry-card:hover{
  background-color: rgba(0, 0, 0, 0.2);
    transition: 1s;
}

.pagination-pills .page-item {
    display: inline-block;
}

.pagination-pills .page-item .page-link {
    background-color: hsla(0, 0%, 100%, 0.45);;
    border-color: black;
    color: black;
    border-radius: 20px; /* Adjust the border-radius to your preference */
    margin: 0 5px; /* Adjust the spacing between pills */
}

.pagination-pills .page-item.active .page-link {
    background-color: rgba(0, 0, 0, 0.1); /* Change to the desired active pill background color */
    color: black; /* Change to the desired active pill text color */
    border-color: black; /* Change to the desired active pill border color */
}
</style>