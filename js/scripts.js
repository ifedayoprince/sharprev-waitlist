/* Description: Custom JS file */

/* Navigation */
// Collapse the navbar by adding the top-nav-collapse class
window.onscroll = function () {
	scrollFunction();
	scrollFunctionBTT(); // back to top button
};

window.onload = function () {
	scrollFunction();
	// setStats();
};

function scrollFunction() {
	if (document.documentElement.scrollTop > 30) {
		document.getElementById("navbarExample").classList.add("top-nav-collapse");
	} else if ( document.documentElement.scrollTop < 30 ) {
		document.getElementById("navbarExample").classList.remove("top-nav-collapse");
	}
}

// Navbar on mobile
let elements = document.querySelectorAll(".navbar-nav .nav-link:not(.dropdown-toggle)");

for (let i = 0; i < elements.length; i++) {
	elements[i].addEventListener("click", () => {
		document.querySelector(".offcanvas-collapse").classList.toggle("open");
	});
}

document.querySelector(".navbar-toggler").addEventListener("click", () => {
  	document.querySelector(".offcanvas-collapse").classList.toggle("open");
});

// Hover on desktop
function toggleDropdown(e) {
	const _d = e.target.closest(".dropdown");
	let _m = document.querySelector(".dropdown-menu", _d);

	setTimeout(
		function () {
		const shouldOpen = _d.matches(":hover");
		_m.classList.toggle("show", shouldOpen);
		_d.classList.toggle("show", shouldOpen);

		_d.setAttribute("aria-expanded", shouldOpen);
		},
		e.type === "mouseleave" ? 300 : 0
	);
}

// On hover
const dropdownCheck = document.querySelector('.dropdown');

if (dropdownCheck !== null) { 
	document.querySelector(".dropdown").addEventListener("mouseleave", toggleDropdown);
	document.querySelector(".dropdown").addEventListener("mouseover", toggleDropdown);

	// On click
	document.querySelector(".dropdown").addEventListener("click", (e) => {
		const _d = e.target.closest(".dropdown");
		let _m = document.querySelector(".dropdown-menu", _d);
		if (_d.classList.contains("show")) {
			_m.classList.remove("show");
			_d.classList.remove("show");
		} else {
			_m.classList.add("show");
			_d.classList.add("show");
		}
	});
}


/* Rotating Text - ReplaceMe */
var checkReplace = document.querySelector('.replace-me');
if (checkReplace !== null) { 
	var replace = new ReplaceMe(document.querySelector('.replace-me'), {
		animation: 'animated fadeIn', // Animation class or classes
		speed: 2000, // Delay between each phrase in miliseconds
		separator: ',', // Phrases separator
		hoverStop: false, // Stop rotator on phrase hover
		clickChange: false, // Change phrase on click
		loopCount: 'infinite', // Loop Count - 'infinite' or number
		autoRun: true, // Run rotator automatically
		onInit: false, // Function
		onChange: false, // Function
		onComplete: false // Function
	});
}


/* Card Slider - Swiper */
var cardSlider = new Swiper('.card-slider', {
	autoplay: {
		delay: 4000,
		disableOnInteraction: false
	},
	loop: true,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	slidesPerView: 3,
	spaceBetween: 70,
	breakpoints: {
		// when window is <= 767px
		767: {
			slidesPerView: 1
		},
		// when window is <= 991px
		991: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});


/* Image Slider - Swiper */
var imageSlider = new Swiper('.image-slider', {
	autoplay: {
		delay: 2000,
		disableOnInteraction: false
	},
	loop: false,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	spaceBetween: 30,
	slidesPerView: 5,
	breakpoints: {
		// when window is <= 516px
		516: {
			slidesPerView: 1,
			spaceBetween: 10
		},
		// when window is <= 767px
		767: {
			slidesPerView: 2,
			spaceBetween: 20
		},
		// when window is <= 991px
		991: {
			slidesPerView: 3,
			spaceBetween: 30
		},
		// when window is <= 1199px
		1199: {
			slidesPerView: 4,
			spaceBetween: 30
		},
	}
});


/* Video Modal */
var videoBtn = document.querySelector('.video-btn')
var videoModal = document.getElementById('videoModal')
var video = document.getElementById('video')
var videoSrc;

var checkVideoSrc = document.querySelector('.video-btn');
if (checkVideoSrc !== null) { 
	videoBtn.addEventListener('click',function(e){
		videoSrc = videoBtn.getAttribute('data-bs-src')
	})
}

var checkVideoModal = document.getElementById('videoModal');
if (checkVideoModal !== null) { 
	videoModal.addEventListener('shown.bs.modal',(e)=>{
		video.setAttribute('src', videoSrc + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0')
	})

	videoModal.addEventListener('hide.bs.modal',(e)=>{
		video.setAttribute('src', videoSrc)
	})
}


/* Back To Top Button */
// Get the button
myButton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
function scrollFunctionBTT() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		myButton.style.display = "block";
	} else {
		myButton.style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // for Safari
	document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
}

// Update statistics
function setStats() {
	window.pine = {
		server: "https://api-pinocchio.cyclic.app", 
		API_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNlcnZpY2VzIiwiaWF0IjoxNjgxMTgyNjkwLCJleHAiOjE2ODY1Mzk0OTB9.qTUKRyqIP3YeiJCK1dDRS8ugUJgmjU5UeDXsD9hMHeM"
	}
	window.pine.fetch = axios.create({baseUrl: window.pine.server}), 
	window.pine.fetch.defaults.headers.common['Authorization'] = `Bearer ${window.pine.API_KEY}`; 
	
	window.pine.fetch.get('https://api-pinocchio.cyclic.app/core/stats').then((res)=>{
		let stats = res.data;
		// console.log(stats.users)
		document.querySelector('#user-counter .purecounter').setAttribute('data-purecounter-end', stats.users);
		document.querySelector('#post-counter .purecounter').setAttribute('data-purecounter-end', stats.posts);
		document.querySelector('#comment-counter .purecounter').setAttribute('data-purecounter-end', stats.reviews);
		document.querySelector('#starts-counter .purecounter').setAttribute('data-purecounter-end', stats.starts);

		// console.log(document.querySelector('#user-counter'))
	}).catch((e)=>{
		console.log(e)
	})
}
