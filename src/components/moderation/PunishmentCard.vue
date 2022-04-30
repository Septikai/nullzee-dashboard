<template>
<div class="card-container">
  <div class="card-outer" :style="getPunishmentColour">
    <div class="card-inner card">
      <div class="main-card-content">
        <div class="row">
<!--          <img class="avatar card-item" alt="avatar" src=""-->
          <span class="offender card-item"><b>{{ punishment.type }}</b></span>
        </div>
        <div class="row">
          <span class="type card-item" :style="getPunishmentColour"><b>{{ punishment.type }}</b></span>
        </div>
<!--        <div class="row">-->
<!--          <span class="level card-item"><b>Level:</b>&nbsp;{{ getLevel }}</span>-->
<!--          <span class="vc-time card-item"><b>VC Time:</b>&nbsp;{{ getVcTime }}</span>-->
<!--        </div>-->
<!--        <div class="row card-footer">-->
<!--          <span class="user-id card-item"><b>ID:</b>&nbsp;{{ user.id }}</span>-->
<!--        </div>-->
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
    getPunishmentColour() {
      const colours = {
        "warn": 0xF7FF00,
        "mute": 0xFF8F00,
        "kick": 0xFF5D00,
        "ban": 0xFF0000
      }
      console.log(this.$props)
      console.log(this.punishment);
      return colours[this.punishment.type];
    }
  }
}
</script>

<style scoped>
.card-container {
  min-height: 190px;
}

.card-outer {
  min-height: 190px;
  width: 90%;
}

.avatar {
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