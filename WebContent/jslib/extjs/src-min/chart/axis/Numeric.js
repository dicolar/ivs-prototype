Ext.define("Ext.chart.axis.Numeric",{extend:"Ext.chart.axis.Axis",alternateClassName:"Ext.chart.NumericAxis",type:"Numeric",isNumericAxis:true,alias:"axis.numeric",uses:["Ext.data.Store"],constructor:function(c){var d=this,a=!!(c.label&&c.label.renderer),b;d.callParent([c]);b=d.label;if(c.constrain==null){d.constrain=(c.minimum!=null&&c.maximum!=null)}if(!a){b.renderer=function(e){return d.roundToDecimal(e,d.decimals)}}},roundToDecimal:function(a,c){var b=Math.pow(10,c||0);return Math.round(a*b)/b},minimum:NaN,maximum:NaN,constrain:true,decimals:2,scale:"linear",doConstrain:function(){var t=this,g=t.chart,b=g.getChartStore(),h=b.data.items,s,v,a,e=g.series.items,j=t.fields,c=j.length,f=t.calcEnds(),m=f.from,p=f.to,q,n,r=false,k,u=[],o;for(s=0,v=h.length;s<v;s++){o=true;a=h[s];for(q=0;q<c;q++){k=a.get(j[q]);if(t.type=="Time"&&typeof k=="string"){k=Date.parse(k)}if(+k<+m){o=false;break}if(+k>+p){o=false;break}}if(o){u.push(a)}}g.setSubStore(new Ext.data.Store({model:b.model,data:u}))},position:"left",adjustMaximumByMajorUnit:false,adjustMinimumByMajorUnit:false,processView:function(){var e=this,d=e.chart,c=d.series.items,b,a;for(b=0,a=c.length;b<a;b++){if(c[b].stacked){delete e.minimum;delete e.maximum;e.constrain=false;break}}if(e.constrain){e.doConstrain()}},applyData:function(){this.callParent();return this.calcEnds()}});