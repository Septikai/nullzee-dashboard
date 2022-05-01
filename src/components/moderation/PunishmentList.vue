<template>
<div class="main">
  <span class="title"><b>Punishment History</b></span>
  <PunishmentCard v-for="(punishment, index) in getPunishments" :punishment="punishment" :key="punishment.id"
                  :class="index !== Object.keys(getPunishments).length - 1 ? 'pad-under' : ''"/>
</div>
</template>

<script>
import PunishmentCard from "./PunishmentCard";

export default {
  name: "PunishmentList",
  components: {
    PunishmentCard
  },
  props: {
    punishments: Object
  },
  computed: {
    getPunishments() {
      console.log(this.punishments);
      for (let punishment in this.punishments) {
        console.log(this.punishments[JSON.parse(punishment)]);
      }
      return this.punishments;
    }
  }
}
</script>

<style scoped>
.main {
  border-radius: 10px;
}

.title {
  font-size: 25px;
  line-height: 25px;
  padding-bottom: 10px;
  align-self: flex-start;
}

.main:last-child {
  padding-bottom: 0;
}
</style>