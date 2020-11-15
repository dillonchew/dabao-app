<template>
    <div class = "card mb-3" style= "width : 80%;">
    <h5 class="card-title">What you have </h5>
    
    <p class = 'card-text'>
      Total : ${{ totalQuantity }}<br />
      Delivery Fee : ${{ comms }}</p>
        <ul class="list-group">
        <li class = "lifit" v-for="i in cart" :key="i.id">
            {{ i.name }} ({{ i.size }}) - ${{ i.price }}
            <b-icon icon='trash-fill' @click="remove(i.id)"></b-icon>
        </li>
        </ul>
        <br/>
        <b-form-timepicker v-model="time" minutes-step="30" locale="en" style="width:50%; margin-left:25%;"></b-form-timepicker>
        <div class = 'card-body'> 
        <RF v-bind:cart="cart" v-bind:time='time'></RF>
        </div>
    </div>
</template>

<script>
import RF from './RequestForm.vue'

export default {
    name: 'ShoppingCart',
    data() {
    return {time: ""};
    },
    components: {RF},
    props: ['cart'],
    computed: {
        totalQuantity() {
            var result =0
            if(this.cart.length > 0) {
                result = this.cart.map(item => item.price).reduce((result, amount) => result + amount);
                } else {
                    result = 0;
                }
            result = (result * 110/100).toFixed(2)
            return result
        },
        comms(){
           var result = (this.totalQuantity * 10/110).toFixed(2)
           return result;
        },
    },
    methods:{
    remove(index) {
      this.cart.pop(index);
      console.log(this.cart)
    },
    }
}
</script>

<style>
ul{
  display: flex;
  flex-wrap:wrap;
  list-style-type: none;
  padding: 0;
  }

li{
    flex-basis: 20px;
    float: left;
    border: 1px white ;
    margin: 0px 10px 0px 10px;
    font-size: 90%
}

p {
    margin: 0;
}
#ShoppingCart {
    padding: 10px;
    border-radius: 5px;
    background: #494949;
}
#filter {
  background-color: white;
  color:  #660066;
  border-color: #660066;
}
#filter:hover {
  background-color:white;
  color:  #660066;
  border-width: 2px;
  border-color: #660066;
}
</style>
