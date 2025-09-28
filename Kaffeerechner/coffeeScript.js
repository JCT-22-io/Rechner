let kaffeZubereiter = {
  handfilter: {
    default: {clicks: 25, gramm: 10},
    userInput: {clicks: 25, gramm: 10, Input: false},
    favorit:{selected: false},
  },
  frenchpress: {
    default: {clicks: 32, gramm: 12},
    userInput: {clicks: 32, gramm: 12, Input: false},
    favorit:{selected: false},
  },
  bialetti: {
    default: {clicks: 17, gramm: 10},
    userInput: {clicks: 17, gramm: 10, Input: false},
    favorit:{selected: false},
  }
};

// Speichern im Local Storage

function SpeichereKaffezubereiterinLocalStorage(){
const kaffeZubereiterLocalStorage = JSON.stringify(kaffeZubereiter);
localStorage.setItem('kaffeeEinstellungen', kaffeZubereiterLocalStorage);
}

const besuchsSchluessel = 'firstVisitDone';

// Prüfen ob der Schlüssel schon existiert
if (localStorage.getItem(besuchsSchluessel) === null) {
  // Schlüssel exisitiert nicht -> 1. Besuch
  localStorage.setItem(besuchsSchluessel, 'true');
  SpeichereKaffezubereiterinLocalStorage();
  console.log("Erster Besuch");
} else {
  console.log("Nicht erster Besuch");
}

// Funktion zum Laden der Einstellungen aus dem Local Storage
function ladeEinstellungen() {
    const datenString = localStorage.getItem('kaffeeEinstellungen');
    // Gibt das geparste Objekt zurück, oder null, falls nichts gefunden wurde oder es ungültig ist
    try {
        return datenString ? JSON.parse(datenString) : null;
    } catch (e) {
        console.error("Fehler beim Parsen der Kaffee-Einstellungen:", e);
        return null;
    }
}

/**
 * Serialisiert und speichert das gesamte Kaffee-Objekt im Local Storage.
 */

function speichereEinstellungen(daten) {
    try {
        const datenString = JSON.stringify(daten);
        localStorage.setItem('kaffeeEinstellungen', datenString);
    } catch (e) {
        console.error('Fehler beim Speichern in localStorage:', e);
    }
}

// 1. Einstellungen aus dem Local Storage laden
const kaffeZubereiterGeladen = ladeEinstellungen();

let detailImg = "";
let elementID = "";
let elementClass = "";

// 

// Code für Hauptseite coffee.hmtl

document.addEventListener("DOMContentLoaded", () => {

  const savedID = localStorage.getItem("gespeicherteId");
  const savedClass = localStorage.getItem("gespeicherteKlasse");

  if (savedID && savedClass) {
    const suchSelektor = `#${savedID}.${savedClass}`;
    const zielElement = document.getElementById(savedID);
    console.log(suchSelektor);
    console.log(zielElement);
        zielElement.classList.add("highlight-green");
  }
});


