//----------[app.js 와 다른점]----------
//퍼블 소스 app.js 의 익명함수를 함수로 수정함.

// 콜백 추가
//callBackSaveNewSchedule
//callBackBeforeCreateSchedule
//callBackBeforeUpdateSchedule
//callBackBeforeDeleteSchedule

//setCalendarList() 수정
//beforeCreateSchedule 이벤트 수정 : useCreationPopup=true 인 경우만 작동하게 수정
//-----------------------------------

'use strict';

/* eslint-disable */
/* eslint-env jquery */
/* global moment, tui, chance */
/* global findCalendar, CalendarList, ScheduleList, generateSchedule */

/*var templates = {
	    popupIsAllDay: function() {
	      return 'All Day';
	    },
	    popupStateFree: function() {
	      return 'Free';
	    },
	    popupStateBusy: function() {
	      return 'Busy';
	    },
	    titlePlaceholder: function() {
	      return 'Subject';
	    },
	    locationPlaceholder: function() {
	      return 'Location';
	    },
	    startDatePlaceholder: function() {
	      return 'Start date';
	    },
	    endDatePlaceholder: function() {
	      return 'End date';
	    },
	    popupSave: function() {
	      return 'Save';
	    },
	    popupUpdate: function() {
	      return 'Update';
	    },
	    popupDetailDate: function(isAllDay, start, end) {
	      var isSameDate = moment(start).isSame(end);
	      var endFormat = (isSameDate ? '' : 'YYYY.MM.DD ') + 'hh:mm a';

	      if (isAllDay) {
	        return moment(start).format('YYYY.MM.DD') + (isSameDate ? '' : ' - ' + moment(end).format('YYYY.MM.DD'));
	      }

	      return (moment(start).format('YYYY.MM.DD hh:mm a') + ' - ' + moment(end).format(endFormat));
	    },
	    popupDetailLocation: function(schedule) {
	      return 'Location : ' + schedule.location;
	    },
	    popupDetailUser: function(schedule) {
	      return 'User : ' + (schedule.attendees || []).join(', ');
	    },
	    popupDetailState: function(schedule) {
	      return 'State : ' + schedule.state || 'Busy';
	    },
	    popupDetailRepeat: function(schedule) {
	      return 'Repeat : ' + schedule.recurrenceRule;
	    },
	    popupDetailBody: function(schedule) {
	      return 'Body : ' + schedule.body;
	    },
	    popupEdit: function() {
	      return 'Edit';
	    },
	    popupDelete: function() {
	      return 'Delete';
	    }
	  };*/

