function loadDBTPL(data, tpln, divloadtpl){
    getTemplate(tpln, data, function(output, err) {
      $("#"+divloadtpl).html(output);
    });  
}

function loadDBTPLforms(data, tpln, divloadtpl){
    if(data != ''){
    var data = JSON.stringify({'formularios': data});
    data = JSON.parse(data);
    }
    getTemplate(tpln, data, function(output, err) {
      $("#"+divloadtpl).html(output);
    });  
}

function loadDBTPLparser(data, tpln, divloadtpl){
    if(data != null){
      data = JSON.parse(data);
      console.log(data);
    }
    getTemplate(tpln, data, function(output, err) {
      $("#"+divloadtpl).html(output);
    });  
}

Handlebars.registerHelper('callTPL', function(tpln, data, divloadtpl, options) {
  data = JSON.parse(data);
  console.log(data);

  getTemplate(tpln, data, function(output, err) {
    $("#"+divloadtpl).append(output);
  });
});

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

Handlebars.registerHelper('idrand', function(context) {
    var opt =  Math.round(Math.random());
    return opt;
});

Handlebars.registerHelper('idrandop', function(context) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
});



function getTemplate(name, context, callback) {
  $.ajax({
    url: 'tpl/'+name + '.hbs',
    cache: true,
    success: function (data) {
      var tpl = Handlebars.compile(data),
      output = tpl(context);
      callback(output, null);
    },
    error: function(err) {
      callback(null, err);
    }
  });
}

Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  return out + "</ul>";
});

Handlebars.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,420);
    return new Handlebars.SafeString(theString)
});

Handlebars.registerHelper("prettifyDate", function(date) {
    var parse = new Date(date);
    var weekday = parse.getDay();
    var year = parse.getFullYear();
    var month = parse.getMonth();
    var parsedDate = weekday +"-"+ month +"-"+ year;
    return new Handlebars.SafeString(parsedDate)
});

Handlebars.registerHelper ('truncate', function (str, len) {
        if (str.length > len) {
            var new_str = str.substr (0, len+1);

            while (new_str.length) {
                var ch = new_str.substr ( -1 );
                new_str = new_str.substr ( 0, -1 );

                if (ch == ' ') {
                    break;
                }
            }

            if ( new_str == '' ) {
                new_str = str.substr ( 0, len );
            }

            return new Handlebars.SafeString ( new_str +'...' ); 
        }
        return str;
    });

Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});


Handlebars.registerHelper('scala', function(avalue, bvalue, idx, pase_dinamicos,options) {
  var out;
  var init = avalue;
  var finish = bvalue;
  var firstn = init;
  var pase_dinamicos = pase_dinamicos;
  out = "<table class='table table-striped table-bordered'><tr>";
  for(var i=init, l=finish+1; i<l; i++) {
    out = out + "<td><center>"+i+'</center></td>';
  }
  out = out + "</tr><tr class='trx'>";

  for(var i=init, l=finish+1; i<l; i++) {
    var pase_array = [];
    if(pase_dinamicos != null){
    $.each(pase_dinamicos, function(index,item){
      if( i >= item.de_a  && i <= item.de_b){
         pase_array.push(item.pase); 
      }
    });
    }else{
      pase_array = [0]; 
    }
    var PaseTo = pase_array[0];
    if (i == init) {
    out = out + '<td style="text-align: center; vertical-align: middle;"><input name="tipo[pregunta]['+idx+'][valor]" type="radio" value="'+i+'" data-page="'+PaseTo+'"  class="pase"  checked></input></td>';
    }else{
    out = out + '<td style="text-align: center; vertical-align: middle;"><input name="tipo[pregunta]['+idx+'][valor]" type="radio" value="'+i+'" data-page="'+PaseTo+'"  class="pase"  ></input></td>';
    }
  }

  return out+ "</tr></table>";

});

