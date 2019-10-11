var category    = '<?php echo $category;?>';
var $zipSelect  = $("#zipSelect");
var $mask       = $("#mask");
var $parent_nav = $zipSelect.find(".parent-nav");
var $child_nav  = $parent_nav.find(".child-nav");
var model_all   = [];
var datas       = {};
tab_list(category);
get_list(category);

/* 
**tag切换 
*1、点击产品型号之后，后续的直接刷新，不可再次点击；
*2、点击其他的，判断是否产品型号是否已被点击（根据内容判断）；
*/
$parent_nav.on("click", ".nav-name", function() {
  var $this    = $(this);
  var $display = $this.next();
  var $content = $this.children('.name').text();
  var $names   = $("#tab_all").find(".name");
  var target   = $names.eq(0).text();

  if(target != "产品型号") {
    if($content == target) {
      if($display.is(":hidden")) {
        $display.show();
        $this.addClass('wordcolor');
      } else {
        $display.hide();
        $this.removeClass('wordcolor');
      }
    } 
    showMask();
    return false;
  } else {
    if($display.is(":hidden")) {
      $display.show().parent().siblings().children(".child-nav").hide();
      $this.addClass('wordcolor');
    } else {
      $display.hide();
      $this.removeClass('wordcolor');
    }
    showMask();
  }
});
/* 
**tag子类切换 
*1、设置各个独立的块，进行各自的运行步骤；
*2、如有各自的值，则传值；
*3、循环更换tag内容，也是使用了独自的方法；
*/
$child_nav.on("click", ".text", function() {
  var $this         = $(this);
  var $content      = $this.text();
  var $parent       = $this.parents(".child-nav");
  var $target       = $parent.prev(".nav-name").children(".name");
  var id            = $parent.eq(0).attr("id");
  var num           = $this.attr("data-index");
  var child_content = [];
  var t_model       = '';
  var t_flash       = '';
  var t_ram         = '';
  var t_package     = '';
  var t_pin         = '';

  child_content.push($content);

  $this.addClass('wordcolor').parent().siblings().children().removeClass('wordcolor');
  $target.text($content);
  $parent.hide();

  if(id == "tab_v1"){
    /*循环更换tag内容*/
    var model = model_all;
    var $name = $("#tab_all").find(".name");
    model     = model[num];
    t_model   = $content;
    t_flash   = model["flash"];
    t_ram     = model["ram"];
    t_pin     = model["pin"];
    t_package = model["package"];
    $name.parent().addClass('wordcolor');
    $name.eq(1).text(t_flash);
    $name.eq(2).text(t_ram);
    $name.eq(3).text(t_pin);
    $name.eq(4).text(t_package);
    get_list(category,1,t_model,t_flash,t_ram,t_pin,t_package);

  } else {
    if(id == "tab_v2"){datas.t_flash = child_content;}
    if(id == "tab_v3"){datas.t_ram = child_content;}
    if(id == "tab_v4"){datas.t_pin = child_content;}
    if(id == "tab_v5"){datas.t_package = child_content;}

    if(datas.t_flash){t_flash = datas.t_flash[0];}
    if(datas.t_ram){t_ram = datas.t_ram[0];}
    if(datas.t_pin){t_pin = datas.t_pin[0];}
    if(datas.t_package){t_package = datas.t_package[0];}

    get_list(category,1,t_model,t_flash,t_ram,t_pin,t_package);
  }
  hideMask();
});

//清除所有，恢复如初
$("#clearBtn").on("click", function() {
  var $this = $(this);
  var $name = $this.parent().siblings().children();
  datas = {};

  $child_nav.hide();
  hideMask();
  $name.removeClass('wordcolor');
  $name = $name.children('.name');
  $.each($name, function(i, item) {
    var $that = $(this);
    $that.text($that.attr("data-name"));
  });
  get_list(category);
});

$mask.on("click", function() {
  if($child_nav.is(":visible")) {
    $child_nav.hide();
    hideMask();
  }
})

