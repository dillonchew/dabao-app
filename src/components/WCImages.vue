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
      <b-carousel-slide img-src="@/assets/macs_wcp1.jpg"></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="@/assets/macs_wcp2.jpg"></b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="@/assets/rongliang1.jpg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/rongliang2.jpg"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/bk1.png"></b-carousel-slide>

      <b-carousel-slide img-src="@/assets/bk2.png"></b-carousel-slide>
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