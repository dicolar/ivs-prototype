Ext.define("Ext.grid.RowEditor",{extend:"Ext.form.Panel",alias:"widget.roweditor",requires:["Ext.tip.ToolTip","Ext.util.HashMap","Ext.util.KeyNav","Ext.grid.RowEditorButtons"],saveBtnText:"Update",cancelBtnText:"Cancel",errorsText:"Errors",dirtyText:"You need to commit or cancel your changes",lastScrollLeft:0,lastScrollTop:0,border:false,buttonUI:"default",hideMode:"offsets",initComponent:function(){var c=this,b=c.editingPlugin.grid,a=Ext.container.Container;c.cls=Ext.baseCSSPrefix+"grid-editor "+Ext.baseCSSPrefix+"grid-row-editor";c.layout={type:"hbox",align:"middle"};c.lockable=b.lockable;if(c.lockable){c.items=[c.lockedColumnContainer=new a({id:b.id+"-locked-editor-cells",layout:{type:"hbox",align:"middle"},margin:"0 1 0 0"}),c.normalColumnContainer=new a({flex:1,id:b.id+"-normal-editor-cells",layout:{type:"hbox",align:"middle"}})]}else{c.lockedColumnContainer=c.normalColumnContainer=c}c.callParent(arguments);if(c.fields){c.addFieldsForColumn(c.fields,true);c.insertColumnEditor(c.fields);delete c.fields}c.mon(c.hierarchyEventSource,{scope:c,show:c.repositionIfVisible});c.getForm().trackResetOnLoad=true},onGridResize:function(){var c=this,e=c.getClientWidth(),a=c.editingPlugin.grid,d=a.body,b=c.getFloatingButtons();c.setLocalX(d.getOffsetsTo(a)[0]+d.getBorderWidth("l")-a.el.getBorderWidth("l"));c.setWidth(e);b.setLocalX((e-b.getWidth())/2)},onFieldRender:function(c){var b=this,a=c.column;if(a.isVisible()){b.syncFieldWidth(a)}else{if(!a.rendered){b.view.headerCt.on({afterlayout:Ext.Function.bind(b.syncFieldWidth,b,[a]),single:true})}}},syncFieldWidth:function(b){var c=b.getEditor(),a;c._marginWidth=(c._marginWidth||c.el.getMargin("lr"));a=b.getWidth()-c._marginWidth;c.setWidth(a);if(c.xtype==="displayfield"){c.inputWidth=a}},onFieldChange:function(){var c=this,b=c.getForm(),a=b.isValid();if(c.errorSummary&&c.isVisible()){c[a?"hideToolTip":"showToolTip"]()}c.updateButton(a);c.isValid=a},updateButton:function(b){var a=this.floatingButtons;if(a){a.child("#update").setDisabled(!b)}else{this.updateButtonDisabled=!b}},afterRender:function(){var d=this,c=d.editingPlugin,b=c.grid,a=b.lockable?b.normalGrid.view:b.view,e;d.callParent(arguments);d.scrollingView=a;d.scrollingViewEl=a.el;a.mon(d.scrollingViewEl,"scroll",d.onViewScroll,d);d.mon(d.el,{click:Ext.emptyFn,stopPropagation:true});d.mon(b,{resize:d.onGridResize,scope:d});d.el.swallowEvent(["keypress","keydown"]);d.fieldScroller=d.normalColumnContainer.layout.innerCt;d.fieldScroller.dom.style.overflow="hidden";d.fieldScroller.on({scroll:d.onFieldContainerScroll,scope:d});d.keyNav=new Ext.util.KeyNav(d.el,{enter:c.completeEdit,esc:c.onEscKey,scope:c});d.mon(c.view,{beforerefresh:d.onBeforeViewRefresh,refresh:d.onViewRefresh,itemremove:d.onViewItemRemove,scope:d});d.preventReposition=true;Ext.Array.each(d.query("[isFormField]"),function(f){if(f.column.isVisible()){d.onColumnShow(f.column)}},d);delete d.preventReposition},onBeforeViewRefresh:function(b){var c=this,a=b.el.dom;if(c.el.dom.parentNode===a){a.removeChild(c.el.dom)}},onViewRefresh:function(a){var c=this,b=c.context,d;if(b&&(d=a.getNode(b.record,true))){b.row=d;c.reposition();if(c.tooltip&&c.tooltip.isVisible()){c.tooltip.setTarget(b.row)}}else{c.editingPlugin.cancelEdit()}},onViewItemRemove:function(a,b){var c=this.context;if(c&&a===c.record){this.editingPlugin.cancelEdit()}},onViewScroll:function(){var c=this,b=c.editingPlugin.view.el,d=c.scrollingViewEl,e=d.dom.scrollTop,h=d.getScrollLeft(),g=h!==c.lastScrollLeft,a=e!==c.lastScrollTop,f;c.lastScrollTop=e;c.lastScrollLeft=h;if(c.isVisible()){f=Ext.getDom(c.context.row.id);if(f&&b.contains(f)){if(a){c.context.row=f;c.reposition(null,true);if((c.tooltip&&c.tooltip.isVisible())||c.hiddenTip){c.repositionTip()}c.syncEditorClip()}}else{c.setLocalY(-400)}}if(c.rendered&&g){c.syncFieldsHorizontalScroll()}},syncFieldsHorizontalScroll:function(){this.fieldScroller.setScrollLeft(this.lastScrollLeft)},onFieldContainerScroll:function(){this.scrollingViewEl.setScrollLeft(this.fieldScroller.getScrollLeft())},onColumnResize:function(b,a){var c=this;if(c.rendered){c.onGridResize();c.onViewScroll();if(!b.isGroupHeader){c.syncFieldWidth(b);c.repositionIfVisible()}}},onColumnHide:function(a){if(!a.isGroupHeader){a.getEditor().hide();this.repositionIfVisible()}},onColumnShow:function(a){var b=this;if(b.rendered&&!a.isGroupHeader){a.getEditor().show();b.syncFieldWidth(a);if(!b.preventReposition){this.repositionIfVisible()}}},onColumnMove:function(c,a,j){var g=this,d,b=1,f,h,k,e=c.isLocked()?g.lockedColumnContainer:g.normalColumnContainer;if(c.isGroupHeader){Ext.suspendLayouts();c=c.getGridColumns();if(j>a){j--;b=0}this.addFieldsForColumn(c);for(d=0,f=c.length;d<f;d++,a+=b,j+=b){h=c[d].getEditor();k=e.items.indexOf(h);if(k===-1){e.insert(j,h)}else{if(k!=j){e.move(a,j)}}}Ext.resumeLayouts(true)}else{if(j>a){j--}this.addFieldsForColumn(c);h=c.getEditor();k=e.items.indexOf(h);if(k===-1){e.insert(j,h)}else{if(k!=j){e.move(a,j)}}}},onColumnAdd:function(a){if(a.isGroupHeader){a=a.getGridColumns()}this.addFieldsForColumn(a);this.insertColumnEditor(a);this.preventReposition=false},insertColumnEditor:function(c){var d=this,e,a,b;if(Ext.isArray(c)){for(b=0,a=c.length;b<a;b++){d.insertColumnEditor(c[b])}return}if(!c.getEditor){return}e=c.isLocked()?d.lockedColumnContainer:d.normalColumnContainer;e.insert(c.getVisibleIndex(),c.getEditor())},onColumnRemove:function(a,b){b=b.isGroupHeader?b.getGridColumns():b;this.removeColumnEditor(b)},removeColumnEditor:function(c){var d=this,e,a,b;if(Ext.isArray(c)){for(b=0,a=c.length;b<a;b++){d.removeColumnEditor(c[b])}return}if(c.hasEditor()){e=c.getEditor();if(e&&e.ownerCt){e.ownerCt.remove(e,false)}}},onColumnReplace:function(d,a,c,b){this.onColumnRemove(b.ownerCt,b)},getFloatingButtons:function(){var b=this,a=b.floatingButtons;if(!a){b.floatingButtons=a=new Ext.grid.RowEditorButtons({rowEditor:b})}return a},repositionIfVisible:function(d){var b=this,a=b.view;if(d&&(d==b||!d.el.isAncestor(a.el))){return}if(b.isVisible()&&a.isVisible(true)){b.reposition()}},getRefOwner:function(){return this.editingPlugin.grid},getRefItems:function(){var b=this,a;if(b.lockable){a=b.lockedColumnContainer.getRefItems();a.push.apply(a,b.normalColumnContainer.getRefItems())}else{a=b.callParent()}a.push.apply(a,b.getFloatingButtons().getRefItems());return a},reposition:function(i,f){var g=this,b=g.context,j=b&&Ext.get(b.row),c=0,a,d,e,h;if(j&&Ext.isElement(j.dom)){e=g.syncButtonPosition(g.getScrollDelta());if(!g.editingPlugin.grid.rowLines){c=-parseInt(j.first().getStyle("border-bottom-width"))}a=g.calculateLocalRowTop(j);d=g.calculateEditorTop(a)+c;if(!f){h=function(){if(e){g.scrollingViewEl.scrollBy(0,e,true)}g.focusContextCell()}}g.syncEditorClip();if(i){g.animate(Ext.applyIf({to:{top:d},duration:i.duration||125,callback:h},i))}else{g.setLocalY(d);if(h){h()}}}},getScrollDelta:function(){var e=this,d=e.scrollingViewEl.dom,c=e.context,b=e.body,a=0;if(c){a=Ext.fly(c.row).getOffsetsTo(d)[1]-b.getBorderPadding().beforeY;if(a>0){a=Math.max(a+e.getHeight()+e.floatingButtons.getHeight()-d.clientHeight-b.getBorderWidth("b"),0)}}return a},calculateLocalRowTop:function(b){var a=this.editingPlugin.grid;return Ext.fly(b).getOffsetsTo(a)[1]-a.el.getBorderWidth("t")+this.lastScrollTop},calculateEditorTop:function(a){return a-this.body.getBorderPadding().beforeY-this.lastScrollTop},getClientWidth:function(){var c=this,b=c.editingPlugin.grid,a;if(c.lockable){a=b.lockedGrid.getWidth()+b.normalGrid.view.el.dom.clientWidth-1}else{a=b.view.el.dom.clientWidth}return a},getEditor:function(a){var b=this;if(Ext.isNumber(a)){return b.query("[isFormField]")[a]}else{if(a.isHeader&&!a.isGroupHeader){return a.getEditor()}}},addFieldsForColumn:function(c,a){var e=this,b,d,f;if(Ext.isArray(c)){for(b=0,d=c.length;b<d;b++){e.addFieldsForColumn(c[b],a)}return}if(c.getEditor){f=c.getEditor(null,{xtype:"displayfield",getModelData:function(){return null}});if(c.align==="right"){f.fieldStyle="text-align:right"}if(c.xtype==="actioncolumn"){f.fieldCls+=" "+Ext.baseCSSPrefix+"form-action-col-field"}if(e.isVisible()&&e.context){if(f.is("displayfield")){e.renderColumnData(f,e.context.record,c)}else{f.suspendEvents();f.setValue(e.context.record.get(c.dataIndex));f.resumeEvents()}}if(c.hidden){e.onColumnHide(c)}else{if(c.rendered&&!a){e.onColumnShow(c)}}}},loadRecord:function(d){var h=this,a=h.getForm(),e=a.getFields(),g=e.items,b=g.length,c,f,j;for(c=0;c<b;c++){g[c].suspendEvents()}a.loadRecord(d);for(c=0;c<b;c++){g[c].resumeEvents()}j=a.isValid();if(h.errorSummary){if(j){h.hideToolTip()}else{h.showToolTip()}}h.updateButton(j);f=h.query(">displayfield");b=f.length;for(c=0;c<b;c++){h.renderColumnData(f[c],d)}},renderColumnData:function(l,h,c){var j=this,a=j.editingPlugin.grid,e=a.headerCt,k=j.scrollingView,n=k.dataSource,f=c||l.column,m=h.get(f.dataIndex),i=f.editRenderer||f.renderer,b,d,g;if(i){b={tdCls:"",style:""};d=n.indexOf(h);g=e.getHeaderIndex(f);m=i.call(f.scope||e.ownerCt,m,b,h,d,g,n,k)}l.setRawValue(m);l.resetOriginalValue()},beforeEdit:function(){var a=this,b;if(a.isVisible()&&a.errorSummary&&!a.autoCancel&&a.isDirty()){b=a.getScrollDelta();if(b){a.scrollingViewEl.scrollBy(0,b,true)}a.showToolTip();return false}},startEdit:function(a,f){var e=this,b=e.editingPlugin,d=b.grid,c=e.context=b.context;if(!e.rendered){e.width=e.getClientWidth();e.render(d.el,d.el.dom.firstChild);e.getFloatingButtons().render(e.el);e.onViewScroll()}else{e.syncFieldsHorizontalScroll()}if(e.isVisible()){e.reposition(true)}else{e.show()}e.onGridResize();c.grid.getSelectionModel().select(a);e.loadRecord(a)},syncButtonPosition:function(d){var b=this,a=b.getFloatingButtons(),c=b.scrollingViewEl.dom,e=this.getScrollDelta()-(c.scrollHeight-c.scrollTop-c.clientHeight);if(e>0){if(!b._buttonsOnTop){a.setButtonPosition("top");b._buttonsOnTop=true}d=0}else{if(b._buttonsOnTop){a.setButtonPosition("bottom");b._buttonsOnTop=false}}return d},syncEditorClip:function(){var b=this,c=b.getScrollDelta(),a;if(c){b.isOverflowing=true;a=b.floatingButtons.getHeight();if(c>0){b.clipBottom(Math.max(b.getHeight()-c+a,-a))}else{if(c<0){c=Math.abs(c);b.clipTop(Math.max(c,0))}}}else{if(b.isOverflowing){b.clearClip();b.isOverflowing=false}}},focusContextCell:function(){var a=this.getEditor(this.context.column);if(a&&a.focus){a.focus()}},cancelEdit:function(){var f=this,e=f.getForm(),a=e.getFields(),b=a.items,d=b.length,c;f.hide();e.clearInvalid();for(c=0;c<d;c++){b[c].suspendEvents()}e.reset();for(c=0;c<d;c++){b[c].resumeEvents()}},completeEdit:function(){var b=this,a=b.getForm();if(!a.isValid()){return false}a.updateRecord(b.context.record);b.hide();return true},onShow:function(){var a=this;a.callParent(arguments);a.reposition()},onHide:function(){var a=this;a.callParent(arguments);if(a.tooltip){a.hideToolTip()}if(a.context){a.context.view.focusRow(a.context.record);a.context=null}},isDirty:function(){var b=this,a=b.getForm();return a.isDirty()},getToolTip:function(){return this.tooltip||(this.tooltip=new Ext.tip.ToolTip({cls:Ext.baseCSSPrefix+"grid-row-editor-errors",title:this.errorsText,autoHide:false,closable:true,closeAction:"disable",anchor:"left",anchorToTarget:false}))},hideToolTip:function(){var a=this,b=a.getToolTip();if(b.rendered){b.disable()}a.hiddenTip=false},showToolTip:function(){var a=this,b=a.getToolTip();b.showAt([0,0]);b.update(a.getErrors());a.repositionTip();b.enable()},repositionTip:function(){var h=this,i=h.getToolTip(),c=h.context,k=Ext.get(c.row),j=h.scrollingViewEl,e=j.dom.clientHeight,f=h.lastScrollTop,g=f+e,b=k.getHeight(),a=k.getOffsetsTo(h.context.view.body)[1],d=a+b;if(d>f&&a<g){i.showAt(i.getAlignToXY(j,"tl-tr",[15,k.getOffsetsTo(j)[1]]));h.hiddenTip=false}else{i.hide();h.hiddenTip=true}},getErrors:function(){var d=this,e=[],a=d.query(">[isFormField]"),c=a.length,b;for(b=0;b<c;b++){e=e.concat(Ext.Array.map(a[b].getErrors(),d.createErrorListItem))}if(!e.length&&!d.autoCancel&&d.isDirty()){e[0]=d.createErrorListItem(d.dirtyText)}return'<ul class="'+Ext.plainListCls+'">'+e.join("")+"</ul>"},createErrorListItem:function(a){return'<li class="'+Ext.baseCSSPrefix+'grid-row-editor-errors-item">'+a+"</li>"},beforeDestroy:function(){Ext.destroy(this.floatingButtons,this.tooltip);this.callParent()},clipBottom:function(a){this.el.setStyle("clip","rect(-1000px auto "+a+"px auto)")},clipTop:function(a){this.el.setStyle("clip","rect("+a+"px auto 1000px auto)")},clearClip:function(a){this.el.setStyle("clip",Ext.isIE8m||Ext.isIEQuirks?"rect(-1000px auto 1000px auto)":"auto")}});