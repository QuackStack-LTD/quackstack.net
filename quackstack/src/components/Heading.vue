<template>
  <div
    class="flex flex-row font-poppins mx-auto flex-wrap w-full items-center justify-between max-lg:text-center max-lg:gap-y-10 max-lg:justify-center">
    <div
      class="flex flex-col text-white text-[3.5rem] max-sm:text-[2.2rem] max-md:text-[2.8rem] font-semibold max-w-[30rem] gap-y-15 max-lg:gap-y-10 max-md:max-w-full">
      <div class="flex flex-col max-lg:items-center">
        <p>Your vision</p>
        <p class="flex flex-row gap-x-3 p-0 m-0">
          <span class="text-amber-400">Brought</span> to life.
        </p>
      </div>
      <div
        class="text-[1.2rem] max-w-full font-light max-sm:text-[1rem] w-full max-md:w-[calc(100%-5rem)] max-md:items-center max-md:mx-auto max-lg:px-4">
        <h>Our team delivers tailored software solutions, optimizing your system requirements, integration, and
          scalability to ensure exceptional performance and success.</h>
      </div>
    </div>
    <div>
      <img src="@/assets/laptop.svg" class="laptop">
    </div>
  </div>


</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeroHeading',
})
</script>

<style scoped>
@media(min-width: 1024px) and (max-width: 1282px) {
  .laptop {
    width: 20vw;
  }
}

@media(min-width: 1283px) {
  .laptop {
    width: 30vw;
  }
}
</style>
