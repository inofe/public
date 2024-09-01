

/* görünür ekran alanında çalışacak animasyon için js */
window.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.contentEnterBottom, .contentEnterLeft, .contentEnterRight');
  var windowHeight = window.innerHeight;

  elements.forEach(function(element) {
    var position = element.getBoundingClientRect().top;

    if (position < windowHeight) {
      element.classList.add('show');
    }
  });
});
/* görünür ekran alanında çalışacak animasyon için js */
/* ------------------------------------------------------------------------------------------------------- */
/* carousel için js */
document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.custom-carousel');

    function updateCarousel(carousel, direction) {
        const visibleItems = window.innerWidth < 768 ? 1 : parseInt(carousel.getAttribute('data-visible'), 10) || 1;
        const centerActive = carousel.getAttribute('data-center-active') === 'true';
        const inner = carousel.querySelector('.custom-carousel-inner');
        const items = inner.querySelectorAll('.custom-carousel-item');
        const paginationItems = carousel.querySelectorAll('.paginationItem');

        let activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
        let newIndex;

        if (direction === 'next') {
            newIndex = (activeIndex + 1) % items.length;
        } else if (direction === 'prev') {
            newIndex = (activeIndex - 1 + items.length) % items.length;
        } else if (direction === 'resize') {
            newIndex = activeIndex;
        }

        items.forEach(item => item.classList.remove('active'));
        paginationItems.forEach(paginationItem => paginationItem.classList.remove('paginationItemActive'));
        items[newIndex].classList.add('active');
        paginationItems[newIndex].classList.add('paginationItemActive');

        let offset = -newIndex * (100 / visibleItems);
        if (centerActive && window.innerWidth >= 768) {
            offset += (100 / visibleItems) * Math.floor(visibleItems / 2);
        }

        inner.style.transition = 'transform 1s ease';
        inner.style.transform = `translateX(${offset}%)`;
    }

    carousels.forEach(carousel => {
        const visibleItems = parseInt(carousel.getAttribute('data-visible'), 10) || 1;
        const activeIndex = parseInt(carousel.getAttribute('data-active'), 10) || 0;
        const centerActive = carousel.getAttribute('data-center-active') === 'true';
        const autoSlideDuration = parseInt(carousel.getAttribute('data-auto-slide'), 10) || 0;
        const inner = carousel.querySelector('.custom-carousel-inner');
        const items = inner.querySelectorAll('.custom-carousel-item');
        const paginationBox = carousel.querySelector('.paginationBox');
        const paginationItems = [];

        carousel.style.setProperty('--visible-items', visibleItems);

        // Pagination öğelerini oluştur
        items.forEach((item, index) => {
            const paginationItem = document.createElement('div');
            paginationItem.classList.add('paginationItem');
            paginationItem.addEventListener('click', function () {
                items.forEach(item => item.classList.remove('active'));
                paginationItems.forEach(paginationItem => paginationItem.classList.remove('paginationItemActive'));
                items[index].classList.add('active');
                paginationItem.classList.add('paginationItemActive');
                updateCarousel(carousel, 'resize'); // Carousel'ı güncelle
            });
            paginationBox.appendChild(paginationItem);
            paginationItems.push(paginationItem);
        });

        // Set the initial active item
        items.forEach(item => item.classList.remove('active'));
        items[activeIndex].classList.add('active');
        paginationItems[activeIndex].classList.add('paginationItemActive');

        let offset = -activeIndex * (100 / visibleItems);
        if (centerActive) {
            offset += (100 / visibleItems) * Math.floor(visibleItems / 2);
        }
        inner.style.transform = `translateX(${offset}%)`;

        const controls = carousel.querySelectorAll('.custom-carousel-control');
        controls.forEach(control => {
            control.addEventListener('click', function () {
                const direction = this.classList.contains('custom-next') ? 'next' : 'prev';
                updateCarousel(carousel, direction);
            });
        });

        window.addEventListener('resize', () => {
            updateCarousel(carousel, 'resize');
        });

        // Parmakla kaydırma olaylarını ekle
        let startX = 0;
        let isDragging = false;

        inner.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            inner.style.transition = 'none'; // Geçişleri kapat
        });

        inner.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].clientX;
            const deltaX = x - startX;
            const percentage = deltaX / inner.offsetWidth * 100;
            let offset = parseFloat(inner.style.transform.replace('translateX(', '').replace('%)', '')) + percentage;
            inner.style.transform = `translateX(${offset}%)`;
        });

        inner.addEventListener('touchend', (e) => {
            isDragging = false;
            inner.style.transition = 'transform 1s ease'; // Geçişleri geri aç
            const deltaX = e.changedTouches[0].clientX - startX;
            if (Math.abs(deltaX) > inner.offsetWidth / 4) { // Mesafeyi artırdık
                const direction = deltaX < 0 ? 'next' : 'prev';
                updateCarousel(carousel, direction);
            } else {
                updateCarousel(carousel, 'resize');
            }
        });

        // Automatic sliding
        if (autoSlideDuration > 0) {
            setInterval(() => {
                updateCarousel(carousel, 'next');
            }, autoSlideDuration);
        }
    });
});