//(
function createCalendar (window, Calendar, id, useCreationPopup, theme) {
    var cal, resizeThrottled;
    //var useCreationPopup = true;
    var useDetailPopup = true;
    var datePicker, selectedCalendar;

    //cal = new Calendar('#calendar', {
    if("dark" === theme) {
    	cal = new Calendar('#'+id, {    	
    		defaultView: 'month',
    		useCreationPopup: useCreationPopup,
    		useDetailPopup: useDetailPopup,
    		calendars: CalendarList,
    		//template : templates
    		theme: darkTheme,
    		template: {
    			milestone: function(model) {
    				return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + model.bgColor + '">' + model.title + '</span>';
    			},
    			allday: function(schedule) {
    				return getTimeTemplate(schedule, true);
    			},
    			time: function(schedule) {
    				return getTimeTemplate(schedule, false);
    			}/*,
            popupEdit: function() {
      	      return '수정';
      	    },*/
    		}
    	});
    } else {
    	cal = new Calendar('#'+id, {    	
    		defaultView: 'month',
    		useCreationPopup: useCreationPopup,
    		useDetailPopup: useDetailPopup,
    		calendars: CalendarList,
    		//template : templates
    		template: {
    			milestone: function(model) {
    				return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + model.bgColor + '">' + model.title + '</span>';
    			},
    			allday: function(schedule) {
    				return getTimeTemplate(schedule, true);
    			},
    			time: function(schedule) {
    				return getTimeTemplate(schedule, false);
    			}/*,
            popupEdit: function() {
      	      return '수정';
      	    },*/
    		}
    	});
    }

    // event handlers
    cal.on({
        'clickMore': function(e) {
            console.log('clickMore', e);
        },
        'clickSchedule': function(e) {
            console.log('clickSchedule', e);
        },
        'clickDayname': function(date) {
            console.log('clickDayname', date);
        },
        'beforeCreateSchedule': function(e) {
        	var start = e.start ? new Date(e.start.getTime()) : new Date();
            var end = e.end ? new Date(e.end.getTime()) : moment().add(1, 'hours').toDate();
        	console.log('beforeCreateSchedule', e);
        	if(useCreationPopup){
        		saveNewSchedule(e);
                
                //콜백
                callBackBeforeCreateSchedule(e);
        	}else{
        		writeSchPop({start, end});
        		refreshScheduleVisibility();
        	}
            
        },
        'beforeUpdateSchedule': function(e) {
            var schedule = e.schedule;
            var changes = e.changes;

            console.log('beforeUpdateSchedule', e);

            if (changes && !changes.isAllDay && schedule.category === 'allday') {
                changes.category = 'time';
            }

            cal.updateSchedule(schedule.id, schedule.calendarId, changes);
            refreshScheduleVisibility();
            
            //콜백
            callBackBeforeUpdateSchedule(e);
        },
        'beforeDeleteSchedule': function(e) {
            console.log('beforeDeleteSchedule', e);
            cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
            
            //콜백
            callBackBeforeDeleteSchedule(e);
        },
        'afterRenderSchedule': function(e) {
            var schedule = e.schedule;
            // var element = cal.getElement(schedule.id, schedule.calendarId);
            // console.log('afterRenderSchedule', element);
        },
        'clickTimezonesCollapseBtn': function(timezonesCollapsed) {
            console.log('timezonesCollapsed', timezonesCollapsed);

            if (timezonesCollapsed) {
                cal.setTheme({
                    'week.daygridLeft.width': '77px',
                    'week.timegridLeft.width': '77px'
                });
            } else {
                cal.setTheme({
                    'week.daygridLeft.width': '60px',
                    'week.timegridLeft.width': '60px'
                });
            }

            return true;
        }
    });

    /**
     * Get time template for time and all-day
     * @param {Schedule} schedule - schedule
     * @param {boolean} isAllDay - isAllDay or hasMultiDates
     * @returns {string}
     */
    function getTimeTemplate(schedule, isAllDay) {
        var html = [];
        var start = moment(schedule.start.toUTCString());
        if (!isAllDay) {
            html.push('<strong>' + start.format('HH:mm') + '</strong> ');
        }
        if (schedule.isPrivate) {
            html.push('<span class="calendar-font-icon ic-lock-b"></span>');
            html.push(' Private');
        } else {
            if (schedule.isReadOnly) {
                html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
            } else if (schedule.recurrenceRule) {
                html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
            } else if (schedule.attendees.length) {
                html.push('<span class="calendar-font-icon ic-user-b"></span>');
            } else if (schedule.location) {
                html.push('<span class="calendar-font-icon ic-location-b"></span>');
            }
            html.push(' ' + schedule.title);
        }

        return html.join('');
    }

    /**
     * A listener for click the menu
     * @param {Event} e - click event
     */
    function onClickMenu(e) {
        var target = $(e.target).closest('.item[role="menuitem"]')[0];
        var action = getDataAction(target);
        var options = cal.getOptions();
        var viewName = '';

        $(".item[role='menuitem").addClass("basic");
        $(target).removeClass("basic");
        console.log(target);
        console.log(action);
        switch (action) {
            case 'toggle-daily':
                viewName = 'day';
                break;
            case 'toggle-weekly':
                viewName = 'week';
                break;
            case 'toggle-monthly':
                options.month.visibleWeeksCount = 0;
                viewName = 'month';
                break;
            case 'toggle-weeks2':
                options.month.visibleWeeksCount = 2;
                viewName = 'month';
                break;
            case 'toggle-weeks3':
                options.month.visibleWeeksCount = 3;
                viewName = 'month';
                break;
            case 'toggle-narrow-weekend':
                options.month.narrowWeekend = !options.month.narrowWeekend;
                options.week.narrowWeekend = !options.week.narrowWeekend;
                viewName = cal.getViewName();

                target.querySelector('input').checked = options.month.narrowWeekend;
                break;
            case 'toggle-start-day-1':
                options.month.startDayOfWeek = options.month.startDayOfWeek ? 0 : 1;
                options.week.startDayOfWeek = options.week.startDayOfWeek ? 0 : 1;
                viewName = cal.getViewName();

                target.querySelector('input').checked = options.month.startDayOfWeek;
                break;
            case 'toggle-workweek':
                options.month.workweek = !options.month.workweek;
                options.week.workweek = !options.week.workweek;
                viewName = cal.getViewName();

                target.querySelector('input').checked = !options.month.workweek;
                break;
            default:
                break;
        }

        cal.setOptions(options, true);
        cal.changeView(viewName, true);

        setDropdownCalendarType();
        setRenderRangeText();
        setSchedules();
    }

    function onClickNavi(e) {
        var action = getDataAction(e.target);

        switch (action) {
            case 'move-prev':
                cal.prev();
                break;
            case 'move-next':
                cal.next();
                break;
            case 'move-today':
                cal.today();
                break;
            default:
                return;
        }

        setRenderRangeText();
        setSchedules();
    }

    function onNewSchedule() {
        var title = $('#new-schedule-title').val();
        var location = $('#new-schedule-location').val();
        var isAllDay = document.getElementById('new-schedule-allday').checked;
        var start = datePicker.getStartDate();
        var end = datePicker.getEndDate();
        var calendar = selectedCalendar ? selectedCalendar : CalendarList[0];

        if (!title) {
            return;
        }

        cal.createSchedules([{
            id: String(chance.guid()),
            calendarId: calendar.id,
            title: title,
            content: "test2",
            isAllDay: isAllDay,
            start: start,
            end: end,
            category: isAllDay ? 'allday' : 'time',
            dueDateClass: '',
            color: calendar.color,
            bgColor: calendar.bgColor,
            dragBgColor: calendar.bgColor,
            borderColor: calendar.borderColor,
            raw: {
                location: location
            },
            state: 'Busy'
        }]);

        $('#modal-new-schedule').modal('hide');
    }

    function onChangeNewScheduleCalendar(e) {
        var target = $(e.target).closest('.item[role="menuitem"]')[0];
        var calendarId = getDataAction(target);
        changeNewScheduleCalendar(calendarId);
    }

    function changeNewScheduleCalendar(calendarId) {
        var calendarNameElement = document.getElementById('calendarName');
        var calendar = findCalendar(calendarId);
        var html = [];

        html.push('<span class="calendar-bar" style="background-color: ' + calendar.bgColor + '; border-color:' + calendar.borderColor + ';"></span>');
        html.push('<span class="calendar-name">' + calendar.name + '</span>');

        calendarNameElement.innerHTML = html.join('');

        selectedCalendar = calendar;
    }

    function createNewSchedule(event) {
        var start = event.start ? new Date(event.start.getTime()) : new Date();
        var end = event.end ? new Date(event.end.getTime()) : moment().add(1, 'hours').toDate();

        if (useCreationPopup) {
        	writeSchPop({
                start: start,
                end: end
            });
        }
    }
    function saveNewSchedule(scheduleData) {
        var calendar = scheduleData.calendar || findCalendar(scheduleData.calendarId);
        var schedule = {
            id: String(chance.guid()),
            title: scheduleData.title,
            isAllDay: scheduleData.isAllDay,
            start: scheduleData.start,
            end: scheduleData.end,
            category: scheduleData.isAllDay ? 'allday' : 'time',
            dueDateClass: '',
            color: calendar.color,
            bgColor: calendar.bgColor,
            dragBgColor: calendar.bgColor,
            borderColor: calendar.borderColor,
            location: scheduleData.location,
            raw: {
                class: scheduleData.raw['class']
            },
            state: scheduleData.state
        };
        if (calendar) {
            schedule.calendarId = calendar.id;
            schedule.color = calendar.color;
            schedule.bgColor = calendar.bgColor;
            schedule.borderColor = calendar.borderColor;
        }

        cal.createSchedules([schedule]);

        refreshScheduleVisibility();
       
        //콜백
        callBackSaveNewSchedule(schedule);
    }

    /* //기존 함수
    function onChangeCalendars(e) {
        var calendarId = e.target.value;
        var checked = e.target.checked;
        var viewAll = document.querySelector('.lnb-calendars-item input');
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));
        var allCheckedCalendars = true;

        if (calendarId === 'all') {
            allCheckedCalendars = checked;

            calendarElements.forEach(function(input) {
                var span = input.parentNode;
                input.checked = checked;
                span.style.backgroundColor = checked ? span.style.borderColor : 'transparent';
            });

            CalendarList.forEach(function(calendar) {
                calendar.checked = checked;
            });
        } else {
            findCalendar(calendarId).checked = checked;

            allCheckedCalendars = calendarElements.every(function(input) {
                return input.checked;
            });

            if (allCheckedCalendars) {
                viewAll.checked = true;
            } else {
                viewAll.checked = false;
            }
        }

        refreshScheduleVisibility();
    }*/
    
    // 수정본
    function onChangeCalendars(e) {
    	var calendarId = e.target.value;
    	var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));
    	var allCheckedCalendars = true;
    	
    	if (calendarId === 'all' || calendarId === 'course') {
    		allCheckedCalendars = true;
    		
    		calendarElements.forEach(function(input) {
    			var span = input.parentNode;
    			input.checked = true;
    			span.style.backgroundColor = span.style.borderColor;
    		});
    		
    		CalendarList.forEach(function(calendar) {
    			if(calendarId === 'course' && calendar.id === 'personal') {
    				calendar.checked = false;
    			} else {
    				calendar.checked = true;
    			}
    		});
    	} else {
    		CalendarList.forEach(function(calendar) {
    			if(calendar.id === 'personal') {
    				calendar.checked = true;
    			} else {
    				calendar.checked = false;
    			}
    		});
    	}
    	
    	refreshScheduleVisibility();
    }

    function refreshScheduleVisibility() {
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));

        CalendarList.forEach(function(calendar) {
            cal.toggleSchedules(calendar.id, !calendar.checked, false);
        });

        cal.render(true);

        calendarElements.forEach(function(input) {
            var span = input.nextElementSibling;
            span.style.backgroundColor = input.checked ? span.style.borderColor : 'transparent';
        });
    }

    function setDropdownCalendarType() {
        var calendarTypeName = document.getElementById('calendarTypeName');
        var calendarTypeIcon = document.getElementById('calendarTypeIcon');
        var options = cal.getOptions();
        var type = cal.getViewName();
        var iconClassName;

        if (type === 'day') {
            type = '일';
            iconClassName = 'calendar-icon ic_view_day';
        } else if (type === 'week') {
            type = '주';
            iconClassName = 'calendar-icon ic_view_week';
        } else if (options.month.visibleWeeksCount === 2) {
            type = '2주';
            iconClassName = 'calendar-icon ic_view_week';
        } else if (options.month.visibleWeeksCount === 3) {
            type = '3주';
            iconClassName = 'calendar-icon ic_view_week';
        } else {
            type = '월';
            iconClassName = 'calendar-icon ic_view_month';
        }

//        calendarTypeName.innerHTML = type;
//        calendarTypeIcon.className = iconClassName;
    }

    function currentCalendarDate(format) {
      var currentDate = moment([cal.getDate().getFullYear(), cal.getDate().getMonth(), cal.getDate().getDate()]);

      return currentDate.format(format);
    }

    function setRenderRangeText() {
        var renderRange = document.getElementById('renderRange');
        var options = cal.getOptions();
        var viewName = cal.getViewName();

        var html = [];
        if (viewName === 'day') {
            html.push(currentCalendarDate('YYYY.MM.DD'));
        } else if (viewName === 'month' &&
            (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
            html.push(currentCalendarDate('YYYY.MM'));
        } else {
            html.push(moment(cal.getDateRangeStart().getTime()).format('YYYY.MM.DD'));
            html.push(' ~ ');
            html.push(moment(cal.getDateRangeEnd().getTime()).format(' MM.DD'));
        }
        renderRange.innerHTML = html.join('');
    }

    function setSchedules() {
        cal.clear();
        generateSchedule(cal.getViewName(), cal.getDateRangeStart(), cal.getDateRangeEnd());
        cal.createSchedules(ScheduleList);

        refreshScheduleVisibility();
    }

    function setEventListener() {
        $('#menu-navi').on('click', onClickNavi);
        /*$('.menu .item[role="menuitem"]').on('click', onClickMenu);*/
        /*$('#lnb-calendars').on('change', onChangeCalendars);*/
        $('.calendarDiv .item[role="menuitem"]').on('click', onClickMenu);
        $('#lnb-calendars').on('click', onChangeCalendars);

        $('#btn-save-schedule').on('click', onNewSchedule);
        $('#btn-new-schedule').on('click', createNewSchedule);

        $('#dropdownMenu-calendars-list').on('click', onChangeNewScheduleCalendar);

        window.addEventListener('resize', resizeThrottled);
    }

    function getDataAction(target) {
        return target.dataset ? target.dataset.action : target.getAttribute('data-action');
    }

    resizeThrottled = tui.util.throttle(function() {
        cal.render();
    }, 50);

    window.cal = cal;
    setDropdownCalendarType();
    setRenderRangeText();
    setSchedules();
    setEventListener();
    
	/*function test1(){
		return "test1 입니다.";
	}
    
    // 외부에서 사용할 함수 리턴
    return {
    	refreshScheduleVisibility : refreshScheduleVisibility
		//,test1 : test1
	};*/
	
}
//)(window, tui.Calendar);

