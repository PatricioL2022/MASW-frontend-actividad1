/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

// Array de palos
let palos = ["viu", "cua", "hex", "cir"];
// Array de número de cartas
//let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:
let numeros = [9, 10, 11, 12];

// paso (top y left) en pixeles de una carta a la siguiente en un mazo
let paso = 5;
let formatoImagen = ".png";
let pathImagen = "imagenes/baraja/";

// Tapetes				
let tapeteInicial   = document.getElementById("inicial");
let tapeteSobrantes = document.getElementById("sobrantes");
let tapeteReceptor1 = document.getElementById("receptor1");
let tapeteReceptor2 = document.getElementById("receptor2");
let tapeteReceptor3 = document.getElementById("receptor3");
let tapeteReceptor4 = document.getElementById("receptor4");

// Mazos
let mazoInicial   = [];
let mazoSobrantes = [];
let mazoReceptor1 = [];
let mazoReceptor2 = [];
let mazoReceptor3 = [];
let mazoReceptor4 = [];
let movimientos = 0;

// Contadores de cartas
let contInicial     = document.getElementById("contador_inicial");
let contSobrantes   = document.getElementById("contador_sobrantes");
let contReceptor1   = document.getElementById("contador_receptor1");
let contReceptor2   = document.getElementById("contador_receptor2");
let contReceptor3   = document.getElementById("contador_receptor3");
let contReceptor4   = document.getElementById("contador_receptor4");
let contMovimientos = document.getElementById("contador_movimientos");

// Tiempo
let contTiempo  = document.getElementById("contador_tiempo"); // span cuenta tiempo
let segundos 	 = 0;    // cuenta de segundos
let temporizador = null; // manejador del temporizador

/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/

 
// Rutina asociada a boton reset
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/


// El juego arranca ya al cargar la página: no se espera a reiniciar
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

function resetContadores(){
	contInicial.innerText = mazoInicial.length;
	contSobrantes.innerText = mazoSobrantes.length;
	contReceptor1.innerText = mazoReceptor1.length;
	contReceptor2.innerText = mazoReceptor2.length;
	contReceptor3.innerText = mazoReceptor3.length;
	contReceptor4.innerText = mazoReceptor4.length;
	contMovimientos.innerText = movimientos;
}
// Desarrollo del comienzo de juego
function comenzarJuego() {
	/* Crear baraja, es decir crear el mazoInicial. Este será un array cuyos 
	elementos serán elementos HTML <img>, siendo cada uno de ellos una carta.
	Sugerencia: en dos bucles for, bárranse los "palos" y los "numeros", formando
	oportunamente el nombre del fichero png que contiene a la carta (recuérdese poner
	el path correcto en la URL asociada al atributo src de <img>). Una vez creado
	el elemento img, inclúyase como elemento del array mazoInicial. 
	*/

	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/	
    
	
	// Barajar y dejar mazoInicial en tapete inicial
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	palos.forEach(palo => {
		numeros.forEach(numero => {
			mazoInicial.push(numero+"-"+palo);
		});
		
	});
	barajar(mazoInicial);
	cargarTapeteInicial(mazoInicial);

	// Puesta a cero de contadores de mazos
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	resetContadores();
	// Arrancar el conteo de tiempo
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

} // comenzarJuego


/**
	Se debe encargar de arrancar el temporizador: cada 1000 ms se
	debe ejecutar una función que a partir de la cuenta autoincrementada
	de los segundos (segundos totales) visualice el tiempo oportunamente con el 
	format hh:mm:ss en el contador adecuado.

	Para descomponer los segundos en horas, minutos y segundos pueden emplearse
	las siguientes igualdades:

	segundos = truncar (   segundos_totales % (60)                 )
	minutos  = truncar ( ( segundos_totales % (60*60) )     / 60   )
	horas    = truncar ( ( segundos_totales % (60*60*24)) ) / 3600 )

	donde % denota la operación módulo (resto de la división entre los operadores)

	Así, por ejemplo, si la cuenta de segundos totales es de 134 s, entonces será:
	   00:02:14

	Como existe la posibilidad de "resetear" el juego en cualquier momento, hay que 
	evitar que exista más de un temporizador simultáneo, por lo que debería guardarse
	el resultado de la llamada a setInterval en alguna variable para llamar oportunamente
	a clearInterval en su caso.   
*/

function arrancarTiempo(){
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	if (temporizador) clearInterval(temporizador);
    let hms = function (){
			let seg = Math.trunc( segundos % 60 );
			let min = Math.trunc( (segundos % 3600) / 60 );
			let hor = Math.trunc( (segundos % 86400) / 3600 );
			let tiempo = ( (hor<10)? "0"+hor : ""+hor ) 
						+ ":" + ( (min<10)? "0"+min : ""+min )  
						+ ":" + ( (seg<10)? "0"+seg : ""+seg );
			setContador(contTiempo, tiempo);
            segundos++;
		}
	segundos = 0;
    hms(); // Primera visualización 00:00:00
	temporizador = setInterval(hms, 1000);
    	
} // arrancarTiempo


