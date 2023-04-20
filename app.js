const arrow = document.querySelectorAll('.arrow');
const sidebar = document.querySelector('.sidebar');
const sidebarBtn = document.querySelector('.bx-menu');
const logo = document.querySelector('.logo-details img');

arrow.forEach((item) => {
  // sử dụng phương thức forEach() để thêm sự kiện click vào mỗi phần tử
  item.addEventListener('click', (e) => {
    const arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle('showMenu');
    logo.classList.toggle('small-logo');
  });
});
// với sidebarBtn,sử dụng addEventListener() để thêm sự kiện click vào nút đó. Nếu nút được click sẽ toggle() class close của sidebar và class small-logo của logo.
sidebarBtn.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar--close');
  logo.classList.toggle('small-logo');
});




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



// hàm show more show less
var content = document.querySelector(".tab__show");
      var expandBtn = document.querySelector(".expand-btn");
      var collapseBtn = document.querySelector(".collapse-btn");

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

      
      // đóng mở 

      function toggleViewAll(event) {
        const button = event.target;
        const dealerContent = button.closest('.dealer__content');
        const hiddenContent = dealerContent.querySelector('.dealer__content-hidden');
        if (window.getComputedStyle(hiddenContent).getPropertyValue('display') === "flex") {
          hiddenContent.style.display = "none";
          button.innerHTML = 'More Details <i class="fa-solid fa-chevron-down"></i>';
        } else {
          hiddenContent.style.display = "flex";
          button.innerHTML = 'Less Details <i class="fa-sharp fa-solid fa-chevron-up"></i>';
        }
      }
      
      const dealerContents = document.querySelectorAll('.dealer__content');
      dealerContents.forEach(content => {
        const button = content.querySelector('.less-details');
        button.addEventListener('click', toggleViewAll);
      });
      // function toggleViewAll(event) {
      //   const index = event.target.getAttribute('data-index');
      //   const hiddenContent = document.querySelector(`.dealer__content[data-index="${index}"] .dealer__content-hidden`);
      //   if (window.getComputedStyle(hiddenContent).getPropertyValue('display') === "flex") {
      //     hiddenContent.style.display = "none";
      //     event.target.innerHTML = 'More Details <i class="fas fa-angle-down"></i>';
      //   } else {
      //     hiddenContent.style.display = "flex";
      //     event.target.innerHTML = 'Less Details <i class="fas fa-angle-up"></i>';
      //   }
      // }
      
      // const buttons = document.querySelectorAll('.less-details');
      // buttons.forEach((button, index) => {
      //   button.setAttribute('data-index', index);
      //   button.addEventListener('click', toggleViewAll);
      // });
      
      
// 
const questions = document.querySelectorAll(".question");
questions.forEach(question => {
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


// 
// lấy tất cả các menu item
const menuItems = document.querySelectorAll('.menu-item');

// sử dụng intersection observer để phát hiện khi phần tử hiển thị trên màn hình
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // xóa lớp active khỏi tất cả các menu item
      menuItems.forEach(item => item.classList.remove('active-item'));

      // thêm lớp active cho menu item hiện tại
      const currentMenuItem = document.querySelector(`.menu-item[data-id="${entry.target.id}"]`);
      currentMenuItem.classList.add('active-item');
    }
  });
}, { threshold: 0.5 });

// theo dõi sự kiện cuộn trang và click trên menu item
menuItems.forEach(item => {
  const targetId = item.getAttribute('data-id');
  const target = document.getElementById(targetId);

  // theo dõi sự kiện click của menu item
  item.addEventListener('click', () => {
    target.scrollIntoView({ behavior: 'smooth' });
  })

  // theo dõi sự kiện cuộn trang
  observer.observe(target);
});

