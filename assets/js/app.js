let title1 = document.getElementById('hero_minititle');
let title2 = document.getElementById('hero_maintitle');
let title3 = document.getElementById('hero_minititle2');

let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

window.addEventListener('scroll', () =>{
    if(screenWidth >= 768){
    
    let value = window.scrollY;
    // console.log(value);
    
    title1.style.marginTop = value * .5 + 'px';
        title1.style.opacity = 1 - value / 2.5;
    title2.style.marginTop = value * .2 + 'px';
        title2.style.opacity = 1 - value / 2.5;
        title3.style.marginTop = value * .5 + 'px';
        title3.style.opacity = 1 - value / 2.5;
    // img1.style.top = value * -0.5 + 'px';
    // img2.style.top = value * -1 + 'px';
        }
})

var home_swiper = new Swiper(".swiper-container", {
    loop: false,
        slidesPerView: 1,
        spaceBetween: 30,
        
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
      })
var routes_sec_swiper = new Swiper(".routes-sec-swiper", {
    loop: true,
    // parallax:true,
    // effect: 'fade',
    speed: 600,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: ".routes-sec-swiper-next",
          prevEl: ".routes-sec-swiper-prev",
        },
      })

const why_sec_swiper = new Swiper('.why_sec_swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints:{
        768:{
            slidesPerView:2
        }
    }
  
  
});


function showTab(tabId) {
    // Hide all tabs
    var tabs = document.getElementsByClassName("tab_content");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    // Deactivate all tab links
    var tabLinks = document.getElementsByClassName("tablink");
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Show the selected tab
    var selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add("active")
    }

    // Activate the clicked tab link
    event.target.classList.add("active");
}
