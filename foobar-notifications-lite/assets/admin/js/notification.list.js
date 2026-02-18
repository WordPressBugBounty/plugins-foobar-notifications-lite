"use strict";

(function (_, _utils, _is) {
  _utils.ready(function ($) {
    //when a foobar shortcode is clicked on
    $('.foobar-shortcode').on('click', function () {
      try {
        //select the contents
        this.select();

        //copy the selection
        document.execCommand('copy');

        //show the copied message
        $(this).siblings('.foobar-shortcode-message').show();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Oops, unable to copy!');
      }
    });
  });
  // eslint-disable-next-line no-undef
})(FooBar, FooBar.utils, FooBar.utils.is);
"use strict";

(function (_, _utils, _is) {
  _utils.ready(function ($) {
    //when a foobar preview link is clicked
    $('.foobar-admin-preview').on('click', function (e) {
      e.preventDefault();
      const $this = $(this),
        $row = $this.parents('tr:first'),
        foobarId = $this.data('foobar-id'),
        foobarUId = $this.data('foobar-uid'),
        data = {
          'action': 'foobar_admin_preview',
          'id': foobarId,
          '_wpnonce': $this.data('foobar-preview-nonce'),
          '_wp_http_referer': encodeURIComponent($('input[name="_wp_http_referer"]').val())
        };
      $row.addClass("foobar-preview-loading");
      //do a postback to get the bar content
      $.ajax({
        type: 'POST',
        url: ajaxurl,
        data: data,
        cache: false,
        success: function (html) {
          // dismiss all existing bars - dismissing is more extreme than destroy;
          // destroy leaves markup in place
          // dismiss removes everything from the page
          FooBar.dismissAll(true);

          //append the bar content to end of body
          $('body').append(html);

          //init the bar
          const bar = FooBar.create(foobarUId);
          if (bar instanceof FooBar.Bar) {
            bar.init();
          }
        }
      }).always(function () {
        $row.removeClass("foobar-preview-loading");
      });
    });
  });
  // eslint-disable-next-line no-undef
})(FooBar, FooBar.utils, FooBar.utils.is);
"use strict";

(function (_, _utils, _is) {
  _utils.ready(function ($) {
    //when a foobar clone link is clicked
    $('.foobar-admin-clone').on('click', function (e) {
      e.preventDefault();
      const $this = $(this),
        $row = $this.parents('tr:first'),
        data = {
          'action': 'foobar_admin_clone',
          'id': $this.data('post-id'),
          '_wpnonce': $this.data('nonce'),
          '_wp_http_referer': encodeURIComponent($('input[name="_wp_http_referer"]').val())
        };
      $row.addClass("foobar-preview-loading");

      //do a postback to clone the FooBar
      $.ajax({
        type: 'POST',
        url: ajaxurl,
        data: data,
        cache: false,
        success: function (response) {
          if (response && response.success) {
            location.reload();
          }
        }
      }).always(function () {
        $row.removeClass("foobar-preview-loading");
      });
    });
  });
  // eslint-disable-next-line no-undef
})(FooBar, FooBar.utils, FooBar.utils.is);