Ext.define("Ext.toolbar.TextItem",{extend:"Ext.toolbar.Item",requires:["Ext.XTemplate"],alias:"widget.tbtext",alternateClassName:"Ext.Toolbar.TextItem",text:"",renderTpl:"{text}",baseCls:Ext.baseCSSPrefix+"toolbar-text",beforeRender:function(){var a=this;a.callParent();Ext.apply(a.renderData,{text:a.text})},setText:function(b){var a=this;a.text=b;if(a.rendered){a.el.update(b);a.updateLayout()}}});