Ext.define("Ext.grid.feature.Feature",{extend:"Ext.util.Observable",alias:"feature.feature",wrapsItem:false,isFeature:true,disabled:false,hasFeatureEvent:true,eventPrefix:null,eventSelector:null,view:null,grid:null,constructor:function(a){this.initialConfig=a;this.callParent(arguments)},clone:function(){return new this.self(this.initialConfig)},init:Ext.emptyFn,destroy:function(){this.clearListeners()},getFireEventArgs:function(b,a,c,d){return[b,a,c,d]},vetoEvent:Ext.emptyFn,enable:function(){this.disabled=false},disable:function(){this.disabled=true}});