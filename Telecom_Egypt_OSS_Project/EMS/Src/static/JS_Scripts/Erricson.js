$(function () {
  $('[data-toggle="popover"]').popover();
});
/*******************************ENM1_Switch1*****************************************************/
$(".ENM1_Switch1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Switch 1');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM1_Switch1").dblclick(function(){
  
  $(".ENM1_Switch1_div").show();      
  $(".ENM1_Switch2_div").hide();
  $(".ENM1_Power_div").hide();
  $(".ENM1_OMBS_div").hide();
  $(".ENM1_LMS-ENM_div").hide();
  $(".ENM1_NAS-1_div").hide();
  $(".ENM1_Server1_div").hide();
  $(".ENM1_Server2_div").hide();
});

/*******************************ENM1_Switch2******************************************************/

$(".ENM1_Switch2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Switch 2');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM1_Switch2").dblclick(function(){
  
  $(".ENM1_Switch1_div").hide();      
  $(".ENM1_Switch2_div").show();
  $(".ENM1_Power_div").hide();
  $(".ENM1_OMBS_div").hide();
  $(".ENM1_LMS-ENM_div").hide();
  $(".ENM1_NAS-1_div").hide();
  $(".ENM1_Server1_div").hide();
  $(".ENM1_Server2_div").hide();
  
});

/*******************************ENM1_Power******************************************************/

$(".ENM1_Power").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Power');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM1_Power").dblclick(function(){
  
  $(".ENM1_Switch1_div").hide();      
  $(".ENM1_Switch2_div").hide();
  $(".ENM1_Power_div").show();
  $(".ENM1_OMBS_div").hide();
  $(".ENM1_LMS-ENM_div").hide();
  $(".ENM1_NAS-1_div").hide();
  $(".ENM1_Server1_div").hide();
  $(".ENM1_Server2_div").hide();
  
 
});
/*******************************ENM1_OMBS******************************************************/

$(".ENM1_OMBS").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','OMBS');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM1_OMBS").dblclick(function(){
  
  $(".ENM1_Switch1_div").hide();      
  $(".ENM1_Switch2_div").hide();
  $(".ENM1_Power_div").hide();
  $(".ENM1_OMBS_div").show();
  $(".ENM1_LMS-ENM_div").hide();
  $(".ENM1_NAS-1_div").hide();
  $(".ENM1_Server1_div").hide();
  $(".ENM1_Server2_div").hide();
  
 
});
/*******************************ENM1_LMS-ENM******************************************************/

$(".ENM1_LMS-ENM").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','LMS-ENM');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM1_LMS-ENM").dblclick(function(){
  
  $(".ENM1_Switch1_div").hide();      
  $(".ENM1_Switch2_div").hide();
  $(".ENM1_Power_div").hide();
  $(".ENM1_OMBS_div").hide();
  $(".ENM1_LMS-ENM_div").show();
  $(".ENM1_NAS-1_div").hide();
  $(".ENM1_Server1_div").hide();
  $(".ENM1_Server2_div").hide();
  
  
});
/*******************************ENM1_NAS-1******************************************************/

$(".ENM1_NAS-1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','NAS-1');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM1_NAS-1").dblclick(function(){
  
  $(".ENM1_Switch1_div").hide();      
  $(".ENM1_Switch2_div").hide();
  $(".ENM1_Power_div").hide();
  $(".ENM1_OMBS_div").hide();
  $(".ENM1_LMS-ENM_div").hide();
  $(".ENM1_NAS-1_div").show();
  $(".ENM1_Server1_div").hide();
  $(".ENM1_Server2_div").hide();
  
  
});
/*******************************ENM1_Server1******************************************************/

$(".ENM1_Server1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Server1');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM1_Server1").dblclick(function(){
  
  
  $(".ENM1_Switch1_div").hide();      
  $(".ENM1_Switch2_div").hide();
  $(".ENM1_Power_div").hide();
  $(".ENM1_OMBS_div").hide();
  $(".ENM1_LMS-ENM_div").hide();
  $(".ENM1_NAS-1_div").hide();
  $(".ENM1_Server1_div").show();
  $(".ENM1_Server2_div").hide();
  
  
});

/*******************************ENM1_Server2******************************************************/

