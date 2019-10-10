# OSLO playground

De OSLO playground is een eigen playground voor developers die aan de slag willen gaan met OSLO datastandaarden. Deze playground is gebaseerd op de reeds bestaande JSON-LD playground.

De bedoeling is dat er gewerkt wordt met JSON-LD. Developers kunnen kiezen om hun eigen JSON-LD input mee te geven of om met een voorbeeld aan de slag te gaan. De voorbeelden die reeds beschikbaar zijn, zijn **Organisatie**, **Adres** en **Gebouwregister** (wordt nog aan gewerkt).

Ontwikkelaars hebben 3 mogelijkheden in de playground:
<ul>
  <li><b>Parsen</b> : de JSON-LD input parsen naar quads</li>
  <li><b>Framen</b> : de JSON-LD input herstructureren met behulp van een JSON-LD frame</li>
  <li><b>SHACL validatie</b> : valideren van de input ten opzichte van een OSLO Applicatieprofiel</li>
</ul>  


## Installatie

### via Docker

Om de applicatie via Docker te laten draaien, moet er eerst een image aangemaakt worden. Navigeer daarvoor eerst naar de map waar de `Dockerfile` staat. Omdat deze applicatie private npm packages van @govflanders bevat, moet er eerst een npm token aangemaakt worden. Eenmaal er een token is aangemaakt, kan de docker image gemaakt worden met volgend commando:

```
docker build --build-arg NPM_TOKEN=XXX -t playground .  # Vervang XXX door je eigen npm token
```

Nadat de docker image is gemaakt, kan deze uitgevoerd worden:
```
docker run -p 3000:3000 playground
```

### zonder Docker

Het is ook mogelijk om de applicatie te starten zonder Docker. Hiervoor moet eerst het bestand `.npmrc` leeg gemaakt worden, anders wordt telkens een foutmelding weergegeven. Vervolgens dienen volgende commando's uitgevoerd te worden:

```
> git clone https://github.com/Informatievlaanderen/OSLO-playground
> cd OSLO-playground
> npm install
> npm run build
> node app.js
```

**Opmerking: indien je niet tot de organisatie @govflanders behoord op npmjs.com, dan zal het niet lukken om het __build__-script uit te voeren.** 
