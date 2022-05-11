const express=require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);
io.on('connection',function(socket){
    console.log('new connection');
    socket.on('message',function(dat){
        console.log(dat.person);
        socket.emit('nmss',{val:dat.data,class:'class="qw mr-2 p-3 right"',q:0});
        socket.broadcast.emit('nmss',{val:dat.data,class:'class="chat ml-2 p-3 left"',q:1,person:dat.person});
    });
});
app.use(express.static('public'));
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});
http.listen('3000',function(){
    console.log('server is listening at port 3000');
});