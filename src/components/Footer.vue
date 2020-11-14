<template>
  <div class="footer">
    <footer>
      <p v-html="copyRtSymbol +title"></p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copyRtSymbol: "&copy; ",
      title: "dabao-app by team agar agar ✌🏻",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  background: #e6ebff;
  padding: 5px;
  border-style: solid;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 40px;
  vertical-align: middle;
  position: fixed;
  bottom: 0;
  border-width: 0;
  width: 100%;
}
p {
  align-content: center;
  color: #660066;
  margin-top: 3px;
}
</style>