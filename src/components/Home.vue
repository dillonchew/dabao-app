<template>
  <div class="places">
    <ul>
      <li>
        Supper Stretch
        <SSRequestForm></SSRequestForm>
      </li>
      <li>
        Deck
        <DeckRequestForm></DeckRequestForm>
      </li>
      <li>
        Clementi Mall
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
#places {
  margin: 30px auto;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: block;
  list-style-type: none;
  padding: 0;
}
li {
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
</style>
