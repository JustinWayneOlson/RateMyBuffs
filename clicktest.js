function hello() {
  chrome.tabs.executeScript({
    file: 'SearchAndRescue.js'
  }); 
}
 
document.getElementById('clickme').addEventListener('click', hello);
