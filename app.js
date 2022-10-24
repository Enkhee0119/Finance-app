// -----------------------------------Дэлгэцтэй ажиллах контроллер
var uiController = (function () {
  var DOMStrings = {
    inputType: ".add__type",
    descriptionType: ".add__description",
    valueType: ".add__value",
    addBtn: ".add__btn",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.descriptionType).value,
        value: document.querySelector(DOMStrings.valueType).value,
      };
    },
    getDOMStrings: function () {
      return DOMStrings;
    },
  };
})();

// -----------------------------------Санхүүтэй ажиллах контроллер
var financeController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };
})();

// -----------------------------------Програмын холбогч контроллер
var appController = (function (uiController, fnController) {
  var ctrlAddItem = function () {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авах

    console.log(uiController.getInput());
    // 2.Олж авсан өгөгдлүүдээ санхүүгийн модулид хадгалах
    // 3.Олж авсан өгөгдлүүдийг вебийн тохирох хэсэгт(орлого бол орлого хэсэгт) харуулах
    // 4. Төсвийг тооцоолох
    // 5. Эцсийн үлдэндэл, тооцоог харуулах
  };
  var setUpEventListener = function () {
    var DOM = uiController.getDOMStrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if ((event.keyCode == 13) | (event.which == 13)) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("starting");
      setUpEventListener();
    },
  };
})(uiController, financeController);

appController.init();
