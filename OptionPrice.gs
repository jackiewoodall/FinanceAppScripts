function OptionPrice(ticker) {
  if(typeof ticker != "string") {
    throw "ticker must be a string";
  }
  
  // http://finance.yahoo.com/q?s=WFM160115P00035000
  //   <span id="yfs_b00_wfm160115p00035000">3.70</span>
  //   <span id="yfs_a00_wfm160115p00035000">4.10</span>

  var url = 'finance.yahoo.com/q?s='+ ticker;
  
  var html = UrlFetchApp.fetch(url);
  var text = html.getContentText();
  
  var bidIndex = text.indexOf('<span id="yfs_b00');
  var askIndex = text.indexOf('<span id="yfs_a00');
  
  var bidStr = text.substr(bidIndex);
  var askStr = text.substr(askIndex);
  
  var bidStartIndex = bidStr.indexOf('>');
  var bidEndIndex = bidStr.indexOf('</span>');
  var bidStr = bidStr.substr(bidStartIndex+1, bidEndIndex - bidStartIndex - 1);
  
  var askStartIndex = askStr.indexOf('>');
  var askEndIndex = askStr.indexOf('</span>');
  var askStr = askStr.substr(askStartIndex+1, askEndIndex - askStartIndex - 1);
  
  var bid = +bidStr;
  var ask = +askStr;
  var price = (bid + ask) / 2.0;
  
  return price;
}

function test() {
  return OptionPrice("WFM160115P00035000");
}
