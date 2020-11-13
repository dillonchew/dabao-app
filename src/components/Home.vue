<template>
  <section id = "home">
    <br/><br/>
    <div class="places">
        <h3>Supper Stretch</h3>
        <SSimages></SSimages>
        <br />
         <b-button id="view" tag = "router-link"
                  to = "/SSlocations"
                  variant="outline-secondary"> View Shops </b-button>
    </div>
    <div class="places" id= "middle">
        <h3>West Coast</h3>
        <WCImages></WCImages>
        <br />
         <b-button id="view" tag = "router-link"
                  to = "/WClocations"
                  variant="outline-secondary"> View Shops </b-button>
    </div>
    <div id = "right">
        <h3>Clementi Mall</h3>
        <Clemimages></Clemimages>
        <br />
        <b-button id="view" tag = "router-link"
                  to = "/Clemlocations"
                  variant="outline-secondary"> View Shops </b-button>
    </div>
  </section>
</template>

<script>

import SSimages from "./SSimages.vue";
import WCImages from "./WCImages.vue";
import Clemimages from "./Clemimages.vue";

export default {
  name: "Home",
  components: {
    SSimages,
    Clemimages,
    WCImages
  },
  methods: {
    showModal() {
      this.$root.$emit('bv::show::modal', 'modal', '#btnShow')
    }
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
          name: "Clementi Mall",
        },
      ],
    };
  }
}
</script>

<style scoped>
.places {
  display: flexbox;
  float: left;
  width: 30%;
  margin-left: 2%;
  
}
#middle {
  margin-left: 3%;
}
#right {
  display:flexbox;
  float: right;
  width: 30%;
  margin-right: 2%;
  
}
#view {
  background-color: white;
  color:  #660066;
  border-color: #660066;
}
#view:hover {
  background-color:white;
  color:  #660066;
  border-width: 2px;
  border-color: #660066;
}

</style>
