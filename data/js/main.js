/* Copyright (c) 2012 The Tagspaces Authors. All rights reserved.
 * Use of this source code is governed by a AGPL3 license that 
 * can be found in the LICENSE file. */
define([
    'jquery',
    'jquerylayout',
    'jqueryui',
    'dynatree',
    'datatables',
    'jsoneditor',
    'less'
], function($){
"use strict";

var layoutContainer = undefined;

var initUI = function(){
    console.debug("Initializing UI...");
/*
    var FileViewer = undefined; 
    var TagsUI = undefined;    
    var BasicViewsUI = undefined;
    var SettingsUI = undefined;    
//    var IOAPI = undefined;
    var UIAPI = undefined;
*/    
    var editor = undefined; // Needed for JSON Editor

    // Setting up the communication between the extension and tagspace app
    if( $.browser.mozilla) {
        require([
           "js/messaging.mozilla",
           "js/ioapi.mozilla"           
           ]); 
    } else if ($.browser.chrome) {
        require([
           "js/ioapi.chrome"           
           ]);         
    }    
    
    require([
            "js/fileviewer.ui",
            "js/tags.ui",
            "js/basicviews.ui",
            "js/settings.ui",
            "js/misc.ui",
            "js/settings.api",
            "js/tagspace.api",
            "js/directories.ui",
        ], 
        function() { 
            TagsUI.initContextMenus();
            TagsUI.initDialogs();
            TagsUI.initTagTree();            
            
            BasicViewsUI.initContextMenus();
            BasicViewsUI.initFileTagViews();
            BasicViewsUI.initDialogs(); 
            BasicViewsUI.initButtons();
            BasicViewsUI.initThumbView();
            
            DirectoriesUI.initDialogs();
            DirectoriesUI.initButtons();
            DirectoriesUI.initDirectoryTree();
            
            SettingsUI.initButtons();
            SettingsUI.initDialogs();
            SettingsUI.initJSONEditor();
           
            TSSETTINGS.loadSettingsLocalStorage();
            
            // By empty local storage and a mozilla browser, trying to load from mozilla preferences
            if(TSSETTINGS.Settings == undefined && $.browser.mozilla) {
                setTimeout(IOAPI.loadSettings, 1000); // executes initUI and updateSettingMozillaPreferences by success
                console.debug("Loading setting with from mozilla pref execured with delay...");
            } 
        
            if(TSSETTINGS.Settings == undefined) {
                TSSETTINGS.Settings = TSSETTINGS.DefaultSettings;
            }          
            
            UIAPI.initUI(); 
    });         
}

var initLayout = function(){
    console.debug("Initializing Layout...");
    layoutContainer = $('#container').layout(
        {
        fxName: "none"
        
    //  some resizing/toggling settings
    ,   north__resizable:            false   // OVERRIDE the pane-default of 'slidable=true'
    ,   north__spacing_open:        0       // no resizer-bar when open (zero height)       
 //       ,   north__togglerLength_closed: '100%' // toggle-button is full-width of resizer-bar
 //       ,   north__spacing_closed:      20      // big resizer-bar when open (zero height)
    ,   north__size:                33      
 
    ,   south__resizable:           false   // OVERRIDE the pane-default of 'resizable=true'
    ,   south__spacing_open:        0       // no resizer-bar when open (zero height)
 //       ,   south__spacing_closed:      20      // big resizer-bar when open (zero height)

    //  west settings
    ,   west__resizable:           true 
    ,   west__minSize:              .1
//        ,   west__maxSize:              .4
    ,   west__size:                 200
    ,   west__spacing_open:         3     

    //  east settings
    ,   east__resizable:           true                 
    ,   east__size:                 .45
    ,   east__minSize:              .2
//        ,   east__maxSize:              .8 // 80% of layout width
    ,   east__spacing_open:        3   

    //  center settings
    ,   center__resizable:          true 
    ,   center__minSize:           0.5

    //  enable showOverflow on west-pane so CSS popups will overlap north pane
    ,   west__showOverflowOnHover:  true

    //  enable state management
    ,   stateManagement__enabled:   false // automatic cookie load & save enabled by default

    ,   showDebugMessages:          true // log and/or display messages from debugging & testing code
    } 
    
    );
    
    var westLayout = $('div.ui-layout-west').layout({
            minSize:                50  // ALL panes
        ,   center__paneSelector:   ".west-center"
        ,   south__paneSelector:    ".west-south"
        ,   south__size:            .5
        ,   south__spacing_open:    3       
    });

    var centerLayout = $('div.ui-layout-center').layout({
            name:                   "middle"
        ,   north__paneSelector:    ".middle-north"            
        ,   center__paneSelector:   ".middle-center"      
        ,   south__paneSelector:    ".middle-south"   
        ,   minSize:                0  // ALL panes
        ,   center__minSize:        300
        ,   north__size:            32
        ,   north__resizable:       false        
        ,   north__spacing_open:    0    
        ,   south__spacing_open:    0              
        ,   south__size:            1
    });

    // File Viewer / Editor
    var eastLayout = $('div.ui-layout-east').layout({
            minSize:                30  // ALL panes
        ,   north__paneSelector:    ".east-north"
        ,   center__paneSelector:   ".east-center"
        ,   south__paneSelector:    ".east-south" 
        ,   north__size:            80
        ,   north__resizable:       false
        ,   north__spacing_open:    0    
        ,   south__size:            25
        ,   south__spacing_open:    0        
    });

    var dirNavigationLayout = $('#directoryNavigator').layout({
            minSize:                30  // ALL panes
        ,   north__paneSelector:    "#directoryNavigatorNorth"
        ,   center__paneSelector:   "#dirTree"
        ,   north__size:            30
        ,   north__resizable:       false
        ,   north__spacing_open:    0
    });

    // Hide Document Viewer by default     
    layoutContainer.toggle("east");
}

return {
    initializeUI: initUI,
    initializeLayout: initLayout 
};
  
});
