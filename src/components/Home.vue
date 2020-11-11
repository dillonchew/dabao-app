<template>
  <div class = "home">
    <br/><br/>
    <div class="places">
        <h3>Supper Stretch</h3>
        <SSimages></SSimages>
        <br />
        <!-- <SSRequestForm></SSRequestForm> -->
         <b-button tag = "router-link"
                  to = "/SSlocations"
                  variant="outline-secondary"> View Shops </b-button>
    </div>
    <div class="places" id= "middle">
        <h3>West Coast</h3>
        <WCImages></WCImages>
        <br />
         <b-button tag = "router-link"
                  to = "/WClocations"
                  variant="outline-secondary"> View Shops </b-button>
    </div>
    <div id = "right">
        <h3>Clementi Mall</h3>
        <Clemimages></Clemimages>
        <br />
        <!-- <ClemRequestForm></ClemRequestForm> -->
        <b-button tag = "router-link"
                  to = "/Clemlocations"
                  variant="outline-secondary"> View Shops </b-button>
    </div>
        <!-- <div>
          <SSRequestForm></SSRequestForm>
        </div>
      </li>
      <li class="two">
        <h3>Clementi Mall</h3>
        <Clemimages></Clemimages>
        <br />
        <ClemRequestForm></ClemRequestForm>
      </li> -->
  </div>
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
</style>
