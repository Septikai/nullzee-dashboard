<template>
  <div v-if="Object.keys(this.leaderboard_data_levels).length !== 0" class="leaderboard-container">
    <div class="container">
      <div class="title-container">
        <span class="title">Leaderboard</span>
      </div>
      <LeaderboardCard v-for="(user, index) in getPunishments" :user="user" :position="index" :key="user._id"
                       :class="index !== Object.keys(this.leaderboard_data_levels['users_by_level']).length - 1 ? 'pad-under' : ''"/>
    </div>
  </div>
</template>

<script>
import LeaderboardCard from "./LeaderboardCard";

export default {
  name: "Leaderboard",
  components: {
    LeaderboardCard
  },
  data: function() {
    return {
      leaderboard_data_levels: Object
    }
  },
  created: async function() {
    const leaderboard_data_levels = await fetch(`http://localhost:80/api/users/leaderboard/levels`, {method: "GET"});
    if (!leaderboard_data_levels.ok) {
      return;
    }
    const leaderboard_data_levels_text = await leaderboard_data_levels.text();
    console.log(leaderboard_data_levels_text);
    this.leaderboard_data_levels = JSON.parse(leaderboard_data_levels_text);
  },
  computed: {
    getPunishments() {
      console.log(this.leaderboard_data_levels);
      for (let user in this.leaderboard_data_levels["users_by_level"]["data"]) {
        console.log(`user - ${user}`)
        console.log(this.leaderboard_data_levels["users_by_level"]["data"][user]);
      }
      return this.leaderboard_data_levels["users_by_level"]["data"];
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.title-container {
  flex-direction: row;
  align-items: flex-start;
}

.title {
  font-size: 25px;
  line-height: 25px;
  padding-bottom: 10px;
  align-self: flex-start;
}

.leaderboard-container {
  min-width: 80%;
}

.leaderboard-container:last-child {
  padding-bottom: 0;
}
</style>