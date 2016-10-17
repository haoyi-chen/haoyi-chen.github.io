'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global $, _, app, tumblr_api_read */
var tumblrTags = {};
app.partial.tumblr = function(){
	_(tumblr_api_read.posts).each(function(d, i){

		var caption = $('<aside class=\'vertical-middle\'><h3 class=\'caption\'>'+d['photo-caption']+'</h3></aside>')
			.sm(12).md(12).lg(12).xs(12).fontsize(13)
			.css('background-image', 'url(' + d['photo-url-500'] + ')')
			.css('background-size', 'cover')
			.css('background-position', 'center');

		var single = $('<aside style=\'cursor:pointer\'></aside>').addClass('single')
			.sm(6).xs(6).md(4).lg(4)
			.css('margin-bottom', '20px')
			.append(caption);

		if(typeof d.tags != 'undefined'){
			single.attr('data-tags', d.tags.join('|'));
		}

		$('.tumblr').addClass('row').fontsizeReset().append(single);
		caption.height(caption.outerWidth())
		.css('min-height', caption.outerWidth() +'px');

		$('a', caption).each(function(){
			$(this).html($(this).text())
				.addClass('notranslate')
				.on('click', function(e){
					e.stopPropagation();
				})
				.attr('target','_blank');
		});

		single.on('click', function(){
			var photos = [];
			if(d.photos.length){
				_(d.photos).each(function(photo, num){
					photos.push({
						'src': photo['photo-url-1280'],
						'thumb': photo['photo-url-250'],
						'subHtml': d['photo-caption']
					});
				});
			}else{
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
			}).on('onAfterAppendSubHtml.lg',function(){
				$('.lg-sub-html a').each(function(){
					$(this).html($(this).text())
						.addClass('notranslate')
						.attr('target','_blank');
				});
			});

		});
	});

	$(window).on('resize', function(){
		var caption = $('.single aside:visible');
		caption.height(caption.outerWidth())
		.css('min-height', caption.outerWidth() +'px');
	});

	_.each(tumblr_api_read.posts, function(d, i){
		_(d.tags).each(function(name, index){
			tumblrTags[name] = true;
		});
	});
	$('<li><a href=\'javascript:\'>all</a></li>').on('click', function(){
		$('.single').fadeIn(450);
	}).appendTo($('.nav'));

	_.each(tumblrTags, function(d, i){
		var a = $('<li><a href=\'javascript:\'>'+i+'</a></li>');
		a.attr('data-target', i);
		a.on('click', function(){
			var target = $(this).attr('data-target');
			_.each($('.single'), function(d, i){
				var tags = $(d).attr('data-tags') ? $(d).attr('data-tags').split('|') : [];
				if(_(tags).includes(target)){
					$(d).fadeIn(450);
				}else{
					$(d).fadeOut(250);
				}
			});
		});

		$('.nav').append(a);
	});



};
$.fn.sm = function(col){
	return this.addClass('col-sm-' + col);
};
$.fn.md = function(col){
	return this.addClass('col-md-' + col);
};
$.fn.xs = function(col){
	return this.addClass('col-xs-' + col);
};
$.fn.lg = function(col){
	return this.addClass('col-lg-' + col);
};

$.fn.fontsize = function(size){
	return this.addClass('fontsize-' + size);
};
$.fn.fontsizeReset = function(size){
	return this.addClass('fontsize-reset');
};
