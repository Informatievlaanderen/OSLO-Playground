const jsonld = new window.jsonld;
//import { Tabs } from '@govflanders/vl-ui-tabs';
//import { Select } from '@govflanders/vl-ui-select';
//import { Sidenavigation } from '@govflanders/vl-ui-side-navigation';

const shaclOptions = ["Adresregister", "Besluit Publicatie", "Dienstencataloog", "Generiek-basis", "Generiek terugmeldfaciliteit",
    "Notificatie-basis", "Organisatie-basis", "Persoon-basis", "Subsidieregister", "Contactvoorkeuren", "Dienst transactiemodel", "Vlaamse codex"];

let currentOption = "";

window.onload = function () {
    init();
    fillShaclSelector();
    currentOption = "parse";
};

// Init function to add methods to onclick event of their buttons.
function init(){
    // See parsing as default
    parseClick();

    // Parse, framing and shacl buttons - add functions
    document.getElementById('parse_option_button').onclick = function(){parseClick};
    document.getElementById('parse_option_button').addEventListener("click", parseClick);
    document.getElementById('shacl_option_button').onclick = function(){shaclClick};
    document.getElementById('shacl_option_button').addEventListener("click", shaclClick);
    document.getElementById('frame_option_button').onclick = function(){frameClick()};
    document.getElementById('frame_option_button').addEventListener("click", frameClick);

    // Execute button - execute the chosen request (framing or shacl validation)
    document.getElementById('execute_button').onclick = function(){executeRequest};
    document.getElementById('execute_button').addEventListener("click", executeRequest);

    // Reset button
    document.getElementById('reset_button').onclick = function(){reset};
    document.getElementById('reset_button').addEventListener("click", reset);


    // Buttons for examples - to generate examples for the user
    document.getElementById('organization_button').onclick = function(){getOrganisationTemplate};
    document.getElementById('organization_button').addEventListener("click", getOrganisationTemplate);
    document.getElementById('address_button').onclick = function(){getAddressTemplate};
    document.getElementById('address_button').addEventListener("click", getAddressTemplate);
    /*document.getElementById('building_button').onclick = function(){getBuildingTemplate};
    document.getElementById('building_button').addEventListener("click", getBuildingTemplate);*/
}


// Function to execute the parsing, framing or the validation
function executeRequest(){
    if(currentOption === 'frame'){
        frame();
    } else if(currentOption === 'parse') {
        parseJsonLd()
    } else {
        shaclValidation();
    }
}

// Clear all input
function reset(){
    document.getElementById('ld_input_area').value = "";
    document.getElementById('frame_area').value = "";
}

// Initialiaze select for Shacl validation
function fillShaclSelector(){
    for(let i in shaclOptions){
        let option = document.createElement("option");
        option.value = shaclOptions[i];
        option.innerHTML = shaclOptions[i];

        document.getElementById('selection_ap').appendChild(option);
    }
}

/////////////////////////////////////////////////////////
// Functions for parsing, frame and validation buttons //
/////////////////////////////////////////////////////////
function parseClick(){
    document.getElementById('left_div').className = "vl-col--12-12";
    document.getElementById('right_div').style.display = "none";

    document.getElementById('parse_option_button').className = "vl-button vl-button--secondary vl-button--icon-before";
    document.getElementById('shacl_option_button').className = "vl-button";
    document.getElementById('frame_option_button').className = "vl-button";

    document.getElementById('frame_area').style.display = "inline";
    document.getElementById('selection_div').style.display = "none";
    document.getElementById('option_title').innerText = "JSON-LD Frame";

    // Show framing area input
    document.getElementById('ld_input_div').style.display = "inline";

    currentOption = "parse";
}

function frameClick(){
    document.getElementById('left_div').className = "vl-col--6-12";
    document.getElementById('right_div').style.display = "inline";

    document.getElementById('frame_option_button').className = "vl-button vl-button--secondary vl-button--icon-before";
    document.getElementById('shacl_option_button').className = "vl-button";
    document.getElementById('parse_option_button').className = "vl-button";

    document.getElementById('frame_area').style.display = "inline";
    document.getElementById('frame_area').value = "{}";

    document.getElementById('selection_div').style.display = "none";
    document.getElementById('option_title').innerText = "JSON-LD Frame";

    // Show framing area input
    document.getElementById('ld_input_div').style.display = "inline";

    currentOption = "frame";
}

function shaclClick(){
    document.getElementById('left_div').className = "vl-col--6-12";
    document.getElementById('right_div').style.display = "inline";

    // Shacl validation button
    document.getElementById('shacl_option_button').className = "vl-button vl-button--secondary vl-button--icon-before";
    document.getElementById('frame_option_button').className = "vl-button";
    document.getElementById('parse_option_button').className = "vl-button";
    document.getElementById('frame_area').style.display = "none";

    // Dropdown with application profiles en title
    document.getElementById('selection_div').style.display = "inline";
    document.getElementById('option_title').innerText = "Kies het OSLO² applicatie profiel waartegen u uw data wil valideren.";

    currentOption = "shacl";
}


//////////////////////////////////////
// Template generators for examples //
//////////////////////////////////////
function getOrganisationTemplate(){
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/examples/organisatie');
    req.onload = function(){
        document.getElementById('ld_input_area').value = req.response;
    };
    req.send();
}

function getAddressTemplate(){
    let req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:3000/examples/adres');
    req.onload = function(){
        document.getElementById('ld_input_area').value = req.response;
    };
    req.send();
}

// TODO : other examples --> person and gebouwen (of adres)

////////////////////////////////////////

////////////////////
// Parse function //
////////////////////
async function parseJsonLd(){
    var doc = JSON.parse(document.getElementById('ld_input_area').value);
    jsonld.toRDF(doc, {format: 'application/n-quads'}, (err, quads) => {
       if(err) throw err;

       document.getElementById('result_area').value = quads;
       document.getElementById('result_area').scrollIntoView();
    });
}

//////////////////////
// Framing function //
//////////////////////
async function frame(){
    var doc = JSON.parse(document.getElementById('ld_input_area').value);
    var frame = JSON.parse(document.getElementById('frame_area').value);

    const framed = await jsonld.frame(doc, frame);
    document.getElementById('result_area').value = JSON.stringify(framed, null, 4);
}

//////////////////////
// Shacl validation //
//////////////////////
async function shaclValidation(){
    var doc = (document.getElementById('ld_input_area').value);
    var application_profile = document.getElementById('selection_ap').value;

    // We take the input from the text area, POST it to our backend
    // who creates a temporary file and sends it to the OSLO² SHACL validator.
    // Our backend sends back te result
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/shacl-validation", true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    // Respons will be processed here
    request.onload = function(){
        let report = JSON.parse(request.response);
        let results = report.result;
        let conforms = report.conforms;

        // Creation of resultText (can be improved)
        let resultText = "";
        resultText += "sh:conforms " + conforms + ";";
        for(let index in results){
            let result = results[index].resultNode;
            let resultObject = {};
            Object.keys(result).forEach( prop => {
                if(prop !== "@id" && prop !== "@type"){
                    resultObject[prop] = result[prop][0]["@id"];
                }
            });
            resultText += "\nsh:result " + JSON.stringify(resultObject, null, 4);
        }
        document.getElementById('result_area').value = resultText;
        document.getElementById('result_area').scrollIntoView();
    };

    request.send("shapes=" + application_profile + "&data=" + doc);
}
