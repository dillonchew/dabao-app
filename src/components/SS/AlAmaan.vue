<template>
<div style="margin-bottom:50px;">
  <!-- banner -->
    <b-container fluid class="p-4" style="background-color: #e6ebff;">
      <b-img rounded ='circle' src="@/assets/AlAmaan-Logo.png" alt="Image 1"></b-img>
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
        <label><input type="radio" v-model="selectedCategory" value="Breads" />Breads</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Rice" />Rice</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Tandoori" /> Tandoori</label><br>
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
      description :"Local restaurant in Singapore serving quality food with great taste. We are recognised for the taste and rich blend of spices we add to our food which makes the food taste good. We do not add any preservative which means the food served is of hygiene without any compromise in quality.",
      itemsList: [
        {
          id: "#001",
          name: "Naan",
          picture: 'https://i.hungrygowhere.com/rnr/food/review_photo/42058_800x0_crop_800x0_f2fa426f61.jpg',
          category: "Breads",
          sizes: ['Plain', 'Butter', 'Garlic', 'Cheese','Keema'],
          price: {'Plain':2.00, 'Butter':2.20, 'Garlic':3.00, 'Cheese':3.50,'Keema':4.50},
          shop : "Al Amaan",
          place: "Supper Stretch",
        },
        {
          id: "#002",
          name: "Paratha",
          picture: "https://i2.wp.com/www.vegrecipesofindia.com/wp-content/uploads/2010/06/plain-paratha-recipe-1-500x375.jpg",
          category: "Breads",
          sizes: ['Aloo', 'Podina'],
          price: {'Aloo':3.00, 'Podina':2.50},
          shop : "Al Amaan",
          place: "Supper Stretch",
        },
       {
          id: "#003",
          name: "Biryani",
          picture: "https://recipes.timesofindia.com/thumb/msid-54308405,width-1600,height-900/54308405.jpg",
          category: "Rice",
          sizes: ['Chicken', '+ Mutton', 'Vegetable'],
          price: {'Chicken':8.50, '+ Mutton':8.50, 'Vegetable':6.50},
          shop : "Al Amaan",
          place: "Supper Stretch",
        },
        {
          id: "#004",
          name: "Tandoori Chicken",
          picture: "https://lh3.googleusercontent.com/proxy/VyUPHPx4345JWXqHYNiZSFmOwLRTA5cWWwGriW1k-HjGaGRFZ0dAOg7EiPfpjNC63YTJvRSfCmB4haeRh5f0g_DaKrDx1ZHOxpUeZUCc8P5AQTfOZv776TLmNkmHT9oq06XGUm6maQ",
          category: "Tandoori",
          sizes: ['S','M','L'],
          price: {'S':6.50, 'M':10.50,'L':18.50},
          shop : "Al Amaan",
          place: "Supper Stretch",
        },
        {
          id: "#005",
          name: "Chicken Tikka",
          picture: "https://burpple-2.imgix.net/foods/2bf220c1e781b4d70fa1323263_original.?w=645&dpr=1&fit=crop&q=80&auto=format",
          category: "Tandoori",
          sizes: ['S','M','L'],
          price: {'S':6.50,'M':8.50,'L':10.50},
          shop : "Al Amaan",
          place: "Supper Stretch",
        },
        {
          id: "#006",
          name: "Fish Tikka",
          picture: "https://spicecravings.com/wp-content/uploads/2019/08/Fish-Tikka-6-500x500.jpg",
          category: "Tandoori",
          sizes: ['S','M','L'],
          price: {'S':10.50,'M':15.50,'L':20.50},
          shop : "Al Amaan",
          place: "Supper Stretch",
        },
        {
          id: "#007",
          name: "Paneer Tikka",
          picture: "https://www.cookwithmanali.com/wp-content/uploads/2015/07/Restaurant-Style-Recipe-Paneer-Tikka-500x375.jpg",
          category: "Tandoori",
          sizes: ['S','M','L'],
          price: {'S':8.50,'M':10.50,'L':12.50},
          shop : "Al Amaan",
          place: "Supper Stretch"
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
            place: "Supper Stretch"
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
