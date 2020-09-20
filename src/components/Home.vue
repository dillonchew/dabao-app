<template>
  <div class="places">
    <ul>
      <li class="odd">
        <h3>Supper Stretch</h3>
        <SSRequestForm></SSRequestForm>
      </li>
      <li class="even">
        <h3>Deck</h3>
        <DeckRequestForm></DeckRequestForm>
      </li>
      <li class="odd">
        <h3>Clementi Mall</h3>
        <ClemRequestForm></ClemRequestForm>
      </li>
    </ul>
  </div>
</template>

<script>
import SSRequestForm from "./SSRequestForm.vue";
import DeckRequestForm from "./DeckRequestForm.vue";
import ClemRequestForm from "./ClemRequestForm.vue";
export default {
  name: "Home",
  components: {
    SSRequestForm,
    DeckRequestForm,
    ClemRequestForm,
  },
  data() {
    return {
      placesList: [
        {
          id: "1",
          name: "Supper Stretch",
        },
        {
          id: "2",
          name: "Deck",
        },
        {
          id: "3",
          name: "Clementi Mall",
        },
      ],
    };
  },
};
</script>

<style scoped>
ul {
  display: flexbox;
  padding: 0;
  overflow: auto;
}
li {
  text-align: center;
  padding: 10px;
  margin: 10px;
  border: 1px solid #222;
  font-family: Slack-Circular-Pro, "Helvetica Neue", Helvetica, "Segoe UI",
    Tahoma, Arial, sans-serif;
}
.odd {
  background-color: #e485d4;
}
.even {
  background-color: #7171c4;
}
</style>
