(function () {
  function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'full-screen-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.6));
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      font-family: 'Arial', sans-serif;
    `;
    
    const spinner = document.createElement('div');
    spinner.id = 'loading-spinner';
    spinner.style.cssText = `
      bottom: 30px;
      width: 120px;
      height: 20px;
      -webkit-mask: linear-gradient(90deg,#244396 70%,#0000 0) left/20% 100%;
      background: linear-gradient(#244396 0 0) left -25% top 0 /20% 100% no-repeat #ddd;
      animation: l7 1s infinite steps(6);
    `;
    
    const loadingText = document.createElement('div');
    loadingText.id = 'loading-text';
    loadingText.textContent = 'Loading...';
    loadingText.style.cssText = `
      color: white;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 2px;
      text-transform: uppercase;
      opacity: 0.8;
      margin-top: 20px !important;
    `;
    
    const spinnerStyle = document.createElement('style');
    spinnerStyle.innerHTML = `
      @keyframes l7 {
        100% {background-position: right -25% top 0}
      }
      #loading-text {
        animation: pulse 1.5s ease-in-out infinite;
      }
    `;
    document.head.appendChild(spinnerStyle);

    overlay.appendChild(spinner);
    overlay.appendChild(loadingText);
    document.body.appendChild(overlay);
  }

  function showOverlay() {
    const overlay = document.getElementById('full-screen-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
      document.body.style.pointerEvents = 'none'; 
    }
  }

  function hideOverlay() {
    const overlay = document.getElementById('full-screen-overlay');
    if (overlay) {
      overlay.style.display = 'none';
      document.body.style.pointerEvents = 'auto'; 
    }
  }

  function isIndicatorVisible() {
    let loadingIndicators = Array.from(document.querySelectorAll('ep-shell-progress-bar > div.ep-loading-progress'));

    Array.from(document.getElementsByTagName('iframe')).forEach(iframe => {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        loadingIndicators = loadingIndicators.concat(Array.from(iframeDocument.querySelectorAll('ep-shell-progress-bar > div.ep-loading-progress')));
      } catch(err) {
        console.log("error => ", err.message)
      }
    });

    return loadingIndicators.some(indicator => !indicator.classList.contains('ep-progress-bar-off'));
  }

  function monitorLoadingIndicator() {
    function checkIndicator() {
      if (isIndicatorVisible()) {
        showOverlay();
      } else {
        hideOverlay();
      }
    }

    const observer = new MutationObserver(() => {
      checkIndicator();
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });

    checkIndicator();
  }

  createOverlay();
  monitorLoadingIndicator();
})();