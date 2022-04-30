<template>
  <div class="header">
    <router-link to="/">
      <img class="home-icon border-transparent focus:border-transparent focus:ring-0" alt="Nullzee" src="../assets/Nullzee.png">
    </router-link>
    <div class="header-v-for">
      <a class="header-buttons rounded-button border-transparent focus:border-transparent focus:ring-0"
         v-for="route in routes"
         :key="route.name"
         :style="
         route.name === $route.name
          ? 'background-color: rgb(66, 65, 81); margin-left: 5px'
          : 'margin-left: 5px'
         "
      >
        <router-link :to="route.path">{{ route.name }}</router-link>
      </a>
    </div>
    <div class="avatar">
      <Avatar :pfpSource="pfpSource"></Avatar>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue"

export default {
  name: "Header.vue",
  components: {
    Avatar
  },
  computed: {
    routes() {
      return this.$router.options.routes.filter((x) => x.includeInHeader);
    },
    pfpSource() {
      if (this.isLoggedIn){
        const session_data = JSON.parse(window.localStorage.getItem("user_session_data"));
        return "https://cdn.discordapp.com/avatars/" +
            session_data["user_info"].id + "/" +
            session_data["user_info"].avatar + ".webp?size=512";
      } else {
        return "default";
      }
    },
    isLoggedIn() {
      const session_data = window.localStorage.getItem("user_session_data");
      return session_data !== "undefined" && session_data !== null;
    }
  }
};
</script>

<style scoped>
.header {
  font-family: 'Roboto', sans-serif;
  background-color: #212121;
  height: 60px;
  position: relative;
  box-shadow: 0 5px 10px #151515;
  z-index: 9;
  display: flex;
  padding: 10px;
}

.home-icon {
  height: 40px;
  width: auto;
}

router-link {
  display: flex;
  align-items: center;
  text-align: center;
  text-justify: auto;
}

.header-v-for {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
}

.header-buttons {
  height: 36px;
}

a {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 0 5px 0 5px;
}

.rounded-button {
  border-radius: 10px;
}

.avatar {
  padding-right: 10px;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  float: right;
}
</style>