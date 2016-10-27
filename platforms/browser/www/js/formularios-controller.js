$(document).ready(function(){
  $('#nodo').submit(function(){
    var $inputs = $('#nodo :input');
    var values = {};
    $inputs.each(function() {
        var valXX = $(this).val();
        values[this.name] = valXX;
    });
    var compose_data = [values.route,values.namenode];
    var insertionNode = insertData(compose_data,'nodes',myDataBase,Schema,true);
    var loadTPLcuestionarios = loadDBTPL('', 'cuestionarios', 'tpl');
    $('#nodo').hide();
    return false;

  });

  $('#registerform').submit(function(){
    var $inputs = $('#registerform :input');
    var values = {};
    $inputs.each(function() {
        var valXX = $(this).val();
        console.log(valXX);
        values[this.name] = valXX;
    });
    var tokenizer = values.tokenizer;
    lastRegisterQuery('nodes', function(callback){
        console.log(callback.nodo);
        var NoDo = callback.nodo;


    if(NoDo == "localhost:3000"){
        NoDo = "192.168.1.71:3000";
    }
    console.log(NoDo);

    console.log(tokenizer);

    var url = 'http://'+NoDo+'/api/json_view_cuestionario?tokenizer='+tokenizer+"&dispositivo="+device.uuid+"&model="+device.model+"&plataforma="+device.platform+"&version="+device.version+"&manufactura="+device.manufacturer+"&serial="+device.serial;

    console.log(url);
    
    $.ajax({
        url: url,
        cache: true,
        success: function (data) {
          
          if(data == null){
            console.log(null);
            alert('Cuestionario invalido');
          }else{
            if(data.cuestionario != false ){
            var sString = JSON.stringify(data);
            console.log(sString);
            var compose_data = [data.cuestionario.id,sString];
            console.log(compose_data);
            var insertionNode = insertData(compose_data,'formularios',myDataBase,Schema,false);
            loadDBTPL('', 'cuestionarios', 'tpl');
            }else{
              alert("El token ingresado es invalido");
            }
          }
        },
        error: function(err) {
          callback(null, err);
        }
      });
    });

    return false;

  });




});