/**
	Si mazo es un array de elementos <img>, en esta rutina debe ser
	reordenado aleatoriamente. Al ser un array un objeto, se pasa
	por referencia, de modo que si se altera el orden de dicho array
	dentro de la rutina, esto aparecerá reflejado fuera de la misma.
*/
function barajar(mazo) {
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	let currentIndex = mazo.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [mazo[currentIndex], mazo[randomIndex]] = [
      mazo[randomIndex], mazo[currentIndex]];
  }

} // barajar


function al_mover(e){
	var objeto = e.target.dataset;
	e.dataTransfer.setData("text/plain/numero", objeto.numero);
	e.dataTransfer.setData("text/plain/palo", objeto.palo);
	e.dataTransfer.setData("text/plain/tapete", objeto.tapete);
	console.log("dragstart: "+objeto.numero+"-"+objeto.palo);
}
/**
 	En el elemento HTML que representa el tapete inicial (variable tapeteInicial)
	se deben añadir como hijos todos los elementos <img> del array mazo.
	Antes de añadirlos, se deberían fijar propiedades como la anchura, la posición,
	coordenadas top y left, algun atributo de tipo data-...
	Al final se debe ajustar el contador de cartas a la cantidad oportuna
*/
function cargarTapeteInicial(mazo) {
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	var cantidadCartasTapeteInicial = mazo.length;
	var indice = 1;
	mazo.forEach(element => {
		var itemMazo = element.split("-");
		var numero = itemMazo[0];
		var palo = itemMazo[1];

		var img_carta = document.createElement("img");
		img_carta.setAttribute("src", pathImagen + element + formatoImagen);
		img_carta.setAttribute("height", "101");
		img_carta.setAttribute("width", "75");
		img_carta.setAttribute("data-palo", palo);
		img_carta.setAttribute("data-numero", numero);
		img_carta.setAttribute("data-tapete", "inicial");
		img_carta.style.top = "50 %";
		img_carta.style.left = "50 %";
// Con la siguiente traslación, se centra definitivamente en el tapete: se desplaza,
// a la izquierda y hacia arriba (valores negativos) el 50 % de las dimensiones de
// la carta.
		img_carta.style.transform="translate(-50 %, -50 %)";
		img_carta.setAttribute("id", numero+"-"+palo);
		if(palo==='cir' || palo === 'hex'){
			img_carta.setAttribute("color", "gris");
		}
		else {
			img_carta.setAttribute("color", "naranja");
		}

		if(cantidadCartasTapeteInicial === indice){
			img_carta.setAttribute("draggable", true);
		}
		else {
			img_carta.setAttribute("draggable", false);
		}

		tapeteInicial.appendChild(img_carta);
		img_carta.ondragstart = al_mover;
		img_carta.ondrag = function(e) { };
		img_carta.ondragend = function() { };
	indice++;
	});
} // cargarTapeteInicial


/**
 	Esta función debe incrementar el número correspondiente al contenido textual
   	del elemento que actúa de contador
*/
function incContador(contador){
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

} // incContador

/**
	Idem que anterior, pero decrementando 
*/
function decContador(contador){
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! ***/	
} // decContador

/**
	Similar a las anteriores, pero ajustando la cuenta al
	valor especificado
*/
function setContador(contador, valor) {
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	contador.innerText = valor;
} // setContador


