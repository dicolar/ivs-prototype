Ext.define("Ext.util.KeyNav",{alternateClassName:"Ext.KeyNav",requires:["Ext.util.KeyMap"],statics:{keyOptions:{left:37,right:39,up:38,down:40,space:32,pageUp:33,pageDown:34,del:46,backspace:8,home:36,end:35,enter:13,esc:27,tab:9}},constructor:function(a){var b=this;if(arguments.length===2){b.legacyConstructor.apply(b,arguments);return}b.setConfig(a)},legacyConstructor:function(b,a){this.setConfig(Ext.apply({target:b},a))},setConfig:function(b){var e=this,c={target:b.target,ignoreInputFields:b.ignoreInputFields,eventName:e.getKeyEvent("forceKeyDown" in b?b.forceKeyDown:e.forceKeyDown,b.eventName)},f,a,h,d,g;if(e.map){e.map.destroy()}if(b.processEvent){c.processEvent=b.processEvent;c.processEventScope=b.processEventScope||e}if(b.keyMap){f=e.map=b.keyMap}else{f=e.map=new Ext.util.KeyMap(c);e.destroyKeyMap=true}a=Ext.util.KeyNav.keyOptions;h=b.scope||e;for(d in a){if(a.hasOwnProperty(d)){if(g=b[d]){if(typeof g==="function"){g={handler:g,defaultEventAction:(b.defaultEventAction!==undefined)?b.defaultEventAction:e.defaultEventAction}}f.addBinding({key:a[d],handler:Ext.Function.bind(e.handleEvent,g.scope||h,g.handler||g.fn,true),defaultEventAction:(g.defaultEventAction!==undefined)?g.defaultEventAction:e.defaultEventAction})}}}f.disable();if(!b.disabled){f.enable()}},handleEvent:function(c,b,a){return a.call(this,b)},disabled:false,defaultEventAction:"stopEvent",forceKeyDown:false,eventName:"keypress",destroy:function(a){if(this.destroyKeyMap){this.map.destroy(a)}delete this.map},enable:function(){if(this.map){this.map.enable();this.disabled=false}},disable:function(){if(this.map){this.map.disable()}this.disabled=true},setDisabled:function(a){this.map.setDisabled(a);this.disabled=a},getKeyEvent:function(b,a){if(b||(Ext.EventManager.useKeyDown&&!a)){return"keydown"}else{return a||this.eventName}}});