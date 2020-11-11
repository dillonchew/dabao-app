<template>
    <div>
      <br/><br/>
      <div class="places">
        <h3>Ya Kun Kaya Toast</h3>
        <b-container>
              <b-img src="@/assets/yakun.jpg" rounded width="400px"></b-img>
        </b-container>
        <br />
        <!-- <SSRequestForm></SSRequestForm> -->
         <b-button tag = "router-link"
                  to = "/YaKun"
                  variant="outline-secondary"> View Menu </b-button>
      </div>
      <div class="places" id="middle">
        <h3>McDonald's</h3>
       <b-container>
              <b-img src="@/assets/macs_cm1.jpg" rounded width="400px" height="400px"></b-img>
        </b-container>
        <br />
         <b-button tag = "router-link"
                  to = "/Macs"
                  variant="outline-secondary"> View Menu </b-button>
      </div>
      <div id="right">
        <h3>Crave</h3>
        <b-container>
              <b-img src="@/assets/crave-the-clementi-mall.jpg" rounded width="400px" ></b-img>
        </b-container>
        <br />
        <b-button tag = "router-link"
                  to = "/Crave"
                  variant="outline-secondary"> View Menu </b-button>
    </div>
  </div>
</template>

<script>
export default {
    
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
