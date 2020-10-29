<template>
  <div>
    <b-container fluid class="p-4 bg-warning">
      <b-img rounded ='circle' src="@/assets/BK-Logo.jpg" alt="Image 1"></b-img>
      <br>
      <br>
      <h5 style = "color : #660066">The original HOME OF THE WHOPPER®, our commitment to premium ingredients, signature recipes, and family-friendly dining experiences is what has defined our brand for more than 50 successful years.</h5>
    </b-container>

  <div class="row mt-4">

    <!--ProductList-->
    <div class="col-sm-2">

      <b-button pill variant="outline-secondary" v-on:click="isHidden = !isHidden" style="float: left;margin-left:25px;">Filter
        <b-icon icon="filter-square-fill"></b-icon>
      </b-button><br />
      <div class = "filters" v-if = "!isHidden">
        <label><input type="radio" v-model="selectedCategory" value="All" /> All</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Burger" /> Burgers</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Beverages" /> Beverages</label><br>
        <label><input type="radio" v-model="selectedCategory" value="Sides" /> Sides</label><br>
      </div>
      </div>

    <div class="col-sm-7">
    <ul> 
      <li v-for="item in filteredItem" :key="item.id">
        <h3>{{ item.name }}</h3>
        <img
          v-bind:src= item.picture style = 'object-fit: contain'>
        <p>Price : {{ item.price }}</p>
        <b-button
            @click="updateCart(item, 'subtract')"
        >-</b-button>
        <span>{{ item.quantity }}</span>
        <b-button
          @click="updateCart(item, 'add')"
        >+</b-button>
      </li>
    </ul>
    </div>
    <!--Cart-->
    <div class="col-sm-3">
     <div class = "card bg-warning mb-3" style= "width : 80%;color:#660066;">
    <h5 class="card-title">What you have </h5>
    <p class = 'card-text'>Total : ${{ totalQuantity }}</p>
        <ul class="list-group">
        <li 
        v-for="item in cart"
        :key="item.id"
        >
        {{ item.name }} ({{ item.quantity }}) - ${{ item.total }}
        </li>
        </ul>
        <div class = 'card-body'>
        add the thing here to pass into requests
        
        </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script>

export default {

  data(){
    return{
      selectedCategory: "All",
      isHidden: true,
      itemsList: [
        {
          id: "#001",
          name: "Mushroom Swiss TENDERGRILL Chicken",
          shop: "Burger King",
          picture: 'https://www.burgerking.com.sg/upload/image/Product/12/CF-mushroom-swiss-tendergrill-chicken-details.png',
          category: "Burger",
          price: 7.90,
          quantity: 0,
          total: 0
        },
        {
          id: "#002",
          name: "Fish Burger",
          shop: "Burger King",
          picture: "https://www.burgerking.com.sg/upload/image/Product/19/CF-FISH-N-CRISP-thumb.jpg",
          category: "Burger",
          price: 6.40,
          quantity: 0,
          total:0
        },
        {
            id: "#003",
            name: "Double Western WHOPPER",
            shop: "Burger King",
            picture: "https://www.burgerking.com.sg/upload/image/Product/3/0-burger-double-western-whopper-details.png",
            category: "Burger",
            price: 13.00,
            quantity: 0,
            total: 0
        },
        {
            id: "#004",
            name: "Coca-Cola",
            shop: "Burger King",
            picture: "https://www.burgerking.com.sg/upload/image/Product/34/beverage-coca-cola-details.png",
            category: "Beverages",
            price: 2.90,
            quantity: 0,
            total: 0
        },
        {
            id: "#099",
            name: "Sprite",
            shop: "Burger King",
            picture: "https://www.burgerking.com.sg/upload/image/Product/35/beverage-sprite-details.png",
            category: "Beverages",
            price: 2.90,
            quantity: 0,
            total: 0
        },
        {
            id: "#005",
            name: "French Fries",
            shop: "Burger King",
            picture: "https://www.burgerking.com.sg/upload/image/Product/55/sides-french-fries-details.png",
            category: "Sides",
            price: 3.00,
            quantity: 0,
            total: 0
        },
        {
            id: "#006",
            name: "Onion Rings",
            shop: "Burger King",
            picture: "https://www.burgerking.com.sg/upload/image/Product/53/sides-onionrings-details.png",
            category: "Sides",
            price: 3.40,
            quantity: 0,
            total: 0
        }
    ]}
},
computed :{
  cart() {
      return this.itemsList.filter(item => item.quantity > 0);
  },

  totalQuantity() {
    return (this.itemsList.reduce((t, item) => t + item.total,0)).toFixed(2);
     
  },

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

methods: {
  updateCart(item, updateType) {      
    for (let i = 0; i < this.itemsList.length; i++) {
      if (this.itemsList[i].id === item.id) {
        if (updateType === 'subtract') {
          if (this.itemsList[i].quantity !== 0) {
            this.itemsList[i].quantity--;
            this.itemsList[i].total = this.itemsList[i].total - this.itemsList[i].price
          }
        } else {
          this.itemsList[i].quantity++;
          this.itemsList[i].total = this.itemsList[i].total + this.itemsList[i].price
        }break;}
        }
      }
    }
}

  
</script>

<style scoped>
.filters {
	padding:0px;
	width: 90%;
	margin: 0 auto;
  text-align:left;
}

#itemsList{
    width: 100%;
    max-width: 1200px;
    margin: 30px auto;
    padding: 0 5px;
    box-sizing: border-box;
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
}

button {
  background-color: #660066;
  color: white;
}


</style>
