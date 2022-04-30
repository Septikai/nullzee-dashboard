<template>
  <div class="fully-rounded">
    <Menu as="div">
      <MenuButton as="span" class="fully-rounded">
        <a href="#"><img class="fully-rounded avatar-image border-transparent focus:border-transparent focus:ring-0" alt="Avatar" :src="pfpToDisplay"></a>
      </MenuButton>
      <MenuItems>
        <MenuItem as="button" v-if="isLoggedIn" class="border-transparent focus:border-transparent focus:ring-0">
          <a href="/profile">Profile</a>
        </MenuItem>
        <MenuItem as="button" v-if="isLoggedIn" class="border-transparent focus:border-transparent focus:ring-0">
          <a @click="logout" href="#">Log Out</a>
        </MenuItem>
        <MenuItem as="button" v-if="isNotLoggedIn" class="border-transparent focus:border-transparent focus:ring-0">
          <a @click="loginToDiscord" href="#">Log In</a>
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>
</template>

<script>
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
// TODO: make the dropdown actually look like a dropdown

export default {
  name: "Avatar",
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem
  },
  props: {
    pfpSource: String
  },
  computed: {
    pfpToDisplay() {
      if (this.pfpSource === "default") {
        return new URL("../assets/discord_default_pfp.png", import.meta.url).href;
      } else return this.pfpSource;
    },
    isLoggedIn() {
      const session_data = window.localStorage.getItem("user_session_data");
      return typeof session_data !== "undefined" && session_data !== null;
    },
    isNotLoggedIn() {
      return !this.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      window.localStorage.removeItem("user_session_data")
      window.location.reload();
    },
    loginToDiscord: function() {
      const url = window.location.href;
      const { hostname } = new URL(url);
      const redirectUri =
          hostname === "septikai.me"
              ? "https://septikai.me/oauth_callback"
              : "http://localhost:8080/oauth_callback";
      const clientId = "903999870501785681"
      const scope = "identify guilds"
      const discordUrl = "https://discord.com/api/oauth2/authorize" +
      "?client_id=" + clientId +
      "&redirect_uri=" + redirectUri +
      "&response_type=code" +
      "&scope=" + scope;
     const win = window.open(discordUrl, "Login", "height=820, width=500")
      const pollTimer = window.setInterval(function () {
        if (win.closed !== false) {
          window.clearInterval(pollTimer);
          window.location.reload(false);
        }
      }, 200);
    }
  }
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}

.avatar-image {
  height: 50px;
  width: 50px;
}

.fully-rounded .avatar-image {
  border-radius: 50%;
}

MenuItems MenuItem {
  position: absolute;
  z-index: 10;
}
</style>