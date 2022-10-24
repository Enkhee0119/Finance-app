// -----------------------------------Дэлгэцтэй ажиллах контроллер
var uiController = (function () {})();

// -----------------------------------Санхүүтэй ажиллах контроллер
var financeController = (function () {})();

// -----------------------------------Програмын холбогч контроллер
var controller = (function (uiController, fnController) {
  var ctrlAddItem = function () {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авах
    console.log("Nemlee");
    // 2.Олж авсан өгөгдлүүдээ санхүүгийн модулид хадгалах
    // 3.Олж авсан өгөгдлүүдийг вебийн тохирох хэсэгт(орлого бол орлого хэсэгт) харуулах
    // 4. Төсвийг тооцоолох
    // 5. Эцсийн үлдэндэл, тооцоог харуулах
  };
  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    if ((event.keyCode == 13) | (event.which == 13)) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
