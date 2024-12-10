(function () {
  const options = {
    loadingIndicator: {
      script: ['loading.js'],
      status: false
    }
  };

  function enableOptions() {
    for (const key in options) {
      options[key].status = true;
    }
  }

  function injectScripts() {
    for (const key in options) {
      const option = options[key];
      if (option.status && option.script) {
        option.script.forEach(fileName => {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = chrome.runtime.getURL(fileName);
          document.head.appendChild(script);
        });
      }
    }
  }

  enableOptions();
  injectScripts();
})();
