Ext.define("Ext.data.Group",{extend:"Ext.util.Observable",key:undefined,dirty:true,constructor:function(){this.callParent(arguments);this.records=[]},contains:function(a){return Ext.Array.indexOf(this.records,a)!==-1},add:function(a){Ext.Array.push(this.records,a);this.dirty=true},remove:function(b){if(!Ext.isArray(b)){b=[b]}var a=b.length,c;for(c=0;c<a;++c){Ext.Array.remove(this.records,b[c])}this.dirty=true},isDirty:function(){return this.dirty},hasAggregate:function(){return !!this.aggregate},setDirty:function(){this.dirty=true},commit:function(){this.dirty=false},isCollapsed:function(){return this.collapsed},getAggregateRecord:function(a){var b=this,c;if(a===true||b.dirty||!b.aggregate){c=b.store.model;b.aggregate=new c();b.aggregate.isSummary=true}return b.aggregate}});