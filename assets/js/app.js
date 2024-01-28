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
        clickable: true,
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

function showMiniTab(tabId) {
    // Hide all tabs
    var tabs = document.getElementsByClassName("minitab_content");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    // Deactivate all tab links
    var tabLinks = document.getElementsByClassName("minitablink");
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


setInterval(() => {
    // Set the timezone to 'Africa/Dar_es_Salaam' (Tanzania)
    const tanzaniaTime = moment().tz('Africa/Dar_es_Salaam');
    
    // Display the time in the 'HH:mm' format
    document.getElementById('tanzania-time').innerText = tanzaniaTime.format('HH:mm');
    
    document.getElementById('travel-guide-area-practical-localtime').innerText = tanzaniaTime.format('HH:mm:ss');
  }, 1000);


$(document).ready(function () {
    // Function to update the price per person based on the selected number
    function updatePrice() {
        var selectedNumber = $('#numberOfPeople').val();

        // Check if the element exists before trying to update
        if ($('#hiddenInput7Day').length) {
            var prices7Day = JSON.parse($('#hiddenInput7Day').attr('data-pax'));
            $('#pricePerPerson7Day').text('$' + prices7Day.pax[selectedNumber]);
        }

        if ($('#hiddenInput8Day').length) {
            var prices8Day = JSON.parse($('#hiddenInput8Day').attr('data-pax'));
            $('#pricePerPerson8Day').text('$' + prices8Day.pax[selectedNumber]);
        }

        if ($('#hiddenInput9Day').length) {
            var prices9Day = JSON.parse($('#hiddenInput9Day').attr('data-pax'));
            $('#pricePerPerson9Day').text('$' + prices9Day.pax[selectedNumber]);
        }

        if ($('#hiddenInput10Day').length) {
            var prices10Day = JSON.parse($('#hiddenInput10Day').attr('data-pax'));
            $('#pricePerPerson10Day').text('$' + prices10Day.pax[selectedNumber]);
        }
    }

    // Attach the updatePrice function to the change event of the select element
    $('#numberOfPeople').change(updatePrice);

    // Trigger the updatePrice function on page load
            updatePrice();
        });