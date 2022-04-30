<template>
<div class="main">
  <PunishmentCard v-for="punishment in getPunishments" :punishment="getPunishments[punishment]" :key="punishment.id"/>
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

</style>