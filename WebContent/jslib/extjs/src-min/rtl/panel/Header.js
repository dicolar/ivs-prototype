Ext.define("Ext.rtl.panel.Header",{override:"Ext.panel.Header",rtlPositions:{top:"top",right:"left",bottom:"bottom",left:"right"},adjustTitlePosition:function(){var b=this.titleCmp,a,c;if(!Ext.isIE9m&&b){a=b.el;c=a.getWidth();if(this.isParentRtl()){a.setStyle("right",c+"px")}else{if(!Ext.isIE9m){a.setStyle("left",c+"px")}}}},onTitleRender:function(){if(this.orientation==="vertical"){this.titleCmp.el.setVertical(this.isParentRtl()?270:90)}},getDockName:function(){var b=this,a=b.dock;return b.isParentRtl()?b.rtlPositions[a]:a}});