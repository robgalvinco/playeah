(function () {
    var celebrations = window._playeah.celebrations;
    var _playeah_lottie = null;
    var _progress_start = -1;
    const hide_fs_lottie = function (){
        console.log("complete"); 
        $("#playeah").hide();
        _playeah_lottie.removeEventListener('complete', hide_fs_lottie);

    }

    const show_celebration = function(index){
        var celebration = celebrations[index];
        console.log(celebration);
        if(!celebration.played){
            if(celebration.type=="full"){
                _playeah_lottie=document.querySelector("lottie-player");
                _playeah_lottie.addEventListener('complete', hide_fs_lottie);
        
                $("#playeah").show();
                _playeah_lottie.load(celebration.lottie);
                celebrations[index].played = true;            
            }
            if(celebration.type=="modal" || celebration.type=="push" || celebration.type=="nudge"){
                //set modal content
                if(celebration.heading != ""){
                    $(".playeah-modal-heading").show();
                    $(".playeah-modal-heading").text(celebration.heading)
                } else {
                    $(".playeah-modal-heading").hide();
                }
                if(celebration.copy != ""){
                    $(".playeah-modal-copy").show();
                    $(".playeah-modal-copy").text(celebration.copy)
                } else {
                    $(".playeah-modal-copy").hide();
                }
                if(celebration.cta_text != "" && celebration.cta_link != ""){
                    $(".playeah-modal-cta").show();
                    $(".playeah-modal-cta").attr("href",celebration.cta_link);
                    $(".playeah-modal-cta").text(celebration.cta_text);
                } else {
                    $(".playeah-modal-cta").hide();
                }
                //load lottie
                var lottie_html = '<lottie-player  src="'+celebration.lottie+'" background="transparent"  speed="1"  style="height: 100%;"  loop  autoplay></lottie-player>';
                $(".playeah-modal-image").html(lottie_html);
                console.log(celebration.type);
                switch(celebration.type) {
                    case "push":
                        if(celebration.color_bg != ""){
                            style_html = '<style>#playeah-push .uk-offcanvas-bar{background-color:'+celebration.color_bg+';}</style>';
                        }
                        if(celebration.color_heading != ""){
                            style_html += '<style>#playeah-push .playeah-modal-heading{color:'+celebration.color_heading+'!important;}</style>';
                        }
                        if(celebration.color_copy != ""){
                            style_html += '<style>#playeah-push .playeah-modal-copy{color:'+celebration.color_copy+'!important;}</style>';
                        }
                        if(celebration.color_cta_bg != "" && celebration.color_cta_text !=""){
                            style_html += '<style>#playeah-push .uk-button-primary {background-color: '+celebration.color_cta_bg+' !important;color: '+celebration.color_cta_text+' !important;}</style>';
                        }
                        style_html += '<style>#playeah-push .uk-offcanvas-bar .uk-close{color:'+celebration.color_copy+'!important;}'

                        $("#playeah-style").html(style_html);
                        UIkit.offcanvas($("#playeah-push")).show();
                        break;
                    case "modal":
                        if(celebration.color_bg != ""){
                            style_html = '<style>.uk-modal-dialog{background-color:'+celebration.color_bg+';}</style>';
                        }
                        if(celebration.color_heading != ""){
                            style_html += '<style>.uk-modal-dialog .playeah-modal-heading{color:'+celebration.color_heading+'!important;}</style>';
                        }
                        if(celebration.color_copy != ""){
                            style_html += '<style>.uk-modal-dialog .playeah-modal-copy{color:'+celebration.color_copy+'!important;}</style>';
                        }
                        if(celebration.color_cta_bg != "" && celebration.color_cta_text !=""){
                            style_html += '<style>.uk-modal-dialog .uk-button-primary {background-color: '+celebration.color_cta_bg+' !important;color: '+celebration.color_cta_text+' !important;}</style>';
                        }
                        $("#playeah-style").html(style_html);

                        UIkit.modal($("#playeah-modal")).show();
                        break;
                    case "nudge":
                        console.log("nudge");
                        var style_html = "";
                        if(celebration.color_bg != ""){
                            style_html = '<style>.uk-notification-message{background-color:'+celebration.color_bg+';}</style>';
                        }
                        if(celebration.color_heading != ""){
                            style_html += '<style>.uk-notification-message .playeah-modal-heading{color:'+celebration.color_heading+'!important;}</style>';
                        }
                        if(celebration.color_copy != ""){
                            style_html += '<style>.uk-notification-message .playeah-modal-copy{color:'+celebration.color_copy+'!important;}</style>';
                        }
                        $("#playeah-style").html(style_html);
                        //var nudge_html = '<div class="uk-flex"><span class="playeah-nudge-image">'+ lottie_html+'</span><div><h2 class="uk-text-primary">'+celebration.heading+'</h2><p>'+celebration.copy+'</p></div></div>';
                        var nudge_html = '<span class="playeah-nudge-image">'+ lottie_html+'</span><div><h2 class="uk-text-primary uk-text-center playeah-modal-heading">'+celebration.heading+'</h2><p class="uk-text-center playeah-modal-copy">'+celebration.copy+'</p></div>';
                        UIkit.notification(nudge_html, {pos: "bottom-right", timeout: 8000});
                        break;
                    default:
                      // code block
                }                
                celebrations[index].played = true;            
            }

        }
        

    }        

    

    const init = function(){
        $( document ).ready(function() {
        });
    }

    const inject_lottie= function(){
        var f = document.getElementsByTagName("script")[0],
           j = document.createElement("script");
           j.async = false;
           j.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
           f.parentNode.insertBefore(j, f);
   }

    const inject_uikit= function(){
         var f = document.getElementsByTagName("script")[0],
            j = document.createElement("script");
            j.async = false;
            j.src = "https://cdn.jsdelivr.net/npm/uikit@3.6.15/dist/js/uikit.min.js";
            f.parentNode.insertBefore(j, f);

            j3 = document.createElement("link");
            j3.rel = "stylesheet";
            j3.href = "https://cdn.jsdelivr.net/npm/uikit@3.6.15/dist/css/uikit.min.css";
            //j3.href = "https://getuikit.com/css/theme.css?1395";
            f.parentNode.insertBefore(j3, f);
    }
    const inject_fa= function(){
        var f = document.getElementsByTagName("script")[0],
           j = document.createElement("script");
           j.async = true;
           j.src = "https://robgalvinco.github.io/fapro/js/all.js";
           f.parentNode.insertBefore(j, f);
           
           j2 = document.createElement("script");
           j2.async = true;
           j2.src = "https://robgalvinco.github.io/fapro/js/v4-shims.min.js";
           f.parentNode.insertBefore(j2, f);

           j3 = document.createElement("link");
           j3.rel = "stylesheet";
           j3.href = "https://robgalvinco.github.io/fapro/css/all.css";
           f.parentNode.insertBefore(j3, f);

   }    
   const inject_html= function(){
       console.log("injecting html");
       var html = '<div id="playeah-style"></div><lottie-player id="playeah" background="transparent" speed="1" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 9999999999;" autoplay=""></lottie-player>';
       var html_modal = '<div id="playeah-modal" class="uk-flex-top" uk-modal><div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body"><div class="playeah-modal-image uk-flex uk-flex-center"></div> <button class="uk-modal-close-outside" type="button" uk-close></button><h2 class="uk-modal-title uk-text-center playeah-modal-heading uk-text-primary"></h2><p class="playeah-modal-copy uk-text-center uk-text-secondary"></p><p class="uk-text-center"> <a class="uk-button uk-button-primary playeah-modal-cta" ></a></p></div></div>';
       var html_push = '<div id="playeah-push" uk-offcanvas="flip:true; mode: push; overlay: false"><div class="uk-offcanvas-bar uk-background-default"><button class="uk-offcanvas-close" type="button" uk-close></button><div class="playeah-modal-image uk-flex uk-flex-center"></div> <button class="uk-modal-close-outside" type="button" uk-close></button><h2 class="uk-modal-title uk-text-center playeah-modal-heading uk-text-primary"></h2><p class="playeah-modal-copy uk-text-center uk-text-secondary"></p><p class="uk-text-center"> <a class="uk-button uk-button-primary playeah-modal-cta" ></a></p></div></div>';
       $("body").append(html);       
       $("body").append(html_modal);       
       $("body").append(html_push);       

   }
   const inject_styles = function(){
       var style = '<style>#playeah{display:none;}.playeah-nudge-image{height:100px;width: 100px;}.playeah-modal-image{height:200px;width: 200px;margin-left: auto!important;margin-right: auto!important;}</style>';
       $("body").prepend(style);       
   }
   const find_and_play = function(progress, courseid){
       console.log(progress,courseid);
    var __allcourses_index = celebrations.findIndex(function(celebration, index) {
        if(celebration.id == "all" && celebration.progress<=progress  && !celebration.played)
            return true;
    });     
    console.log("all index: "+__allcourses_index);  
    var __courses_index = celebrations.findIndex(function(celebration, index) {
        if(celebration.id == courseid && celebration.progress<=progress  && !celebration.played)
            return true;
    }); 
    console.log("course index: "+__courses_index);
    if(__courses_index != -1){
            show_celebration(__courses_index);
    }  else {
        if(__allcourses_index != -1){
            show_celebration(__allcourses_index)
        }
    }
   }
   $( document ).ready(function() {
        if(typeof(CoursePlayerV2) !== 'undefined') {
            
            inject_styles();
            inject_lottie();
            inject_uikit();
            inject_html();
        
        
            CoursePlayerV2.on('hooks:contentDidChange', function(data) {
                console.log(data);
                if(_progress_start == -1){
                    console.log("Setting default");
                    _progress_start = data.enrollment.percentage_completed*100;
                    console.log("start: "+_progress_start)
                    //mark celebrations played if progress is >0
                    for (i = 0; i < celebrations.length; i++) {
                    if(celebrations[i].progress <= _progress_start){
                        celebrations[i].played=true;
                    }
                    }                
                }
                
            });

            CoursePlayerV2.on('hooks:contentWasCompleted', function(data) {
                console.log(data);
                var progress = data.enrollment.percentage_completed*100;
                console.log(progress)
                find_and_play(progress,data.course.id)
            });
            CoursePlayerV2.on('hooks:enrollmentWasCompleted', function(data) {
                console.log(data);
                find_and_play(100,data.course.id)
            });  
        }

    });

        
    
}());