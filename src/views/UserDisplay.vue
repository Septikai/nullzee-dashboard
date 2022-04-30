<template>
<div class="main">
  <template v-if="this.current_user !== undefined">
    <UserCard :user="getUser" :member="getMember" :mongo_user="getMongoDataForUser"/>
    <template v-if="getIsStaff">
      <PunishmentList :punishments="this.punishments"/>
    </template>
  </template>
</div>
</template>

<script>
import UserCard from "../components/UserCard";
import PunishmentList from "../components/moderation/PunishmentList";

export default {
  name: "UserDisplay",
  components: {
    UserCard,
    PunishmentList
  },
  props: [
      "id"
  ],
  data: function() {
    return {
      current_user: Object,
      punishments: Object
    }
  },
  created: async function() {
    console.log(this.$route.params.id)
    const user_response = await fetch(`http://localhost:80/api/users/${this.$route.params.id}`, {method: "GET"});
    if (!user_response.ok) {
      return;
    }
    const user_text = await user_response.text();
    console.log(user_text);
    this.current_user = JSON.parse(user_text);
    if (JSON.parse(window.localStorage.getItem("user_session_data"))["member_info"]["is_staff"]) {
      console.log("staff wooo");
      const punishments_response = await fetch(`http://localhost:80/api/users/${this.$route.params.id}/punishments`, {method: "GET"});
      if (!punishments_response.ok) {
        return;
      }
      const punishments_text = await punishments_response.text();
      console.log(punishments_text);
      console.log(JSON.parse(punishments_text).punishments);
      this.punishments = JSON.parse(punishments_text).punishments;
    }
  },
  computed: {
    getUser() {
      console.log(this.current_user["member_info"]["user"]);
      return this.current_user["member_info"]["user"];
    },
    getMember() {
      console.log(this.current_user["member_info"]);
      return this.current_user["member_info"];
    },
    getMongoDataForUser() {
      console.log(this.current_user["db_info"]);
      return this.current_user["db_info"];
    },
    getIsStaff() {
      const session_data = JSON.parse(window.localStorage.getItem("user_session_data"));
      if (session_data && session_data["member_info"]) {
        console.log(JSON.parse(window.localStorage.getItem("user_session_data"))["member_info"]["is_staff"]);
        return session_data["member_info"]["is_staff"];
      }
      return false
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
</style>