Ext.define("Ext.tree.ViewDropZone",{extend:"Ext.view.DropZone",allowParentInserts:false,allowContainerDrops:false,appendOnly:false,expandDelay:500,indicatorCls:Ext.baseCSSPrefix+"tree-ddindicator",expandNode:function(b){var a=this.view;this.expandProcId=false;if(!b.isLeaf()&&!b.isExpanded()){a.expand(b);this.expandProcId=false}},queueExpand:function(a){this.expandProcId=Ext.Function.defer(this.expandNode,this.expandDelay,this,[a])},cancelExpand:function(){if(this.expandProcId){clearTimeout(this.expandProcId);this.expandProcId=false}},getPosition:function(f,b){var i=this.view,c=i.getRecord(b),g=f.getPageY(),j=c.isLeaf(),a=false,h=Ext.fly(b).getRegion(),d;if(c.isRoot()){return"append"}if(this.appendOnly){return j?false:"append"}if(!this.allowParentInserts){a=c.hasChildNodes()&&c.isExpanded()}d=(h.bottom-h.top)/(j?2:3);if(g>=h.top&&g<(h.top+d)){return"before"}else{if(!a&&(j||(g>=(h.bottom-d)&&g<=h.bottom))){return"after"}else{return"append"}}},isValidDropPoint:function(b,h,m,j,f){if(!b||!f.item){return false}var n=this.view,k=n.getRecord(b),d=f.records,a=d.length,l=d.length,c,g;if(!(k&&h&&a)){return false}for(c=0;c<l;c++){g=d[c];if(g.isNode&&g.contains(k)){return false}}if(h==="append"&&k.get("allowDrop")===false){return false}else{if(h!="append"&&k.parentNode.get("allowDrop")===false){return false}}if(Ext.Array.contains(d,k)){return false}return n.fireEvent("nodedragover",k,h,f,j)!==false},onNodeOver:function(a,h,f,c){var d=this.getPosition(f,a),b=this.dropNotAllowed,i=this.view,g=i.getRecord(a),j=this.getIndicator(),k=0;this.cancelExpand();if(d=="append"&&!this.expandProcId&&!Ext.Array.contains(c.records,g)&&!g.isLeaf()&&!g.isExpanded()){this.queueExpand(g)}if(this.isValidDropPoint(a,d,h,f,c)){this.valid=true;this.currentPosition=d;this.overRecord=g;j.setWidth(Ext.fly(a).getWidth());k=Ext.fly(a).getY()-Ext.fly(i.el).getY()-1;if(d=="before"){b=g.isFirst()?Ext.baseCSSPrefix+"tree-drop-ok-above":Ext.baseCSSPrefix+"tree-drop-ok-between";j.showAt(0,k);h.proxy.show()}else{if(d=="after"){b=g.isLast()?Ext.baseCSSPrefix+"tree-drop-ok-below":Ext.baseCSSPrefix+"tree-drop-ok-between";k+=Ext.fly(a).getHeight();j.showAt(0,k);h.proxy.show()}else{b=Ext.baseCSSPrefix+"tree-drop-ok-append";j.hide()}}}else{this.valid=false}this.currentCls=b;return b},onNodeOut:function(d,a,c,b){this.valid=false;this.getIndicator().hide()},onContainerOver:function(a,c,b){return c.getTarget("."+this.indicatorCls)?this.currentCls:this.dropNotAllowed},notifyOut:function(){this.callParent(arguments);this.cancelExpand()},handleNodeDrop:function(f,m,h){var o=this,a=o.view,j=m?m.parentNode:a.panel.getRootNode(),b=a.getStore().treeStore.model,c,e,l,g,d,k,n,p;if(f.copy){c=f.records;f.records=[];for(e=0,l=c.length;e<l;e++){g=c[e];if(g.isNode){f.records.push(g.copy(undefined,true))}else{f.records.push(new b(g.data,g.getId()))}}}o.cancelExpand();if(h=="before"){d=j.insertBefore;k=[null,m];m=j}else{if(h=="after"){if(m.nextSibling){d=j.insertBefore;k=[null,m.nextSibling]}else{d=j.appendChild;k=[null]}m=j}else{if(!(m.isExpanded()||m.isLoading())){n=true}d=m.appendChild;k=[null]}}p=function(){var i,q;Ext.suspendLayouts();a.getSelectionModel().clearSelections();for(e=0,l=f.records.length;e<l;e++){g=f.records[e];if(!g.isNode){if(g.isModel){g=new b(g.data,g.getId())}else{g=new b(g)}f.records[e]=g}k[0]=g;d.apply(m,k)}if(o.sortOnDrop){m.sort(m.getOwnerTree().store.generateComparator())}Ext.resumeLayouts(true);if(Ext.enableFx&&o.dropHighlight){i=o.dropHighlightColor;for(e=0;e<l;e++){q=a.getNode(f.records[e]);if(q){Ext.fly(q).highlight(i)}}}};if(n){m.expand(false,p)}else{if(m.isLoading()){m.on({expand:p,delay:1,single:true})}else{p()}}}});