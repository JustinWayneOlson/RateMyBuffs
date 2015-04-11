function runjs() {
  chrome.tabs.executeScript({
   
	    var action_url = "http://www.reddit.com/submit?url=" + encodeURIComponent(tab.href) + '&title=' + encodeURIComponent(tab.title);
    chrome.tabs.create({ url: action_url }); 
 
document.getElementById('clickme').addEventListener('click', runjs);
