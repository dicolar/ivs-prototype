Ext.define("Ext.view.NodeCache",{constructor:function(a){this.view=a;this.clear();this.el=new Ext.dom.AbstractElement.Fly()},clear:function(e){var c=this,d=this.elements,a,b;if(e){for(a in d){b=d[a];b.parentNode.removeChild(b)}}c.elements={};c.count=c.startIndex=0;c.endIndex=-1},fill:function(b,f){var d=this,e=d.elements={},c,a=b.length;if(!f){f=0}for(c=0;c<a;c++){e[f+c]=b[c]}d.startIndex=f;d.endIndex=f+a-1;d.count=a;return this},insert:function(f,b){var d=this,e=d.elements,c,a=b.length;if(d.count){if(f>d.endIndex+1||f+b.length-1<d.startIndex){Ext.Error.raise("Discontiguous range would result from inserting "+b.length+" nodes at "+f)}if(f<d.count){for(c=d.endIndex+a;c>=f+a;c--){e[c]=e[c-a];e[c].setAttribute("data-recordIndex",c)}}d.endIndex=d.endIndex+a}else{d.startIndex=f;d.endIndex=f+a-1}for(c=0;c<a;c++,f++){e[f]=b[c];e[f].setAttribute("data-recordIndex",f)}d.count+=a},item:function(c,b){var d=this.elements[c],a=null;if(d){a=b?this.elements[c]:this.el.attach(this.elements[c])}return a},first:function(a){return this.item(this.startIndex,a)},last:function(a){return this.item(this.endIndex,a)},getCount:function(){return this.count},slice:function(e,b){var d=this.elements,a=[],c;if(arguments.length<2){b=this.endIndex}else{b=Math.min(this.endIndex,b-1)}for(c=e||this.startIndex;c<=b;c++){a.push(d[c])}return a},replaceElement:function(d,c,a){var e=this.elements,b=(typeof d==="number")?d:this.indexOf(d);if(b>-1){c=Ext.getDom(c);if(a){d=e[b];d.parentNode.insertBefore(c,d);Ext.removeNode(d);c.setAttribute("data-recordIndex",b)}this.elements[b]=c}return this},indexOf:function(b){var c=this.elements,a;b=Ext.getDom(b);for(a=this.startIndex;a<=this.endIndex;a++){if(c[a]===b){return a}}return -1},removeRange:function(b,f,d){var h=this,a=h.elements,e,g,c,j;if(f===undefined){f=h.count}else{f=Math.min(h.endIndex+1,f+1)}if(!b){b=0}c=f-b;for(g=b,j=f;g<h.endIndex;g++,j++){if(d&&g<f){Ext.removeNode(a[g])}if(j<=h.endIndex){e=a[g]=a[j];e.setAttribute("data-recordIndex",g)}else{delete a[g]}}h.count-=c;h.endIndex-=c},removeElement:function(k,c){var g=this,j,i,a=g.elements,d,e,b=0,f,h;if(Ext.isArray(k)){j=k;k=[];e=j.length;for(b=0;b<e;b++){i=j[b];if(typeof i!=="number"){i=g.indexOf(i)}if(i>=g.startIndex&&i<=g.endIndex){k[k.length]=i}}Ext.Array.sort(k);e=k.length}else{if(k<g.startIndex||k>g.endIndex){return}e=1;k=[k]}for(f=h=k[0],b=0;f<=g.endIndex;f++,h++){if(b<e&&f===k[b]){h++;b++;if(c){Ext.removeNode(a[f])}}if(h<=g.endIndex&&h>=g.startIndex){d=a[f]=a[h];d.setAttribute("data-recordIndex",f)}else{delete a[f]}}g.endIndex-=e;g.count-=e},scroll:function(e,k,c){var j=this,a=j.elements,m=e.length,g,d,b,f,h=j.view.getNodeContainer(),l=document.createDocumentFragment();if(k==-1){for(g=(j.endIndex-c)+1;g<=j.endIndex;g++){d=a[g];delete a[g];d.parentNode.removeChild(d)}j.endIndex-=c;f=j.view.bufferRender(e,j.startIndex-=m);for(g=0;g<m;g++){a[j.startIndex+g]=f[g];l.appendChild(f[g])}h.insertBefore(l,h.firstChild)}else{b=j.startIndex+c;for(g=j.startIndex;g<b;g++){d=a[g];delete a[g];d.parentNode.removeChild(d)}j.startIndex=g;f=j.view.bufferRender(e,j.endIndex+1);for(g=0;g<m;g++){a[j.endIndex+=1]=f[g];l.appendChild(f[g])}h.appendChild(l)}j.count=j.endIndex-j.startIndex+1}});