iY = function() {}

iY.prototype = {
    $header:  $('#uni-header-wrapper'),
    
    hideSidebarStuff: function() {
        $('#getting-started-wrapper,#network-type').remove(); 
    },
    
    fixHeader: function() {
        var self = this;
        self.$header.css({
            position: 'fixed', 
            top: 0, 
            zIndex: 100
        });
        $('.page-content').css({
            paddingTop: 40
        }); 
    },

    headerScrollToTop: function() {
        var self = this;
        self.$header.click(function(e) {
            $target = $(e.target);
       
            if($target.is(self.$header) || $target.is($('#uni-header'))) {
                $("body,html").animate({
                    scrollTop: 0
                }, 250);
            }
        });
    },
    
    fixLeftSidebar: function() {
        var self = this, 
        $wnd = $(window),
        $element = $('.yj-nav-menu'),
        timer,
        highEnough,
        topPosition = $element.position().top,
        headMargin;
        
        headMargin = self.$header.css('position') == 'fixed' ? 40 : 0;
        
        
        $wnd.scroll(function() {
            if (timer) {
                clearTimeout(timer);
            }
            
            timer = setTimeout(function() {
                timer = null;
                highEnough = ($wnd.height() - headMargin > $element.height());
                if ($wnd.scrollTop() >= topPosition && highEnough) {
                    $element.css({
                        position: 'fixed', 
                        top: headMargin
                    });
                } else {
                    $element.css({
                        position: '', 
                        top: ''
                    });
                }
            }, 25);
        
        
        });
    }
}

$(function() {
    chrome.extension.sendRequest({
        method: "getOptions"
    }, function(options) {
        options = JSON.parse(options);
        ym = new iY();
        $.each(options, function(methodName, value) {
            if (value) {
                ym[methodName]();
            }
        })
        
    });
});

