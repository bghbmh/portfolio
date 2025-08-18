//JavaScript Factor Value
var jsParam = function() {
    var scripts = document.getElementsByTagName('script');
    var cnt = 0;
    for (var i = scripts.length - 1; i >= 0; i--) {
        if (scripts[i].text.match("jsFactor") == "jsFactor") {
            cnt = i;
            //scripts[i].text="";
            break;
        }
    }
    var script = scripts[cnt].src.replace(/^[^\?]+\?/, '').replace(/\?(.+)$/, '');
    var params = script.split('&');
    var get;
    var data = [];
    for (var i = 0; i < params.length; i++) {
        var paramEquals = params[i].split('=');
        var name = paramEquals[0];
        var value = paramEquals[1];
        data[name] = value;
    }
    this.get = function(oName) {
        return data[oName]
    }
};
var param = new jsParam();
//JavaScript Document

/********************************************************************************************************
 * 전역 함수모음
 *********************************************************************************************************/

$(function() {

    /* =======================================================
      Default Setting
    =========================================================== */

	// 자동완성 끄기
	$("input[type=text]").attr("autocomplete","off");
	
    /********** 접근성 바로가기 메뉴 **********/
    key_AccessMenu();

    function key_AccessMenu() {

        $("#key_access").find(">ul>li>a").bind({
            focusin: function(e) {
                $("#key_access").css({
                    "z-index": "10000"
                });
                $(this).parent("li").addClass("select");
            },
            focusout: function(e) {
                $("#key_access").css({
                    "z-index": "-1"
                });
                $(this).parent("li").removeClass("select");
            },
            click: function(e) {
                $elm = $($(this).attr("href"));
                $elm.focus();
            }
        });
    }

    /********** 페이지 로딩 **********/
    if (document.getElementById('loading_page') != null) {
    	document.getElementById('loading_page').style.display = "none";
    	// document.getElementById('wrap').style.display = "";
	}
    
    // 날짜선택 calendar 설정
    initCalendar();    


    /********** selectbox CSS 적용 **********/
    $('.ui.dropdown')
        .dropdown();

    /********** SCROLL TOP 함수 스크립트 **********/
    $(window).scroll(function() {
        if ($(this).scrollTop()) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });

    /********** 강의실 메뉴 tablet 화면 함수 스크립트 **********/
    $(window).resize(function() {
        var width = $(window).width();
        if (width <= 768) {
            if ($('#container').is('.sub-wrap, .prof-wrap, .course-wrap') === true) {
                $('.gn-menu-main').css({
                    'left': '0',
                    width: '100%'
                });
                $('.gn-menu-wrapper').css({
                    'left': '0'
                });
            }
        }
    });

    $(window).trigger("resize");

    /********** semantic-ui Using **********/
    //FooTable 
    var tableClass = param.get('tableClass');
    if (tableClass != null) {
        $('#' + tableClass).footable({
            "on": {
                "resize.ft.table": function(e, ft) {
                    $(".ui.checkbox").checkbox();
                },
                "after.ft.paging": function(e, ft) {
                    $(".ui.checkbox").checkbox();
                },
                "after.ft.sorting": function(e, ft, sorter) {
                    $(".ui.checkbox").checkbox();
                },
                "after.ft.filtering": function(e, ft, filter) {
                    $(".ui.checkbox").checkbox();
                },
                "expand.ft.row": function(e, ft, filter) {
                    $(".ui.checkbox").checkbox();
                },
                "draw.ft.table": function(e, ft) {
                    if ($(this).find(".footable-empty").size() > 0) {
                        $(this).find("td").remove();
                        $(this).find(".footable-empty").append(`<td colspan= ${$(this).find("th").size()} >${ft.data.empty}</td>`);
                    }
                }
            },
            "breakpoints": {
            	"xs": 320,
                "sm": 480,
                "md": 768,
                "lg": 770,
                "w_lg": 772,
                "xw_lg": 774,
                "xxw_lg": 776
            }
        });
    } else {
        $('.table').footable({
            "on": {
                "resize.ft.table": function(e, ft) {
                    $(".ui.checkbox").checkbox();
                },
                "after.ft.paging": function(e, ft) {
                    $(".ui.checkbox").checkbox();
                },
                "after.ft.sorting": function(e, ft, sorter) {
                    $(".ui.checkbox").checkbox();
                },
                "after.ft.filtering": function(e, ft, filter) {
                    $(".ui.checkbox").checkbox();
                },
                "expand.ft.row": function(e, ft, filter) {
                    $(".ui.checkbox").checkbox();
                },
                "draw.ft.table": function(e, ft) {
                    if ($(this).find(".footable-empty").size() > 0) {
                        $(this).find("td").remove();
                        $(this).find(".footable-empty").append(`<td colspan= ${$(this).find("th").size()} >${ft.data.empty}</td>`);
                    }
                }
            },
            "breakpoints": {
                "xs": 320,
                "sm": 480,
                "md": 768,
                "lg": 770,
                "w_lg": 772,
                "xw_lg": 774,
                "xxw_lg": 776
            }

        });
    }
    
    // 브레이크포인트_원래있던값_230721
    /* 풋테이블도 가로스크롤 넣어야해서 브레이크포인트 값을임시수정함_230721
            "breakpoints": {
                "xs": 480,
                "sm": 768,
                "md": 992,
                "lg": 1200,
                "w_lg": 1440,
                "xw_lg": 1680,
                "xxw_lg": 1920
            }
     */
    
    
    //관리자는 컬럼이 많고 th가 2줄이 되는걸 방지하기 위해 사용자페이지에서 쓰던 footable 감싸기 좌우스크롤 생성 넣음_230731   
	document.querySelectorAll(".ftable.footable").forEach( table => {
		if( !table.parentNode.classList.contains("footable_box") ){
			$(table).wrap('<div class="footable_box type2"></div>');
		}
	});    
	
	document.querySelectorAll(".type2.footable").forEach( table => {
		if( !table.parentNode.classList.contains("footable_box") ){
			$(table).wrap('<div class="footable_box type2"></div>');
		}
	}); 	
    
    $('.ui.dropdown').dropdown({
        direction: 'downward'
    });
    $('.ui.checkbox').checkbox();
    //$('.ui.rating').rating();
    $('.tooltip').popup({
        inline: true,
        //on: 'click',
        variation: 'tiny',
        position: 'right center'
    });
    $('.ui.accordion').accordion({
        exclusive: false,
        selector: {
            trigger: '.title-header'
        }
    });

    /**** FooTable list-num ******/
    $('[name="listNum"]').on('change', function(e) {
        e.preventDefault();
        var newSize = $(this).val();
        if ($(this).attr('data-table-id')) {
            FooTable.get("#" + $(this).attr('data-table-id')).pageSize(newSize);
        } else {
            FooTable.get("#list-table").pageSize(newSize);
        }
        $('.ui.checkbox').checkbox();
    });

    /**** FooTable CHECKBOX ******/
    $("#checkAll").unbind('click').bind('click', function(e) {
        if ($("#checkAll").prop("checked")) {
            if (!$("input[name=ckBoxId]").attr("disabled")) {
                $("input[name=ckBoxId]").prop("checked", true);
            }
        } else {
            $("input[name=ckBoxId]").prop("checked", false);
        }
    });

    /**** Table CHECKBOX select-list ******/
    $('.select-list .ui-mark input:checked').each(function() {
        $(this).closest('tr').addClass('active');
    });

    $('.select-list.checkbox .ui-mark').unbind('click').bind('click', function(e) {
        var $checks = $(this).find('input[type=checkbox]');
        if ($checks.prop("checked", !$checks.is(':checked'))) {
            $(this).closest('tr').toggleClass('active');
        }
    });

    $('.select-list.radiobox .ui-mark').unbind('click').bind('click', function(e) {
        var $checks = $(this).find('input[type=radio]');
        if ($checks.prop('checked', true)) {
            $('.ui-mark label').closest('tr').removeClass('active');
            $(this).closest('tr').addClass('active');
        }
    });

    /********** inquiry-inbox sidebar **********/
    $('.inquiry-inbox').sidebar({
            dimPage: false,
            exclusive: true
        })
        .sidebar('attach events', '.inquiry-button', 'toggle')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('setting', 'mobileTransition', 'overlay');

    // $('.close').stop('click').on('click', function(e){
    //     $('.inquiry-inbox').sidebar('hide');
    // });

    /********** wide-inbox sidebar **********/
    $('.wide-inbox').sidebar({
            exclusive: true
        })
        .sidebar('attach events', '.sidebar-button', 'toggle')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('setting', 'mobileTransition', 'overlay');

    $('.wide-inbox2').sidebar({
            exclusive: true
        })
        .sidebar('attach events', '.sidebar-button2', 'toggle')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('setting', 'mobileTransition', 'overlay');

    $('.close').unbind('click').bind('click', function(e) {

        $('.wide-inbox, .wide-inbox2,.inquiry-inbox').sidebar('hide');
    });

    // $('.close').stop('click').on('click', function(e) {
    //     $('.wide-inbox2').sidebar('hide');
    // });
    /********** TAB show / hide **********/
    //$(".listTab li.select a").removeAttr("href");
    $(".listTab.menuBox li").unbind('click').bind('click', function(e) {
        $(".listTab.menuBox li").removeClass('select');
        $(this).addClass("select");
        $("div.tab_content").hide().eq($(this).index()).show();
        var selected_tab = $(this).find("a").attr("href");
        $(selected_tab).fadeIn();

        return false;
    });

    $(".tab-view a").unbind('click').bind('click', function(e) {
        $(".tab-view a").removeClass('on');
        $(this).addClass("on");
        $(".tab_content_view").hide().eq($(this).index()).show();
        var selected_tab = $(this).find("a").attr("href");
        $(selected_tab).fadeIn();

        return false;
    });

    /********** select button **********/
    $(".active-btn").unbind('click').bind('click', function(e) {
        $(".active-btn").removeClass('select');
        $(this).addClass("select");
    });

    $('.active-toggle-btn').unbind('click').bind('click', function(e) {

        if ($(this).hasClass("select") != true) {
            $('.active-toggle-btn').removeClass("select");
            $(this).addClass("select");
        } else {
            $('.active-toggle-btn').removeClass("select");
        }

    });

    $('.toggle-btn input:checked').each(function() {
        $(this).addClass('select');
    });

    $('.toggle-btn').unbind('click').bind('click', function(e) {
        var $checks = $(this).find('input[type=checkbox]');
        $(this).toggleClass('select');
    });

    //    $('.toggle-btn').click(function () {
    //        var $checks = $(this).find('input[type=checkbox]');
    //        if($checks.prop("checked", !$checks.is(':checked'))){
    //            $(this).toggleClass('select');
    //        }
    //    });

    $("ul.flex-tab li").unbind('click').bind('click', function(e) {
        $("ul.flex-tab li").removeClass('on');
        $(this).addClass("on");
    });

    /********** rubrics table select button **********/
    $(".ratings-column a.box").unbind('click').bind('click', function(e) {
        if ($(this).parent().hasClass("disabled") == true) {
            $(this).unbind('click');
        } else {
            $(this).closest('tr').find('a.box').removeClass('select');
            $(this).addClass("select");
        }
    });

    /********** ui radio button **********/
    $(".btn-choice .ui.button").unbind('click').bind('click', function(e) {
        var $checks = $(this).find('input[type=radio]');
        if ($checks.prop('checked', true)) {
            $('.btn-choice .ui.button').removeClass('active');
            $(this).closest('.btn-choice .ui.button').addClass('active');
        }
        //$checks.prop("checked", !$checks.is(":checked"));
    });

    /********** card label button **********/
    $(".card-item-center .title-box label").unbind('click').bind('click', function(e) {
        $(".card-item-center .title-box label").toggleClass('active');
    });

    $('.flex-item-box input[type=checkbox]').change(function() {
        if ($(this).is(":checked")) {
            $(this).parent().parent().find('.chk-box').addClass("on");
        } else {
            $(this).parent().parent().find('.chk-box').removeClass("on");
        }
    });

    /********** like/sns switch-toggle **********/
    $("input[type=checkbox].switch_fa").each(function() {
        //        $(this).before(
        //            '<span class="switch_fa">' +
        //            '<span class="mask" /><span class="background" />' +
        //            '</span>'
        //        );
        $(this).hide();
        if (!$(this)[0].checked) {
            $(this).prev().find(".background").css({
                left: "-20px"
            });
        }
    });
    $("span.switch_fa").unbind('click').bind('click', function(e) {
        if ($(this).next()[0].checked) {
            $(this).find(".background").animate({
                left: "-20px"
            }, 0);
        } else {
            $(this).find(".background").animate({
                left: "0px"
            }, 0);
        }
        $(this).next()[0].checked = !$(this).next()[0].checked;
    });

    $(".path-btn .sns button").unbind('click').bind('click', function(e) {
        $(this).next('.path-btn .sns-box').toggleClass('active');
    });





    /********** toggle_btn **********/
    $('.toggle_btn').unbind('click').bind('click', function(e) {
        $('.exclusive_box').css('display', 'none');
        $(this).parent().parent().find('.toggle_box').eq(0).toggle();
    });

    $('.exclusive_btn').unbind('click').bind('click', function(e) {
        $('.toggle_box').css('display', 'none');
        $('.comment .article').css('display', 'none');
        $(this).parent().parent().find('.exclusive_box').eq(0).toggle();
    });

    $('.result-view .tab-btn1').unbind('click').bind('click', function(e) {
        $(this).parent().find('.tab-box2').hide();
        $(this).parent().find('.tab-box1').toggle();
    });

    $('.result-view .tab-btn2').unbind('click').bind('click', function(e) {
        $(this).parent().find('.tab-box1').hide();
        $(this).parent().find('.tab-box2').toggle();
    });

    $(".question-box").find('.tab-btn').tab({
        context: '.question-box',
        history: false
    });

    $('.bind_btn').unbind('click').bind('click', function(e) {
        $(this).closest('#container').find('.bind_box').eq(0).toggleClass('on');
    });

    $('.mtoggle_btn').unbind('click').bind('click', function(e) {
        $(this).closest('.tbl-simple').find('.toggle_box').eq(0).toggleClass('on');
    });

    $('.toggle_view').unbind('click').bind('click', function(e) {
        $('.exclusive_box').css('display', 'none');
        $(this).closest('.comment').find('.article').toggle();
    });


    $(".slide-btn").unbind('click').bind('click', function(e) {
        $(this).parents().find('.variable-box').toggleClass('full');
        $(this).parents().find('.tip-box').toggleClass('show');
    });

    /********** dark Mode toggle_btn **********/
    function darkToggle(button, elem) {
        $(".dark-btn").unbind('click').bind('click', function(e) {
            $(this).closest('body').toggleClass('dark');
            $(elem).contents().find('body').toggleClass('dark');

            var classInfo = $(this).closest('body').attr('class');
            if (classInfo.indexOf('dark') > 0) {
                sessionStorage.setItem('classInfoDark', 'true');
            } else {
                sessionStorage.setItem('classInfoDark', 'false');
            }
        });
    }
    darkToggle(".dark-btn", "iframe");

    /********** grid Table **********/
    $('.grid-table tbody td').unbind('click').bind('click', function(e) {
        if (event.target.type !== 'radio') {
            $(':radio', this).trigger('click');
        }
    });
    $.fn.autowidth = function(width) {
        var n = $(".grid-table th.col").length;
        $(this).css({
            'width': (70 / $('.grid-table th.col').length) + '%'
        });
    };
    $('.grid-table th.col').autowidth($(window).innerWidth());

    $.fn.autowidth = function(width) {
        var n = $(".grid-table.star th.col").length;
        $(this).css({
            'width': (20 / $('.grid-table.star th.col').length) + '%'
        });
    };
    $('.grid-table.star th.col').autowidth($(window).innerWidth());


    /********** reponsive length size **********/
    $.fn.autowidth = function(width) {
        var n = $(".global_tab a").length;
        if (width <= 750) {
            $('.global_tab a').css({
                'width': 50 + '%'
            })
        } else {
            $('.global_tab a').css({
                'width': (100 / $('.global_tab a').length) + '%'
            });
            if (n >= 6) {
                $('.global_tab a').css({
                    'width': '25%'
                })
            }
        }

        var w = $(".subMenu a").length;
        if (width <= 750) {
            $('.subMenu li').css({
                'width': 50 + '%'
            })
        } else {
            $('.subMenu li').css({
                'width': (100 / $('.subMenu li').length) + '%'
            });
            if (w >= 6) {
                $('.subMenu li').css({
                    'width': '20%'
                })
            }
        }
    };
    $('.global_tab', '.subMenu').autowidth($(window).innerWidth());

    $(window).resize(function() {
        $('.global_tab', '.subMenu').autowidth($(window).innerWidth());
    });

    /********** semantic.button event **********/
    //    var $buttons = $('.ui.buttons .button');
    //    handler = {
    //        activate: function() {
    //            $(this)
    //            .addClass('active')
    //            .siblings()
    //            .removeClass('active');
    //        }
    //    };
    //    $buttons.on('click', handler.activate);

    var $toggle = $('.클래스');
    $toggle.state({
        text: {
            inactive: '적용',
            active: '미적용'
        }
    });

    $('.toggle-use')
        .checkbox({
            onChecked: function() {
                $("label[for='" + $(this).attr("id") + "']").text('사용');
            },
            onUnchecked: function() {
                $("label[for='" + $(this).attr("id") + "']").text('미사용');
            }
        });

    $('.toggle-allow')
        .checkbox({
            onChecked: function() {
                $("label[for='" + $(this).attr("id") + "']").text('허용');
            },
            onUnchecked: function() {
                $("label[for='" + $(this).attr("id") + "']").text('미허용');
            }
        });

    $('.toggle-board')
        .checkbox({
            onChecked: function() {
                $("label[for='" + $(this).attr("id") + "']").text('블로그형');
            },
            onUnchecked: function() {
                $("label[for='" + $(this).attr("id") + "']").text('리스트형');
            }
        });

    $('.toggle-gallery')
        .checkbox({
            onChecked: function() {
                $("label[for='" + $(this).attr("id") + "']").text('뉴스형');
            },
            onUnchecked: function() {
                $("label[for='" + $(this).attr("id") + "']").text('그리드형');
            }
        });

    /********** semantic simple-uploader **********/
    $('input:text, .ui.button', '.simple-uploader').on('click', function(e) {
        $(this).parent().find("input:file").click();
    });

    $('input:file', '.simple-uploader').on('change', function(e) {
        var name = e.target.files[0].name;
        $('input:text', $(e.target).parent()).val(name);
        $(this).parent().find('.remove').first().remove();
        $(this).parent().find('.black.button').before('<div class="ui red button remove"><i class="ion-minus"></i></div>');
        if (name) {
            $(this).parent().find('.remove').on('click', function() {
                $('input:text', $(e.target).parent()).val('');
                $(this).remove();
            });
        }
    });

    /********** mobile login button **********/
    $('#showleftUser').unbind('click').bind('click', function(e) {
        $(this).parent().find('#loginForm').slideToggle(0);
    });

    /********** image radio-box **********/
    $(".designImg label").each(function() {
        if ($(this).find('input[type="radio"]').first().attr("checked")) {
            $(this).addClass('on');
        } else {
            $(this).removeClass('on');
        }
    });
    $(".designImg label").on("click", function(e) {
        $(".designImg label").removeClass('on');
        $(this).addClass('on');
        var $radio = $(this).find('input[type="radio"]');
        $radio.prop("checked", !$radio.prop("checked"));

        e.preventDefault();
    });

    /********** mCustomScrollbar **********/
    //    $("body").mCustomScrollbar({
    //        theme: "dark-3",
    //        scrollInertia: 100
    //    });
    //스크롤 박스 생성 수정 및 추가_230704
    $(".scrollbox").mCustomScrollbar({
        theme: "dark-thin",
        scrollbarPosition: "outside",
        scrollInertia: 100,
        setWidth: true,
        setHeight: true
    });

    $(".scrollbox_x").mCustomScrollbar({
        theme: "dark-thin",
        axis:"x",
        scrollbarPosition: "outside",
        scrollInertia: 100,
        setWidth: true
    });

    /********** info-item-box sticky **********/
    //	function stiky_custom(id)
    //	{
    //		var tid = $(id)
    //		var tid_t = tid.offset().top
    //		var window_t = $(window).scrollTop()
    //        var header_height = $('header').height();
    //        var classInfo_height = $('.classInfo').height();
    //
    //		if( origin_val.top <= window_t + classInfo_height )
    //		{
    //            tid.css('top', header_height).addClass('sticky')
    //		}
    //		else
    //		{
    //            tid.css('top', 0).removeClass('sticky')
    //		}
    //	}
    //
    //	var sticky_id = '#info-item-box'
    //	var sticky_id_d = $(sticky_id)
    //	var origin_val = {}
    //	origin_val.top = $(sticky_id).offset().top
    //
    //	$(window).scroll(function(){
    //		stiky_custom(sticky_id)
    //	});

    /********** wrap_btn sticky **********/
    var bottom_button = $('.wrap_btn');
    var box_height = $('#container').height() + 100;
    var window_height = $(window).height();
    if (box_height >= window_height) {
        bottom_button.addClass('btn_fixed');
    }
    if ($(bottom_button).length > 0) {
        $('#container').css('padding-bottom', '6em');
    }
    $(window).scroll(function() {
        con_top = $(this).scrollTop();
        con_width = $(this).width();
        con_height = $(this).height();
        body_height = $(document).height();
        footer_wrap_height = $('footer').height();
        if (con_top + con_height >= body_height - footer_wrap_height) {
            bottom_button.removeClass('btn_fixed');
        } else {
            bottom_button.addClass('btn_fixed');
        }
    });

    /********** header info-toggle **********/
    $('.info-toggle').unbind('click').bind('click', function(e) {
        $(this).parents().find('.classInfo').toggleClass('fold');
        var classInfo = $('.info-toggle').parents().find('.classInfo').attr("class")
        if (classInfo.indexOf('fold') > 0) {
            sessionStorage.setItem("classInfoFold", "true");
        } else {
            sessionStorage.setItem("classInfoFold", "false");
        }
    });

    /********** favorite info-toggle-save **********/
    $('.favorite_chk a').unbind('click').bind('click', function(e) {
        var classFavorite = $(this).attr("class");
        if (classFavorite.indexOf('active') > -1) {
            $('.favorite_chk a').attr("class", "");
            $('.favorite-layout.only').hide();
            sessionStorage.setItem("classFavorite", "false");
        } else {
            $('.favorite_chk a').attr("class", "active");
            $('.favorite-layout.only').show();
            sessionStorage.setItem("classFavorite", "true");
        }
    });

    /********** favorite info-toggle **********/
    $('.title_box02 a.favorite').unbind('click').bind('click', function(e) {
        $('.detail_content').slideToggle();
    });

    /********** grid-table mobile colspan add **********/
    $("tr.mo td").attr("colspan", $(".grid-table thead th").length - 1);


    $.fn.autowidth = function(width) {
        if (width >= 768) {
            $('#class-lnb a, #class-lnb button').on('mouseenter touchstart', function() {
                $('#class-lnb').addClass('active');
            });

            var floatingLeave = $('#container, #footer');

            floatingLeave.on('touchstart', function() {
                $('#class-lnb').removeClass('active');
            })
            $('#class-lnb').on('mouseleave', function() {
                $('#class-lnb').removeClass('active');
            });
        } else {
            $('.class-menu-btn').unbind('click').bind('click', function(e) {
                $(this).closest('#class-lnb').toggleClass('active');
            });
        }
    };
    $('#class-lnb').autowidth($(window).innerWidth());

    $(window).resize(function() {
        $('#class-lnb').autowidth($(window).innerWidth());
    });
    
    /********** top note tooltip-box **********/
    $('#note-btn').unbind('click').bind('click', function(e) {
        $('#note-box, #alert-box').removeClass('on');
        $('#note-box').addClass('on');
        setTimeout(function() {
            $('#note-box').removeClass('on');
        }, 4000);
        close = document.getElementById("close");
        if (close != null) {
            close.addEventListener('click', function() {
                var note = $('#note-box');
                note.removeClass('on');
            }, false);
        }
        close1 = document.getElementById("close1");
        if (close1 != null) {
            close1.addEventListener('click', function() {
                var note = $('#note-box');
                note.removeClass('on');
            }, false);
        }
    });

    $('#alert-btn').unbind('click').bind('click', function(e) {
        $('#alert-box, #note-box').removeClass('on');
        $('#alert-box').addClass('on');
        close = document.getElementById("close");
        if (close != null) {
            close.addEventListener('click', function() {
                var note = $('#alert-box');
                note.removeClass('on');
            }, false);
        }
        close2 = document.getElementById("close2");
        if (close2 != null) {
            close2.addEventListener('click', function() {
                var note = $('#alert-box');
                note.removeClass('on');
            }, false);
        }
    });

    /********** CMS asideMenu **********/
    var overlay = $('.lnb-overlay');

    function response() {
        var width = $(window).width();
        if (width <= 768) {
            $('aside.lnb').css('left', '-240px');
            $('#nav-btn,#nav-btn2').unbind('click').bind('click', function(e) {
                $(this).parents().find('aside.lnb').css('left', '0');
                overlay.show();
                $('body').addClass('modal-open');
            });
            overlay.unbind('click').bind('click', function(e) {
                $(this).parents().find('aside.lnb').css('left', '-240px');
                overlay.hide();
                $('body').removeClass('modal-open');
            });
        } else {
            $('aside.lnb').css('left', '0');
            overlay.hide();
            $('body').removeClass('modal-open');
        };
    };
    response();

    $(window).resize(function() {
        response();
    });


    //    var overlay = $('.lnb-overlay');
    //    $('#nav-btn').unbind('click').bind('click', function(e) {
    //        $(this).closest('#wrap').find('aside.lnb').toggleClass('hide2');
    //    });
    //    $.fn.autowidth = function(width) {
    //        if (width <= 768){
    //            $('aside.lnb').addClass('hide2');
    //            $('#nav-btn').click(function() {
    //                overlay.show();
    //                $('body').addClass('modal-open');
    //            });
    //            $('.lnb-overlay i').click(function() {
    //                $(this).closest('#wrap').find('aside.lnb').toggleClass('hide2');
    //                overlay.hide();
    //                $('body').removeClass('modal-open');
    //            });
    //            overlay.hide();
    //        }
    //        else {
    //            $('aside.lnb').removeClass('hide');
    //            $('#nav-btn').click(function() {
    //                overlay.hide();
    //            });
    //            overlay.hide();
    //            $('body').removeClass('modal-open');
    //        }
    //    };
    //    $('aside.lnb').autowidth($(window).innerWidth());
    //
    //    $(window).resize(function() {
    //        $('aside.lnb').autowidth($(window).innerWidth());
    //    });

    /********** popupBox **********/
    $('.popup-close').unbind('click').bind('click', function(e) {
        $('.popup-wrap, .popup-close').hide();
    });
    $('.popup-open').on('click', function() {
        $('.popup-wrap, .popup-close').css('display', 'flex');
        $('#slides').get(0).slick.setPosition()
    });




    /********** Hide popupBox on on scroll down **********/
    var lastScrollTop = 0,
        delta = 15;

    //    if ($(document).height() == $(window).height()) {
    //        $('.popup-btn-box').css('bottom', '100px');
    //    }

    $(window).scroll(function(event) {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta) return;
        if ((st > lastScrollTop) && (lastScrollTop > 0)) {
            // Scroll Down
            $('.popup-btn-box').fadeOut(200);
        } else {
            // Scroll Up
            $('.popup-btn-box').fadeIn(200);
        }
        lastScrollTop = st;
    });

    $(window).resize(function(event) {
        controller();
    });
    controller();
});


