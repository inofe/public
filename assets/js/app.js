
document.addEventListener('DOMContentLoaded', function () {
  // Check if an element with the class 'mySwiper' exists
  if (document.querySelector('.mySwiper')) {  // Add a dot to indicate class selector
    const swiperEl = document.querySelector(".mySwiper");
    Object.assign(swiperEl, {
        slidesPerView: 2,
        spaceBetween: 20,
      loop: true,
    

      breakpoints: {
        1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        992: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        
        
      },
    });
    swiperEl.initialize();
    
  }
  if (document.querySelector('.mySwiper2')) {  // Add a dot to indicate class selector
    const swiperEl2 = document.querySelector(".mySwiper2");
    Object.assign(swiperEl2, {
        slidesPerView: 2,
        spaceBetween: 20,
      loop: true,
    

      breakpoints: {
        1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        992: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        
        
      },
    });
    swiperEl2.initialize();
    
  }
});


