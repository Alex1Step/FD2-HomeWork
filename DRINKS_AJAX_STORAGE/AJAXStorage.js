'use strict'

function AJAXStorage() {
    var self = this
    self.ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    var updatePassword;
    var stringName='STEPANCHUK_DRINKS_STORAGE';
    var myModel = null;

    self.start=function(model) {
        myModel=model;
    }

    self.storeInfo=function(){
        self.updatePassword=Math.random();
        $.ajax( {
                url : self.ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'LOCKGET', n : stringName, p : self.updatePassword },
                success : self.lockGetReady, error : self.errorHandler
            }
        );
    }

    self.lockGetReady = function (callresult) {
        if ( callresult.error!=undefined ){
            alert(callresult.error);
        }
        else {
            var info=myModel.stForAjax;
            $.ajax( {
                    url : self.ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'UPDATE', n : stringName, v : JSON.stringify(info), p : self.updatePassword },
                    success : self.updateReady, error : self.errorHandler
                }
            );
        }
    }

    self.updateReady = function (callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
    }

    self.restoreInfo = function () {
        $.ajax(
            {
                url : self.ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : stringName },
                success : self.readReady, error : self.errorHandler
            }
        );
    }

    self.readReady = function (callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
        else if ( callresult.result!="" ) {
            var info=JSON.parse(callresult.result);
            myModel.stForAjax = info;
        }
    }

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}

self.restoreInfo();
}