// Handfilter Werte in Clicks & Gramm befüllen aus Object kaffeZubereiter
if (document.body.classList.contains("handfilter-seite")) {

// 2. Prüfen, ob die Seite und die Daten vorhanden sind
if (document.body.classList.contains("handfilter-seite")) {
    
    // Prüfen, ob die Daten erfolgreich geladen wurden UND der Handfilter-Abschnitt existiert
    if (kaffeZubereiterGeladen && kaffeZubereiterGeladen.handfilter) {
        
        // Werte aus dem geladenen Objekt an die HTML-Elemente übergeben
        document.getElementById("handfilter-clicks1").textContent = 
            kaffeZubereiterGeladen.handfilter.userInput.clicks;
            
        document.getElementById("handfilter-gramm").textContent = 
            kaffeZubereiterGeladen.handfilter.userInput.gramm;

        console.log("Handfilter-Werte erfolgreich aus Local Storage befüllt.");
        
    } else {
        // Fallback, falls die Daten fehlen oder ungültig sind (hier könnte man Standardwerte setzen)
        console.warn("Kaffee-Einstellungen oder 'handfilter'-Sektion im Local Storage nicht gefunden.");
        // Optional: Hier die Standard-Objektwerte setzen, falls das Laden fehlschlägt
    }
}

  //Lade aus Objekt
//document.getElementById("handfilter-clicks1").textContent = kaffeZubereiter.handfilter.userInput.clicks;
//document.getElementById("handfilter-gramm").textContent = kaffeZubereiter.handfilter.userInput.gramm;

// Frenchpress brechnen
let calcFrenchpressClicks = (kaffeZubereiterGeladen.frenchpress.userInput.clicks) - (kaffeZubereiterGeladen.handfilter.userInput.clicks);
document.getElementById("handfilter-clicks2").textContent = calcFrenchpressClicks;
// Bialetti berechnen
let calcBialettiClicks = (kaffeZubereiterGeladen.bialetti.userInput.clicks) - (kaffeZubereiterGeladen.handfilter.userInput.clicks);
document.getElementById("handfilter-clicks3").textContent = calcBialettiClicks;

// Klick auf Speichern
document.getElementById("button-save").addEventListener("click", () => {
  detailImg = document.querySelector(".detail-icon");
  elementID = detailImg.id;
  elementClass = detailImg.className;
  detailImg.classList.add("highlight-green");
  // Local Storage
  localStorage.setItem("gespeicherteId", elementID);
  localStorage.setItem("gespeicherteKlasse", elementClass);
});

// Klick auf Zurücksetzen
document.getElementById("button-reset").addEventListener("click", () => {
  const img = document.querySelector(".detail-icon");
  img.classList.remove("highlight-green");
  // Local Storage
  localStorage.removeItem("gespeicherteId");
  localStorage.removeItem("gespeicherteKlasse");
});
}




// Frenchpress Werte in Clicks & Gramm befüllen aus Object kaffeZubereiter
if (document.body.classList.contains("frenchpress-seite")) {

// 2. Prüfen, ob die Seite und die Daten vorhanden sind
if (document.body.classList.contains("frenchpress-seite")) {
    
    // Prüfen, ob die Daten erfolgreich geladen wurden UND der Handfilter-Abschnitt existiert
    if (kaffeZubereiterGeladen && kaffeZubereiterGeladen.frenchpress) {
        
        // Werte aus dem geladenen Objekt an die HTML-Elemente übergeben
        document.getElementById("frenchpress-clicks1").textContent = 
            kaffeZubereiterGeladen.frenchpress.userInput.clicks;
            
        document.getElementById("frenchpress-gramm").textContent = 
            kaffeZubereiterGeladen.frenchpress.userInput.gramm;

        console.log("frenchpress-Werte erfolgreich aus Local Storage befüllt.");
        
    } else {
        // Fallback, falls die Daten fehlen oder ungültig sind (hier könnte man Standardwerte setzen)
        console.warn("Kaffee-Einstellungen oder 'frenchpress'-Sektion im Local Storage nicht gefunden.");
        // Optional: Hier die Standard-Objektwerte setzen, falls das Laden fehlschlägt
    }
}

// Handfilter berechnen
let calcHandfilterClicks = (kaffeZubereiterGeladen.handfilter.userInput.clicks) - (kaffeZubereiterGeladen.frenchpress.userInput.clicks);
document.getElementById("frenchpress-clicks2").textContent = calcHandfilterClicks;
// Bialetti berechnen
let calcBialettiClicks = (kaffeZubereiterGeladen.bialetti.userInput.clicks) - (kaffeZubereiterGeladen.frenchpress.userInput.clicks);
document.getElementById("frenchpress-clicks3").textContent = calcBialettiClicks;

// Klick auf Speichern
document.getElementById("button-save").addEventListener("click", () => {
  detailImg = document.querySelector(".detail-icon");
  elementID = detailImg.id;
  elementClass = detailImg.className;
  detailImg.classList.add("highlight-green");
  // Local Storage
  localStorage.setItem("gespeicherteId", elementID);
  localStorage.setItem("gespeicherteKlasse", elementClass);
});

// Klick auf Zurücksetzen
document.getElementById("button-reset").addEventListener("click", () => {
  const img = document.querySelector(".detail-icon");
  img.classList.remove("highlight-green");
  // Local Storage
  localStorage.removeItem("gespeicherteId");
  localStorage.removeItem("gespeicherteKlasse");
});
}




