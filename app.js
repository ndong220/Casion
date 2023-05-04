// Hàm xử lý đóng mở sidebar
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
// xử lý sự kiện click ra ngoài chỉ khi độ phân giải màn hình nằm trong khoảng giá trị mong muốn
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




// hàm thay đổi các tab
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



// hàm show more, show less nội dung văn bản
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
  content.style.height = "110px";
  collapseBtn.style.display = "none";
  expandBtn.style.display = "block";
  content.classList.add("fadeout");
});

window.onload = function () {
  content.style.height = "110px";
  collapseBtn.style.display = "none";
  expandBtn.style.display = "block";
};



// đóng mở nội dung trong các thẻ 
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
document.addEventListener("DOMContentLoaded", function() {
  const lessDetailsButtons = document.querySelectorAll(".less-details");

  lessDetailsButtons.forEach((button) => {
    button.addEventListener("click", toggleViewAll);
  });
});



// hàm mở và đóng câu hỏi
const questions = document.querySelectorAll(".question");
questions.forEach((question) => {
  const title = question.querySelector(".question__title");
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



// Hàm xử lý cuộn trang và chọn menu
const menuItems = document.querySelectorAll(".menu-item");

// Thêm class active-item vào phần tử đầu tiên trong danh sách menuItems để nó được kích hoạt mặc định
menuItems[0].classList.add("active-item");

// sử dụng intersection observer để phát hiện khi phần tử hiển thị trên màn hình
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // xóa lớp active khỏi tất cả các menu item
        menuItems.forEach((item) => item.classList.remove("active-item"));

        // thêm lớp active cho menu item hiện tại
        const currentMenuItem = document.querySelector(
          `.menu-item[data-id="${entry.target.id}"]`
        );
        currentMenuItem.classList.add("active-item");
      }
    });
  },
  { threshold: 0.5 }
);

// cuộn trang và click trên menu item
menuItems.forEach((item) => {
  const targetId = item.getAttribute("data-id");
  const target = document.getElementById(targetId);

  // theo dõi sự kiện click của menu item
  item.addEventListener("click", () => {
    target.scrollIntoView({ behavior: "smooth" });
    //Khi phần tử item được nhấp chuột, trang web sẽ cuộn đến phần tử có id là target và áp dụng hiệu ứng smooth (mượt mà) khi cuộn.
  });

  observer.observe(target);
});



// active màu btn next và pre trên mobile
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


// Đóng mở câu hỏi
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


