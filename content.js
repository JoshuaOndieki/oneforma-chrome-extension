/*
author: Joshua Ondieki
github: htpps:github.com/JoshuaOndieki
*/


  // Temporarily fix for objects without delete button

  // setTimeout(function(){ fixDeleteButton(); }, 10000);

  function fixDeleteButton(){
      var iframe = document.getElementById('webapp_frame').contentWindow;
      while (iframe.document.getElementById('query_table').rows.length === 1) {
          console.log('fixing..');
      }
      console.log(iframe.document.getElementById('query_table').rows.length);
      iframe.document.querySelectorAll('tr').forEach(function(row){
          try {
              console.log('here');
              console.log(row);
              console.log(row.getElementsByTagName('td')[8].innerHTML);
              if (row.getElementsByTagName('td')[8].innerHTML === '') {
                  row.getElementsByTagName('td')[8].innerHTML = '<button type="button" onclick="DeleteRow(this.parentElement.parentElement.rowIndex);" class="btn btn-sm btn-danger temporary-fix-button"><i class="fa fa-trash"></i></button>';
                  console.log('buttonfix');
              }
          } catch (err) {
              console.log(err.message);
          } finally {
              console.log('finally');
          }
      });
  }

  // End temporary fix ^^^



window.onload = function checkIframeLoaded() {
    console.log('checking if iframe is loaded...');
    // Get a handle to the iframe element
    var iframe = document.getElementById('webapp_frame');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Check if loading is complete
    if (  iframeDoc.readyState  == 'complete' ) {
        console.log('iframe ready state complete...');
        iframe.onload = function(){
            console.log('iframe loaded!');
            formaWrapper();

            setTimeout(function(){ fixDeleteButton(); }, 10);
            // iframe.contentWindow.document.getElementById('query_table').addEventListener('load', fixDeleteButton());

        };
        return true;
    };

    // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
    console.log('retrying iframe load...');
    window.setTimeout(checkIframeLoaded, 100);
}


