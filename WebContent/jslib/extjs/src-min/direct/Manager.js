Ext.define("Ext.direct.Manager",{singleton:true,requires:["Ext.util.MixedCollection","Ext.app.domain.Direct"],mixins:{observable:"Ext.util.Observable"},exceptions:{TRANSPORT:"xhr",PARSE:"parse",DATA:"data",LOGIN:"login",SERVER:"exception"},constructor:function(){var a=this;a.addEvents("event","exception");a.transactions=new Ext.util.MixedCollection();a.providers=new Ext.util.MixedCollection();a.mixins.observable.constructor.call(a)},addProvider:function(f){var d=this,b=arguments,e=d.relayers||(d.relayers={}),c,a;if(b.length>1){for(c=0,a=b.length;c<a;++c){d.addProvider(b[c])}return}if(!f.isProvider){f=Ext.create("direct."+f.type+"provider",f)}d.providers.add(f);f.on("data",d.onProviderData,d);if(f.relayedEvents){e[f.id]=d.relayEvents(f,f.relayedEvents)}if(!f.isConnected()){f.connect()}return f},getProvider:function(a){return a.isProvider?a:this.providers.get(a)},removeProvider:function(d){var b=this,a=b.providers,c=b.relayers,e;d=d.isProvider?d:a.get(d);if(d){d.un("data",b.onProviderData,b);e=d.id;if(c[e]){c[e].destroy();delete c[e]}a.remove(d);return d}return null},addTransaction:function(a){this.transactions.add(a);return a},removeTransaction:function(b){var a=this;b=a.getTransaction(b);a.transactions.remove(b);return b},getTransaction:function(a){return typeof a==="object"?a:this.transactions.get(a)},onProviderData:function(e,d){var c=this,b,a;if(Ext.isArray(d)){for(b=0,a=d.length;b<a;++b){c.onProviderData(e,d[b])}return}if(d.name&&d.name!="event"&&d.name!="exception"){c.fireEvent(d.name,d)}else{if(d.status===false){c.fireEvent("exception",d)}}c.fireEvent("event",d,e)},parseMethod:function(c){if(Ext.isString(c)){var e=c.split("."),b=0,a=e.length,d=Ext.global;while(d&&b<a){d=d[e[b]];++b}c=Ext.isFunction(d)?d:null}return c||null}},function(){Ext.Direct=Ext.direct.Manager});