// Bialetti Werte in Clicks & Gramm befüllen aus Object kaffeZubereiter
if (document.body.classList.contains("bialetti-seite")) {

// 2. Prüfen, ob die Seite und die Daten vorhanden sind
if (document.body.classList.contains("bialetti-seite")) {
    
    // Prüfen, ob die Daten erfolgreich geladen wurden UND der Handfilter-Abschnitt existiert
    if (kaffeZubereiterGeladen && kaffeZubereiterGeladen.bialetti) {
        
        // Werte aus dem geladenen Objekt an die HTML-Elemente übergeben
        document.getElementById("bialetti-clicks1").textContent = 
            kaffeZubereiterGeladen.bialetti.userInput.clicks;
            
        document.getElementById("bialetti-gramm").textContent = 
            kaffeZubereiterGeladen.bialetti.userInput.gramm;

        console.log("bialetti-Werte erfolgreich aus Local Storage befüllt.");
        
    } else {
        // Fallback, falls die Daten fehlen oder ungültig sind (hier könnte man Standardwerte setzen)
        console.warn("Kaffee-Einstellungen oder 'bialetti'-Sektion im Local Storage nicht gefunden.");
        // Optional: Hier die Standard-Objektwerte setzen, falls das Laden fehlschlägt
    }
}

// Handfilter berechnen
let calcHandfilterClicks = (kaffeZubereiterGeladen.handfilter.userInput.clicks) - (kaffeZubereiterGeladen.bialetti.userInput.clicks);
document.getElementById("bialetti-clicks2").textContent = calcHandfilterClicks;
// Frenchpress berechnen
let calcFrenchpressClicks = (kaffeZubereiterGeladen.frenchpress.userInput.clicks) - (kaffeZubereiterGeladen.bialetti.userInput.clicks);
document.getElementById("bialetti-clicks3").textContent = calcFrenchpressClicks;

// Klick auf Speichern
document.getElementById("button-save").addEventListener("click", () => {
  detailImg = document.querySelector(".detail-icon");
  elementID = detailImg.id;
  elementClass = detailImg.className;
  detailImg.classList.add("highlight-green");
  // Local Storage
  localStorage.setItem("gespeicherteId", elementID);
  localStorage.setItem("gespeicherteKlasse", elementClass);
});

// Klick auf Zurücksetzen
document.getElementById("button-reset").addEventListener("click", () => {
  const img = document.querySelector(".detail-icon");
  img.classList.remove("highlight-green");
  // Local Storage
  localStorage.removeItem("gespeicherteId");
  localStorage.removeItem("gespeicherteKlasse");
});
}

/*
#################################################################################################################################
#################################################################################################################################
#################################################################################################################################
#################################################################################################################################
*/

// Configseite (Bean)

