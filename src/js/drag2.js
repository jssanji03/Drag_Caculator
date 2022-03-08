
const dragTest = () => {
     let pendingVal;
    let displayVal = '0';
    let evalStrAry = [];
    let evalStrAry_math = [];
    const item = [
        {
            id: "add",
            title: '+',
            math: '+',
            price: '+',
            color: 'operator'
        },
        {
            id: "minus",
            title: '-',
            math: '-',
            price: '-',
            color: 'operator'
        },
        {
            id: "multiply",
            title: 'x',
            math: '*',
            price: 'x',
            color: 'operator'
        },
        {
            id: "divided",
            title: '÷',
            math: '/',
            price: '÷',
            color: 'operator'
        },
        {
            id: "left",
            title: '(',
            math: '(',
            price: '(',
            color: 'operator'
        },
        {
            id: "right",
            title: ')',
            math: ')',
            price: ')',
            color: 'operator'
        },
        {
            id: "drag1",
            title: 'blue',
            price: '100',
            color: 'blue'
        },
        {
            id: "drag2",
            title: 'red',
            price: '80',
            color: 'red'
        },
        {
            id: "drag3",
            title: 'yellow',
            price: '70',
            color: 'yellow'
        },
        {
            id: "drag4",
            title: 'gray',
            price: '60',
            color: 'green'
        },
        {
            id: "drag5",
            title: 'dark',
            price: '50',
            color: 'dark'
        }
    ]
    function init() {
        item.forEach(function (obj, key) {
            if (obj.math) {
                let htmlTemplate = ''
                htmlTemplate = htmlTemplate + `<span draggable="true" class="m-1 badge calBtn-${obj.color} numItems" id="${obj.id}" data-math="${obj.math}" data-value="${obj.math}">  
              ${obj.title}
            </span>`;
                const menu = document.querySelector('#menu');
                menu.innerHTML += htmlTemplate
            } else {
                let htmlTemplate = ''
                htmlTemplate = htmlTemplate + `<span draggable="true" class="m-1 badge calBtn-${obj.color} numItems"id="${obj.id}" data-value="${obj.price}">  
              ${obj.title}${obj.price}
            </span>`;
                const menu = document.querySelector('#menu');
                menu.innerHTML += htmlTemplate
            }
        })
    }
    init()
$(".numItems").on({
  "dragstart": function(event){
    event.originalEvent.dataTransfer.setData("application/json", event.target.dataset.value);
    event.originalEvent.dataTransfer.setData("text/plain", event.target.id);
  },
  "dragend": function(){
    $(".target").removeClass("over")
    console.log("numItems dragend");
  }
})

$(".operation_box").on({
  "dragenter": function(event){
    event.preventDefault();
    console.log("dragenter");
  },
  "dragover": function(event){
    event.preventDefault();
    $(this).addClass("over")
    console.log("dragover");
  },
  "dragleave": function(){
    console.log("dragleave");
    $(".target").removeClass("over")
  },
  "dragend": function (event) {
    event.target.remove()
    evalStrAry = evalStrAry.filter(function(item) {
        return item != event.target.dataset.value
    });
      evalStrAry_math = evalStrAry_math.filter(function (item) {
        return item != event.target.dataset.value
    });
    // 計算總數
    let evaluation_math = eval(evalStrAry_math.join(''));
    // 運算過程
    let evaluation_list = evalStrAry.join('');
    $("#numTotal").val(evaluation_math)
    $("#detail").text(evaluation_list)
    console.log("evalStrAry",evalStrAry);
    console.log("evalStrAry_math",evalStrAry_math);
  },
  "drop": function(event){
    event.preventDefault();
    // event.stopPropagation(); //停止事件氣泡現象
    let id = event.originalEvent.dataTransfer.getData('text/plain');
      $("#" + id).clone().appendTo(event.target);
  }
})
    
$(".item_box").on({
    "dragend": function (event) { 
        const btnText = event.target.dataset.value;
        if(displayVal === '0') {
            displayVal = '';
            displayVal += btnText;
        } else {
            displayVal += btnText;
        }
        performOperation(btnText)
    }
})
$(".js-clear").on('click', () => {
    displayVal = '0';
    pendingVal = undefined;
    evalStrAry = [];
    evalStrAry_math = [];
    let html;
    $("#numTotal").val(displayVal)
    $("#detail").text(displayVal)
    html = $(".js-collection").html();
    html = window.location.reload();
});
$(".js-Decimal").on("click",TwoDecimal)
function TwoDecimal() {
    const Num = $("#numTotal").val()
    const TwoDecimal = Math.round(Num * 100) / 100;
    $("#numTotal").val(TwoDecimal)
}
function performOperation(event) {
    console.log(event);
    if ($(".item_box")) {
        pendingVal = event;
        displayVal = '0';
        $("#numTotal").val(pendingVal)
        evalStrAry.push(pendingVal);
        evalStrAry_math.push(pendingVal);
        // 計算總數
        let evaluation_math = eval(evalStrAry_math.join(''));
        // 運算過程
        let evaluation_list = evalStrAry.join('');
        $("#numTotal").val(evaluation_math)
        $("#detail").text(evaluation_list)
    } 
}
}
export { dragTest };