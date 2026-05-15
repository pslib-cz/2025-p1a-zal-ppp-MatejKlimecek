# Miny (Minesweeper) – katalog funkčních požadavků

Tento dokument shrnuje funkční požadavky pro hru typu **Minesweeper (miny)** v MakeCode Arcade.

## Základní ovládání
- **Šipky**: pohyb kurzoru
- **A**: odhalení políčka
- **B**: označení/odznačení (vlaječka)

---

## Funkční požadavky (FR)

### FR-01 Home screen + spuštění hry (PLÁNOVÁNO)
**Popis:** Hra po spuštění zobrazí úvodní obrazovku (menu).  
**Akceptační kritéria:**
- Po spuštění se zobrazí **Home screen** s názvem hry a instrukcí k ovládání.
- Hráč může na Home screen zvolit **počet bomb** (např. výběrem z několika hodnot).
- Po stisku **A** se hra spustí s vybraným počtem bomb.

### FR-02 Inicializace hry a herního pole
**Popis:** Po startu hry se vytvoří herní pole a nastaví výchozí stav.  
**Akceptační kritéria:**
- Vytvoří se čtvercová mřížka políček.
- Všechna políčka jsou na začátku **neodhalená** a **neoznačená**.
- Kurzor je na platné startovní pozici.

### FR-03 Pohyb kurzoru
**Popis:** Hráč může pohybovat kurzorem po herním poli.  
**Akceptační kritéria:**
- Šipky posunují kurzor o 1 políčko.
- Kurzor se nedostane mimo okraje pole.
- Aktuální políčko je zvýrazněno.

### FR-04 Označení políčka
**Popis:** Hráč může označit/odznačit políčko jako podezřelé z miny.  
**Akceptační kritéria:**
- **B** přepíná stav označení (toggle).
- Označené políčko má odlišnou grafiku.

### FR-05 Odhalení políčka
**Popis:** Hráč může odhalit aktuální políčko.  
**Akceptační kritéria:**
- **A** odhalí políčko, pokud není označené.
- Označené políčko nelze odhalit.

### FR-06 Bezpečný první tah + rozmístění min
**Popis:** Miny se rozmístí až po prvním odhalení tak, aby první políčko nebylo mina.  
**Akceptační kritéria:**
- Před prvním tahem nejsou rozmístěné miny.
- Po prvním odhalení se vygeneruje zvolený počet min.
- První odhalené políčko není mina.

### FR-07 Čísla a automatické odhalování
**Popis:** Hra počítá sousední miny (0–8) a u prázdných políček odhaluje okolí.  
**Akceptační kritéria:**
- Odhalené bezpečné políčko ukáže číslo 0–8.
- Pokud je číslo 0, hra automaticky odhalí sousedy (flood fill).
- Označená políčka se automaticky neodhalují.

### FR-08 Prohra po odhalení miny
**Popis:** Pokud hráč odhalí minu, prohrává.  
**Akceptační kritéria:**
- Odhalená mina se zobrazí graficky.
- Hra vyhodnotí prohru (konec hry / blokace vstupů / hláška).

---