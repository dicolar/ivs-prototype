Ext.define("Ext.container.ButtonGroup",{extend:"Ext.panel.Panel",alias:"widget.buttongroup",alternateClassName:"Ext.ButtonGroup",requires:["Ext.layout.container.Table"],baseCls:Ext.baseCSSPrefix+"btn-group",layout:{type:"table"},defaultType:"button",frame:true,frameHeader:false,titleAlign:"center",noTitleCls:"notitle",initComponent:function(){var a=this,b=a.columns;if(b){a.layout=Ext.apply({},{columns:b},a.layout)}if(!a.title){a.addClsWithUI(a.noTitleCls)}a.callParent(arguments)},onBeforeAdd:function(a){if(a.isButton){if(this.defaultButtonUI&&a.ui==="default"&&!a.hasOwnProperty("ui")){a.ui=this.defaultButtonUI}else{a.ui=a.ui+"-toolbar"}}this.callParent(arguments)},applyDefaults:function(a){if(!Ext.isString(a)){a=this.callParent(arguments)}return a}});