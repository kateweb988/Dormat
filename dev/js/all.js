
document.addEventListener("DOMContentLoaded", () => {
  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  // инициализация .tabs как табов
  new ItcTabs('.tabs');
});
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener("DOMContentLoaded", () => {
  var accordeonButtons = document.getElementsByClassName("accordeon__button");

  // Аккордеон
  for (var i = 0; i < accordeonButtons.length; i++) {
    var accordeonButton = accordeonButtons[i];
    accordeonButton.addEventListener("click", toggleItems, false);
  }

  function toggleItems() {
    var itemClass = this.className;

    for (var i = 0; i < accordeonButtons.length; i++) {
      accordeonButtons[i].className = "accordeon__button closed";
    }

    var pannels = document.getElementsByClassName("accordeon__panel");

    for (var z = 0; z < pannels.length; z++) {
      pannels[z].style.maxHeight = 0;
    }

    if (itemClass == "accordeon__button closed") {
      this.className = "accordeon__button active";
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {

  // Красный цвет для *
  $('input[placeholder]').each(function () {
    const placeholder = $(this).attr('placeholder');

    if (placeholder.includes('*')) {
      $(this).attr(
        'data-placeholder',
        placeholder.replace(/\*/g, '<span style="color:red">*</span>')
      );
    }
  });

  $(document).ready(function () {

    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    });

    $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
    );

    function valEl(el) {

      el.validate({
        rules: {
          tel: {
            required: true,
            regex: '^([\\+]+)*[0-9\\x20\\x28\\x29\\-]{5,20}$'
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          }
        },

        messages: {
          tel: {
            required: 'Заполните поле',
            regex: 'Телефон может содержать символы + - ()'
          },

          name: {
            required: 'Заполните поле',
          },

          text: {
            required: 'Заполните поле',
          },

          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },

        submitHandler: function (form) {

          $('#loader').fadeIn();

          var $form = $(form);
          var $formId = $(form).attr('id');
          var modalId = $form.closest('.box-modal').attr('id');

          $.ajax({
            type: 'POST',
            url: $form.attr('action'),
            data: $form.serialize(),
          })

          .always(function () {

            setTimeout(function () {
              $('#loader').fadeOut();
            }, 800);

            setTimeout(function () {

              $.arcticmodal('close');

              // Первая форма
              if (modalId === 'popup-call') {
                $('#popup-thank').arcticmodal({});
              }

              // Вторая форма
              if (modalId === 'popup-call2') {
                $('#popup-thank2').arcticmodal({});
              }

              $form.trigger('reset');

            }, 1100);

          });

          return false;
        }
      });
    }

    $('.js-form').each(function () {
      valEl($(this));
    });

    $('[data-scroll]').on('click', function (event) {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);

      event.preventDefault();
    });

  });
});

document.addEventListener('DOMContentLoaded', function () {

  $('.articmodal-close').click(function (e) {
    $.arcticmodal('close');
  });

  $('.a1').click(function (e) {
    e.preventDefault();

    $('#popup-call').arcticmodal({});
  });

  $('.a2').click(function (e) {
    e.preventDefault();

    $('#popup-call2').arcticmodal({});
  });

});
// document.addEventListener("DOMContentLoaded", () => {
//   var accordeonButtons = document.getElementsByClassName("accordeon__button");

//   //пишем событие при клике на кнопки - вызов функции toggle
//   for (var i = 0; i < accordeonButtons.length; i++) {
//     var accordeonButton = accordeonButtons[i];

//     accordeonButton.addEventListener("click", toggleItems, false);
//   }

//   //пишем функцию
//   function toggleItems() {

//     // переменная кнопки(актульная) с классом
//     var itemClass = this.className;

//     // добавляем всем кнопкам класс close
//     for (var i = 0; i < accordeonButtons.length; i++) {
//       accordeonButtons[i].className = "accordeon__button closed";
//     }

//     // закрываем все открытые панели с текстом
//     var pannels = document.getElementsByClassName("accordeon__panel");
//     for (var z = 0; z < pannels.length; z++) {
//       pannels[z].style.maxHeight = 0;
//     }

//     // проверка. если кнопка имеет класс close при нажатии
//     // к актуальной(нажатой) кнопке добававляем активный класс
//     // а панели - которая находится рядом задаем высоту
//     if (itemClass == "accordeon__button closed") {
//       this.className = "accordeon__button active";
//       var panel = this.nextElementSibling;
//       panel.style.maxHeight = panel.scrollHeight + "px";
//     }

