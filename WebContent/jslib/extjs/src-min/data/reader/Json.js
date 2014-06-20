Ext.define("Ext.data.reader.Json",{extend:"Ext.data.reader.Reader",alternateClassName:"Ext.data.JsonReader",alias:"reader.json",root:"",metaProperty:"metaData",useSimpleAccessors:false,readRecords:function(b){var a=this,c;if(a.getMeta){c=a.getMeta(b);if(c){a.onMetaChange(c)}}else{if(b.metaData){a.onMetaChange(b.metaData)}}a.jsonData=b;return a.callParent([b])},getResponseData:function(a){var d,b;try{d=Ext.decode(a.responseText);return this.readRecords(d)}catch(c){b=new Ext.data.ResultSet({total:0,count:0,records:[],success:false,message:c.message});this.fireEvent("exception",this,a,b);Ext.Logger.warn("Unable to parse the JSON returned by the server");return b}},buildExtractors:function(){var b=this,a=b.metaProperty;b.callParent(arguments);if(b.root){b.getRoot=b.createAccessor(b.root)}else{b.getRoot=Ext.identityFn}if(a){b.getMeta=b.createAccessor(a)}},extractData:function(a){var e=this.record,d=[],c,b;if(e){c=a.length;if(!c&&Ext.isObject(a)){c=1;a=[a]}for(b=0;b<c;b++){d[b]=a[b][e]}}else{d=a}return this.callParent([d])},createAccessor:(function(){var a=/[\[\.]/;return function(c){if(Ext.isEmpty(c)){return Ext.emptyFn}if(Ext.isFunction(c)){return c}if(this.useSimpleAccessors!==true){var b=String(c).search(a);if(b>=0){return Ext.functionFactory("obj","return obj"+(b>0?".":"")+c)}}return function(d){return d[c]}}}()),createFieldAccessExpression:(function(){var a=/[\[\.]/;return function(n,d,e){var b=n.mapping,l=b||b===0,c=l?b:n.name,o,f;if(b===false){return}if(typeof c==="function"){o=d+".mapping("+e+", this)"}else{if(this.useSimpleAccessors===true||((f=String(c).search(a))<0)){if(!l||isNaN(c)){c='"'+c+'"'}o=e+"["+c+"]"}else{if(f===0){o=e+c}else{var h=c.split("."),k=h.length,j=1,m=e+"."+h[0],g=[m];for(;j<k;j++){m+="."+h[j];g.push(m)}o=g.join(" && ")}}}return o}}())});