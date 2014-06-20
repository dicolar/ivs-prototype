Ext.define("Ext.layout.container.border.Region",{override:"Ext.Component",initBorderRegion:function(){var a=this;if(!a._borderRegionInited){a._borderRegionInited=true;a.addStateEvents(["changeregion","changeweight"]);Ext.override(a,{getState:function(){var b=a.callParent();b=a.addPropertyToState(b,"region");b=a.addPropertyToState(b,"weight");return b}})}},getOwningBorderContainer:function(){var a=this.getOwningBorderLayout();return a&&a.owner},getOwningBorderLayout:function(){var a=this.ownerLayout;return(a&&a.isBorderLayout)?a:null},setBorderRegion:function(j){var i=this,c,d=i.region;if(j!==d){c=i.getOwningBorderLayout();if(c){var f=c.regionFlags[j],k=i.placeholder,a=i.splitter,b=c.owner,m=c.regionMeta,e=i.collapsed||i.floated,l,h,g;if(i.fireEventArgs("beforechangeregion",[i,j])===false){return d}Ext.suspendLayouts();i.region=j;Ext.apply(i,f);if(i.updateCollapseTool){i.updateCollapseTool()}if(a){Ext.apply(a,f);a.updateOrientation();h=b.items;g=h.indexOf(i);if(g>=0){l=m[j].splitterDelta;if(h.getAt(g+l)!==a){h.remove(a);g=h.indexOf(i);if(l>0){++g}h.insert(g,a)}}}if(k){if(e){i.expand(false)}b.remove(k);i.placeholder=null;if(e){i.collapse(null,false)}}b.updateLayout();Ext.resumeLayouts(true);i.fireEventArgs("changeregion",[i,d])}else{i.region=j}}return d},setRegionWeight:function(d){var c=this,b=c.getOwningBorderContainer(),e=c.placeholder,a=c.weight;if(d!==a){if(c.fireEventArgs("beforechangeweight",[c,d])!==false){c.weight=d;if(e){e.weight=d}if(b){b.updateLayout()}c.fireEventArgs("changeweight",[c,a])}}return a}});