function controller() {
    var winWidth = $(window).width();
    if (winWidth > 768) {

        /****************************
         * PC 화면 이벤트
         ****************************/
        var flag = false;
        $(window).scroll(function() {
            if ($(window).scrollTop() >= 60 && flag == false) {
                flag = true;
                $('.gn-menu-wrapper').stop().animate({
                    marginTop: '0'
                }, 100, 'swing');
            } else if ($(window).scrollTop() <= 60 && flag == true) {
                flag = false;
                $('.gn-menu-wrapper').stop().animate({
                    marginTop: '0'
                }, 100, 'swing');
            }
        });

        /********** info-item-box sticky **********/
        $('.ui.sticky').sticky({
            offset: 60,
            observeChanges: true
        }).sticky('refresh');
        $('.ui.admin').sticky({
            offset: 100,
            observeChanges: true
        }).sticky('refresh');

        $('#nav-btn').unbind('click').bind('click', function(e) {
            $('.ui.sticky').sticky('refresh');
        });

        /********** knob process **********/
        $(".dial").knob({
            'width': 120,
            'height': 120,
            'readOnly': true
        });

    } else if (winWidth <= 768) {

        /****************************
         * MOBILE 화면 이벤트
         ****************************/
        var flag = false;
        $(window).scroll(function() {
            if ($(window).scrollTop() >= 60 && flag == false) {
                flag = true;
                $('.gn-menu-wrapper').stop().animate({
                    marginTop: '-60px'
                }, 100, 'swing');
            } else if ($(window).scrollTop() <= 60 && flag == true) {
                flag = false;
                $('.gn-menu-wrapper').stop().animate({
                    marginTop: '0'
                }, 100, 'swing');
            }
        });

        $('.listTab li, .listTab:before').unbind('click').bind('click', function(e) {
            $('.listTab li').toggleClass('on');
        });

        /********** info-item-box sticky **********/
        $('.ui.sticky').sticky({
            offset: 0,
            observeChanges: true
        }).sticky('refresh');

        $('#nav-btn').unbind('click').bind('click', function(e) {
            $('.ui.sticky').sticky('refresh');
        });

        /********** knob process **********/
        $(".dial").knob({
            'width': 80,
            'height': 80,
            'readOnly': true
        });

    }

    if (winWidth <= 480) {
        $('.manage_buttons .ui.buttons.fn_btn').addClass('vertical');
    } else {
        $('.manage_buttons .ui.buttons.fn_btn').removeClass('vertical');
    }

    //message_box 닫기 버튼
    $('.dash_btn_box .btn_close')
        .on('click', function() {
            $(this)
                .closest('.message')
                .transition('fade');
        });

    //ocu_content_info_list 메인노출 선택버튼
    $('.lic_toggle_btn .pop_btn').click(function() {
        $('.lic_toggle_btn .pop_btn').toggleClass('active');
    })
    $('.lic_toggle_btn .recom_btn').click(function() {
        $('.lic_toggle_btn .recom_btn').toggleClass('active');
    })

    gfn_renderPaging = function(params){
    	var divId = "paging"; //페이징이 그려질 div id
    	if(params.pagingDivId != undefined) {
    		divId = params.pagingDivId;
    	}
    	var totalCount = params.totalCount; //전체 조회 건수
    	var currentIndex = params.currentPageNo //현재 위치
    	// console.log("currentIndex::" + currentIndex);
    	if(gfn_isNull(currentIndex)){
    		currentIndex = 1;
    	}
    	
    	var listScale = params.listScale; //페이지당 레코드 수
    	if(gfn_isNull(listScale)){
    		listScale = 20;
    	}
    	var totalIndexCount = Math.ceil(totalCount / listScale); // 전체 인덱스 수
    	var eventName = params.eventName;
    	
    	$("#"+divId).empty();
    	var preStr = "";
    	var postStr = "";
    	var str = "";
    	
    	var first = (parseInt((currentIndex-1) / 10) * 10) + 1;
    	var last = (parseInt(totalIndexCount/10) == parseInt(currentIndex/10)) ? totalIndexCount%10 : 10;
    	var prev = (parseInt((currentIndex-1)/10)*10) - 9 > 0 ? (parseInt((currentIndex-1)/10)*10) - 9 : 1; 
    	var next = (parseInt((currentIndex-1)/10)+1) * 10 + 1 < totalIndexCount ? (parseInt((currentIndex-1)/10)+1) * 10 + 1 : totalIndexCount;
    	
    	if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨앞, 앞 태그 작성
    		preStr += "<button type='button' class='pg_first disable' onclick='" + eventName + "(1)'>첫 페이지로 가기</button>" + 
    				"<button type='button' class='pg_prev disable' onclick='" + eventName + "("+prev+")'>이전 페이지로 가기</button>";
    		 	
    		/*
    		preStr += "<a href='#' class='first' onclick='" + eventName + "(1)'>처음</a>" +
    				"<a href='#' class='before' onclick='" + eventName + "("+prev+")'>이전</a>";
    		*/
    	}
    	else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨앞 태그 작성
    		preStr += "<button type='button' class='pg_prev disable' onclick='" + eventName + "("+prev+")'>이전 페이지로 가기</button>";
    		/*
    		preStr += "<a href='#' class='before' onclick='" + eventName + "("+prev+")'>이전</a>";
    		*/
    	}
    	
    	if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨뒤, 뒤 태그 작성
    		postStr += "<button type='button' class='pg_next' onclick='" + eventName + "("+next+")'>다음 페이지로 가기</button>" + 
            	     "<button type='button' class='pg_last' onclick='" + eventName + "("+totalIndexCount+")'>마지막 페이지로 가기</button>";
            
            /*
    		postStr += "<a href='#' class='next' onclick='" + eventName + "("+next+")'>다음</a>" +
    					"<a href='#' class='last' onclick='" + eventName + "("+totalIndexCount+")'>마지막</a>";
    		*/
    	}
    	else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨뒤 태그 작성
    		postStr += "<button type='button' class='pg_next' onclick='" + eventName + "("+next+")'>다음 페이지로 가기</button>";
    		/*
    		postStr += "<a href='#' class='next' onclick='" + eventName + "("+next+")'>다음</a>";
    		*/
    	}
    	
    	for(var i=first; i<(first+last); i++){
    		//console.log(i + ":::" + currentIndex);
    		if(i == currentIndex){
    			str += "<a title='현재페이지' href='javascript:;' onclick='" + eventName + "("+i+")' class='current'>"+i+"</a>";
    			/*
    			str += "<strong><a href='#' onclick='" + eventName + "("+i+")'>"+i+"</a></strong>";
    			*/
    		} else {
    			str += "<a href='javascript:;' onclick='" + eventName + "("+i+")'>"+i+"</a>";
    			/*
    			str += "<a href='#' onclick='" + eventName + "("+i+")'>"+i+"</a>";
    			*/
    		}
    	}
    	$("#"+divId).append(preStr + str + postStr);
    }
};

