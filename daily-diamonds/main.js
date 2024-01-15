/**
 * Lo primero: Obtener la data en una variable
 */

function getData(){
    fetch('/data/diamonds.json')
        .then( (response) => {
            return response.json();
        })
        .then( (data) => {
            window.diamonds = data.diamonds;
            console.log(window.diamonds); 
        });
}

/**
 * Get time of day
 */

let hello_text = 'morning'; 

function getTimeOfDay(){
    const now = new Date();
    const hours = now.getHours();

    if(hours >= 6 && hours <= 12 ) hello_text = 'morning'; 
    if(hours >= 13 && hours <= 18 ) hello_text = 'afternoon';
    if(hours >= 19 && hours <= 23 ) hello_text = 'night';
    if(hours >= 1 && hours <= 5 ) hello_text = 'sleeptime';

    document.querySelector("html").classList.add(hello_text);

    document.querySelector(".title").innerHTML = hello_text;

}

const getTask = (element) => {
    const task = element.parentElement.parentElement.querySelector('input[type="text"]').value;
    return task;
}

const setTask = (element, value) => {
    const task = element.parentElement.parentElement.querySelector('input[type="text"]');
    task.value = value;
    return task;
}

function getListData() {
    return JSON.parse(localStorage.getItem('tasks'));
}

function setListData() {
    const data = getListData();

    if(!data) return;

    const now = new Date();
    const deadline = new Date(data.deadline);

    if( now > deadline) return;
    console.log(now, deadline, now > deadline);

    const first = document.querySelector('#item1');
    const second = document.querySelector('#item2');
    const third = document.querySelector('#item3');

    first.checked = data.first.checked;
    second.checked = data.second.checked;
    third.checked = data.third.checked;

    setTask(first, data.first.task);
    setTask(second, data.second.task);
    setTask(third, data.third.task);

    console.log('Yay, seteamos las tareitas');
}

function saveListData() {

    const first = document.querySelector('#item1');
    const second = document.querySelector('#item2');
    const third = document.querySelector('#item3');
    const deadline = new Date();
    deadline.setDate(deadline.getDate()+1);
    deadline.setHours(6);

    const data = {
        first: {
            checked: first.checked,
            task: getTask(first),
        },
        second: {
            checked: second.checked,
            task: getTask(second),
        },
        third: {
            checked: third.checked,
            task: getTask(third),
        },
        deadline: deadline,
    }

    localStorage.setItem('tasks', JSON.stringify(data));

    console.log(data);
    console.log('Yay! guardamos la lista');
}


/**
 * Get day of week
 */

let week_day = 'week day'

function getDayOfWeek(){
    const now = new Date();
    const day = now.getDay();

    if(day == 0) week_day = '<span>Sunday</span>, please never end ♪'
    if(day == 1) week_day = '<span>Monday</span>, you can fall apart ♪'
    if(day == 2) week_day = '<span>Tuesday</span> heart attack ♪'
    if(day == 3) week_day = '<span>Wednesday</span> breaks my heart ♪'
    if(day == 4) week_day = '<span>Thursday</span>, never looking back ♪'
    if(day == 5) week_day = "it's <span>Friday</span> I'm in love ♪"
    if(day == 6) week_day = '<span>Saturday</span>, wait ♪'

    document.querySelector(".pretitle").innerHTML = week_day;

}

/**
 * Lo segundo: Obtener un elemento aleatorio de esa lista
 */

function getRandomDiamond(){
    const totalItemCount = window.diamonds.length;
    const index = Math.floor(Math.random() * (totalItemCount + 1));
    const newDiamond = window.diamonds[index].title;
    const button = document.querySelector('.button');
    const color = getRandomColor();

    document.querySelector('#nuevotextito').innerHTML = newDiamond;
    button.style.backgroundColor = color;
}


const colors = [
    'var(--yellow)','var(--green)','var(--orange)','var(--blue)','var(--pink)','var(--purple)','var(--white)'
]

function getRandomColor(){
    const totalItemCount = colors.length;
    const index = Math.floor(Math.random() * (totalItemCount + 1));
    const newColor = colors[index];
    return newColor;
}

window.onload = () => {
    getData();
    getTimeOfDay();
    getDayOfWeek();
    setListData();
}



//confetiii//


// Obtén todos los checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Escucha el cambio en cada checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', verificarCheckboxes);
});

// Verifica cuando todos los checkboxes estén marcados
function verificarCheckboxes() {
    totalCheckboxes = 2;
    const checkboxesMarcados = document.querySelectorAll('input[type="checkbox"]:checked').length;

    if (totalCheckboxes > 0 && (checkboxesMarcados) === totalCheckboxes) {
        // Todos los checkboxes están marcados, ejecutamos el código del confetti
        ejecutarCodigoConfetti();
    }
}

// Función para ejecutar el código del confetti
function ejecutarCodigoConfetti() {
    // Código del confetti
    let confetti = new Confetti('todo-box');
    
    confetti.setCount(75);
    confetti.setSize(1);
    confetti.setPower(25);
    confetti.setFade(false);
    confetti.destroyTarget(true);
    

    // Puedes agregar más personalización o código aquí
}