// variaveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let velocidadeDaBolinhaX = 5;
let velocidadeDaBolinhaY = 5;
let raio = diametro / 2;

//varisveis raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 100;
let xRaqueteOponente = 580;
let yRaqueteOponente = 150;
let velocidadeRaqueteOponenteY;

//variavel de colizao 
let colidiu = false

// pontos
let meusPontos = 0;
let pontosOponente = 0;

//sons
let raquetada;
let ponto;
let trilha;

let chanceErrar = 0;

function preload(){
  trilha = loadSound("./sons/trilha.mp3");
  ponto = loadSound("./sons/ponto.mp3");
  raquetada = loadSound("./sons/raquetada.mp3");
}
function setup() {
  createCanvas(600, 400);
  trilha.loop()

}

function draw() {
  background(000);
  mostraBolinha();
  movimentaBolinha();
  verificaColizaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colizaoRaquete(xRaquete, yRaquete);
  colizaoRaquete(xRaqueteOponente, yRaqueteOponente);
  placar();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeDaBolinhaX;
  yBolinha += velocidadeDaBolinhaY;
}

function verificaColizaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeDaBolinhaX *= -1
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeDaBolinhaY *= -1
  }
}

function mostraRaquete(x, y) {
  rect(x, y, comprimentoRaquete, alturaRaquete)
}


function movimentaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10
  }
}

function movimentaRaqueteOponente() {
  velocidadeRaqueteOponenteY = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velocidadeRaqueteOponenteY;
  
  /*opcão para jogar com 2 pessoas com W e S
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10
  }
  */
}

function calcularChanceDeErrar(){
  if(meusPontos <= pontosOponente){
    chanceErrar++
  }else{
    chanceErrar--
  }
}

function colizaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeDaBolinhaX *= -1
    raquetada.play()
    
  }
}

function placar(){
  stroke(255)
  textSize(17)
  textAlign(CENTER)
  fill(color(255, 140, 0))
  rect(150, 10, 40, 20)
  fill(color(255, 140, 0))
  rect(450, 10, 40, 20)
  fill(255)
  text(meusPontos, 170, 26)
  fill(255)
  text(pontosOponente, 470, 26)
  if(xBolinha > 580){
    meusPontos += 1
    ponto.play()
    xBolinha = width / 2;
  }
  if(xBolinha < 10){
    pontosOponente += 1
    ponto.play()
    xBolinha = width / 2;
  }
}

// funções que tentei usar mas não deu certo 
/*


function verificaColizaoComRaquete(){
  if(xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeDaBolinhaX *= -1
  }
}
function verificaColizaoComRaqueteOponente(){
  if(xBolinha + raio > xRaqueteOponente - comprimentoRaquete && yBolinha + raio > yRaqueteOponente - alturaRaquete && yBolinha - raio < yRaqueteOponente){
    velocidadeDaBolinhaX *= -1
  }
}*/
