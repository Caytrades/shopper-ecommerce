<template>
    <div 
      class="relative w-full h-[600px] overflow-hidden"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
    >
      <!-- Sliding Image Container -->
      <transition-group 
        name="slide" 
        tag="div" 
        class="absolute w-full h-full"
      >
        <div 
          v-for="(image, index) in images" 
          v-show="index === currentIndex"
          :key="index"
          class="absolute w-full h-full"
        >
          <img 
            :src="image" 
            :alt="`Slide ${index + 1}`"
            class="w-full h-full object-cover"
          />
        </div>
      </transition-group>
  
      <!-- Navigation Buttons -->
      <button 
        @click="prevSlide"
        class="absolute left-4 top-1/2 -translate-y-1/2 
        bg-black/50 text-white p-2 rounded-full hover:bg-black/75 
        transition-colors z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button 
        @click="nextSlide"
        class="absolute right-4 top-1/2 -translate-y-1/2 
        bg-black/50 text-white p-2 rounded-full hover:bg-black/75 
        transition-colors z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
  
      <!-- Pagination Dots -->
      <div 
        class="absolute bottom-4 left-1/2 -translate-x-1/2 
        flex space-x-2 z-10"
      >
        <button
          v-for="(_, index) in images"
          :key="index"
          @click="setSlide(index)"
          :class="[
            'w-3 h-3 rounded-full transition-colors',
            index === currentIndex 
              ? 'bg-white' 
              : 'bg-white/50 hover:bg-white/75'
          ]"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    images: {
      type: Array,
      required: true
    },
    autoPlayInterval: {
      type: Number,
      default: 5000
    }
  });
  
  const currentIndex = ref(0);
  const autoplayTimer = ref(null);
  
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
  };
  
  const prevSlide = () => {
    currentIndex.value = 
      currentIndex.value === 0 
        ? props.images.length - 1 
        : currentIndex.value - 1;
  };
  
  const setSlide = (index) => {
    currentIndex.value = index;
  };
  
  const startAutoplay = () => {
    autoplayTimer.value = setInterval(nextSlide, props.autoPlayInterval);
  };
  
  const pauseAutoplay = () => {
    if (autoplayTimer.value) {
      clearInterval(autoplayTimer.value);
    }
  };
  
  const resumeAutoplay = () => {
    startAutoplay();
  };
  
  onMounted(() => {
    startAutoplay();
  });
  
  onUnmounted(() => {
    pauseAutoplay();
  });
  </script>
  
  <style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s ease;
  }
  
  .slide-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }
  
  .slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
  
  .slide-enter-to,
  .slide-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  </style>