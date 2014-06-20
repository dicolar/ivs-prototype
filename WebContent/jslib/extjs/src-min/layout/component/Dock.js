Ext.define("Ext.layout.component.Dock",{extend:"Ext.layout.component.Component",alias:"layout.dock",alternateClassName:"Ext.layout.component.AbstractDock",type:"dock",horzAxisProps:{name:"horz",oppositeName:"vert",dockBegin:"left",dockEnd:"right",horizontal:true,marginBegin:"margin-left",maxSize:"maxWidth",minSize:"minWidth",pos:"x",setSize:"setWidth",shrinkWrapDock:"shrinkWrapDockWidth",size:"width",sizeModel:"widthModel"},vertAxisProps:{name:"vert",oppositeName:"horz",dockBegin:"top",dockEnd:"bottom",horizontal:false,marginBegin:"margin-top",maxSize:"maxHeight",minSize:"minHeight",pos:"y",setSize:"setHeight",shrinkWrapDock:"shrinkWrapDockHeight",size:"height",sizeModel:"heightModel"},initializedBorders:-1,horizontalCollapsePolicy:{width:true,x:true},verticalCollapsePolicy:{height:true,y:true},finishRender:function(){var b=this,c,a;b.callParent();c=b.getRenderTarget();a=b.getDockedItems();b.finishRenderItems(c,a)},isItemBoxParent:function(a){return true},isItemShrinkWrap:function(a){return true},noBorderClasses:[Ext.baseCSSPrefix+"docked-noborder-top",Ext.baseCSSPrefix+"docked-noborder-right",Ext.baseCSSPrefix+"docked-noborder-bottom",Ext.baseCSSPrefix+"docked-noborder-left"],noBorderClassesSides:{top:Ext.baseCSSPrefix+"docked-noborder-top",right:Ext.baseCSSPrefix+"docked-noborder-right",bottom:Ext.baseCSSPrefix+"docked-noborder-bottom",left:Ext.baseCSSPrefix+"docked-noborder-left"},borderWidthProps:{top:"border-top-width",right:"border-right-width",bottom:"border-bottom-width",left:"border-left-width"},handleItemBorders:function(){var l=this,a=l.owner,k,p,g=l.lastDockedItems,f=l.borders,b=a.dockedItems.generation,c=l.noBorderClassesSides,m=l.borderWidthProps,e,j,o,n,h,d=l.collapsed;if(l.initializedBorders==b||(a.border&&!a.manageBodyBorders)){return}l.initializedBorders=b;l.collapsed=false;l.lastDockedItems=p=l.getLayoutItems();l.collapsed=d;k={top:[],right:[],bottom:[],left:[]};for(e=0,j=p.length;e<j;e++){o=p[e];n=o.dock;if(o.ignoreBorderManagement){continue}if(!k[n].satisfied){k[n].push(o);k[n].satisfied=true}if(!k.top.satisfied&&n!=="bottom"){k.top.push(o)}if(!k.right.satisfied&&n!=="left"){k.right.push(o)}if(!k.bottom.satisfied&&n!=="top"){k.bottom.push(o)}if(!k.left.satisfied&&n!=="right"){k.left.push(o)}}if(g){for(e=0,j=g.length;e<j;e++){o=g[e];if(!o.isDestroyed&&!o.ignoreBorderManagement&&!a.manageBodyBorders){o.removeCls(l.noBorderClasses)}}}if(f){for(h in f){if(a.manageBodyBorders&&f[h].satisfied){a.setBodyStyle(m[h],"")}}}for(h in k){j=k[h].length;if(!a.manageBodyBorders){for(e=0;e<j;e++){k[h][e].addCls(c[h])}if((!k[h].satisfied&&!a.bodyBorder)||a.bodyBorder===false){a.addBodyCls(c[h])}}else{if(k[h].satisfied){a.setBodyStyle(m[h],"1px")}}}l.borders=k},beforeLayoutCycle:function(f){var c=this,b=c.owner,g=c.sizeModels.shrinkWrap,e=b.shrinkWrapDock,d,a;if(b.collapsed){if(b.collapsedVertical()){a=true;f.measureDimensions=1}else{d=true;f.measureDimensions=2}}f.collapsedVert=a;f.collapsedHorz=d;if(a){f.heightModel=g}else{if(d){f.widthModel=g}}e=e===true?3:(e||0);f.shrinkWrapDockHeight=(e&1)&&f.heightModel.shrinkWrap;f.shrinkWrapDockWidth=(e&2)&&f.widthModel.shrinkWrap},beginLayout:function(d){var j=this,c=j.owner,n=j.getLayoutItems(),b=d.context,f=n.length,k,h,m,a,e,g,l;j.callParent(arguments);g=c.getCollapsed();if(g!==j.lastCollapsedState&&Ext.isDefined(j.lastCollapsedState)){if(j.owner.collapsed){d.isCollapsingOrExpanding=1;c.addClsWithUI(c.collapsedCls)}else{d.isCollapsingOrExpanding=2;c.removeClsWithUI(c.collapsedCls);d.lastCollapsedState=j.lastCollapsedState}}j.lastCollapsedState=g;d.dockedItems=k=[];for(h=0;h<f;h++){m=n[h];if(m.rendered){l=m.dock;a=b.getCmp(m);a.dockedAt={x:0,y:0};a.offsets=e=Ext.Element.parseBox(m.offsets||0);a.horizontal=l=="top"||l=="bottom";e.width=e.left+e.right;e.height=e.top+e.bottom;k.push(a)}}d.bodyContext=d.getEl("body")},beginLayoutCycle:function(b){var e=this,k=b.dockedItems,d=k.length,a=e.owner,f=a.frameBody,j=e.lastHeightModel,c,h,g;e.callParent(arguments);if(e.owner.manageHeight){if(e.lastBodyDisplay){a.body.dom.style.display=e.lastBodyDisplay=""}}else{if(e.lastBodyDisplay!=="inline-block"){a.body.dom.style.display=e.lastBodyDisplay="inline-block"}if(j&&j.shrinkWrap&&!b.heightModel.shrinkWrap){a.body.dom.style.marginBottom=""}}if(b.widthModel.auto){if(b.widthModel.shrinkWrap){a.el.setWidth(null)}a.body.setWidth(null);if(f){f.setWidth(null)}}if(b.heightModel.auto){a.body.setHeight(null);if(f){f.setHeight(null)}}if(b.collapsedVert){b.setContentHeight(0)}else{if(b.collapsedHorz){b.setContentWidth(0)}}for(c=0;c<d;c++){h=k[c].target;g=h.dock;if(g=="right"){h.setLocalX(0)}else{if(g!="left"){continue}}}},calculate:function(d){var k=this,c=k.measureAutoDimensions(d,d.measureDimensions),b=d.state,j=b.horzDone,e=b.vertDone,f=d.bodyContext,i,a,h,g,l;d.borderInfo||d.getBorderInfo();d.paddingInfo||d.getPaddingInfo();d.frameInfo||d.getFrameInfo();f.borderInfo||f.getBorderInfo();f.paddingInfo||f.getPaddingInfo();if(!d.frameBorder){if(!(i=d.framing)){d.frameBorder=d.borderInfo;d.framePadding=d.paddingInfo}else{d.frameBorder=i.border;d.framePadding=i.padding}}a=!j&&k.createAxis(d,c.contentWidth,d.widthModel,k.horzAxisProps,d.collapsedHorz);h=!e&&k.createAxis(d,c.contentHeight,d.heightModel,k.vertAxisProps,d.collapsedVert);for(g=0,l=d.dockedItems.length;l--;++g){if(a){k.dockChild(d,a,l,g)}if(h){k.dockChild(d,h,l,g)}}if(a&&k.finishAxis(d,a)){b.horzDone=j=a}if(h&&k.finishAxis(d,h)){b.vertDone=e=h}if(j&&e&&k.finishConstraints(d,j,e)){k.finishPositions(d,j,e)}else{k.done=false}},createAxis:function(o,i,e,l,d){var t=this,s=0,b=t.owner,f=b[l.maxSize],c=b[l.minSize]||0,m=l.dockBegin,h=l.dockEnd,q=l.pos,k=l.size,j=f!=null,n=e.shrinkWrap,a,r,p,g;if(n){if(d){g=0}else{a=o.bodyContext;g=i+a.borderInfo[k]}}else{r=o.frameBorder;p=o.framePadding;s=r[m]+p[m];g=o.getProp(k)-(r[h]+p[h])}return{shrinkWrap:e.shrinkWrap,sizeModel:e,initialBegin:s,begin:s,end:g,collapsed:d,horizontal:l.horizontal,ignoreFrameBegin:null,ignoreFrameEnd:null,initialSize:g-s,maxChildSize:0,hasMinMaxConstraints:(c||j)&&e.shrinkWrap,minSize:c,maxSize:j?f:1000000000,bodyPosProp:t.owner.manageHeight?q:l.marginBegin,dockBegin:m,dockEnd:h,posProp:q,sizeProp:k,setSize:l.setSize,shrinkWrapDock:o[l.shrinkWrapDock],sizeModelName:l.sizeModel,dockedPixelsEnd:0}},dockChild:function(b,c,k,e){var f=this,a=b.dockedItems[c.shrinkWrap?k:e],h=a.target,i=h.dock,d=c.sizeProp,g,j;if(h.ignoreParentFrame&&b.isCollapsingOrExpanding){a.clearMarginCache()}a.marginInfo||a.getMarginInfo();if(i==c.dockBegin){if(c.shrinkWrap){g=f.dockOutwardBegin(b,a,h,c)}else{g=f.dockInwardBegin(b,a,h,c)}}else{if(i==c.dockEnd){if(c.shrinkWrap){g=f.dockOutwardEnd(b,a,h,c)}else{g=f.dockInwardEnd(b,a,h,c)}}else{if(c.shrinkWrapDock){j=a.getProp(d)+a.marginInfo[d];c.maxChildSize=Math.max(c.maxChildSize,j);g=0}else{g=f.dockStretch(b,a,h,c)}}}a.dockedAt[c.posProp]=g},dockInwardBegin:function(b,a,i,d){var f=d.begin,e=d.sizeProp,c=i.ignoreParentFrame,g,j,h;if(c){d.ignoreFrameBegin=a;h=i.dock;g=b.frameBorder[h];f-=g+b.framePadding[h]}if(!i.overlay){j=a.getProp(e)+a.marginInfo[e];d.begin+=j;if(c){d.begin-=g}}return f},dockInwardEnd:function(e,d,c,b){var h=b.sizeProp,a=d.getProp(h)+d.marginInfo[h],g=b.end-a,f;if(!c.overlay){b.end=g}if(c.ignoreParentFrame){b.ignoreFrameEnd=d;f=e.frameBorder[c.dock];g+=f+e.framePadding[c.dock];b.end+=f}return g},dockOutwardBegin:function(e,d,c,b){var g=b.begin,f=b.sizeProp,a;if(b.collapsed){b.ignoreFrameBegin=b.ignoreFrameEnd=d}else{if(c.ignoreParentFrame){b.ignoreFrameBegin=d}}if(!c.overlay){a=d.getProp(f)+d.marginInfo[f];g-=a;b.begin=g}return g},dockOutwardEnd:function(e,d,c,b){var g=b.end,f=b.sizeProp,a;a=d.getProp(f)+d.marginInfo[f];if(b.collapsed){b.ignoreFrameBegin=b.ignoreFrameEnd=d}else{if(c.ignoreParentFrame){b.ignoreFrameEnd=d}}if(!c.overlay){b.end=g+a;b.dockedPixelsEnd+=a}return g},dockStretch:function(c,b,l,d){var m=l.dock,i=d.sizeProp,a=m=="top"||m=="bottom",h=c.frameBorder,e=b.offsets,k=c.framePadding,g=a?"right":"bottom",o=a?"left":"top",j=d.begin+e[o],f,n;if(l.stretch!==false){n=d.end-j-e[g];if(l.ignoreParentFrame){j-=k[o]+h[o];n+=k[i]+h[i]}f=b.marginInfo;n-=f[i];b[d.setSize](n)}return j},finishAxis:function(l,e){if(isNaN(e.maxChildSize)){return false}var d=e.begin,o=e.end-d,g=e.collapsed,v=e.setSize,j=e.dockBegin,t=e.dockEnd,n=l.framePadding,q=l.frameBorder,f=q[j],r=l.framing,m=r&&r[j],b=g?0:n[j],i=e.sizeProp,s=e.ignoreFrameBegin,p=e.ignoreFrameEnd,a=l.bodyContext,k=Math.max(f+b-m,0),c,w,u,h;if(e.shrinkWrap){w=e.initialSize;if(r){u=-d+f+b;c=u-m-k}else{c=-d;u=c+b}if(!g){o+=n[i]}if(s){u-=f;c-=f;s.dockedAt[e.posProp]-=b}else{o+=f}if(g){}else{if(p){p.dockedAt[e.posProp]+=n[t]}else{o+=q[t]}}e.size=o;if(!e.horizontal&&!this.owner.manageHeight){h=false}}else{if(r){u=0;c=d-m-k}else{u=-f;c=d-b-f}w=o}e.delta=u;a[v](w,h);a.setProp(e.bodyPosProp,c);return !isNaN(o)},beforeInvalidateShrinkWrapDock:function(c,b){var a=b.axis.sizeModelName;if(!c[a].constrainedMin){c[a]=Ext.layout.SizeModel.calculated}},afterInvalidateShrinkWrapDock:function(d,a){var b=a.axis,c=a.layout,e;if(d[b.sizeModelName].calculated){e=c.dockStretch(a.ownerContext,d,d.target,b);d.setProp(b.posProp,b.delta+e)}},finishConstraints:function(j,c,o){var r=this,q=r.sizeModels,n=c.shrinkWrap,p=o.shrinkWrap,a=r.owner,h,l,m,f,g,k,b,d,e,i;if(n){k=c.size;b=c.collapsed?0:c.minSize;d=c.maxSize;e=c.maxChildSize;i=Math.max(k,e);if(i>d){g=q.constrainedMax;m=d}else{if(i<b){g=q.constrainedMin;m=b}else{if(k<e){g=q.constrainedDock;a.dockConstrainedWidth=m=e}else{m=k}}}}if(p){k=o.size;b=o.collapsed?0:o.minSize;d=o.maxSize;e=o.maxChildSize;i=Math.max(k,e+k-o.initialSize);if(i>d){f=q.constrainedMax;l=d}else{if(i<b){f=q.constrainedMin;l=b}else{if(k<e){f=q.constrainedDock;a.dockConstrainedHeight=l=e}else{if(!j.collapsedVert&&!a.manageHeight){h=false;j.bodyContext.setProp("margin-bottom",o.dockedPixelsEnd)}l=k}}}}if(g||f){if(g&&f&&g.constrainedMax&&f.constrainedByMin){j.invalidate({widthModel:g});return false}if(!j.widthModel.calculatedFromShrinkWrap&&!j.heightModel.calculatedFromShrinkWrap){j.invalidate({widthModel:g,heightModel:f});return false}}else{r.invalidateAxes(j,c,o)}if(n){j.setWidth(m);if(g){j.widthModel=g}}if(p){j.setHeight(l,h);if(f){j.heightModel=f}}return true},invalidateAxes:function(f,a,k){var o=this.beforeInvalidateShrinkWrapDock,b=this.afterInvalidateShrinkWrapDock,e=a.end-a.begin,r=k.initialSize,c=a.shrinkWrapDock&&a.maxChildSize<e,l=k.shrinkWrapDock&&k.maxChildSize<r,p,m,j,d,q,n,g,h;if(c||l){if(l){k.begin=k.initialBegin;k.end=k.begin+k.initialSize}p=f.dockedItems;for(j=0,m=p.length;j<m;++j){d=p[j];n=d.horizontal;g=null;if(c&&n){h=a.sizeProp;q=e;g=a}else{if(l&&!n){h=k.sizeProp;q=r;g=k}}if(g){q-=d.getMarginInfo()[h];if(q!==d.props[h]){d.invalidate({before:o,after:b,axis:g,ownerContext:f,layout:this})}}}}},finishPositions:function(d,a,g){var i=d.dockedItems,c=i.length,f=a.delta,e=g.delta,h,b;for(h=0;h<c;++h){b=i[h];b.setProp("x",f+b.dockedAt.x);b.setProp("y",e+b.dockedAt.y)}},finishedLayout:function(b){var a=this,c=b.target;a.callParent(arguments);if(!b.animatePolicy){if(b.isCollapsingOrExpanding===1){c.afterCollapse(false)}else{if(b.isCollapsingOrExpanding===2){c.afterExpand(false)}}}},getAnimatePolicy:function(c){var b=this,a,d;if(c.isCollapsingOrExpanding==1){a=b.lastCollapsedState}else{if(c.isCollapsingOrExpanding==2){a=c.lastCollapsedState}}if(a=="left"||a=="right"){d=b.horizontalCollapsePolicy}else{if(a=="top"||a=="bottom"){d=b.verticalCollapsePolicy}}return d},getDockedItems:function(c,m){var h=this,e=(c==="visual"),j=e?Ext.ComponentQuery.query("[rendered]",h.owner.dockedItems.items):h.owner.dockedItems.items,g=j&&j.length&&c!==false,b,l,k,f,d,a;if(m==null){k=g&&!e?j.slice():j}else{k=[];for(f=0,a=j.length;f<a;++f){l=j[f].dock;d=(l=="top"||l=="left");if(m?d:!d){k.push(j[f])}}g=g&&k.length}if(g){b=(c=c||"render")=="render";Ext.Array.sort(k,function(n,i){var o,p;if(b&&((o=h.owner.dockOrder[n.dock])!==(p=h.owner.dockOrder[i.dock]))){if(!(o+p)){return o-p}}o=h.getItemWeight(n,c);p=h.getItemWeight(i,c);if((o!==undefined)&&(p!==undefined)){return o-p}return 0})}return k||[]},getItemWeight:function(b,a){var c=b.weight||this.owner.defaultDockWeights[b.dock];return c[a]||c},getLayoutItems:function(){var e=this,b,f,d,c,a;if(e.owner.collapsed){a=e.owner.getCollapsedDockedItems()}else{b=e.getDockedItems("visual");f=b.length;a=[];for(c=0;c<f;c++){d=b[c];if(!d.hidden){a.push(d)}}}return a},measureContentWidth:function(a){var b=a.bodyContext;return b.el.getWidth()-b.getBorderInfo().width},measureContentHeight:function(a){var b=a.bodyContext;return b.el.getHeight()-b.getBorderInfo().height},redoLayout:function(c){var b=this,a=b.owner;if(c.isCollapsingOrExpanding==1){if(a.reExpander){a.reExpander.el.show()}a.addClsWithUI(a.collapsedCls);c.redo(true)}else{if(c.isCollapsingOrExpanding==2){a.removeClsWithUI(a.collapsedCls);c.bodyContext.redo()}}},renderChildren:function(){var b=this,a=b.getDockedItems(),c=b.getRenderTarget();b.handleItemBorders();b.renderItems(a,c)},renderItems:function(h,g){var k=this,c=h.length,a=0,b=0,o=0,l=k.getRenderTarget().dom.childNodes,m=l.length,f,d,e,n;for(f=0,d=0;f<m;f++){e=l[f];if(Ext.fly(e).hasCls(Ext.baseCSSPrefix+"resizable-handle")){break}for(d=0;d<c;d++){n=h[d];if(n.rendered&&n.el.dom===e){break}}if(d===c){o++}}for(;a<c;a++,b++){n=h[a];if(a===b&&(n.dock==="right"||n.dock==="bottom")){b+=o}if(n&&!n.rendered){k.renderItem(n,g,b)}else{if(!k.isValidParent(n,g,b)){k.moveItem(n,g,b)}}}},undoLayout:function(c){var b=this,a=b.owner;if(c.isCollapsingOrExpanding==1){if(a.reExpander){a.reExpander.el.hide()}a.removeClsWithUI(a.collapsedCls);c.undo(true)}else{if(c.isCollapsingOrExpanding==2){a.addClsWithUI(a.collapsedCls);c.bodyContext.undo()}}},sizePolicy:{nostretch:{setsWidth:0,setsHeight:0},horz:{shrinkWrap:{setsWidth:1,setsHeight:0,readsWidth:1},stretch:{setsWidth:1,setsHeight:0}},vert:{shrinkWrap:{setsWidth:0,setsHeight:1,readsHeight:1},stretch:{setsWidth:0,setsHeight:1}},stretchV:{setsWidth:0,setsHeight:1},autoStretchH:{readsWidth:1,setsWidth:1,setsHeight:0},autoStretchV:{readsHeight:1,setsWidth:0,setsHeight:1}},getItemSizePolicy:function(d,f){var c=this,g=c.sizePolicy,e=c.owner.shrinkWrapDock,b,a;if(d.stretch===false){return g.nostretch}b=d.dock;a=(b=="left"||b=="right");e=e===true?3:(e||0);if(a){g=g.vert;e=e&1}else{g=g.horz;e=e&2}if(e){if(!f){f=c.owner.getSizeModel()}if(f[a?"height":"width"].shrinkWrap){return g.shrinkWrap}}return g.stretch},configureItem:function(a,b){this.callParent(arguments);a.addCls(Ext.baseCSSPrefix+"docked");a.addClsWithUI(this.getDockCls(a.dock))},getDockCls:function(a){return"docked-"+a},afterRemove:function(a){this.callParent(arguments);if(this.itemCls){a.el.removeCls(this.itemCls+"-"+a.dock)}var b=a.el.dom;if(!a.destroying&&b){b.parentNode.removeChild(b)}this.childrenChanged=true},borderCollapseMap:{},getBorderCollapseTable:function(){var d=this,f=d.borderCollapseMap,a=d.owner,b=a.baseCls,e=a.ui,c;f=f[b]||(f[b]={});c=f[e];if(!c){b+="-"+e+"-outer-border-";f[e]=c=[0,b+"l",b+"b",b+"bl",b+"r",b+"rl",b+"rb",b+"rbl",b+"t",b+"tl",b+"tb",b+"tbl",b+"tr",b+"trl",b+"trb",b+"trbl"]}return c}});