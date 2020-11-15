<template>
  <div>
    <b-carousel
      id="carousel-1"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide img-src="@/assets/befrank.jpg"></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="@/assets/hk.jpg"></b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="@/assets/fongseng.jpg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/formosa.jpg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/nanathai.jpg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/cheeseprata.jpg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/makan1.png"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/amaans.jpg"></b-carousel-slide>
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
  max-height: 400px;
  max-width: 400px;
  display: inline-block;
}
</style>