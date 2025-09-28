// Datenstruktur Biga & Poolish als Objekt

let teigDaten = {
  biga: {
    default: {mehl: 500, wasser: 300, hefeProzent: 1},
    gesamt: { mehl: 0, wasser: 0, hefeProzent: 0, hefeMenge: 0 },
    vorteig: { mehl: 0, wasser: 0, hefeMenge: 0, hefeProzent: 1, wasserProzent: 0 },
    hauptteig: { mehl: 0, wasser: 0, hefeMenge: 0, salz: 0 },
  },
  poolish: {
    default: {mehl: 500, wasser: 300, hefe: 5},
    gesamt: { mehl: 0, wasser: 0, hefe: 0 },
    vorteig: { mehl: 100, wasser: 100, hefe: 1 },
    hauptteig: { mehl: 0, wasser: 0, salz: 0, hefe: 0},
  }
};

// Vorteig Berechnungen (Eigene Datenstruktur)
if (document.body.classList.contains("vorteig-seite")) {
// Variablen mit Werten Erstbefüllen
let mehlInputGesamt = parseFloat(document.getElementById("mehlInput-1").value);
let wasserInputGesamt = parseFloat(document.getElementById("wasserInput-1").value);
let hefeInputGesamt = parseFloat(document.getElementById("hefeInput-1").value);

 
// Werte aus Inputfeldern in Variablen schreiben
document.getElementById("mehlInput-1").addEventListener("input", function(event) {
    mehlInputGesamt = parseFloat(event.target.value);
});

document.getElementById("wasserInput-1").addEventListener("input", function(event) {
    wasserInputGesamt = parseFloat(event.target.value);
});

document.getElementById("hefeInput-1").addEventListener("input", function(event) {
    hefeInputGesamt = parseFloat(event.target.value);
});

document.getElementById("calculateVorteig").addEventListener("click", function(){

    // Hefe berechnen
   let hefeBerechnetGesamtteig = (mehlInputGesamt * hefeInputGesamt) / 100;
   //console.log(hefeBerechnetGesamtteig);
   document.getElementById("hefeMenge").value = hefeBerechnetGesamtteig;

   // Vorteig berechen
   let mehlBerechnetVorteig = (mehlInputGesamt * parseFloat(document.getElementById("mehlProzent").value) / 100);
       document.getElementById("mehlInput-2").value = mehlBerechnetVorteig;

    let wasserBerechnetVorteig = (wasserInputGesamt * parseFloat(document.getElementById("wasserProzent").value) / 100);
    console.log(wasserBerechnetVorteig)
    document.getElementById("wasserInput-2").value = wasserBerechnetVorteig;

    document.getElementById("hefeInput-2").value = document.getElementById("hefeMenge").value;
   // Restmenge Hauptteig berechen
   let mehlBerechnetHauptteig = (document.getElementById("mehlInput-1").value) - (document.getElementById("mehlInput-2").value);
    document.getElementById("mehlInput-3").value = mehlBerechnetHauptteig;
    
   let wasserBerechnetHauptteig = (document.getElementById("wasserInput-1").value) - (document.getElementById("wasserInput-2").value);
    document.getElementById("wasserInput-3").value = wasserBerechnetHauptteig;

    // Salzmenge berechnen
    let salzBerechnetHauptteig = function () {
        const salzFaktorTL = (document.getElementById("mehlInput-1").value) * 0.002;
        return (salzFaktorTL + " TL");
            };
    document.getElementById("salzInput").value = salzBerechnetHauptteig();
});

}

// Biga Berechnungen mit Werten aus Object teigDaten

