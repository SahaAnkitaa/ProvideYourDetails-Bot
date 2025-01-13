var http= require('http')

http.createServer(function (req, res){
  res.write("I am Alive")
  res.end()
}).listen(8080)