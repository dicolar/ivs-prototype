Ext.define("Ext.PluginManager",{extend:"Ext.AbstractManager",alternateClassName:"Ext.PluginMgr",singleton:true,typeName:"ptype",create:function(b,d,c){var a;if(b.init){a=b}else{if(c){b=Ext.apply({},b);b.cmp=c}else{c=b.cmp}if(b.xclass){a=Ext.create(b)}else{a=Ext.ClassManager.getByAlias(("plugin."+(b.ptype||d)));if(typeof a==="function"){a=new a(b)}}}if(a&&c&&a.setCmp&&!a.setCmpCalled){a.setCmp(c);a.setCmpCalled=true}return a},findByType:function(c,f){var e=[],b=this.types,a,d;for(a in b){if(!b.hasOwnProperty(a)){continue}d=b[a];if(d.type==c&&(!f||(f===true&&d.isDefault))){e.push(d)}}return e}},function(){Ext.preg=function(){return Ext.PluginManager.registerType.apply(Ext.PluginManager,arguments)}});