/* 
**判断三项的文档是否为空 
*/
var file_html = function(html) {
  var hl = '';
  if(html) {
    var fa_txt = "fa-file-text || fa-paperclip";
    $.each(html, function(i, item) {
      var txt = item["version"];
      var attachment = item["type"];
      if(attachment == "attachment") {
        fa_txt = "fa-paperclip";
      } else {
        fa_txt = "fa-file-text";
      }
      if(txt == '') {
        txt = '';
      } else {
        txt = txt;
      }
      hl = '<div><a href="'+ item["download_url"] +'" target="_blank" id="'+ item["id"] +'" class="addDownLog"><i class="fa '+ fa_txt +' fa-lg"></i> <span class="text-muted">'+ txt +'</span></a></div>';
    });
  } else {
    hl = '<span class="text-muted">无</span>';
  }
  return hl;
};

/* 
**获取tab函数 
**循环取出各自的值，然后拼接
*/
function tab_list(category, model) {
  var data = {};
  if(category) {data.category = category;}
  if(model) {data.model = model;}
  $.ajax({
    url: '//www.nxpic.org/document/list/getdocList',
    dataType: 'json',
    data: data,
    cache: false,
    type: 'GET',
    success: function(data) {
      var type    = data.type;
      model_all   = type.all;
      var flash   = type.flash;
      var ram     = type.ram;
      var pin     = type.pin;
      var package = type.package;
      var html1   = '';
      var html2   = '';
      var html3   = '';
      var html4   = '';
      var html5   = '';
      var prev = '<li class="up"><span class="fa fa-angle-up"></span></li>';
      if(model_all) {
        $.each(model_all, function(i,item) {
          html1 += prev + '<li><a class="text" data-index="'+ i +'">' + item["model"] + '</a></li>';
          $("#tab_v1").html(html1);
        });
      }
      if(flash) {
        $.each(flash, function(i,item) {
          html2 += prev + '<li><a class="text">' + item + '</a></li>';
          $("#tab_v2").html(html2);
        });
      }
      if(ram) {
        $.each(ram, function(i,item) {
          html3 += prev + '<li><a class="text">' + item + '</a></li>';
          $("#tab_v3").html(html3);
        });
      }
      if(pin) {
        $.each(pin, function(i,item) {
          html4 += prev + '<li><a class="text">' + item + '</a></li>';
          $("#tab_v4").html(html4);
        });
      }
      if(package) {
        $.each(package, function(i,item) {
          html5 += prev + '<li><a class="text">' + item + '</a></li>';
          $("#tab_v5").html(html5);
        });
      }

    },
    error: function(error) {
      // console.log("error",error);
      return false;
    }
  });
}

