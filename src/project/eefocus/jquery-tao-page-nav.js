(function($, window, document, undefined) {
  // our plugin constructor
  var TaoPageNav = function(elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
    this.$win = $(window);
    this.sections = {};
    this.didScroll = false;
  };

  // the plugin prototype
  TaoPageNav.prototype = {
    defaults: {
      navItems: "a",
      currentClass: "current",
      changeHash: false,
      easing: "swing", //swing|linear
      filter: "",
      scrollSpeed: 750,
      scrollThreshold: 0.5,
      offsetTop: 100,
      paddingTop: 1
    },

    init: function() {
      // Introduce defaults that can be extended either
      // globally or using an object literal.
      this.config = $.extend({}, this.defaults, this.options, this.metadata);

      this.$nav = this.$elem.find(this.config.navItems);

      //Handle clicks on the nav
      this.$nav.on("click.taoPageNav", $.proxy(this.handleClick, this));

      this.getPositions();

      this.bindInterval();

      return this;
    },

    getHash: function($link) {
      return $link.attr("href").split("#")[1];
    },

    getPositions: function() {
      var self = this;
      var linkHref;
      var topPos;
      var $target;

      self.$nav.each(function() {
        linkHref = self.getHash($(this));
        $target = $("#" + linkHref);

        if ($target.length) {
          topPos = $target.offset().top - self.config.offsetTop;
          self.sections[linkHref] = Math.round(topPos);
        }
      });
    },

    getSection: function(windowPos) {
      var returnValue = null;

      for (var section in this.sections) {
        if (this.sections[section] < windowPos) {
          returnValue = section;
        }
      }

      return returnValue;
    },

    scrollChange: function() {
      var windowTop = this.$win.scrollTop();
      var position = this.getSection(windowTop);
      var $parent;

      if(position !== null) {
        $parent = this.$elem.find('a[href$="#' + position + '"]').parent();
        if(!$parent.hasClass(this.config.currentClass)) {
          this.adjustNav(this, $parent);
        }
      }
    },

    bindInterval: function() {
      var self = this;

      self.$win.on("scroll.taoPageNav", function() {
        self.didScroll = true;
      });

      self.t = setInterval(function() {
        if (self.didScroll) {
          self.didScroll = false;
          self.scrollChange();
        }
      }, 250);
    },

    adjustNav: function(self, $parent) {
      self.$elem
        .find("." + self.config.currentClass)
        .removeClass(self.config.currentClass);
      $parent.addClass(self.config.currentClass);
    },

    handleClick: function(e) {
      var self = this;
      var $link = $(e.currentTarget);
      var $parent = $link.parent();
      var newLoc = "#" + self.getHash($link);

      if (!$parent.hasClass(self.config.currentClass)) {
        //Change the highlighted nav item
        self.adjustNav(self, $parent);

        //Removing the auto-adjust on scroll
        self.unbindInterval();

        //Scroll to the correct position
        self.scrollTo(newLoc, function() {
          //Do we need to change the hash?
          if (self.config.changeHash) {
            window.location.hash = newLoc;
          }

          self.bindInterval();
        });
      }

      e.preventDefault();
    },

    scrollTo: function(target, callback) {
      var offset = $(target).offset().top - this.config.paddingTop;

      $("html, body").animate(
        {
          scrollTop: offset
        },
        this.config.scrollSpeed,
        this.config.easing,
        callback
      );
    },

    unbindInterval: function() {
      clearInterval(this.t);
      this.$win.unbind("scroll.taoPageNav");
    }
  };

  TaoPageNav.defaults = TaoPageNav.prototype.defaults;

  $.fn.taoPageNav = function(options) {
    return this.each(function() {
      new TaoPageNav(this, options).init();
    });
  };
})(jQuery, window, document);