function verificarFinJuego(){
	if(mazoInicial.length == 0 && mazoSobrantes == 0){
		$('#myModal').modal('show');
	}
}
function regresarCartasMazoSobranteMazoInicial()
{
	if(mazoInicial.length===0 && mazoSobrantes.length>0){
		mazoSobrantes.forEach(elementoSobrante=>{
			var elemento = document.getElementById(elementoSobrante);
			elemento.parentNode.removeChild(elemento);
		});
		mazoInicial = mazoSobrantes;
		barajar(mazoInicial);
		cargarTapeteInicial(mazoInicial);
		mazoSobrantes = [];
		contInicial.innerText = mazoInicial.length;
		contSobrantes.innerText = mazoSobrantes.length;
	}
}
function soltar(event,mazoParametro,tapeteParametro,aplicaRegla){
	event.preventDefault();

	const palo = event.dataTransfer.getData("text/plain/palo");
	const numero = event.dataTransfer.getData("text/plain/numero");
	const tapete = event.dataTransfer.getData("text/plain/tapete");
	var color = (palo ==='cir' || palo === 'hex')?'gris':'naranja';
	var carta = numero+"-"+palo;
	var insertar = false;
	var existe = mazoParametro.includes(carta);
	if(!existe){
		if(aplicaRegla===true)
		{
			if(mazoParametro.length===0)
			{
				if(numero==numeros[numeros.length-1]){
					insertar = true;
				}
			}
			else
			{
				var ultimoElementoReceptor1 = mazoParametro[mazoParametro.length-1];
				var auxElementoReceptor1 = ultimoElementoReceptor1.split("-");
				var numeroUltimoElementoReceptor = auxElementoReceptor1[0];
				var paloUltimoElementoReceptor = auxElementoReceptor1[1];
				var colorPaloUltimoElementoReceptor = (paloUltimoElementoReceptor ==='cir' || paloUltimoElementoReceptor === 'hex')?'gris':'naranja';
				if(numero == numeroUltimoElementoReceptor-1) {
					if(colorPaloUltimoElementoReceptor != color){
						insertar = true;
					}

				}
			}
			if(insertar===true)
			{
				mazoParametro.push(carta);
				if(tapete==='inicial')
				{
					mazoInicial.pop();
				}
				else {
					mazoSobrantes.pop();
				}


				var ultimoItemMazoInicial = mazoInicial[mazoInicial.length-1];
				var domUltimoItemMazoInicial = document.getElementById(ultimoItemMazoInicial)
				if(domUltimoItemMazoInicial!=null){
					domUltimoItemMazoInicial.setAttribute("draggable", true);
				}


				//var ultimaCartaMazoInicial =

				var img_carta = document.createElement("img");
				img_carta.setAttribute("src", pathImagen + carta + formatoImagen);
				img_carta.setAttribute("height", "101");
				img_carta.setAttribute("width", "75");
				img_carta.setAttribute("data-palo", palo);
				img_carta.setAttribute("data-numero", numero);
				img_carta.setAttribute("id", numero+"-"+palo);
				tapeteParametro.appendChild(img_carta);

				var elemento = document.getElementById(numero+"-"+palo);
				elemento.parentNode.removeChild(elemento);
				movimientos++;
				//regresarCartasMazoSobranteMazoInicial();
			}

		}
		else {
			mazoParametro.push(carta);
			mazoInicial.pop();
			var ultimoItemMazoInicial = mazoInicial[mazoInicial.length-1];
			var domUltimoItemMazoInicial = document.getElementById(ultimoItemMazoInicial)
			if(domUltimoItemMazoInicial!=null){
				domUltimoItemMazoInicial.setAttribute("draggable", true);
			}
			var img_carta = document.createElement("img");
			img_carta.setAttribute("src",pathImagen + carta + formatoImagen);
			img_carta.setAttribute("height", "101");
			img_carta.setAttribute("width", "75");
			img_carta.setAttribute("data-palo", palo);
			img_carta.setAttribute("data-numero", numero);

			img_carta.setAttribute("id", numero+"-"+palo);
			if(palo==='cir' || palo === 'hex'){
				img_carta.setAttribute("color", "gris");
			}
			else {
				img_carta.setAttribute("color", "naranja");
			}
			tapeteParametro.appendChild(img_carta);
			img_carta.ondragstart = al_mover;
			img_carta.ondrag = function(e) { };
			img_carta.ondragend = function() { };

			var elemento = document.getElementById(numero+"-"+palo);
			elemento.parentNode.removeChild(elemento);
			movimientos++;

		}
	}
	resetContadores();
	regresarCartasMazoSobranteMazoInicial();
	verificarFinJuego();

}
function reiniciar(){
	document.querySelectorAll(".tapete img")
		.forEach(img => img.remove());
	mazoInicial = [];
	mazoSobrantes = [];
	mazoReceptor1 = [];
	mazoReceptor2 = [];
	mazoReceptor3 = [];
	mazoReceptor4 = [];
	movimientos = 0;
	comenzarJuego();
	clearInterval(temporizador)
	arrancarTiempo();
}
window.onload = function() {
  comenzarJuego();
	tapeteSobrantes.ondragenter = function(e) { e.preventDefault(); };
	tapeteSobrantes.ondragover = function(e) { e.preventDefault(); };
	tapeteSobrantes.ondragleave = function(e) { e.preventDefault(); };
	tapeteSobrantes.ondrop = (event)=>soltar(event,mazoSobrantes,tapeteSobrantes,false);

	tapeteReceptor1.ondragenter = function(e) { e.preventDefault(); };
	tapeteReceptor1.ondragover = function(e) { e.preventDefault(); };
	tapeteReceptor1.ondragleave = function(e) { e.preventDefault(); };
	tapeteReceptor1.ondrop = (event)=>soltar(event,mazoReceptor1,tapeteReceptor1,true);

	tapeteReceptor2.ondragenter = function(e) { e.preventDefault(); };
	tapeteReceptor2.ondragover = function(e) { e.preventDefault(); };
	tapeteReceptor2.ondragleave = function(e) { e.preventDefault(); };
	tapeteReceptor2.ondrop = (event)=>soltar(event,mazoReceptor2,tapeteReceptor2,true);

	tapeteReceptor3.ondragenter = function(e) { e.preventDefault(); };
	tapeteReceptor3.ondragover = function(e) { e.preventDefault(); };
	tapeteReceptor3.ondragleave = function(e) { e.preventDefault(); };
	tapeteReceptor3.ondrop = (event)=>soltar(event,mazoReceptor3,tapeteReceptor3,true);

	tapeteReceptor4.ondragenter = function(e) { e.preventDefault(); };
	tapeteReceptor4.ondragover = function(e) { e.preventDefault(); };
	tapeteReceptor4.ondragleave = function(e) { e.preventDefault(); };
	tapeteReceptor4.ondrop = (event)=>soltar(event,mazoReceptor4,tapeteReceptor4,true);

	arrancarTiempo();
}