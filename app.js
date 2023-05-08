// The function to handle opening and closing the sidebar
const arrow = document.querySelectorAll(".arrow");
const sidebar = document.querySelector(".sidebar");
const sidebarBtn = document.querySelector(".bx-menu");
const logo = document.querySelector(".sidebar__logo img");
const body = document.querySelector("body");
const mediaQuery = window.matchMedia("(max-width: 1023px), (max-width: 739px)");

arrow.forEach((item) => {
  item.addEventListener("click", (e) => {
    const arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
    logo.classList.toggle("small-logo");
  });
});
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar--close");
  logo.classList.toggle("small-logo");
});
// handle the click out event only when the screen resolution is within the desired value range
if (mediaQuery.matches) {
  body.addEventListener("click", (e) => {
    const screenWidth = window.innerWidth;
    if ((screenWidth >= 740 && screenWidth <= 1023) || screenWidth <= 739) {
      if (!sidebar.contains(e.target) && e.target !== sidebarBtn) {
        sidebar.classList.add("sidebar--close");
        logo.classList.add("small-logo");
      }
    }
  });
}

// Function to change tabs
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

const tabActive = $(".tab-item.active");
const line = $(".tabs .line");

requestIdleCallback(function () {
  line.style.left = tabActive.offsetLeft + "px";
  line.style.width = tabActive.offsetWidth + "px";
});

tabs.forEach((tab, index) => {
  const pane = panes[index];

  tab.onclick = function () {
    $(".tab-item.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");

    line.style.left = this.offsetLeft + "px";
    line.style.width = this.offsetWidth + "px";

    this.classList.add("active");
    pane.classList.add("active");
  };
});

// Function show more, show less text content
const content = document.querySelector(".tab__show");
const expandBtn = document.querySelector(".expand-btn");
const collapseBtn = document.querySelector(".collapse-btn");

expandBtn.addEventListener("click", function () {
  content.style.height = "auto";
  collapseBtn.style.display = "block";
  expandBtn.style.display = "none";
  content.classList.remove("fadeout");
});

collapseBtn.addEventListener("click", function () {
  content.style.height = "45px";
  collapseBtn.style.display = "none";
  expandBtn.style.display = "block";
  content.classList.add("fadeout");
});

window.onload = function () {
  content.style.height = "45px";
  collapseBtn.style.display = "none";
  expandBtn.style.display = "block";
};

//  Open and close content in tags
function toggleViewAll(event) {
  const button = event.currentTarget;
  const isMobile = window.innerWidth <= 576;
  const dealerContent = button.closest(".dealer__content");
  const hiddenContent = dealerContent.querySelector(".dealer__content-hidden");

  if (
    window.getComputedStyle(hiddenContent).getPropertyValue("display") ===
    "flex"
  ) {
    hiddenContent.style.display = "none";
    button.innerHTML = isMobile
      ? 'More <i class="fa-solid fa-chevron-down"></i>'
      : 'More Details <i class="fa-solid fa-chevron-down"></i>';
  } else {
    hiddenContent.style.display = "flex";
    button.innerHTML = isMobile
      ? 'Less <i class="fa-sharp fa-solid fa-chevron-up"></i>'
      : 'Less Details <i class="fa-sharp fa-solid fa-chevron-up"></i>';
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const lessDetailsButtons = document.querySelectorAll(".less-details");

  lessDetailsButtons.forEach((button) => {
    button.addEventListener("click", toggleViewAll);
  });
});

// The function opens and closes the question
const questions = document.querySelectorAll(".question");
questions.forEach((question) => {
  const answer = question.querySelector(".question__answer");
  const icon = question.querySelector(".fa-solid");

  icon.addEventListener("click", () => {
    if (question.classList.contains("active")) {
      question.classList.remove("active");
      answer.style.display = "none";
      icon.classList.replace("fa-circle-minus", "fa-circle-plus");
    } else {
      question.classList.add("active");
      answer.style.display = "block";
      icon.classList.replace("fa-circle-plus", "fa-circle-minus");
    }
  });
});

// Function to handle page scroll and menu selection
const menuItems = document.querySelectorAll(".menu-item");

// Add the class active-item to the first element in the menuItems list so that it is enabled by default
menuItems[0].classList.add("active-item");

// use intersection observer to detect when element is visible on screen
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // remove active class from all menu items
        menuItems.forEach((item) => item.classList.remove("active-item"));

        // add active class for current menu item
        const currentMenuItem = document.querySelector(
          `.menu-item[data-id="${entry.target.id}"]`
        );
        currentMenuItem.classList.add("active-item");
      }
    });
  },
  { threshold: 0.5 }
);

// scroll the page and click on the menu item
menuItems.forEach((item) => {
  const targetId = item.getAttribute("data-id");
  const target = document.getElementById(targetId);

  // track the click event of the menu item
  item.addEventListener("click", () => {
    target.scrollIntoView({ behavior: "smooth" });
    // When the item element is clicked, the web page will scroll to the element with the id of target and apply a smoothing effect on scrolling.
  });

  observer.observe(target);
});

// active color btn next and pre on mobile
let activeButton = null;
document.querySelectorAll(".btn-pagination").forEach((button) => {
  button.addEventListener("click", function () {
    if (activeButton === null) {
      this.classList.add("pagination__active");
      activeButton = this.id;
    } else if (activeButton !== this.id) {
      document.getElementById(activeButton).classList.remove("active");
      this.classList.add("pagination__active");
      activeButton = this.id;
    } else {
      this.classList.remove("pagination__active");
      activeButton = null;
    }
  });
});

// Close and open the question
const titleOneButtons = document.querySelectorAll(".desciption__title-one");
titleOneButtons.forEach((button) => {
  const titleOne = button.nextElementSibling;

  button.addEventListener("click", () => {
    titleOne.classList.toggle("is-hidden");
    const icon = button.querySelector(".fa-solid");

    if (icon.classList.contains("fa-chevron-up")) {
      icon.classList.replace("fa-chevron-up", "fa-chevron-down");
    } else {
      icon.classList.replace("fa-chevron-down", "fa-chevron-up");
    }
  });
});