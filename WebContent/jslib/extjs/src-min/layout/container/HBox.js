Ext.define("Ext.layout.container.HBox",{alias:["layout.hbox"],extend:"Ext.layout.container.Box",alternateClassName:"Ext.layout.HBoxLayout",align:"top",constrainAlign:false,type:"hbox",direction:"horizontal",horizontal:true,names:{beforeX:"left",beforeScrollX:"left",beforeScrollerSuffix:"-before-scroller",afterScrollerSuffix:"-after-scroller",leftCap:"Left",afterX:"right",width:"width",contentWidth:"contentWidth",minWidth:"minWidth",maxWidth:"maxWidth",widthCap:"Width",widthModel:"widthModel",widthIndex:0,x:"x",scrollLeft:"scrollLeft",overflowX:"overflowX",hasOverflowX:"hasOverflowX",invalidateScrollX:"invalidateScrollX",parallelMargins:"lr",center:"middle",beforeY:"top",afterY:"bottom",height:"height",contentHeight:"contentHeight",minHeight:"minHeight",maxHeight:"maxHeight",heightCap:"Height",heightModel:"heightModel",heightIndex:1,y:"y",overflowY:"overflowY",hasOverflowY:"hasOverflowY",invalidateScrollY:"invalidateScrollY",perpendicularMargins:"tb",getWidth:"getWidth",getHeight:"getHeight",setWidth:"setWidth",setHeight:"setHeight",gotWidth:"gotWidth",gotHeight:"gotHeight",setContentWidth:"setContentWidth",setContentHeight:"setContentHeight",setWidthInDom:"setWidthInDom",setHeightInDom:"setHeightInDom",getScrollLeft:"getScrollLeft",setScrollLeft:"setScrollLeft",scrollTo:"scrollTo"},sizePolicy:{flex:{"":{readsWidth:0,readsHeight:1,setsWidth:1,setsHeight:0},stretch:{readsWidth:0,readsHeight:0,setsWidth:1,setsHeight:1},stretchmax:{readsWidth:0,readsHeight:1,setsWidth:1,setsHeight:1}},"":{readsWidth:1,readsHeight:1,setsWidth:0,setsHeight:0},stretch:{readsWidth:1,readsHeight:0,setsWidth:0,setsHeight:1},stretchmax:{readsWidth:1,readsHeight:1,setsWidth:0,setsHeight:1}}});