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
      <b-carousel-slide img-src="@/assets/drinks copy.jpg"></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="@/assets/indian.jpg"></b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="@/assets/jap.jpg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/mala.jpg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/pasta.jpg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/muslim.jpg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/uncle penyet.jpg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/western copy.jpg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/ytf laksa.jpg"></b-carousel-slide>
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