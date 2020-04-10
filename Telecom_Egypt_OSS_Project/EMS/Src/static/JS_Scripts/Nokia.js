$(function () {
  $('[data-toggle="popover"]').popover();
});
/*******************************Netact Switch1*****************************************************/
$(".Netact_Switch1").popover({ trigger: "manual" , html: true, animation:false})
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

$(".Netact_Switch1").dblclick(function(){
  
  $(".Netact_Switch1_div").show();
  $(".Netact_Switch2_div").hide();
  $(".Netact_Power_div").hide();
  $(".Netact_Qowisio_div").hide();
  $(".Netact_Primary_Storage_div").hide();
  $(".Netact_Backup_Storage_div").hide();
  $(".Netact_Server_div").hide();
});

/*******************************Netact Switch2******************************************************/

$(".Netact_Switch2").popover({ trigger: "manual" , html: true, animation:false})
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

$(".Netact_Switch2").dblclick(function(){
  
  $(".Netact_Switch1_div").hide();
  $(".Netact_Switch2_div").show();
  $(".Netact_Power_div_div").hide();
  $(".Netact_Qowisio_div").hide();
  $(".Netact_Primary_Storage_div").hide();
  $(".Netact_Backup_Storage_div").hide();
  $(".Netact_Server_div").hide();
});

/*******************************Netact Power******************************************************/

$(".Netact_Power").popover({ trigger: "manual" , html: true, animation:false})
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

$(".Netact_Power").dblclick(function(){
  
  $(".Netact_Switch1_div").hide();
  $(".Netact_Switch2_div").hide();
  $(".Netact_Power_div").show();
  $(".Netact_Qowisio_div").hide();
  $(".Netact_Primary_Storage_div").hide();
  $(".Netact_Backup_Storage_div").hide();
  $(".Netact_Server_div").hide();
});
/*******************************Netact Qowisio******************************************************/

$(".Netact_Qowisio").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Qowisio');
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

$(".Netact_Qowisio").dblclick(function(){
  
  $(".Netact_Switch1_div").hide();
  $(".Netact_Switch2_div").hide();
  $(".Netact_Power_div").hide();
  $(".Netact_Qowisio_div").show();
  $(".Netact_Primary_Storage_div").hide();
  $(".Netact_Backup_Storage_div").hide();
  $(".Netact_Server_div").hide();
});
/*******************************Netact Primary_Storage******************************************************/

$(".Netact_Primary_Storage").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Primary_Storage');
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

$(".Netact_Primary_Storage").dblclick(function(){
  
  $(".Netact_Switch1_div").hide();
  $(".Netact_Switch2_div").hide();
  $(".Netact_Power_div").hide();
  $(".Netact_Qowisio_div").hide();
  $(".Netact_Primary_Storage_div").show();
  $(".Netact_Backup_Storage_div").hide();
  $(".Netact_Server_div").hide();
});
/*******************************Netact Backup_Storage******************************************************/

$(".Netact_Backup_Storage").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Backup_Storage');
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

$(".Netact_Backup_Storage").dblclick(function(){
  
  $(".Netact_Switch1_div").hide();
  $(".Netact_Switch2_div").hide();
  $(".Netact_Power_div").hide();
  $(".Netact_Qowisio_div").hide();
  $(".Netact_Primary_Storage_div").hide();
  $(".Netact_Backup_Storage_div").show();
  $(".Netact_Server_div").hide();
});
/*******************************Netact Server******************************************************/

$(".Netact_Server").popover({ trigger: "manual" , html: true, animation:false})
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

$(".Netact_Server").dblclick(function(){
  
  
  $(".Netact_Switch1_div").hide();
  $(".Netact_Switch2_div").hide();
  $(".Netact_Power_div").hide();
  $(".Netact_Qowisio_div").hide();
  $(".Netact_Primary_Storage_div").hide();
  $(".Netact_Backup_Storage_div").hide();
  $(".Netact_Server_div").show();
});


/*******************************NPM Switch1******************************************************/

$(".NPM_Switch1").popover({ trigger: "manual" , html: true, animation:false})
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

$(".NPM_Switch1").dblclick(function(){
  
  
  $(".NPM_Switch1_div").show();
  $(".NPM_Switch2_div").hide();
  $(".NPM_Power_div").hide();
  $(".NPM_Mega_Plexer_div").hide();
  $(".NPM_Primary_Storage_div").hide();
  $(".NPM_Backup_Storage_div").hide();
  $(".NPM_Server_div").hide();
});

/*******************************NPM Switch2******************************************************/

$(".NPM_Switch2").popover({ trigger: "manual" , html: true, animation:false})
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

