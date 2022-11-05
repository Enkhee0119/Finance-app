// -----------------------------------Дэлгэцтэй ажиллах контроллер
var uiController = (function () {
  var DOMStrings = {
    inputType: ".add__type",
    descriptionType: ".add__description",
    valueType: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };
  var nodeListForeach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  var formatMoney = function (too, type) {
    var a = "" + too;

    var x = a.split("").reverse().join("");

    var y = "";
    var count = 1;

    for (i = 0; i < x.length; i++) {
      y = y + x[i];
      if (count % 3 === 0) y = y + ",";
      count++;
    }

    y = y.split("").reverse().join("");

    if (y[0] === ",") y = y.substring(1, y.length);

    if (type === "inc") y = "+" + y;
    else y = "-" + y;

    return y;
  };

  return {
    displayDate: function () {
      var unuudur = new Date();
      document.querySelector(DOMStrings.dateLabel).textContent =
        unuudur.getMonth() + " сар";
    },
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.descriptionType).value,
        value: parseInt(document.querySelector(DOMStrings.valueType).value),
      };
    },
    getDOMStrings: function () {
      return DOMStrings;
    },

    displayPercentages: function (allPercentages) {
      // Зарлагын NodeList-ийг олох
      var elements = document.querySelectorAll(
        DOMStrings.expensePercentageLabel
      );
      // Элемент бүрийн хувьд зарлагын хувийг массиваас авч шивж оруулах
      nodeListForeach(elements, function (el, index) {
        el.textContent = allPercentages[index];
      });
    },

    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMStrings.descriptionType + "," + DOMStrings.valueType
      );

      // convert list to array
      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (el) {
        el.value = "";
      });
      fieldsArr[0].focus();
      // for (i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
    },
    // return {
    //   tusuv: data.tusuv,
    //   huvi: data.huvi,
    //   totalInc: data.totals.inc,
    //   totalExp: data.totals.exp,
    // };
    tusviigVzvvleh: function (tusuv) {
      var type;
      if (tusuv.tusuv > 0) type = "inc";
      else type = "exp";
      document.querySelector(DOMStrings.tusuvLabel).textContent = formatMoney(
        tusuv.tusuv,
        type
      );
      document.querySelector(DOMStrings.incomeLabel).textContent = formatMoney(
        tusuv.totalInc,
        "inc"
      );
      document.querySelector(DOMStrings.expenseLabel).textContent = formatMoney(
        tusuv.totalExp,
        "exp"
      );
      if (tusuv.huvi === 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent =
          tusuv.huvi;
      } else
        document.querySelector(DOMStrings.percentageLabel).textContent =
          tusuv.huvi + "%";
    },
    deleteListItem: function (id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    addListItem: function (item, type) {
      // 1. Орлого зарлагын аль нь гэдгийг агуулсан html бэлтгэнэ
      var html;
      var list;
      if (type == "inc") {
        list = DOMStrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMStrings.expenseList;
        html =
          ' <div class="item clearfix" id="exp-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // 2. Уг html дотроо орлого зарлагын утгуудыг replace ашиглаж хийж өгнө
      html = html.replace("%id%", item.id);
      html = html.replace("%desc%", item.description);
      html = html.replace("%value%", formatMoney(item.value, type));
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
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalInc) {
    if (totalInc > 0)
      this.percentage = Math.round((this.value / totalInc) * 100);
    else this.percentage = 0;
  };
  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };
  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum += el.value;
    });
    data.totals[type] = sum;
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
    tusuv: 0,
    huvi: 0,
  };

  return {
    displayDate: function () {},
    tusuvTootsooloh: function () {
      // Нийт орлого, зарлагыг тооцоолно
      calculateTotal("inc");
      calculateTotal("exp");

      // Төсвийг шинээр тооцоолно
      data.tusuv = data.totals.inc - data.totals.exp;

      // Орлого зарлагын хувийг тооцоолно.
      if (data.totals.inc > 0) {
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else data.huvi = 0;
    },

    calculatePercentages: function () {
      data.items.exp.forEach(function (el) {
        el.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function () {
      var allPercentages = data.items.exp.map(function (el) {
        return el.getPercentage();
      });
      return allPercentages;
    },

    tusviigAwah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },
    deleteItem: function (type, id) {
      var ids = data.items[type].map(function (el) {
        return el.id;
      });

      var index = ids.indexOf(id);

      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },
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
    seedata: function () {
      return data;
    },
  };
})();

// -----------------------------------Програмын холбогч контроллер
var appController = (function (uiController, fnController) {
  var ctrlAddItem = function () {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авах
    var input = uiController.getInput();

    if (input.description !== "" && input.value !== "") {
      // 2.Олж авсан өгөгдлүүдээ санхүүгийн контроллерт хадгалах
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );

      // 3.Олж авсан өгөгдлүүдийг вебийн тохирох хэсэгт(орлого бол орлого хэсэгт) харуулах
      uiController.addListItem(item, input.type);
      uiController.clearFields();

      // Төсвийг шинээр тооцоолоод дэлгэцэнд үзүүлнэ
      updateTusuv();
    }
  };
  var updateTusuv = function () {
    // 4. Төсвийг тооцоолох
    financeController.tusuvTootsooloh();

    // 5. Эцсийн үлдэндэл, тооцоог харуулах
    var tusuv = financeController.tusviigAwah();

    // 6. Төсвийн тооцоог дэлгэцэнд гаргах
    uiController.tusviigVzvvleh(tusuv);

    // 7. Элементүүдийн хувийг тооцоолох
    financeController.calculatePercentages();
    // 8. Элементүүдийн хувийг хүлээж авах
    var allPercentages = financeController.getPercentages();
    // 9. Энэ хувийг дэлгэцэнд харуулах
    uiController.displayPercentages(allPercentages);
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

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);
          // 1.Санхүүгийн модулиас type, id ашиглаж устгах
          financeController.deleteItem(type, itemId);
          // 2. Дэлгэц дээрээс энэ элементийг устгах
          uiController.deleteListItem(id);
          // 3. Үлдэгдэл тооцоог шинэчилж харуулах
          updateTusuv();
        }
      });
  };

  return {
    init: function () {
      uiController.displayDate();
      uiController.tusviigVzvvleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0,
      });
      console.log("starting");
      setUpEventListener();
    },
  };
})(uiController, financeController);

appController.init();
