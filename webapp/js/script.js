'use strict'
const MENU =      ["hotcoffe",   "icecoffe",    "hottea",    "icetea",     "cake",  "other"];
const DISP_MENU = ["ホットコーヒー", "アイスコーヒー", "ホットティー", "アイスティー", "ケーキ", "その他"];
const MENU_LEN = MENU.length;

let timeLineCount = 0;



function addAccounts(acc){
	timeLineCount++;
	$("#timeline").append(makeAccStr(acc.id, acc.persons, acc.items));
	console.log($(`#${"acc"+timeLineCount}`));
	$(`#${"acc"+timeLineCount} .btn`).on('click', function(e){
		let id = $(this).parents('.acc').attr("id");
		let opType = $(this)[0].className.split(" ")[0];
		handleTimeLineClick(id, opType);
    e.stopPropagation();
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

function setCreateForm(){
  $('#createAccount').append(makeCreateAccStr());
  setCreateButton('#mainOrder');
}

function setCreateButton(id){
	$(`${id} .btn`).on('click', function(e){
    changeItemsCountBy($(this),+1)
    changeDisplayCount($(this));
		e.stopPropagation();
	});

  $(`${id} .wrapb`).on('click', function(e){
    let node = $(this).parents('.counter');
    changeItemsCountBy(node,-1); 
    changeDisplayCount(node);
    e.stopPropagation();
  });

  $(`${id} .order`).on('click', function(e){
    // console.log(e.target.parents('.acc'));
    const accNode = $(e.target).parents('.acc');
    const persons = parseInt(accNode.find('.persons')[0].className.split(" ").getLastVal());
    let items = {};
    for(let i = 0; i < MENU_LEN; i++){
      const itemn = accNode.find(`.items-${MENU[i]}`)[0].className.split(" ").getLastVal();
      if( itemn === '0'){ continue; }
      items[MENU[i]] = parseInt(itemn);
    }
    const status = 'new';   
    const sendData = {
      type:'request',
      op:'create',
      acc:{ date:Date.now(), persons, items},
      status,
      description:'this is test account'
    }
    console.log(sendData);
    sendMessage(sendData);
    e.stopPropagation();
  }); 

  $(`#createAccount .clear`).on('click', function(e){
    
    e.stopPropagation();
  });    
}
 Array.prototype.getLastVal = function (){ return this[this.length -1];}

function changeItemsCountBy(node, diff){
  console.log(`node=${node} diff=${diff}`);
  const n = parseInt(node[0].className.split(" ").getLastVal());
  const nn = n + diff
  if(nn < 0){
    console.log(`(n + diff) < 0 => (${n} + ${diff} < 0)`);
    return;
  }
  node.removeClass(`${n}`).addClass(`${nn}`);
  return;
}

function changeDisplayCount(node){
  let n = node[0].className.split(" ").getLastVal();
  let nnode = node.find('.n');
  let newstr;
  if(nnode.text().trim().split(" ")[1])
    newstr = nnode.text().trim().split(" ")[0] +' '+n;
  else
    newstr = n;
  nnode.text(newstr);
}

window.onload = () => {
  setCreateForm();
}

function makeAccStr(id, persons, items){
  let str = 
  `<div id="${"acc" + timeLineCount }" class="acc">
        <div class="persons">
          <p class="id"> ${id}</p>
          <div class="display"> 
            <div class="n"> ${persons} </div>
            <div class="p"> 名</div>
          </div>
        </div>
        <div class="menu">`
  for(let i in items){
    let disNum = MENU.indexOf(i);
    console.log(`disNum = ${disNum}`);
    if(disNum === -1) {
      console.error(`makeAccStr:make items str Error: item=${i}`);
      continue;
    }
    if(items[i] < 1){
      console.log(`makeAccStr:items(${i} is < 1`);
      continue;
    }
    str += `<div class="item"> 
              <div class="items-${i} name"> ${DISP_MENU[disNum]}</div> 
              <div class="wrapb">
                <div class="down mbtn"> ${items[i]} </div>
              </div>
            </div>`
  }
    str += `
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
        </div>`
  return str;
}

function makeCreateAccStr(){
  let str = `<div class="acc" id="mainOrder">
        <div class="persons counter p btn 0">
          <div class="persons wrapb">
            <div class="down mbtn"> ↓ </div>
          </div>
          <div class="display"> 
            <div class="n"> 0 </div>
            <div class="p"> 名</div>
          </div>
        </div>
        <div class="menu">`
  for(let i = 0; i < MENU.length; i++){
    str += `<div class="items-${MENU[i]} btn item counter 0"> 
              <div class="items-${MENU[i]} name n"> ${DISP_MENU[i]} 0 </div> 
              <div class="items-${MENU[i]} wrapb">
                <div class="down mbtn"> ↓ </div>
              </div>
            </div>`
  }
  str +=
        `</div>
        <div class="operation">
          <div class="clear clearbtn">
            <p class="text"> Clear </p>
          </div>
          <div class="order orderbtn"> 
            <p class="text"> 注文!  </p>
          </div>
        </div>
      </div>`
    return str;
}