//로딩 표시
function showLoading() {
	$("#loading_page").show();
};

// 로딩 감추기
function hideLoading() {
	$("#loading_page").hide();
};

function gfn_isNull(str) {
	if (str == null) return true;
	if (str == "NaN") return true;
	if (str === undefined) return true;
	if (new String(str).valueOf() == "undefined") return true;    
    var chkStr = new String(str);
    if( chkStr.valueOf() == "undefined" ) return true;
    if (chkStr == null) return true;    
    if (chkStr.toString().length == 0 ) return true;   
    return false; 
}

gfn_renderPaging = function(params){
	var divId = "paging"; //페이징이 그려질 div id
	if(params.pagingDivId != undefined) {
		divId = params.pagingDivId;
	}
	var totalCount = params.totalCount; //전체 조회 건수
	var currentIndex = params.currentPageNo //현재 위치
	console.log("currentIndex::" + currentIndex);
	if(gfn_isNull(currentIndex)){
		currentIndex = 1;
	}
	
	var listScale = params.listScale; //페이지당 레코드 수
	if(gfn_isNull(listScale)){
		listScale = 20;
	}
	var totalIndexCount = Math.ceil(totalCount / listScale); // 전체 인덱스 수
	var eventName = params.eventName;
	
	$("#"+divId).empty();
	var preStr = "";
	var postStr = "";
	var str = "";
	
	var first = (parseInt((currentIndex-1) / 10) * 10) + 1;
	var last = (parseInt(totalIndexCount/10) == parseInt(currentIndex/10)) ? totalIndexCount%10 : 10;
	var prev = (parseInt((currentIndex-1)/10)*10) - 9 > 0 ? (parseInt((currentIndex-1)/10)*10) - 9 : 1; 
	var next = (parseInt((currentIndex-1)/10)+1) * 10 + 1 < totalIndexCount ? (parseInt((currentIndex-1)/10)+1) * 10 + 1 : totalIndexCount;
	
	if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨앞, 앞 태그 작성
		preStr += "<button type='button' class='pg_first disable' onclick='" + eventName + "(1)'>첫 페이지로 가기</button>" + 
				"<button type='button' class='pg_prev disable' onclick='" + eventName + "("+prev+")'>이전 페이지로 가기</button>";
		 	
		/*
		preStr += "<a href='#' class='first' onclick='" + eventName + "(1)'>처음</a>" +
				"<a href='#' class='before' onclick='" + eventName + "("+prev+")'>이전</a>";
		*/
	}
	else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨앞 태그 작성
		preStr += "<button type='button' class='pg_prev disable' onclick='" + eventName + "("+prev+")'>이전 페이지로 가기</button>";
		/*
		preStr += "<a href='#' class='before' onclick='" + eventName + "("+prev+")'>이전</a>";
		*/
	}
	
	if(totalIndexCount > 10){ //전체 인덱스가 10이 넘을 경우, 맨뒤, 뒤 태그 작성
		postStr += "<button type='button' class='pg_next' onclick='" + eventName + "("+next+")'>다음 페이지로 가기</button>" + 
        	     "<button type='button' class='pg_last' onclick='" + eventName + "("+totalIndexCount+")'>마지막 페이지로 가기</button>";
        
        /*
		postStr += "<a href='#' class='next' onclick='" + eventName + "("+next+")'>다음</a>" +
					"<a href='#' class='last' onclick='" + eventName + "("+totalIndexCount+")'>마지막</a>";
		*/
	}
	else if(totalIndexCount <=10 && totalIndexCount > 1){ //전체 인덱스가 10보다 작을경우, 맨뒤 태그 작성
		postStr += "<button type='button' class='pg_next' onclick='" + eventName + "("+next+")'>다음 페이지로 가기</button>";
		/*
		postStr += "<a href='#' class='next' onclick='" + eventName + "("+next+")'>다음</a>";
		*/
	}
	
	for(var i=first; i<(first+last); i++){
		//console.log(i + ":::" + currentIndex);
		if(i == currentIndex){
			str += "<a title='현재페이지' href='javascript:;' onclick='" + eventName + "("+i+")' class='current'>"+i+"</a>";
			/*
			str += "<strong><a href='#' onclick='" + eventName + "("+i+")'>"+i+"</a></strong>";
			*/
		} else {
			str += "<a href='javascript:;' onclick='" + eventName + "("+i+")'>"+i+"</a>";
			/*
			str += "<a href='#' onclick='" + eventName + "("+i+")'>"+i+"</a>";
			*/
		}
	}
	$("#"+divId).append(preStr + str + postStr);
}

