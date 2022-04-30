<template>
<div class="card-container">
  <div class="card-outer" :style="getEmbedColour">
    <div class="card-inner card">
      <img class="avatar" alt="avatar" :src="getModPfp">
      <div class="main-card-content">
        <div class="row">
          <span class="type card-item" :style="getTypeColour"><b>{{ punishment.type.charAt(0).toUpperCase() + punishment.type.slice(1) }}</b></span>
        </div>
        <div class="row">
          <span class="reason card-item"><b>Reason:&nbsp;</b>{{ punishment.reason.charAt(0).toUpperCase() + punishment.reason.slice(1) }}</span>
        </div>
<!--        <div class="row">-->
<!--          <span class="level card-item"><b>Level:</b>&nbsp;{{ getLevel }}</span>-->
<!--          <span class="vc-time card-item"><b>VC Time:</b>&nbsp;{{ getVcTime }}</span>-->
<!--        </div>-->
        <div class="row card-footer">
          <span class="mod-name card-item"><b>Moderator:&nbsp;</b>{{ punishment.mod_username }}</span>
          <span class="mod-id card-item"><b>Moderator ID:&nbsp;</b>{{ punishment.mod_id }}</span>
          <span class="timestamp card-item"><b>Timestamp:&nbsp;</b>{{ getTimeStamp }}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "PunishmentCard",
  props: {
    punishment: Object
  },
  computed: {
    getModPfp() {
      return "https://cdn.discordapp.com/avatars/" +
          this.punishment.mod_id + "/" +
          this.punishment.mod_pfp + ".webp?size=512";
    },
    getEmbedColour() {
      return `background-${this.getPunishmentColour}`
    },
    getTypeColour() {
      return this.getPunishmentColour;
    },
    getPunishmentColour() {
      const colours = {
        "warn": "#F7FF00",
        "mute": "#FF8F00",
        "kick": "#FF5D00",
        "ban": "#FF0000"
      }
      console.log(this.$props)
      console.log(this.punishment);
      return `color: ${colours[this.punishment.type]}`;
    },
    getTimeStamp() {
      const format_options = {
        hour12: false,
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: "2-digit", minute: "2-digit"
      };
      const unix_date = new Date(this.punishment.timestamp * 1000);
      return unix_date.toLocaleString("en-GB", format_options)
    }
  }
}
</script>

<style scoped>
.card-container {
  min-height: 100px;
  padding-bottom: 16px;
}

.card-outer {
  width: 100%;
}

.avatar {
  height: 100px;
  width: auto;
  border-radius: 50%;
  align-self: center;
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

.card-item {
  padding-left: 20px;
  display: flex;
}

.card-footer {
  margin-top: auto;
  padding-top: 6px;
  font-size: 12px;
}

.type {
  font-size: 25px;
  text-align: left;
}

.reason {
  text-align: left;
}
</style>