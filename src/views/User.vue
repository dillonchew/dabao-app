<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-5">
                <div class="card card-widget widget-user">
              <!-- Add the bg color to the header using any of the bg-* classes -->
              <div class="widget-user-header text-white" 
              style="background-image: url('https://miro.medium.com/max/2835/1*an7X6yxD1YrMQVTaIg3uWw.jpeg')">
                <h3 class="widget-user-username text-left">{{ this.name }}</h3>
                <h5 class="widget-user-desc text-left">Telegram: {{this.tele}}</h5>
                <div class="widget-user-image">
                    <img class="img-circle" :src="this.profilePic" alt="User Avatar">
                </div>
              </div>
              <div class="card-footer">
                <div class="row">
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <span class="description-text">Zone</span>
                      <h5 class="description-header">{{this.zone}}</h5>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <span class="description-text">DELIVERIES</span>
                      <h5 class="description-header">{{this.deliveries}}</h5>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4">
                    <div class="description-block">
                      <span class="description-text">COMMISION EARNED</span>
                      <h5 class="description-header">{{this.commission}}</h5>  
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                </div>
                <!-- /.row -->
              </div>
            </div>
          </div>
        </div>
        <br/><br/>
    </div>
</template>

<script>
import { mapState } from "vuex";
import database from "../firebase.js";
import * as firebase from 'firebase'

export default {
  data() {
    return {
      name: "",
      tele: "",
      zone: "",
      showAlert: false,
      profilePic: "",
      showSuccess: false,
      deliveries: "",
      commission: ""
    };
  },
  computed: {
  },
  methods: {
    fetchUser() {
      var uid = this.$route.params.uid;
      database
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          this.name = snapshot.data().name;
          this.tele = snapshot.data().tele;
          this.zone = snapshot.data().zone;
          this.profilePic = snapshot.data().profilePic;
        }
        );
    },
    onContext(ctx) {
      this.context = ctx
    },
    },
    
  created() {
    this.fetchUser();
  },

  beforeCreate: function () {
    console.log("beforeCreate()");
  },

  beforeMount: function () {
    console.log("beforeMount()");
  },
  mounted: function () {
    setTimeout(function () {
      console.log("mounted()");
    }, 3000);
  },
  beforeUpdate: function () {
    console.log("beforeUpdate()");
  },
  updated: function () {
    console.log("updated()");
  },
  beforeDestroy: function () {
    console.log("beforeDestroy()");
  },
};
</script>

<style scoped>
  .widget-user-header {
    background-position: center center;
    background-size: cover;
    height: 150px;
  }
  .widget-user-image {
    position: absolute;
    top: 30px;
    left: 50%;
    margin-left: -45px;
  }
  .widget-user-image>img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 100%;
    border: 3px solid #fff;
  }
</style>