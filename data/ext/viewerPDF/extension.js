/* Copyright (c) 2013 The Tagspaces Authors. All rights reserved.
 * Use of this source code is governed by a AGPL3 license that 
 * can be found in the LICENSE file. */

define(function(require, exports, module) {
"use strict";

	console.log("Loading viewerPDF");

	exports.id = "viewerPDF"; // ID should be equal to the directory name where the ext. is located   
	exports.title = "PDF Viewer";
	exports.type = "viewer";
	exports.supportedFileTypes = [ "pdf" ];
	
	var TSCORE = require("tscore");
	
	var extensionDirectory = TSCORE.Config.getExtensionPath()+"/"+exports.id;
	
	exports.init = function(filePath, elementID) {
	    console.log("Initalization Browser PDF Viewer...");
	    var extPath = extensionDirectory+"/pdfjs/web/viewer.html";
        $('#'+elementID).append($('<iframe>', {
            id: "iframeViewer",
            src: extPath+"?cp="+filePath,
            "nwdisable": "",
            "nwfaketop": "",
        }));        
	
	// TODO ext lib integration
	//	require([extensionDirectory+'/croppr.js'], function() {
	//
	//	});    
	};
	
	exports.viewerMode = function(isViewerMode) {
		console.log("viewerMode not supported on this extension");  
	}
	
	exports.setContent = function(content) {
		console.log("setContent not supported on this extension"); 	
	}
	
	exports.getContent = function() {
		console.log("getContent not supported on this extension"); 	
	}

});