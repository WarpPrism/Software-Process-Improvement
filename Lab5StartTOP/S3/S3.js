// Generated by CoffeeScript 1.9.1
(function() {
  var Button, clickTheAtPlusToStartTheRobot, countSum, initButtons, resetBubble, resetIfLeaveTheApb;

  Button = (function() {
    Button.prototype.buttons = [];

    Button.prototype.clickAllButtonsTogether = function() {
      var button, i, len, ref, results;
      ref = Button.prototype.buttons;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        button = ref[i];
        if (button.state === "enable") {
          button.dom.find(".adder").css("display", "block").text("...");
          button.state = "waiting";
          results.push(button.getRandomNumberFromTheServer());
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    Button.prototype.getRandomNumberFromTheServer = function() {
      return $.get("/", (function(_this) {
        return function(data) {
          if (_this.state === "waiting") {
            _this.dom.find(".adder").text(data);
            _this.state = "done";
            _this.dom.css("background-color", "gray");
            return Button.prototype.ifAllButtonsAreDoneClickTheBubble();
          }
        };
      })(this));
    };

    Button.prototype.ifAllButtonsAreDoneClickTheBubble = function() {
      var bubble, button, i, len, ref;
      ref = Button.prototype.buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        button = ref[i];
        if (button.state !== "done") {
          return;
        }
      }
      bubble = $("#info-bar");
      bubble.find("#sum").text(countSum());
      return bubble.css("background-color", "gray");
    };

    function Button(dom1) {
      this.dom = dom1;
      this.state = "enable";
      Button.prototype.buttons.push(this);
    }

    Button.prototype.resetAllButtons = function() {
      var button, i, len, ref, results;
      ref = Button.prototype.buttons;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        button = ref[i];
        button.state = "enable";
        button.dom.css("background-color", "rgb(48, 63, 159)");
        results.push(button.dom.find(".adder").css("display", "none").text(""));
      }
      return results;
    };

    return Button;

  })();

  $(function() {
    initButtons();
    clickTheAtPlusToStartTheRobot();
    return resetIfLeaveTheApb();
  });

  initButtons = function() {
    var button, dom, i, len, ref, results;
    ref = $("#control-ring li");
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      dom = ref[i];
      results.push(button = new Button($(dom)));
    }
    return results;
  };

  clickTheAtPlusToStartTheRobot = function() {
    return $(".apb").click((function(_this) {
      return function() {
        return Button.prototype.clickAllButtonsTogether();
      };
    })(this));
  };

  countSum = function() {
    var dom, i, len, number, ref, result;
    result = 0;
    ref = $('#control-ring li');
    for (i = 0, len = ref.length; i < len; i++) {
      dom = ref[i];
      number = $(dom).find('.adder').text();
      result += parseInt(number);
    }
    return result;
  };

  resetIfLeaveTheApb = function() {
    return $('#at-plus-container').on('mouseleave', function() {
      Button.prototype.resetAllButtons();
      return resetBubble();
    });
  };

  resetBubble = function() {
    var bubble;
    bubble = $('#info-bar');
    bubble.find('#sum').text('');
    return bubble.css('background-color', 'gray');
  };

}).call(this);