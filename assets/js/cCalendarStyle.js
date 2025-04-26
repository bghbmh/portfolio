let cCalendarStyle = {
	default : {
		initialView: 'dayGridMonth',
		contentHeight: "auto",
		titleFormat: arg => {  return arg.date.year +"." + (arg.date.month+1); },
		nowIndicator: true,
		locale: 'ko',
		headerToolbar: { left: 'title', right: 'prev next' },
		dayCellContent: arg => { return { html: arg.dayNumberText.replace("일", "") } },
		
	},
	week : {
		initialView: 'timeGridWeek',
		contentHeight: "600px",
		headerToolbar: { left: '', right: '' },
		nowIndicator: true,
		locale: 'ko',
		allDaySlot : false,
		viewDidMount : function(arg){
			[...arg.el.querySelectorAll(".fc-timegrid-slot-label-cushion")].map( t => t.textContent = t.parentNode.parentNode.dataset.time.slice(0,5) )
		},								
		dayHeaderContent : function(arg){
			let dhc = arg.text.split(' ');
			return {
				html: `<div class="dhc">
							<span class="day">${dhc[2].replace("(", "").replace(")", "")}</span>
							<span class="num">${dhc[1].replace(".", "")}</span>
						</div>`
			};
		}
	}
}

/*

viewDidMount : function(arg){
			let t = arg.el.closest(".default").querySelector(".fc-toolbar-title");
			t.textContent = t.textContent.slice(0, -1);
		},


*/