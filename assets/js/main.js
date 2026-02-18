/*==================== SHOW MENU ====================*/
const navMenu  = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose  = document.getElementById('nav-close');

if (navToggle && navMenu){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose && navMenu){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(navMenu) navMenu.classList.remove('show-menu');
    });
});

/*==================== CHANGE BACKGROUND HEADER ====================*/
const header = document.getElementById('header');

function scrollHeader(){
    if(!header) return;

    if (window.scrollY >= 100){
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/*==================== SWIPER DISCOVER ====================*/
if (typeof Swiper !== "undefined") {
    new Swiper(".discover__container", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        spaceBetween: 32,
        coverflowEffect: {
            rotate: 0,
        },
    });
}

/*==================== VIDEO ====================*/
const videoFile   = document.getElementById('video-file'),
      videoButton = document.getElementById('video-button'),
      videoIcon   = document.getElementById('video-icon');

if (videoFile && videoButton && videoIcon){

    videoButton.addEventListener('click', () => {
        if (videoFile.paused){
            videoFile.play();
            videoIcon.classList.add('ri-pause-line');
            videoIcon.classList.remove('ri-play-line');
        } else {
            videoFile.pause();
            videoIcon.classList.remove('ri-pause-line');
            videoIcon.classList.add('ri-play-line');
        }
    });

    videoFile.addEventListener('ended', () => {
        videoIcon.classList.remove('ri-pause-line');
        videoIcon.classList.add('ri-play-line');
    });
}

/*==================== SHOW SCROLL UP ====================*/
const scrollUpBtn = document.getElementById('scroll-up');

function scrollUp(){
    if(!scrollUpBtn) return;

    if (window.scrollY >= 200){
        scrollUpBtn.classList.add('show-scroll');
    } else {
        scrollUpBtn.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;
        const sectionId = section.getAttribute('id');

        const activeLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

        if(!activeLink) return;

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            activeLink.classList.add('active-link');
        } else {
            activeLink.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== SCROLL REVEAL ====================*/
if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
        distance: '60px',
        duration: 2800,
    });

    sr.reveal(`.home__data, .home__social-link, .home__info,
               .discover__container,
               .experience__data, .experience__overlay,
               .place__card,
               .sponsor__content,
               .footer__data, .footer__rights`, {
        origin: 'top',
        interval: 100,
    });

    sr.reveal(`.about__data, 
               .video__description,
               .subscribe__description`, {
        origin: 'left',
    });

    sr.reveal(`.about__img-overlay, 
               .video__content,
               .subscribe__form`, {
        origin: 'right',
        interval: 100,
    });
}

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

if (themeButton){

    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon  = localStorage.getItem('selected-icon');

    const getCurrentTheme = () =>
        document.body.classList.contains(darkTheme) ? 'dark' : 'light';

    const getCurrentIcon = () =>
        themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

    if (selectedTheme){
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
    }

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);

        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}
/*==================== GALLERY ====================*/

const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".gallery-filters button");
const toggleButton = document.getElementById("toggleBtn");

let currentFilter = "all";
let showAll = false;
const defaultVisible = 6;

/*========== FILTERS ==========*/

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        const activeBtn = document.querySelector(".gallery-filters .active");
        if(activeBtn) activeBtn.classList.remove("active");

        button.classList.add("active");
        currentFilter = button.dataset.filter;

        showAll = false;
        if(toggleButton) toggleButton.innerText = "Show More";

        updateGallery();
    });
});

/*========== SHOW MORE / LESS ==========*/

if(toggleButton){
    toggleButton.addEventListener("click", () => {
        showAll = !showAll;
        toggleButton.innerText = showAll ? "Show Less" : "Show More";
        updateGallery();
    });
}

/*========== UPDATE FUNCTION ==========*/

function updateGallery(){
    let visibleCount = 0;

    galleryItems.forEach(item => {

        if(currentFilter === "all" || item.classList.contains(currentFilter)){

            if(showAll || visibleCount < defaultVisible){
                item.style.display = "block";
                visibleCount++;
            }else{
                item.style.display = "none";
            }

        }else{
            item.style.display = "none";
        }
    });
}

updateGallery();

/*========== LIGHTBOX ==========*/

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("closeBtn");

galleryItems.forEach(item => {
    const img = item.querySelector("img");

    if(img){
        img.addEventListener("click", () => {
            if(lightbox && lightboxImg){
                lightbox.style.display = "flex";
                lightboxImg.src = img.src;
            }
        });
    }
});

/* CLOSE LIGHTBOX */

if(closeBtn && lightbox){
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
}

/* CLICK OUTSIDE IMAGE CLOSE */

if(lightbox){
    lightbox.addEventListener("click", (e) => {
        if(e.target === lightbox){
            lightbox.style.display = "none";
        }
    });
}

const mainImage = document.querySelector('.tour__main-img');
const thumbs = document.querySelectorAll('.tour__thumb');

thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        mainImage.src = thumb.src;
    });
});


