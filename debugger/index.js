const websocket = require('ws');
const port = 7777;
console.log('hello');


// https://github.com/websockets/ws
const wss = new websocket.Server({ port });
const reader = require('readline').createInterface({
  input:process.stdin,
  output:process.stdout
});


let clients = {};
let clientId = 0;
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message){
    console.log('received: %s', message);
  });
  ws.on('close', function (closingClient) {
    console.log(`closing clientid=${ws.id}`);
    delete clients[ws.id];
    // console.log(clients);
    return;
  });
  // ws.send('connection start');
  ws.id = clientId++;
  clients[ws.id] = ws;
  console.log(`add client(id=${ws.id})`);
});

reader.on('line', function(line){
  const sendMessage = JSON.stringify(makePattern(line));
  console.log(`server > ${sendMessage}`);
  for(let clientid in clients){
    clients[clientid].send(sendMessage);
  } 
});

function makePattern(l){
  console.log(l);
  // switch(l){
  //   case 'a':
  //     return createA();
  //   case 'b':
  //     return createB();
  //   case 'c':
  //     return createC();
  //   default:
  //     return 'default is called'
  // }
  if(template[l])
    return template[l]();
  return null;
}

// status
// 未着席(new), 着席(seated), 配膳済み(served), 
// 離席(left), 完了(done)
let accid = 0;
let template = {
  a: () => {
    return {
      type:'request',
      op:'create',
      acc:{
        id: accid++,
        date: Date.now(),
        persons:3,
        items:{
          coffe:1,
          cake:3,
          tea:1
        },
        total:1000,
        status:'new',//seated,sreved,left,done
        description:'this is test account'
      }
    }
  },
  b: () => {
    return {
      type:'request',
      op:'create',
      acc:{
        id: accid++,
        date: Date.now(),
        persons:15,
        items:{
          coffe:1,
          cake:2,
        },
        total:1000,
        status:'new',//seated,sreved,left,done
        description:'this is test account'
      }
    }
  },
  c:() => {
    return {
      type:'request',
      op:'create',
      acc:{
        id: accid++,
        date: Date.now(),
        persons:15,
        items:{
          icecoffe:1,
          hotcoffe:1,
          cake:2,
        },
        total:1000,
        status:'new',//seated,sreved,left,done
        description:'this is test account'
      }
    }
  },
  d:() => {
    return {
      type:'request',
      op:'create',
      acc:{
        id: accid++,
        date: Date.now(),
        persons:15,
        items:{
          icecoffe:1,
          hotcoffe:1,
          cake:2,
          hottea:1,
          icetea:1,
          other:100
        },
        total:1000,
        status:'new',//seated,sreved,left,done
        description:'this is test account'
      }
    }
  },
  e:() => {
    return {
      type:'request',
      op:'create',
      acc:{
        id: accid++,
        date: Date.now(),
        persons:15,
        items:{
          icecoffe:1,
          hotcoffe:1,
          cake:0,
          hottea:0,
          icetea:0,
          other:10
        },
        total:1000,
        status:'new',//seated,sreved,left,done
        description:'this is test account'
      }
    }
  }  
}


