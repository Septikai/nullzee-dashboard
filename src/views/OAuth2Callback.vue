<template>
  <div class="dynaoauth-msg">
    <p>Logging in...</p>
    <p>Please do not close the window.</p>
  </div>
</template>

<script>
export default {
  name: "OAuth2Callback",
  async created() {
    console.log("created")
    if (window.location.href.includes("error")) {
      window.close();
    }
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    await httpGetAsync(`http://localhost:80/api/oauth_callback?code=${code}`);

    async function httpGetAsync(theUrl) {
      if (window.location.href.includes("localhost")) {
        theUrl +=
            "&redirect_uri=http://localhost:8080/oauth_callback";
      }
      const response = await fetch(theUrl, {
        method: "GET"
      })
      if (!response.ok) {
        return
      }
      const text = await response.text()
      window.localStorage.setItem("user_session_data", text);
      window.close();
    }
  }
};
</script>

<style>

</style>