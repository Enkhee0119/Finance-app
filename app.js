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
    addListItem: function (item, type) {
      // 1. Орлого зарлагын аль нь гэдгийг агуулсан html бэлтгэнэ
      var html;
      var list;
      if (type == "inc") {
        list = ".income__list";
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = ".expenses__list";
        html =
          ' <div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // 2. Уг html дотроо орлого зарлагын утгуудыг replace ашиглаж хийж өгнө
      html = html.replace("%id%", item.id);
      html = html.replace("%desc%", item.description);
      html = html.replace("%value%", item.value);
      // 3. Бэлтгэсэн html-ээ DOM-руу хийж өгнө
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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
    items: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };

  return {
    addItem: function (type, desc, value) {
      var item;
      var id;
      if (data.items[type].length == 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type == "inc") {
        item = new Income(id, desc, value);
      } else {
        item = new Expense(id, desc, value);
      }
      data.items[type].push(item);
      return item;
    },
  };
})();

// -----------------------------------Програмын холбогч контроллер
var appController = (function (uiController, fnController) {
  var ctrlAddItem = function () {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авах
    var input = uiController.getInput();
    console.log(input);
    // 2.Олж авсан өгөгдлүүдээ санхүүгийн контроллерт хадгалах
    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );

    // 3.Олж авсан өгөгдлүүдийг вебийн тохирох хэсэгт(орлого бол орлого хэсэгт) харуулах
    uiController.addListItem(item, input.type);
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
