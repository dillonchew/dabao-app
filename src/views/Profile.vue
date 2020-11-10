<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12 mt-5">
                <div class="card card-widget widget-user">
              <!-- Add the bg color to the header using any of the bg-* classes -->
              <div class="widget-user-header text-white" 
              style="background-image: url('https://miro.medium.com/max/2835/1*an7X6yxD1YrMQVTaIg3uWw.jpeg')">
                <h3 class="widget-user-username text-left">{{userProfile.name}}</h3>
                <h5 class="widget-user-desc text-left">Telegram: {{userProfile.tele}}</h5>
                <div class="widget-user-image">
                    <img class="img-circle" :src="userProfile.profilePic" alt="User Avatar">
                </div>
              </div>
              <div class="card-footer">
                <div class="row">
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <span class="description-text">Zone</span>
                      <h5 class="description-header">{{userProfile.zone}}</h5>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4 border-right">
                    <div class="description-block">
                      <span class="description-text">DELIVERIES</span>
                      <h5 class="description-header">13</h5>
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                  <div class="col-sm-4">
                    <div class="description-block">
                      <span class="description-text">COMMISION EARNED</span>
                      <h5 class="description-header">$5</h5>  
                    </div>
                    <!-- /.description-block -->
                  </div>
                  <!-- /.col -->
                </div>
                <!-- /.row -->
              </div>
              <b-button tag = "router-link"
                  to = "/Settings"
                  variant="outline-secondary"> Edit Profile </b-button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "",
      tele: "",
      zone: "",
      profilePic: "",
      showSuccess: false,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
  }
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
      border-radius: 100%;
      border: 3px solid #fff;
    }
</style>