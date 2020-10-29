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
  background: rgb(27, 73, 110);
  padding: 5px;
  border-style: solid;
  border-color: black;
  border-width: 2px;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 40px;
  vertical-align: middle;
  position: fixed;
  bottom: 0;
  width: 100%;

}
p {
  align-content: center;
  color: ivory;
}
</style>