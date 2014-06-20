Ext.define("Ext.data.Model",{alternateClassName:"Ext.data.Record",mixins:{observable:"Ext.util.Observable"},requires:["Ext.ModelManager","Ext.data.IdGenerator","Ext.data.Field","Ext.data.Errors","Ext.data.Operation","Ext.data.validations","Ext.util.MixedCollection"],compareConvertFields:function(a,d){var c=a.convert&&a.type&&a.convert!==a.type.convert,b=d.convert&&d.type&&d.convert!==d.type.convert;if(c&&!b){return 1}if(!c&&b){return -1}return 0},itemNameFn:function(a){return a.name},onClassExtended:function(b,c,a){var d=a.onBeforeCreated;a.onBeforeCreated=function(f,E){var D=this,F=Ext.getClassName(f),s=f.prototype,y=f.prototype.superclass,h=E.validations||[],u=E.fields||[],g,n=E.associations||[],e=function(H,J){var I=0,G,K;if(H){H=Ext.Array.from(H);for(G=H.length;I<G;++I){K=H[I];if(!Ext.isObject(K)){K={model:K}}K.type=J;n.push(K)}}},v=E.idgen,B=new Ext.util.MixedCollection(false,s.itemNameFn),z=new Ext.util.MixedCollection(false,s.itemNameFn),r=y.validations,C=y.fields,l=y.associations,A,x,p,q=[],o="idProperty" in E?E.idProperty:s.idProperty,m=o?(o.isField?o:new Ext.data.Field(o)):null,j=false,w=function(H,G,i){var I,J;if(B.events.add.firing){J=H;I=G}else{I=i;J=G.originalIndex}I.originalIndex=J;if(m&&((I.mapping&&(I.mapping===m.mapping))||(I.name===m.name))){s.idField=I;j=true;I.defaultValue=undefined}},t=E.proxy,k=function(){B.sortBy(s.compareConvertFields)};f.modelName=F;s.modelName=F;if(r){h=r.concat(h)}E.validations=h;if(C){u=C.items.concat(u)}B.on({add:w,replace:w});for(x=0,p=u.length;x<p;++x){g=u[x];B.add(g.isField?g:new Ext.data.Field(g))}if(m&&!j){s.idField=m;m.defaultValue=undefined;B.add(m)}k();B.on({add:k,replace:k});E.fields=B;if(v){E.idgen=Ext.data.IdGenerator.get(v)}e(E.belongsTo,"belongsTo");delete E.belongsTo;e(E.hasMany,"hasMany");delete E.hasMany;e(E.hasOne,"hasOne");delete E.hasOne;if(l){n=l.items.concat(n)}for(x=0,p=n.length;x<p;++x){q.push("association."+n[x].type.toLowerCase())}if(t){if(!t.isProxy){q.push("proxy."+(t.type||t))}}else{if(!f.prototype.proxy){f.prototype.proxy=f.prototype.defaultProxyType;q.push("proxy."+f.prototype.defaultProxyType)}}Ext.require(q,function(){Ext.ModelManager.registerType(F,f);for(x=0,p=n.length;x<p;++x){A=n[x];if(A.isAssociation){A=Ext.applyIf({ownerModel:F,associatedModel:A.model},A.initialConfig)}else{Ext.apply(A,{ownerModel:F,associatedModel:A.model})}if(Ext.ModelManager.getModel(A.model)===undefined){Ext.ModelManager.registerDeferredAssociation(A)}else{z.add(Ext.data.association.Association.create(A))}}E.associations=z;d.call(D,f,E,a);if(t&&t.isProxy){f.setProxy(t)}Ext.ModelManager.onModelDefined(f)})}},inheritableStatics:{setProxy:function(a){if(!a.isProxy){if(typeof a=="string"){a={type:a}}a=Ext.createByAlias("proxy."+a.type,a)}a.setModel(this);this.proxy=this.prototype.proxy=a;return a},getProxy:function(){var a=this.proxy;if(!a){a=this.prototype.proxy;if(a.isProxy){a=a.clone()}return this.setProxy(a)}return a},setFields:function(f,m,l){var j=this,a,b,k=false,e=j.prototype,c=e.fields,h=e.superclass.fields,g,d;if(m){e.idProperty=m;b=m.isField?m:new Ext.data.Field(m)}if(l){e.clientIdProperty=l}if(c){c.clear()}else{c=j.prototype.fields=new Ext.util.MixedCollection(false,function(i){return i.name})}if(h){f=h.items.concat(f)}for(d=0,g=f.length;d<g;d++){a=new Ext.data.Field(f[d]);if(b&&((a.mapping&&(a.mapping===b.mapping))||(a.name===b.name))){k=true;a.defaultValue=undefined}c.add(a)}if(b&&!k){b.defaultValue=undefined;c.add(b)}j.fields=c;return c},getFields:function(){return this.prototype.fields.items},load:function(e,b){b=Ext.apply({},b);b=Ext.applyIf(b,{action:"read",id:e});var a=new Ext.data.Operation(b),c=b.scope||this,d;d=function(g){var f=null,h=g.wasSuccessful();if(h){f=g.getRecords()[0];if(!f.hasId()){f.setId(e)}Ext.callback(b.success,c,[f,g])}else{Ext.callback(b.failure,c,[f,g])}Ext.callback(b.callback,c,[f,g,h])};this.getProxy().read(a,d,this)}},statics:{PREFIX:"ext-record",AUTO_ID:1,EDIT:"edit",REJECT:"reject",COMMIT:"commit",id:function(a){var b=[this.PREFIX,"-",this.AUTO_ID++].join("");a.phantom=true;a.internalId=b;return b}},idgen:{isGenerator:true,type:"default",generate:function(){return null},getRecId:function(a){return a.modelName+"-"+a.internalId}},editing:false,dirty:false,persistenceProperty:"data",evented:false,isModel:true,phantom:false,idProperty:"id",clientIdProperty:null,defaultProxyType:"ajax",emptyData:[],constructor:function(k,e,p,b){var m=this,j=(e||e===0),q,l,f,n,a,o,g,d,r=m.idProperty,c=m.idField,h;m.raw=p||k;m.modified={};if(m.persistenceProperty!=="data"){Ext.log.warn(this.$className,"The persistenceProperty will be deprecated, all data will be stored in the underlying data property.")}d=m[m.persistenceProperty]=b||{};m.data=m[m.persistenceProperty];m.mixins.observable.constructor.call(m);if(!b){if(k){if(!j&&r){e=k[r];q=(e||e===0)}}else{k=m.emptyData}l=m.fields.items;f=l.length;h=0;if(Ext.isArray(k)){for(;h<f;h++){n=l[h];a=n.name;o=k[n.originalIndex];if(o===undefined){o=n.defaultValue}if(n.convert){o=n.convert(o,m)}if(o!==undefined){d[a]=o}}}else{for(;h<f;h++){n=l[h];a=n.name;o=k[a];if(o===undefined){o=n.defaultValue}if(n.convert){o=n.convert(o,m)}if(o!==undefined){d[a]=o}}}}m.stores=[];if(j){q=true;d[r]=c&&c.convert?c.convert(e):e}else{if(!q){g=m.idgen.generate();if(g!=null){m.preventInternalUpdate=true;m.setId(g);delete m.preventInternalUpdate}}}m.internalId=q?e:Ext.data.Model.id(m);if(typeof m.init=="function"){m.init()}m.id=m.idgen.getRecId(m)},get:function(a){return this[this.persistenceProperty][a]},_singleProp:{},set:function(q,b){var i=this,g=i[i.persistenceProperty],h=i.fields,p=i.modified,n=(typeof q=="string"),o,j,f,m,e,a,c,d,k,l;if(n){l=i._singleProp;l[q]=b}else{l=q}for(a in l){if(l.hasOwnProperty(a)){k=l[a];if(h&&(j=h.get(a))&&j.convert){k=j.convert(k,i)}o=g[a];if(i.isEqual(o,k)){continue}g[a]=k;(e||(e=[])).push(a);if(j&&j.persist){if(p.hasOwnProperty(a)){if(i.isEqual(p[a],k)){delete p[a];i.dirty=false;for(m in p){if(p.hasOwnProperty(m)){i.dirty=true;break}}}}else{i.dirty=true;p[a]=o}}if(a==i.idProperty){f=true;c=o;d=k}}}if(n){delete l[q]}if(f){i.changeId(c,d)}if(!i.editing&&e){i.afterEdit(e)}return e||null},copyFrom:function(h){var g=this,e=g.fields.items,l=e.length,b=[],j,c=0,f,d,m=g.idProperty,a,k;if(h){f=g[g.persistenceProperty];d=h[h.persistenceProperty];for(;c<l;c++){j=e[c];a=j.name;if(a!=m){k=d[a];if(k!==undefined&&!g.isEqual(f[a],k)){f[a]=k;b.push(a)}}}if(g.phantom&&!h.phantom){g.beginEdit();g.setId(h.getId());g.endEdit(true);g.commit(true)}}return b},isEqual:function(d,c){if(d instanceof Date&&c instanceof Date){return d.getTime()===c.getTime()}return d===c},beginEdit:function(){var b=this,a,c,d;if(!b.editing){b.editing=true;b.dirtySave=b.dirty;d=b[b.persistenceProperty];c=b.dataSave={};for(a in d){if(d.hasOwnProperty(a)){c[a]=d[a]}}d=b.modified;c=b.modifiedSave={};for(a in d){if(d.hasOwnProperty(a)){c[a]=d[a]}}}},cancelEdit:function(){var a=this;if(a.editing){a.editing=false;a.modified=a.modifiedSave;a[a.persistenceProperty]=a.dataSave;a.dirty=a.dirtySave;a.modifiedSave=a.dataSave=a.dirtySave=null}},endEdit:function(a,d){var c=this,b,e;a=a===true;if(c.editing){c.editing=false;b=c.dataSave;c.modifiedSave=c.dataSave=c.dirtySave=null;if(!a){if(!d){d=c.getModifiedFieldNames(b)}e=c.dirty||d.length>0;if(e){c.afterEdit(d)}}}},getModifiedFieldNames:function(d){var c=this,e=c[c.persistenceProperty],a=[],b;d=d||c.dataSave;for(b in e){if(e.hasOwnProperty(b)){if(!c.isEqual(e[b],d[b])){a.push(b)}}}return a},getChanges:function(){var a=this.modified,b={},c;for(c in a){if(a.hasOwnProperty(c)){b[c]=this.get(c)}}return b},isModified:function(a){return this.modified.hasOwnProperty(a)},setDirty:function(){var c=this,a=c.fields.items,g=a.length,e,b,d;c.dirty=true;for(d=0;d<g;d++){e=a[d];if(e.persist){b=e.name;c.modified[b]=c.get(b)}}},markDirty:function(){Ext.log.warn("Ext.data.Model: markDirty has been deprecated. Use setDirty instead.");return this.setDirty.apply(this,arguments)},reject:function(a){var c=this,b=c.modified,d;for(d in b){if(b.hasOwnProperty(d)){if(typeof b[d]!="function"){c[c.persistenceProperty][d]=b[d]}}}c.dirty=false;c.editing=false;c.modified={};if(a!==true){c.afterReject()}},commit:function(a,c){var b=this;b.phantom=b.dirty=b.editing=false;b.modified={};if(a!==true){b.afterCommit(c)}},copy:function(a){var b=this;return new b.self(b.raw,a,null,Ext.apply({},b[b.persistenceProperty]))},setProxy:function(a){if(!a.isProxy){if(typeof a==="string"){a={type:a}}a=Ext.createByAlias("proxy."+a.type,a)}a.setModel(this.self);this.proxy=a;return a},getProxy:function(){return this.hasOwnProperty("proxy")?this.proxy:this.self.getProxy()},validate:function(){var j=new Ext.data.Errors(),c=this.validations,e=Ext.data.validations,b,d,h,a,g,f;if(c){b=c.length;for(f=0;f<b;f++){d=c[f];h=d.field||d.name;g=d.type;a=e[g](d,this.get(h));if(!a){j.add({field:h,message:d.message||e[g+"Message"]})}}}return j},isValid:function(){return this.validate().isValid()},save:function(k){k=Ext.apply({},k);var e=this,b=e.phantom?"create":"update",j=k.scope||e,g=e.stores,c=0,d,f,a,h;Ext.apply(k,{records:[e],action:b});a=new Ext.data.Operation(k);h=function(i){var l=i.wasSuccessful();if(l){for(d=g.length;c<d;c++){f=g[c];f.fireEvent("write",f,i);f.fireEvent("datachanged",f)}Ext.callback(k.success,j,[e,i])}else{Ext.callback(k.failure,j,[e,i])}Ext.callback(k.callback,j,[e,i,l])};e.getProxy()[b](a,h,e);return e},destroy:function(l){l=Ext.apply({records:[this],action:"destroy"},l);var f=this,a=f.phantom!==true,k=l.scope||f,h,c=0,e,g,d,b,j;b=new Ext.data.Operation(l);j=function(i){d=[f,i];h=Ext.Array.clone(f.stores);if(i.wasSuccessful()){for(e=h.length;c<e;c++){g=h[c];if(g.remove){g.remove(f,true)}g.fireEvent("bulkremove",g,[f],[g.indexOf(f)],false);if(a){g.fireEvent("write",g,i)}}f.clearListeners();Ext.callback(l.success,k,d)}else{Ext.callback(l.failure,k,d)}Ext.callback(l.callback,k,d)};if(a){f.getProxy().destroy(b,j,f)}else{b.complete=b.success=true;b.resultSet=f.getProxy().reader.nullResultSet;j(b)}return f},getId:function(){return this.get(this.idField.name)},getObservableId:function(){return this.id},setId:function(a){this.set(this.idProperty,a)},changeId:function(f,b){var e=this,d,c,a;if(!e.preventInternalUpdate){d=e.hasId(f);c=e.hasId(b);a=e.internalId;e.phantom=!c;if(c!==d||(c&&d)){e.internalId=c?b:Ext.data.Model.id(e)}e.fireEvent("idchanged",e,f,b,a);e.callStore("onIdChanged",f,b,a)}},hasId:function(a){if(arguments.length===0){a=this.getId()}return !!(a||a===0)},join:function(a){var b=this;if(!b.stores.length){b.stores[0]=a}else{Ext.Array.include(this.stores,a)}this.store=this.stores[0]},unjoin:function(a){Ext.Array.remove(this.stores,a);this.store=this.stores[0]||null},afterEdit:function(a){this.callStore("afterEdit",a)},afterReject:function(){this.callStore("afterReject")},afterCommit:function(a){this.callStore("afterCommit",a)},callStore:function(f){var d=Ext.Array.clone(arguments),b=this.stores,e=0,a=b.length,c;d[0]=this;for(;e<a;++e){c=b[e];if(c&&Ext.isFunction(c[f])){c[f].apply(c,d)}}},getData:function(c){var d=this,a=d.fields.items,h=a.length,g={},b,e;for(e=0;e<h;e++){b=a[e].name;g[b]=d.get(b)}if(c===true){Ext.apply(g,d.getAssociatedData())}return g},getAssociatedData:function(){return this.prepareAssociatedData({},1)},prepareAssociatedData:function(v,y){var x=this,s=x.associations.items,e=s.length,w={},p=[],u=[],l=[],n,b,a,m,f,k,h,t,g,c,r,q,d,z;for(r=0;r<e;r++){c=s[r];t=c.associationId;h=v[t];if(h&&h!==y){continue}v[t]=y;d=c.type;z=c.name;if(d=="hasMany"){n=x[c.storeName];w[z]=[];if(n&&n.getCount()>0){b=n.data.items;g=b.length;for(q=0;q<g;q++){a=b[q];w[z][q]=a.getData();p.push(a);u.push(z);l.push(q)}}}else{if(d=="belongsTo"||d=="hasOne"){a=x[c.instanceName];if(a!==undefined){w[z]=a.getData();p.push(a);u.push(z);l.push(-1)}}}}for(r=0,g=p.length;r<g;++r){a=p[r];m=w[u[r]];f=l[r];k=a.prepareAssociatedData(v,y+1);if(f===-1){Ext.apply(m,k)}else{Ext.apply(m[f],k)}}return w}});