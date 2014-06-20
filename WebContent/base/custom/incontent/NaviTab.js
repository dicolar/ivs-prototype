Ext.define('cn.incontent.NaviTab', {
	extend : 'Ext.tab.Panel',
	requires : ['Ext.tab.Panel'],
	xtype : 'navitab',
	//properties
	//
	initComponent : function() {
		this.style = 'background-color:#F2F2F2';
		this.collapseMode = 'mini';
		this.collapsible = true;
		
		this.tabPosition = 'left';
		this.plain = true;
		
		this.callParent();
	},
	beforeRender : function() {
		this.callParent();
	},
	afterRender : function() {
		var res = this.el.query('div[role=presentation]');
		
		if (res.length == 0) {
			return;
		}
		var me = this;
        new Ext.Element(res[0]).on('dblclick', function() {
            me.toggleCollapse();
        });
		
		this.callParent();
	},
	setHiddenDocked: function(){
        
        var me = this,
            toHide = me.hiddenOnCollapse,
            items = me.getDockedItems(),
            len = items.length,
            i = 0,
            item, reExpander;
            
        if (me.header !== false) {
            reExpander = me.getReExpander();
        }
            
        toHide.add(me.body);
        for (; i < len; i++) {
            item = items[i];
            if (item && item !== reExpander && item.el) {
                toHide.add(item.el);
            }
        }
        //toHide.setStyle('visibility', 'hidden');
	},
	getReExpander: function (direction) {
        var me = this,
            collapseDir = direction || me.collapseDirection,
            reExpander = me.reExpander || me.findReExpander(collapseDir);

        me.expandDirection = me.getOppositeDirection(collapseDir);

        if (!reExpander) {
        
            me.reExpander = reExpander = me.createReExpander(collapseDir, {
                dock: collapseDir,
                cls: Ext.baseCSSPrefix + 'docked ' + me.baseCls + '-' + me.ui + '-collapsed',
                isCollapsedExpander: true
            });
			
			reExpander.width = 33;
			
            me.dockedItems.insert(0, reExpander);
            
	        me.reExpander.on('afterrender', function() {
	        	this.el.setStyle('background-color', 'transparent');
	        	this.el.child('div').hide();
	        });
	        
        }
        
        return reExpander;
	}
});