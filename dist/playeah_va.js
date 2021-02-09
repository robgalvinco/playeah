/* plaYEAH PowerUp For Thinkific (v1.0.6)
https://powerups.thinkific.com/pages/playeah
VideoAsk popup - v 1.0.1
*/
(function () {
    var video_asks = window._playeah.va;
    let prev_video_ask = null;
    
  
    console.log(video_asks);
    var _progress_start = -1;
    const hide_fs_lottie = function (){
        console.log("complete"); 
        $("#playeah-fs").hide();
        _playeah_lottie.removeEventListener('complete', hide_fs_lottie);

    }
    const open_url_new_tab = function(url){
        var win = window.open(url, '_blank');
        win.focus();        
    }

    const show_video_ask = function(index, user){
        var video_ask = video_asks[index];
        
        console.log(video_ask);
        if(video_ask.url != ""){
            if (prev_video_ask) {
                prev_video_ask.remove()        
                prev_video_ask = null
            }    
            if (video_ask.kind=="modal"){
                console.log("loading modal");
                window.videoask.loadModal({
                    "url": video_ask.url+"#contact_name="+user.full_name+"&contact_email="+user.email,
                    "options": video_ask.options,
                    "onLoadModal": function({element}){
                        prev_video_ask = element
                      }                    
                })          
    
            } else {
                console.log("loading embed");
                window.videoask.loadEmbed({
                    "kind": "widget",
                    "url": video_ask.url+"#contact_name="+user.full_name+"&contact_email="+user.email,
                    "options": video_ask.options
                }).then(function(element){
                    console.log("saving prev")
                    prev_video_ask = element
                })           
    
            }
        }

    }        

    

    const init = function(){
        $( document ).ready(function() {
        });
    }

    const inject_videoask= function(){
        var f = document.getElementsByTagName("script")[0],
           j = document.createElement("script");
           j.async = false;
           j.src = "https://www.videoask.com/embed/embed.js";
           f.parentNode.insertBefore(j, f);
   }

    Array.prototype.contains = function ( needle ) {
        for (i in this) {
            if (this[i] == needle) return true;
        }
        return false;
    }   
    const find_and_play = function( courseid,lessonid, user){
        console.log(courseid,lessonid);

        var _index = video_asks.findIndex(function(video_ask, index) {
            if(video_ask.type=="course" && video_ask.courseid == courseid && video_ask.lessonid == lessonid)
                return true;
        }); 
        console.log("course index: "+_index);
        if(_index != -1){
                show_video_ask(_index, user);
        
        }  else {
            // look for default one
            var _index = video_asks.findIndex(function(video_ask, index) {
                if(video_ask.type=="all_complete" )
                    return true;
            }); 
            console.log("course index: "+_index);
            if(_index != -1){
                show_video_ask(_index, user);
            }
        }
}

 
   $( document ).ready(function() {
        if(typeof(CoursePlayerV2) !== 'undefined') {
            
            inject_videoask();
        
        
            CoursePlayerV2.on('hooks:contentDidChange', function(data) {
                console.log("new content",data);
                if(_progress_start == -1){
                    console.log("Setting default");
                    _progress_start = data.enrollment.percentage_completed*100;
                    console.log("start: "+_progress_start)
                    //future pop video ask on course resume               
                }
                
            });

            CoursePlayerV2.on('hooks:contentWasCompleted', function(data) {
                console.log("completed:",data);

                find_and_play(data.course.id,data.lesson.id, data.user)
            });
             
        }

    });

        
        
    
}());
// widgetType: VideoThumbnailLarge, VideoThumbnailExtraLarge, VideoThumbnailJumbo, VideoThumbnailWindow, VideoThumbnailWindowSquare, VideoThumbnailWindowTall, VideoThumbnailSmall
// modalType; possible values are Side and Fullscreen
// Widget position, choose one of the following: top-left, top-right, bottom-left, bottom-right  
// text: for overlay
// backgroundColor
/* sample 
window._playeah_videoasks = [
    {
        type: "course",
        courseid: "1146281",
        lessonid: "20443089",
        url: "https://www.videoask.com/fuf8upzw9",
        kind: "modal",
        options: {
            "widgetType": "VideoThumbnailJumbo",
            "modalType": "Side",
            "position": "bottom-right",
            "text": "Jumbo",
            "backgroundColor": "#18CCA3",                
        }
    },
    {
        type: "course",
        courseid: "1146281",
        lessonid: "20442834",
        kind: "modal",
        url: "https://www.videoask.com/fwa0gqfh3",
        options: {
            "widgetType": "VideoThumbnailSmall",
            "modalType": "Side",
            "position": "bottom-right",
            "text": "Want some feedback?",
            "backgroundColor": "#18CCA3"
        }
       
        
    }
]
if(typeof(window._playeah)!= "undefined"){
    window._playeah.va = window._playeah_videoasks
} else {
    window._playeah = {
        va :window._playeah_videoasks
    }
}
*/