//Ajax 호출 함수
let AJAX_CALL_NO = 0;
function ajaxCall(url, param, succCallback, errCallback, disploading) {
	$.ajax({
		url : url,
		data: param,
		type: "POST",
		// dataType : "json",
		// contentType: 'application/json',
		beforeSend : function(){
			if (disploading != undefined && disploading == true) {
				showLoading();
			}
			AJAX_CALL_NO++;
		},
		success : function(data, status, xr){
			if(typeof succCallback == "function"){
				succCallback(data);	
			} else {
				console.log("success else");
			}
		},
		error : function(xhr, status, error){
			if(typeof succCallback == "function"){
				errCallback(xhr, status, error);
			}
			
			AJAX_CALL_NO--;
			if (AJAX_CALL_NO == 0) {
				hideLoading();
			}
		},
		complete : function(){
			AJAX_CALL_NO--;
			if (AJAX_CALL_NO == 0) {
				hideLoading();
			}
		}
	})
};

function isEmpty(str) {
	for (var i = 0; i < str.length; i++) {
		if (str.substring(i, i+1) != " ") {
			return false;
		}
	}
	return true;
}

//commom.js에 있던 달력 관련 함수들 가져옴_다 가져온건지 확인해보기_230690
//date객체를 문자로 리턴
function replaceDateToDttm(date){
 //2022.10.7 6:00 오전
 var dateList = date.split(/:|\.| /);
 if(dateList[5] == "오후" && dateList[3] != "12") {
     dateList[3] = parseInt(dateList[3]) + 12;
 } else if(dateList[5] == "오전" && dateList[3] == "12") {
     dateList[3] = "00";
 }
 
 var dt = new Date(pad(dateList[0], 4), pad(dateList[1], 2)-1, pad(dateList[2], 2), pad(dateList[3], 2), pad(dateList[4], 2));
 var tmpYear  = dt.getFullYear().toString();
 var tmpMonth = pad( dt.getMonth()+1, 2);
 var tmpDay   = pad( dt.getDate(), 2);
 var tmpHourr = pad( dt.getHours(), 2);
 var tmpMin   = pad( dt.getMinutes(), 2);
 var tmpSec   = pad( dt.getSeconds(), 2);
 var nowDay   = tmpYear+tmpMonth+tmpDay+tmpHourr+tmpMin+tmpSec;
 return nowDay;
}

