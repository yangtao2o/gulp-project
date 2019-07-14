/**
 * @file Register about ST V3
 * @author taoyang <tao.yang@supplyframe.cn>
 * @copyright 2019 Eefocus TechTeam
 */

(function($) {
  var Register = function() {
    this.optsOfsetPassword = {};
    this.setPassword = Register.setPassword;
    this.fillBasicForm = Register.fillBasicForm;
  };

  Register.prototype = {
    setPasswordInit: function() {
      this.setPassword.init();
    },
    fillBasicFormInit: function() {
      this.fillBasicForm.init();
    },
    resetPassword: function(target) {
      this.setPassword.checkPasswordSure(target);
    },
    getCurrentTab: getCurrentTab,
    getStepLink: getStepLink,
    historyStep: historyStep,
    currentTabToggle: currentTabToggle,
    showErrorMsg: showErrorMsg,
    hideErrorMsg: hideErrorMsg,
    setTimer: setTimer,
    validatePhone: validatePhone,
    validatePassword: validatePassword,
    validatePasswordSure: validatePasswordSure,
    validateEmail: validateEmail,
    validateCaptcha: validateCaptcha
  };

  Register.setPassword = {
    opts: {
      $pwform: $("#setPasswordForm"),
      $myName: $("#inputMyname"),
      $pwSure: $("#inputPasswordSure"),
      $btn: $("#passwordButton")
    },
    init: function() {
      this.getActionUrl(this.opts.$pwform);
      this.checkMyname(this.opts.$myName);
      this.checkPasswordSure(this.opts.$pwSure);
      this.submitClick(this.opts.$btn);
    },
    isTarget: function(target) {
      return target.length > 0 ? true : false;
    },
    getErrorTarget: function(target) {
      if (!this.isTarget(target)) return;
      return $(target)
        .parent()
        .find(".is-error");
    },
    getActionUrl: function(target) {
      if (!this.isTarget(target)) return;
      getFormAction(target);
    },
    checkMyname: function(target) {
      if (!this.isTarget(target)) return;
      $(target).blur(function() {
        validateMyname();
      });
    },
    checkPasswordSure: function(target) {
      if (!this.isTarget(target)) return;
      $(target)
        .focus(function() {
          validatePassword(target);
        })
        .blur(function() {
          if (!validatePasswordSure(target)) return;
        });
    },
    submitClick: function(target) {
      if (!this.isTarget(target)) return;
      var self = this;
      var $error;
      $(target).click(function() {
        validateMyname();
        validatePassword();
        validatePasswordSure();

        $error = self.opts.$pwform.find(".error");
        if ($error.length < 1) {
          self.opts.$pwform.submit();
        }
        return false;
      });
    }
  };

  Register.fillBasicForm = {
    opts: {
      $form: $("#baseMsgForm"),
      $name: $("#inputRealname"),
      $phone: $("#inputPhone"),
      $email: $("#inputEmail"),
      $address: $("#inputAddress"),
      $company: $("#inputCompanyName"),
      $industry: $("#inputIndustry"),
      $position: $("#inputPosition"),
      $otherPosition: $("#inputOtherPosition"),
      $captcha: $("#inputCaptcha"),
      $agree: $("#inputAgree"),
      $btn: $("#basicFormBtn")
    },
    init: function() {
      this.checkRealName(this.opts.$name, validateRealname);
      this.checkPhone(this.opts.$phone, validatePhone);
      this.checkEmail(this.opts.$email, validateEmail);
      this.checkAddress(this.opts.$address, validateAdress);
      this.checkCompany(this.opts.$company, validateCompany);
      this.checkIndustry(this.opts.$industry, validateIndustry);
      this.checkPosition(this.opts.$position, validatePosition);
      this.checkAgree(this.opts.$agree, validateAgree);
      this.submitClick(this.opts.$btn);
    },
    checkRealName: function(target, fn) {
      this.blurEvent(target, fn);
    },
    checkPhone: function(target, fn) {
      if (this.opts.$phone.length > 0) {
        this.blurEvent(target, fn);
      }
    },
    checkEmail: function(target, fn) {
      if (this.opts.$email.length > 0) {
        this.blurEvent(target, fn);
      }
    },
    checkAddress: function(target, fn) {
      this.focusEvent(target, fn);
    },
    checkCompany: function(target, fn) {
      this.blurEvent(target, fn);
    },
    checkIndustry: function(target, fn) {
      this.changeEvent(target, fn);
      this.blurEvent(target, fn);
    },
    checkPosition: function(target, fn) {
      this.changeEvent(target, fn);
      this.blurEvent(target, fn);
    },
    checkAgree: function(target, fn) {
      this.changeEvent(target, fn);
    },
    submitClick: function(target) {
      if (!this.isTarget(target)) return;
      var self = this;
      var $error;
      $(target).click(function() {
        validateRealname(self.opts.$name);
        validateAdress(self.opts.$address);
        validateCompany(self.opts.$company);
        validateIndustry(self.opts.$industry);
        validatePosition(self.opts.$position);
        validateAgree(self.opts.$agree);

        if (self.opts.$phone.length > 0) {
          validatePhone(self.opts.$phone);
        }
        if (self.opts.$email.length > 0) {
          validateEmail(self.opts.$email);
        }

        $error = self.opts.$form.find(".error");
        if ($error.length < 1) {
          self.opts.$form.submit();
        }
        return false;
      });
    },
    isTarget: function(target) {
      return target.length > 0 ? true : false;
    },
    blurEvent: function(target, fn) {
      if (!this.isTarget(target)) return;
      $(target).blur(function() {
        fn(target);
      });
      return this;
    },
    focusEvent: function(target, fn) {
      if (!this.isTarget(target)) return;
      $(target).focus(function() {
        fn(target);
      });
      return this;
    },
    changeEvent: function(target, fn) {
      if (!this.isTarget(target)) return;
      $(target).change(function() {
        fn(target);
      });
    }
  };

  function validatePhone() {
    var phone_reg = /^1[3456789]\d{9}$/;
    var opts = {
      $target: $("#inputPhone"),
      $errorTarget: null,
      msg: "手机号码不能为空",
      msgReg: "手机号码格式有误",
      reg: phone_reg
    };
    opts.$errorTarget = getErrorTarget(opts.$target);
    validateInput(opts);
  }

  function validateEmail() {
    var mail_reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var opts = {
      $target: $("#inputEmail"),
      $errorTarget: null,
      msg: "邮箱不能为空",
      msgReg: "邮箱格式有误",
      reg: mail_reg
    };
    opts.$errorTarget = getErrorTarget(opts.$target);
    validateInput(opts);
  }

  function validateMyname() {
    var name_reg = /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/;
    var opts = {
      $target: $("#inputMyname"),
      $errorTarget: null,
      msg: "昵称不能为空",
      // msgReg: "中文、英文、数字但不包括下划线等符号",
      // reg: name_reg
    };
    opts.$errorTarget = getErrorTarget(opts.$target);
    validateInput(opts);
  }

  function validateRealname(target) {
    var name_reg = /^[\u4E00-\u9FA5A-Za-z]{2,10}$/;
    var opts = {
      $target: $(target),
      $errorTarget: null,
      msg: "姓名不能为空",
      msgReg: "仅限中英文且至少两个字符",
      reg: name_reg
    };
    opts.$errorTarget = getErrorTarget(opts.$target);
    validateInput(opts);
  }

  function validatePassword(target) {
    var password_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    var opts = {
      $target: $("#inputPassword"),
      $errorTarget: null,
      msg: "密码不能为空",
      msgReg: "密码必须为8-16位字母和数字",
      reg: password_reg
    };
    opts.$errorTarget = getErrorTarget(opts.$target);
    if (!validateInput(opts)) {
      return false;
    }
    return true;
  }

  function validatePasswordSure(target) {
    var opts = {
      $target: $("#inputPasswordSure"),
      $targetPw: $("#inputPassword"),
      $errorTarget: null,
      msg: "请再次输入密码"
    };
    opts.$errorTarget = getErrorTarget(opts.$target);
    if (!validatePassword()) {
      opts.$target.val("");
      return false;
    }
    if (validateInput(opts)) {
      if (opts.$target.val() !== opts.$targetPw.val()) {
        showErrorMsg(opts.$errorTarget, "两次输入的密码不一致");
        return false;
      }
    }
    return true;
  }

  function validateAdress() {
    var opts = {
      $target: $('#selectAddress'),
      $province: null,
      $errorTarget: null,
      msg: "请选择您所处的地区",
    };

    opts.$errorTarget = getErrorTarget(opts.$target);

    function getValue(name) {
      return $.trim(opts.$target.find('select[name="'+ name +'"]').val());
    }

    if(!getValue('province') || !getValue('area') || !getValue('town')) {
      showErrorMsg(opts.$errorTarget, opts.msg);
    } else {
      hideErrorMsg(opts.$errorTarget);
    }

  }

  function validateCompany(target) {
    // var reg = /^[\u4E00-\u9FA5A-Za-z]{2,20}$/;
    var opts = {
      $target: $(target),
      $errorTarget: null,
      msg: "公司名称不能为空",
      // msgReg: "中文、英文、但不包括下划线等符号",
      // reg: reg
    };
    opts.$errorTarget = getErrorTarget(opts.$target);
    validateInput(opts);
  }

  function validateIndustry(target) {
    var opts = {
      $target: $(target),
      $errorTarget: null,
      msg: "请选择您的所属行业"
    };
    opts.$errorTarget = getErrorTarget(opts.$target);
    if (!validateSelect(opts)) {
      showErrorMsg(opts.$errorTarget, opts.msg);
    }
  }

  function validatePosition(target) {
    var opts = {
      $target: $(target),
      $errorTarget: null,
      msg: "请选择您的职位"
    };
    opts.$errorTarget = getErrorTarget(opts.$target);
    if (!validateSelect(opts)) {
      showErrorMsg(opts.$errorTarget, opts.msg);
    } else {
      if(opts.$target.val() == '其他') {
        validateOtherPosition();
      }
    }
  }

  function validateOtherPosition(target) {
    var opts = {
      $target: $('#inputOtherPosition'),
      $errorTarget: null,
      msg: "工作职位不能为空"
    };
    opts.$errorTarget = getErrorTarget(opts.$target);
    $(opts.$target).blur(function() {
      if(opts.$target.val() == '') {
        showErrorMsg(opts.$errorTarget, opts.msg);
      } else {
        hideErrorMsg(opts.$errorTarget);
      }
    });
  }

  function validateCaptcha(target) {
    var reg = /^[A-Za-z0-9]{4}$/;
    var opts = {
      $target: $(target),
      $errorTarget: null,
      msg: "请输入验证码",
      msgReg: "验证码格式错误",
      reg: reg
    };
    opts.$errorTarget = getErrorTarget(opts.$target);
    if(!validateInput(opts)) {
      return false;
    }
    return true;
  }

  function validateAgree(target) {
    var opts = {
      $target: $(target),
      $errorTarget: $('#agree-error'),
      isChecked: false,
      msg: "要完成注册必须阅读并同意平台使用条款、隐私条款和cookie政策!",
    };
    if (!opts.$target.is(':checked')) {
      showErrorMsg(opts.$errorTarget, opts.msg);
      return false;
    }
    hideErrorMsg(opts.$errorTarget);
    return true;
  }

  // 获取验证码倒计时
  function setTimer() {
    var opts = {
      interval: 30, // 倒计时时长
      $getSmsCode: $("#getSmsCode"),
      $resendCode: $("#resendCode")
    };
    opts.$getSmsCode.addClass("hide");
    opts.$resendCode.removeClass("hide");
    opts.$resendCode.find("em").html(opts.interval);
    var timer = setInterval(function() {
      opts.interval--;
      if (opts.interval < 10) {
        opts.interval = "0" + opts.interval;
      }
      opts.$resendCode.find("em").html(opts.interval);

      if (opts.interval <= 0) {
        clearInterval(timer);
        opts.$getSmsCode.removeClass("hide");
        opts.$resendCode.addClass("hide");
        opts.interval = 0;
      }
    }, 1000);
  }

  // 判断是否为空
  function validateInput(opts) {
    if (!opts.$target && opts.$errorTarget) return;
    opts = {
      $target: opts.$target,
      $errorTarget: opts.$errorTarget,
      msg: opts.msg || "必填项",
      msgReg: opts.msgReg || "格式有误",
      reg: opts.reg || "",
      inputValue: opts.$target.val()
    };
    // opts.inputValue = $.trim(opts.$target.val());

    if (!opts.inputValue) {
      showErrorMsg(opts.$errorTarget, opts.msg);
      return false;
    }

    // 判断是否满足相应格式
    if (opts.reg != "" && !opts.reg.test(opts.inputValue)) {
      showErrorMsg(opts.$errorTarget, opts.msgReg);
      return false;
    }

    hideErrorMsg(opts.$errorTarget);
    return true;
  }

  function validateSelect(opts) {
    if (!opts.$target && opts.$errorTarget) return;
    opts = {
      $target: opts.$target,
      $errorTarget: opts.$errorTarget,
      msg: opts.msg || "不能为空",
      value: opts.$target.val()
    };
    if (opts.value == "") {
      showErrorMsg(opts.$errorTarget, opts.msg);
      return false;
    }

    hideErrorMsg(opts.$errorTarget);
    return true;
  }

  // 显示错误信息
  function showErrorMsg(target, msg) {
    if (!target && !msg) return;
    $(target)
      .addClass("error")
      .text(msg)
      .show();
  }

  // 隐藏错误信息
  function hideErrorMsg(target) {
    if (!target) return;
    $(target)
      .removeClass("error")
      .hide();
  }

  function getErrorTarget(target) {
    if (!isTarget(target)) return;
    return $(target)
      .parent()
      .find(".is-error");
  }

  function isTarget(target) {
    return target ? true : false;
  }

  function currentTabToggle(target, index) {
    $(target)
      .eq(index)
      .addClass("active")
      .siblings()
      .removeClass("active");
  }

  function getCurrentTab() {
    var index;
    var $rMainNav = $("#rMainNav li");
    var $rMainTab = $("#rMainTab .tab-pane");
    var winHash = window.location.hash;
    if (winHash === "#email" || winHash.indexOf("email") != -1) {
      index = 1;
    } else {
      index = 0;
    }
    currentTabToggle($rMainNav, index);
    currentTabToggle($rMainTab, index);
  }

  function getStepLink(obj) {
    if (!obj) return;
    var l = $(obj).attr("href");
    l = setNewLink(l);
    $(obj).attr("href", l);
  }

  function getFormAction(obj) {
    if (!obj) return;
    var action = $(obj).attr("action");
    action = setNewLink(action);
    $(obj).attr("action", action);
  }

  function setNewLink(link) {
    if (!link) return;
    var winHash = window.location.hash;
    if (winHash === "#email" || winHash.indexOf("email") != -1) {
      link += "#email";
    } else {
      link += "#phone";
    }
    return link;
  }

  function historyStep(status) {
    status = status || "back";
    if (status === "back") {
      window.history.back();
    } else {
      window.history.forward();
    }
  }

  window.Register = Register;
})(jQuery);
