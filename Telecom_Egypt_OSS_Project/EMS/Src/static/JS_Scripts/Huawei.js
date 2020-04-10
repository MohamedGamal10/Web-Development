$(function () {
  $('[data-toggle="popover"]').popover();
});
/*******************************U2000_Power*****************************************************/
$(".U2000_Power").popover({ trigger: "manual" , html: true, animation:false})
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

$(".U2000_Power").dblclick(function(){
  
  $(".U2000_Power_div").show();      
  $(".U2000_Switch_Slave_div").hide();
  $(".U2000_Switch_Master_div").hide();
  $(".U2000_Server_div").hide();
});

/*******************************U2000_Switch_Slave*****************************************************/
$(".U2000_Switch_Slave").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Switch Slave');
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

$(".U2000_Switch_Slave").dblclick(function(){
  
  $(".U2000_Power_div").hide();      
  $(".U2000_Switch_Slave_div").show();
  $(".U2000_Switch_Master_div").hide();
  $(".U2000_Server_div").hide();
});

/*******************************U2000_Switch_Master*****************************************************/
$(".U2000_Switch_Master").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Switch Master');
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

$(".U2000_Switch_Master").dblclick(function(){
  
  $(".U2000_Power_div").hide();      
  $(".U2000_Switch_Slave_div").hide();
  $(".U2000_Switch_Master_div").show();
  $(".U2000_Server_div").hide();
});

/*******************************U2000_Server*****************************************************/
$(".U2000_Server").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Server');
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

$(".U2000_Server").dblclick(function(){
  
  $(".U2000_Power_div").hide();      
  $(".U2000_Switch_Slave_div").hide();
  $(".U2000_Switch_Master_div").hide();
  $(".U2000_Server_div").show();
});

/*******************************ATEA_Power*****************************************************/
$(".ATEA_Power").popover({ trigger: "manual" , html: true, animation:false})
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

$(".ATEA_Power").dblclick(function(){
  
  $(".ATEA_Power_div").show();      
  $(".ATEA_SEC_GW3_div").hide();
  $(".ATEA_SEC_GW2_div").hide();
  $(".ATEA_SEC_GW1_div").hide();
});

/*******************************ATEA_SEC_GW3*****************************************************/
$(".ATEA_SEC_GW3").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','SEC GW3');
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

$(".ATEA_SEC_GW3").dblclick(function(){
  
  $(".ATEA_Power_div").hide();      
  $(".ATEA_SEC_GW3_div").show();
  $(".ATEA_SEC_GW2_div").hide();
  $(".ATEA_SEC_GW1_div").hide();
});

