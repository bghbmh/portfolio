let bodyScript = [];
function ttt22(){

	//cccchart();

	if( document.querySelector(".toggle.mode input") ){
		document.querySelector(".toggle.mode input").addEventListener("click", e => {
			document.body.classList.toggle("dark");
		});
	}


	  // 현재 페이지의 URL에서 파라미터를 가져옵니다.
	  const urlParams = new URLSearchParams(window.location.search);

	  // 특정 파라미터 값 읽어오기
	  const userId = urlParams.get('user_id');
	  const searchTerm = urlParams.get('search');
	
	  if (userId) {
		console.log('User ID:', userId);
	  }
	
	  if (searchTerm) {
		console.log('Search Term:', searchTerm);
	  }
	
	  // 모든 파라미터 순회하며 출력
	  console.log('All Parameters:');
	  urlParams.forEach((value, name) => {
		console.log(`${name}: ${value}`);
	  });
	
	  // 파라미터 존재 여부 확인
	  if (urlParams.has('sub')) {
		console.log('Category parameter exists.', urlParams.has('sub'));

		document.querySelectorAll("#gnb a").forEach( (a, idx) => {
			a.classList.remove("active");
			if(  a.attributes.href.textContent.indexOf( urlParams.get('sub') ) > 0 ){
				a.classList.add("active");
				document.querySelector(".page-title").textContent = urlParams.get('sub');
			}
		}  );

	  } else {
		console.log('Category parameter does not exist.');
	  }


	document.querySelectorAll(".ctrl-gnb").forEach( btn => {
		btn.addEventListener("click", () => {
			document.querySelector("header.common").classList.toggle("expanded")
		});
	});

	console.log(" ㅅㅅㅅ --- ")
	cccchart();

}


function includeHTML(cb){
	console.log("render includeHTML")
	var file, xhttp;
	for ( let elem of document.querySelectorAll("[include-html]") ) {

		file = elem.getAttribute("include-html");
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						elem.outerHTML = this.responseText;
						if( file.indexOf("-head9") > -1 ){
							//console.log("script test - ", file )
							let temp = document.createElement("template");
							temp.setAttribute("id", "script");
							temp.innerHTML = this.responseText;
							document.body.appendChild(temp);
						}
					}
					if (this.status == 404) {elem.innerHTML = "Page not found.";}
					elem.removeAttribute("include-html");
					includeHTML(cb);
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}

	if( cb ) cb();
}


includeHTML(ttt);

function ttt(){
	console.log("ttt test - " )
	//scriptCheck();
	if( !document.querySelector("template#script") ) return;

	let cn = document.querySelector("template#script").content.cloneNode(true);

	cn.querySelectorAll("script").forEach( (nn, i) => {
		console.log("template script ",i, nn, );
		let ss = document.createElement("script");
		nn.src ? ss.src= nn.src : ss.innerHTML = nn.innerHTML;
		ss.async = false;

		console.log("sttt - ", nn.src.indexOf('common') > 0)

		if( nn.src.indexOf('common') > 0 ){
			ss.type= "module";
		} else {
			ss.type= "text/javascript";
		}
		
		document.body.appendChild(ss);
	});

	console.log("template cn2 ",bodyScript);

	document.body.innerHTML +=  `<!--//하단의 스크립트들은 목업용임_개발시 무시-->`;
	setTimeout(ttt22, 1000);
}


function scriptCheck(){
	for( let s of document.body.querySelectorAll("script") ){
		if( s.src.indexOf("loadFile") < 0 ) bodyScript.push(s)
	}
}



