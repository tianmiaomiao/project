/**
 * Created by tianmiao on 2018/2/9.
 * 操作页面历史记录
 */
(()=>{
    window.replaceHistoryState = function (replaceUrl, replaceTitle) {
        var href    = window.location.href;
        var title   = document.title;
        var history = window.history;

        history.replaceState({ replacePage: true}, replaceTitle, replaceUrl);
        history.pushState({}, title, href);
    };

    window.addEventListener('popstate', function () {
        const currentState = window.history.state;

        if (currentState && currentState.replacePage) {
            setTimeout(function () {
                window.location.reload(true)
            }, 200)
        }
    })
})();
