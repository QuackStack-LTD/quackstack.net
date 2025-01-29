<template>
    <div class="flex flex-row gap-x-40 font-poppins mx-auto">
      <div class="flex flex-col text-white text-[50px] font-semibold max-w-[350px] gap-y-15">
        <div>
          <p>Your vison</p>
          <span class="flex flex-row gap-x-3 p-0 m-0">
            <p class="text-amber-400">Brought</p>
            <p>to live.</p>
          </span>
        </div>
        <div class="text-[17px] font-light">
          <h>Our team delivers tailored software solutions, optimizing your system requirements, integration, and scalability to ensure exceptional performance and success.</h>
        </div>
      </div>
      <div>
        <img src="@/assets/laptop.svg" class="w-[452px]">
      </div>
    </div>


  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'Heading',
  })
  </script>