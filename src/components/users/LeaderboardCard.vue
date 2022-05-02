<template>
<div class="card-container">
  <div class="card-outer" :style="getEmbedColour">
    <div class="card-inner card">
      <img class="avatar" alt="avatar" :src="getPfpToDisplay">
      <div class="main-card-content">
        <div class="row">
          <span class="username card-item" :style="getUserColour"><b>{{ user.user.username }}#{{ user.user.discriminator }}{{ getMemberNick }}</b></span>
        </div>
        <div class="row middle-row">
          <span class="level card-item"><b>Level:</b>&nbsp;{{ getLevel }}</span>
          <span class="vc-time card-item"><b>VC Time:</b>&nbsp;{{ getVcTime }}</span>
        </div>
        <div class="row card-footer">
          <span class="user-id card-item"><b>ID:</b>&nbsp;{{ user.user.id }}</span>
        </div>
      </div>
      <span class="leaderboard-position"><b>#{{ this.position+1 }}</b></span>
    </div>
  </div>
</div>
<!--add that someone isnt in the server if they are not in the server somewhere-->
</template>

<script>
export default {
  name: "LeaderboardCard",
  props: {
    user: Object,
    position: Number
  },
  computed: {
    getPfpToDisplay() {
      console.log(this.user)
      console.log("https://cdn.discordapp.com/avatars/" + this.user._id + "/" + this.user.user.avatar + ".webp?size=512")
      console.log(this.user.user.avatar)
      if (this.user.user.avatar === null) {
        return `https://cdn.discordapp.com/embed/avatars/${this.user.user.discriminator % 5}.png`
      }
      return "https://cdn.discordapp.com/avatars/" +
          this.user._id + "/" +
          this.user.user.avatar + ".webp?size=128";
    },
    getEmbedColour() {
      if (this.user && this.user.embed_colour) {
        return `background-color: #${this.user.embed_colour};`;
      }
      return "";
    },
    getUserColour() {
      if (this.user.user && this.user.user.colour) {
        return `color: #${this.user.user.colour};`;
      } else if (this.user.colour) {
        return `color: #${this.user.colour};`;
      }
      return "color: white;";
    },
    getMemberNick() {
      if (this.user.nick) return ` - ${this.user.nick}`;
      return "";
    },
    getLevel() {
      if (this.user) return this.user.level;
      else return 0;
    },
    getVcTime() {
      if (!this.user || !this.user.vc_minutes) return "0";
      const years = parseInt(this.user.vc_minutes / 365 / 24 / 60);
      const days = parseInt(this.user.vc_minutes / 24 / 60);
      const hours = parseInt(this.user.vc_minutes / 60 % 24);
      const mins = parseInt(this.user.vc_minutes % 60);
      let timeString = "";
      if (years > 0) timeString += years + "y ";
      if (days > 0) timeString += days + "d ";
      if (hours > 0) timeString += hours + "h ";
      if (mins > 0) timeString += mins + "m ";
      if (timeString === "") return "0";
      return timeString.slice(0, -1);
    }
  }
}
</script>

<style scoped>
.card-container {
  padding-bottom: 5px;
}
.card-outer {
  min-height: 110px;
  width: 60%;
}

.card-inner {
  min-height: 100%;
}

.leaderboard-position {
  align-self: center;
  font-size: 30px;
}

.main-card-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.row {
  width: 100%;
  display: flex;
  padding-top: 2px;
}

.middle-row {
  align-self: center;
  align-items: center;
  font-size: 16px;
}

.card-item {
  padding-left: 20px;
  display: flex;
}

.card-footer {
  margin-top: auto;
  padding-top: 6px;
  font-size: 15px;
}

.username {
  font-size: 22px;
  text-align: left;
}

.avatar {
  height: 100px;
  width: auto;
  border-radius: 50%;
  align-self: center;
}
</style>