//날짜 자리수 채우기
function pad(number, length){
 var str = number.toString();
 while(str.length < length){
     str = '0' + str;
 }
 return str;
}

function isNumber(num) {
 var reg = RegExp(/^(\d|-)?(\d|,)*\.?\d*$/);
 if (reg.test(num)) return  true;
 return  false;
}


/**
* 날짜선택/시간선택/분선택 calendar 설정
*/
function initCalendar() {
 $(".ui.calendar").each(function(index, item){
     let dateVal = $(item).attr("dateval");
     let hour = " ";
     let min = " ";
     
     if (dateVal != undefined && dateVal != null && dateVal != "") {
         dateVal = dateVal.replace("-","").replace(".","").replace(" ","").replace(":","");
         
         if (dateVal.length >= 10) {
             hour = dateVal.substr(8,2);
         }
         
         if (dateVal.length >= 12) {
             min = dateVal.substr(10,2);
         }
         
         $(item).find("input[type=text]").val(dateVal.substr(0,4)+"."+dateVal.substr(4,2)+"."+dateVal.substr(6,2));
     }
     
     let opt = {
         type: 'date',
         formatter: {
             date: function (date, settings) {
                if (!date) return '';
                let day = date.getDate();
                let month = settings.text.monthsShort[date.getMonth()];
                let year = date.getFullYear();
                return year + '.' + (month<10 ? '0'+month : month) + '.' + (day<10 ? '0'+day : day);
             }
         }
     }
     
     let range = $(item).attr("range");
     if (range !== undefined) {
         let ranges = range.split(",");
         opt[ranges[0]] = $("#"+ranges[1]);
     }
     
     $(item).calendar(opt);

     // 시간선택 select 설정
     let calHour = $(item).parent().find("select[caltype='hour']");
     if (calHour.length > 0) {
         for (let i=0; i<=23; i++) {
             let val = i<10 ? '0'+i : i;
             
             if (i == 0 && $(calHour).find("option[value=' ']").length == 0) {
                 $(calHour).append($("<option value=' '>시</option>"));
             }
             
             if ($(calHour).find("option[value='"+val+"']").length == 0) {
                 $(calHour).append($("<option value='"+val+"'>"+val+"</option>"));
             }
         }
         $(calHour).val(hour).prop("selected", true);
     }
     
     // 분선택 select 설정
     let calMin = $(item).parent().find("select[caltype='min']");
     if (calMin.length > 0) {
         for (let i=0; i<=55; i+=5) {
             let val = i<10 ? '0'+i : i;
             
             if (i == 0 && $(calMin).find("option[value=' ']").length == 0) {
                 $(calMin).append($("<option value=' '>분</option>"));
             }
             
             if ($(calMin).find("option[value='"+val+"']").length == 0) {
                 $(calMin).append($("<option value='"+val+"'>"+val+"</option>"));
             }
         }
         $(calMin).append($("<option value='59'>59</option>"));
         $(calMin).val(min).prop("selected", true);
     }
 });
 
 $('.ui.dropdown').dropdown();
}