document.addEventListener("DOMContentLoaded", () => {

  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  /* =====================================================
     MAP INIT (ONLY ONCE)
  ===================================================== */

  const map = L.map('map').setView([7.8731, 80.7718], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  /* =====================================================
     LOCATIONS
  ===================================================== */

  const locations = {
    colombo: [6.9271, 79.8612, 11],
    kandy: [7.2906, 80.6337, 11],
    sigiriya: [7.9570, 80.7603, 12],
    galle: [6.0535, 80.2210, 12],
    wild: [6.4745, 80.8987, 11],

    anuradhapura: [8.3114, 80.4037, 13],
    polonnaruwa: [7.9403, 81.0188, 13],
    ella: [6.8667, 81.0466, 13],
    yala: [6.3725, 81.5185, 13],
    mirissa: [5.9483, 80.4716, 13]
  };

  /* =====================================================
     MARKERS
  ===================================================== */

  const markers = {};
  let activeMarker = null;

  Object.entries(locations).forEach(([key, value]) => {
    const [lat, lng] = value;

    const marker = L.marker([lat, lng])
      .addTo(map)
      .bindPopup(key.toUpperCase());

    markers[key] = marker;
  });

  function moveMap(key) {

    if (!locations[key]) return;

    const [lat, lng, zoom] = locations[key];

    map.flyTo([lat, lng], zoom, {
      animate: true,
      duration: 1.2
    });

    if (activeMarker) activeMarker.closePopup();

    if (markers[key]) {
      activeMarker = markers[key];
      activeMarker.openPopup();
    }
  }

  /* =====================================================
     TOUR PLANS
  ===================================================== */

  const tourPlans = {

    colombo: [
      "Hotel Pick-up",
      "Gangaramaya Temple",
      "Independence Square",
      "Colombo National Museum",
      "Galle Face Green",
      "Shopping Experience",
      "Return to Hotel"
    ],

    kandy: [
      "Hotel Pick-up",
      "Pinnawala Elephant Orphanage",
      "Temple of the Sacred Tooth Relic",
      "Kandy Lake",
      "Royal Botanical Gardens",
      "Cultural Dance Show",
      "Return"
    ],

    sigiriya: [
      "Hotel Pick-up",
      "Sigiriya Rock Fortress",
      "Sigiriya Museum",
      "Dambulla Cave Temple",
      "Village Tour",
      "Return"
    ],

    galle: [
      "Hotel Pick-up",
      "Galle Fort",
      "Lighthouse",
      "Dutch Church",
      "Unawatuna Beach",
      "Return"
    ],

    wild: [
      "Hotel Pick-up",
      "National Park Safari",
      "Wildlife Viewing",
      "Return"
    ]
  };

  const planTabs = document.querySelectorAll(".plan__tab");
  const planList = document.getElementById("plan-list");

  if (planTabs.length && planList) {

    function loadTourPlan(key) {

      planList.innerHTML = "";

      tourPlans[key].forEach(item => {
        planList.innerHTML += `<li><i class="ri-checkbox-circle-line"></i> ${item}</li>`;
      });

      moveMap(key);
    }

    planTabs.forEach(tab => {
      tab.addEventListener("click", () => {

        planTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        loadTourPlan(tab.dataset.plan);
      });
    });

    loadTourPlan("colombo");
  }

  /* =====================================================
     DAY PLANS (FULL DETAILS)
  ===================================================== */

  const dayPlans = {

    day1: { loc: "anuradhapura", items: [
      "Arrival and Breakfast",
      "Visit Sri Maha Bodhi Tree",
      "Explore Ruwanwelisaya Stupa",
      "Visit Jetavanaramaya",
      "Visit Isurumuniya Temple",
      "Sunset at Mihintale",
      "Return to Hotel"
    ]},

    day2: { loc: "polonnaruwa", items: [
      "Visit Royal Palace",
      "Explore Quadrangle",
      "Gal Vihara Statues",
      "Rankoth Vehera",
      "Parakrama Samudraya"
    ]},

    day3: { loc: "sigiriya", items: [
      "Sigiriya Rock Fortress",
      "Sigiriya Museum",
      "Pidurangala Rock",
      "Village Experience"
    ]},

    day4: { loc: "kandy", items: [
      "Temple of Tooth Relic",
      "Kandy Lake",
      "Royal Botanical Gardens",
      "Cultural Dance Show"
    ]},

    day5: { loc: "ella", items: [
      "Nine Arch Bridge",
      "Little Adam’s Peak",
      "Ella Rock"
    ]},

    day6: { loc: "ella", items: [
      "Ravana Falls",
      "Ella Gap Viewpoint",
      "Tea Factory Visit"
    ]},

    day7: { loc: "yala", items: [
      "Early Morning Safari",
      "Wildlife Viewing",
      "Relaxation"
    ]},

    day8: { loc: "mirissa", items: [
      "Relax at Mirissa Beach",
      "Coconut Tree Hill",
      "Parrot Rock"
    ]},

    day9: { loc: "mirissa", items: [
      "Early Morning Whale Watching Tour",
      "Relax at Beach",
      "Visit Weligama",
      "Sunset Session"
    ]},

    day10: { loc: "galle", items: [
      "Explore Galle Fort",
      "Visit Lighthouse",
      "Dutch Church",
      "Unawatuna Beach",
      "Return to Colombo"
    ]}
  };

  const dayTabs = document.querySelectorAll(".dayplan__tab");
  const dayList = document.getElementById("dayplan-list");

  if (dayTabs.length && dayList) {

    function loadDayPlan(key) {

      dayList.innerHTML = "";

      dayPlans[key].items.forEach(item => {
        dayList.innerHTML += `<li><i class="ri-checkbox-circle-line"></i> ${item}</li>`;
      });

      moveMap(dayPlans[key].loc);
    }

    dayTabs.forEach(tab => {
      tab.addEventListener("click", () => {

        dayTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        loadDayPlan(tab.dataset.day);
      });
    });

    loadDayPlan("day1");
  }

});




const slides = document.querySelectorAll(".home__img");
let index = 0;

function changeSlide() {
  slides[index].classList.remove("active");

  index++;
  if (index >= slides.length) index = 0;

  slides[index].classList.add("active");
}

setInterval(changeSlide, 4000);