/* 
**获取主要内容函数 
*/
function get_list(category,p,model,flash,ram,pin,package) {
  var data = {};
  if(category) { data.category = category;}
  if(p) {        data.p        = p;}
  if(model) {    data.model    = model;}
  if(flash) {    data.flash    = flash;}
  if(ram) {      data.ram      = ram;}
  if(pin) {      data.pin      = pin;}
  if(package) {  data.package  = package;}
    
  $.ajax({
    url: '//www.nxpic.org/document/list/getdocList',
    dataType: 'json',
    cache: false,
    data: data,
    type: 'POST',
    success: function(data) {
      // console.log(data);
      var html1   = '';
      var html2   = '';
      var html3   = '';
      var html4   = '';
      var html5   = '';
      var prev = '<li class="up"><span class="fa fa-angle-up"></span></li>';

      var doc     = data.doc;
      var type    = data.type;
      var pagenum = data.pagination;
      var page    = pagenum.page;
      var total   = pagenum.totalPage;

      if (data.res) {
        $("#tab_v1").html('');
        $("#tab_v2").html('');
        $("#tab_v3").html('');
        $("#tab_v4").html('');
        $("#tab_v5").html('');

        var res     = data.res;
        var flash1   = res.flash;
        var model_res   = res.model;
        model_all   = res.all;
        var pin1     = res.pin;
        var ram1     = res.ram;
        var package1 = res.package;

        if(model_res) {
          $.each(model_res, function(i,item) {
            html1 += prev + '<li><a class="text" data-index="'+ i +'">' + item + '</a></li>';
            $("#tab_v1").html(html1);
          });
        }

        if(flash1) {
          $.each(flash1, function(i,item) {
            html2 += prev + '<li><a class="text">' + item + '</a></li>';
            $("#tab_v2").html(html2);
          });
        }

        if(ram1) {
          $.each(ram1, function(i,item) {
            html3 += prev + '<li><a class="text">' + item + '</a></li>';
            $("#tab_v3").html(html3);
          });
        }

        if(pin1) {
          $.each(pin1, function(i,item) {
            html4 += prev + '<li><a class="text">' + item + '</a></li>';
            $("#tab_v4").html(html4);
          });
        }

        if(package1) {
          $.each(package1, function(i,item) {
            html5 += prev + '<li><a class="text">' + item + '</a></li>';
            $("#tab_v5").html(html5);
          });
        }
      }

      if (data.type) {
        $("#tab_v1").html('');
        $("#tab_v2").html('');
        $("#tab_v3").html('');
        $("#tab_v4").html('');
        $("#tab_v5").html('');

        var flash2   = type.flash;
        var pin2     = type.pin;
        var ram2     = type.ram;
        var package2 = type.package;
        var model2 = type.model;
        model_all   = type.all;

        if(model2) {
          $.each(model2, function(i,item) {
            html1 += prev + '<li><a class="text" data-index="'+ i +'">' + item + '</a></li>';
            $("#tab_v1").html(html1);
          });
        }

        if(flash2) {
          $.each(flash2, function(i,item) {
            if (item != 0) {
              html2 += prev + '<li><a class="text">' + item + '</a></li>';
            }            
            $("#tab_v2").html(html2);
          });
        }

        if(ram2) {
          $.each(ram2, function(i,item) {
            html3 += prev + '<li><a class="text">' + item + '</a></li>';
            $("#tab_v3").html(html3);
          });
        }

        if(pin2) {
          $.each(pin2, function(i,item) {
            html4 += prev + '<li><a class="text">' + item + '</a></li>';
            $("#tab_v4").html(html4);
          });
        }

        if(package2) {
          $.each(package2, function(i,item) {
            html5 += prev + '<li><a class="text">' + item + '</a></li>';
            $("#tab_v5").html(html5);
          });
        }
      }
      
      var trhtml  = '';      

      if(doc.length != 0) {
        $.each(doc, function(i, item) {
          var time = item["time_update"];
          var file = item["file"];
          var zh   = file["zh"];
          var en   = file["en"];
          var zip  = file["attachment"];
          
              zh   = file_html(zh);
              en   = file_html(en);
              zip  = file_html(zip);
              time = format(time);
          
          trhtml += '<tr><td><a href="'+ item["url"] +'" class="js-document-title">'+ item["title"] +'</a></td>'+
          '<td>'+ zh +'</td>'+
          '<td>'+ en +'</td>'+
          '<td>'+ zip+'</td>'+
          '<td>'+time+'</td></tr>';
          $("#pageCode").show();
          $("#pageCode").createPage({
            pageCount: total,   //page的总页数
            current: p,         //点击的当前页，初始默认值为1
            backFn:function(p){
              get_list(category,p,model,flash,ram,pin,package);
            }
          });
        });
      } else {
        trhtml += '<tr><td>很抱歉，没有相关文档...</td></tr>';
        $("#pageCode").hide();
      }
      $("#tbody").html(trhtml);
    },
    error: function(error) {
      // console.log("error", error);
    }

  });
}
//时间戳转化函数
function format(fmt) {
    var time = new Date(fmt * 1000);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    return y+'-'+add0(m)+'-'+add0(d);
}
function add0(m) {
  return m<10 ? '0'+m : m;
}

function showMask() {
  $mask.css({
    "height": $(document).height(),
    "width": $(document).width()
  }).show();
}

function hideMask() {
  $mask.hide();
}