$(".NPM_Switch2").dblclick(function(){
  
  
  $(".NPM_Switch1_div").hide();
  $(".NPM_Switch2_div").show();
  $(".NPM_Power_div").hide();
  $(".NPM_Mega_Plexer_div").hide();
  $(".NPM_Primary_Storage_div").hide();
  $(".NPM_Backup_Storage_div").hide();
  $(".NPM_Server_div").hide();
});

/*******************************NPM Power******************************************************/

$(".NPM_Power").popover({ trigger: "manual" , html: true, animation:false})
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

$(".NPM_Power").dblclick(function(){
  
  
  $(".NPM_Switch1_div").hide();
  $(".NPM_Switch2_div").hide();
  $(".NPM_Power_div").show();
  $(".NPM_Mega_Plexer_div").hide();
  $(".NPM_Primary_Storage_div").hide();
  $(".NPM_Backup_Storage_div").hide();
  $(".NPM_Server_div").hide();
});


/*******************************NPM Mega Plexer******************************************************/

$(".NPM_Mega_Plexer").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Mega_Plexer');
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

$(".NPM_Mega_Plexer").dblclick(function(){
  
  
  $(".NPM_Switch1_div").hide();
  $(".NPM_Switch2_div").hide();
  $(".NPM_Power_div").hide();
  $(".NPM_Mega_Plexer_div").show();
  $(".NPM_Primary_Storage_div").hide();
  $(".NPM_Backup_Storage_div").hide();
  $(".NPM_Server_div").hide();
});

/*******************************NPM Primary_Storage******************************************************/

$(".NPM_Primary_Storage").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Primary_Storage');
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

$(".NPM_Primary_Storage").dblclick(function(){
  
  
  $(".NPM_Switch1_div").hide();
  $(".NPM_Switch2_div").hide();
  $(".NPM_Power_div").hide();
  $(".NPM_Mega_Plexer_div").hide();
  $(".NPM_Primary_Storage_div").show();
  $(".NPM_Backup_Storage_div").hide();
  $(".NPM_Server_div").hide();
});

/*******************************NPM Backup_Storage******************************************************/

$(".NPM_Backup_Storage").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','Backup_Storage');
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

$(".NPM_Backup_Storage").dblclick(function(){
  
  
  $(".NPM_Switch1_div").hide();
  $(".NPM_Switch2_div").hide();
  $(".NPM_Power_div").hide();
  $(".NPM_Mega_Plexer_div").hide();
  $(".NPM_Primary_Storage_div").hide();
  $(".NPM_Backup_Storage_div").show();
  $(".NPM_Server_div").hide();
});

/*******************************NPM Server******************************************************/

$(".NPM_Server").popover({ trigger: "manual" , html: true, animation:false})
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

$(".NPM_Server").dblclick(function(){
  
  
  $(".NPM_Switch1_div").hide();
  $(".NPM_Switch2_div").hide();
  $(".NPM_Power_div").hide();
  $(".NPM_Mega_Plexer_div").hide();
  $(".NPM_Primary_Storage_div").hide();
  $(".NPM_Backup_Storage_div").hide();
  $(".NPM_Server_div").show();
});

/*******************************SAM_Switch1******************************************************/

$(".SAM_Switch1").popover({ trigger: "manual" , html: true, animation:false})
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

$(".SAM_Switch1").dblclick(function(){
  
  
  $(".SAM_Switch1_div").show();
  $(".SAM_Switch2_div").hide();
  $(".SAM_MW_NFM-P_AUX1_div").hide();
  $(".SAM_MW_NFM-P_APP1_div").hide();
  $(".SAM_MW_NFM-P_DB1_div").hide();
  $(".SAM_MW_NFM-P_AUX2_div").hide();
  $(".SAM_MW_NFM-P_APP2_div").hide();
  $(".SAM_MW_NFM-P_DB2_div").hide();
});

/*******************************SAM_Switch2******************************************************/

$(".SAM_Switch2").popover({ trigger: "manual" , html: true, animation:false})
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

$(".SAM_Switch2").dblclick(function(){
  
  
  $(".SAM_Switch1_div").hide();
  $(".SAM_Switch2_div").show();
  $(".SAM_MW_NFM-P_AUX1_div").hide();
  $(".SAM_MW_NFM-P_APP1_div").hide();
  $(".SAM_MW_NFM-P_DB1_div").hide();
  $(".SAM_MW_NFM-P_AUX2_div").hide();
  $(".SAM_MW_NFM-P_APP2_div").hide();
  $(".SAM_MW_NFM-P_DB2_div").hide();
});


/*******************************SAM_MW_NFM-P_AUX1******************************************************/

