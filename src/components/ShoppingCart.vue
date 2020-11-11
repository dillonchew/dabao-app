<template>
     <div class = "card bg-warning mb-3" style= "width : 80%;color:#660066;">
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
        <div class = 'card-body'> 
        <RF v-bind:cart="cart"></RF>
        </div>
    </div>
</template>

<script>
import RF from './RequestForm.vue'

export default {
    name: 'ShoppingCart',
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
</style>
