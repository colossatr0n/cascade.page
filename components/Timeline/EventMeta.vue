<template>
  <div
    class="bg-gray-900 rounded p-2 -mx-2 inline-flex mt-1 relative shadow-lg"
    style="max-width: 100vw"
  >
    <div class="ml-2 mr-3"></div>
    <div class="flex flex-row overflow-x-scroll items-center rounded">
      <template v-if="hasLocations">
        <iframe
          :class="{ 'mr-2': index !== locations.length - 1 || hasImages }"
          class="rounded flex-shrink-0"
          v-for="(location, index) in locations"
          :key="location"
          :src="location"
          style="border: 0"
          loading="lazy"
          width="600"
          height="450"
        ></iframe>
      </template>
      <template v-if="hasImages">
        <a
          :href="photosLink"
          v-for="(image, index) in images"
          :key="image"
          :class="{ 'mr-2': index !== images.length - 1 }"
        >
          <img :src="image" class="rounded max-w-none z-30"
        /></a>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["locations", "images"],
  computed: {
    hasImages(): boolean {
      return this.images && this.images.length > 0
    },
    hasLocations(): boolean {
      return this.locations.length > 0
    }
  },
});
</script>

<style>
</style>