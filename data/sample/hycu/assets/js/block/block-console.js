;(function(){
  function onDevToolsOpen(){
    console.log('The code for this website has self destructed in your browser for protection from hackers bacause you opened the console. Have a nice day :D');
    console.log('Please close the console, and go back to the previous page.');
    window.open('/404', '_self');
    let html = document.getElementsByTagName('html');
    for(let i = 0; i < html.length; i++){
      html.remove();
    }
  }

  if(window.devtools.isOpen){
    onDevToolsOpen();
  }

  window.addEventListener('devtoolschange', e => {
    if(e.detail.isOpen){
      onDevToolsOpen();
    }
  });
})();
