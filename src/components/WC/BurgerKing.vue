<template>
<div style="margin-bottom:50px;">
  <!-- banner -->
    <b-container fluid class="p-4" style="background-color: #e6ebff;">
      <b-img rounded ='circle' src="@/assets/BK-Logo.jpg" alt="Image 1"></b-img>
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
        <label><input type="radio" v-model="selectedCategory" value="Burger" /> Burgers</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Beverages" /> Beverages</label><br>
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
      description :"The original HOME OF THE WHOPPER®, our commitment to premium ingredients, signature recipes, and family-friendly dining experiences is what has defined our brand for more than 50 successful years.",
      itemsList: [
        {
          id: "#001",
          name: "Double Mushroom Swiss Burger",
          picture: 'https://www.burgerking.com.sg/upload/image/Product/6/0-burger-doubles-mushroom-swiss-details.png',
          category: "Burger",
          sizes: ['Ala-carte', '+ Coke + L Fries', '+ Ice Milo + L Fries','+ Coke + L Cheese Fries', '+ Ice Milo + L Cheese Fries'],
          price: {'Ala-carte': 7.40, '+ Coke + L Fries' : 9.50, '+ Ice Milo + L Fries' : 11.10,'+ Coke + L Cheese Fries': 10.30, '+ Ice Milo + L Cheese Fries' : 11.90,},
          shop : "Burger King",
          place: "West Coast",
        },
        {
          id: "#002",
          name: "Double Western WHOPPER",
          picture: "https://www.burgerking.com.sg/upload/image/Product/3/0-burger-double-western-whopper-details.png",
          category: "Burger",
          sizes: ['Ala-carte', '+ Coke + L Fries', '+ Ice Milo + L Fries','+ Coke + L Cheese Fries', '+ Ice Milo + L Cheese Fries'],
          price: {'Ala-carte': 13.50, '+ Coke + L Fries' : 14.60, '+ Ice Milo + L Fries' : 15.70,'+ Coke + L Cheese Fries': 15.40, '+ Ice Milo + L Cheese Fries' : 16.20,},
          shop : "Burger King",
          place: "West Coast",
        },
        {
          id: "#003",
          name: "Mushroom Swiss TENDERGRILL Chicken",
          picture: 'https://www.burgerking.com.sg/upload/image/Product/12/CF-mushroom-swiss-tendergrill-chicken-details.png',
          category: "Burger",
          sizes: ['Ala-carte', '+ Coke + L Fries', '+ Ice Milo + L Fries','+ Coke + L Cheese Fries', '+ Ice Milo + L Cheese Fries'],
          price: {'Ala-carte': 7.40, '+ Coke + L Fries' : 9.50, '+ Ice Milo + L Fries' : 11.10,'+ Coke + L Cheese Fries': 10.30, '+ Ice Milo + L Cheese Fries' : 11.90,},
          shop : "Burger King",
          place: "West Coast",
        },
        {
          id: "#004",
          name: "Coca-Cola",
          picture:'https://www.burgerking.com.sg/upload/image/Product/37/beverage-coca-cola-zero-details.png',
          category: "Beverages",
          sizes: ['M', 'L'],
          price: {'M': 2.40, 'L': 2.80},
          shop : "Burger King",
          place: "West Coast",

        },
        {
            id: "#099",
            name: "Ice Milo",
            picture: "https://www.burgerking.com.sg/upload/image/Product/43/beverage-milo-details.png",
            category: "Beverages",
            sizes: ['M'],
            price: {'M': 3.50},
            shop : "Burger King",
            place: "West Coast",

        },
        {
            id: "#005",
            name: "French Fries",
            picture: "https://www.burgerking.com.sg/upload/image/Product/55/sides-french-fries-details.png",
            category: "Sides",
            sizes: ['M', 'L'],
            price: {'M': 2.50, 'L': 2.90},
            shop : "Burger King",
            place: "West Coast",

        },
        {
            id: "#006",
            name: "Cheesy Fries",
            picture: "hhttps://www.burgerking.com.sg/upload/image/Product/54/sides-cheesy-fries-details.png",
            category: "Sides",
            sizes: ['R', 'L'],
            price: {'R': 3.30, 'L': 3.70},
            shop : "Burger King",
            place: "West Coast",
        }
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
