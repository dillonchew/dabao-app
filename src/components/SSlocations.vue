<template>
    <div class="places">
    <ul>
      <li class="odd">
        <h3>Al Amann Restaurant</h3>
        <b-container>
              <b-img src="@/assets/amaans.jpg" rounded style = "width : 50%"></b-img>
        </b-container>
        <br />
        <!-- <SSRequestForm></SSRequestForm> -->
         <b-button tag = "router-link"
                  to = "/SSlocations"
                  variant="outline-secondary"> View Menu </b-button>
      </li>
      <hr />
      <li class="even">
        <h3>Formosa Delights</h3>
       <b-container>
              <b-img src="@/assets/formosa.jpg" rounded style = "width : 50%"></b-img>
        </b-container>
        <br />
         <b-button tag = "router-link"
                  to = "/SSlocations"
                  variant="outline-secondary"> View Menu </b-button>
      </li>
      <hr />
      <li class="odd">
        <h3>Fong Seng Nasi Lemak</h3>
        <b-container>
              <b-img src="@/assets/fongseng.jpg" rounded style = "width : 50%"></b-img>
        </b-container>
        <Clemimages></Clemimages>
        <br />
        <!-- <ClemRequestForm></ClemRequestForm> -->
        <b-button tag = "router-link"
                  to = "/SSlocations"
                  variant="outline-secondary"> View Menu </b-button>
    </li>
    </ul>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
ul {
  display: flexbox;
  align-content: center;
  justify-content: center;
  padding: 0;
}

hr {
  align-self: center;
  align-content: center;
  justify-content: center;
  max-width: 400px;
  background-color: #cc0066;
  border: 0.2px solid #cc0066;
}
li {
  text-align: center;
  padding: 10px;
  margin: 10px;
  /* border-top: 1px solid #222; */
  font-family: Slack-Circular-Pro, "Helvetica Neue", Helvetica, "Segoe UI",
    Tahoma, Arial, sans-serif;
}
/* .odd {
  background-color: #e485d4;
}
.even {
  background-color: #7171c4;
} */
</style>