if (document.body.classList.contains("biga-seite")) {

// Defaultwerte in Inputfelder vorbefüllen aus Object teigDaten

        document.getElementById("mehlInputBiga-1").value = teigDaten.biga.default.mehl;
        document.getElementById("wasserInputBiga-1").value = teigDaten.biga.default.wasser;
        document.getElementById("hefeInputBiga-1").value = teigDaten.biga.default.hefeProzent; 

// Defaultwerte in Object teigDaten -> Gesamt übertragen

        teigDaten.biga.gesamt.mehl = teigDaten.biga.default.mehl;
        teigDaten.biga.gesamt.wasser = teigDaten.biga.default.wasser;
        teigDaten.biga.gesamt.hefeProzent = teigDaten.biga.default.hefeProzent;

        let testmehl = 0;

        // Werte aus Inputfeldern in Objekt teigDaten schreiben
document.getElementById("mehlInputBiga-1").addEventListener("input", function(event) {
    teigDaten.biga.gesamt.mehl = parseFloat(event.target.value);
    testmehl = parseFloat(event.target.value);
});

document.getElementById("wasserInputBiga-1").addEventListener("input", function(event) {
    teigDaten.biga.gesamt.wasser = parseFloat(event.target.value);
});

document.getElementById("hefeMengeBiga").addEventListener("input", function(event) {
    teigDaten.biga.gesamt.hefeMenge = parseFloat(event.target.value);
});

document.getElementById("hefeInputBiga-1").addEventListener("input", function(event) {
    teigDaten.biga.gesamt.hefeProzent = parseFloat(event.target.value);
});

// Berechnung

document.getElementById("calculateBiga").addEventListener("click", function(){
    
// Hefe berechnen

console.log(teigDaten.biga.gesamt.hefeProzent);
console.log(teigDaten.biga.gesamt.hefeMenge);
console.log(teigDaten.biga.gesamt.mehl);
console.log(teigDaten.biga);




// Inputs holen
const hefeMengeInput   = document.getElementById("hefeMengeBiga");
const hefeProzentInput = document.getElementById("hefeInputBiga-1");

// Raw-Werte aus den Inputs (String oder leer)
const mengeRaw   = hefeMengeInput?.value ?? "";
const prozentRaw = hefeProzentInput?.value ?? "";

// Helper zum Parsen: Leerstring → null, sonst Zahl
const toNumberOrNull = (val) => {
  if (val === undefined || val === null) return null;
  const trimmed = String(val).trim();
  if (trimmed === "") return null;
  const num = Number(trimmed);
  return Number.isFinite(num) ? num : null;
};

const menge   = toNumberOrNull(mengeRaw);
const prozent = toNumberOrNull(prozentRaw);

// Zugriff auf dein Objekt
const gesamt   = teigDaten.biga.gesamt;
const defaults = teigDaten.biga.default;

// 1) Gesamtmenge hat Vorrang
if (menge !== null) {
  gesamt.hefeMenge   = menge;
  gesamt.hefeProzent = (menge / gesamt.mehl) * 100;

  hefeProzentInput.value = ""; // Prozent-Input leeren
  console.log("IF: Gesamtmenge verwendet");

// 2) Wenn keine Menge, aber Prozent
} else if (prozent !== null) {
  gesamt.hefeProzent = prozent;
  gesamt.hefeMenge   = (gesamt.mehl * prozent) / 100;

  hefeMengeInput.value = gesamt.hefeMenge;
  console.log("ELSE IF: Hefe-Prozent verwendet");

// 3) Fallback: Default verwenden
} else {
  gesamt.hefeProzent = defaults.hefeProzent;
  gesamt.hefeMenge   = (gesamt.mehl * defaults.hefeProzent) / 100;

  hefeProzentInput.value = defaults.hefeProzent;
  hefeMengeInput.value   = gesamt.hefeMenge;
  console.log("ELSE: Default verwendet");
}

/*
        // mehl aus -2 oder -1 (Fallback)
const mehl = teigDaten.biga.gesamt.mehl || parseFloat(document.getElementById("mehlInputBiga-1").value);

// hefeProzent aus -2 oder -1 (Fallback)
let hefeProzent = parseFloat(document.getElementById("hefeInputBiga-2").value);
if (isNaN(hefeProzent)) {
    hefeProzent = parseFloat(document.getElementById("hefeInputBiga-1").value.replace("%",""));
}

// Menge berechnen
teigDaten.biga.gesamt.hefeMenge = (mehl * hefeProzent) / 100;

// in Inputfeld schreiben
document.getElementById("hefeMengeBiga").value = teigDaten.biga.gesamt.hefeMenge;

*/
   
   // Vorteig berechen aus Objekt teigDaten 
   teigDaten.biga.vorteig.mehl = (teigDaten.biga.gesamt.mehl * parseFloat(document.getElementById("mehlProzentBiga").value) / 100);
       document.getElementById("mehlInputBiga-2").value = teigDaten.biga.vorteig.mehl;

    teigDaten.biga.vorteig.wasser = (teigDaten.biga.gesamt.wasser * parseFloat(document.getElementById("wasserProzentBiga").value) / 100);
        document.getElementById("wasserInputBiga-2").value = teigDaten.biga.vorteig.wasser;

    teigDaten.biga.vorteig.hefeMenge = ((teigDaten.biga.vorteig.mehl * teigDaten.biga.vorteig.hefeProzent) / 100); 
    document.getElementById("hefeInputBiga-2").value = teigDaten.biga.vorteig.hefeMenge;

   // Restmenge Hauptteig berechen
   teigDaten.biga.hauptteig.mehl = teigDaten.biga.gesamt.mehl - teigDaten.biga.vorteig.mehl;
    document.getElementById("mehlInputBiga-3").value = teigDaten.biga.hauptteig.mehl;
    
   teigDaten.biga.hauptteig.wasser = teigDaten.biga.gesamt.wasser - teigDaten.biga.vorteig.wasser;
    document.getElementById("wasserInputBiga-3").value = teigDaten.biga.hauptteig.wasser;

   teigDaten.biga.hauptteig.hefeMenge = teigDaten.biga.gesamt.hefeMenge - teigDaten.biga.vorteig.hefeMenge;
    document.getElementById("hefeInputBiga-3").value = teigDaten.biga.hauptteig.hefeMenge;

    // Salzmenge berechnen
    let salzBerechnetHauptteig = function () {
        const salzFaktorTL = teigDaten.biga.gesamt.mehl * 0.002;
        return salzFaktorTL;
            };
    document.getElementById("salzInputBiga").value = salzBerechnetHauptteig();
});

}

