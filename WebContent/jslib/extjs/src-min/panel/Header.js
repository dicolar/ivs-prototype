Ext.define("Ext.panel.Header",{extend:"Ext.container.Container",uses:["Ext.panel.Tool","Ext.util.CSS","Ext.layout.component.Body","Ext.Img"],alias:"widget.header",isHeader:true,defaultType:"tool",indicateDrag:false,weight:-1,componentLayout:"body",childEls:["body"],renderTpl:['<div id="{id}-body" class="{headerCls}-body {baseCls}-body {bodyCls} {bodyTargetCls}','<tpl for="uiCls"> {parent.baseCls}-body-{parent.ui}-{.}</tpl>"','<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',"{%this.renderContainer(out,values)%}","</div>"],headingTpl:['<span id="{id}-textEl" class="{headerCls}-text {cls}-text {cls}-text-{ui}" unselectable="on">{title}</span>'],shrinkWrap:3,titlePosition:0,headerCls:Ext.baseCSSPrefix+"header",initComponent:function(){var f=this,e=f.hasOwnProperty("titlePosition"),c=f.items,a=e?f.titlePosition:(c?c.length:0),b=[f.orientation,f.getDockName()],d=f.ownerCt;f.addEvents("click","dblclick");f.indicateDragCls=f.headerCls+"-draggable";f.title=f.title||"&#160;";f.tools=f.tools||[];c=f.items=(c?Ext.Array.slice(c):[]);f.orientation=f.orientation||"horizontal";f.dock=(f.dock)?f.dock:(f.orientation=="horizontal")?"top":"left";if(d?(!d.border&&!d.frame):!f.border){b.push(f.orientation+"-noborder")}f.addClsWithUI(b);f.addCls([f.headerCls,f.headerCls+"-"+f.orientation]);if(f.indicateDrag){f.addCls(f.indicateDragCls)}if(f.iconCls||f.icon||f.glyph){f.initIconCmp();if(!e&&!c.length){++a}c.push(f.iconCmp)}f.titleCmp=new Ext.Component({ariaRole:"heading",focusable:false,noWrap:true,flex:1,rtl:f.rtl,id:f.id+"_hd",style:f.titleAlign?("text-align:"+f.titleAlign):"",cls:f.headerCls+"-text-container "+f.baseCls+"-text-container "+f.baseCls+"-text-container-"+f.ui,renderTpl:f.getTpl("headingTpl"),renderData:{title:f.title,cls:f.baseCls,headerCls:f.headerCls,ui:f.ui},childEls:["textEl"],autoEl:{unselectable:"on"},listeners:{render:f.onTitleRender,scope:f}});f.layout=(f.orientation=="vertical")?{type:"vbox",align:"center",alignRoundingMethod:"ceil"}:{type:"hbox",align:"middle",alignRoundingMethod:"floor"};Ext.Array.push(c,f.tools);f.tools.length=0;f.callParent();if(c.length<a){a=c.length}f.titlePosition=a;f.insert(a,f.titleCmp);f.on({dblclick:f.onDblClick,click:f.onClick,element:"el",scope:f})},initIconCmp:function(){var c=this,b=[c.headerCls+"-icon",c.baseCls+"-icon",c.iconCls],a;if(c.glyph){b.push(c.baseCls+"-glyph")}a={focusable:false,src:Ext.BLANK_IMAGE_URL,cls:b,baseCls:c.baseCls+"-icon",id:c.id+"-iconEl",iconCls:c.iconCls,glyph:c.glyph};if(!Ext.isEmpty(c.icon)){delete a.iconCls;a.src=c.icon}c.iconCmp=new Ext.Img(a)},beforeRender:function(){this.protoEl.unselectable();this.callParent()},afterLayout:function(){var b=this,e,a,c,d;if(b.orientation==="vertical"){b.adjustTitlePosition();a=b.frameTR;if(a){e=b.frameBR;c=b.frameTL;d=(b.getWidth()-a.getPadding("r")-((c)?c.getPadding("l"):b.el.getBorderWidth("l")))+"px";e.setStyle("background-position-x",d);a.setStyle("background-position-x",d)}if(Ext.isIE7&&Ext.isStrict&&b.frame){b.el.repaint()}}},beforeLayout:function(){this.callParent();this.syncBeforeAfterTitleClasses()},adjustTitlePosition:function(){var b=this.titleCmp,a;if(!Ext.isIE9m&&b){a=b.el;a.setStyle("left",a.getWidth()+"px")}},onTitleRender:function(){if(this.orientation==="vertical"){this.titleCmp.el.setVertical(90)}},addUIClsToElement:function(b){var e=this,a=e.callParent(arguments),d=[e.baseCls+"-body-"+b,e.baseCls+"-body-"+e.ui+"-"+b],f,c;if(e.bodyCls){f=e.bodyCls.split(" ");for(c=0;c<d.length;c++){if(!Ext.Array.contains(f,d[c])){f.push(d[c])}}e.bodyCls=f.join(" ")}else{e.bodyCls=d.join(" ")}return a},removeUIClsFromElement:function(b){var e=this,a=e.callParent(arguments),d=[e.baseCls+"-body-"+b,e.baseCls+"-body-"+e.ui+"-"+b],f,c;if(e.bodyCls){f=e.bodyCls.split(" ");for(c=0;c<d.length;c++){Ext.Array.remove(f,d[c])}e.bodyCls=f.join(" ")}return a},addUIToElement:function(){var b=this,c,a;b.callParent(arguments);a=b.baseCls+"-body-"+b.ui;if(b.rendered){if(b.bodyCls){b.body.addCls(b.bodyCls)}else{b.body.addCls(a)}}else{if(b.bodyCls){c=b.bodyCls.split(" ");if(!Ext.Array.contains(c,a)){c.push(a)}b.bodyCls=c.join(" ")}else{b.bodyCls=a}}if(b.titleCmp&&b.titleCmp.rendered){b.titleCmp.addCls(b.baseCls+"-text-container-"+b.ui)}},removeUIFromElement:function(){var b=this,c,a;b.callParent(arguments);a=b.baseCls+"-body-"+b.ui;if(b.rendered){if(b.bodyCls){b.body.removeCls(b.bodyCls)}else{b.body.removeCls(a)}}else{if(b.bodyCls){c=b.bodyCls.split(" ");Ext.Array.remove(c,a);b.bodyCls=c.join(" ")}else{b.bodyCls=a}}if(b.titleCmp&&b.titleCmp.rendered){b.titleCmp.removeCls(b.baseCls+"-text-container-"+b.ui)}},onClick:function(a){this.fireClickEvent("click",a)},onDblClick:function(a){this.fireClickEvent("dblclick",a)},fireClickEvent:function(a,c){var b="."+Ext.panel.Tool.prototype.baseCls;if(!c.getTarget(b)){this.fireEvent(a,this,c)}},getFocusEl:function(){return this.el},getTargetEl:function(){return this.body||this.frameBody||this.el},applyTargetCls:function(a){this.bodyTargetCls=a},setTitle:function(c){var b=this,a=b.titleCmp;b.title=c;if(a.rendered){a.textEl.update(b.title||"&#160;");a.updateLayout()}else{b.titleCmp.on({render:function(){b.setTitle(c)},single:true})}},getMinWidth:function(){var e=this,d=e.titleCmp.textEl.dom,a,f=e.tools,b,c;d.style.display="inline";a=d.offsetWidth;d.style.display="";if(f&&(b=f.length)){for(c=0;c<b;c++){if(f[c].el){a+=f[c].el.dom.offsetWidth}}}if(e.iconCmp){a+=e.iconCmp.el.dom.offsetWidth}return a+10},setIconCls:function(a){var b=this,d=!a||!a.length,c=b.iconCmp;b.iconCls=a;if(!b.iconCmp&&!d){b.initIconCmp();b.insert(0,b.iconCmp)}else{if(c){if(d){b.iconCmp.destroy();delete b.iconCmp}else{c.removeCls(c.iconCls);c.addCls(a);c.iconCls=a}}}},setIcon:function(a){var b=this,d=!a||!a.length,c=b.iconCmp;b.icon=a;if(!b.iconCmp&&!d){b.initIconCmp();b.insert(0,b.iconCmp)}else{if(c){if(d){b.iconCmp.destroy();delete b.iconCmp}else{c.setSrc(b.icon)}}}},setGlyph:function(b){var a=this,c=a.iconCmp;if(!a.iconCmp){a.initIconCmp();a.insert(0,a.iconCmp)}else{if(c){if(b){a.iconCmp.setGlyph(b)}else{a.iconCmp.destroy();delete a.iconCmp}}}},getTools:function(){return this.tools.slice()},addTool:function(a){this.add(Ext.ComponentManager.create(a,"tool"))},syncBeforeAfterTitleClasses:function(){var h=this,g=h.items,e=g.items,b=h.titlePosition,a=e.length,f=g.generation,j=h.syncBeforeAfterGen,l,d,c,k;if(j===f){return}h.syncBeforeAfterGen=f;for(c=0;c<a;++c){k=e[c];l=k.afterTitleCls||(k.afterTitleCls=k.baseCls+"-after-title");d=k.beforeTitleCls||(k.beforeTitleCls=k.baseCls+"-before-title");if(!h.title||c<b){if(j){k.removeCls(l)}k.addCls(d)}else{if(c>b){if(j){k.removeCls(d)}k.addCls(l)}}}},onAdd:function(b,a){var c=this.tools;this.callParent(arguments);if(b.isTool){c.push(b);c[b.type]=b}},initRenderData:function(){return Ext.applyIf(this.callParent(),{bodyCls:this.bodyCls,bodyTargetCls:this.bodyTargetCls,headerCls:this.headerCls})},getDockName:function(){return this.dock},getFramingInfoCls:function(){var c=this,b=c.callParent(),a=c.ownerCt;if(!c.expanding&&(a&&a.collapsed)||c.isCollapsedExpander){b+="-"+a.collapsedCls}return b+"-"+c.dock}});