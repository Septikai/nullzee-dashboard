<template>
<div class="main">
  <UserCard v-if="this.current_user !== undefined" :user="getUser" :member="getMember" :mongo_user="getMongoDataForUser"/>
</div>
</template>

<script>
import UserCard from "../components/UserCard";

export default {
  name: "UserDisplay",
  components: {
    UserCard
  },
  props: [
      "id"
  ],
  data: function() {
    return {
      current_user: Object
    }
  },
  created: async function() {
    console.log("test");
    console.log(this.$route.params.id)
    console.log(this)
    const response = await fetch(`http://localhost:80/api/users/${this.$route.params.id}`, {method: "GET"});
    if (!response.ok) {
      return;
    }
    const text = await response.text();
    console.log(text);
    this.current_user = JSON.parse(text);
  },
  computed: {
    getUser() {
      console.log(this.current_user);
      console.log(this.current_user["member_info"]["user"]);
      return this.current_user["member_info"]["user"];
    },
    getMember() {
      console.log(this.current_user);
      console.log(this.current_user["member_info"]);
      return this.current_user["member_info"];
    },
    getMongoDataForUser() {
      console.log(this.current_user);
      console.log(this.current_user["db_info"]);
      return this.current_user["db_info"];
    }
  }
}
</script>

<style scoped>

</style>