import $ from 'jquery';

class Site {
	constructor() {
		this.widthWindow = $(window).width();
	}

	/* плавный скрол по якорю.
	 * selector - родительского блока кнопки
	 * time - время прокрутки скролла
	 */
	scrollBTNinID(selector, btn_sel = '.btn', time = 600) {
		let $btn = $(selector).find(btn_sel);

		if ($btn.length > 0) {
			$btn.click(function () {
				$("html, body").animate({
					scrollTop: $($(this).attr("href")).offset().top + "px"
				}, {
					duration: time,
					easing: "swing"
				});
				return false;
			});
		}
	}

	/**
	 * получени ID-видео из URL-Youtube
	 */
	youTubeGetID(url) {
		let ID = '';
		url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
		if (url[2] !== undefined) {
			ID = url[2].split(/[^0-9a-z_\-]/i);
			ID = ID[0];
		} else {
			ID = url;
		}
		return ID;
	}

	/**
	 * @param {селектор контейнер YouTube блока} selBlock
	 * @param {селектор кастомной кнопки play} selBtn
	 */
	youtube(selBlock, selBtn) {
		let img = new Image();
		let $youtube = $(selBlock);

		let $btn,
			url,
			id,
			src_preview;

		if ($youtube.length > 0) {
			$btn = $('.js-basic-idea__video').find(selBtn);

			url = $('.js-basic-idea__video').attr('src-youtube');
			id = this.youTubeGetID(url);
			src_preview = `//img.youtube.com/vi/${id}/maxresdefault.jpg`;

			img.src = src_preview;
			img.onload = function () {
				let height = this.height;
				if (height > 480) {
					$youtube.css({
						'background-image': `url(${src_preview})`
					});
					$btn.attr('href', url);
				} else {
					src_preview = `//img.youtube.com/vi/${id}/sddefault.jpg`;

					$youtube.css({
						'background-image': `url(${src_preview})`
					});
					$btn.attr('href', url);
				}
			};
			img.onerror = function () {
				$youtube.css({
					'background-image': `url('/assets/img/content/basic-idea.jpg')`
				});
			};
		}
	}
}

export default new Site();