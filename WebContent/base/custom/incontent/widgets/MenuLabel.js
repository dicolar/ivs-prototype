Ext.define('cn.incontent.widgets.MenuLabel', {
	extend : 'Ext.form.Label',
	xtype : 'menulabel',
	initComponent : function() {
		var me = this;
		
		if (Ext.isArray(this.menu)) {
			this.menu = Ext.create('Ext.menu.Menu', {
				items : this.menu
			});
		} else if (!this.menu.getXType) {
			this.menu = Ext.create('Ext.menu.Menu', this.menu);
		}
		
		this.style = 'padding:2px;';
		
		if (this.menu) {
			this.menu.on('show', function() {
				this.minWidth = me.getWidth();
				me.addCls('menulabel-hover');
			});
			
			this.menu.on('hide', function() {
				me.removeCls('menulabel-hover');
			});
			
			this.menu.addCls('menu-shadow');
			
		}
		
		this.callParent();
	},
	afterRender : function() {
		
		var me = this;
		this.addArrow();
		
		if (Ext.isIE7 || Ext.isIE8) {
			this.el.setStyle('z-index', '19002');
		}
		
		this.el.setStyle('padding-left', '8px');
		this.el.setStyle('padding-right', '8px');
		
		this.el.on('click', function() {
			if (me.menu) {
				me.menu.showAt(me.getPosition()[0], me.getPosition()[1] + me.getHeight() - 1);
			}
		});
		
		this.callParent();
	},
	//private 
	addArrow : function() {
		this.el.insertHtml('beforeEnd', '&nbsp;<span class="menulabel-downarrow">&nbsp;&nbsp;&nbsp;</span>');
		this.updateLayout();
	},
	setHtml : function(v) {
		this.el.setHTML(v);
		this.addArrow();
	}
});