/* carousel için js */
/* ------------------------------------------------------------------------------------------------------- */
/* 0'dan başlayım html elementine girilen sayıya kadar arttıran js COUNTER */

/* örnek kullanım
<span class="counter" data-target="30">0</span>
counter classı atanmış htlm elementinin içine tam sayı girilerek kullanılır. girilen tam sayıdan data-target
değerine kadar arttırır.
*/
document.addEventListener('DOMContentLoaded', function() {
    function animateCounter(element, targetValue, duration) {
        var startValue = parseInt(element.textContent);
        var startTime = performance.now();

        function formatNumberWithCommas(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        function updateCounter(timestamp) {
            var elapsedTime = timestamp - startTime;
            var progress = Math.min(elapsedTime / duration, 1);
            var currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
            element.textContent = formatNumberWithCommas(currentValue);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Intersection Observer callback function
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                var counter = entry.target;
                var targetValue = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, targetValue, 2000); // 2 saniyede hedef değere ulaş
                observer.unobserve(counter); // Once animated, stop observing the element
            }
        });
    }

    // Create a new Intersection Observer
    var observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1 // Elementin %10'u görünür olduğunda callback tetiklenir
    });

    // Tüm .counter sınıfına sahip elementleri seç ve gözlemle
    var counters = document.querySelectorAll('.counter');
    counters.forEach(function(counter) {
        observer.observe(counter);
    });
});


/* COUNTER İÇİN JS SONU */
/* CUSTOM İNFİNİTE CAROUSEL START */
function initializeCustomAnimations() {
    const wrappers = document.querySelectorAll('.custom-infinite-carousel');

    wrappers.forEach(wrapper => {
        const id = wrapper.id;
        const boxes = wrapper.querySelector('.custom-infinite-carousel-box');
        const boxItems = wrapper.querySelectorAll('.custom-infinite-carousel-item');
        const visibleItem = parseInt(wrapper.getAttribute("visibleItem"));
        
        const boxWidth = wrapper.offsetWidth / (visibleItem -1);
        
        const movementAmount = wrapper.offsetWidth + boxWidth ;
        
        boxItems.forEach(box => {
            box.style.width = boxWidth + 'px';
        });

        const target = wrapper.getAttribute('data-target');
        const duration = parseInt(wrapper.getAttribute('data-duration'));

        // Set initial position based on the target attribute
        const direction=(target === 'left') ? boxes.style.right = -boxWidth+ 'px' : boxes.style.left = -boxWidth+ 'px' ;
        /* console.log(target)
        console.log(boxes.offsetWidth)
        console.log(boxes.style.left = -boxWidth+ 'px') */
        

        // Elementin pozisyonunu al
        const rect = boxes.getBoundingClientRect();

        // X ve Y pozisyonlarını ekrana yazdır
        console.log(`X: ${rect.x}, Y: ${rect.y}`);

        gsap.set(`#${id} .custom-infinite-carousel-item`, {
            
            x: (i) => i * boxWidth
        });

        const animation = gsap.to(`#${id} .custom-infinite-carousel-item`, {
            duration: duration,
            ease: "none",
            x: (target === 'left') ? "-=" + movementAmount : "+=" + movementAmount,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % movementAmount)
            },
            repeat: -1
        });

        // Touch events for swipe
        let startX = 0;
        let isDragging = false;
        let currentX = 0;
        let dragOffset = 0;

        wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            animation.pause(); // Pause the GSAP animation
        });

        wrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            dragOffset = currentX - startX;
            if (Math.abs(dragOffset) <= 50) {
                gsap.set(boxes, { x: dragOffset });
            }
        });

        wrapper.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            if (Math.abs(dragOffset) > boxWidth / 2) {
                if (dragOffset < 0) {
                    gsap.to(boxes, {
                        duration: 0.3,
                        x: '-=' + boxWidth,
                        onComplete: () => animation.play()
                    });
                } else {
                    gsap.to(boxes, {
                        duration: 0.3,
                        x: '+=' + boxWidth,
                        onComplete: () => animation.play()
                    });     
                }
            } else {
                gsap.to(boxes, { duration: 0.3, x: 0, onComplete: () => animation.play() });
            }
            startX = 0;
            dragOffset = 0;
        });
    });
}

