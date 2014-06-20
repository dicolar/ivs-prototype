Ext.define("Ext.layout.ContextItem",{requires:["Ext.layout.ClassList"],heightModel:null,widthModel:null,sizeModel:null,optOut:false,ownerSizePolicy:null,boxChildren:null,boxParent:null,isBorderBoxValue:null,children:[],dirty:null,dirtyCount:0,hasRawContent:true,isContextItem:true,isTopLevel:false,consumersContentHeight:0,consumersContentWidth:0,consumersContainerHeight:0,consumersContainerWidth:0,consumersHeight:0,consumersWidth:0,ownerCtContext:null,remainingChildDimensions:0,props:null,state:null,wrapsComponent:false,constructor:function(q){var r=this,o=Ext.layout.SizeModel.sizeModels,j=o.configured,i=o.shrinkWrap,b,p,m,l,f,d,s,e,n,k,c,h,g,a;Ext.apply(r,q);b=r.el;r.id=b.id;r.flushedProps={};r.props=f={};r.styles={};s=r.target;if(!s.isComponent){p=b.lastBox}else{r.wrapsComponent=true;r.framing=s.frameSize||null;r.isComponentChild=s.ownerLayout&&s.ownerLayout.isComponentLayout;p=s.lastBox;m=s.ownerCt;if(m&&(l=m.el&&r.context.items[m.el.id])){r.ownerCtContext=l}r.sizeModel=d=s.getSizeModel(l&&l.widthModel.pairsByHeightOrdinal[l.heightModel.ordinal]);r.widthModel=h=d.width;r.heightModel=g=d.height;if(p&&p.invalid===false){k=(s.width===(e=p.width));c=(s.height===(n=p.height));if(h===i&&g===i){a=true}else{if(h===j&&k){a=g===i||(g===j&&c)}}if(a){r.optOut=true;f.width=e;f.height=n}}}r.lastBox=p},init:function(h,c){var s=this,a=s.props,d=s.dirty,k=s.ownerCtContext,o=s.target.ownerLayout,g=!s.state,t=h||g,e,m,l,p,b,u,v=s.heightModel,f=s.widthModel,j,q,r=0;s.dirty=s.invalid=false;s.props={};s.remainingChildDimensions=0;if(s.boxChildren){s.boxChildren.length=0}if(!g){s.clearAllBlocks("blocks");s.clearAllBlocks("domBlocks")}if(!s.wrapsComponent){return t}u=s.target;s.state={};if(g){if(u.beforeLayout&&u.beforeLayout!==Ext.emptyFn){u.beforeLayout()}if(!k&&(p=u.ownerCt)){k=s.context.items[p.el.id]}if(k){s.ownerCtContext=k;s.isBoxParent=u.ownerLayout.isItemBoxParent(s)}else{s.isTopLevel=true}s.frameBodyContext=s.getEl("frameBody")}else{k=s.ownerCtContext;s.isTopLevel=!k;e=s.children;for(m=0,l=e.length;m<l;++m){e[m].init(true)}}s.hasRawContent=!(u.isContainer&&u.items.items.length>0);if(h){s.widthModel=s.heightModel=null;b=u.getSizeModel(k&&k.widthModel.pairsByHeightOrdinal[k.heightModel.ordinal]);if(g){s.sizeModel=b}s.widthModel=b.width;s.heightModel=b.height;if(k&&!s.isComponentChild){k.remainingChildDimensions+=2}}else{if(a){s.recoverProp("x",a,d);s.recoverProp("y",a,d);if(s.widthModel.calculated){s.recoverProp("width",a,d)}else{if("width" in a){++r}}if(s.heightModel.calculated){s.recoverProp("height",a,d)}else{if("height" in a){++r}}if(k&&!s.isComponentChild){k.remainingChildDimensions+=r}}}if(a&&o&&o.manageMargins){s.recoverProp("margin-top",a,d);s.recoverProp("margin-right",a,d);s.recoverProp("margin-bottom",a,d);s.recoverProp("margin-left",a,d)}if(c){j=c.heightModel;q=c.widthModel;if(q&&j&&f&&v){if(f.shrinkWrap&&v.shrinkWrap){if(q.constrainedMax&&j.constrainedMin){j=null}}}if(q){s.widthModel=q}if(j){s.heightModel=j}if(c.state){Ext.apply(s.state,c.state)}}return t},initContinue:function(e){var f=this,d=f.ownerCtContext,a=f.target,c=f.widthModel,g=a.getHierarchyState(),b;if(c.fixed){g.inShrinkWrapTable=false}else{delete g.inShrinkWrapTable}if(e){if(d&&c.shrinkWrap){b=d.isBoxParent?d:d.boxParent;if(b){b.addBoxChild(f)}}else{if(c.natural){f.boxParent=d}}}return e},initDone:function(d){var b=this,a=b.props,c=b.state;if(b.remainingChildDimensions===0){a.containerChildrenSizeDone=true}if(d){a.containerLayoutDone=true}if(b.boxChildren&&b.boxChildren.length&&b.widthModel.shrinkWrap){b.el.setWidth(10000);c.blocks=(c.blocks||0)+1}},initAnimation:function(){var b=this,c=b.target,a=b.ownerCtContext;if(a&&a.isTopLevel){b.animatePolicy=c.ownerLayout.getAnimatePolicy(b)}else{if(!a&&c.isCollapsingOrExpanding&&c.animCollapse){b.animatePolicy=c.componentLayout.getAnimatePolicy(b)}}if(b.animatePolicy){b.context.queueAnimation(b)}},addCls:function(a){this.getClassList().addMany(a)},removeCls:function(a){this.getClassList().removeMany(a)},addBlock:function(b,d,e){var c=this,f=c[b]||(c[b]={}),a=f[e]||(f[e]={});if(!a[d.id]){a[d.id]=d;++d.blockCount;++c.context.blockCount}},addBoxChild:function(d){var c=this,b,a=d.widthModel;d.boxParent=this;d.measuresBox=a.shrinkWrap?d.hasRawContent:a.natural;if(d.measuresBox){b=c.boxChildren;if(b){b.push(d)}else{c.boxChildren=[d]}}},addPositionStyles:function(d,b){var a=b.x,e=b.y,c=0;if(a!==undefined){d.left=a+"px";++c}if(e!==undefined){d.top=e+"px";++c}return c},addTrigger:function(f,g){var e=this,a=g?"domTriggers":"triggers",h=e[a]||(e[a]={}),b=e.context,d=b.currentLayout,c=h[f]||(h[f]={});if(!c[d.id]){c[d.id]=d;++d.triggerCount;c=b.triggers[g?"dom":"data"];(c[d.id]||(c[d.id]=[])).push({item:this,prop:f});if(e.props[f]!==undefined){if(!g||!(e.dirty&&(f in e.dirty))){++d.firedTriggers}}}},boxChildMeasured:function(){var b=this,c=b.state,a=(c.boxesMeasured=(c.boxesMeasured||0)+1);if(a==b.boxChildren.length){c.clearBoxWidth=1;++b.context.progressCount;b.markDirty()}},borderNames:["border-top-width","border-right-width","border-bottom-width","border-left-width"],marginNames:["margin-top","margin-right","margin-bottom","margin-left"],paddingNames:["padding-top","padding-right","padding-bottom","padding-left"],trblNames:["top","right","bottom","left"],cacheMissHandlers:{borderInfo:function(a){var b=a.getStyles(a.borderNames,a.trblNames);b.width=b.left+b.right;b.height=b.top+b.bottom;return b},marginInfo:function(a){var b=a.getStyles(a.marginNames,a.trblNames);b.width=b.left+b.right;b.height=b.top+b.bottom;return b},paddingInfo:function(b){var a=b.frameBodyContext||b,c=a.getStyles(b.paddingNames,b.trblNames);c.width=c.left+c.right;c.height=c.top+c.bottom;return c}},checkCache:function(a){return this.cacheMissHandlers[a](this)},clearAllBlocks:function(a){var c=this[a],b;if(c){for(b in c){this.clearBlocks(a,b)}}},clearBlocks:function(c,f){var g=this[c],b=g&&g[f],d,e,a;if(b){delete g[f];d=this.context;for(a in b){e=b[a];--d.blockCount;if(!--e.blockCount&&!e.pending&&!e.done){d.queueLayout(e)}}}},block:function(a,b){this.addBlock("blocks",a,b)},domBlock:function(a,b){this.addBlock("domBlocks",a,b)},fireTriggers:function(b,f){var g=this[b],d=g&&g[f],c=this.context,e,a;if(d){for(a in d){e=d[a];++e.firedTriggers;if(!e.done&&!e.blockCount&&!e.pending){c.queueLayout(e)}}}},flush:function(){var b=this,a=b.dirty,c=b.state,d=b.el;b.dirtyCount=0;if(b.classList&&b.classList.dirty){b.classList.flush()}if("attributes" in b){d.set(b.attributes);delete b.attributes}if("innerHTML" in b){d.innerHTML=b.innerHTML;delete b.innerHTML}if(c&&c.clearBoxWidth){c.clearBoxWidth=0;b.el.setStyle("width",null);if(!--c.blocks){b.context.queueItemLayouts(b)}}if(a){delete b.dirty;b.writeProps(a,true)}},flushAnimations:function(){var n=this,c=n.previousSize,k,m,e,g,f,d,h,l,i,a,b;if(c){k=n.target;m=k.layout&&k.layout.animate;if(m){e=Ext.isNumber(m)?m:m.duration}g=Ext.Object.getKeys(n.animatePolicy);f=Ext.apply({},{from:{},to:{},duration:e||Ext.fx.Anim.prototype.duration},m);for(d=0,h=0,l=g.length;h<l;h++){i=g[h];a=c[i];b=n.peek(i);if(a!=b){i=n.translateProps[i]||i;f.from[i]=a;f.to[i]=b;++d}}if(d){if(n.isCollapsingOrExpanding===1){k.componentLayout.undoLayout(n)}else{n.writeProps(f.from)}n.el.animate(f);Ext.fx.Manager.getFxQueue(n.el.id)[0].on({afteranimate:function(){if(n.isCollapsingOrExpanding===1){k.componentLayout.redoLayout(n);k.afterCollapse(true)}else{if(n.isCollapsingOrExpanding===2){k.afterExpand(true)}}}})}}},getBorderInfo:function(){var a=this,b=a.borderInfo;if(!b){a.borderInfo=b=a.checkCache("borderInfo")}return b},getClassList:function(){return this.classList||(this.classList=new Ext.layout.ClassList(this))},getEl:function(c,a){var e=this,f,d,b;if(c){if(c.dom){d=c}else{f=e.target;if(a){f=a}d=f[c];if(typeof d=="function"){d=d.call(f);if(d===e.el){return this}}}if(d){b=e.context.getEl(e,d)}}return b||null},getFrameInfo:function(){var c=this,d=c.frameInfo,b,a;if(!d){b=c.framing;a=c.getBorderInfo();c.frameInfo=d=b?{top:b.top+a.top,right:b.right+a.right,bottom:b.bottom+a.bottom,left:b.left+a.left,width:b.width+a.width,height:b.height+a.height}:a}return d},getMarginInfo:function(){var d=this,g=d.marginInfo,b,a,f,e,c;if(!g){if(!d.wrapsComponent){g=d.checkCache("marginInfo")}else{b=d.target;e=b.ownerLayout;c=e?e.id:null;a=e&&e.manageMargins;g=b.margin$;if(g&&g.ownerId!==c){g=null}if(!g){g=d.parseMargins(b,b.margin)||d.checkCache("marginInfo");if(a){f=d.parseMargins(b,b.margins,e.defaultMargins);if(f){g={top:g.top+f.top,right:g.right+f.right,bottom:g.bottom+f.bottom,left:g.left+f.left}}d.setProp("margin-top",0);d.setProp("margin-right",0);d.setProp("margin-bottom",0);d.setProp("margin-left",0)}g.ownerId=c;b.margin$=g}g.width=g.left+g.right;g.height=g.top+g.bottom}d.marginInfo=g}return g},clearMarginCache:function(){delete this.marginInfo;delete this.target.margin$},getPaddingInfo:function(){var a=this,b=a.paddingInfo;if(!b){a.paddingInfo=b=a.checkCache("paddingInfo")}return b},getProp:function(c){var b=this,a=b.props[c];b.addTrigger(c);return a},getDomProp:function(c){var b=this,a=(b.dirty&&(c in b.dirty))?undefined:b.props[c];b.addTrigger(c,true);return a},getStyle:function(a){var c=this,b=c.styles,e,d;if(a in b){d=b[a]}else{e=c.styleInfo[a];d=c.el.getStyle(a);if(e&&e.parseInt){d=parseInt(d,10)||0}b[a]=d}return d},getStyles:function(o,b){var l=this,e=l.styles,p={},f=0,d=o.length,j,h,k,a,c,g,q,m;b=b||o;for(j=0;j<d;++j){a=o[j];if(a in e){p[b[j]]=e[a];++f;if(j&&f==1){h=o.slice(0,j);k=b.slice(0,j)}}else{if(f){(h||(h=[])).push(a);(k||(k=[])).push(b[j])}}}if(f<d){h=h||o;k=k||b;g=l.styleInfo;q=l.el.getStyle(h);for(j=h.length;j--;){a=h[j];c=g[a];m=q[a];if(c&&c.parseInt){m=parseInt(m,10)||0}p[k[j]]=m;e[a]=m}}return p},hasProp:function(a){return this.getProp(a)!=null},hasDomProp:function(a){return this.getDomProp(a)!=null},invalidate:function(a){this.context.queueInvalidate(this,a)},markDirty:function(){if(++this.dirtyCount==1){this.context.queueFlush(this)}},onBoxMeasured:function(){var a=this.boxParent,b=this.state;if(a&&a.widthModel.shrinkWrap&&!b.boxMeasured&&this.measuresBox){b.boxMeasured=1;a.boxChildMeasured()}},parseMargins:function(a,e,d){if(e===true){e=5}var c=typeof e,b;if(c=="string"||c=="number"){b=a.parseBox(e)}else{if(e||d){b={top:0,right:0,bottom:0,left:0};if(d){Ext.apply(b,this.parseMargins(a,d))}if(e){e=Ext.apply(b,a.parseBox(e))}}}return b},peek:function(a){return this.props[a]},recoverProp:function(f,b,a){var e=this,d=e.props,c;if(f in b){d[f]=b[f];if(a&&f in a){c=e.dirty||(e.dirty={});c[f]=a[f]}}},redo:function(b){var e=this,c,a,d;e.revertProps(e.props);if(b&&e.wrapsComponent){if(e.childItems){for(d=0,c=e.childItems,a=c.length;d<a;d++){c[d].redo(b)}}for(d=0,c=e.children,a=c.length;d<a;d++){c[d].redo()}}},removeEl:function(b,a){var d=this,e,c;if(b){if(b.dom){c=b}else{e=d.target;if(a){e=a}c=e[b];if(typeof c=="function"){c=c.call(e);if(c===d.el){return this}}}if(c){d.context.removeEl(d,c)}}},revertProps:function(d){var a,b=this.flushedProps,c={};for(a in d){if(b.hasOwnProperty(a)){c[a]=d[a]}}this.writeProps(c)},setAttribute:function(a,c){var b=this;if(!b.attributes){b.attributes={}}b.attributes[a]=c;b.markDirty()},setBox:function(b){var a=this;if("left" in b){a.setProp("x",b.left)}if("top" in b){a.setProp("y",b.top)}a.setSize(b.width,b.height)},setContentHeight:function(a,b){if(!b&&this.hasRawContent){return 1}return this.setProp("contentHeight",a)},setContentWidth:function(b,a){if(!a&&this.hasRawContent){return 1}return this.setProp("contentWidth",b)},setContentSize:function(c,a,b){return this.setContentWidth(c,b)+this.setContentHeight(a,b)==2},setProp:function(d,c,a){var b=this,g=typeof c,f,e;if(g=="undefined"||(g==="number"&&isNaN(c))){return 0}if(b.props[d]===c){return 1}b.props[d]=c;++b.context.progressCount;if(a===false){b.fireTriggers("domTriggers",d);b.clearBlocks("domBlocks",d)}else{e=b.styleInfo[d];if(e){if(!b.dirty){b.dirty={}}if(d=="width"||d=="height"){f=b.isBorderBoxValue;if(f===null){b.isBorderBoxValue=f=!!b.el.isBorderBox()}if(!f){b.borderInfo||b.getBorderInfo();b.paddingInfo||b.getPaddingInfo()}}b.dirty[d]=c;b.markDirty()}}b.fireTriggers("triggers",d);b.clearBlocks("blocks",d);return 1},setHeight:function(j,a){var f=this,d=f.target,c=f.ownerCtContext,g,e,b,i,h;if(j<0){j=0}if(!f.wrapsComponent){if(!f.setProp("height",j,a)){return NaN}}else{b=f.collapsedVert?0:(d.minHeight||0);j=Ext.Number.constrain(j,b,d.maxHeight);i=f.props.height;if(!f.setProp("height",j,a)){return NaN}if(c&&!f.isComponentChild&&isNaN(i)){h=--c.remainingChildDimensions;if(!h){c.setProp("containerChildrenSizeDone",true)}}g=f.frameBodyContext;if(g){e=f.getFrameInfo();g.setHeight(j-e.height,a)}}return j},setWidth:function(b,a){var h=this,f=h.target,e=h.ownerCtContext,i,g,d,c,j;if(b<0){b=0}if(!h.wrapsComponent){if(!h.setProp("width",b,a)){return NaN}}else{d=h.collapsedHorz?0:(f.minWidth||0);b=Ext.Number.constrain(b,d,f.maxWidth);c=h.props.width;if(!h.setProp("width",b,a)){return NaN}if(e&&!h.isComponentChild&&isNaN(c)){j=--e.remainingChildDimensions;if(!j){e.setProp("containerChildrenSizeDone",true)}}i=h.frameBodyContext;if(i){g=h.getFrameInfo();i.setWidth(b-g.width,a)}}return b},setSize:function(c,a,b){this.setWidth(c,b);this.setHeight(a,b)},translateProps:{x:"left",y:"top"},undo:function(b){var e=this,c,a,d;e.revertProps(e.lastBox);if(b&&e.wrapsComponent){if(e.childItems){for(d=0,c=e.childItems,a=c.length;d<a;d++){c[d].undo(b)}}for(d=0,c=e.children,a=c.length;d<a;d++){c[d].undo()}}},unsetProp:function(b){var a=this.dirty;delete this.props[b];if(a){delete a[b]}},writeProps:function(e,d){if(!(e&&typeof e=="object")){Ext.Logger.warn("writeProps expected dirtyProps to be an object");return}var v=this,c=v.el,h={},g=0,b=v.styleInfo,u,i,m,o=e.width,k=e.height,t=v.isBorderBoxValue,w=v.target,q=Math.max,s=0,j=0,f,a,n,p,r,l;if("displayed" in e){c.setDisplayed(e.displayed)}for(i in e){if(d){v.fireTriggers("domTriggers",i);v.clearBlocks("domBlocks",i);v.flushedProps[i]=1}u=b[i];if(u&&u.dom){if(u.suffix&&(m=parseInt(e[i],10))){h[i]=m+u.suffix}else{h[i]=e[i]}++g}}if("x" in e||"y" in e){if(w.isComponent){w.setPosition(e.x,e.y)}else{g+=v.addPositionStyles(h,e)}}if(!t&&(o>0||k>0)){if(!(v.borderInfo&&v.paddingInfo)){throw Error("Needed to have gotten the borderInfo and paddingInfo when the width or height was setProp'd")}if(!v.frameBodyContext){s=v.paddingInfo.width;j=v.paddingInfo.height}if(o){o=q(parseInt(o,10)-(v.borderInfo.width+s),0);h.width=o+"px";++g}if(k){k=q(parseInt(k,10)-(v.borderInfo.height+j),0);h.height=k+"px";++g}}if(v.wrapsComponent&&Ext.isIE9&&Ext.isStrict){if((f=o!==undefined&&v.hasOverflowY)||(a=k!==undefined&&v.hasOverflowX)){n=v.isAbsolute;if(n===undefined){n=false;l=v.target.getTargetEl();r=l.getStyle("position");if(r=="absolute"){r=l.getStyle("box-sizing");n=(r=="border-box")}v.isAbsolute=n}if(n){p=Ext.getScrollbarSize();if(f){o=parseInt(o,10)+p.width;h.width=o+"px";++g}if(a){k=parseInt(k,10)+p.height;h.height=k+"px";++g}}}}if(g){c.setStyle(h)}}},function(){var c={dom:true,parseInt:true,suffix:"px"},b={dom:true},a={dom:false};this.prototype.styleInfo={containerChildrenSizeDone:a,containerLayoutDone:a,displayed:a,done:a,x:a,y:a,columnWidthsDone:a,left:c,top:c,right:c,bottom:c,width:c,height:c,"border-top-width":c,"border-right-width":c,"border-bottom-width":c,"border-left-width":c,"margin-top":c,"margin-right":c,"margin-bottom":c,"margin-left":c,"padding-top":c,"padding-right":c,"padding-bottom":c,"padding-left":c,"line-height":b,display:b}});