<template>
 
    <div class="herobanner">
      <SlideShow 
        :images="[
          './images/hero1.jpg',
          './images/hero2.jpg',
          './images/hero3.jpg'
        ]"
        :auto-play-interval="5000"
      />
    </div>

    <div class="category">
        <ShopCategory />
    </div>

    <div class="products">
        <AllProducts/>
    </div>
</template>