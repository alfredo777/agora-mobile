var myDataBase = window.openDatabase("mydb", "1.0", "Agoradb", 1000000);
var obJCall = [];
var Schema = {
   "nodes": {
        "accessor": "(nodo,namenode)",
        "progresor": "(Id INTEGER PRIMARY KEY AUTOINCREMENT,nodo VARCHAR(255),namenode VARCHAR(255))",
        "procesor": "(?,?)"
    },
    "formularios": {
        "accessor": "(Id,content)",
        "progresor": "(Id INTEGER PRIMARY KEY, content TEXT)",
        "procesor": "(?,?)"
    },
    "notsend": {
        "accessor": "(params_to_send)",
        "progresor": "(Id INTEGER PRIMARY KEY AUTOINCREMENT, params_to_send TEXT)",
        "procesor": "(?)"
    },
    "audios":{
        "accessor": "(ubicate,formid)",
        "progresor": "(Id INTEGER PRIMARY KEY AUTOINCREMENT,ubicate VARCHAR(255),formid VARCHAR(255))",
        "procesor": "(?,?)"
    }
}

$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
});


function onDeviceReady() {
    var db = myDataBase;
    var sh = Schema;
}


function resultDATA(tx, result) {
    var r = result;
    console.log(r);
    console.log(tx);
    //createSession("last_insertion_id", r);
}

function resultFromExtract(tx, results) {
    console.log(results.rows);
}

function insertData(data, table, db, sh, drop) {
    if (drop == true) {
        dropTable(table);
    }
    createDB(table);
    insertQuery(table, data);
}

function createDB(table) {
    var confiG = Schema[table].progresor;
    var createQuery = "CREATE TABLE IF NOT EXISTS" + " " + table + " " + confiG;
    myDataBase.transaction(function(tx) {
            console.log(createQuery);
            tx.executeSql(createQuery);
        },
        function(tx, error) {
            console.log('1.Something went wrong: ' + error);
        },
        function successCB() {
            console.log("success!");
        }
    );
}

function insertQuery(table, data) {
    var confiG = Schema[table].accessor;
    var procesoR = Schema[table].procesor;
    var accessDATa = data;
    var insertQuery = "INSERT INTO" + " " + table + " " + confiG + " " + "VALUES" + procesoR;
    myDataBase.transaction(function(tx) {
            console.log(insertQuery);
            console.log(accessDATa);
            tx.executeSql(insertQuery,accessDATa,
              function(tx, result) {
                  console.log(result);
                  console.log("success!");
              }
            );
        },
        function(tx, error) {
            console.log('1.Something went wrong: ' + error);
        }
      );
}

function extractQuery(table, by_param, data, callback) {
    var accessDATa = data;
    var findQuery = "SELECT * FROM " + " " + table;
    var session = String(table).toUpperCase();
    myDataBase.transaction(function(tx) {
            console.log(findQuery);
            tx.executeSql(findQuery, [],
                function(tx, results) {
                    for (i = 0; i < results.rows.length; i++) {
                        if (results.rows.item(i)["Id"] == accessDATa) {
                            callback(results.rows.item(i))
                        }
                    }
                }
            );
        },
        function(tx, error) {
            console.log('1.Something went wrong: ' + error);
        }
    );
}

function polimorfismQuery(table, id, type, callback) {
    var data_id = id;
    var data_type = type;
    var findQuery = "SELECT * FROM " + " " + table;
    myDataBase.transaction(function(tx) {
            console.log(findQuery);
            var PushinfVAr = [];
            tx.executeSql(findQuery, [],
                function(tx, results) {
                    for (i = 0; i < results.rows.length; i++) {
                        var typexcompare = results.rows.item(i)["imageable_type"];
                        var idcompare = results.rows.item(i)["imageable_id"];
                        if (typexcompare == type) {
                            if (idcompare == id) {
                                var itemx = results.rows.item(i);
                                PushinfVAr.push(itemx);
                            }
                        }
                    }
                    callback(PushinfVAr);
                }
            );
        },
        function(tx, error) {
            console.log('1.Something went wrong: ' + error);
        }
    );
}



function callAllQuery(table, callback) {
    myDataBase.transaction(function(tx) {
            var findQuery = "SELECT * FROM " + " " + table;
            var call_all = []
            tx.executeSql(findQuery, [],
                function(tx, results) {
                    for (i = 0; i < results.rows.length; i++) {
                        var itemx = results.rows.item(i);
                        call_all.push(itemx);
                    }
                    console.log(call_all);
                    callback(call_all);
                });
        },
        function(tx, error) {
            console.log('1.Something went wrong: ' + error);
            callback(error);
        });
}

function updateQuery(table, field, valuex, id) {
    var updateQuery = "UPDATE" + " " + table + " " + "SET" + " " + field + " " + "= ?" + " " + "WHERE Id =?";
    var value = String(valuex);
    var tableTrans = table;
    var identifier = id;
    myDataBase.transaction(function(tx) {
        console.log(updateQuery);
        tx.executeSql(updateQuery, [value, identifier],
            function(tx, result) {
                console.log("Succes!");
                var daTeinsert = new Date().toLocaleString();
                update_at(tableTrans, "data_access", daTeinsert, identifier);
            }
        );
    });
}

function update_at(table, field, valuex, id){
    var updateQuery = "UPDATE" + " " + table + " " + "SET" + " " + field + " " + "= ?" + " " + "WHERE Id =?";
    var value = String(valuex);
    var identifier = id;
    myDataBase.transaction(function(tx) {
        console.log(updateQuery);
        tx.executeSql(updateQuery, [value, identifier],
            function(tx, result) {
                console.log("success");
            }
        );
    });
}

function lastRegisterQuery(table, callback){
    var findQuery = "SELECT * FROM " + " " + table;
    myDataBase.transaction(function(tx) {
        console.log(findQuery);
        tx.executeSql(findQuery, [],
        function(tx, results) {
            var lastacount = results.rows.length -1; 
            for (i = 0; i < results.rows.length; i++) {
                var interator = i;
                if(interator == lastacount){
                    var itemx = results.rows.item(i);
                    callback(itemx);
                    console.log(itemx.Id);
                }
            }
        });
    },
    function(tx, error) {
        console.log('1.Something went wrong: ' + error);
    });

}

function deleteRegisterQuery(table,id,callback){
    var deleteQuery = "DELETE FROM" + " " + table + " WHERE Id="+ id + "";
    console.log(id);
    console.log(deleteQuery);
    myDataBase.transaction(function(tx) {
        tx.executeSql(deleteQuery,[],
        function(tx, results) {
            console.log('Succes!')
            callback("success");

        });
        },
        function(tx,error) {
            console.log("error"+ error);

        });
}

function deleteWithAdvancedQuery(query){
    var deleteQuery = query;
    myDataBase.transaction(function(tx) {
        tx.executeSql(deleteQuery);
        },
        function(tx, error) {
            console.log('1.Something went wrong: ' + error);
        },
        function successCB() {
            console.log("success!");
        }
    );
}


function dropTable(table) {
    var DropQery = 'DROP TABLE IF EXISTS' + " " + table;
    myDataBase.transaction(function(tx) {
            tx.executeSql(DropQery);
        },
        function(tx, error) {
            console.log('1.Something went wrong: ' + error);
        },
        function successCB() {
            console.log("success!");
        }
    );
}

