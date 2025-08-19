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
    document.getElementById('loading_page').style.display = "none";
    // document.getElementById('wrap').style.display = "";


    AOS.init({
        // disable: 'mobile',
        // offset: 120,
        delay: 0,
        duration: 1000
    });


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
        if (width <= 1024) {
            // if ($('#container').is('.sub-wrap, .prof-wrap') === true) {
            //     $('.gn-menu-main').css({
            //         'left': '0',
            //         width: '100%'
            //     });
            //     $('.gn-menu-wrapper').css({
            //         'left': '0'
            //     });
            // }
        }
    });

    $(window).trigger("resize");

    /********** semantic-ui Using **********/
    //FooTable
    var tableClass = param.get('tableClass');
    if (tableClass != null) {
        $('#' + tableClass).footable({
            "on": {
                "draw.ft.table": function(e, ft) {
                    if ($(this).find(".footable-empty").size() > 0) {
                        $(this).find("td").remove();
                        $(this).find(".footable-empty").append(`<td colspan= ${$(this).find("th").size()} >${ft.data.empty}</td>`);
                    }
                }
            },
            "breakpoints": {
                "xs": 375,
                "sm": 560,
                "md": 768,
                "lg": 1024,
                "w_lg": 1200,
            }
        });
    } else {
        $('.table').footable({
            "on": {
                "draw.ft.table": function(e, ft) {
                    if ($(this).find(".footable-empty").size() > 0) {
                        $(this).find("td").remove();
                        $(this).find(".footable-empty").append(`<td colspan= ${$(this).find("th").size()} >${ft.data.empty}</td>`);
                    }
                }
            },
            "breakpoints": {
                "xs": 375,
                "sm": 560,
                "md": 768,
                "lg": 1024,
                "w_lg": 1200,
            }
        });
    }

    //footable 감싸기 좌우스크롤 생성
    $('table.footable , table.fix_tbl').wrap('<div class="footable_box"></div>');

    $('.ui.dropdown').dropdown({
        direction: 'auto'
    });
    $('.ui.checkbox').checkbox();
    //$('.ui.rating').rating();

    //tooltip
    $('.tooltip').popup({
        inline: true,
        on: 'click',
        variation: 'tiny',
        position: 'right center'
    });
    $('.alert_tooltip').popup({
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
    $("#checkAll").click(function() {
        if ($("#checkAll").prop("checked")) {
            if (!$("input[name=ckBoxId]").attr("disabled")) {
                $("input[name=ckBoxId]").prop("checked", true);
            }
        } else {
            $("input[name=ckBoxId]").prop("checked", false);
        }
    });


    /**** Table CHECKBOX select-list ******/
    //$('.select-list .ui-mark input:checked').each(function() {
    //	$(this).closest('tr').addClass('active');
    //});
    //
    //$('.select-list.checkbox .ui-mark').unbind('click').bind('click', function(e) {
    //	var $checks = $(this).find('input[type=checkbox]');
    //	if ($checks.prop("checked", !$checks.is(':checked'))) {
    //		$(this).closest('tr').toggleClass('active');
    //	}
    //});
    //
    //$('.select-list.radiobox .ui-mark').unbind('click').bind('click', function(e) {
    //	var $checks = $(this).find('input[type=radio]');
    //	if ($checks.prop('checked', true)) {
    //		$('.ui-mark label').closest('tr').removeClass('active');
    //		$(this).closest('tr').addClass('active');
    //	}
    //});

    /********** inquiry-inbox sidebar **********/
    $('.inquiry-inbox').sidebar({
            dimPage: false,
            exclusive: true
        })
        .sidebar('attach events', '.inquiry-button', 'toggle')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('setting', 'mobileTransition', 'overlay');

    //$('.close').click(function() {
    //    $('.inquiry-inbox').sidebar('hide');
    //});

    /********** wide-inbox sidebar **********/
    $('.wide-inbox').sidebar({
            exclusive: true
        })
        .sidebar('attach events', '.sidebar-button', 'toggle')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('setting', 'mobileTransition', 'overlay');

    /********** wide-inbox2 sidebar **********/
    $('.wide-inbox2').sidebar({
            exclusive: true
        })
        .sidebar('attach events', '.sidebar-button2', 'toggle')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('setting', 'mobileTransition', 'overlay');

    $('.close, .close_btn, .cancle').unbind('click').bind('click', function(e) {
        $('.wide-inbox, .wide-inbox2, .inquiry-inbox').sidebar('hide');
    });


    /********** TAB show / hide **********/
    //$(".listTab li.select a").removeAttr("href");
    $(".listTab li").unbind('click').bind('click', function(e) {
        $(".listTab li").removeClass('select');
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

    // $('.active-toggle-btn').unbind('click').bind('click', function(e) {
    //     if ($(this).hasClass("select") != true) {
    //         $('.active-toggle-btn').removeClass("select");
    //         $(this).addClass("select");
    //     } else {
    //         $('.active-toggle-btn').removeClass("select");
    //     }
    // });

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
    $("span.switch_fa").click(function() {
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

    $(".path-btn .sns button").click(function() {
        $(this).next('.path-btn .sns-box').toggleClass('active');
    });

    /********** toggle_btn **********/
    $('.toggle_btn').unbind('click').bind('click', function(e) {
        $(this).parent().parent().find('.toggle_box').eq(0).toggle();
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
            //            if ($(this).text() == "다크 모드로 보기")
            //                $(this).text("라이트 모드로 보기")
            //            else
            //                $(this).text("다크 모드로 보기");
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
        var n = $(".grid-table.s_head th.col").length;
        $(this).css({
            'width': (90 / $('.grid-table.s_head th.col').length) + '%'
        });
    };
    $('.grid-table.s_head th.col').autowidth($(window).innerWidth());

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
    $(".scrollbox").mCustomScrollbar({
        theme: "dark-thin",
        scrollbarPosition: "outside",
        scrollInertia: 100
    });
    $(".scrollbox_in").mCustomScrollbar({
        theme: "dark-thin",
        scrollbarPosition: "inside",
        scrollInertia: 100
    });
    /********** info-item-box sticky **********/
    // function stiky_custom(id) {
    //     var tid = $(id)
    //     var tid_t = tid.offset().top
    //     var window_t = $(window).scrollTop()
    //     var header_height = $('header').height();
    //     var classInfo_height = $('.classInfo').height();

    //     if (origin_val.top <= window_t + classInfo_height) {
    //         tid.css('top', header_height).addClass('sticky')
    //     } else {
    //         tid.css('top', 0).removeClass('sticky')
    //     }
    // }

    // var sticky_id = '#info-item-box'
    // var sticky_id_d = $(sticky_id)
    // var origin_val = {}
    // origin_val.top = $(sticky_id).offset().top

    // $(window).scroll(function() {
    //     stiky_custom(sticky_id)
    // });

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
        $('.main_content').slideToggle();
    });

    /********** grid-table mobile colspan add **********/
    $("tr.mo td").attr("colspan", $(".grid-table thead th").length - 1);


    $.fn.autowidth = function(width) {
        if (width > 1024) {

            // $('.gn-trigger .gn-icon').unbind('click').bind('click', function() {
            //     $('nav.gn-menu-wrapper').toggleClass('gn-open-all');
            //     $('#container > .content,footer > .inner-wrap').toggleClass('gn_open');
            // });

            //화면 너비 변경시 메인 메뉴창 닫음
            // $(window).resize(function() {
            //     $('#gn-menu nav').removeClass('gn-open-all');
            //     $('#container > .content,footer > .inner-wrap').removeClass('gn_open');
            // });

            // var floatingLeave = $('#context');

            // floatingLeave.unbind('click touchstart').bind('click touchstart', function() {
            //     $('#class-lnb').removeClass('active');
            //     $('#container.push-left').removeClass('push-left');

            // })
        } else {
            // $('nav.gn-menu-wrapper').removeClass('gn-open-all');
            // $('#container > .content,footer > .inner-wrap').removeClass('gn_open');
            // $('.gn-trigger .gn-icon').unbind('touchstart').bind('touchstart', function(e) {
            //     $('nav.gn-menu-wrapper').toggleClass('gn-open-all');
            //     $('#container > .content').removeClass('gn_open');
            // });

            // var floatingLeave = $('#context');

            // floatingLeave.on('click touchstart', function() {
            //     $('nav.gn-menu-wrapper').removeClass('gn-open-all');
            //     $('#container > .content').removeClass('gn_open');
            // })
        }
    };

    // $('nav.gn-menu-wrapper').autowidth($(window).innerWidth());

    // $(window).resize(function() {
    //     $('nav.gn-menu-wrapper').autowidth($(window).innerWidth());
    // });

    $('.ui.search.dropdown').find('input.search').attr('title', '검색');

    /********** Summernote Editor **********/
    $('#editor').summernote({
        height: 400,
        lang: 'ko-KR',
        placeholder: '내용을 입력하세요',
        toolbar: [
            ['font', ['style', 'fontsize', 'color', 'bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph', 'height', 'table']],
            ['insert', ['link', 'picture', 'video', 'hr', 'emoji', 'math']],
            ['view', ['fullscreen', 'codeview']]
        ],
        callbacks: {
            // 이미지 업로드
            onImageUpload: function(files) {
                uploadSummernoteImageFile(files[0], this);
            },
            // copy&past
            onPaste: function(event) {
                copyPasteSummernoteText(event, this);
            }
        }
    });

    // summernote에서 이미지 plugin 사용 시, base64 인코딩이 아닌, 파일 업로드 방식으로 변경되게 하는 callback method
    // /file/fileHome/uploadSummernoteImageFile에 그림 파일을 전송하고, response로 해당 그림파일의 url 정보를 받아온다.
    function uploadSummernoteImageFile(file, editor) {
        //      console.log('start uploadSummernoteImageFile');
        var data = new FormData();
        data.append("file", file);
        $.ajax({
            data: data,
            type: "POST",
            url: "/file/fileHome/uploadSummernoteImageFile",
            contentType: false,
            processData: false,
            success: function(data) {
                $(editor).summernote('insertImage', data.datas.url);
            }
        });
    }

    // copy&paste를 할 때 그림이 포함된 부분을 처리하는 기능
    // 이미지 업로드 시 uploadSummernoteImageFile() 메소드가 같이 동작하기 때문에 2개의 그림이 중첩되는 일이 발생, 이에 대한 예외처리를 한다. 
    function copyPasteSummernoteText(event, editor) {
        //      console.log('copypaste start');
        var clipboardData = event.originalEvent.clipboardData;
        var content = '';

        if (clipboardData && clipboardData.items && clipboardData.items.length) {
            var item = clipboardData.items[0];

            if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
                event.preventDefault();
            }
        }
    }

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
    // var overlay = $('.lnb-overlay');

    // function response() {
    //     var width = $(window).width();
    //     if (width <= 1100) {
    //         $('aside.lnb').css('left', '-240px');
    //         $('#nav-btn,#nav-btn2').unbind('click').bind('click', function(e) {
    //             $(this).parents().find('aside.lnb').css('left', '0');
    //             overlay.show();
    //             $('body').addClass('modal-open');
    //         });
    //         overlay.unbind('click').bind('click', function(e) {
    //             $(this).parents().find('aside.lnb').css('left', '-240px');
    //             overlay.hide();
    //             $('body').removeClass('modal-open');
    //         });
    //     } else {
    //         $('aside.lnb').css('left', '0');
    //         // overlay.hide();
    //         $('body').removeClass('modal-open');
    //     };
    // };
    // response();

    // $(window).resize(function() {
    //     response();
    // });

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
    if (winWidth > 1024) {
        /****************************
         * PC 화면 이벤트
         ****************************/
        // $('.gn-menu-main nav').addClass('gn-open-all');

        // var classHas = $('nav.gn-menu-wrapper').hasClass('gn-open-all');
        // if (classHas == true) {
        //     $('#container > .content,footer > .inner-wrap').addClass('gn_open');
        // }

        var flag = false;
        $(window).scroll(function() {
            if ($(window).scrollTop() >= 60 && flag == false) {
                flag = true;
                $('.gn-menu-wrapper').stop().animate({
                    marginTop: '0px'
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
            observeChanges: true,
        }).sticky('refresh');

        /********** knob process **********/
        $(".dial").knob({
            'width': 180,
            'height': 180,
            'readOnly': true
        });

    } else if (winWidth <= 1024) {
        // $('.navList').wrap('<div class="scrollbox_in" style="height:98vh"></div>');

        // $(".scrollbox_in").mCustomScrollbar({
        //     theme: "light-thin",
        //     scrollbarPosition: "inside",
        //     scrollInertia: 100
        // });
        /****************************
         * MOBILE 화면 이벤트
         ****************************/
        // var flag = false;
        // $(window).scroll(function() {
        //     if ($(window).scrollTop() >= 60 && flag == false) {
        //         flag = true;
        //         $('.gn-menu-wrapper').stop().animate({
        //             marginTop: '0px'
        //         }, 100, 'swing');
        //     } else if ($(window).scrollTop() <= 60 && flag == true) {
        //         flag = false;
        //         $('.gn-menu-wrapper').stop().animate({
        //             marginTop: '0'
        //         }, 100, 'swing');
        //     }

        // });

        $('.listTab li, .listTab:before').unbind('click').bind('click', function(e) {
            e.preventDefault();
            $('.listTab li').toggleClass('on');
        });

        /********** knob process **********/
        $(".dial").knob({
            'width': 150,
            'height': 150,
            'readOnly': true
        });


    }

    // if (winWidth <= 480) {
    //     $('.manage_buttons .ui.buttons').addClass('vertical');
    // } else {
    //     $('.manage_buttons .ui.buttons').removeClass('vertical');
    // }

    //message_box 닫기 버튼
    $('.dash_btn_box .btn_close')
        .on('click', function() {
            $(this)
                .closest('.message')
                .transition('fade');
        });

};

$(document).ready(function() {
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
});


/* 공통_임시 작성
function testTemp(tar = null){
	let selectedtwoDepth = tar ;
	return function(e){
		if( !e.target.closest("h3") ) return;
		if( selectedtwoDepth ) selectedtwoDepth.classList.remove("active");
		e.target.closest("h3").classList.add("active");
		selectedtwoDepth = e.target.closest("h3");

	};
}
*/

document.addEventListener("DOMContentLoaded", () => {

	console.log("DOMContentLoaded ");
	/* gnb  */
	if( document.querySelector(".menu-btn") ){
		document.querySelector(".menu-btn").addEventListener("click", () => { 
			document.querySelector('.gnbList').classList.toggle("active") 
		})
	}
		

	$('.gnbList').on('mouseover', function(e) {
										
		$(this).addClass('active');

	});

	$('.gnbList').on('mouseleave', function(e) {
		$(this).removeClass('active');
	});

	$('.gnbList').on('click', function(e) {

		if( e.target.closest("a").nextElementSibling 
			&& e.target.closest("a").nextElementSibling.classList.contains("menu") ){
				e.target.closest("a").classList.toggle("active")
		}
		if( !e.target.closest("h3") ) return;

		document.querySelectorAll(".gnbList h3").forEach(menu => menu.classList.remove("active"))
		e.target.closest("h3").classList.toggle("active")
	});




	//if( document.querySelector(".gnbList") )
		//document.querySelector(".gnbList").addEventListener("click", testTemp("test??"));


	if( document.querySelector(".user") ){
		document.querySelector(".user").addEventListener("click", e => {

			let a = e.target.closest("button") ;
			if( !a ) return;

			if( a.dataset.ui === "close" ) e.target.closest(".util").classList.toggle("on");

			if( !a.nextElementSibling || !a.nextElementSibling.classList.contains("util") ) return;
			a.nextElementSibling.classList.toggle("on");
		});
	}
	if( document.querySelector(".calendar1 .month") ){
		document.querySelector(".calendar1 .month").scrollTo({ 
			left: document.querySelector(".calendar1 .month .active").offsetLeft  - window.innerWidth/2, 
			top: 0, 
			behavior: "smooth" });
	}

});



