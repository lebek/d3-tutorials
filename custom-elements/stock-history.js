function formatDate(d) { return d.getUTCFullYear() + "-" + d.getMonth() + "-" + d.getDate(); }
      
function fetchStockHistory(symbol, months, callback) {
  var url = 'http://query.yahooapis.com/v1/public/yql';
  var endDate = new Date();
  var startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);
  var data = encodeURIComponent("select * from yahoo.finance.historicaldata where symbol in ('" 
    + symbol + "')  and startDate = '" + formatDate(startDate) + "' and endDate = '" 
    + formatDate(endDate) + "'");

  request = new XMLHttpRequest();
  request.open('GET', url+"?q="+data+"&format=json&&env=http://datatables.org/alltables.env", true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      data = JSON.parse(request.responseText).query.results.quote;
      callback(data);
    }
  };

  request.send();
}