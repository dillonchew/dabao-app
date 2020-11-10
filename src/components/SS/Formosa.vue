<template>
<div style="margin-bottom:50px;">
  <!-- banner -->
    <b-container fluid class="p-4 bg-warning">
      <b-img rounded ='circle' src="@/assets/Formosa-Logo.png" alt="Image 1"></b-img>
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
        <label><input type="radio" v-model="selectedCategory" value="NoodlesandRice" /> Handmade Noodles and Rice</label><br>
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
      description :"QUALITY HANDMADE NOODLES AND PASTRIES SINCE 1998",
      itemsList: [
        {
          id: "#001",
          name: "Knife Shaven Noodle in Special Broth",
          picture: 'https://images.squarespace-cdn.com/content/v1/57cef0daf7e0ab654b8ac8cd/1473182241014-VP2SUIX04H1F37PEX8Y7/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0pE4cef1KNtWo36k-CFnr6wOF2g5O-PFkVuvW_ba6dQUZZpzEt6WQHHQe4EHY-NJIA/Knife+Shaven+Noodle+%E5%88%80%E5%89%8A%E9%9D%A2.jpg?format=2500w',
          category: "NoodlesandRice",
          sizes: ['Beef', 'Chicken', 'Pork'],
          price: {'Beef': 11.90,'Chicken':11.90,'Pork':11.90},
          shop : "Formosa",
          place: "Supper Stretch"
        },
        {
          id: "#002",
          name: "Reserved Ma La Broth Handmade Noodle",
          picture: "https://s3.burpple.com/foods/6128d35db1a42d3a8be1743968_original.?1557038288",
          category: "NoodlesandRice",
          sizes: ['Beef', 'Chicken', 'Pork'],
          price: {'Beef': 12.90,'Chicken':12.90,'Pork':12.90},
          shop : "Formosa",
          place: "Supper Stretch"
        },
        {
          id: "#003",
          name: "Taiwanese Style Braised Pork Rice",
          picture: "https://4.bp.blogspot.com/-2NbBLnfVueg/VvvJDydcUFI/AAAAAAAAQpI/Fkac4oZdx8gnA05z1ZGdi6JjgEFMpOYhw/s1600/IMG_5322.jpg",
          category: "NoodlesandRice",
          sizes: ['Pork'],
          price: {'Pork':12.90},
          shop : "Formosa",
          place: "Supper Stretch"
        },
        {
            id: "#004",
            name: "Soft Drinks",
            picture: "https://forecourtretailer.com/wp-content/uploads/2020/03/Cans_LINEUP_5_V2-2.png",
            category: "Beverages",
            sizes: ['Coke', 'Coke Light', 'Coke Zero', 'Sprite', 'Fanta Orange', 'Green Tea'],
            price: {'Coke':2.50, 'Coke Light':2.50, 'Coke Zero':2.50, 'Fanta Orange':2.50, 'Green Tea':2.50},
            shop : "Formosa",
            place: "Supper Stretch"
        },
        {
            id: "#099",
            name: "Pan Fried Handmade Dumpling",
            picture: "https://i.hungrygowhere.com/rnr/food/49673/de040400/b46f334c31c5a93a429f5e10d196d501_1463446970_800x0_crop_800x0_bbbf8dabc1.jpg",
            category: "Sides",
            sizes: ['6pc', '12pc'],
            price: {'6pc': 8.40, '12pc': 16.80,},
            shop : "Formosa",
            place: "Supper Stretch"
        },
        {
            id: "#005",
            name: "Fried Rice",
            picture: "https://www.thespruceeats.com/thmb/GnNnjMcyaO2fDSbCrZenTP2JO9k=/2578x2578/smart/filters:no_upscale()/yangchow-fried-rice-641937034-5ac2a887a18d9e003728c459.jpg",
            category: "NoodlesandRice",
            sizes: ['YangZhou', 'Beef', 'Seafood'],
            price: {'YangZhou': 9.90, 'Beef': 10.40, 'Seafood': 10.90},
            shop : "Formosa",
            place: "Supper Stretch"
        },
        {
            id: "#006",
            name: "Sweet and Sour Pork",
            picture: "https://d1sag4ddilekf6.cloudfront.net/compressed/items/SGDD06489ITM0562975/photo/upload-photo-icon_7015077417bd4b2080ae932ab472369f_1554261623188629011.jpeg",
            category: "Sides",
            sizes: ['M', 'L'],
            price: {'M': 14.90, 'L': 20.00},
            shop : "Formosa",
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
