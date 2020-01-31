var inputdata = document.querySelector('input');
var ul = document.querySelector('ul');
var state = JSON.parse(localStorage.getItem('localStoragestate')) || [];
// var state = [];
var itemleft = document.querySelector('.itemleft');
var all = document.querySelector('.all');
var active = document.querySelector('.active');
var complete = document.querySelector('.complete');
var display = document.querySelector('.display');
var clearall = document.querySelector('.clearall');
var allli = ul.childNodes;
var downArrow = document.querySelector('.img_responsive');

all.parentElement.firstElementChild.classList.add('focusBorder');
var p1 = Date.now();
// console.log(p);

view(state);
addLineState(state);
// document.addEventListener('click',linethroughrefresh);
// function linethroughrefresh () {
//     addLineState(state);
//     all.classList.remove('focusBorder');
//     active.classList.remove('focusBorder');
//     complete.classList.remove('focusBorder');
// }
// console.log(all.parentElement);


// var liid = -1;
// console.dir(inputdata);


// all function calll 
inputdata.addEventListener('keyup', addInputData);




// save list data to state
function addInputData (event) {
    // console.log(inputdata);
    if (event.keyCode == 13 && event.target.value != ''){
        var obj = {};
        obj.name = event.target.value;
        obj.finished = false;
        obj.liid = Date.now();
        state.push(obj);
        // console.log(state);
        event.target.value = '';
        localStorage.setItem('localStoragestate', JSON.stringify(state));
        view(state);
    }
}

// display list on screen
function view(state) {
    ul.innerHTML = '';
    state.map((value) => {
        // console.log(value);
    var li = document.createElement('li');
    li.className='flex';
    li.setAttribute('data-id',value.liid);
    // console.log(li);

    // checkbox
    var checkBox = document.createElement('input');
    checkBox.classList.add('checkbox');
    checkBox.type = 'checkbox';

    // para
    var p = document.createElement('p');
    p.classList.add('para');
    p.textContent = value.name;

    // cross
    var cross = document.createElement('span');
    cross.textContent = 'x';
    cross.classList.add("cross");


    ul.appendChild(li);
    li.append(checkBox, p, cross);
    itemleft.innerHTML = `${(state.filter(v => v.finished != true)).length} item left`;
    display.style.display = "block";
    downArrow.style.display = 'block';
    clearall.style.display = "none";

    }
    )
}

// all the event listner on ul
ul.addEventListener('click',allEventOnUl);
ul.addEventListener('dblclick', editPara);

function allEventOnUl (event) {
    // console.dir(event.target);
    // cross on click event
    if(event.target.tagName == 'SPAN') {
        var removeid = event.target.parentElement.dataset.id;
        state = state.filter(value => value.liid != removeid);
        localStorage.clear();
        localStorage.setItem('localStoragestate', JSON.stringify(state));

        view(state);
        itemleft.innerHTML = `${(state.filter(v => v.finished != true)).length} item left`;
        if (state.length < 1){
            display.style.display = "none";
            downArrow.style.display = 'none';
        }
    }


    // checkbox  on click event
    else if (event.target.tagName == 'INPUT') {
        if(event.target.checked === false){

            event.target.nextElementSibling.classList.remove('lineThrough');
            var finishedTask = event.target.parentElement.dataset.id;
            state = state.filter(v1 => {
                // console.log(v1);
                if (v1.liid == finishedTask ){
                    // console.log(v.finished)
                    v1.finished = false;
                    // console.log(state);
                }
                return state;
            }); 
            itemleft.innerHTML = `${(state.filter(v => v.finished != true)).length} item left`;
            localStorage.clear();
            localStorage.setItem('localStoragestate', JSON.stringify(state));
            clearall.style.display = "none";

        } else {
            event.target.nextElementSibling.classList.add('lineThrough');
            var finishedTask = event.target.parentElement.dataset.id;
            // console.log(finishedTask);
         state = state.filter(v => {
            if (v.liid == finishedTask) {
                // console.log(v);
                v.finished = true;
                // console.log(state);
            }
            return state;
            });
            itemleft.innerHTML = `${(state.filter(v => v.finished != true)).length} item left`;
            localStorage.clear();
            localStorage.setItem('localStoragestate', JSON.stringify(state));
            if ((state.filter(v=> v.finished !=true).length == 0)) {
                clearall.style.display = "block";
            }

            // if (ul.childElementCount === document.querySelectorAll('.completedtask').length) {
            //     clearall.style.display = 'inline-block';
            // }
        }
        // console.log(state1);

    }

   
}
// edit para 
function editPara (eventp) {
    //  eventp.target.parentElement.style.border = "none";
    //  eventp.target.parentElement.classList.remove('add_border_to_li');

     if ( eventp.target.tagName = 'p'){
        // cross.style.display = 'none';
        var currentPvalue = eventp.target;
        eventp.target.nextElementSibling.classList.add('hideOnDblClick');
        // eventp.target.nextElementSibling.style.display = 'none'
        var inputP = document.createElement('input');
        inputP.classList.add('editinputP');
        inputP.value = currentPvalue.textContent;
        console.log(inputP.value);
        currentPvalue.parentElement.replaceChild(inputP, currentPvalue);
        inputP.addEventListener ('keyup', backToPara);
        function backToPara(e) {
            // console.lo
            if(e.keyCode === 13 && e.target.value != ''){
                currentPvalue.textContent = e.target.value;
                e.target.parentElement.replaceChild(currentPvalue, inputP);
                console.dir(eventp.target.parentElement.dataset.id);
                state.forEach(v =>{
                    if(v.liid == eventp.target.parentElement.dataset.id) {
                        v.name = currentPvalue.textContent;
                    }
                })
                // console.log(e.target.nextElementSibling);
            }
            // console.log(state);
            localStorage.clear();
            localStorage.setItem('localStoragestate', JSON.stringify(state));
        }
       
        // cross.style.display = 'inline-block';
        // eventp.target.nextElementSibling.classList.remove('hideOnDblClick');
        // console.dir(currentPvalue);

    }
    console.dir(eventp.target);
}



