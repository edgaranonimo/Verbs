const test = document.getElementById('pruebas');

// Mostrar verbo imagen y audio
const showVerb = document.getElementById("showVerb");
const showImage = document.getElementById("showImage");
const showAudio = document.getElementById("showAudio");

// Resultados y funcionalidad
const next = document.getElementById("next");
const verbsCounter = document.getElementById("verbs-counter");
const allRightCounter = document.getElementById("all-right-answers");
const verbsContainer = document.getElementById("verbs-container");
// respuestas
const first = document.getElementById("first-verb");
const second = document.getElementById("second-verb");
const third = document.getElementById("third-verb");
const fourth = document.getElementById("fourth-verb");

// Contador de verbos
const numberOfVerbs = verbs.length;
// Caso 1 bien 3 mal
let answerRoullete = [0,1,1,1];

let everyNumberOfVerbs = [];

// Todo bien
let rightAnswer; 

// Contador de respuestas correctas
let rightAnswersCounter = 0; 

// Listener boton de inicio
next.addEventListener("click",function(){
  ponerVerbo();
  next.style.display = 'none';
});

// Random de los verbos
makeRandomList();
let lastPosition = everyNumberOfVerbs.length-1;
// Función random
function makeRandomList(){
  // selector de verbos
  for (var i = 0; i < numberOfVerbs; i++){
    everyNumberOfVerbs.push(i);
  }
  // Mesclador
  everyNumberOfVerbs = everyNumberOfVerbs.sort(() => Math.random() - 0.5);
}

// Listeners botones de respuesta
function buttonEffect(itsRight,button){
  if (itsRight){
    button.classList.add('rightAnswer');
    setTimeout(function(){
      button.classList.remove('rightAnswer');
    },1000);
    rightAnswersCounter = rightAnswersCounter+1;
  }else{
    button.classList.add('wrongAnswer');
    setTimeout(function(){
      button.classList.remove('wrongAnswer');
    },1000);
  }
  setTimeout(function(){
    ponerVerbo();
  },500);
}

// Listener botón 1
first.addEventListener("click",function(){
  buttonEffect(isItRight_(first.innerHTML),this);
});

// Listener botón 2
second.addEventListener("click", function(){
  buttonEffect(isItRight_(second.innerHTML),this);
});

// Listener botón 3
third.addEventListener("click", function(){
  buttonEffect(isItRight_(third.innerHTML),this);
});

// Listener botón 4
fourth.addEventListener("click", function(){
  buttonEffect(isItRight_(fourth.innerHTML),this);
});




// Mezclador de respuestas
function shuffleAnswers(array) {
  let numberOfAnswerButtons = array.length;
  // Mezclador de index
  let randomIndex;

  // Revisamos si aún contamos con verbos para mostrar sin repetir
  while (numberOfAnswerButtons != 0) {

    // Selecciona el último
    randomIndex = Math.floor(Math.random() * numberOfAnswerButtons);
    numberOfAnswerButtons--;
    // Mezcla de nuevo
    [array[numberOfAnswerButtons], array[randomIndex]] = [
    array[randomIndex], array[numberOfAnswerButtons]];
  }

  return array;
}

// Respuesta correcta
function isItRight_(answer){
  return answer==rightAnswer?true:false;
}

// Respuesta incorrecta
function randomVerbo(notThisOne){
  theOne = Math.floor(Math.random()*verbos.length);

  return theOne == notThisOne?randomVerbo(notThisOne):theOne;
}

function ponerVerbo(){

  // Mezcla las respuestas (cuando las muestra)
  answerRoullete = shuffleAnswers(answerRoullete);

  let randomPosition = everyNumberOfVerbs[lastPosition];
  let imgText = "<img src='img/"+verbs[randomPosition]+".jpg' height:'140px' width='100px'>";

  // Style de los botones añadidos
  first.classList.add("btn","btn-outline-primary","btn-md");
  second.classList.add("btn","btn-outline-primary","btn-md");
  third.classList.add("btn","btn-outline-primary","btn-md");
  fourth.classList.add("btn","btn-outline-primary","btn-md");

  //Muestra en sí los verbos y ayuda a ver las respuestas
  if (lastPosition >= 0){
    var just_position = lastPosition+1;
    verbsCounter.innerHTML = ""+just_position+" / "+numberOfVerbs;
    allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
    showVerb.innerHTML = verbs[randomPosition];
    showImage.innerHTML = imgText;

    showAudio.src = "audio/"+verbs[randomPosition]+".mp3";
    showAudio.play();

    first.innerHTML = !answerRoullete[0]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    second.innerHTML = !answerRoullete[1]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    third.innerHTML = !answerRoullete[2]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    fourth.innerHTML = !answerRoullete[3]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];

    rightAnswer = verbos[randomPosition];
    lastPosition =lastPosition - 1;
  }else{
    // Muestra mensajes de finalizado
    verbsCounter.innerHTML = "0 / "+numberOfVerbs;
    allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
    showVerb.innerHTML = "Thank you !";
    verbsContainer.innerHTML = "";
  }
}