// Poolish Berechnungen mit Werten aus Object teigDaten

if (document.body.classList.contains("poolish-seite")) {

// Defaultwerte in Inputfelder vorbefüllen aus Object teigDaten

        document.getElementById("mehlInputPoolish-2").value = teigDaten.poolish.vorteig.mehl;
        document.getElementById("wasserInputPoolish-2").value = teigDaten.poolish.vorteig.wasser;
        document.getElementById("hefeInputPoolish-2").value = teigDaten.poolish.vorteig.hefe; 

// Defaultwerte in Object teigDaten -> Gesamt übertragen

        teigDaten.poolish.gesamt.mehl = teigDaten.poolish.default.mehl;
        teigDaten.poolish.gesamt.wasser = teigDaten.poolish.default.wasser;
        teigDaten.poolish.gesamt.hefe = teigDaten.poolish.default.hefe;

// Werte aus Inputfeldern in Objekt teigDaten schreiben

document.getElementById("mehlInputPoolish-1").addEventListener("input", function(event) {
    teigDaten.poolish.gesamt.mehl = parseFloat(event.target.value);
    testmehl = parseFloat(event.target.value);
});

document.getElementById("wasserInputPoolish-1").addEventListener("input", function(event) {
    teigDaten.poolish.gesamt.wasser = parseFloat(event.target.value);
});

document.getElementById("hefeInputPoolish-1").addEventListener("input", function(event) {
    teigDaten.poolish.gesamt.hefe = parseFloat(event.target.value);
});

document.getElementById("mehlInputPoolish-2").addEventListener("input", function(event) {
    teigDaten.poolish.vorteig.mehl = parseFloat(event.target.value);
    testmehl = parseFloat(event.target.value);
});

document.getElementById("wasserInputPoolish-2").addEventListener("input", function(event) {
    teigDaten.poolish.vorteig.wasser = parseFloat(event.target.value);
});

document.getElementById("hefeInputPoolish-2").addEventListener("input", function(event) {
    teigDaten.poolish.vorteig.hefe = parseFloat(event.target.value);
});

// Berechnung

console.log(teigDaten.poolish);

document.getElementById("calculatePoolish").addEventListener("click", function(){

   // Restmenge Hauptteig berechen
   teigDaten.poolish.hauptteig.mehl = teigDaten.poolish.gesamt.mehl - teigDaten.poolish.vorteig.mehl;
    document.getElementById("mehlInputPoolish-3").value = teigDaten.poolish.hauptteig.mehl;
    
   teigDaten.poolish.hauptteig.wasser = teigDaten.poolish.gesamt.wasser - teigDaten.poolish.vorteig.wasser;
    document.getElementById("wasserInputPoolish-3").value = teigDaten.poolish.hauptteig.wasser;

   teigDaten.poolish.hauptteig.hefe = teigDaten.poolish.gesamt.hefe - teigDaten.poolish.vorteig.hefe;
    document.getElementById("hefeInputPoolish-3").value = teigDaten.poolish.hauptteig.hefe;

    console.log(teigDaten.poolish);

    // Salzmenge berechnen
    let salzBerechnetHauptteig = function () {
        const salzFaktorTL = teigDaten.poolish.gesamt.mehl * 0.002;
        return salzFaktorTL;
            };
    document.getElementById("salzInputPoolish").value = salzBerechnetHauptteig();

});
}