Handlebars.registerHelper('scalaemogi', function(avalue, bvalue, idx, coleccion, pase_dinamicos,options) {
  var out;
  var init = avalue;
  var finish = bvalue;
  var firstn = init;
  var coleccionx = '../../images_sim/tipo1/';
  var coleccionn = [ coleccionx+"greeding.png", coleccionx+"big_smile.png", coleccionx+"smile.png", coleccionx+"bad_smile.png", coleccionx+"what.png", coleccionx+"misdoubt.png", coleccionx+"sigh.png", coleccionx+"wicked.png",coleccionx+"unhappy.png", coleccionx+"surprise.png" ];
  /*for(var i=init, l=finish+1; i<l; i++) {
    out = out + "<td><center>"+i+'</center></td>';
  }
  out = out + "</tr><tr class='trx'>";*/
  out =  "<div class='col-lg-12 trx'>"


  for(var i=init, l=finish+1; i<l; i++) {
    var pase_array = [];
    if(pase_dinamicos != null){
    $.each(pase_dinamicos, function(index,item){
      if( i >= item.de_a  && i <= item.de_b){
         pase_array.push(item.pase); 
      }
    });
    }else{
      pase_array = [0]; 
    }
    var PaseTo = pase_array[0];
    if (i == init) {
    out = out + '<div  style="text-align: center; vertical-align: middle; padding:1%; height: 135px; width:20%; float:left;"><label for="id_'+idx+'_'+i+'" style="cursor:pointer;" class="to-emogi emogi"><img src="..'+coleccionn[10-i]+'" width="90%"/></label> <input name="tipo[pregunta]['+idx+'][valor]" type="radio" value="'+i+'" id="id_'+idx+'_'+i+'" data-page="'+PaseTo+'"  class="pase" style="display:none;" checked></input></div>';
    }else{
    out = out + '<div  style="text-align: center; vertical-align: middle; padding:1%; height: 135px; width:20%; float:left;"><label for="id_'+idx+'_'+i+'" style="cursor:pointer;" class="to-emogi"><img src="..'+coleccionn[10-i]+'" width="90%"/> </label><input name="tipo[pregunta]['+idx+'][valor]" type="radio" value="'+i+'" id="id_'+idx+'_'+i+'" data-page="'+PaseTo+'"  class="pase"  style="display:none;" ></input></div>';
    }

  }
  return out+ "</div>";

});

Handlebars.registerHelper('scalasuper', function(items, idx,options, page) {
 var out = "<table class='table table-striped'>";
  for(var i=0, l=items.length; i<l; i++) {
    if (i == 0) {
      out = out + "<tr class='trx'><td>"+ items[i].titulo+'</td><td><input name="tipo[pregunta]['+idx+'][valor]" type="radio" value="'+items[i].id+'"  data-page="'+items[i].pase+'"  class="pull-right pase" checked></input></td></tr>';
    }else{
      out = out + "<tr class='trx'><td>"+ items[i].titulo+'</td><td><input name="tipo[pregunta]['+idx+'][valor]" type="radio" value="'+items[i].id+'"  data-page="'+items[i].pase+'" class="pull-right pase"></input></td></tr>';
    }
  }

  return out + "</table>";
});


Handlebars.registerHelper('multiplesuper', function(items,options) {
  var out = "<table class='table table-striped'>";
  for(var i=0, l=items.length; i<l; i++) {
    if (i == 0) {
      out = out + "<tr><td>"+ items[i].titulo+'</td><td><input name="tipo[respuesta]['+items[i].id+'][valor]" value="'+items[i].id+'" type="checkbox" class="pull-right" checked></input></td></tr>';
    }else{
      out = out + "<tr><td>"+ items[i].titulo+'</td><td><input name="tipo[respuesta]['+items[i].id+'][valor]" value='+items[i].id+' type="checkbox" class="pull-right" ></input></td></tr>';
    }
  }

  return out + "</table>";
});

Handlebars.registerHelper('multiplesupermtca', function(items,options) {
  var out = "<table class='table table-striped'>";
  for(var i=0, l=items.length; i<l; i++) {
    
      out = out + "<tr><td>"+ items[i].titulo+'</td><td><input name="tipo[respuesta]['+items[i].id+'][valor]"  type="text" class="pull-right form-control" ></input></td></tr>';
    
  }

  return out + "</table>";
});