$(".SAM_MW_NFM-P_AUX1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','MW NFM-P AUX1');
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

$(".SAM_MW_NFM-P_AUX1").dblclick(function(){
  
  
  $(".SAM_Switch1_div").hide();
  $(".SAM_Switch2_div").hide();
  $(".SAM_MW_NFM-P_AUX1_div").show();
  $(".SAM_MW_NFM-P_APP1_div").hide();
  $(".SAM_MW_NFM-P_DB1_div").hide();
  $(".SAM_MW_NFM-P_AUX2_div").hide();
  $(".SAM_MW_NFM-P_APP2_div").hide();
  $(".SAM_MW_NFM-P_DB2_div").hide();
});


/*******************************SAM_MW_NFM-P_APP1******************************************************/

$(".SAM_MW_NFM-P_APP1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','MW NFM-P APP1');
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

$(".SAM_MW_NFM-P_APP1").dblclick(function(){
  
  
  $(".SAM_Switch1_div").hide();
  $(".SAM_Switch2_div").hide();
  $(".SAM_MW_NFM-P_AUX1_div").hide();
  $(".SAM_MW_NFM-P_APP1_div").show();
  $(".SAM_MW_NFM-P_DB1_div").hide();
  $(".SAM_MW_NFM-P_AUX2_div").hide();
  $(".SAM_MW_NFM-P_APP2_div").hide();
  $(".SAM_MW_NFM-P_DB2_div").hide();
});


/*******************************SAM_MW_NFM-P_DB1******************************************************/

$(".SAM_MW_NFM-P_DB1").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','MW NFM-P DB1');
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

$(".SAM_MW_NFM-P_DB1").dblclick(function(){
  
  
  $(".SAM_Switch1_div").hide();
  $(".SAM_Switch2_div").hide();
  $(".SAM_MW_NFM-P_AUX1_div").hide();
  $(".SAM_MW_NFM-P_APP1_div").hide();
  $(".SAM_MW_NFM-P_DB1_div").show();
  $(".SAM_MW_NFM-P_AUX2_div").hide();
  $(".SAM_MW_NFM-P_APP2_div").hide();
  $(".SAM_MW_NFM-P_DB2_div").hide();
});

/*******************************SAM_MW_NFM-P_AUX2******************************************************/

$(".SAM_MW_NFM-P_AUX2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','MW NFM-P AUX2');
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

$(".SAM_MW_NFM-P_AUX2").dblclick(function(){
  
  
  $(".SAM_Switch1_div").hide();
  $(".SAM_Switch2_div").hide();
  $(".SAM_MW_NFM-P_AUX1_div").hide();
  $(".SAM_MW_NFM-P_APP1_div").hide();
  $(".SAM_MW_NFM-P_DB1_div").hide();
  $(".SAM_MW_NFM-P_AUX2_div").show();
  $(".SAM_MW_NFM-P_APP2_div").hide();
  $(".SAM_MW_NFM-P_DB2_div").hide();
});

/*******************************SAM_MW_NFM-P_APP2******************************************************/

$(".SAM_MW_NFM-P_APP2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','MW NFM-P APP2');
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

$(".SAM_MW_NFM-P_APP2").dblclick(function(){
  
  
  $(".SAM_Switch1_div").hide();
  $(".SAM_Switch2_div").hide();
  $(".SAM_MW_NFM-P_AUX1_div").hide();
  $(".SAM_MW_NFM-P_APP1_div").hide();
  $(".SAM_MW_NFM-P_DB1_div").hide();
  $(".SAM_MW_NFM-P_AUX2_div").hide();
  $(".SAM_MW_NFM-P_APP2_div").show();
  $(".SAM_MW_NFM-P_DB2_div").hide();
});

/*******************************SAM_MW_NFM-P_DB2******************************************************/

$(".SAM_MW_NFM-P_DB2").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).attr('title','MW NFM-P DB2');
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

$(".SAM_MW_NFM-P_DB2").dblclick(function(){
  
  
  $(".SAM_Switch1_div").hide();
  $(".SAM_Switch2_div").hide();
  $(".SAM_MW_NFM-P_AUX1_div").hide();
  $(".SAM_MW_NFM-P_APP1_div").hide();
  $(".SAM_MW_NFM-P_DB1_div").hide();
  $(".SAM_MW_NFM-P_AUX2_div").hide();
  $(".SAM_MW_NFM-P_APP2_div").hide();
  $(".SAM_MW_NFM-P_DB2_div").show();
});



/*******************************Server_connection******************************************************/
function connection(){
            // Selecting the input element and get its value 
            var username = document.getElementById("Server_username").value;
            var password = document.getElementById("Server_Password").value;
            var hostname = document.getElementById("Server_HostName").value;
            var password_B64=btoa(password);
            var link = "";
            var link_dir = link.concat("http://10.31.0.178:8888/?hostname=",hostname,"&username=",username,"&password=",password_B64)
            window.open(link_dir, '_blank');   
        }