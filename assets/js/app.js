
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
if (document.querySelector('.menu')){
  document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Tüm içerikleri gizle
            contents.forEach(content => content.classList.remove('active'));
            // Tüm butonlardan aktif sınıfını kaldır
            buttons.forEach(btn => btn.classList.remove('active'));

            // Tıklanan butona aktif sınıfı ekle
            button.classList.add('active');
            // İlgili içeriği göster
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // İlk buton ve içerik varsayılan olarak aktif olsun
    buttons[0].classList.add('active');
    contents[0].classList.add('active');
});

  }

