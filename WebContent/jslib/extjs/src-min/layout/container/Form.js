Ext.define("Ext.layout.container.Form",{alias:"layout.form",extend:"Ext.layout.container.Container",alternateClassName:"Ext.layout.FormLayout",tableCls:Ext.baseCSSPrefix+"form-layout-table",type:"form",createsInnerCt:true,manageOverflow:true,lastOverflowAdjust:{width:0,height:0},childEls:["formTable"],padRow:'<tr><td class="'+Ext.baseCSSPrefix+'form-item-pad" colspan="3"></td></tr>',renderTpl:['<table id="{ownerId}-formTable" class="{tableCls}" style="width:100%" cellpadding="0">',"{%this.renderBody(out,values)%}","</table>","{%this.renderPadder(out,values)%}"],getRenderData:function(){var a=this.callParent();a.tableCls=this.tableCls;return a},calculate:function(f){var e=this,h=e.getContainerSize(f,true),a,g,b=0,d,c=f.sizeModel.height.shrinkWrap;if(c){if(f.hasDomProp("containerChildrenSizeDone")){f.setProp("contentHeight",e.formTable.dom.offsetHeight+f.targetContext.getPaddingInfo().height)}else{e.done=false}}if(h.gotWidth){a=e.formTable.dom.offsetWidth;g=f.childItems;for(d=g.length;b<d;++b){g[b].setWidth(a,false)}}else{e.done=false}},getRenderTarget:function(){return this.formTable},getRenderTree:function(){var d=this,b=d.callParent(arguments),c,a;for(c=0,a=b.length;c<a;c++){b[c]=d.transformItemRenderTree(b[c])}return b},transformItemRenderTree:function(a){if(a.tag&&a.tag=="table"){a.tag="tbody";delete a.cellspacing;delete a.cellpadding;if(Ext.isIE6){a.cn=this.padRow}return a}return{tag:"tbody",cn:{tag:"tr",cn:{tag:"td",colspan:3,style:"width:100%",cn:a}}}},isValidParent:function(b,c,a){return true},isItemShrinkWrap:function(a){return((a.shrinkWrap===true)?3:a.shrinkWrap||0)&2},getItemSizePolicy:function(a){return{setsWidth:1,setsHeight:0}},beginLayoutCycle:function(b,a){var c=this.overflowPadderEl;if(c){c.setStyle("display","none")}if(!b.state.overflowAdjust){b.state.overflowAdjust=this.lastOverflowAdjust}},calculateOverflow:function(m,q,f){var u=this,l=m.targetContext,j=u.manageOverflow,c=m.state,k=c.overflowAdjust,e,i,b,n,a,r,h,p,d,o,s,g,t;if(j&&!c.secondPass&&!u.reserveScrollbar){g=(u.getOverflowXStyle(m)==="auto");t=(u.getOverflowYStyle(m)==="auto");if(!q.gotWidth){g=false}if(!q.gotHeight){t=false}if(g||t){r=Ext.getScrollbarSize();h=m.peek("contentWidth");p=m.peek("contentHeight");n=l.getPaddingInfo();h-=n.width;p-=n.height;d=q.width;o=q.height;s=u.getScrollbarsNeeded(d,o,h,p);c.overflowState=s;if(typeof f=="number"){s&=~f}k={width:(g&&(s&2))?r.width:0,height:(t&&(s&1))?r.height:0};if(k.width!==u.lastOverflowAdjust.width||k.height!==u.lastOverflowAdjust.height){u.done=false;m.invalidate({state:{overflowAdjust:k,overflowState:c.overflowState,secondPass:true}})}}}if(!u.done){return}b=m.padElContext||(m.padElContext=m.getEl("overflowPadderEl",u));if(b){s=c.overflowState;e=m.peek("contentWidth");i=1;if(s){n=l.getPaddingInfo();a=u.scrollRangeFlags;if((s&2)&&(a&1)){i+=n.bottom}if((s&1)&&(a&4)){e+=n.right}b.setProp("display","");b.setSize(e,i)}else{b.setProp("display","none")}}},completeLayout:function(a){this.lastOverflowAdjust=a.state.overflowAdjust},doRenderPadder:function(b,d){var c=d.$layout,a=c.owner,e=c.getScrollRangeFlags();if(c.manageOverflow){if(e&5){b.push('<div id="',a.id,'-overflowPadderEl" ','style="font-size: 1px; height: 1px; margin-top: -1px; position: relative; z-index: -99999');b.push('"></div>');c.scrollRangeFlags=e}}},getContainerSize:function(d,h,b){var e=d.targetContext,g=e.getFrameInfo(),k=e.getPaddingInfo(),j=0,l=0,a=b?null:d.state.overflowAdjust,f,i,c,m;if(!d.widthModel.shrinkWrap){++l;c=h?e.getDomProp("width"):e.getProp("width");f=(typeof c=="number");if(f){++j;c-=g.width+k.width;if(a){c-=a.width}}}if(!d.heightModel.shrinkWrap){++l;m=h?e.getDomProp("height"):e.getProp("height");i=(typeof m=="number");if(i){++j;m-=g.height+k.height;if(a){m-=a.height}}}return{width:c,height:m,needed:l,got:j,gotAll:j==l,gotWidth:f,gotHeight:i}},getOverflowXStyle:function(b){var a=this;return a.overflowXStyle||(a.overflowXStyle=a.owner.scrollFlags.overflowX||b.targetContext.getStyle("overflow-x"))},getOverflowYStyle:function(b){var a=this;return a.overflowYStyle||(a.overflowYStyle=a.owner.scrollFlags.overflowY||b.targetContext.getStyle("overflow-y"))},getScrollRangeFlags:(function(){var a=-1;return function(){if(a<0){var f=Ext.getBody().createChild({cls:Ext.baseCSSPrefix+"border-box",style:{width:"100px",height:"100px",padding:"10px",overflow:"auto"},children:[{style:{border:"1px solid red",width:"150px",height:"150px",margin:"0 5px 5px 0"}}]}),d=f.dom.scrollHeight,c=f.dom.scrollWidth,e={175:0,165:1,170:2,160:3},b={175:0,165:4,170:8,160:12};a=(e[d]||0)|(b[c]||0);f.remove()}return a}}()),initLayout:function(){var b=this,a=Ext.getScrollbarSize().width;b.callParent();if(a&&b.manageOverflow&&!b.hasOwnProperty("lastOverflowAdjust")){if(b.owner.scrollFlags.y||b.reserveScrollbar){b.lastOverflowAdjust={width:a,height:0}}}},setupRenderTpl:function(a){this.callParent(arguments);a.renderPadder=this.doRenderPadder}});