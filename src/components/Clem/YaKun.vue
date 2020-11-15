<template>
<div style="margin-bottom:50px;">
  <!-- banner -->
    <b-container fluid class="p-4" style="background-color: #e6ebff;">
      <b-img rounded ='circle' src="@/assets/YaKun-Logo.jpg" alt="Image 1"></b-img>
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
        <label><input type="radio" v-model="selectedCategory" value="Meals" /> Meals</label><br>
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
      description :"From its humble beginnings as a modest coffee stall in the 1940s, the name of Ya Kun has become synonymous with unparalleled kaya toast and irresistibly fragrant coffee and tea, enjoyed amidst a cosy atmosphere. Today, Ya Kun continues to delight fans and to attract converts.",
      itemsList: [
        {
          id: "#001",
          name: "Set A: Kaya Toast with Butter Set",
          picture: 'http://yakun.com/images/uploads/menu/VSM_kaya-toast-with-butter.png',
          category: "Meals",
          sizes: ['Ala-carte', '+ R Iced Coffee', '+ L Iced Coffee', '+ R Iced Tea', '+ L Iced Tea'],
          price: {'Ala-carte':2.00, '+ R Iced Coffee':4.40, '+ L Iced Coffee':4.80,'+ R Iced Tea':4.40, '+ L Iced Tea':4.80},
          shop : "YaKun",
          place: "Clementi",
        },
       {
          id: "#002",
          name: "Set B: Steamed Kaya Butter Set",
          picture: 'http://yakun.com/images/uploads/menu/VSM_kaya-butter-steamed-bread.png',
          category: "Meals",
          sizes: ['Ala-carte', '+ R Iced Coffee', '+ L Iced Coffee'+ '+ R Iced Tea', '+ L Tea'],
          price: {'Ala-carte':2.00, '+ R Iced Coffee':4.40, '+ L Iced Coffee':4.80,'+ R Iced Tea':4.40, '+ L Tea':4.80},
          shop : "YaKun",
          place: "Clementi",
        },
        {
          id: "#003",
          name: "Set C: French Toast with Kaya Set",
          picture: 'http://yakun.com/images/uploads/menu/VSM_french-toast.png',
          category: "Meals",
          sizes: ['Ala-carte', '+ R Iced Coffee', '+ L Iced Coffee'+ '+ R Iced Tea', '+ L Tea'],
          price: {'Ala-carte':2.00, '+ R Iced Coffee':4.40, '+ L Iced Coffee':4.80,'+ R Iced Tea':4.40, '+ L Tea':4.80},
          shop : "YaKun",
          place: "Clementi",
        },
        {
            id: "#004",
            name: "Iced Coffee",
            picture: "http://yakun.com/images/uploads/menu/Iced_Kopi_Range_%28Big%29.jpg",
            category: "Beverages",
            sizes: ['O', 'C'],
            price: {'O': 1.20, 'C': 1.60},
            shop : "YaKun",
            place: "Clementi",
        },
       {
            id: "#005",
            name: "Iced Tea",
            picture: "http://yakun.com/images/uploads/menu/Iced_Kopi_Range_%28Big%29.jpg",
            category: "Beverages",
            sizes: ['O', 'C'],
            price: {'O': 1.20, 'C': 1.60},
            shop : "YaKun",
            place: "Clementi",
        },
        {
            id: "#006",
            name: "Soft Boiled Eggs",
            picture: "http://yakun.com/images/uploads/menu/all-day-sides_soft-boiled-eggs.png",
            category: "Sides",
            sizes: ['2', '4'],
            price: {'2':1.40, '4': 1.80},
            shop : "YaKun",
            place: "Clementi",
        },
        {
            id: "#007",
            name: "Cheese Balls",
            picture: "http://yakun.com/images/uploads/menu/all-day-sides_cheese-balls.png",
            category: "Sides",
            sizes: ['6pc', '12pc'],
            price: {'6pc': 2.40, '12pc': 4.80},
            shop : "YaKun",
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