//캘린더 시간, 분 자동 체크
function selectCalendar(obj, type) {
 var selectObj = obj.context;
 $(selectObj).siblings(".selection").each(function(i, v) {
     if($(selectObj).hasClass("rangestart") && type.endCalendar.selector != "#undefined") {
         $(v).find("select option[value=00]").prop("selected", true).trigger("change");
     } else {
         if(i == 0) {
             $(v).find("select option[value=23]").prop("selected", true).trigger("change");
         } else {
             $(v).find("select option[value=59]").prop("selected", true).trigger("change");
         }
     }
 });
}
//__commom.js에 있던 달력 관련 함수들 가져옴_230690


/**
 * 숫자이면 숫자, 숫자가 아니면 0
 */
function nvlNumber(val) {
    if(val == "" || isNaN(val) || val == "undefined")
        return 0;

    return Number(val);
}

function isChkMaxNumber(obj, maxval,preval) {
	var val = obj.value;
	val = val.replace(",","");
	if(!isNumber(val)) {
		alert("숫자만 입력 가능합니다.");
		obj.value = parseInteger(val);
		return;
	}
	if(parseInt(val,10) > maxval) {
        alert("입력할 수 있는 최대값은 {"+maxval+"} 입니다.");
		obj.select();
		
		if(!isNumber(preval)){preval=0;}
		obj.value = preval;
		obj.focus();
		return;
	}
}

