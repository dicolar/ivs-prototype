Ext.define("Ext.grid.column.Column",{extend:"Ext.grid.header.Container",alias:"widget.gridcolumn",requires:["Ext.util.KeyNav","Ext.grid.ColumnComponentLayout","Ext.grid.ColumnLayout"],alternateClassName:"Ext.grid.Column",baseCls:Ext.baseCSSPrefix+"column-header",hoverCls:Ext.baseCSSPrefix+"column-header-over",handleWidth:4,sortState:null,possibleSortStates:["ASC","DESC"],childEls:["titleEl","triggerEl","textEl"],noWrap:true,renderTpl:'<div id="{id}-titleEl" {tipMarkup}class="'+Ext.baseCSSPrefix+'column-header-inner"><span id="{id}-textEl" class="'+Ext.baseCSSPrefix+'column-header-text{childElCls}">{text}</span><tpl if="!menuDisabled"><div id="{id}-triggerEl" class="'+Ext.baseCSSPrefix+'column-header-trigger{childElCls}"></div></tpl></div>{%this.renderContainer(out,values)%}',dataIndex:null,text:"&#160;",menuText:null,emptyCellText:"&#160;",sortable:true,resizable:true,hideable:true,menuDisabled:false,renderer:false,editRenderer:false,align:"left",draggable:true,tooltipType:"qtip",initDraggable:Ext.emptyFn,tdCls:"",isHeader:true,isColumn:true,ascSortCls:Ext.baseCSSPrefix+"column-header-sort-ASC",descSortCls:Ext.baseCSSPrefix+"column-header-sort-DESC",componentLayout:"columncomponent",groupSubHeaderCls:Ext.baseCSSPrefix+"group-sub-header",groupHeaderCls:Ext.baseCSSPrefix+"group-header",clickTargetName:"titleEl",detachOnRemove:true,initResizable:Ext.emptyFn,initComponent:function(){var b=this,c,a;if(b.header!=null){b.text=b.header;b.header=null}if(!b.triStateSort){b.possibleSortStates.length=2}if(b.columns!=null){b.isGroupHeader=true;if(b.dataIndex){Ext.Error.raise("Ext.grid.column.Column: Group header may not accept a dataIndex")}if((b.width&&b.width!==Ext.grid.header.Container.prototype.defaultWidth)||b.flex){Ext.Error.raise("Ext.grid.column.Column: Group header does not support setting explicit widths or flexs. The group header width is calculated by the sum of its children.")}b.items=b.columns;b.columns=b.flex=b.width=null;b.cls=(b.cls||"")+" "+b.groupHeaderCls;b.sortable=b.resizable=false;b.align="center"}else{if(b.flex){b.minWidth=b.minWidth||Ext.grid.plugin.HeaderResizer.prototype.minColWidth}}b.addCls(Ext.baseCSSPrefix+"column-header-align-"+b.align);c=b.renderer;if(c){if(typeof c=="string"){b.renderer=Ext.util.Format[c]}b.hasCustomRenderer=true}else{if(b.defaultRenderer){b.scope=b;b.renderer=b.defaultRenderer}}b.callParent(arguments);a={element:b.clickTargetName,click:b.onTitleElClick,contextmenu:b.onTitleElContextMenu,mouseenter:b.onTitleMouseOver,mouseleave:b.onTitleMouseOut,scope:b};if(b.resizable){a.dblclick=b.onTitleElDblClick}b.on(a)},onAdd:function(a){if(a.isColumn){a.isSubHeader=true;a.addCls(this.groupSubHeaderCls)}if(this.hidden){a.hide()}this.callParent(arguments)},onRemove:function(a){if(a.isSubHeader){a.isSubHeader=false;a.removeCls(this.groupSubHeaderCls)}this.callParent(arguments)},initRenderData:function(){var b=this,d="",c=b.tooltip,a=b.tooltipType=="qtip"?"data-qtip":"title";if(!Ext.isEmpty(c)){d=a+'="'+c+'" '}return Ext.applyIf(b.callParent(arguments),{text:b.text,menuDisabled:b.menuDisabled,tipMarkup:d})},applyColumnState:function(b){var a=this;a.applyColumnsState(b.columns);if(b.hidden!=null){a.hidden=b.hidden}if(b.locked!=null){a.locked=b.locked}if(b.sortable!=null){a.sortable=b.sortable}if(b.width!=null){a.flex=null;a.width=b.width}else{if(b.flex!=null){a.width=null;a.flex=b.flex}}},getColumnState:function(){var e=this,b=e.items.items,a=b?b.length:0,d,c=[],f={id:e.getStateId()};e.savePropsToState(["hidden","sortable","locked","flex","width"],f);if(e.isGroupHeader){for(d=0;d<a;d++){c.push(b[d].getColumnState())}if(c.length){f.columns=c}}else{if(e.isSubHeader&&e.ownerCt.hidden){delete e.hidden}}if("width" in f){delete f.flex}return f},getStateId:function(){return this.stateId||this.headerId},setText:function(a){this.text=a;if(this.rendered){this.textEl.update(a)}},getIndex:function(){return this.isGroupColumn?false:this.getOwnerHeaderCt().getHeaderIndex(this)},getVisibleIndex:function(){return this.isGroupColumn?false:Ext.Array.indexOf(this.getOwnerHeaderCt().getVisibleGridColumns(),this)},beforeRender:function(){var b=this,a=b.up("tablepanel");b.callParent();if(a&&(!b.sortable||a.sortableColumns===false)&&!b.groupable&&!b.lockable&&(a.enableColumnHide===false||!b.getOwnerHeaderCt().getHideableColumns().length)){b.menuDisabled=true}b.protoEl.unselectable()},afterRender:function(){var b=this,a=b.triggerEl,c;b.callParent(arguments);if(!Ext.isIE8||!Ext.isStrict){b.mon(b.getFocusEl(),{focus:b.onTitleMouseOver,blur:b.onTitleMouseOut,scope:b})}if(a&&b.self.triggerElWidth===undefined){a.setStyle("display","block");b.self.triggerElWidth=a.getWidth();a.setStyle("display","")}b.keyNav=new Ext.util.KeyNav(b.el,{enter:b.onEnterKey,down:b.onDownKey,scope:b})},afterComponentLayout:function(d,a,c,f){var e=this,b=e.getOwnerHeaderCt();e.callParent(arguments);if(b&&(c!=null||e.flex)&&d!==c){b.onHeaderResize(e,d,true)}},onDestroy:function(){var a=this;Ext.destroy(a.textEl,a.keyNav,a.field);a.keyNav=null;a.callParent(arguments)},onTitleMouseOver:function(){this.titleEl.addCls(this.hoverCls)},onTitleMouseOut:function(){this.titleEl.removeCls(this.hoverCls)},onDownKey:function(a){if(this.triggerEl){this.onTitleElClick(a,this.triggerEl.dom||this.el.dom)}},onEnterKey:function(a){this.onTitleElClick(a,this.el.dom)},onTitleElDblClick:function(f,a){var c=this,b,d;if(c.isOnLeftEdge(f)){b=c.previousNode("gridcolumn:not([hidden]):not([isGroupHeader])");if(b&&b.getOwnerHeaderCt()===c.getOwnerHeaderCt()){b.autoSize()}}else{if(c.isOnRightEdge(f)){if(c.isGroupHeader&&f.getPoint().isContainedBy(c.layout.innerCt)){d=c.query("gridcolumn:not([hidden]):not([isGroupHeader])");this.getOwnerHeaderCt().autoSizeColumn(d[d.length-1]);return}c.autoSize()}}},autoSize:function(){var b=this,c,e,a,d;if(b.isGroupHeader){c=b.query("gridcolumn:not([hidden]):not([isGroupHeader])");e=c.length;d=this.getOwnerHeaderCt();Ext.suspendLayouts();for(a=0;a<e;a++){d.autoSizeColumn(c[a])}Ext.resumeLayouts(true);return}this.getOwnerHeaderCt().autoSizeColumn(this)},onTitleElClick:function(d,b){var c=this,a=c.getOwnerHeaderCt();if(a&&!a.ddLock){if(c.triggerEl&&(d.target===c.triggerEl.dom||b===c.triggerEl.dom||d.within(c.triggerEl))){a.onHeaderTriggerClick(c,d,b)}else{if(d.getKey()||(!c.isOnLeftEdge(d)&&!c.isOnRightEdge(d))){c.toggleSortState();a.onHeaderClick(c,d,b)}}}},onTitleElContextMenu:function(d,b){var c=this,a=c.getOwnerHeaderCt();if(a&&!a.ddLock){a.onHeaderContextMenu(c,d,b)}},processEvent:function(f,b,a,c,d,g){return this.fireEvent.apply(this,arguments)},toggleSortState:function(){var b=this,a,c;if(b.sortable){a=Ext.Array.indexOf(b.possibleSortStates,b.sortState);c=(a+1)%b.possibleSortStates.length;b.setSortState(b.possibleSortStates[c])}},doSort:function(c){var b=this.up("tablepanel"),a=b.store;if(b.ownerLockable&&a.isNodeStore){a=b.ownerLockable.lockedGrid.store}a.sort({property:this.getSortParam(),direction:c})},getSortParam:function(){return this.dataIndex},setSortState:function(f,e,c){var d=this,g=d.ascSortCls,b=d.descSortCls,a=d.getOwnerHeaderCt(),h=d.sortState;f=f||null;if(!d.sorting&&h!==f&&(d.getSortParam()!=null)){if(f&&!c){d.sorting=true;d.doSort(f);d.sorting=false}switch(f){case"DESC":d.addCls(b);d.removeCls(g);break;case"ASC":d.addCls(g);d.removeCls(b);break;default:d.removeCls([g,b])}if(a&&!d.triStateSort&&!e){a.clearOtherSortStates(d)}d.sortState=f;if(d.triStateSort||f!=null){a.fireEvent("sortchange",a,d,f)}}},isHideable:function(){var a={hideCandidate:this,result:this.hideable};if(a.result){this.ownerCt.bubble(this.hasOtherMenuEnabledChildren,null,[a])}return a.result},hasOtherMenuEnabledChildren:function(a){var b,c;if(!this.isXType("headercontainer")){a.result=false;return false}b=this.query(">:not([hidden]):not([menuDisabled])");c=b.length;if(Ext.Array.contains(b,a.hideCandidate)){c--}if(c){return false}a.hideCandidate=this},isLockable:function(){var a={result:this.lockable!==false};if(a.result){this.ownerCt.bubble(this.hasMultipleVisibleChildren,null,[a])}return a.result},isLocked:function(){return this.locked||!!this.up("[isColumn][locked]","[isRootHeader]")},hasMultipleVisibleChildren:function(a){if(!this.isXType("headercontainer")){a.result=false;return false}if(this.query(">:not([hidden])").length>1){return false}},hide:function(c){var h=this,e=h.getOwnerHeaderCt(),b=h.ownerCt,a,j,g,f,d;if(!h.isVisible()){return h}if(!e){h.callParent();return h}if(e.forceFit){h.visibleSiblingCount=e.getVisibleGridColumns().length-1;if(h.flex){h.savedWidth=h.getWidth();h.flex=null}}a=b.isGroupHeader;if(a&&!c){g=b.query(">:not([hidden])");if(g.length===1&&g[0]==h){h.ownerCt.hide();return}}Ext.suspendLayouts();if(h.isGroupHeader){g=h.items.items;for(d=0,f=g.length;d<f;d++){j=g[d];if(!j.hidden){j.hide(true)}}}h.callParent();e.onHeaderHide(h);Ext.resumeLayouts(true);return h},show:function(f,g){var m=this,j=m.getOwnerHeaderCt(),d=m.ownerCt,l,k,h,n,b,a,e,c,o=Ext.grid.header.Container.prototype.defaultWidth;if(m.isVisible()){return m}if(!m.rendered){m.hidden=false;return}a=j.el.getViewSize().width-(j.view.el.dom.scrollHeight>j.view.el.dom.clientHeight?Ext.getScrollbarSize().width:0);if(j.forceFit){l=Ext.ComponentQuery.query(":not([flex])",j.getVisibleGridColumns());if(l.length){m.width=m.savedWidth||m.width||o}else{l=j.getVisibleGridColumns();k=l.length;c=m.visibleSiblingCount;b=(m.savedWidth||m.width||o);b=Math.min(b*(c/k),o,Math.max(a-(k*o),o));m.width=null;m.flex=b;a-=b;e=0;for(h=0;h<k;h++){n=l[h];n.flex=(n.width||n.getWidth());e+=n.flex;n.width=null}for(h=0;h<k;h++){n=l[h];n.flex=n.flex/e*a}}}Ext.suspendLayouts();if(m.isSubHeader&&d.hidden){d.show(false,true)}m.callParent(arguments);if(m.isGroupHeader&&g!==true&&!m.query(":not([hidden])").length){l=m.items.items;for(h=0,k=l.length;h<k;h++){n=l[h];if(n.hidden){n.show(true)}}}Ext.resumeLayouts(true);d=m.getOwnerHeaderCt();if(d){d.onHeaderShow(m)}},getDesiredWidth:function(){var a=this;if(a.rendered&&a.componentLayout&&a.componentLayout.lastComponentSize){return a.componentLayout.lastComponentSize.width}else{if(a.flex){return a.width}else{return a.width}}},getCellSelector:function(){return"."+Ext.baseCSSPrefix+"grid-cell-"+this.getItemId()},getCellInnerSelector:function(){return this.getCellSelector()+" ."+Ext.baseCSSPrefix+"grid-cell-inner"},isOnLeftEdge:function(a){return(a.getXY()[0]-this.getX()<=this.handleWidth)},isOnRightEdge:function(a){return(this.getX()+this.getWidth()-a.getXY()[0]<=this.handleWidth)},setMenuActive:function(a){this.titleEl[a?"addCls":"removeCls"](this.headerOpenCls)}});