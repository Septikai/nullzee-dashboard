<template>
  <div>
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: 'App',
  components: {
    Header
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

html {
  height: 100vh;
  overflow: auto;
}

body {
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  background-repeat: repeat-y;
  background-attachment: fixed;
  background-color: #303030;
  min-height: 100vh;
}

.main {
  overflow: auto;
  background-color: #464646;
  width: 80%;
  margin: 20px auto auto;
  box-shadow: 0 0 10px #606060;
  padding: 16px;
  border-radius: 5px;
  height: 100%;
}

.card {
  background-color: #303030;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 16px;
  width: 100%;
  display: flex;
  margin-left: 10px;
}

.card-outer {
  width: 60%;
  display: flex;
  border-radius: 10px;
  background-color: #303030;;
}

.card-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