Handlebars.registerHelper('valuescontrapose', function(items, id,options) {
  var out = "<table class='table table-striped'>";
   console.log(items);
    
  for(var i=0, l=items.length; i<l; i++) {
    if (i == 0) {
      out = out + "<tr><td>"+ items[i].nombre_del_valor+'</td><td><input name="tipo[respuesta]['+id+'][valor]"  value="'+items[i].cuantificador_del_valor+'"  type="radio" class="pull-right" checked></input></td></tr>';
    }else{
      out = out + "<tr><td>"+ items[i].nombre_del_valor+'</td><td><input name="tipo[respuesta]['+id+'][valor]"  value="'+items[i].cuantificador_del_valor+'"  type="radio" class="pull-right" ></input></td></tr>';

    }
  }

  return out + "</table>";
});

Handlebars.registerHelper('advancedcategory', function(items, id, categorias, options){
  var out = "<div class='table-responsive'><table class='table table-striped '>";
  out = out + "<thead><tr class='active'>";
  out = out + '<th> Opcciones </th>'
  $.each(categorias, function(index, item){
    out = out + '<th>'+ item.titulo + '</th>';
  });
  out = out + "</tr><thead>";
  out = out + "<tbody>";
  $.each(items, function(index, item){
    out = out + '<tr>';
    out = out + '<td class="active">'+item.titulo+'</td>';
    var superItem = item;
    $.each(categorias, function(index, itemcat){
      out = out + '<td><input name="tipo[respuesta]['+id+'][valor][]"  value="['+superItem.id+','+itemcat.id+']"  type="checkbox" class="pull-right" ></input></td>';
    });
    out = out + '</tr>';
  });
  out = out + "</tbody>";
  return  out + "</table></div>";
});

Handlebars.registerHelper('typ', function(tipo, options) {
  var out;
  if (tipo == "sl"){
    out = "Selección";
  }
  if (tipo == "es"){
    out = "Escala Numérica";
  }
  if (tipo == "ab"){
    out = "Abierta";
  }
  if (tipo == "mt"){
    out = "Selección Multiple";
  }
  if (tipo == "mtca"){
    out = "Selección Multiple campo Abierto";
  }
  return out;
});
Handlebars.registerHelper("host", function(options){
  var out;

  out = window.location.protocol + '//'+ window.location.host;

  return out;


});

Handlebars.registerHelper("diferent", function(valA,valB,options){
  var out;
  if(valA != valB){
    out = options.fn(this);
  }else{
    out = options.inverse(this);
  }
  return out;
});

Handlebars.registerHelper("decodeString", function(sTr,options){
  var out;
  var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

  out = Base64.decode(sTr);
  return out;
});


function opPaginateForm() {
  $('.insturcciones').slideToggle('slow');
  $('.op-paginar').slideToggle('slow');
  setTimeout(function(){
    $('.paginar').slideToggle('fast');
  }, 1200);
}

function pagNext(){
 var siG = $('#siguiente').data('actual');
 var acT = $('#'+siG).hide();
 var sigu = $('#'+siG).next('.pagina');
 var siguID = sigu.attr('id');
 var parsProgress = 0;
 var lengthcV = $('#pbar').width();
 var lengthcVX = $('.progress').width();
 var cpL = $('.pagina').length; 
 var paseXCV = $('#'+siG+' .table tbody ').children(".trx");
 $.each(paseXCV, function(index, item){
  var TdX = $(item).children('td');
   $.each(TdX, function(index, itemx){
     /*console.log(itemx);*/
     var TDRX = $(itemx).children("input.pase");
     /*console.log(TDRX);*/
     var check = $(TDRX).prop("checked");
     if(check == true){
      var paseNMX = $(TDRX).data('page');
      paseNMX = Math.round(paseNMX);
      var pages = $('.pagina');
       $.each(pages, function(index, itemxx){
          var findPage = index + 1;

          if(findPage == paseNMX){
            var newxTid =$(itemxx).attr('id');
            siguID = newxTid;
            var actnewxTid = lengthcVX / cpL;
            var Calculus = index - 1 
            lengthcV = actnewxTid * Calculus;

          }
       });
     }
   });
 });
 console.log(paseXCV);
 if(siguID == null){
  $('#siguiente').hide();
  $('#previa').hide();
  $('#envio').show();
  $('#finish').show();
 }
 
 var totale = lengthcVX / cpL;
 var intporceto =  parseInt((lengthcV/lengthcVX)* 100);
  if(intporceto == 2){
    $('#pbar').width(totale);
    porceT =  parseInt((totale/lengthcVX)* 100);
    $('#pbar').html(porceT+'%');
  }else{
    totale = lengthcV + totale;
    $('#pbar').width(totale);
    porceT =  parseInt((totale/lengthcVX)* 100);
    $('#pbar').html(porceT+'%');
  }

  

 $('#'+siguID).show();
 $('#siguiente').data('actual', siguID);
 $('#previa').data('actual', siguID);

}