if (document.body.classList.contains("coffee-detail-page")) {

// Handfilter 
// Defaultwerte setzen

    // Prüfen, ob die Daten erfolgreich geladen wurden UND der Handfilter-Abschnitt existiert
    if (kaffeZubereiterGeladen && kaffeZubereiterGeladen.handfilter) {
        
        // Werte aus dem geladenen Objekt an die HTML-Elemente übergeben
        document.getElementById("Handfilter-Clicks-Default").textContent = 
            kaffeZubereiterGeladen.handfilter.default.clicks;
            
        document.getElementById("Handfilter-Gramm-Default").textContent = 
            kaffeZubereiterGeladen.handfilter.default.gramm;
            
        document.getElementById("Handfilter-Clicks-User").value = kaffeZubereiterGeladen.handfilter.userInput.clicks;
        document.getElementById("Handfilter-Gramm-User").value = kaffeZubereiterGeladen.handfilter.userInput.gramm;

        console.log("Handfilter-Werte erfolgreich aus Local Storage befüllt.");
        
    } else {
        // Fallback, falls die Daten fehlen oder ungültig sind (hier könnte man Standardwerte setzen)
        console.warn("Kaffee-Einstellungen oder 'handfilter'-Sektion im Local Storage nicht gefunden.");
        // Optional: Hier die Standard-Objektwerte setzen, falls das Laden fehlschlägt
    }

/*
document.getElementById("Handfilter-Clicks-Default").textContent = kaffeZubereiter.handfilter.default.clicks;
document.getElementById("Handfilter-Gramm-Default").textContent = kaffeZubereiter.handfilter.default.gramm;
document.getElementById("Handfilter-Gramm-User").value = kaffeZubereiter.handfilter.default.gramm;
*/

// User-Input
document.getElementById("button-handfilter-save").addEventListener("click", () => {
    
    // 1. Eingabewerte aus den Inputs holen
    const newClicks = parseInt(document.getElementById("Handfilter-Clicks-User").value, 10);
    const newGramm = parseInt(document.getElementById("Handfilter-Gramm-User").value, 10);

    // --- Schritt 1: Objekt aus Local Storage laden ---
    
    // Ruft das gesamte Objekt aus dem Local Storage ab
    let kaffeZubereiter = ladeEinstellungen();

    // Prüfen, ob das Objekt geladen wurde und die Handfilter-Struktur existiert
    if (kaffeZubereiter && kaffeZubereiter.handfilter && !isNaN(newClicks) && !isNaN(newGramm)) {
        
        // --- Schritt 2: Spezifische Handfilter-Werte aktualisieren ---
        
        // Die geladenen Werte mit den neuen User-Inputs überschreiben
        kaffeZubereiter.handfilter.userInput.clicks = newClicks;
        kaffeZubereiter.handfilter.userInput.gramm = newGramm;
        kaffeZubereiter.handfilter.userInput.Input = true;

        // Optional: Status-Label aktualisieren (wie in deinem Kommentar angedeutet)
        //document.getElementById("Handfilter-Clicks-Default-Laybel").textContent = "Aktuell";
        //document.getElementById("Handfilter-Gramm-User-Laybel").textContent = "Aktuell";
        
        // --- Schritt 3: Aktualisiertes Objekt zurück in Local Storage speichern ---
        
        speichereEinstellungen(kaffeZubereiter);
        
        console.log("Handfilter-Einstellungen erfolgreich aktualisiert und gespeichert.");

    } else {
        console.error("Fehler: Konnte Einstellungen nicht laden/aktualisieren oder Eingabewerte sind ungültig.");
    }
});

// Zurücksetzen der Werte

document.getElementById("button-handfilter-reset").addEventListener("click", () => {
  // Lade Local Storage
    let kaffeZubereiter = ladeEinstellungen();

    // Prüfen, ob das Objekt geladen wurde und die Handfilter-Struktur existiert
    if (kaffeZubereiter) {
        
       // Setze Local Storage auf Default
      
        // Die geladenen Werte mit den neuen User-Inputs überschreiben
        kaffeZubereiter.handfilter.userInput.clicks = kaffeZubereiter.handfilter.default.clicks;
        kaffeZubereiter.handfilter.userInput.gramm = kaffeZubereiter.handfilter.default.gramm;

        speichereEinstellungen(kaffeZubereiter);
        
        console.log("Handfilter-Einstellungen erfolgreich aktualisiert und gespeichert.");

    } else {
        console.error("Fehler: Konnte Einstellungen nicht laden/aktualisieren oder Eingabewerte sind ungültig.");
    }
   
        // Lade Input Felder neu

        document.getElementById("Handfilter-Clicks-User").value = kaffeZubereiter.handfilter.default.clicks;
        document.getElementById("Handfilter-Gramm-User").value = kaffeZubereiter.handfilter.default.gramm;
});

//#####################
// Frenchpress
//#####################

// Defaultwerte setzen

    // Prüfen, ob die Daten erfolgreich geladen wurden UND der Handfilter-Abschnitt existiert
    if (kaffeZubereiterGeladen && kaffeZubereiterGeladen.frenchpress) {
        
        // Werte aus dem geladenen Objekt an die HTML-Elemente übergeben
        document.getElementById("Frenchpress-Clicks-Default").textContent = 
            kaffeZubereiterGeladen.frenchpress.default.clicks;
            
        document.getElementById("Frenchpress-Gramm-Default").textContent = 
            kaffeZubereiterGeladen.frenchpress.default.gramm;
            
        document.getElementById("Frenchpress-Clicks-User").value = kaffeZubereiterGeladen.frenchpress.userInput.clicks;
        document.getElementById("Frenchpress-Gramm-User").value = kaffeZubereiterGeladen.frenchpress.userInput.gramm;

        console.log("Handfilter-Werte erfolgreich aus Local Storage befüllt.");
        
    } else {
        // Fallback, falls die Daten fehlen oder ungültig sind (hier könnte man Standardwerte setzen)
        console.warn("Kaffee-Einstellungen oder 'handfilter'-Sektion im Local Storage nicht gefunden.");
        // Optional: Hier die Standard-Objektwerte setzen, falls das Laden fehlschlägt
    }

/*
document.getElementById("Handfilter-Clicks-Default").textContent = kaffeZubereiter.handfilter.default.clicks;
document.getElementById("Handfilter-Gramm-Default").textContent = kaffeZubereiter.handfilter.default.gramm;
document.getElementById("Handfilter-Gramm-User").value = kaffeZubereiter.handfilter.default.gramm;
*/

// User-Input
document.getElementById("button-frenchpress-save").addEventListener("click", () => {
    
    // 1. Eingabewerte aus den Inputs holen
    const newClicks = parseInt(document.getElementById("Frenchpress-Clicks-User").value, 10);
    const newGramm = parseInt(document.getElementById("Frenchpress-Gramm-User").value, 10);

    // --- Schritt 1: Objekt aus Local Storage laden ---
    
    // Ruft das gesamte Objekt aus dem Local Storage ab
    let kaffeZubereiter = ladeEinstellungen();

    // Prüfen, ob das Objekt geladen wurde und die Handfilter-Struktur existiert
    if (kaffeZubereiter && kaffeZubereiter.frenchpress && !isNaN(newClicks) && !isNaN(newGramm)) {
        
        // --- Schritt 2: Spezifische Handfilter-Werte aktualisieren ---
        
        // Die geladenen Werte mit den neuen User-Inputs überschreiben
        kaffeZubereiter.frenchpress.userInput.clicks = newClicks;
        kaffeZubereiter.frenchpress.userInput.gramm = newGramm;
        kaffeZubereiter.frenchpress.userInput.Input = true;

        // Optional: Status-Label aktualisieren (wie in deinem Kommentar angedeutet)
        //document.getElementById("Handfilter-Clicks-Default-Laybel").textContent = "Aktuell";
        //document.getElementById("Handfilter-Gramm-User-Laybel").textContent = "Aktuell";
        
        // --- Schritt 3: Aktualisiertes Objekt zurück in Local Storage speichern ---
        
        speichereEinstellungen(kaffeZubereiter);
        
        console.log("Handfilter-Einstellungen erfolgreich aktualisiert und gespeichert.");

    } else {
        console.error("Fehler: Konnte Einstellungen nicht laden/aktualisieren oder Eingabewerte sind ungültig.");
    }
});

// Zurücksetzen der Werte

document.getElementById("button-frenchpress-reset").addEventListener("click", () => {
  // Lade Local Storage
    let kaffeZubereiter = ladeEinstellungen();

    // Prüfen, ob das Objekt geladen wurde und die Handfilter-Struktur existiert
    if (kaffeZubereiter) {
        
       // Setze Local Storage auf Default
      
        // Die geladenen Werte mit den neuen User-Inputs überschreiben
        kaffeZubereiter.frenchpress.userInput.clicks = kaffeZubereiter.frenchpress.default.clicks;
        kaffeZubereiter.frenchpress.userInput.gramm = kaffeZubereiter.frenchpress.default.gramm;

        speichereEinstellungen(kaffeZubereiter);
        
        console.log("Handfilter-Einstellungen erfolgreich aktualisiert und gespeichert.");

    } else {
        console.error("Fehler: Konnte Einstellungen nicht laden/aktualisieren oder Eingabewerte sind ungültig.");
    }
   
        // Lade Input Felder neu

        document.getElementById("Frenchpress-Clicks-User").value = kaffeZubereiter.frenchpress.default.clicks;
        document.getElementById("Frenchpress-Gramm-User").value = kaffeZubereiter.frenchpress.default.gramm;
});

//###############
// Bialetti
//###############

// Defaultwerte setzen
// Prüfen, ob die Daten erfolgreich geladen wurden UND der Handfilter-Abschnitt existiert
    if (kaffeZubereiterGeladen && kaffeZubereiterGeladen.bialetti) {
        
        // Werte aus dem geladenen Objekt an die HTML-Elemente übergeben
        document.getElementById("Bialetti-Clicks-Default").textContent = 
            kaffeZubereiterGeladen.bialetti.default.clicks;
            
        document.getElementById("Bialetti-Gramm-Default").textContent = 
            kaffeZubereiterGeladen.bialetti.default.gramm;
            
        document.getElementById("Bialetti-Clicks-User").value = kaffeZubereiterGeladen.bialetti.userInput.clicks;
        document.getElementById("Bialetti-Gramm-User").value = kaffeZubereiterGeladen.bialetti.userInput.gramm;

        console.log("Bialetti-Werte erfolgreich aus Local Storage befüllt.");
        
    } else {
        // Fallback, falls die Daten fehlen oder ungültig sind (hier könnte man Standardwerte setzen)
        console.warn("Kaffee-Einstellungen oder 'Bialettil'-Sektion im Local Storage nicht gefunden.");
        // Optional: Hier die Standard-Objektwerte setzen, falls das Laden fehlschlägt
    }

/*
document.getElementById("Handfilter-Clicks-Default").textContent = kaffeZubereiter.handfilter.default.clicks;
document.getElementById("Handfilter-Gramm-Default").textContent = kaffeZubereiter.handfilter.default.gramm;
document.getElementById("Handfilter-Gramm-User").value = kaffeZubereiter.handfilter.default.gramm;
*/

// User-Input
document.getElementById("button-bialetti-save").addEventListener("click", () => {
    
    // 1. Eingabewerte aus den Inputs holen
    const newClicks = parseInt(document.getElementById("Bialetti-Clicks-User").value, 10);
    const newGramm = parseInt(document.getElementById("Bialetti-Gramm-User").value, 10);

    // --- Schritt 1: Objekt aus Local Storage laden ---
    
    // Ruft das gesamte Objekt aus dem Local Storage ab
    let kaffeZubereiter = ladeEinstellungen();

    // Prüfen, ob das Objekt geladen wurde und die Handfilter-Struktur existiert
    if (kaffeZubereiter && kaffeZubereiter.frenchpress && !isNaN(newClicks) && !isNaN(newGramm)) {
        
        // --- Schritt 2: Spezifische Handfilter-Werte aktualisieren ---
        
        // Die geladenen Werte mit den neuen User-Inputs überschreiben
        kaffeZubereiter.bialetti.userInput.clicks = newClicks;
        kaffeZubereiter.bialetti.userInput.gramm = newGramm;
        kaffeZubereiter.bialetti.userInput.Input = true;

        // Optional: Status-Label aktualisieren (wie in deinem Kommentar angedeutet)
        //document.getElementById("Handfilter-Clicks-Default-Laybel").textContent = "Aktuell";
        //document.getElementById("Handfilter-Gramm-User-Laybel").textContent = "Aktuell";
        
        // --- Schritt 3: Aktualisiertes Objekt zurück in Local Storage speichern ---
        
        speichereEinstellungen(kaffeZubereiter);
        
        console.log("Bialetti-Einstellungen erfolgreich aktualisiert und gespeichert.");

    } else {
        console.error("Fehler: Konnte Einstellungen nicht laden/aktualisieren oder Eingabewerte sind ungültig.");
    }
});

// Zurücksetzen der Werte

document.getElementById("button-bialetti-reset").addEventListener("click", () => {
  // Lade Local Storage
    let kaffeZubereiter = ladeEinstellungen();

    // Prüfen, ob das Objekt geladen wurde und die bialetti-Struktur existiert
    if (kaffeZubereiter) {
        
       // Setze Local Storage auf Default
      
        // Die geladenen Werte mit den neuen User-Inputs überschreiben
        kaffeZubereiter.bialetti.userInput.clicks = kaffeZubereiter.bialetti.default.clicks;
        kaffeZubereiter.bialetti.userInput.gramm = kaffeZubereiter.bialetti.default.gramm;

        speichereEinstellungen(kaffeZubereiter);
        
        console.log("bialetti-Einstellungen erfolgreich aktualisiert und gespeichert.");

    } else {
        console.error("Fehler: Konnte Einstellungen nicht laden/aktualisieren oder Eingabewerte sind ungültig.");
    }
   
        // Lade Input Felder neu

        document.getElementById("Bialetti-Clicks-User").value = kaffeZubereiter.bialetti.default.clicks;
        document.getElementById("Bialetti-Gramm-User").value = kaffeZubereiter.bialetti.default.gramm;
});

}