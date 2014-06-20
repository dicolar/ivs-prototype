Ext.define("Ext.chart.series.Pie",{alternateClassName:["Ext.chart.PieSeries","Ext.chart.PieChart"],extend:"Ext.chart.series.Series",type:"pie",alias:"series.pie",accuracy:100000,rad:Math.PI*2/100000,highlightDuration:150,angleField:false,lengthField:false,donut:false,showInLegend:false,style:{},constructor:function(b){this.callParent(arguments);var g=this,f=g.chart,a=f.surface,h=f.store,j=f.shadow,d,c,e;b.highlightCfg=Ext.merge({segment:{margin:20}},b.highlightCfg);Ext.apply(g,b,{shadowAttributes:[{"stroke-width":6,"stroke-opacity":1,stroke:"rgb(200, 200, 200)",translate:{x:1.2,y:2}},{"stroke-width":4,"stroke-opacity":1,stroke:"rgb(150, 150, 150)",translate:{x:0.9,y:1.5}},{"stroke-width":2,"stroke-opacity":1,stroke:"rgb(100, 100, 100)",translate:{x:0.6,y:1}}]});g.group=a.getGroup(g.seriesId);if(j){for(d=0,c=g.shadowAttributes.length;d<c;d++){g.shadowGroups.push(a.getGroup(g.seriesId+"-shadows"+d))}}a.customAttributes.segment=function(k){var i=g.getSegment(k);if(!i.path||i.path.length===0){i.path=["M",0,0]}return i};g.__excludes=g.__excludes||[]},onRedraw:function(){this.initialize()},initialize:function(){var d=this,a=d.chart.getChartStore(),e=a.data.items,b,c,f;d.yField=[];if(d.label.field){for(b=0,c=e.length;b<c;b++){f=e[b];d.yField.push(f.get(d.label.field))}}},getSegment:function(d){var I=this,H=I.rad,h=Math.cos,a=Math.sin,o=I.centerX,m=I.centerY,D=0,C=0,B=0,z=0,k=0,j=0,i=0,f=0,v=0,c=0,u=0,b=0,F=0.01,w=d.startAngle,t=d.endAngle,n=(w+t)/2*H,q=d.margin||0,J=Math.min(w,t)*H,G=Math.max(w,t)*H,s=h(J),g=a(J),r=h(G),e=a(G),l=h(n),E=a(n),A=0,p=0.7071067811865476;if(G-J<F){return{path:""}}if(q!==0){o+=q*l;m+=q*E}C=o+d.endRho*s;j=m+d.endRho*g;z=o+d.endRho*r;f=m+d.endRho*e;u=o+d.endRho*l;b=m+d.endRho*E;if(d.startRho!==0){D=o+d.startRho*s;k=m+d.startRho*g;B=o+d.startRho*r;i=m+d.startRho*e;v=o+d.startRho*l;c=m+d.startRho*E;return{path:[["M",C,j],["A",d.endRho,d.endRho,0,0,1,u,b],["L",u,b],["A",d.endRho,d.endRho,0,A,1,z,f],["L",z,f],["L",B,i],["A",d.startRho,d.startRho,0,A,0,v,c],["L",v,c],["A",d.startRho,d.startRho,0,0,0,D,k],["L",D,k],["Z"]]}}else{return{path:[["M",o,m],["L",C,j],["A",d.endRho,d.endRho,0,0,1,u,b],["L",u,b],["A",d.endRho,d.endRho,0,A,1,z,f],["L",z,f],["L",o,m],["Z"]]}}},calcMiddle:function(m){var h=this,i=h.rad,l=m.slice,k=h.centerX,j=h.centerY,g=l.startAngle,d=l.endAngle,f=+h.donut,c=-(g+d)*i/2,a=(m.endRho+m.startRho)/2,e=k+a*Math.cos(c),b=j-a*Math.sin(c);m.middle={x:e,y:b}},drawSeries:function(){var r=this,a=r.chart.getChartStore(),V=a.data.items,H,w=r.group,R=r.chart.animate,h=r.angleField||r.field||r.xField,z=[].concat(r.lengthField),Q=0,W=r.chart,I=W.surface,F=W.chartBBox,f=W.shadow,P=r.shadowGroups,O=r.shadowAttributes,Z=P.length,J=z.length,A=0,b=+r.donut,Y=[],x=[],t=0,L=0,s=0,g=r.seriesStyle,e=r.colorArrayStyle,v=e&&e.length||0,n,X,B,G,D,d,c,o,k=0,q,m,y,K,C,aa,E,T,S,U,M,N,l,u;Ext.apply(g,r.style||{});r.setBBox();u=r.bbox;if(r.colorSet){e=r.colorSet;v=e.length}if(!a||!a.getCount()||r.seriesIsHidden){r.hide();r.items=[];return}r.unHighlightItem();r.cleanHighlights();d=r.centerX=F.x+(F.width/2);c=r.centerY=F.y+(F.height/2);r.radius=Math.min(d-F.x,c-F.y);r.slices=m=[];r.items=x=[];for(T=0,E=V.length;T<E;T++){H=V[T];if(this.__excludes&&this.__excludes[T]){continue}t+=+H.get(h);if(z[0]){for(S=0,Q=0;S<J;S++){Q+=+H.get(z[S])}Y[T]=Q;L=Math.max(L,Q)}}t=t||1;for(T=0,E=V.length;T<E;T++){H=V[T];if(this.__excludes&&this.__excludes[T]){K=0}else{K=H.get(h);if(k==0){k=1}}if(k==1){k=2;r.firstAngle=s=r.accuracy*K/t/2;for(S=0;S<T;S++){m[S].startAngle=m[S].endAngle=r.firstAngle}}U=s-r.accuracy*K/t;q={series:r,value:K,startAngle:s,endAngle:U,storeItem:H};if(z[0]){aa=+Y[T];q.rho=Math.floor(r.radius/L*aa)}else{q.rho=r.radius}m[T]=q;(function(){s=U})()}if(f){for(T=0,E=m.length;T<E;T++){q=m[T];q.shadowAttrs=[];for(S=0,A=0,B=[];S<J;S++){y=w.getAt(T*J+S);o=z[S]?a.getAt(T).get(z[S])/Y[T]*q.rho:q.rho;n={segment:{startAngle:q.startAngle,endAngle:q.endAngle,margin:0,rho:q.rho,startRho:A+(o*b/100),endRho:A+o},hidden:!q.value&&(q.startAngle%r.accuracy)==(q.endAngle%r.accuracy)};for(D=0,B=[];D<Z;D++){X=O[D];G=P[D].getAt(T);if(!G){G=W.surface.add(Ext.apply({},{type:"path",group:P[D],strokeLinejoin:"round"},n,X))}X=r.renderer(G,a.getAt(T),Ext.apply({},n,X),T,a);if(R){r.onAnimate(G,{to:X})}else{G.setAttributes(X,true)}B.push(G)}q.shadowAttrs[S]=B}}}for(T=0,E=m.length;T<E;T++){q=m[T];for(S=0,A=0;S<J;S++){y=w.getAt(T*J+S);o=z[S]?a.getAt(T).get(z[S])/Y[T]*q.rho:q.rho;n=Ext.apply({segment:{startAngle:q.startAngle,endAngle:q.endAngle,margin:0,rho:q.rho,startRho:A+(o*b/100),endRho:A+o},hidden:(!q.value&&(q.startAngle%r.accuracy)==(q.endAngle%r.accuracy))},Ext.apply(g,e&&{fill:e[(J>1?S:T)%v]}||{}));C=Ext.apply({},n.segment,{slice:q,series:r,storeItem:q.storeItem,index:T});r.calcMiddle(C);if(f){C.shadows=q.shadowAttrs[S]}x[T]=C;if(!y){l=Ext.apply({type:"path",group:w,middle:C.middle},Ext.apply(g,e&&{fill:e[(J>1?S:T)%v]}||{}));y=I.add(Ext.apply(l,n))}q.sprite=q.sprite||[];C.sprite=y;q.sprite.push(y);q.point=[C.middle.x,C.middle.y];if(R){n=r.renderer(y,a.getAt(T),n,T,a);y._to=n;y._animating=true;r.onAnimate(y,{to:n,listeners:{afteranimate:{fn:function(){this._animating=false},scope:y}}})}else{n=r.renderer(y,a.getAt(T),Ext.apply(n,{hidden:false}),T,a);y.setAttributes(n,true)}A+=o}}E=w.getCount();for(T=0;T<E;T++){if(!m[(T/J)>>0]&&w.getAt(T)){w.getAt(T).hide(true)}}if(f){Z=P.length;for(D=0;D<E;D++){if(!m[(D/J)>>0]){for(S=0;S<Z;S++){if(P[S].getAt(D)){P[S].getAt(D).hide(true)}}}}}r.renderLabels();r.renderCallouts()},onCreateLabel:function(f,k,e,g){var h=this,j=h.labelsGroup,a=h.label,d=h.centerX,c=h.centerY,l=k.middle,b=Ext.apply(h.seriesLabelStyle||{},a||{});return h.chart.surface.add(Ext.apply({type:"text","text-anchor":"middle",group:j,x:l.x,y:l.y},b))},onPlaceLabel:function(j,o,B,v,t,e,f){var D=this,p=D.chart,A=p.resizing,C=D.label,w=C.renderer,c=C.field,l=D.centerX,k=D.centerY,E=B.middle,b={x:E.x,y:E.y},n=E.x-l,m=E.y-k,s={},d=1,h=Math.atan2(m,n||1),z=h*180/Math.PI,g,u,r,q;b.hidden=false;if(this.__excludes&&this.__excludes[v]){b.hidden=true}function a(i){if(i<0){i+=360}return i%360}j.setAttributes({text:w(o.get(c),j,o,B,v,t,e,f)},true);switch(t){case"outside":d=Math.sqrt(n*n+m*m)*2;j.setAttributes({rotation:{degrees:0}},true);u=j.getBBox();r=u.width/2*Math.cos(h)+4;q=u.height/2*Math.sin(h)+4;d+=Math.sqrt(r*r+q*q);b.x=d*Math.cos(h)+l;b.y=d*Math.sin(h)+k;break;case"rotate":z=a(z);z=(z>90&&z<270)?z+180:z;g=j.attr.rotation.degrees;if(g!=null&&Math.abs(g-z)>180*0.5){if(z>g){z-=360}else{z+=360}z=z%360}else{z=a(z)}b.rotate={degrees:z,x:b.x,y:b.y};break;default:break}b.translate={x:0,y:0};if(e&&!A&&(t!="rotate"||g!=null)){D.onAnimate(j,{to:b})}else{j.setAttributes(b,true)}j._from=s},onPlaceCallout:function(k,n,w,u,t,d,e){var z=this,o=z.chart,h=z.centerX,g=z.centerY,A=w.middle,b={x:A.x,y:A.y},l=A.x-h,j=A.y-g,c=1,m,f=Math.atan2(j,l||1),a=(k&&k.label?k.label.getBBox():{width:0,height:0}),v=20,s=10,r=10,q;if(!a.width||!a.height){return}c=w.endRho+v;m=(w.endRho+w.startRho)/2+(w.endRho-w.startRho)/3;b.x=c*Math.cos(f)+h;b.y=c*Math.sin(f)+g;l=m*Math.cos(f);j=m*Math.sin(f);if(o.animate){z.onAnimate(k.lines,{to:{path:["M",l+h,j+g,"L",b.x,b.y,"Z","M",b.x,b.y,"l",l>0?s:-s,0,"z"]}});z.onAnimate(k.box,{to:{x:b.x+(l>0?s:-(s+a.width+2*r)),y:b.y+(j>0?(-a.height-r/2):(-a.height-r/2)),width:a.width+2*r,height:a.height+2*r}});z.onAnimate(k.label,{to:{x:b.x+(l>0?(s+r):-(s+a.width+r)),y:b.y+(j>0?-a.height/4:-a.height/4)}})}else{k.lines.setAttributes({path:["M",l+h,j+g,"L",b.x,b.y,"Z","M",b.x,b.y,"l",l>0?s:-s,0,"z"]},true);k.box.setAttributes({x:b.x+(l>0?s:-(s+a.width+2*r)),y:b.y+(j>0?(-a.height-r/2):(-a.height-r/2)),width:a.width+2*r,height:a.height+2*r},true);k.label.setAttributes({x:b.x+(l>0?(s+r):-(s+a.width+r)),y:b.y+(j>0?-a.height/4:-a.height/4)},true)}for(q in k){k[q].show(true)}},onAnimate:function(b,a){b.show();return this.callParent(arguments)},isItemInPoint:function(k,h,m,e){var g=this,d=g.centerX,c=g.centerY,o=Math.abs,n=o(k-d),l=o(h-c),f=m.startAngle,a=m.endAngle,j=Math.sqrt(n*n+l*l),b=Math.atan2(h-c,k-d)/g.rad;if(b>g.firstAngle){b-=g.accuracy}return(b<=f&&b>a&&j>=m.startRho&&j<=m.endRho)},hideAll:function(c){var f,b,h,g,e,a,d;c=(isNaN(this._index)?c:this._index)||0;this.__excludes=this.__excludes||[];this.__excludes[c]=true;d=this.slices[c].sprite;for(e=0,a=d.length;e<a;e++){d[e].setAttributes({hidden:true},true)}if(this.slices[c].shadowAttrs){for(f=0,g=this.slices[c].shadowAttrs,b=g.length;f<b;f++){h=g[f];for(e=0,a=h.length;e<a;e++){h[e].setAttributes({hidden:true},true)}}}this.drawSeries()},showAll:function(a){a=(isNaN(this._index)?a:this._index)||0;this.__excludes[a]=false;this.drawSeries()},highlightItem:function(q){var t=this,s=t.rad,v,d,n,p,a,e,j,b,l,c,f,o,g,u,m,k,h;q=q||this.items[this._index];this.unHighlightItem();if(!q||t.animating||(q.sprite&&q.sprite._animating)){return}t.callParent([q]);if(!t.highlight){return}if("segment" in t.highlightCfg){v=t.highlightCfg.segment;d=t.chart.animate;if(t.labelsGroup){f=t.labelsGroup;o=t.label.display;g=f.getAt(q.index);u=(q.startAngle+q.endAngle)/2*s;m=v.margin||0;k=m*Math.cos(u);h=m*Math.sin(u);if(Math.abs(k)<1e-10){k=0}if(Math.abs(h)<1e-10){h=0}if(d){g.stopAnimation();g.animate({to:{translate:{x:k,y:h}},duration:t.highlightDuration})}else{g.setAttributes({translate:{x:k,y:h}},true)}}if(t.chart.shadow&&q.shadows){p=0;a=q.shadows;j=a.length;for(;p<j;p++){e=a[p];b={};l=q.sprite._from.segment;for(c in l){if(!(c in v)){b[c]=l[c]}}n={segment:Ext.applyIf(b,t.highlightCfg.segment)};if(d){e.stopAnimation();e.animate({to:n,duration:t.highlightDuration})}else{e.setAttributes(n,true)}}}}},unHighlightItem:function(){var v=this,k,e,d,h,s,r,q,o,w,l,c,a,u,m,b,f,t,g,n;if(!v.highlight){return}if(("segment" in v.highlightCfg)&&v.items){k=v.items;e=v.chart.animate;d=!!v.chart.shadow;h=v.labelsGroup;s=k.length;r=0;q=0;o=v.label.display;for(;r<s;r++){t=k[r];if(!t){continue}m=t.sprite;if(m&&m._highlighted){if(h){g=h.getAt(t.index);n=Ext.apply({translate:{x:0,y:0}},o=="rotate"?{rotate:{x:g.attr.x,y:g.attr.y,degrees:g.attr.rotation.degrees}}:{});if(e){g.stopAnimation();g.animate({to:n,duration:v.highlightDuration})}else{g.setAttributes(n,true)}}if(d){b=t.shadows;w=b.length;for(;q<w;q++){c={};a=t.sprite._to.segment;u=t.sprite._from.segment;Ext.apply(c,u);for(l in a){if(!(l in u)){c[l]=a[l]}}f=b[q];if(e){f.stopAnimation();f.animate({to:{segment:c},duration:v.highlightDuration})}else{f.setAttributes({segment:c},true)}}}}}}v.callParent(arguments)},getLegendColor:function(a){var b=this;return(b.colorSet&&b.colorSet[a%b.colorSet.length])||b.colorArrayStyle[a%b.colorArrayStyle.length]}});