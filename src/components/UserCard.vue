<template>
<div class="card-container">
  <div class="card-outer" :style="getEmbedColour">
    <div class="card-inner card">
      <img class="avatar" alt="avatar" :src="getPfpToDisplay">
      <div class="main-card-content">
        <div class="row">
          <span class="username card-item" :style="getUserColour"><b>{{ user.username }}#{{ user.discriminator }}{{ getMemberNick }}</b></span>
        </div>
        <div class="row">
          <span class="level card-item"><b>Level:</b>&nbsp;{{ getLevel }}</span>
          <span class="vc-time card-item"><b>VC Time:</b>&nbsp;{{ getVcTime }}</span>
        </div>
        <div class="row">
          <span class="registered_at card-item"><b>Registered:</b>&nbsp;{{ getAccountCreationDate }} </span>
          <span class="joined_at card-item"><b>Joined:</b>&nbsp;{{ getJoinDate }}</span>
        </div>
        <div class="row">
          <span class="role-info card-item"><b>Role Info:</b></span>
        </div>
        <div class="row">
          <span class="role-info card-item">{{ getRoleInfo }}</span>
        </div>
        <div class="row card-footer">
          <span class="user-id card-item"><b>ID:</b>&nbsp;{{ user.id }}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: Object,
    member: Object,
    mongo_user: Object
  },
  computed: {
    getPfpToDisplay() {
      console.log("https://cdn.discordapp.com/avatars/" + this.user.id + "/" + this.user.avatar + ".webp?size=512")
      return "https://cdn.discordapp.com/avatars/" +
          this.user.id + "/" +
          this.user.avatar + ".webp?size=512";
    },
    getEmbedColour() {
      if (this.mongo_user && this.mongo_user.embed_colour) {
        return `background-color: #${this.mongo_user.embed_colour};`;
      }
      return "";
    },
    getUserColour() {
      if (this.member && this.member.colour) {
        return `color: #${this.member.colour};`;
      }
      return "color: white;";
    },
    getMemberNick() {
      if (this.member.nick) return ` - ${this.member.nick}`;
      return "";
    },
    getLevel() {
      if (this.mongo_user) return this.mongo_user.level;
      else return 0;
    },
    getVcTime() {
      if (!this.mongo_user || !this.mongo_user.vc_minutes) return "0";
      const years = parseInt(this.mongo_user.vc_minutes / 365 / 24 / 60);
      const days = parseInt(this.mongo_user.vc_minutes / 24 / 60);
      const hours = parseInt(this.mongo_user.vc_minutes / 60 % 24);
      const mins = parseInt(this.mongo_user.vc_minutes % 60);
      let timeString = "";
      if (years > 0) timeString += years + "y ";
      if (days > 0) timeString += days + "d ";
      if (hours > 0) timeString += hours + "h ";
      if (mins > 0) timeString += mins + "m ";
      if (timeString === "") return "0";
      return timeString.slice(0, -1);
    },
    getRoleInfo() {
      const role_info_dict = {
        staff_roles: {
          "name": "staff_roles",
          "667954216374894622": "Literally Nullzee",
          "685027474522112000": "Administrator",
          "667953757954244628": "Staff",
          "675031583954173986": "Trainee Staff"
        },
        other_roles: {
          "name": "other_roles",
          "726682232621760594": "Twitch Mod",
          "746469205427224588": "Event Hoster",
          "729995579538669618": "Bot Dev",
          "788183123136741426": "Skyblock Advisor"
        }
      }
      const pick_highest = ["staff_roles"];
      let info = "None";
      const role_ids = this.member.roles;
      for (const category in role_info_dict) {
        for (const id in role_info_dict[category]) {
          if (id === "name") continue;
          if (role_ids[id]) {
            info += `${role_info_dict[category][id]}, `;
            if (pick_highest.includes(role_info_dict[category]["name"])) break;
          }
        }
      }
      if (info !== "None") {
        info = info.slice(0, -2);
        info = info.slice(4);
      }
      return info;
    },
    getAccountCreationDate() {
      const format_options = {
        hour12: false,
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: "2-digit", minute: "2-digit"
      };
      const unix_timestamp = (this.user.id / 4194304) + 1420070400000;
      const unix_date = new Date(unix_timestamp);
      return unix_date.toLocaleString("en-GB", format_options)
    },
    getJoinDate() {
      const format_options = {
        hour12: false,
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: "2-digit", minute: "2-digit"
      };
      const join_date = new Date(Date.parse(this.member.joined_at));
      const join_date_utc = new Date(
          join_date.getUTCFullYear(), join_date.getUTCMonth(), join_date.getUTCDate(),
          join_date.getUTCHours(), join_date.getUTCMinutes(), join_date.getUTCSeconds()
      );
      return join_date_utc.toLocaleString("en-GB", format_options)
    }
  }
}
</script>

<style scoped>
.card-outer {
  min-height: 190px;
  width: 60%;
}

.avatar {
  height: 140px;
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

.username {
  font-size: 25px;
  text-align: left;
}

.role-info {
  text-align: left;
}
</style>