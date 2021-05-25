$( document ).ready(function() {
    if(typeof(CoursePlayerV2) !== 'undefined') {
        
        
    
        CoursePlayerV2.on('hooks:contentDidChange', function(data) {
            console.log(data);
            // For alt dashboard link
            if(typeof(window._alt_dash_links)!="undefined"){
                var __FOUND = window._alt_dash_links.findIndex(function(link, index) {
                    if(link.courseid == data.course.id)
                        return true;
                });
                if(__FOUND != -1){
                    $(".top-bar__dashboard-link__anchor").attr("href",window._alt_dash_links[__FOUND].dash_link);
                } else {
                     __FOUND = window._alt_dash_links.findIndex(function(link, index) {
                        if(link.courseid == "all")
                            return true;
                    });
                    if(__FOUND != -1){
                        $(".top-bar__dashboard-link__anchor").attr("href",window._alt_dash_links[__FOUND].dash_link);
                    }
                    
                }
                
            }                
            
        });
    }

});
