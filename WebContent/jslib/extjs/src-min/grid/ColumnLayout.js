Ext.define("Ext.grid.ColumnLayout",{extend:"Ext.layout.container.HBox",alias:"layout.gridcolumn",type:"gridcolumn",reserveOffset:false,firstHeaderCls:Ext.baseCSSPrefix+"column-header-first",lastHeaderCls:Ext.baseCSSPrefix+"column-header-last",initLayout:function(){if(!this.scrollbarWidth){this.self.prototype.scrollbarWidth=Ext.getScrollbarSize().width}this.grid=this.owner.up("[scrollerOwner]");this.callParent()},beginLayout:function(c){var h=this,b=h.owner,a=h.grid,j=a.view,g=h.getVisibleItems(),f=g.length,d=h.firstHeaderCls,l=h.lastHeaderCls,e,k;if(a.lockable){if(b.up("tablepanel")===j.normalGrid){j=j.normalGrid.getView()}else{j=null}}for(e=0;e<f;e++){k=g[e];k.isLast=false;k.removeCls([d,l]);if(e===0){k.addCls(d)}if(e===f-1){k.addCls(l);k.isLast=true}}h.callParent(arguments);if(!b.isColumn&&Ext.getScrollbarSize().width&&!a.collapsed&&j&&j.rendered&&(c.viewTable=j.body.dom)){c.viewContext=c.context.getCmp(j)}},roundFlex:function(a){return Math.floor(a)},calculate:function(a){this.callParent(arguments);if(a.state.parallelDone&&(!this.owner.forceFit||a.flexedItems.length)){a.setProp("columnWidthsDone",true)}if(a.viewContext){a.state.tableHeight=a.viewTable.offsetHeight}},completeLayout:function(d){var b=this,a=b.owner,c=d.state;b.callParent(arguments);if(!d.flexedItems.length&&!c.flexesCalculated&&a.forceFit&&b.convertWidthsToFlexes(d)){b.cacheFlexes(d);d.invalidate({state:{flexesCalculated:true}})}else{d.setProp("columnWidthsDone",true)}},convertWidthsToFlexes:function(a){var f=this,d=0,g=f.sizeModels.calculated,c,e,b,j,h;c=a.childItems;e=c.length;for(b=0;b<e;b++){j=c[b];h=j.target;d+=j.props.width;if(!(h.fixed||h.resizable===false)){h.flex=a.childItems[b].flex=j.props.width;h.width=null;j.widthModel=g}}return d!==a.props.width},getContainerSize:function(e){var d=this,a,c=e.viewContext,b;if(d.owner.isColumn){a=d.getColumnContainerSize(e)}else{a=d.callParent(arguments);if(c&&!c.heightModel.shrinkWrap&&c.target.componentLayout.ownerContext){b=c.getProp("height");if(isNaN(b)){d.done=false}else{if(e.state.tableHeight>b){a.width-=Ext.getScrollbarSize().width;e.state.parallelDone=false;c.invalidate()}}}}return a},getColumnContainerSize:function(f){var h=f.paddingContext.getPaddingInfo(),b=0,e=0,g,d,c,a;if(!f.widthModel.shrinkWrap){++e;c=f.getProp("innerWidth");g=(typeof c=="number");if(g){++b;c-=h.width;if(c<0){c=0}}}if(!f.heightModel.shrinkWrap){++e;a=f.getProp("innerHeight");d=(typeof a=="number");if(d){++b;a-=h.height;if(a<0){a=0}}}return{width:c,height:a,needed:e,got:b,gotAll:b==e,gotWidth:g,gotHeight:d}},publishInnerCtSize:function(e){var d=this,c=e.state.boxPlan.targetSize,b=e.peek("contentWidth"),a;d.owner.tooNarrow=e.state.boxPlan.tooNarrow;if((b!=null)&&!d.owner.isColumn){c.width=b;a=d.owner.ownerCt.view;if(a.scrollFlags.y){c.width+=Ext.getScrollbarSize().width}}return d.callParent(arguments)}});