Ext.define("Ext.tip.Tip",{extend:"Ext.panel.Panel",alternateClassName:"Ext.Tip",minWidth:40,maxWidth:500,shadow:"sides",defaultAlign:"tl-bl?",constrainPosition:true,autoRender:true,hidden:true,baseCls:Ext.baseCSSPrefix+"tip",floating:{shadow:true,shim:true},focusOnToFront:false,closeAction:"hide",ariaRole:"tooltip",alwaysFramed:true,frameHeader:false,initComponent:function(){var a=this;a.floating=Ext.apply({},{shadow:a.shadow,constrain:a.constrainPosition},a.self.prototype.floating);a.callParent(arguments);a.constrain=a.constrain||a.constrainPosition},showAt:function(b){var a=this;this.callParent(arguments);if(a.isVisible()){a.setPagePosition(b[0],b[1]);if(a.constrainPosition||a.constrain){a.doConstrain()}a.toFront(true)}},initDraggable:function(){var a=this;a.draggable={el:a.getDragEl(),delegate:a.header.el,constrain:a,constrainTo:a.el.dom.parentNode};Ext.Component.prototype.initDraggable.call(a)},ghost:undefined,unghost:undefined});