Ext.define("Ext.rtl.resizer.BorderSplitterTracker",{override:"Ext.resizer.BorderSplitterTracker",rtlDirections:{top:"top",right:"left",bottom:"bottom",left:"right"},getCollapseDirection:function(){var a=this.splitter.getCollapseDirection();if(!this.splitter.getHierarchyState().rtl!==!Ext.rootHierarchyState.rtl){a=this.rtlDirections[a]}return a}});