// footer function

itemleft.innerHTML = `${(state.filter(v => v.finished != true)).length} item left`;


all.addEventListener('click', allList);
function allList(event) {
    // console.log(state);
    view(state);
    addLineState(state);
    event.target.classList.add('focusBorder');
    active.classList.remove('focusBorder');
    complete.classList.remove('focusBorder');
    console.dir( all.parentElement.firstElementChild);
}


        //active
active.addEventListener('click', activeList);
function activeList(event) {
    // console.log(ul);
    var stateactive = state.filter(v => v.finished!= true);
    view(stateactive);
    all.parentElement.firstElementChild.classList.remove('focusBorder');
    active.classList.add('focusBorder');
    complete.classList.remove('focusBorder');
    // addLineState(stateactive);
} 
        // completed
complete.addEventListener('click', completeList);
function completeList(event) {
    // console.log(state)
    var statecomplete = state.filter(v => v.finished == true);
    view(statecomplete);
    addLineState(statecomplete);
    all.classList.remove('focusBorder');
    active.classList.remove('focusBorder');
    complete.classList.add('focusBorder');
}
clearall.addEventListener('click', clearalllist);
function clearalllist () {
    state = [];
    view(state);
    display.style.display = 'none';
    downArrow.style.display = 'none';
    

}

// addLineState(state);
// console.dir(ul.childNodes);

// adding checked and cross in list
function addLineState(arr) {
    // console.log(arr);
    arr.forEach(value => {
        if (value.finished == true){
            allli.forEach(v => { 
                if (v.dataset.id == value.liid){
                    v.firstElementChild.checked = true;
                    v.firstElementChild.nextElementSibling.classList.add('lineThrough');
                    console.log(v.firstElementChild.nextElementSibling);
                }

            })
        }
        else if (value.finished == false){
            allli.forEach(v => { 
                if (v.dataset.id == value.liid){
                    v.firstElementChild.checked = false;
                    v.firstElementChild.nextElementSibling.classList.remove('lineThrough');
                    console.log(v.firstElementChild.nextElementSibling);
                }

            })
        }

    });

}



downArrow.addEventListener('click', finishall);

function finishall(event) {
    var check = true;
    state = state.filter(v => {
        if(v.finished == false) {
            v.finished = true;
            check = false;
            clearall.style.display ="block";
        }
        return state;
       

    })
    if(check) {
        state = state.filter(v => {
            if(v.finished == true) {
                v.finished = false;
                clearall.style.display ="none";
            }
            return state;

        }
        
        )
    }
    localStorage.clear();
    localStorage.setItem('localStoragestate', JSON.stringify(state));
    addLineState(state);
    itemleft.innerHTML = `${(state.filter(v => v.finished != true)).length} item left`;

}































