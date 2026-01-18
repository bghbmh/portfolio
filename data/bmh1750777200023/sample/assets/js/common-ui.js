

document.addEventListener("DOMContentLoaded", () => {    
    setCommonNav(".ctrl-nav", "expanded", 1280); // 1280px

});

function setCommonNav(toggleBtn, className, breakpoint) {
    const toggleBtns = document.querySelectorAll( toggleBtn);

    toggleBtns?.forEach(btn => {
		let tar = btn;
		if( btn.dataset.hrdTarget ) tar = document.querySelector( btn.dataset.hrdTarget );
        btn.addEventListener("click", () => tar.classList.toggle(className) );

		const resizeHandler = responsiveClassToggle(tar, className, breakpoint);    
    resizeHandler({ type: 'initial' });
    window.addEventListener('resize', resizeHandler);
	});  
}

function responsiveClassToggle(tar, className, breakpoint) {
    let timer;
    return function(e) { 
        clearTimeout(timer);
        timer = setTimeout(() => { 
            if (window.innerWidth >= breakpoint) tar.classList.add(className);
            else tar.classList.remove(className);
        }, 200);
    }
}