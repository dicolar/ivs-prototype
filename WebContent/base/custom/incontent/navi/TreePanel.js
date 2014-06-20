Ext.define('cn.incontent.navi.TreePanel', {
    extend : 'Ext.tree.Panel',
    xtype : 'navitreepanel',
    requires : ['cn.incontent.navi.TreeView', 'cn.incontent.navi.TreeColumn'],
	initComponent : function() {
		
		this.viewType = 'navitreeview';
		this.hideHeaders = true;
		this.columns = [{
			xtype : 'navitreecolumn',
        	width : Ext.isIE6 ? '100%' : 10000, 
        	dataIndex : 'text' 
		}];
		
		this.callParent();
	},
	afterRender : function() {
		this.addCls(this.autoWidthCls);
		this.callParent();
	}
});