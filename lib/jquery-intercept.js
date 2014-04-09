/**
 * 既にエレメントにバインドされているイベントよりも先に実行されるイベントハンドラを登録する
 * 登録したコールバック内でevent.stopImmediatePropagation()を実行する事で、後続のイベントハンドラは実行されない
 * @method intercept
 * @class jQuery
 * @param type {string} 'click'とか。
 * @param fn {any} コールバック関数
 * @usage
 * - var interceptor = function(event) { event.stopImmediatePropagation(); return false; };
 * - $('a').intercept('click', interceptor);
 * - ...process...
 * - $('a').off('click', interceptor);
 */
(function ($) {
    $.fn.intercept = function(type, fn) {
        return this.each(function() {
            var funcs = ($._data(this, "events") || {})[type],
                copy = $.extend([], funcs),
                elem = $(this);
            elem.unbind(type);
            elem.bind(type, fn);
            $.each(copy, function(f) {
                f.guid = null;
                elem.bind(type, f);
            });
        });
    }
})(jQuery)
