<template>
<div style="margin-bottom:50px;">
  <!-- banner -->
    <b-container fluid class="p-4 bg-warning">
      <b-img rounded ='circle' src="@/assets/Macs-Logo.png" alt="Image 1"></b-img>
      <br /><br />
      <h5 style = "color : #660066">{{description}}</h5>
    </b-container>

  <div class="row mt-4">

    <!--filters-->
    <div class="col-sm-2">

      <b-button pill variant="outline-secondary" v-on:click="isHidden = !isHidden" style="float: left;margin-left:25px;">Filter
        <b-icon icon="filter-square-fill"></b-icon>
      </b-button>
      <span v-if = "!isHidden">
        <br /><br />
        <label><input type="radio" v-model="selectedCategory" value="All" /> All</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Burger" /> Burgers</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Beverages" /> Beverages</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Sides" /> Sides</label><br>
      </span>
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
      description :"Our story is one of hard work, determination, and humble beginnings – from a neighbourhood restaurant in Des Plaines, Illinois in 1955, to more than 36,000 restaurants in over 100 countries worldwide today.",
      itemsList: [
        {
          id: "#001",
          name: "McChicken",
          picture: 'https://d1nqx6es26drid.cloudfront.net/app/uploads/2016/05/13043514/mcchicken.png',
          category: "Burger",
          sizes: ['Ala-carte', '+ Coke + M Fries', '+ Coke + L Fries', '+ Ice Milo + M Fries', '+ Ice Milo + L Fries'],
          price: {'Ala-carte': 2.00, '+ Coke + M Fries' : 5.00, '+ Coke + L Fries' : 5.50, '+ Ice Milo + M Fries' : 5.80,'+ Ice Milo + L Fries': 6.50 },
          shop : "McDonalds",
          place: "Clementi",
        },
        {
          id: "#002",
          name: "Fillet-O-Fish",
          picture: "https://d1nqx6es26drid.cloudfront.net/app/uploads/2018/04/27124713/10_FOFCornPremium-Roast-Coffee-350x350.png",
          category: "Burger",
          sizes: ['Ala-carte', '+ Coke + M Fries', '+ Coke + L Fries', '+ Ice Milo + M Fries', '+ Ice Milo + L Fries'],
          price: {'Ala-carte': 2.50, '+ Coke + M Fries' : 5.00, '+ Coke + L Fries' : 5.50, '+ Ice Milo + M Fries' : 5.80,'+ Ice Milo + L Fries': 6.50 },
          shop : "McDonalds",
          place: "Clementi",
        },
        {
            id: "#003",
            name: "Big Mac",
            picture: "https://www.mcdelivery.com.sg/sg/static/1604123370397/assets/65/products/110005.png",
            category: "Burger",
            sizes: ['Ala-carte', '+ Coke + M Fries', '+ Coke + L Fries', '+ Ice Milo + M Fries', '+ Ice Milo + L Fries'],
            price: {'Ala-carte': 4.50, '+ Coke + M Fries' : 7.90, '+ Coke + L Fries' : 8.50, '+ Ice Milo + M Fries' : 8.70,'+ Ice Milo + L Fries': 9.00 },
            shop : "McDonalds",
            place: "Clementi",

        },
        {
            id: "#004",
            name: "Coca-Cola",
            picture: "https://www.mcdelivery.com.sg/sg/static/1604123370397/assets/65/products/506221.png",
            category: "Beverages",
            sizes: ['S', 'M', 'L'],
            price: {'S': 2.45, 'M': 2.95, 'L': 3.45},
            shop : "McDonalds",
            place: "Clementi",
        },
        {
            id: "#099",
            name: "Milo",
            picture: "https://d1nqx6es26drid.cloudfront.net/app/uploads/2015/04/04115956/Milo-ver1.png",
            category: "Beverages",
            sizes: ['S', 'M', 'L'],
            price: {'S': 3.00, 'M': 3.40, 'L': 4.00},
            shop : "McDonalds",
            place: "Clementi",
        },
        {
            id: "#005",
            name: "French Fries",
            picture: "https://d1nqx6es26drid.cloudfront.net/app/uploads/2015/04/04044451/product-french-fries-350x350.png",
            category: "Sides",
            sizes: ['S', 'M', 'L'],
            price: {'S': 1.50, 'M': 2.75, 'L': 3.35},
            shop : "McDonalds",
            place: "Clementi",
        },
        {
            id: "#006",
            name: "McWings",
            picture: "https://d1nqx6es26drid.cloudfront.net/app/uploads/2015/04/04044217/product-mcwings.png",
            category: "Sides",
            sizes: ['2pc', '4pc'],
            price: {'2pc': 2.75, '4pc': 5.50},
            shop : "McDonalds",
            place: "Clementi",
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


</style>