function isChkMinNumber(obj, minVal, preVal) {
	var val = obj.value;
	val = val.replace(",","");
	if(!isNumber(val)) {
		alert("숫자만 입력 가능합니다.");
		obj.value = parseInteger(val);
		return;
	}
	if(parseInt(val,10) < minVal) {
		alert("입력할 수 있는 최소값은 {"+minVal.toString()+"}입니다.");
		obj.select();
		if(!isNumber(preVal)){preVal=0;}
		obj.value = preVal;
		obj.focus();
		return;
	}
}

function isChkNumber(obj) {
	var val = obj.value;
	val = val.replace(",","");
	val = val.replace(".","");
	if(!isNumber(val)) {
		alert("숫자만 입력 가능합니다.");
		obj.value = parseInteger(val);
		return;
	}
}


//일본어 입력기 적용
var JAPAN_INPUT = {input:null, dialog:null, init:false};
function setJapaneseInput() {
	var jpnIn = $("input:text.japanInput");
	for (var i=0; i<jpnIn.length; i++) {
		if (!$(jpnIn[i]).parent().hasClass("japanInputBox")) {
			$(jpnIn[i]).addClass("flex1");
			var box = $("<div class='flex japanInputBox'></div>");
			$(jpnIn[i]).before(box);
			box.append($(jpnIn[i]));
			var btn = $("<button class='ui small basic button'>일본어</button>");
			box.append(btn);
			
			btn.click(function(){
				JAPAN_INPUT.input = $(this).prev();
				JAPAN_INPUT.dialog = UiDialog("japanInput", "일본어 입력", "width=560,height=380,resizable=true,draggable=true,modal=true,autoresize=false");
            	JAPAN_INPUT.dialog.html("<iframe frameborder='0' scrolling='auto' style='width:100%;height:98%' src=\"/webdoc/japan/japan.html\"></iframe>");
            	JAPAN_INPUT.dialog.open();
			});
		}
	}
	
	if (JAPAN_INPUT.init == false) {
		window.addEventListener('message', function(e) {
			if (e.data == "closeJapanInput") {
				if (JAPAN_INPUT.dialog != null) {
					JAPAN_INPUT.dialog.close();
					JAPAN_INPUT.dialog = null;
					JAPAN_INPUT.input = null;
				}
			}
			else if (e.data.indexOf("japanInput:") == 0){
				if (JAPAN_INPUT.input != null) {
					JAPAN_INPUT.input.val(JAPAN_INPUT.input.val() + e.data.replace("japanInput:",""));
					JAPAN_INPUT.dialog.close();
					JAPAN_INPUT.dialog = null;
					JAPAN_INPUT.input = null;
				}
			}
		});
		JAPAN_INPUT.init = true;
	}
}