//   }
// });
// document.addEventListener("DOMContentLoaded", () => {
//   $(document).ready(function () {
//     $('[data-submit]').on('click', function (e) {
//       e.preventDefault();
//       $(this).parents('form').submit();
//     })
//     $.validator.addMethod(
//       "regex",
//       function (value, element, regexp) {
//         var re = new RegExp(regexp);
//         return this.optional(element) || re.test(value);
//       },
//       "Please check your input."
//     );
//     function valEl(el) {

//       el.validate({
//         rules: {
//           tel: {
//             required: true,
//             regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
//           },
//           name: {
//             required: true
//           },
//           email: {
//             required: true,
//             email: true
//           }
//         },
//         messages: {
//           tel: {
//             required: 'Заполните поле',
//             regex: 'Телефон может содержать символы + - ()'
//           },
//           name: {
//             required: 'Заполните поле',
//           },
//           text: {
//             required: 'Заполните поле',
//           },
//           email: {
//             required: 'Заполните поле',
//             email: 'Неверный формат E-mail'
//           }
//         },
//         submitHandler: function (form) {
//           $('#loader').fadeIn();
//           var $form = $(form);
//           var $formId = $(form).attr('id');
//           switch ($formId) {
//             case 'popupResult':
//               $.ajax({
//                 type: 'POST',
//                 url: $form.attr('action'),
//                 data: $form.serialize(),
//               })
//                 .always(function (response) {
//                   setTimeout(function () {
//                     $('#loader').fadeOut();
//                   }, 800);
//                   setTimeout(function () {
//                     $.arcticmodal('close');
//                     $('#popup-thank').arcticmodal({});
//                     $form.trigger('reset');
//                     //строки для остлеживания целей в Я.Метрике и Google Analytics
//                   }, 1100);

//                 });
//               break;
//           }
//           return false;
//         }
//       })
//     }

//     $('.js-form').each(function () {
//       valEl($(this));
//     });
//     $('[data-scroll]').on('click', function () {
//       $('html, body').animate({
//         scrollTop: $($.attr(this, 'data-scroll')).offset().top
//       }, 2000);
//       event.preventDefault();
//     })
//   });
// });
// document.addEventListener('DOMContentLoaded', function () {
//   $('.articmodal-close').click(function (e) {
//     $.arcticmodal('close');

//   });
//   $('.a1').click(function (e) {
//     e.preventDefault();
//     $('#popup-call').arcticmodal({
//     });
//   });
//   $('.a2').click(function (e) {
//     e.preventDefault();
//     $('#popup-call2').arcticmodal({
//     });
//   });
// });
document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 4,
    spaceBetween: 24,
    allowTouchMove: false,
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 15,
        allowTouchMove: false,
        loop: true,
        slidesPerView: 2
      },
      767: {
        spaceBetween: 15,
        allowTouchMove: false,
        slidesPerView: 3
      },
      992: {
        spaceBetween: 20,
        allowTouchMove: false,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 24,
        allowTouchMove: false,
        slidesPerView: 4
      }
    }
  });
  const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 4,
    spaceBetween: 24,
    allowTouchMove: false,
   breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        allowTouchMove: false,
        loop: true,
        slidesPerView: 2
      },
      767: {
        spaceBetween: 0,
        allowTouchMove: false,
        slidesPerView: 3
      },
      992: {
        spaceBetween: 0,
        allowTouchMove: false,
        slidesPerView: 3
      },
      1200: {
        spaceBetween: 24,
        allowTouchMove: false,
        slidesPerView: 4
      }
    }
  });

});

document.addEventListener("DOMContentLoaded", () => {
  let menuBtn = document.querySelector('.menu-btn');
  let menu = document.querySelector('.menu');
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
  });
});
// Меню: переключение классов по клику
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.menu li a.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      document.querySelector('.menu-btn')?.classList.toggle('active');
      document.querySelector('.menu')?.classList.toggle('active');
    });
  });
});

// Скролл по якорям
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.go_to').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetSelector = link.getAttribute('href');
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Замена <img class="svg"> на inline SVG
document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll('img.svg');

  svgImages.forEach(img => {
    const imgURL = img.getAttribute('src');

    fetch(imgURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'image/svg+xml');
        let svg = xmlDoc.querySelector('svg');

        if (!svg) return;

        // Перенос ID
        if (img.id) {
          svg.setAttribute('id', img.id);
        }

        // Перенос классов
        const classes = img.getAttribute('class');
        if (classes) {
          svg.setAttribute('class', `${classes} replaced-svg`);
        }

        // Удаление некорректных xmlns
        svg.removeAttribute('xmlns:a');

        // Добавление viewBox, если его нет
        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        // Замена <img> на <svg>
        img.parentNode.replaceChild(svg, img);
      })
      .catch(error => {
        console.error(`Ошибка при загрузке SVG: ${imgURL}`, error);
      });
  });
});