function prevPage(){

 var siG = $('#previa').data('actual');
 var sigu = $('#'+siG).prev('.pagina');
 var siguID = sigu.attr('id');
 if(siguID == null){
  return false;
 }
 var acT = $('#'+siG).hide();

 var parsProgress = 0;
 var lengthcV = $('#pbar').width();
 var lengthcVX = $('.progress').width();
 var cpL = $('.pagina').length; 
 var paseXCV = $('#'+siG+' .table tbody ').children(".trx");
 $.each(paseXCV, function(index, item){
  var TdX = $(item).children('td');
   $.each(TdX, function(index, itemx){
     /*console.log(itemx);*/
     var TDRX = $(itemx).children("input.pase");
     /*console.log(TDRX);*/
     var check = $(TDRX).prop("checked");
     if(check == true){
      var paseNMX = $(TDRX).data('page');
      paseNMX = Math.round(paseNMX);
      var pages = $('.pagina');
       $.each(pages, function(index, itemxx){
          var findPage = index + 1;

          if(findPage == paseNMX){
            var newxTid =$(itemxx).attr('id');
            siguID = newxTid;
            var actnewxTid = lengthcVX / cpL;
            var Calculus = index - 1 
            lengthcV = actnewxTid * Calculus;

          }
       });
     }
   });
 });
 
 
 var totale = lengthcVX / cpL;
 var intporceto =  parseInt((lengthcV/lengthcVX)* 100);
  if(intporceto == 2){
    $('#pbar').width(totale);
    porceT =  parseInt((totale/lengthcVX)* 100);
    $('#pbar').html(porceT+'%');
  }else{
    totale = lengthcV + totale;
    $('#pbar').width(totale);
    porceT =  parseInt((totale/lengthcVX)* 100);
    $('#pbar').html(porceT+'%');
  }

  

 $('#'+siguID).show();
 $('#siguiente').data('actual', siguID);
 $('#previa').data('actual', siguID);

}

function IndexIntroForm(){
var exacTTT = $('.preguntaz');
 $.each(exacTTT, function(index, itemx){
  var sucIDX = index  + 1;
  var chilDX = $(itemx).children(".number");
  $(chilDX).html('<h1>'+sucIDX+'</h1>');
 });
}

function RemoveItem(){
  $('.remove').click(function(){
    setTimeout(function(){
      var OOld_alert = window.alert, confirm_alert = this.confirm;
      console.log(OOld_alert);
      console.log(confirm_alert);
      if(confirm_alert){
        var exacTTT = $('.preguntaz');
         $.each(exacTTT, function(index, itemx){
          var sucIDX = index  + 1;
          var chilDX = $(itemx).children(".number");
          $(chilDX).html('<h1>'+sucIDX+'</h1>');
         });
      }
    },50);    
  });
}

function parseACT($text) {
    // Damn pesky carriage returns...
    $text = str_replace("\r\n", "\n", $text);
    $text = str_replace("\r", "\n", $text);

    // JSON requires new line characters be escaped
    $text = str_replace("\n", "\\n", $text);
    return $text;
}


