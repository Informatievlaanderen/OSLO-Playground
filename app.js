const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const SHACLValidator = require('shacl-js');
const fetch = require('node-fetch');
const rdf = require('rdf-ext');
const jsonld = require('jsonld');
const N3 = require('n3');

//////////////////////
// Helper functions //
//////////////////////
const URLMapping = {
    "Adresregister" : "https://data.vlaanderen.be/shacl/adresregister-SHACL.ttl",
    "Besluit Publicatie" : "https://data.vlaanderen.be/shacl/besluit-publicatie-SHACL.ttl",
    "Dienstencataloog" : "https://data.vlaanderen.be/shacl/dienstencataloog-SHACL.ttl",
    "Generiek-basis" : "https://data.vlaanderen.be/shacl/generiek-basis-SHACL.ttl",
    "Generiek terugmeldfaciliteit" : "https://data.vlaanderen.be/shacl/generieke-terugmeldfaciliteit-SHACL.ttl",
    "Notificatie-basis" : "https://data.vlaanderen.be/shacl/notificatie-basis-SHACL.ttl",
    "Organisatie-basis" : "https://data.vlaanderen.be/shacl/organisatie-basis-SHACL.ttl",
    "Persoon-basis" : "https://data.vlaanderen.be/shacl/persoon-basis-SHACL.ttl",
    "Subsidieregister" : "https://data.vlaanderen.be/shacl/subsidieregister-SHACL.ttl",
    "Contactvoorkeuren" : "https://data.vlaanderen.be/shacl/contactvoorkeuren-SHACL.ttl",
    "Dienst transactiemodel" : "https://data.vlaanderen.be/shacl/dienst-transactiemodel-SHACL.ttl",
    "Vlaamse codex" : "https://data.vlaanderen.be/shacl/vlaamse-codex-SHACL.ttl"
}

const { quad, namedNode, literal, blankNode, defaultGraph } = N3.DataFactory;
function resolveRDFTerm(term){
    switch (term.termType) {
        case "NamedNode":
            return namedNode(term.value);
        case "BlankNode":
            return blankNode(term.value.substring(2));
        case "Literal":
            return literal(term.value, namedNode(term.datatype.value));
        case "DefaultGraph":
            return defaultGraph();
        default:
            throw new Error(`Unknown term type: ${term.termType}`);
    }
}

function serializedata(quads){
    return new Promise(resolve => {
        const writer = new N3.Writer({format: 'text/turtle'});
        for(const i in quads){
            writer.addQuad(quad(resolveRDFTerm(quads[i].subject), resolveRDFTerm(quads[i].predicate), resolveRDFTerm(quads[i].object), resolveRDFTerm(quads[i].graph)));
        }
        writer.end((error, doc) => {
            error ? reject(error) : resolve(doc);
        });

    });
}

///////////////////
// Router config //
///////////////////

const PORT = 3000;

router.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use(express.static(__dirname + '/src'));
app.listen(PORT);
console.log('[Server]: running at port ' + PORT);

////////////
// Routes //
////////////

router.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

router.post('/shacl-validation', async (req,res) => {
    const shape = req.body.shapes;
    const data = req.body.data;

    const quads = await jsonld.toRDF(JSON.parse(data));
    const turtleData = await serializedata(quads);

    let ShapeURL = URLMapping[shape];

    let shapeData = await new Promise(resolve => {
        fetch(ShapeURL).then(res => res.text()).then(body => resolve(body));
    });

    var validator = new SHACLValidator();
    validator.validate(turtleData, "text/turtle", shapeData, "text/turtle", function (e, report) {
        res.send({result: report.results(), conforms: report.conforms()});
        /*console.log("Conforms? " + report.conforms());
        if (report.conforms() === false) {
            report.results().forEach(function(result) {
                console.log("\tMessage: " + result.message());
            });
        }*/
    });




});

router.post('/examples', async function(req,res) {
    let example = req.body.example;
    example = example.toLowerCase();
    res.sendFile(path.join(__dirname + '/examples/' + example + '.jsonld'));
});




