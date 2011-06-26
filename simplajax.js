/*
Copyright (c) 2011, Radek Slupik 
All rights reserved. 

Redistribution and use in source and binary forms, with or 
without modification, are permitted provided that the following 
conditions are met: 

   * Redistributions of source code must retain the above copyright 
     notice, this list of conditions and the following disclaimer. 
   * Redistributions in binary form must reproduce the above 
     copyright notice, this list of conditions and the following 
     disclaimer in the documentation and/or other materials 
     provided with the distribution. 
   * Neither the name of Radek Slupik nor the names of its 
     contributors may be used to endorse or promote products 
     derived from this software without specific prior written 
     permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND 
CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS 
BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED 
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON 
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY 
OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
POSSIBILITY OF SUCH DAMAGE. 
 */

var SimplAjax = function(options) {
    var opts = options;
    if (opts === null) {
        opts = {
            URL: null,
            method: "GET",
            requestHeaders: {},
            username: null,
            password: null,
            body: null,
            success: null,
            error: null
        };
    }
    
    var request = null;
    if (!(request = new XMLHttpRequest())) {
        if (!(request = new ActiveXObject("Msxml2.XMLHTTP"))) {
            if (!(request = new ActiveXObject("Microsoft.XMLHTTP"))) {
                return null;
            }
        }
    }
    
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status >= 400) {
                opts.error(request.responseText, request.status, request.getAllResponseHeaders());
            } else {
                opts.success(request.responseText, request.status, request.getAllResponseHeaders());
            }
        }
    };
    
    this.start = function() {
        request.open(opts.method, opts.URL, false, opts.username, opts.password);
        for (var header in opts.headers) {
            if (opts.headers.hasOwnProperty(header)) {
                request.setRequestHeader(header, opts.headers[header]);
            }
        }
        
        request.send(opts.body);
    };

    this.stop = function() {
        request.abort();
    };
    
    this.start();
};