// set calendars
//(
/*function setCalendarList() {

    var calendarList = document.getElementById('calendarList');
    var html = [];
    CalendarList.forEach(function(calendar) {
        html.push('<div class="lnb-calendars-item"><label>' +
            '<input type="checkbox" class="tui-full-calendar-checkbox-round" value="' + calendar.id + '" checked>' +
            '<span style="border-color: ' + calendar.borderColor + '; background-color: ' + calendar.borderColor + ';"></span>' +
            '<span>' + calendar.name + '</span>' +
            '</label></div>'
        );
    });
    calendarList.innerHTML = html.join('\n');
}*/
function setCalendarList() {

	var allCheckedCalendars = true;
	
    var calendarList = document.getElementById('calendarList');
    var html = [];
    CalendarList.forEach(function(calendar) {
        html.push('<div class="lnb-calendars-item"><label>' +
            '<input type="checkbox" class="tui-full-calendar-checkbox-round" value="' + calendar.id + '" ' + (calendar.checked ? 'checked' : '') + '>' +
            '<span style="border-color: ' + calendar.borderColor + '; background-color: ' + (calendar.checked ? calendar.borderColor : 'transparent')  + ';"></span>' +
            '<span>' + calendar.name + '</span>' +
            '</label></div>'
        );
    });
    calendarList.innerHTML = html.join('\n');
}
//)();


