<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        img-src="https://burpple-2.imgix.net/venue_images/screenshot_2019-09-19_at_10-20-19_am-png_5912_original?w=400&h=400&fit=crop&q=80&auto=format"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide
        img-src="https://media-cdn.tripadvisor.com/media/photo-s/16/93/00/44/caption.jpg"
      ></b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide
        img-src="https://media-cdn.tripadvisor.com/media/photo-s/16/92/fc/a5/caption.jpg"
      ></b-carousel-slide>

      <b-carousel-slide
        img-src="https://metercube.com.sg/wp-content/gallery/20-clementi-road/formosa-03-800x533.jpg"
      ></b-carousel-slide>

      <b-carousel-slide
        img-src="https://secureservercdn.net/198.71.233.163/cf3.819.myftpupload.com/wp-content/uploads/2018/04/nana-clementi-1.jpg?time=1597294677"
      ></b-carousel-slide>

      <b-carousel-slide
        img-src="https://uncoverasia.com/wp-content/uploads/2019/07/Niqqis-The-Cheese-Prata-Shop-Exterior-1.jpg"
      ></b-carousel-slide>

      <b-carousel-slide
        img-src="https://scontent.fsin4-1.fna.fbcdn.net/v/t1.0-0/c0.2.206.206a/p206x206/71047890_101278314605924_8751918652208447488_o.png?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=dYjhMAelF-IAX_CTtbD&_nc_ht=scontent.fsin4-1.fna&oh=b8534a30f2db1d0ccfbc884c1b5d86ae&oe=5F8E59B6"
      ></b-carousel-slide>

      <b-carousel-slide
        img-src="https://lh3.googleusercontent.com/proxy/rx-d9TEXQ_9XS-tWNOfKH5l5ADjVaFrZfga7jyYZjazYXYnVgcCaprfyfri5QkPLgd2T6hytLPa9M6jnNZF6K7L3mS8KNcMqr32epYEsAwIA5Q"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>

<style scoped>
#carousel-1 {
  width: 400px;
  max-height: 200px;
  display: inline-block;
}
</style>