<template>
<div style="margin-bottom:50px;">
  <!-- banner -->
    <b-container fluid class="p-4" style="background-color: #e6ebff;">
      <b-img rounded ='circle' src="@/assets/Crave-Logo.png" alt="Image 1"></b-img>
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
        <label><input type="radio" v-model="selectedCategory" value="Rice Meals" /> Rice Meals</label><br>
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
      description :"Savour the nation's favourite by indulging at Crave, enjoy some award-winning Adam Road Nasi Lemak by Selera Rasa, topped off with crunchy flavourful ikan bilis, nuts and the tantalising iconic sambal! What's more? Top it off with the famous teh tarik from Rafee's Corner for a fulfilling meal! ",
      itemsList: [
        {
          id: "#001",
          name: "Nasi Lemak with Selar Fish",
          picture: 'https://d1sag4ddilekf6.cloudfront.net/compressed/items/SGITE20200615093441012792/photo/0da58eff85e044a68b3406121a99bca5_1592213677440467780.jpeg',
          category: "Rice Meals",
          sizes: ['Ala-carte', '+ Iced Bandung', '+ Iced Calamansi', '+ Ice Milo Dinosaur'],
          price: {'Ala-carte': 6.00, '+ Iced Bandung':8.80, '+ Iced Calamansi':8.80, '+ Ice Milo Dinosaur':9.80},
          shop : "Crave",
          place: "Clementi",
        },
        {
          id: "#002",
          name: "Nasi Lemak with Chx Wing",
          picture: "https://www.capitaland.com/content/dam/capitaland-sites/singapore/shop/malls/funan/tenants/NLw_chicken-wing.jpg.transform/cap-midres/image.jpg",
          category: "Rice Meals",
          sizes: ['Ala-carte', '+ Iced Bandung', '+ Iced Calamansi', '+ Ice Milo Dinosaur'],
          price: {'Ala-carte': 6.00, '+ Iced Bandung':8.80, '+ Iced Calamansi':8.80, '+ Ice Milo Dinosaur':9.80},
          shop : "Crave",
          place: "Clementi",
        },
       {
          id: "#003",
          name: "Nasi Lemak Royle",
          picture: "https://d1sag4ddilekf6.cloudfront.net/compressed/items/SGITE20200615093621019518/photo/92eaff4868604308bb56db21ae8949bf_1592213768839889425.jpeg",
          category: "Rice Meals",
          sizes: ['Ala-carte', '+ Iced Bandung', '+ Iced Calamansi', '+ Ice Milo Dinosaur'],
          price: {'Ala-carte': 8.20, '+ Iced Bandung':11.00, '+ Iced Calamansi':11.00, '+ Ice Milo Dinosaur':12.00},
          shop : "Crave",
          place: "Clementi",
        },
        {
          id: "#004",
          name: "Iced Bandung",
          picture: "https://cdn.foodadvisor.com.sg/3/300/ycqwu/vt-iw/Fhetksji/2973855.zfw/iced-bandung.jpg?mode=3",
          category: "Beverages",
          sizes: ['Ala-carte'],
          price: {'Ala-carte':2.30},
          shop : "Crave",
          place: "Clementi",
        },
        {
          id: "#005",
          name: "Iced Calamansi",
          picture: "https://d1sag4ddilekf6.cloudfront.net/compressed/items/SGITE20200615092757014707/photo/6e74221b8901495c9d92c63c8de5bb52_1592213268259293769.jpeg",
          category: "Beverages",
          sizes: ['Ala-carte'],
          price: {'Ala-carte':2.30},
          shop : "Crave",
          place: "Clementi",
        },
        {
            id: "#006",
            name: "Iced Milo Dinosaur",
            picture: "https://content.shopback.com/sg/wp-content/uploads/2016/12/14099333_1737004846552346_1699635858_n-e1482115446823.jpg",
            category: "Beverages",
            sizes: ['Ala-carte'],
            price: {'Ala-carte':3.30},
            shop : "Crave",
            place: "Clementi",
        },
        {
            id: "#007",
            name: "Fried Egg",
            picture: "https://fresh.co.nz/wp-content/uploads/2020/03/Fried-Eggs-5-Ways_LR-e1583270528321.jpg",
            category: "Sides",
            sizes: ['1pc', '2pc'],
            price: {'1pc': 0.80, '2pc': 1.60},
            shop : "Crave",
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
