;(function(){
  function onDevToolsOpen(){
    console.log('The code for this website has self destructed in your browser for protection from hackers bacause you opened the console. Have a nice day :D');
    console.log('Please close the console, and go back to the previous page.');
    let head = document.getElementsByTagName('head');
    for(let i = 0; i < html.length; i++){
      head.remove();
    }
    let body = document.getElementsByTagName('body');
    for(let i = 0; i < html.length; i++){
      body.remove();
    }

    document.getElementsByTagName('html').appendChild(document.createElement('head'));

    let body = document.createElement('body');
    body.innerText = '<h2>Error: Developer Tools Were Opened</h2><br><h3>Please Close Developer Tools And Go Back To The Privious Page</h3>';
    document.getElementsByTagName('html').appendChild(body);
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
