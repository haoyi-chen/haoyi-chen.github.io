'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $ */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var app = {};
app.partial = {};

// var dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 網址為 gulp 或者 github 時 設定成debug 模式
var debug = /localhost[:]9000|nelson119.github.io/.test(location.href);

var share = {
	facebook: function facebook(href, title) {
		href = encodeURIComponent(href || location.href + '?utm_source=facebook&utm_medium=fbshare_m&utm_campaign=roseanni');
		title = encodeURIComponent(title || document.title);
		window.open('https://www.facebook.com/sharer.php?u=' + href + '&amp;t=' + title);
	},
	googleplus: function googleplus(href) {
		href = encodeURIComponent(href || location.href + '?utm_source=g+&utm_medium=fbshare_m&utm_campaign=roseanni');
		window.open('https://plus.google.com/share?url=' + href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	},
	email: function email(href, title) {
		href = encodeURIComponent(href || location.href + '?utm_source=email&utm_medium=fbshare_m&utm_campaign=roseanni');
		title = encodeURIComponent(title || document.title);
		var body = encodeURIComponent('' + href + ' #' + title + '');
		window.open('https://mail.google.com/mail/?view=cm&fs=1&to=&su=與你分享:' + title + '&body=' + body + '&bcc=');
	}
};

$(function () {
	// 定義每個section
	$.each(app.partial, function (name, init) {
		init();
	});

	//觸發第一次調整頁面尺寸
	$(window).trigger('resize');
	//分享按鈕

	$('.share .facebook').on('click', function (e) {
		share.facebook();

		e.stopPropagation();

		e.preventDefault();

		return false;
	});

	$('.share .googleplus').on('click', function (e) {
		share.googleplus();

		e.stopPropagation();

		e.preventDefault();

		return false;
	});

	$('.share .email').on('click', function (e) {
		share.email();

		e.stopPropagation();

		e.preventDefault();

		return false;
	});
});

//判斷是否具有屬性
$.fn.hasAttr = function (attributeName) {
	var attr = $(this).attr(attributeName);
	if ((typeof attr === 'undefined' ? 'undefined' : _typeof(attr)) !== (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined)) && attr !== false) {
		return true;
	} else {
		return false;
	}
};
//# sourceMappingURL=app.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global $, _, app, tumblr_api_read */

var tumblrTags = {};
app.partial.tumblr = function () {
	_(_.reverse(tumblr_api_read.posts)).each(function (d, i) {

		var caption = $('<aside class=\'vertical-middle\'><h3 class=\'caption\'>' + d['photo-caption'] + '</h3></aside>').sm(12).md(12).lg(12).xs(12).fontsize(13).css('background', 'url(' + d['photo-url-500'] + ')').css('background-size', 'cover');

		var single = $('<a href=\'javascript:\'></a>').addClass('single').sm(6).md(2).lg(2).xs(6).css('margin-top', '20px').append(caption);

		if (typeof d.tags != 'undefined') {
			single.attr('data-tags', d.tags.join(' '));
		}

		$('.jumbotron').addClass('row').fontsizeReset().append(single);
		caption.height(caption.outerWidth()).css('min-height', caption.outerWidth() + 'px');

		single.on('click', function () {
			var photos = [];
			if (d.photos.length) {
				_(d.photos).each(function (photo, num) {
					photos.push({
						'src': photo['photo-url-1280'],
						'thumb': photo['photo-url-250'],
						'subHtml': d['photo-caption']
					});
				});
			} else {
				photos.push({
					'src': d['photo-url-1280'],
					'thumb': d['photo-url-250'],
					'subHtml': d['photo-caption']
				});
			}
			$(single).lightGallery({
				thumbnail: true,
				dynamic: true,
				dynamicEl: photos
			});
		});
	});

	$(window).on('resize', function () {
		var caption = $('.single aside');
		caption.height(caption.outerWidth()).css('min-height', caption.outerWidth() + 'px');
	});

	_.each(tumblr_api_read.posts, function (d, i) {
		_(d.tags).each(function (name, index) {
			tumblrTags[name] = true;
		});
	});
	$('<li><a href=\'javascript:\'>all</a></li>').on('click', function () {
		$('.single').fadeIn(450);
	}).appendTo($('header .nav'));

	_.each(tumblrTags, function (d, i) {
		var a = $('<li><a href=\'javascript:\'>' + i + '</a></li>');
		a.attr('data-target', i);
		a.on('click', function () {
			var target = $(this).attr('data-target');
			_.each($('.single'), function (d, i) {
				var tags = $(d).attr('data-tags') ? $(d).attr('data-tags').split(' ') : [];
				if (_(tags).includes(target)) {
					$(d).fadeIn(450);
				} else {
					$(d).fadeOut(250);
				}
			});
		});

		$('header .nav').append(a);
	});
};
$.fn.sm = function (col) {
	return this.addClass('col-sm-' + col);
};
$.fn.md = function (col) {
	return this.addClass('col-md-' + col);
};
$.fn.xs = function (col) {
	return this.addClass('col-xs-' + col);
};
$.fn.lg = function (col) {
	return this.addClass('col-lg-' + col);
};

$.fn.fontsize = function (size) {
	return this.addClass('fontsize-' + size);
};
$.fn.fontsizeReset = function (size) {
	return this.addClass('fontsize-reset');
};
//# sourceMappingURL=tumblr.js.map
