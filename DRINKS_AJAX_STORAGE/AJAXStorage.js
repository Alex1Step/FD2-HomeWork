'use strict'

function AJAXStorage() {
    var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    var updatePassword;
    var stringName='STEPANCHUK_DRINKS_STORAGE';
    var myModel = null;

    this.start=function(model) {
        myModel=model;
    }

    this.storeInfo=function(){
        this.updatePassword=Math.random();
        $.ajax( {
                url : this.ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'LOCKGET', n : this.stringName, p : this.updatePassword },
                success : this.lockGetReady, error : this.errorHandler
            }
        );
    }

    this.lockGetReady = function (callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
        else {
            // нам всё равно, что было прочитано -
            // всё равно перезаписываем
            var info=myModel.storage;
            $.ajax( {
                    url : this.ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'UPDATE', n : this.stringName, v : JSON.stringify(info), p : this.updatePassword },
                    success : this.updateReady, error : this.errorHandler
                }
            );
        }
    }

    this.updateReady = function (callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
    }

// function restoreInfo() {
//     $.ajax(
//         {
//             url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
//             data : { f : 'READ', n : stringName },
//             success : readReady, error : errorHandler
//         }
//     );
// }

// function readReady(callresult) {
//     if ( callresult.error!=undefined )
//         alert(callresult.error);
//     else if ( callresult.result!="" ) {
//         var info=JSON.parse(callresult.result);
//         document.getElementById('IName').value=info.name;
//         document.getElementById('IAge').value=info.age;
//     }
// }

// function errorHandler(jqXHR,statusStr,errorStr) {
//     alert(statusStr+' '+errorStr);
// }

// restoreInfo();
}