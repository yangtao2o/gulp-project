var clicked = false;
var awardMap = {
  "1": {
    angle: 23,
    text: "多媒体蓝牙音箱"
  },
  "0": {
    angle: 68,
    text: "谢谢参与"
  },
  "2": {
    angle: 113,
    text: "碧然德滤水壶"
  },
  "6": {
    angle: 158,
    text: "谢谢参与"
  },
  "3": {
    angle: 203,
    text: "小米无线充电器"
  },
  "7": {
    angle: 248,
    text: "谢谢参与"
  },
  "4": {
    angle: 293,
    text: "定制雨伞"
  },
  "5": {
    angle: 338,
    text: "小米小背包"
  }
};
(function($) {
  var moor8Lottery = {
    init: function() {
      this.getLatestAward();
      this.bindLotteryEvent();
    },
    isRotating: false,
    scrollWordInstance: null,
    awardMap: awardMap,
    getLatestAward: function() {
      // 此处为获得中奖信息列表的部分
      $.get("/activity/NI2019_5GM/awardlist", function(data) {
        var data = $.parseJSON(data);
        var awards = data.data;
        var html = "";
        if (awards) {
          if (self.scrollWordInstance) {
            clearInterval(self.scrollWordInstance.timer);
          }
          $.each(awards, function(i, item) {
            html +=
              '<li><span class="name">' +
              item.user_name +
              '</span><span class="prize">' +
              item.type +
              "</span></li>";
          });
          $("#js-cl-lottery-list").html(html);
          if (awards.length > 5) {
            self.scrollWordInstance = new ScrollWord("js-cl-lottery-list");
          }
        } else {
          $("#js-cl-lottery-list").html(
            '<li style="margin-top:40px;text-align: center;">暂时还没有动态</li>'
          );
        }
      });
    },

    bindLotteryEvent: function() {
      var self = this;
      $("#js-cl-lottery-start").rotate({
        bind: {
          click: function() {
            if (clicked) {
              return;
            }
            clicked = true;
            // 第三要判断是否已经在旋转抽奖，true则不能再点击
            if (self.isRotating) {
              return false;
            } else {
              //抽奖接口
              if (islogin == 0 || islogin == "0" || !islogin) {
                modalShow(null, "您还没有登陆呢");
                $("#myModal").on("click", "#sureBtn, #closeBtn", function() {
                  loginFunc("lottery");
                });
                clicked = false;
                return;
              } else {
                $.get("/activity/NI2019_5GM/lottery", function(data, status) {
                  var data = $.parseJSON(data);
                  var code = data.code;
                  if (data.error) {
                    modalShow(null, data.error);
                    clicked = false;
                    return;
                  } else {
                    if (code == 1 || code == "1") {
                      modalShow(null, data.message);
                      clicked = false;
                      return;
                    } else {
                      if (data.type == 0) {
                        var type = [6, 7, 0];
                        data.type =
                          type[Math.floor(Math.random() * type.length)];
                      }
                      var award = self.awardMap[data.type];
                      self.isRotating = false;
                      self.rotateFunc(award);
                    }
                  }
                });
              }
            }
          }
        }
      });
      self.resetAngle();
    },
    rotateFunc: function(award) {
      var self = this;
      $("#js-cl-lottery-pointer").stopRotate();
      $("#js-cl-lottery-pointer").rotate({
        angle: 0,
        duration: 5000,
        animateTo: award.angle + 360 * 4,
        callback: function() {
          var awardTit = "";
          var awardTxt = award.text;

          if (awardTxt == "谢谢参与") {
            awardTit = "很遗憾";
          } else {
            awardTit = "中奖啦";
          }

          if (award.callback) {
            award.callback();
          }

          modalShow(awardTit, awardTxt);

          self.getLatestAward();
          clicked = false;
        }
      });
    },
    resetAngle: function() {
      $("#js-cl-lottery-pointer").rotate({
        angle: 0,
        duration: 1,
        animateTo: 359,
        callback: function() {
          // $('#js-cl-lottery-pointer').removeClass('invisible');
        }
      });
    }
  };
  window.moor8Lottery = moor8Lottery;
})(jQuery);

// Lottery
moor8Lottery.init();
