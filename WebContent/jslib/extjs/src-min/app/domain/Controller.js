Ext.define("Ext.app.domain.Controller",{extend:"Ext.app.EventDomain",singleton:true,requires:["Ext.app.Controller"],type:"controller",idProperty:"id",constructor:function(){var a=this;a.callParent();a.monitor(Ext.app.Controller)}});