/*******************************ATEA_SEC_GW2*****************************************************/
$(".ATEA_SEC_GW2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','SEC GW2');
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

$(".ATEA_SEC_GW2").dblclick(function(){
  
  $(".ATEA_Power_div").hide();      
  $(".ATEA_SEC_GW3_div").hide();
  $(".ATEA_SEC_GW2_div").show();
  $(".ATEA_SEC_GW1_div").hide();
});

/*******************************ATEA_SEC_GW1*****************************************************/
$(".ATEA_SEC_GW1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','SEC GW1');
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

$(".ATEA_SEC_GW1").dblclick(function(){
  
  $(".ATEA_Power_div").hide();      
  $(".ATEA_SEC_GW3_div").hide();
  $(".ATEA_SEC_GW2_div").hide();
  $(".ATEA_SEC_GW1_div").show();
});

/*******************************Master1_Power1*****************************************************/
$(".Master1_Power1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Power1');
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

$(".Master1_Power1").dblclick(function(){
  
  $(".Master1_Power1_div").show();      
  $(".Master1_Power2_div").hide();
  $(".Master1_Storage_div").hide();
  $(".Master1_Server_div").hide();
});

/*******************************Master1_Power2*****************************************************/
$(".Master1_Power2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Power2');
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

$(".Master1_Power2").dblclick(function(){
  
  $(".Master1_Power1_div").hide();      
  $(".Master1_Power2_div").show();
  $(".Master1_Storage_div").hide();
  $(".Master1_Server_div").hide();
});

/*******************************Master1_Power2*****************************************************/
$(".Master1_Power2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Power2');
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

$(".Master1_Power2").dblclick(function(){
  
  $(".Master1_Power1_div").hide();      
  $(".Master1_Power2_div").show();
  $(".Master1_Storage_div").hide();
  $(".Master1_Server_div").hide();
});

/*******************************Master1_Storage*****************************************************/
$(".Master1_Storage").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Storage');
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

$(".Master1_Storage").dblclick(function(){
  
  $(".Master1_Power1_div").hide();      
  $(".Master1_Power2_div").hide();
  $(".Master1_Storage_div").show();
  $(".Master1_Server_div").hide();
});

/*******************************Master1_Server*****************************************************/
$(".Master1_Server").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Server');
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

$(".Master1_Server").dblclick(function(){
  
  $(".Master1_Power1_div").hide();      
  $(".Master1_Power2_div").hide();
  $(".Master1_Storage_div").hide();
  $(".Master1_Server_div").show();
});

/*******************************Master2_Power1*****************************************************/
$(".Master2_Power1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Power1');
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

$(".Master2_Power1").dblclick(function(){
  
  $(".Master2_Power1_div").show();      
  $(".Master2_Power2_div").hide();
  $(".Master2_Storage_div").hide();
});

/*******************************Master2_Power2*****************************************************/
$(".Master2_Power2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Power2');
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

$(".Master2_Power2").dblclick(function(){
  
  $(".Master2_Power1_div").hide();      
  $(".Master2_Power2_div").show();
  $(".Master2_Storage_div").hide();
});

/*******************************Master2_Storage*****************************************************/
$(".Master2_Storage").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Master2_Storage');
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

$(".Master2_Storage").dblclick(function(){
  
  $(".Master2_Power1_div").hide();      
  $(".Master2_Power2_div").hide();
  $(".Master2_Storage_div").show();
});

/*******************************Backup-U2000_Power1*****************************************************/
$(".Backup-U2000_Power1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Power1');
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

$(".Backup-U2000_Power1").dblclick(function(){
  
  $(".Backup-U2000_Power1_div").show();      
  $(".Backup-U2000_Power2_div").hide();
  $(".Backup-U2000_Storage_div").hide();
  $(".Backup-U2000_Server_div").hide();
});

/*******************************Backup-U2000_Power1*****************************************************/
$(".Backup-U2000_Power1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Power1');
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

$(".Backup-U2000_Power1").dblclick(function(){
  
  $(".Backup-U2000_Power1_div").show();      
  $(".Backup-U2000_Power2_div").hide();
  $(".Backup-U2000_Storage_div").hide();
  $(".Backup-U2000_Server_div").hide();
});

/*******************************Backup-U2000_Power2*****************************************************/
$(".Backup-U2000_Power2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Power2');
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

$(".Backup-U2000_Power2").dblclick(function(){
  
  $(".Backup-U2000_Power1_div").hide();      
  $(".Backup-U2000_Power2_div").show();
  $(".Backup-U2000_Storage_div").hide();
  $(".Backup-U2000_Server_div").hide();
});

/*******************************Backup-U2000_Storage*****************************************************/
$(".Backup-U2000_Storage").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Storage');
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

$(".Backup-U2000_Storage").dblclick(function(){
  
  $(".Backup-U2000_Power1_div").hide();      
  $(".Backup-U2000_Power2_div").hide();
  $(".Backup-U2000_Storage_div").show();
  $(".Backup-U2000_Server_div").hide();
});

/*******************************Backup-U2000_Server*****************************************************/
$(".Backup-U2000_Server").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Server');
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

$(".Backup-U2000_Server").dblclick(function(){
  
  $(".Backup-U2000_Power1_div").hide();      
  $(".Backup-U2000_Power2_div").hide();
  $(".Backup-U2000_Storage_div").hide();
  $(".Backup-U2000_Server_div").show();
});

/*******************************EXP-U2000_Power1*****************************************************/
$(".EXP-U2000_Power1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Power1');
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

$(".EXP-U2000_Power1").dblclick(function(){
  
  $(".EXP-U2000_Power1_div").show();      
  $(".EXP-U2000_Power2_div").hide();
  $(".EXP-U2000_Storage_div").hide();
  $(".EXP-U2000_Server_div").hide();
});


/*******************************EXP-U2000_Power2*****************************************************/
$(".EXP-U2000_Power2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Power2');
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

$(".EXP-U2000_Power2").dblclick(function(){
  
  $(".EXP-U2000_Power1_div").hide();      
  $(".EXP-U2000_Power2_div").show();
  $(".EXP-U2000_Storage_div").hide();
  $(".EXP-U2000_Server_div").hide();
});

/*******************************EXP-U2000_Storage*****************************************************/
$(".EXP-U2000_Storage").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Storage');
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

$(".EXP-U2000_Storage").dblclick(function(){
  
  $(".EXP-U2000_Power1_div").hide();      
  $(".EXP-U2000_Power2_div").hide();
  $(".EXP-U2000_Storage_div").show();
  $(".EXP-U2000_Server_div").hide();
});

/*******************************EXP-U2000_Server*****************************************************/
$(".EXP-U2000_Server").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Server');
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

$(".EXP-U2000_Server").dblclick(function(){
  
  $(".EXP-U2000_Power1_div").hide();      
  $(".EXP-U2000_Power2_div").hide();
  $(".EXP-U2000_Storage_div").hide();
  $(".EXP-U2000_Server_div").show();
});

/*******************************NETECO_Power*****************************************************/
$(".NETECO_Power").popover({ trigger: "manual" , html: true, animation:false})
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

$(".NETECO_Power").dblclick(function(){
  
  $(".NETECO_Power_div").show();      
  $(".NETECO_SWitch1_div").hide();
  $(".NETECO_SWitch2_div").hide();
  $(".NETECO_Backup_Neteco_div").hide();
  $(".NETECO_Main_Neteco_div").hide();
});

/*******************************NETECO_SWitch1*****************************************************/
$(".NETECO_SWitch1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','SWitch1');
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

$(".NETECO_SWitch1").dblclick(function(){
  
  $(".NETECO_Power_div").hide();      
  $(".NETECO_SWitch1_div").show();
  $(".NETECO_SWitch2_div").hide();
  $(".NETECO_Backup_Neteco_div").hide();
  $(".NETECO_Main_Neteco_div").hide();
});

/*******************************NETECO_SWitch2*****************************************************/
$(".NETECO_SWitch2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','SWitch2');
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

$(".NETECO_SWitch2").dblclick(function(){
  
  $(".NETECO_Power_div").hide();      
  $(".NETECO_SWitch1_div").hide();
  $(".NETECO_SWitch2_div").show();
  $(".NETECO_Backup_Neteco_div").hide();
  $(".NETECO_Main_Neteco_div").hide();
});

/*******************************NETECO_Backup_Neteco*****************************************************/
$(".NETECO_Backup_Neteco").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Backup Neteco');
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

$(".NETECO_Backup_Neteco").dblclick(function(){
  
  $(".NETECO_Power_div").hide();      
  $(".NETECO_SWitch1_div").hide();
  $(".NETECO_SWitch2_div").hide();
  $(".NETECO_Backup_Neteco_div").show();
  $(".NETECO_Main_Neteco_div").hide();
});

/*******************************NETECO_Main_Neteco*****************************************************/
$(".NETECO_Main_Neteco").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Main Neteco');
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

$(".NETECO_Main_Neteco").dblclick(function(){
  
  $(".NETECO_Power_div").hide();      
  $(".NETECO_SWitch1_div").hide();
  $(".NETECO_SWitch2_div").hide();
  $(".NETECO_Backup_Neteco_div").hide();
  $(".NETECO_Main_Neteco_div").show();
});

/*******************************ATN-RTN_ATN_Server*****************************************************/
$(".ATN-RTN_ATN_Server").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','ATN_Server');
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

$(".ATN-RTN_ATN_Server").dblclick(function(){
  
  $(".ATN-RTN_ATN_Server_div").show();      
  $(".ATN-RTN_RTN_Server_div").hide();
  
});

/*******************************ATN-RTN_RTN_Server*****************************************************/
$(".ATN-RTN_RTN_Server").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','RTN_Server');
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

$(".ATN-RTN_RTN_Server").dblclick(function(){
  
  $(".ATN-RTN_ATN_Server_div").hide();      
  $(".ATN-RTN_RTN_Server_div").show();
  
});