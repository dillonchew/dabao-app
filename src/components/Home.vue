<template>
  <div class="places">
    <ul>
      <li v-for="place in placesList" :key="place.id">
        {{ place.name }}
        <RequestForm></RequestForm>
      </li>
    </ul>
  </div>
</template>

<script>
import RequestForm from "./RequestForm.vue";
export default {
  name: "Home",
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
