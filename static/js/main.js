//funcion recursiva para obtener factorial
const factorial = (n) =>{
    if (n-1 == 0 || n==0) return 1;
    return n*factorial(n-1);
};

//funcion combinaciones
const combinacion = (n, r) => factorial(n) / (factorial(n-r)*factorial(r));

//para reutilizar en las 2 funciones que utilizamos binomial
const formulaBinomial = (n, pi, x)=> ((combinacion(n, x)*pi**(x)*(1-pi)**(n-x))*100);

//formula hipergeometrica
const formulaHipergeometrica = (s, x, N, n) =>{
    try{
       return ((combinacion(s, x)*combinacion(N-s, n-x))/combinacion(N, n))*100;
    }catch(e){
        alert(`Se han excedido los recursos de calculo, pruebe numero mas pequeños.`);
        return;
    };
};

//funcion para obtener la probabilidad binomial
const binomial = (n=document.getElementById('binomial_n').value, pi=document.getElementById('binomial_pi').value, x=document.getElementById('binomial_x').value) =>{;
    let resultado = document.getElementById('binomial_r');
    let pbinomial = formulaBinomial(n, pi, x);

    resultado.innerHTML = `La probabilidad es de: ${pbinomial.toFixed(2)}%`;
    return pbinomial.toFixed(2);
};

const binomialRango = () =>{
    let n = document.getElementById('binomialr_n').value;
    let pi = document.getElementById('binomialr_pi').value;
    let x1 = parseInt(document.getElementById('binomialr_x1').value);
    let x2 = parseInt(document.getElementById('binomialr_x2').value);
    let acumulador = 0, i;
    resultado = document.getElementById('binomialr_r');

    for (i=x1; i<=x2; i++){
        acumulador += formulaBinomial(n, pi, i);
    };

    resultado.innerHTML = `El porcentaje acumulado es: ${acumulador.toFixed(2)}%`;
    return acumulador.toFixed(2);
};

const hipergeometrica = (s, N, n, x) => {
    let resultado = document.getElementById('hiper_r');
    let phiper = formulaHipergeometrica(s, x, N, n);

    resultado.innerHTML = `La probabilidad es de: ${phiper.toFixed(2)}%`;
    return phiper.toFixed(2);
};

//tabla con las 'Z'
const tablaZ = {
    "0.0": 0.0199,
    "0.1": 0.0506,
    "0.2": 0.0987,
    "0.3": 0.1368,
    "0.4": 0.1736,
    "0.5": 0.2088,
    "0.6": 0.2422,
    "0.7": 0.2734,
    "0.8": 0.3023,
    "0.9": 0.3289,
    "1.0": 0.3531,
    "1.1": 0.3749,
    "1.2": 0.3944,
    "1.3": 0.4115,
    "1.4": 0.4265,
    "1.5": 0.4394,
    "1.6": 0.4505,
    "1.7": 0.4599,
    "1.8": 0.4678,
    "1.9": 0.4744,
    "2.0": 0.4798,
    "2.1": 0.4842,
    "2.2": 0.4878,
    "2.3": 0.4906,
    "2.4": 0.4929,
    "2.5": 0.4946,
    "2.6": 0.4960,
    "2.7": 0.4970,
    "2.8": 0.4978,
    "2.9": 0.4984,
    "3.0": 0.4989
};

//funcion para calcular z y su probabilidad
const pz = (mu, x, de) =>{
    //calculamos z
    z = (x-mu)/de;
    if (parseFloat(z) == parseInt(z)) z = z.toString() + '.0';
    else z = (Math.abs(z.toFixed(1))).toString()
    p = parseFloat(tablaZ[z])*100;
    return p;
};

const normal = (mu, x, de, w) =>{
    resultado =  document.getElementById('normal_r');
    p = pz(mu, x, de);

    if (w == '-'){
        text = 'sea menos de';
        p = 50 + p;
    }else{
        text = 'sea m&aacute;s de'
        p = 100 - (50 + p);
    };

    resultado.innerHTML = `La probabilidad de que ${text} ${x} es de: ${p.toFixed(2)}%`;
    return p
};

const normale = (mu, x1, x2, de) =>{
    p1 = pz(mu, x1, de);
    p2 = pz(mu, x2, de);
    resultado = document.getElementById('normale_r');

    if((parseFloat(x1)>mu && parseFloat(x2)<mu) || (parseFloat(x1)<mu && parseFloat(x2)>mu)){
        p = Math.abs(p1+p2);
    }else p = Math.abs(p1-p2);

    resultado.innerHTML = `La probabilidad entre ${x1} y ${x2} es de: ${p.toFixed(2)}%`;
    return p;
};

const poisson = (mu, x) =>{
    p = ((mu**(x)*Math.exp(-mu))/factorial(x))*100;
    resultado = document.getElementById('poisson_r');

    resultado.innerHTML = `La probabilidad de ${x} es: ${p.toFixed(2)}%`;
    return p;
};

poisson_form = document.getElementById('poisson-form');
normal_form = document.getElementById('normal-form');
hiper_form = document.getElementById('hiper-form');
binomialr_form = document.getElementById('binomialr-form');
binomial_form = document.getElementById('binomial-form');
normale_form = document.getElementById('normale-form');

poisson_form.onsubmit = (e) =>{
    e.preventDefault();
    poisson(mu=document.getElementById('poisson_mu').value, x=document.getElementById('poisson_x').value);
};

normale_form.onsubmit = (e) =>{
    e.preventDefault();
    normale(mu=document.getElementById('normale_mu').value, x=document.getElementById('normale_x').value, x2=document.getElementById('normale_x2').value, de=document.getElementById('normale_de').value);
};

binomialr_form.onsubmit = (e) =>{
    e.preventDefault();
    binomialRango();
};

binomial_form.onsubmit = (e) =>{
    e.preventDefault();
    binomial();
};

hiper_form.onsubmit = (e)=>{
    e.preventDefault();
    hipergeometrica(document.getElementById('hiper_s').value, document.getElementById('hiper_N').value, document.getElementById('hiper_n').value, document.getElementById('hiper_x').value);
};

normal_form.onsubmit = (e)=>{
    e.preventDefault();
    normal(mu=document.getElementById('normal_mu').value, x=document.getElementById('normal_x').value, de=document.getElementById('normal_de').value, w=document.getElementById('normal_select').value);
};
