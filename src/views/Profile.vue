<template>
<div class="main">
  <UserCard :user="getUser" :member="getMember" :mongo_user="getMongoDataForUser"/>
</div>
</template>

<script>
import UserCard from "../components/UserCard";

export default {
  name: "Profile",
  components: {
    UserCard
  },
  data() {
    return {
      session_data: JSON.parse(window.localStorage.getItem("user_session_data"))
    }
  },
  computed: {
    getUser() {
      console.log(this.session_data["user_info"]);
      return this.session_data["user_info"];
    },
    getMember() {
      console.log(this.session_data["member_info"]);
      return this.session_data["member_info"];
    },
    getMongoDataForUser() {
      console.log(this.session_data["db_info"]);
      return this.session_data["db_info"];
    }
  }
}
</script>

<style scoped>

</style>