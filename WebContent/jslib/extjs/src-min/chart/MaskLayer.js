Ext.define("Ext.chart.MaskLayer",{extend:"Ext.Component",constructor:function(a){a=Ext.apply(a||{},{style:"position:absolute;background-color:#ff9;cursor:crosshair;opacity:0.5;border:1px solid #00f;"});this.callParent([a])},initComponent:function(){var a=this;a.callParent(arguments);a.addEvents("mousedown","mouseup","mousemove","mouseenter","mouseleave")},initDraggable:function(){this.callParent(arguments);this.dd.onStart=function(c){var b=this,a=b.comp;this.startPosition=a.getPosition(true);if(a.ghost&&!a.liveDrag){b.proxy=a.ghost();b.dragTarget=b.proxy.header.el}if(b.constrain||b.constrainDelegate){b.constrainTo=b.calculateConstrainRegion()}}}});