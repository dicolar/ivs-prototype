Ext.define("Ext.form.field.Picker",{extend:"Ext.form.field.Trigger",alias:"widget.pickerfield",alternateClassName:"Ext.form.Picker",requires:["Ext.util.KeyNav"],matchFieldWidth:true,pickerAlign:"tl-bl?",openCls:Ext.baseCSSPrefix+"pickerfield-open",editable:true,initComponent:function(){this.callParent();this.addEvents("expand","collapse","select")},initEvents:function(){var a=this;a.callParent();a.keyNav=new Ext.util.KeyNav(a.inputEl,{down:a.onDownArrow,esc:{handler:a.onEsc,scope:a,defaultEventAction:false},scope:a,forceKeyDown:true});if(!a.editable){a.mon(a.inputEl,"click",a.onTriggerClick,a)}if(Ext.isGecko){a.inputEl.dom.setAttribute("autocomplete","off")}},onEsc:function(a){if(Ext.isIE){a.preventDefault()}if(this.isExpanded){this.collapse();a.stopEvent()}},onDownArrow:function(a){if(!this.isExpanded){this.onTriggerClick()}},expand:function(){var c=this,a,b,d;if(c.rendered&&!c.isExpanded&&!c.isDestroyed){c.expanding=true;a=c.bodyEl;b=c.getPicker();d=c.collapseIf;b.show();c.isExpanded=true;c.alignPicker();a.addCls(c.openCls);c.mon(Ext.getDoc(),{mousewheel:d,mousedown:d,scope:c});Ext.EventManager.onWindowResize(c.alignPicker,c);c.fireEvent("expand",c);c.onExpand();delete c.expanding}},onExpand:Ext.emptyFn,alignPicker:function(){var b=this,a=b.getPicker();if(b.isExpanded){if(b.matchFieldWidth){a.setWidth(b.bodyEl.getWidth())}if(a.isFloating()){b.doAlign()}}},doAlign:function(){var d=this,c=d.picker,a="-above",b;d.picker.alignTo(d.triggerWrap,d.pickerAlign,d.pickerOffset);b=c.el.getY()<d.inputEl.getY();d.bodyEl[b?"addCls":"removeCls"](d.openCls+a);c[b?"addCls":"removeCls"](c.baseCls+a)},collapse:function(){if(this.isExpanded&&!this.isDestroyed){var d=this,c=d.openCls,b=d.picker,e=Ext.getDoc(),f=d.collapseIf,a="-above";b.hide();d.isExpanded=false;d.bodyEl.removeCls([c,c+a]);b.el.removeCls(b.baseCls+a);e.un("mousewheel",f,d);e.un("mousedown",f,d);Ext.EventManager.removeResizeListener(d.alignPicker,d);d.fireEvent("collapse",d);d.onCollapse()}},onCollapse:Ext.emptyFn,collapseIf:function(b){var a=this;if(!a.isDestroyed&&!b.within(a.bodyEl,false,true)&&!b.within(a.picker.el,false,true)&&!a.isEventWithinPickerLoadMask(b)){a.collapse()}},getPicker:function(){var a=this;return a.picker||(a.picker=a.createPicker())},createPicker:Ext.emptyFn,onTriggerClick:function(){var a=this;if(!a.readOnly&&!a.disabled){if(a.isExpanded){a.collapse()}else{a.expand()}a.inputEl.focus()}},triggerBlur:function(){var a=this.picker;this.callParent(arguments);if(a&&a.isVisible()){a.hide()}},mimicBlur:function(c){var b=this,a=b.picker;if(!a||!c.within(a.el,false,true)&&!b.isEventWithinPickerLoadMask(c)){b.callParent(arguments)}},onDestroy:function(){var b=this,a=b.picker;Ext.EventManager.removeResizeListener(b.alignPicker,b);Ext.destroy(b.keyNav);if(a){delete a.pickerField;a.destroy()}b.callParent()},isEventWithinPickerLoadMask:function(b){var a=this.picker.loadMask;return a?b.within(a.maskEl,false,true)||b.within(a.el,false,true):false}});