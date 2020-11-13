<template>
    <div>
    <br/><br/>
      <div class="places">
        <h3>Al Amann Restaurant</h3>
        <b-container>
              <b-img src="@/assets/amaans.jpg" rounded width="400px"></b-img>
        </b-container>
        <br />
         <b-button id="view" tag = "router-link"
                  to = "/AlAmaan"
                  variant="outline-secondary"> View Menu </b-button>
      </div>
      <div class="places" id="middle">
        <h3>Formosa Delights</h3>
       <b-container>
              <b-img src="@/assets/formosa.jpg" rounded width="400px"></b-img>
        </b-container>
        <br />
         <b-button id="view" tag = "router-link"
                  to = "/Formosa"
                  variant="outline-secondary"> View Menu </b-button>
      </div>
      <div id="right">
        <h3>Fong Seng Nasi Lemak</h3>
        <b-container>
              <b-img src="@/assets/fongseng.jpg" rounded width="400px"></b-img>
        </b-container>
        <br />
        <b-button id="view" tag = "router-link"
                  to = "/FongSeng"
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
b-img {
  max-width: 60%;
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
