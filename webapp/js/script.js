'use strict'

let timeLineCount = 0;
function addAccounts(acc){
	// acc = {
	// 	id:"003",
	// 	persons:3,
	// 	items : {
	// 		coffe:3,
	// 		cake:2
	// 	}
	// }
	timeLineCount++;
	$("#timeline").append(`
		<div id="${"acc" + timeLineCount }" class="acc">
        <div class="persons">
          <p class="id"> ${acc.id}</p>
          <div class="display"> 
            <div class="n"> ${acc.persons} </div>
            <div class="p"> 名</div>
          </div>
        </div>
        <div class="menu">
          <div class="item">
            <div class="name"> Coffe </div> 
            <div class="wrapb">
              <div class="down mbtn"> ${acc.items["coffe"] ? acc.items["coffe"] : 0} </div>
            </div>
          </div>
          <div class="item">
            <div class="name">  Cake  </div> 
            <div class="wrapb">
              <div class="down mbtn"> ${acc.items["cake"] ? acc.items["cake"] : 0} </div>
            </div>
          </div>
          <div class="item">
            <div class="name">  Tea   </div> 
            <div class="wrapb">
              <div class="down mbtn"> ${acc.items["tea"] ? acc.items["tea"] : 0} </div>
            </div>
          </div>
          <div class="item">
            <div class="name">  Tea   </div> 
            <div class="wrapb">
              <div class="down mbtn"> ${acc.items["tea"] ? acc.items["tea"] : 0} </div>
            </div>
          </div>
        </div>
        <div class="state">
          <div class="pre btn">
            <p class="text">あ</p>
          </div>
          <div class="now">
            <p class="text">あ</p>
          </div>
          <div class="next btn">
            <p class="text">あ</p>
          </div>
        </div>
        <div class="operation">
          <div class="fix btn">
            <p class="text"> Fix </p>
          </div>
          <div class="del btn"> 
            <p class="text"> Delte  </p>
          </div>
        </div>`);
	console.log($(`#${"acc"+timeLineCount}`));
	$(`#${"acc"+timeLineCount} .btn`).on('click', function(){
		let id = $(this).parents('.acc').attr("id");
		let opType = $(this)[0].className.split(" ")[0];
		handleTimeLineClick(id, opType);
	});
	setStatus(`${"acc"+timeLineCount}`,"new");
}

// change status
// 未着席(new), 着席(seated), 配膳済み(served), 
// 離席(left), 完了(done)
const STATUS = ["new", "seated", "served", "left", "done"];
const STATUS_DISPLAY = ["未着", "着席済", "配膳済", "離席済", "完了"];


function setStatus(id, nowstatus){
	console.log(`setStatus:nowstatus:${nowstatus}`);
	let snum = STATUS.indexOf(nowstatus);
	if(snum < 0){
		console.error(`status not found:${nowstatus}`);
		return;
	}
	// console.log(snum);
	let preStatus = $(`#${id} .now`)[0].className.split(" ")[1];
	console.log(`setStatus:prestatus:${preStatus}`);
	$(`#${id} .now`).removeClass(preStatus);
	$(`#${id} .now`).addClass(nowstatus);
	if(STATUS[snum]){
		$(`#${id} .now > .text`).text(STATUS_DISPLAY[snum]);
	}
	if(snum-1 >= 0){
		$(`#${id} .pre > .text`).text(STATUS_DISPLAY[snum-1]);
		$(`#${id} .pre > .text`).css('visibility','visible');
	} else {
		$(`#${id} .pre > .text`).css('visibility','hidden');
	}
	if(snum+1 < STATUS.length){
		$(`#${id} .next > .text`).text(STATUS_DISPLAY[snum+1]);
		$(`#${id} .next > .text`).css('visibility','visible');
	} else {
		$(`#${id} .next > .text`).css('visibility','hidden');
	}
}


function handleTimeLineClick(id, op){
	console.log(`${id}:${op}`);
	let s;
	switch(op){
		// case "delete":
		// 	requestDelete(id);
		// 	break;
		// case "fix":
		// 	changeForm(id);
		// 	break;
		case "pre":
			s = $(`#${id} .now`)[0].className.split(" ")[1];
			if( STATUS.indexOf(s) >= 0 && STATUS.indexOf(s) > 0)
				setStatus(id,STATUS[STATUS.indexOf(s)-1]);
			break;
		case "next":
			s = $(`#${id} .now`)[0].className.split(" ")[1];
			if( STATUS.indexOf(s) >= 0 && STATUS.indexOf(s) +1 < STATUS.length)
				setStatus(id,STATUS[STATUS.indexOf(s)+1]);
			break;
	}
}
window.onload = () => {
	console.log("hello");
	createSetButton();
}

function createSetButton(){
	$(`#createAccount .btn, .wrapb`).on('click', function(e){
		let opType = $(this)[0].className.split(" ")[0];
		// let id = $(this).parents('.acc').attr("id");
		handleCreate(opType);
		e.stopPropagation();
	});
}

function handleCreate(op){
	switch(op){
		case "order":
			sendMessage(createA());
			break;
		default:
			console.log(`defualt:opType=${op}`);
	}
}

// テンプレートを送信する。
let accid = 0;
let createA = () => {
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
}

let createB = () => {
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
}