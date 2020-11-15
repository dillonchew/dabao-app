<template>
    <div>
      <br/><br/>
      <div class="places">
        <h3>Burger King</h3>
        <b-container>
              <b-img src="@/assets/bk1.png" rounded ></b-img>
        </b-container>
        <br />
        <!-- <SSRequestForm></SSRequestForm> -->
         <b-button id="view" tag = "router-link"
                  to = "/BurgerKing"
                  variant="outline-secondary"> View Menu </b-button>
      </div>
      <div class = "places" id= "middle">
        <h3>McDonald's</h3>
       <b-container>
              <b-img src="@/assets/macs_wcp1.jpg" rounded></b-img>
        </b-container>
        <br />
         <b-button id="view" tag = "router-link"
                  to = "/WCPMacs"
                  variant="outline-secondary"> View Menu </b-button>
      </div>
      <div class = "places" id= "right">
        <h3>Rong Liang Restaurant</h3>
        <b-container>
              <b-img src="@/assets/rongliang1.jpg" rounded ></b-img>
        </b-container>
        <br />
        <!-- <ClemRequestForm></ClemRequestForm> -->
        <b-button id="view" tag = "router-link"
                  to = "/RongLiang"
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
