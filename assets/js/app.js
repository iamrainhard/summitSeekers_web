 function showTab(tabId) {
    // Hide all tabs
    var tabs = document.getElementsByClassName("tab_content")
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("active")
    }

    // Deactivate all tab links
    var tabLinks = document.getElementsByClassName("tablink")
    for (var i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove("active")
    }

    // Show the selected tab
    var selectedTab = document.getElementById(tabId)
    if (selectedTab) {
      selectedTab.classList.add("active")
    }

    // Activate the clicked tab link
    event.target.classList.add("active")
  }

  function showMiniTab(tabId) {
    // Hide all tabs
    var tabs = document.getElementsByClassName("minitab_content")
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("active")
    }

    // Deactivate all tab links
    var tabLinks = document.getElementsByClassName("minitablink")
    for (var i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove("active")
    }

    // Show the selected tab
    var selectedTab = document.getElementById(tabId)
    if (selectedTab) {
      selectedTab.classList.add("active")
    }

    // Activate the clicked tab link
    event.target.classList.add("active")
  }
$(document).ready(function () {
  let title1 = document.getElementById("hero_minititle")
  let title2 = document.getElementById("hero_maintitle")
  let title3 = document.getElementById("hero_minititle2")

  let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

  if(title1){
  window.addEventListener("scroll", () => {
    if (screenWidth >= 768) {
      let value = window.scrollY
      // console.log(value);

      title1.style.marginTop = value * 0.5 + "px"
      title1.style.opacity = 1 - value / 2.5
      title2.style.marginTop = value * 0.2 + "px"
      title2.style.opacity = 1 - value / 2.5
      title3.style.marginTop = value * 0.5 + "px"
      title3.style.opacity = 1 - value / 2.5
      // img1.style.top = value * -0.5 + 'px';
      // img2.style.top = value * -1 + 'px';
    }
  })
  }
  var home_swiper = new Swiper(".swiper-container", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    effect: "slide",

    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
    autoplay: {
      delay: 5000,
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
    autoplay: {
      delay: 8000,
    },
  })

  const why_sec_swiper = new Swiper(".why_sec_swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
  })

 

    if(document.getElementById("tanzania-time")){
  setInterval(() => {
    // Set the timezone to 'Africa/Dar_es_Salaam' (Tanzania)
    const tanzaniaTime = moment().tz("Africa/Dar_es_Salaam")

    // Display the time in the 'HH:mm' format
    document.getElementById("tanzania-time").innerText = tanzaniaTime.format("HH:mm")

    document.getElementById("travel-guide-area-practical-localtime").innerText = tanzaniaTime.format("HH:mm:ss")
  }, 1000)
}
  // Function to update the price per person based on the selected number
  function updatePrice() {
    var selectedNumber = $("#numberOfPeople").val()

    // Check if the element exists before trying to update
    if ($("#hiddenInput6Day").length) {
      var prices6Day = JSON.parse($("#hiddenInput6Day").attr("data-pax"))
      $("#pricePerPerson6Day").text("$" + prices6Day.pax[selectedNumber])
    }

    if ($("#hiddenInput7Day").length) {
      var prices7Day = JSON.parse($("#hiddenInput7Day").attr("data-pax"))
      $("#pricePerPerson7Day").text("$" + prices7Day.pax[selectedNumber])
    }

    if ($("#hiddenInput8Day").length) {
      var prices8Day = JSON.parse($("#hiddenInput8Day").attr("data-pax"))
      $("#pricePerPerson8Day").text("$" + prices8Day.pax[selectedNumber])
    }

    if ($("#hiddenInput9Day").length) {
      var prices9Day = JSON.parse($("#hiddenInput9Day").attr("data-pax"))
      $("#pricePerPerson9Day").text("$" + prices9Day.pax[selectedNumber])
    }

    if ($("#hiddenInput10Day").length) {
      var prices10Day = JSON.parse($("#hiddenInput10Day").attr("data-pax"))
      $("#pricePerPerson10Day").text("$" + prices10Day.pax[selectedNumber])
    }
  }

  // Attach the updatePrice function to the change event of the select element
  $("#numberOfPeople").change(updatePrice)

  // Trigger the updatePrice function on page load
  updatePrice()

  // Replace with your app id from Open Exchange Rates
  const app_id = "70cadf41e59d4b468faebbc387ae7636"

  // The base currency is USD by default
  const base = "USD"

  // The target currency is TZS
  const target = "TZS"

  // The API endpoint for the latest exchange rates
  const url = `https://openexchangerates.org/api/latest.json?app_id=${app_id}&base=${base}&symbols=${target}`

  // A variable to store the current rate
  let currentRate

  if(document.getElementById("travel-guide-area-practical-converter")){
  // A function to fetch the data from the API
  async function fetchRate() {
    try {
      // Make a GET request to the API
      const response = await fetch(url)

      // Check if the response is successful
      if (response.ok) {
        // Parse the response as JSON
        const data = await response.json()

        // Extract the rate from the data
        currentRate = data.rates[target]

        document.getElementById("travel-guide-area-practical-converter").setAttribute("data-rate", currentRate)

        convertCurrency("source", "target")

        // Log the current rate to the console
        // console.log(`The current exchange rate from ${base} to ${target} is ${currentRate}`);
      } else {
        // Throw an error if the response is not successful
        throw new Error(`The API request failed with status code ${response.status}`)
      }
    } catch (error) {
      // Log the error to the console
      console.error(error)
    }
  }

  // Call the function to fetch the rate
  fetchRate()

  // Function to convert currency
  function convertCurrency(from, to) {
    // Get the input values
    var sourceValue = parseFloat(document.querySelector("[name=" + from + "]").value) || 0

    // Get the conversion rate
    var conversionRate = parseFloat(document.getElementById("travel-guide-area-practical-converter").getAttribute("data-rate")) || 1

    // Perform the conversion
    var targetValue = from === "source" ? sourceValue * conversionRate : sourceValue / conversionRate

    // Update the other input field without decimal points
    document.querySelector("[name=" + to + "]").value = Math.floor(targetValue)
  }

  // Trigger conversion on page load
  convertCurrency("source", "target")

  // Add event listeners for input changes
  document.querySelector("[name=source]").addEventListener("input", function () {
    convertCurrency("source", "target")
  })

  document.querySelector("[name=target]").addEventListener("input", function () {
    convertCurrency("target", "source")
  })
}
  function handleResponsiveTables() {
    // Selecting all elements with class .my-table and .travel-guide-area-period-location-data-row
    const tableElements = document.querySelectorAll(".my-table")
    const responsiveRowElements = document.querySelectorAll(".travel-guide-area-period-location-data-row")

    // Checking the screen width
    const isResponsive = window.innerWidth < 992

    // Looping through each table and updating classes accordingly
    tableElements.forEach((tableElement) => {
      // console.log(index);

      if (isResponsive) {
        tableElement.classList.add("responsive-table")
        responsiveRowElements.forEach((rowElement) => {
          rowElement.classList.add("is-responsive")
          rowElement.classList.remove("is-not-responsive")
        })
      } else {
        // When screen width is greater than or equal to 768px
        tableElement.classList.remove("responsive-table")
        responsiveRowElements.forEach((rowElement) => {
          rowElement.classList.remove("is-responsive")
          rowElement.classList.add("is-not-responsive")
        })
      }
    })
  }

  // Initial call to set the initial state based on the screen width
  handleResponsiveTables()

  // Adding an event listener to handle changes in screen width
  window.addEventListener("resize", handleResponsiveTables)

  // ***Function for scroll to top***
  const scrollTopLinks = document.querySelectorAll(".scrolltop");

  scrollTopLinks.forEach((scrollTopLink) => {
    scrollTopLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  // ***Function for the announcement modal***
  // Check if the modal should be shown (first visit)
  if (!localStorage.getItem('visitedBefore')) {
    // Show the modal when the DOM is fully loaded
    $(window).on('load', function() {
      $('#announcementModal').modal('show');
        
    });

    // Set a flag in localStorage to indicate that the user has visited
    localStorage.setItem('visitedBefore', true);
  }
    console.log('helooo')
})