initializeCustomAnimations(); // Initialize animations when the script is loaded



  /* <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script> */
/* CUSTOM İNFİNİTE CAROUSEL END */

/* zıkkımın kökü büyük resimli galeri modal kullanımlı */
const bigImg = document.querySelector('.custom-gallery-box-bigImg');
        const thumbnails = document.querySelectorAll('.custom-gallery-box-items img');
        const modal = document.getElementById("myModal");
        const modalImg = document.getElementById("modalImg");
        const closeBtn = document.querySelector('.modal-close-button');
        const prevBtn = document.querySelector('.modal-prev-button');
        const nextBtn = document.querySelector('.modal-next-button');
        let currentImageIndex = 0;
        /*  */
        // sayfa yüklendiğinde ilk resmi göstermek için
        window.addEventListener('load', function () {
            // boxitems içindeki ilk img'i alalım
            const firstThumbnail = document.querySelector('.custom-gallery-box-items img');
            // bigImg içine ilk img'in src'sini koyarak gösterelim
            bigImg.style.backgroundImage = `url(${firstThumbnail.src})`;
        });
        /*  */
        function moveBoxItems(direction) {
            const boxItems = document.querySelector('.custom-gallery-box-items');
            const stepSize = thumbnails[0].offsetWidth; // Her adımda kaç piksel kaydırılacağı (ilk resmin genişliği)
            const currentPosition = boxItems.scrollLeft; // Mevcut kaydırma konumu
            const newPosition = currentPosition + (direction * stepSize); // Yeni kaydırma konumu
            boxItems.scrollTo({
                left: newPosition,
                behavior: 'smooth' // Yumuşak bir geçiş sağlar
            });
        }
        /*  */
        const prevBoxBtn = document.querySelector('.custom-gallery-box-prevBox');
        const nextBoxBtn = document.querySelector('.custom-gallery-box-nextBox');

        prevBoxBtn.addEventListener('click', function () {
            moveBoxItems(-1); // Geriye gitmek için -1
        });

        nextBoxBtn.addEventListener('click', function () {
            moveBoxItems(1); // İleri gitmek için 1
        });

        function moveBoxItems(direction) {
            const boxItems = document.querySelector('.custom-gallery-box-items');
            const stepSize = 100; // Her adımda kaç piksel kaydırılacağı
            const currentPosition = boxItems.scrollLeft; // Mevcut kaydırma konumu
            const newPosition = currentPosition + (direction * stepSize); // Yeni kaydırma konumu
            boxItems.scrollTo({
                left: newPosition,
                behavior: 'smooth' // Yumuşak bir geçiş sağlar
            });
        }

        /*  */
        const firstImg = document.querySelector('.custom-gallery-box-items img');
        function showImage(index) {
            modalImg.src = thumbnails[index].src;
            currentImageIndex = index;
        }

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', function () {
                bigImg.style.backgroundImage = `url(${this.src})`;
                showImage(index);
            });
        });

        bigImg.addEventListener('click', function () {
            modal.style.display = "block";
            showImage(currentImageIndex); // Show the first image in the modal
        });

        closeBtn.addEventListener('click', function () {
            modal.style.display = "none";
        });

        prevBtn.addEventListener('click', function () {
            currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
            showImage(currentImageIndex);
        });

        nextBtn.addEventListener('click', function () {
            currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
            showImage(currentImageIndex);
        });

        // Close modal when clicking outside of the modal content
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });

        // Close modal when pressing Escape key
        window.addEventListener('keydown', function (event) {
            if (event.key === "Escape" && modal.style.display === "block") {
                modal.style.display = "none";
            }
        });

        /* büyük resimli galeri modal kulllanımlı end */