function formaWrapper(){
    var iframe = document.getElementById('webapp_frame').contentWindow;
    var words = [];
    var table = iframe.document.getElementById('query_table');

    var query_box = iframe.document.getElementById('query_box');

    query_box.style.display = 'inline-block';
    query_box.style.textAlign = 'center';
    query_box.style.height = '30px';
    query_box.style.width = '100%';
    query_box.style.fontSize = 'large';

    var styles = String.raw`
    #formamain{
    width: 600px;
    height: 220px;
    margin: auto;
    background: #f5f5f5;
    color: white;


    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    /*
    -webkit-box-align: center;
    -ms-flex-align: center;
    */
    align-items: center;
    /*
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    */
    }


    #formalabels{
      width: 80%;
      height: 95%;
      display: inline-block;
      border-style: double;
      border-width: 5px;
      border-color: green;
      float: left;
      top: auto;
      bottom: auto;
      position: relative;
    }

    #formabuttons{
      display: inline-block;
      width: 18%;
      border-color: green;
      top: auto;
      bottom: auto;
      position: relative;
      margin-left: 2px
    }

    #formacreateobject {
      background-color: #44c767;
    	-moz-border-radius: 8px;
    	-webkit-border-radius: 8px;
    	border-radius: 8px;
    	border: 1px solid #18ab29;
    	display: inline-block;
    	cursor: pointer;
    	color: #ffffff;
    	font-family: Arial;
    	font-size: 17px;
    	font-weight: bold;
    	padding: 10px 15px;
    	text-decoration: none;
    	text-shadow: 0px 1px 0px #2f6627;
    }
    #formacreateobject:hover {
    	background-color:#5cbf2a;
    }
    #formacreateobject:active {
    	position:relative;
    	top:1px;
    }


    #formawords{
      color: black;
      width: 80%;
      text-align: center;
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-top: 5px
    }

    #formabooleans{
      width: 95%;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    #formabooleans>button{
      background: tomato;
      border: none;
      height: 30px;
      margin: 2px;
    }

    #formaattributesheading, #formavattributesheading{
      text-align: center;
      text-decoration: underline;
      margin: 4px;
      color: fuchsia;
      text-transform: initial
    }

    #formaattributes, #formavattributes{
      display: block;
      justify-content: center;
      width: 99%;
      margin-left: auto;
      margin-right: auto
    }

    .formaattrbtns{
      border: none;
      height: 25px;
      color: black;

      display: inline-block;
      top: auto;
      bottom: auto;
      position: relative;
  }

  .col-lg-10 > .row:not(last-child){
      display: inline-flex;
      margin-left: 0;
      width: min-content;
      margin-right: 0
  }

  .col-lg-10{
      margin-left: 0;
      width: max-content;
      padding: 3px
  }

  .panel-body{
      padding-left: 0px
  }

  .col-sm-12{
      padding: 0px
  }

  #query_table{
      font-size: 11px;
  }

  #formaattributesbuttons, #formavattributesbuttons{
      display: flex;
      justify-content: center
  }

  #submit_button{
      width: 80%
  }

  .temporary-fix-button{
      background-color: blue;
      border-color: blue;
  }

  `;


    head = iframe.document.head || iframe.document.getElementsByTagName('head')[0];
    style = iframe.document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
      // This is required for IE8 and below.
      style.styleSheet.cssText = styles;
    } else {
      style.appendChild(iframe.document.createTextNode(styles));
    }


    var formamain = iframe.document.createElement('DIV');
    formamain.id = 'formamain'; iframe.document.getElementById('TX_textbox_container').appendChild(formamain);

    var formalabels = iframe.document.createElement('DIV');
    formalabels.id = 'formalabels';
    iframe.document.getElementById('formamain').appendChild(formalabels);

    var formawords = iframe.document.createElement('INPUT');
    formawords.id = 'formawords';
    formawords.placeholder = 'words';
    formawords.value = iframe.document.getElementById('query_box').value;
    iframe.document.getElementById('formalabels').appendChild(formawords);

    var formabr = iframe.document.createElement('BR');
    iframe.document.getElementById('formalabels').appendChild(formabr);

    var formabooleans = iframe.document.createElement('DIV');
    formabooleans.id = 'formabooleans';
    iframe.document.getElementById('formalabels').appendChild(formabooleans);

    var formaadult = iframe.document.createElement('BUTTON');
    formaadult.id = 'formaadult';
    formaadult.value = 'no';
    formaadult.innerHTML = 'ADULT RELATED';
    iframe.document.getElementById('formabooleans').appendChild(formaadult);
    iframe.document.getElementById('formaadult').addEventListener('click', function(){
        booleanSwitch('formaadult');
    });

    var formaceleb = iframe.document.createElement('BUTTON');
    formaceleb.id = 'formaceleb';
    formaceleb.value = 'no';
    formaceleb.innerHTML = 'CELEBRITY';
    iframe.document.getElementById('formabooleans').appendChild(formaceleb);
    iframe.document.getElementById('formaceleb').addEventListener('click', function(){
        booleanSwitch('formaceleb');
    });

    var formainstance = iframe.document.createElement('BUTTON');
    formainstance.id = 'formainstance';
    formainstance.value = 'no';
    formainstance.innerHTML = 'INSTANCE L';
    iframe.document.getElementById('formabooleans').appendChild(formainstance);
    iframe.document.getElementById('formainstance').addEventListener('click', function(){
        booleanSwitch('formainstance');
    });

    var formavintent = iframe.document.createElement('BUTTON');
    formavintent.id = 'formavintent';
    formavintent.value = 'no';
    formavintent.innerHTML = 'VISUAL INTENT';
    iframe.document.getElementById('formabooleans').appendChild(formavintent);
    iframe.document.getElementById('formavintent').addEventListener('click', function(){
        booleanSwitch('formavintent');
    });

    var formaattributes = iframe.document.createElement('DIV');
    formaattributes.id = 'formaattributes';
    iframe.document.getElementById('formalabels').appendChild(formaattributes);

    var formaattributesheading = iframe.document.createElement('H4');
    formaattributesheading.innerHTML = 'Attributes';
    formaattributesheading.id = 'formaattributesheading';
    iframe.document.getElementById('formaattributes').appendChild(formaattributesheading);

    var formaattributesselect = iframe.document.createElement('SELECT');
    formaattributesselect.id = 'formaattributesselect';
    formaattributesselect.style.display = 'none';
    formaattributesselect.multiple = 'multiple';
    iframe.document.getElementById('formaattributes').appendChild(formaattributesselect);

    var formaattributesbuttons = iframe.document.createElement('DIV');
    formaattributesbuttons.id = 'formaattributesbuttons';
    iframe.document.getElementById('formaattributes').appendChild(formaattributesbuttons);


    var formavattributes = iframe.document.createElement('DIV');
    formavattributes.id = 'formavattributes';
    iframe.document.getElementById('formalabels').appendChild(formavattributes);

    var formavattributesheading = iframe.document.createElement('H4');
    formavattributesheading.innerHTML = 'Visual Attributes';
    formavattributesheading.id = 'formavattributesheading';
    iframe.document.getElementById('formavattributes').appendChild(formavattributesheading);

    var formavattributesselect = iframe.document.createElement('SELECT');
    formavattributesselect.id = 'formavattributesselect';
    formavattributesselect.style.display = 'none';
    formavattributesselect.multiple = 'multiple';
    iframe.document.getElementById('formavattributes').appendChild(formavattributesselect);

    var formavattributesbuttons = iframe.document.createElement('DIV');
    formavattributesbuttons.id = 'formavattributesbuttons';
    iframe.document.getElementById('formavattributes').appendChild(formavattributesbuttons);

    setFormaAttributes();

    var formabuttons = iframe.document.createElement('DIV');
    formabuttons.id = 'formabuttons';
    iframe.document.getElementById('formamain').appendChild(formabuttons);

    var formacreateobject = iframe.document.createElement('BUTTON');
    formacreateobject.id = 'formacreateobject';
    formacreateobject.innerHTML = 'CREATE OBJECT';
    formacreateobject.addEventListener('click', function(){
        formaCreateObject();
    });
    iframe.document.getElementById('formabuttons').appendChild(formacreateobject);

    function getSelectionText() {
        var text = '';
        var activeEl = iframe.document.activeElement;
        var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
        if (
          (activeElTagName == 'textarea') || (activeElTagName == 'input' &&
          /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
          (typeof activeEl.selectionStart == 'number')
        ) {
            text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
        } else if (iframe.getSelection) {
            text = iframe.getSelection().toString();
        }
        return text;
    }

    function deselect(){
      var selection = ('getSelection' in iframe)
        ? iframe.getSelection()
        : ('selection' in document)
          ? iframe.document.selection
          : null;
      if ('removeAllRanges' in selection){
          selection.removeAllRanges();
      }
      else if ('empty' in selection){
          selection.empty();
      }
  }


    iframe.onmouseup = iframe.onkeyup = iframe.onselectionchange = function() {
        if( getSelectionText() != ''){
            iframe.document.getElementById('formawords').value = getSelectionText();
            setFormaAttributes();
            // deselect(); // Temporarily disable this functionality to enable copying text and also searching the selected text.
        }

    };

    iframe.document.getElementById('formawords').onkeydown = iframe.document.getElementById('formawords').onkeypress = iframe.document.getElementById('formawords').onkeyup = function() {
        setFormaAttributes();
    };

    function booleanSwitch(buttonId){
        button = iframe.document.getElementById(buttonId);
        if (button.value ==='yes'){
            button.value = 'no';
            button.style.background = 'tomato';
        }
        else{
            button.value = 'yes';
            button.style.background = '#20a91e';
        }
    }

    function setFormaAttributes(){
        var attributeoptions = iframe.document.getElementById('formawords').value.split(' ');
        select = iframe.document.getElementById('formaattributesselect');
        select.innerHTML = '';
        selectv = iframe.document.getElementById('formavattributesselect');
        selectv.innerHTML = '';

        var btns = iframe.document.getElementsByClassName("formaattrbtns");
        for(var i = btns.length - 1; 0 <= i; i--){
            if(btns[i] && btns[i].parentElement)
            btns[i].parentElement.removeChild(btns[i]);
        }
        var count;
        for (count = 0; count < attributeoptions.length; count++){
            var option = iframe.document.createElement('OPTION');
            option.value = attributeoptions[count];
            option.innerHTML = attributeoptions[count];
            option.style.color = 'black';
            select.appendChild(option);

            var formaattributesbtn = iframe.document.createElement('BUTTON');
            formaattributesbtn.innerHTML = attributeoptions[count];
            formaattributesbtn.className = 'formaattrbtns';
            formaattributesbtn.id = 'formaattributesbuttonid-' + count;
            formaattributesbtn.addEventListener('click', function(){
                addRemoveAttribute('attribute', this.id.split('-')[1]);
            });
            iframe.document.getElementById('formaattributesbuttons').appendChild(formaattributesbtn);


            var optionv = iframe.document.createElement('OPTION');
            optionv.value = attributeoptions[count];
            optionv.innerHTML = attributeoptions[count];
            optionv.style.color = 'black';
            selectv.appendChild(optionv);

            var formavattributesbtn = iframe.document.createElement('BUTTON');
            formavattributesbtn.innerHTML = attributeoptions[count];
            formavattributesbtn.className = 'formaattrbtns';
            formavattributesbtn.id = 'formavattributesbuttonid-' + count;
            formavattributesbtn.addEventListener('click', function(){
                addRemoveAttribute('vattribute', this.id.split('-')[1]);
            });
            iframe.document.getElementById('formavattributesbuttons').appendChild(formavattributesbtn);

        }
    }

    function addRemoveAttribute(type, index){
        console.log(type + index);
        if(type == 'attribute'){
            var options = iframe.document.getElementById('formaattributesselect').options;
            console.log(options);
            var isselected = options[index].selected;
            if (isselected){
                options[index].selected = false;
                iframe.document.getElementById('formaattributesbuttonid-' + index).style.background = '#dddddd';
            }
            else{
                options[index].selected = true;
                iframe.document.getElementById('formaattributesbuttonid-' + index).style.background = 'fuchsia';
            }
        }
        else if(type == 'vattribute'){
            var options = iframe.document.getElementById('formavattributesselect').options;
            console.log(options);
            var isselected = options[index].selected;
            if (isselected){
                options[index].selected = false;
                iframe.document.getElementById('formavattributesbuttonid-' + index).style.background = '#dddddd';
            }
            else{
                options[index].selected = true;
                iframe.document.getElementById('formavattributesbuttonid-' + index).style.background = 'fuchsia';
            }
        }
    }

    function formaCreateObject(){

        var object = iframe.document.getElementById('formawords');
        var word = object.value;
        var new_index = iframe.document.getElementById('query_box').value.split(word)[0].length;
    	var wordindex = object.value + new_index;

        function validQuery(query){
            for (var i = 0; i < word.split().length; i++) {
                if(iframe.document.getElementById('query_box').value.includes(query[i]) === false) {
                    return false
                }
            }
            return true
        }

        if(validQuery(word.split(' ')) === false){
            alert('The object you intend to create does not appear in the query!');
            return false;
        }

        if(words.indexOf(wordindex) > -1){
            console.log(words);
            alert("This word has been already labelled");
            return false;
            }

    	var formapossibleattributes = getSelectValues(iframe.document.getElementById('formaattributesselect'));
        console.log(formapossibleattributes);
    	var formapossiblevattributes = getSelectValues(iframe.document.getElementById('formavattributesselect'));
        console.log(formapossiblevattributes);
    	for(var i = 0;i<formapossibleattributes.length;i++){
    		for(var z = 0;z<formapossiblevattributes.length; z++){
    			if(formapossibleattributes[i] == formapossiblevattributes[z]){
    				alert("The same attribute can't be both visual and non-visual");
    				return false;
    			}
    		}
    	}
    	for(var i = 0;i<formapossiblevattributes.length;i++){
    		for(var z = 0;z<formapossibleattributes.length; z++){
    			console.log(formapossibleattributes[z]);
    			console.log(formapossiblevattributes[i]);
    			if(formapossiblevattributes[i] == formapossibleattributes[z]){
    				alert("The same attribute can't be both visual and non-visual");
    				return false;
    			}
    		}
    	}

    	if(new_index > table.rows.length){
    		new_index = -1;
    	}
    	else if(new_index == 0){
    		new_index = 1;
    	}
    	// Create the table
    	var row = table.insertRow(new_index);
    	var cell1 = row.insertCell(0);
    	var cell2 = row.insertCell(1);
    	var cell3 = row.insertCell(2);
    	var cell4 = row.insertCell(3);
    	var cell5 = row.insertCell(4);
    	var cell6 = row.insertCell(5);
    	var cell7 = row.insertCell(6);
    	var cell8 = row.insertCell(7);
    	var cell9 = row.insertCell(8);
    	var cell10 = row.insertCell(9);

    	cell10.innerHTML = wordindex;
    	cell10.style.display = "none";
    	cell1.innerHTML = word;
    	cell2.innerHTML = "object";
    	// Populate the values of the cell
    	cell3.innerHTML = iframe.document.getElementById("formaadult").value;
    	cell4.innerHTML = iframe.document.getElementById("formaceleb").value
    	cell5.innerHTML = iframe.document.getElementById("formainstance").value;
    	cell6.innerHTML = iframe.document.getElementById("formavintent").value;

    	cell7.innerHTML = "";
    	if(formapossibleattributes.length > 0){
    		cell7.innerHTML = formapossibleattributes.join(',');

    	}

    	cell8.innerHTML = "";
    	if(formapossiblevattributes.length > 0){
            console.log(formapossiblevattributes);
    		cell8.innerHTML = formapossiblevattributes.join(',');


    	}
    	cell9.innerHTML = '<button type="button" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>';
        cell9.getElementsByTagName('button')[0].addEventListener('click', function(){
            formaDeleteRow(this.parentElement.parentElement.rowIndex);
        });

    	// Push the object and the index
    	words.push(wordindex);
    }

    function formaDeleteRow(index){
    	var row = table.rows[index];
    	var wordindex = row.cells[9].innerHTML;
    	words = words.filter(function(value, index, arr){
            return value != wordindex;
        });
    	table.deleteRow(index);

    }

    function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }


  // document.getElementById("myForm").onsubmit = function() {
  // alert('edrtfvgy');
  // return false;
  // };
  //
  // iframe.document.getElementById('labelling_form').onsubmit = function(){
  //     var labeledObjects = iframe.document.getElementById('query_table').tHead;
  //     labeledObjects.shift();
  //     console.log('labeled objects');
  //     console.log(labeledObjects);
  //     var wordsLabeled = [];
  //     labeledObjects.forEach(item => wordsLabeled.push([item.cells[0].value.split(' ')]));
  //     console.log('labeled words');
  //     console.log(wordsLabeled);
  //     console.log('All query words');
  //     console.log(iframe.document.getElementById('query_box').value.split(' '));
  //     return false;
  // };

  var countdown = iframe.document.createElement('IFRAME');
  var html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Circular Countdown CSS Animation</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="robots" content="noindex, nofollow">
    <meta name="googlebot" content="noindex, nofollow">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="https://code.jquery.com/jquery-git.js">
    </script>
    <style id="compiled-css" type="text/css">
    html, body {
        height: 100%;
    }

    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -50px;
    }

    /* -- CIRCLE -- */
    .circle {
        width: 100px;
        height: 100px;
        position: relative;
        border-radius: 999px;
        box-shadow: inset 0 0 0 20px rgba(255, 255, 255, 0.5);
    }

    .l-half, .r-half {
        float: left;
        width: 50%;
        height: 100%;
        overflow: hidden;
    }

    .l-half:before, .r-half:before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 20px solid white;
        -webkit-animation-duration: 20s;
        -webkit-animation-iteration-count: 1;
        -webkit-animation-timing-function: linear;
        -webkit-animation-fill-mode: forwards;
    }

    .l-half:before {
        border-right: none;
        border-top-left-radius: 999px;
        border-bottom-left-radius: 999px;
        -webkit-transform-origin: center right;
        -webkit-animation-name: l-rotate;
    }

    .r-half:before {
        border-left: none;
        border-top-right-radius: 999px;
        border-bottom-right-radius: 999px;
        -webkit-transform-origin: center left;
        -webkit-animation-name: r-rotate;
    }

    /* -- TIMER -- */
    .count {
        position: absolute;
        width: 100%;
        line-height: 100px;
        text-align: center;
        font-weight: 800;
        font-size: 30px;
        font-family: Helvetica;
        color: white;
        z-index: 2;
        -webkit-animation: fadeout 0.5s 21s 1 linear;
        -webkit-animation-fill-mode: forwards;
    }
    </style>

    <!-- TODO: Missing CoffeeScript 2 -->

    <script type="text/javascript">
    $(window).on('load', function() {
        $(document).ready(function() {
            var n = $('.count').html() - 1;
            setInterval(function() {
                if (n >= 0) {
                    if(n == 3){
                        document.getElementById('countdowntimer').style.background = 'red';
                    }
                }
                $('.count').html(n--);

            }, 1000);
        });
    });
    </script>
  </head>
  <body id='countdowntimer'>
      <div class="circle center">
      <div class="count">20</div>
      <div class="l-half"></div>
      <div class="r-half"></div>
  </div>

  <!-- Animation keyframes here since JSF's SCSS ignores @keyframes -->

  <style type="text/css">
      @-webkit-keyframes l-rotate {
          0% { -webkit-transform: rotate(0deg); }
          50% { -webkit-transform: rotate(-180deg); }
          100% { -webkit-transform: rotate(-180deg); }
      }

      @-webkit-keyframes r-rotate {
          0% { -webkit-transform: rotate(0deg); }
          50% { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(-180deg); }
      }

      @-webkit-keyframes fadeout {
          0% { opacity: 1; }
          100% { opacity: 0.5; }
      }
  </style>


    <script>
      // tell the embed parent frame the height of the content
      if (window.parent && window.parent.parent){
        window.parent.parent.postMessage(["resultsFrame", {
          height: document.body.getBoundingClientRect().height,
          slug: "k9Law"
        }], "*")
      }

      // always overwrite window.name, in case users try to set it manually
      window.name = "result";
    </script>
  </body>
  </html>
`

countdown.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
countdown.id = 'countdown';

countdown.style.left = '0';
countdown.style.position = 'absolute';
countdown.style.textAlign = 'center';
countdown.style.bottom = '10%';
countdown.style.width = '100%';
countdown.style.marginLeft = '59%';
// countdown.style.background = '#FD5A5A';
countdown.style.width = '40%';

countdown.style.background = '#186490';

// iframe.document.body.appendChild(countdown); // Disable timer for now.

}
