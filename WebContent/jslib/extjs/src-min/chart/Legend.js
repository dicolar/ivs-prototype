Ext.define("Ext.chart.Legend",{requires:["Ext.chart.LegendItem"],visible:true,update:true,position:"bottom",x:0,y:0,labelColor:"#000",labelFont:"12px Helvetica, sans-serif",boxStroke:"#000",boxStrokeWidth:1,boxFill:"#FFF",itemSpacing:10,padding:5,width:0,height:0,boxZIndex:100,constructor:function(a){var b=this;if(a){Ext.apply(b,a)}b.items=[];b.isVertical=("left|right|float".indexOf(b.position)!==-1);b.origX=b.x;b.origY=b.y},create:function(){var e=this,a=e.chart.series.items,c,d,b;e.createBox();if(e.rebuild!==false){e.createItems()}if(!e.created&&e.isDisplayed()){e.created=true;for(c=0,d=a.length;c<d;c++){b=a[c];b.on("titlechange",e.redraw,e)}}},redraw:function(){var a=this;a.create();a.updatePosition()},isDisplayed:function(){return this.visible&&this.chart.series.findIndex("showInLegend",true)!==-1},createItems:function(){var g=this,d=g.chart.series.items,f=g.items,e,c,k,a,h,b,l;g.removeItems();for(c=0,k=d.length;c<k;c++){b=d[c];if(b.showInLegend){e=[].concat(b.yField);for(a=0,h=e.length;a<h;a++){l=g.createLegendItem(b,a);f.push(l)}}}g.alignItems()},removeItems:function(){var d=this,b=d.items,a=b?b.length:0,c;if(a){for(c=0;c<a;c++){b[c].destroy()}}b.length=[]},alignItems:function(){var e=this,f=e.padding,a=e.isVertical,i=Math.floor,b,g,h,c,d;b=e.updateItemDimensions();g=b.maxWidth;h=b.maxHeight;c=b.totalWidth;d=b.totalHeight;e.width=i((a?g:c)+f*2);e.height=i((a?d:h)+f*2)},updateItemDimensions:function(){var r=this,h=r.items,f=r.padding,s=r.itemSpacing,o=0,j=0,d=0,q=0,b=r.isVertical,c=Math.floor,t=Math.max,e=0,n,m,p,a,k,g;for(n=0,m=h.length;n<m;n++){p=h[n];a=p.getBBox();k=a.width;g=a.height;e=(n===0?0:s);p.x=f+c(b?0:d+e);p.y=f+c(b?q+e:0)+g/2;d+=e+k;q+=e+g;o=t(o,k);j=t(j,g)}return{totalWidth:d,totalHeight:q,maxWidth:o,maxHeight:j}},createLegendItem:function(b,a){var c=this;return new Ext.chart.LegendItem({legend:c,series:b,surface:c.chart.surface,yFieldIndex:a})},getBBox:function(){var a=this;return{x:Math.round(a.x)-a.boxStrokeWidth/2,y:Math.round(a.y)-a.boxStrokeWidth/2,width:a.width+a.boxStrokeWidth,height:a.height+a.boxStrokeWidth}},createBox:function(){var b=this,a,c;if(b.boxSprite){b.boxSprite.destroy()}c=b.getBBox();if(isNaN(c.width)||isNaN(c.height)){b.boxSprite=false;return}a=b.boxSprite=b.chart.surface.add(Ext.apply({type:"rect",stroke:b.boxStroke,"stroke-width":b.boxStrokeWidth,fill:b.boxFill,zIndex:b.boxZIndex},c));a.redraw()},calcPosition:function(){var h=this,j,i,l=h.width,k=h.height,g=h.chart,m=g.chartBBox,b=g.insetPadding,d=m.width-(b*2),c=m.height-(b*2),f=m.x+b,e=m.y+b,a=g.surface,n=Math.floor;switch(h.position){case"left":j=b;i=n(e+c/2-k/2);break;case"right":j=n(a.width-l)-b;i=n(e+c/2-k/2);break;case"top":j=n(f+d/2-l/2);i=b;break;case"bottom":j=n(f+d/2-l/2);i=n(a.height-k)-b;break;default:j=n(h.origX)+b;i=n(h.origY)+b}return{x:j,y:i}},updatePosition:function(){var d=this,b=d.items,f,c,a,e;if(d.isDisplayed()){f=d.calcPosition();d.x=f.x;d.y=f.y;for(c=0,a=b.length;c<a;c++){b[c].updatePosition()}e=d.getBBox();if(isNaN(e.width)||isNaN(e.height)){if(d.boxSprite){d.boxSprite.hide(true)}}else{if(!d.boxSprite){d.createBox()}d.boxSprite.setAttributes(e,true);d.boxSprite.show(true)}}},toggle:function(b){var e=this,d=0,c=e.items,a=c.length;if(e.boxSprite){if(b){e.boxSprite.show(true)}else{e.boxSprite.hide(true)}}for(;d<a;++d){if(b){c[d].show(true)}else{c[d].hide(true)}}e.visible=b}});