$(".ENM1_Server2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Server2');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM1_Server2").dblclick(function(){
  
  
  $(".ENM1_Switch1_div").hide();      
  $(".ENM1_Switch2_div").hide();
  $(".ENM1_Power_div").hide();
  $(".ENM1_OMBS_div").hide();
  $(".ENM1_LMS-ENM_div").hide();
  $(".ENM1_NAS-1_div").hide();
  $(".ENM1_Server1_div").hide();
  $(".ENM1_Server2_div").show();
  
  
});

/*******************************ENM2_Switch1******************************************************/

$(".ENM2_Switch1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Switch1');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM2_Switch1").dblclick(function(){
  
  
  $(".ENM2_Switch1_div").show();      
  $(".ENM2_Switch2_div").hide();
  $(".ENM2_Power_div").hide();
  $(".ENM2_MWS-ENIQ_div").hide();
  $(".ENM2_NAS-2_div").hide();
  $(".ENM2_Server1_div").hide();
  $(".ENM2_Server2_div").hide();
  
  
});


/*******************************ENM2_Switch2******************************************************/

$(".ENM2_Switch2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Switch 2');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM2_Switch2").dblclick(function(){
  
  
  $(".ENM2_Switch1_div").hide();      
  $(".ENM2_Switch2_div").show();
  $(".ENM2_Power_div").hide();
  $(".ENM2_MWS-ENIQ_div").hide();
  $(".ENM2_NAS-2_div").hide();
  $(".ENM2_Server1_div").hide();
  $(".ENM2_Server2_div").hide();
  
  
});


/*******************************ENM2_Power******************************************************/

$(".ENM2_Power").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Power');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM2_Power").dblclick(function(){
  
  
  $(".ENM2_Switch1_div").hide();      
  $(".ENM2_Switch2_div").hide();
  $(".ENM2_Power_div").show();
  $(".ENM2_MWS-ENIQ_div").hide();
  $(".ENM2_NAS-2_div").hide();
  $(".ENM2_Server1_div").hide();
  $(".ENM2_Server2_div").hide();
  
});


/*******************************ENM2_MWS-ENIQ******************************************************/

$(".ENM2_MWS-ENIQ").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','MWS-ENIQ');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM2_MWS-ENIQ").dblclick(function(){
  
  
  $(".ENM2_Switch1_div").hide();      
  $(".ENM2_Switch2_div").hide();
  $(".ENM2_Power_div").hide();
  $(".ENM2_MWS-ENIQ_div").show();
  $(".ENM2_NAS-2_div").hide();
  $(".ENM2_Server1_div").hide();
  $(".ENM2_Server2_div").hide();
  
  
});

/*******************************ENM2_NAS-2******************************************************/

$(".ENM2_NAS-2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','NAS-2');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM2_NAS-2").dblclick(function(){
  
  
  $(".ENM2_Switch1_div").hide();      
  $(".ENM2_Switch2_div").hide();
  $(".ENM2_Power_div").hide();
  $(".ENM2_MWS-ENIQ_div").hide();
  $(".ENM2_NAS-2_div").show();
  $(".ENM2_Server1_div").hide();
  $(".ENM2_Server2_div").hide();
  
  
});

/*******************************ENM2_Server1******************************************************/

$(".ENM2_Server1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Server1');
        $(this).attr('data-content','CPU : 30% <br> Ram : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM2_Server1").dblclick(function(){
  
  
  $(".ENM2_Switch1_div").hide();      
  $(".ENM2_Switch2_div").hide();
  $(".ENM2_Power_div").hide();
  $(".ENM2_MWS-ENIQ_div").hide();
  $(".ENM2_NAS-2_div").hide();
  $(".ENM2_Server1_div").show();
  $(".ENM2_Server2_div").hide();
  
  
});

/*******************************ENM2_Server2******************************************************/

$(".ENM2_Server2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Server2');
        $(this).attr('data-content','CPU : 30% <br> RAM : 60% <br> IP : 192.168.1.1 <br> Number of ports : 5 ');
        $(this).attr('data-placement','right');
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 100);
});

$(".ENM2_Server2").dblclick(function(){
  
  
  $(".ENM2_Switch1_div").hide();      
  $(".ENM2_Switch2_div").hide();
  $(".ENM2_Power_div").hide();
  $(".ENM2_MWS-ENIQ_div").hide();
  $(".ENM2_NAS-2_div").hide();
  $(".ENM2_Server1_div").hide();
  $(".ENM2_Server2_div").show();
  
 
});



