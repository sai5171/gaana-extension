chrome.runtime.onMessage.addListener(function(obj, sender, sendResponse) {
  if (obj.hasOwnProperty('createGannaTab') && obj.createGannaTab) {
    chrome.tabs.create({
      url: 'https://gaana.com/',
      index: 0,
      active: true
    });
  }
  sendResponse();
})
