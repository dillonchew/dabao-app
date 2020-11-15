<template>
<div style="margin-bottom:50px;">
  <!-- banner -->
    <b-container fluid class="p-4" style="background-color: #e6ebff;">
      <b-img rounded ='circle' src="@/assets/FongSeng-Logo.jpg" alt="Image 1"></b-img>
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
        <label><input type="radio" v-model="selectedCategory" value="All" />All</label><br>
        <label><input type="radio" v-model="selectedCategory" value="BtB" /> Back to Basics</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Premium" /> Premium Add Ons</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Add" /> Add-Ons</label><br>
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
      description :"Mr Fong who is the owner, is the 1st generation and he came up with his special recipe in cooking authentic tasting nasi lemak. Its inception of business began in 1988 from the area of PSA hawker centre, where now, it has been relocated to Clementi. The eatery is also a supplier of banana leaves to its merchants of the F&B trade.",
      itemsList: [
        {
          id: "#001",
          name: "Nasi Lemak",
          picture: 'https://www.kuali.com/wp-content/uploads/2016/06/Nasi-Lemak.jpg',
          category: "BtB",
          sizes: ['Ala-carte'],
          price: {'Ala-carte':2.00},
          shop : "Fong Seng",
          place: "Supper Stretch",
        },
       {
          id: "#002",
          name: "Chicken Wing",
          picture: 'https://farm6.static.flickr.com/5283/5284868318_267233ba49.jpg',
          category: "BtB",
          sizes: ['1pc','2pc','3pc'],
          price: {'1pc':1.30,'2pc':2.60,'3pc':3.90},
          shop : "Fong Seng",
          place: "Supper Stretch",
        },
       {
          id: "#003",
          name: "Otak Otak",
          picture: 'https://c2.staticflickr.com/1/537/31760182865_026181c360_b.jpg',
          category: "BtB",
          sizes: ['1pc','2pc','3pc'],
          price: {'1pc':1.20,'2pc':2.40,'3pc':3.60},
          shop : "Fong Seng",
          place: "Supper Stretch",
        },
        {
          id: "#004",
          name: "Kuning Fish",
          picture: 'https://lh3.googleusercontent.com/proxy/Lk6yTSxzVHgD2Gn9Gfj3GFNoCHJ3FYp5Re2KAIiHu5cCX-Q5QQK44B5CqJ6OXcgZbPZLdQRNLShu5VcUwJ42yrDMvnDQD5C373upJfuzrrS2zYcb95YDOZK6',
          category: "BtB",
          sizes: ['1pc','2pc','3pc'],
          price: {'1pc':0.70,'2pc':1.40,'3pc':2.10},
          shop : "Fong Seng",
          place: "Supper Stretch",
        },
       {
          id: "#004",
          name: "Grilled Teriyaki Chicken",
          picture: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4530047.jpg&q=85',
          category: "Premium",
          sizes: ['1pc','2pc','3pc'],
          price: {'1pc':2.50,'2pc':5.00,'3pc':7.50},
          shop : "Fong Seng",
          place: "Supper Stretch",
        },
       {
          id: "#004",
          name: "Seaweed Chicken",
          picture: 'https://cdn.shopify.com/s/files/1/0207/5980/6016/products/FrozenCrispyChickenwithSeaweed_1024x.jpg?v=1587991562',
          category: "Add",
          sizes: ['1pc','2pc','3pc'],
          price: {'1pc':0.60,'2pc':1.20,'3pc':1.80},
          shop : "Fong Seng",
          place: "Supper Stretch",
        },
        {
          id: "#007",
          name: "Sotong Ball ",
          picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR46uX0IO-wqHOUYVSulI7_B81E-D1UdyRS8w&usqp=CAU",
          category: "Add",
          sizes: ['1pc','2pc','3pc'],
          price: {'1pc':0.60,'2pc':1.20,'3pc':1.80},
          shop : "Fong Seng",
          place: "Supper Stretch",
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
