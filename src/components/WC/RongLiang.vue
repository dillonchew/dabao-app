<template>
<div style="margin-bottom:50px;">
  <!-- banner -->
    <b-container fluid class="p-4" style="background-color: #e6ebff;">
      <b-img rounded ='circle' src="@/assets/Macs-Logo.png" alt="Image 1"></b-img>
      <br /><br />
      <h5 style = "color : #660066">{{description}}</h5>
    </b-container>

  <div class="row mt-4">

    <!--filters-->
    <div class="col-sm-2">

      <b-button id="filter" variant="outline-secondary" v-on:click="isHidden = !isHidden" style="float: left;margin-left:25px;">Filter
        <b-icon icon="filter-square-fill"></b-icon>
      </b-button>
      <div id="filtercol" v-if = "!isHidden">
        <br /><br />
        <label><input type="radio" v-model="selectedCategory" value="All" /> All</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Roasted Noodles / Rice" /> Roasted Noodles / Rice</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Soup" /> Soup</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Sides" /> Sides</label><br>
      </div>
    </div>

    <!--ProductList-->  
    <div class="col-sm-7">
    <ul> 
      <li v-for="item in filteredItem" :key="item.id">
        <h3>{{ item.name }}</h3>
        <img v-bind:src= item.picture>
        <div class="button-container" >
          <b-form-select v-model="size" :options="item.sizes" size="sm" class="mt-3"></b-form-select>
        </div>
        <br />
          <b-button @click="updateCart(item, 'add')"
          >Add to Cart</b-button>
         <br /><br />
      </li>
    </ul>
    </div>

    <!--Cart-->
    <div class="col-sm-3">
      <ShoppingCart :cart="this.cart"></ShoppingCart>
    </div>
  </div>
</div>
</template>

<script>
import ShoppingCart from '../ShoppingCart.vue'
export default {

  data(){
    return{
      selectedCategory: "All",
      size:'',
      cart:[],
      isHidden:true,
      toggle: false,
      description :"Rong Liang Restaurant serves variety of Chinese cuisine such as, Roasted Duck, Sio Bak and Sio Bak.",
      itemsList: [
        {
          id: "#001",
          name: "Roasted Duck",
          picture: 'https://foodchiak.com/uploads/7/3/2/1/73213063/photo-18-10-16-12-03-03-pm_6.jpg',
          category: "Roasted Noodles / Rice",
          sizes: ['Noodle', 'Rice'],
          price: {'Noodle': 3.00, 'Rice': 3.00},
          shop : "Rong Liang",
          place: "West Coast",
        },
        {
          id: "#002",
          name: "Char Siew",
          picture: 'https://eatbook.sg/wp-content/uploads/2016/12/char-siew-rice-1.jpg',
          category: "Roasted Noodles / Rice",
          sizes: ['Noodle', 'Rice'],
          price: {'Noodle': 2.50, 'Rice': 2.50},
          shop : "Rong Liang",
          place: "West Coast",
        },
        {
          id: "#003",
          name: "Roasted Pork",
          picture: 'https://www.misstamchiak.com/wp-content/uploads/2015/06/SAM_2667.jpg',
          category: "Roasted Noodles / Rice",
          sizes: ['Noodle', 'Rice'],
          price: {'Noodle': 2.50, 'Rice': 2.50},
          shop : "Rong Liang",
          place: "West Coast",
        },
        {
          id: "#004",
          name: "Roasted Chicken",
          picture: 'https://1.bp.blogspot.com/-F6BF2ZE4gw4/U-DqOq4BCaI/AAAAAAAAov4/mCJSWh-thkE/s1600/04+roast+chicken+Rong+Liang+Restaurant+(%E8%8D%A3%E4%BA%AE%E9%98%81)+-+Char+Siew,+Roast+Pork+&+Chicken+@+Clementi+%5BBehind+West+Coast+Hawker+Centre%5D+(Large).JPG',
          category: "Roasted Noodles / Rice",
          sizes: ['Noodle', 'Rice'],
          price: {'Noodle': 2.50, 'Rice': 2.50},
          shop : "Rong Liang",
          place: "West Coast",
        },
        {
          id: "#005",
          name: "House Specialty Beancurd",
          picture: "https://tasteasianfood.com/wp-content/uploads/2018/01/Tofu-with-minced-pork-square-1.jpg",
          category: "Sides",
          sizes: ['S', 'M'],
          price: {'S': 5.00, 'M':7.00},
          shop : "Rong Liang",
          place: "West Coast",

        },
        {
            id: "#006",
            name: "Lotus Root Pork Ribs",
            picture: "https://thewoksoflife.com/wp-content/uploads/2016/02/lotus-root-pork-soup-6-500x399.jpg",
            category: "Soup",
            sizes: ['M', 'L'],
            price: {'M': 2.50, 'L': 3.50},
            shop : "Rong Liang",
            place: "West Coast",

        },

    ]}
},
components:{
  ShoppingCart
},

computed :{

  filteredItem: function(){
    var vm = this;
    var category = vm.selectedCategory;
    if(category === "All"){
      return vm.itemsList;
    } else {
      return vm.itemsList.filter(function(item){
        return item.category === category;
      });
    }
  },
},

created() {
  this.data = {
    cart : this.cart
  }
},

methods: {
  updateCart(item, updateType) {  
    if (updateType === 'add') {
      if(this.size !== '') {   
          this.cart.push({
            id: this.cart.length,
            name: item.name,
            size: this.size,
            price: item.price[this.size],
            shop: item.shop,
            place: "West Coast"
        })
        console.log(this.cart)
      }
    } else {
      this.cart.pop(item)
    }
  }
}
              
}

  
</script>

<style scoped>
.button-container {
    display: flex;
    justify-content:center;
}

ul{
  display: flex;
  flex-wrap:wrap;
  list-style-type: none;
  padding: 0;
  }

li{
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    border: 1px white ;
}

img{
  width:300px;
  height: 200px;
  object-fit:contain;
}

button {
  background-color: #660066;
  color: white;
}

button:hover {
  background-color: #3c0252;
}

#filtercol {
  margin-left: 10%;
  text-align: left;
}

h5 {
  max-width: 50%;
  margin-left: 25%;
}

</style>