function cccchart(){
	console.log("chart - html")
	
	// 1. 데이터 준비
	const data = [30, 70, 20, 40, 60];
	const labels = ['데이터 A', '데이터 B', '데이터 C', '데이터 D', '데이터 E'];
	
	// 2. 컨테이너 및 설정
	const chartContainer = document.getElementById('chartContainer');

	if( !chartContainer ) return;
	// CSS에서 설정된 컨테이너 높이를 가져와 최대 막대 높이 계산
	const containerHeight = parseFloat(getComputedStyle(chartContainer).height);
	const maxBarHeight = containerHeight - 10; // 기준선 위로 막대가 올라갈 최대 높이

	console.log("sss - ", maxBarHeight)
	
	// 3. 총합 계산
	const total = data.reduce((sum, value) => sum + value, 0);
	
	// 4. 그래프 요소 설정
	const barWidth = 50;
	const barCornerRadius = 8; // 상단 모서리 둥글기 반지름
	
	// 상단 모서리만 둥근 사각형의 경로 데이터를 생성하는 헬퍼 함수 (위와 동일)
	function getRoundedTopRectPath(width, height, radius) {
		// ... (경로 데이터 생성 로직 동일) ...
		const r = Math.min(radius, width / 2, height / 2);
		const pathData = `M ${r} 0 L ${width - r} 0 A ${r} ${r} 0 0 1 ${width} ${r} L ${width} ${height} L 0 ${height} L 0 ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`;
		return pathData.trim();
	}
	
	// 5. 막대 요소 생성 (애니메이션 대기 상태로)
	// barSvgs 배열은 더 이상 필요 없습니다. 옵저버 콜백에서 직접 요소를 찾습니다.
	
	data.forEach((value, index) => {
		const proportion = value / total;
		const finalBarHeight = proportion * maxBarHeight;
	
		const barWrapper = document.createElement('div');
		barWrapper.classList.add('simple-bar-wrapper');
	
		const valueLabel = document.createElement('div');
		valueLabel.classList.add('simple-value-label');
		// 값 라벨은 항상 최종 값 표시
		valueLabel.textContent = value;
		barWrapper.appendChild(valueLabel);
	
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.classList.add('simple-bar-svg');
		svg.setAttribute("width", barWidth);
		
		svg.setAttribute("height", 0);// 초기 높이 0으로 설정				
		svg.dataset.finalHeight = finalBarHeight;// 최종 높이 값을 data 속성으로 저장				
		svg.setAttribute("viewBox", `0 0 ${barWidth} ${finalBarHeight}`);// viewBox는 최종 크기 한 번만 설정
		svg.setAttribute("preserveAspectRatio", "none"); // 가로세로 비율 유지 안함 
	
		// *** svg 안에 defs와 clipPath 정의 ***
		const svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
		svg.appendChild(svgDefs);
	
		const clipPathId = `clipPath-${index}`; // 각 막대마다 고유 ID
		const clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
		clipPath.setAttribute("id", clipPathId);
		svgDefs.appendChild(clipPath);
	
		// clipPath로 사용할 모양 정의: 상단 모서리만 둥근 사각형 path
		// 이 path의 크기는 viewBox와 동일해야 합니다.
		const clipShapePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
		const clipPathData = getRoundedTopRectPath(barWidth, finalBarHeight, barCornerRadius);
		clipShapePath.setAttribute("d", clipPathData);
		clipPath.appendChild(clipShapePath);
	
		const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rect.classList.add('simple-bar-rect');
		rect.setAttribute("x", 0);
		rect.setAttribute("y", 0);
		rect.setAttribute("width", "100%");
		rect.setAttribute("height", "100%");
		rect.setAttribute("clip-path", `url(#${clipPathId})`); // rect에 clip-path 속성 적용
	
		svg.appendChild(rect);
		barWrapper.appendChild(svg);
	
		const categoryLabel = document.createElement('div');
		categoryLabel.classList.add('simple-bar-label');
		categoryLabel.textContent = labels[index];
		barWrapper.appendChild(categoryLabel);
	
		chartContainer.appendChild(barWrapper);
	});
	
	// 6. 애니메이션 및 리셋 처리 (옵저버 콜백 안에서 직접 처리)
	// animateBars 함수는 더 이상 필요 없습니다.
	
	// 7. IntersectionObserver 설정
	const options = {
		root: null, // 뷰포트를 기준으로 관찰
		rootMargin: '0px', // 기본 마진 없음
		threshold: 0.3 // 타겟 요소의 10%가 보이면 콜백 실행
	};
	
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			// 이 entry의 타겟 요소 (chartContainer) 안에 있는 모든 .bar-svg 요소를 찾습니다.
			const svgsToAnimate = entry.target.querySelectorAll('.simple-bar-svg');
	
			if (entry.isIntersecting) {
				// 타겟 요소가 뷰포트에 진입함
				svgsToAnimate.forEach(svg => {
					const finalHeight = svg.dataset.finalHeight;
					// requestAnimationFrame을 사용하여 높이 변경 예약 (애니메이션 시작)
					requestAnimationFrame(() => {
						svg.setAttribute("height", finalHeight);
					});
				});
				// 관찰 중지 코드를 제거하여 계속 관찰합니다.
			} else {
				// 타겟 요소가 뷰포트에서 벗어남
				svgsToAnimate.forEach(svg => {
					// 높이를 0으로 리셋 (다음 진입 시 애니메이션 준비)
					requestAnimationFrame(() => { // 리셋도 부드럽게 보이도록 rAF 사용
						svg.setAttribute("height", 0);
					});
				});
			}
		});
	}, options);
	
	// 8. chartContainer를 관찰 시작
	observer.observe(chartContainer);
	}
	