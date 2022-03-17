//variaveis sons

let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  
}

//variaveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//variaveis Raquete
let xRetangulo1 = 5;
let xRetangulo2 = 580;
let yRetangulo1 = 160;
let yRetangulo2 = 160;
let comprimentoRaquete = 10
let alturaRaquete = 70
let chanceDeErrar = 0;

//variaveis velocidades
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;
let velocidadeRaquete = 4;
let velocidadeYOponente;

//variavel colisao
let colidiu = false;

//variaveis placar
let meusPontos = 0;
let pontosOponente = 0;


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}




function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  mostraRetangulo(xRetangulo1, yRetangulo1);
  mostraRetangulo(xRetangulo2, yRetangulo2);
  verificaColisaoBorda();
  movimentaRaquete1();
  movimentaRaquete2();
  colisaoRaqueteBiblioteca(xRetangulo1,yRetangulo1);
  colisaoRaqueteBiblioteca(xRetangulo2, yRetangulo2);
  incluiPlacar();
  detectaPonto();
  //verificaColisaoRaquete();

  

  
}


function mostraBolinha() {
  
  circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha() {
  
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function mostraRetangulo(x, y) {
  
  rect(x, y, comprimentoRaquete, alturaRaquete, 20);
  rect(x, y, comprimentoRaquete, alturaRaquete, 20);
  
}

function verificaColisaoBorda() {
  
   if (xBolinha + raio > width || xBolinha - raio < 0) {
    
      velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    
      velocidadeYBolinha *= -1;
  }
  
}

function movimentaRaquete1() {
  
   if (keyIsDown(UP_ARROW)) {
    
    yRetangulo1 -= velocidadeRaquete;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    
    yRetangulo1 += velocidadeRaquete;
  }
}

/*function verificaColisaoRaquete (){
  
  if (xBolinha - raio < xRetangulo1 + comprimentoRaquete && yBolinha - raio < yRetangulo1 + alturaRaquete && yBolinha + raio > yRetangulo1) {
    
    velocidadeXBolinha *= -1;
  }
}*/

function colisaoRaqueteBiblioteca(x,y){
  
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  
  if(colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}



function movimentaRaquete2 (){
  
  velocidadeYOponente = yBolinha - yRetangulo2 - comprimentoRaquete/2 - 30;
  yRetangulo2 += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
  
} //opção para jogo SinglePlayer com a raquete seguindo a bolinha


/*function movimentaRaquete2() {
  
   if (keyIsDown(87)) {
    
    yRetangulo2 -= velocidadeRaquete;
  }
  
  if (keyIsDown(83)) {
    
    yRetangulo2 += velocidadeRaquete;
  }
}*/ // opção para jogo Multiplayer usando as teclas W e S 

function calculaChanceDeErrar(){
  
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >=44) {
      chanceDeErrar = 45;
    }
    
  }
  
  if (pontosOponente < meusPontos) {
    chanceDeErrar -= 1;
    if (chanceDeErrar <=35){
      chanceDeErrar = 35;
    }
  }
}

function incluiPlacar() {
  stroke(255);
  fill (25,25,112);
  rect(130,06,40,28,4);
  rect(430,06,40,28,4);
  textAlign(CENTER);
  textSize(16);
  fill(255);
  text(meusPontos, 150, 26);
  text(pontosOponente, 450,26);
  
}

function detectaPonto(){
  
  if(xBolinha <= 5) {
    
    pontosOponente++;
    ponto.play();
  }

  if(xBolinha >= 595) {
    
    meusPontos++;
    ponto.play();
  }
}