//---[ callBack function : 재정의 해서 사용할 것 ]---
//입력
function callBackBeforeCreateSchedule(e){};
function callBackSaveNewSchedule(schedule){}

//수정
function callBackBeforeUpdateSchedule(e){
	
	var schedule = e.schedule;
    var changes = e.changes;
    
	callBackUpdateSchedule(schedule.id, schedule.calendarId, changes);
};
function callBackUpdateSchedule(id, calendarId, changes ){}

//삭제
function callBackBeforeDeleteSchedule(e){
	callBackDeleteSchedule(e.schedule.id, e.schedule.calendarId);
};
function callBackDeleteSchedule(id, calendarId){}
//--------------------------------------------

// 다크모드 테마
var darkTheme = {
		'common.border': '1px solid #e5e5e5',
	    'common.backgroundColor': 'dark',
	    'common.holiday.color': '#ff4040',
	    'common.saturday.color': '#ddd',
	    'common.dayname.color': '#ddd',
	    'common.today.color': '#ddd',

	    // creation guide style
	    'common.creationGuide.backgroundColor': 'rgba(81, 92, 230, 0.05)',
	    'common.creationGuide.border': '1px solid #515ce6',
	    
	    // month header 'dayname'
	    'month.dayname.height': '31px',
	    'month.dayname.borderLeft': 'none',
	    'month.dayname.paddingLeft': '10px',
	    'month.dayname.paddingRight': '0',
	    'month.dayname.backgroundColor': 'inherit',
	    'month.dayname.fontSize': '12px',
	    'month.dayname.fontWeight': 'normal',
	    'month.dayname.textAlign': 'left',

	    // month day grid cell 'day'
	    'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
	    'month.dayExceptThisMonth.color': 'rgba(221, 221, 221, 0.4)',
	    'month.weekend.backgroundColor': 'inherit',
	    'month.day.fontSize': '14px',

	    // month schedule style
	    'month.schedule.borderRadius': '2px',
	    'month.schedule.height': '24px',
	    'month.schedule.marginTop': '2px',
	    'month.schedule.marginLeft': '8px',
	    'month.schedule.marginRight': '8px',

	    // month more view
	    'month.moreView.border': '1px solid #d5d5d5',
	    'month.moreView.boxShadow': '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
	    'month.moreView.backgroundColor': 'hsla(0, 0%, 20%, 1)',
	    'month.moreView.paddingBottom': '17px',
	    'month.moreViewTitle.height': '44px',
	    'month.moreViewTitle.marginBottom': '12px',
	    'month.moreViewTitle.borderBottom': 'none',
	    'month.moreViewTitle.padding': '12px 17px 0 17px',
	    'month.moreViewList.padding': '0 17px',

	    // week header 'dayname'
	    'week.dayname.height': '42px',
	    'week.dayname.borderTop': '1px solid #e5e5e5',
	    'week.dayname.borderBottom': '1px solid #e5e5e5',
	    'week.dayname.borderLeft': 'none',
	    'week.dayname.paddingLeft': '0',
	    'week.dayname.backgroundColor': 'inherit',
	    'week.dayname.textAlign': 'left',
	    'week.today.color': 'inherit',
	    'week.pastDay.color': '#bbb',

	    // week vertical panel 'vpanel'
	    'week.vpanelSplitter.border': '1px solid #e5e5e5',
	    'week.vpanelSplitter.height': '3px',

	    // week daygrid 'daygrid'
	    'week.daygrid.borderRight': '1px solid #e5e5e5',
	    'week.daygrid.backgroundColor': 'inherit',

	    'week.daygridLeft.width': '72px',
	    'week.daygridLeft.backgroundColor': 'inherit',
	    'week.daygridLeft.paddingRight': '8px',
	    'week.daygridLeft.borderRight': '1px solid #e5e5e5',

	    'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
	    'week.weekend.backgroundColor': 'inherit',

	    // week timegrid 'timegrid'
	    'week.timegridLeft.width': '72px',
	    'week.timegridLeft.backgroundColor': 'inherit',
	    'week.timegridLeft.borderRight': '1px solid #e5e5e5',
	    'week.timegridLeft.fontSize': '11px',

	    'week.timegridOneHour.height': '52px',
	    'week.timegridHalfHour.height': '26px',
	    'week.timegridHalfHour.borderBottom': 'none',
	    'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

	    'week.timegrid.paddingRight': '8px',
	    'week.timegrid.borderRight': '1px solid #e5e5e5',
	    'week.timegridSchedule.borderRadius': '2px',
	    'week.timegridSchedule.paddingLeft': '2px',

	    'week.currentTime.color': '#515ce6',
	    'week.currentTime.fontSize': '11px',
	    'week.currentTime.fontWeight': 'normal',

	    'week.currentTimeLinePast.border': '1px dashed #515ce6',
	    'week.currentTimeLineBullet.backgroundColor': '#515ce6',
	    'week.currentTimeLineToday.border': '1px solid #515ce6',
	    'week.currentTimeLineFuture.border': 'none',

	    // week creation guide style
	    'week.creationGuide.color': '#515ce6',
	    'week.creationGuide.fontSize': '11px',
	    'week.creationGuide.fontWeight': 'bold',

	    // week daygrid schedule style
	    'week.dayGridSchedule.borderRadius': '2px',
	    'week.dayGridSchedule.height': '24px',
	    'week.dayGridSchedule.marginTop': '2px',
	    'week.dayGridSchedule.marginLeft': '8px',
	    'week.dayGridSchedule.marginRight': '8px'
}