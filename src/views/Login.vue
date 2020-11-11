<template>
  <div id="login">
    
      <div class="col1">
        <h1>Dabao-app</h1>
        <strong>
          In light of covid-19, this app aims to promote safe-distancing among
          hall residents by reducing overcrowding at popular eateries around
          NUS.
        </strong>
        <br/>
        <br/>
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form id="signup" v-if="showLoginForm" @submit.prevent>
          <br />
          <b-icon icon="chevron-contract" font-scale="4" style="color: white;"></b-icon>
          <br /><br/>
          <div>
            <input v-model.trim="loginForm.email" class="fontAwesome" type="text" id="email1" placeholder = ' Email'/>
          </div>
          <br/>
          <div>
            <input
              v-model.trim="loginForm.password"
              type="password"
              id="password1"
              placeholder = " Password"
            />
          </div>
          <br/>
          <div v-if="clickedFlag">
            <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
            <p v-else>
              Success! Check your email (may be in the junk folder) for a reset
              link!
            </p>
          </div>
          <button @click="login()" id="cool">Log In</button>
          <br />
          <br />
          <br />
          <br />
          <div class="extras">
            <button v-b-modal.modal-pass class="normal">Forgot Password</button>
            <button @click="toggleForm()" class="normal">
              Create an Account
            </button>
          </div>
        </form>
        <form v-else @submit.prevent>
          <br />
          <b-icon icon="chevron-contract" font-scale="4" style="color: white;"></b-icon>
          <br /><br/>
          <div>
            <input
              v-model.trim="signupForm.name"
              type="text"
              placeholder=" Name: <Your Name>"
              id="name"
              required
            />
          </div>
          <br/>
          <div>
            <input
              v-model.trim="signupForm.zone"
              type="text"
              placeholder=" Zone: <A,B,C,D>"
              id="zone"
              required
            />
          </div>
          <br/>
          <div>
            <input
              v-model.trim="signupForm.tele"
              type="text"
              placeholder=" Tele Handle: <@telegramUser>"
              id="tele"
              required
            />
          </div>
          <br/>
          <div>
            <input
              v-model.trim="signupForm.email"
              type="text"
              placeholder=" Email: <you@email.com>"
              id="email2"
              required
            />
          </div>
          <br/>
          <div>
            <input
              v-model.trim="signupForm.password"
              type="password"
              placeholder=" Password: min 6 characters"
              id="password2"
              required
            />
          </div>
          <br/>
          <b-button pill variant="outline-secondary" @click="signup()" id="cool"
            >Sign Up</b-button
          >
          <br />
          <br />
          <div class="extras">
            <button @click="toggleForm()" class = "normal">Back to Log In</button>
          </div>
        </form>
      </div>
   
    <div class = "info">
      <h3>How does this app work?</h3 >
      <ul>
        <li> Residents can place orders for food for a small delivery fee of 10% of the bill</li>
        <li> Residents can also offer to take-away food for other residents </li>
        <li> Residents can see which locations people are planning to go </li>
        <li> This app will follow NUS guidelines regarding zoning and safe-distancing strictly </li>
      </ul>
    </div>

    <div class = "charts">
        <Doughnut></Doughnut>
      </div>

    <b-modal
      id="modal-pass"
      ref="modal"
      title="Password Reset"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form id="pass-form" ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="showSuccess"
          label="Input the email used to sign up for dabao-app"
          label-for="email-input"
          invalid-feedback="Email is required"
        >
          <b-form-input
            id="shop-input"
            type="email"
            placeholder = " Email"
            v-model.trim="resetEmail"
            :state="showSuccess"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { auth } from "@/firebase";
import Doughnut from "../components/DoughnutChart.vue";


export default {
  components: {
    Doughnut,
  },
  data() {
    return {
      clickedFlag: false,
      resetEmail: "",
      showSuccess: true,
      errorMsg: "",

      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        name: "",
        zone: "",
        tele: "",
        email: "",
        password: "",
      },
      showLoginForm: true,
      showPasswordReset: false,
    };
  },
  methods: {
    async resetPassword() {
      this.errorMsg = "";

      try {
        await auth.sendPasswordResetEmail(this.resetEmail);
        this.showSuccess = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    clicked() {
      this.clickedFlag = !this.clickedFlag;
    },
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    signup() {
      this.$store.dispatch("signup", {
        email: this.signupForm.email,
        password: this.signupForm.password,
        tele: this.signupForm.tele,
        name: this.signupForm.name,
        zone: this.signupForm.zone,
      });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.showSuccess = valid;
      return valid;
    },
    resetModal() {
      this.resetEmail = "";
      this.showSuccess = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.resetPassword();
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-pass");
      });
      this.clicked();
    },
  },
};
</script>

<style scoped>
.info {
  float: right;
  width: 35%;
  margin-right: 15%;
  text-align: left;
  display: flexbox;
  align-items: center;
  height: 400px; 
  
}
.charts {
  float: left; 
  display: flexbox;
  margin-left: 20%;
  flex-wrap: wrap;
  width: 25%;
  box-sizing: border-box;
  height: 600px; 

}
#cool {
  display: inline-block;
  padding: 5px 10px;
  font-size: 14px;
  width: 250px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: black;
  color: #fff;
  background-color: #F9154A;
  font-size: 18px;
  border: none;
  border-radius: 20px;
  margin: 4px 2px;
  height: 40px;
}

#cool:hover {
  transform: scale(1.1);
  box-shadow: 0 2px #2f4f4f;
}

#cool:active {
  background-color: #696969;
  box-shadow: 0 2px #2f4f4f;
  transform: translateY(4px);
}
.normal {
  font-size: 14px;
  display: inline-block;
  padding: 5px 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #696969;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  margin: 4px 2px;
}
.normal:hover {
  color: #00e6ac;
}

.normal:active {
  background-color: #696969;
  box-shadow: 0 2px #2f4f4f;
  transform: translateY(4px);
}

#labels {
  margin: 10px 5px;
}

.col2 {
  display: flexbox;
  width: 100%;
  height: 600px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* margin-left: 36%;
  margin-right: 36%; */
  margin-top: 30px;
  margin-bottom: 80px;
  background-image: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/45c2456a-a9ad-44f4-8bec-a7a11c829ed1/d4iq8qc-f1284962-3dc4-43cf-a9e2-0a599127bafa.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}

.col1 {
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 100%;
}


input {
  border-radius: 20px;
  width: 250px;
  border-color:#DBD6D6;
  background-color:#DBD6D6;
  height: 40px;
}

</style>
