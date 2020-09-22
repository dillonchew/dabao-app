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
      <b-carousel-slide img-src="@/assets/yakun.jpg"></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="@/assets/oldchangkee.jpg"></b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="@/assets/stuffd.jpeg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/crave-the-clementi-mall.jpg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/mr coconut.jpeg"></b-carousel-slide>
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