function() {

	Ext.util.CSS.swapStyleSheet('data-view', 'css/data-view.css');
	function getImageString(record) {
		var errorImgSrc = 'this.src="images/filetypes/_default.png"';
	
		var extension = record.get('extension');
		return '<img src="' + base + 'images/filetypes/' + extension + '.png" onerror=' + errorImgSrc + '>';
	}

	var treePanel = Ext.create('Ext.tree.Panel', {
		tbar : ['->', {
			iconCls : 'x-tbar-loading',
			tooltip : msg('MSG_REFRESH'),
			handler : function() {
				var node = treePanel.getSelectionModel().getSelection()[0];
			
				if (!node) {
					return;
				}
				
				treePanel.store.reload({
					node : node,
					callback : function() {
						node.expand();
					}
				});
			}
		}],
		region : 'west',
		preventHeader : true,
		animCollapse : true,
		width : 200,
		minWidth : 100,
		split : true,
		root : {
			'cm:name' : msg('MSG_REPOSITORY')
		},
		rootVisible : true,
		collapsible : true,
		bodyBorder : false,
		collapseMode : 'mini',
		xtype : 'tree',
		displayField : 'cm:name',
		useArrows : true,
		store : {
			fields : ['cm:name', 'sys:node-uuid'],
			autoLoad : true,
			proxy : {
				type : 'ajax',
				url : Utils.getCDAUrl('ObjectManagement', 'getFolders')
			},
			listeners: {
				beforeload : function (store, operation, eOpts) {
					this.proxy.extraParams.parentId = operation.node.get('sys:node-uuid');
				}
		    }
		}
	});
	
	treePanel.on('itemclick', function(tree, record) {
		store.proxy.extraParams.parentId = record.get('sys:node-uuid');
		store.reload();
	});
	
	var store = new Ext.data.Store({
	    fields:['cm:name', 'cm:title', 'cm:description', 'extension'],
		pageSize : 30,
	    proxy : {
			type : 'ajax',
			reader : {
				type : 'json',
				root : 'results',
				totalProperty : 'total'
			},
			url : Utils.getCDAUrl('ObjectManagement', 'getContents')
		}
	});
	
	var grid = Ext.create('Ext.grid.Panel', {
		columns: [
			{ width : 28, resizable : false, hideable : false, sortable : false, menuDisabled : true,
		        renderer : function(value, metaData, record, rowIndex, colIndex, store) {
		            return getImageString(record);
		        } 
        	},
	        { text: Utils.msg('MSG_NAME'),  dataIndex: 'cm:name', width : 300 },
	        { text: Utils.msg('MSG_TITLE'), dataIndex: 'cm:title', flex: 1 },
	        { text: Utils.msg('MSG_DESCRIPTION'), dataIndex: 'cm:description', width : 300 }
	    ],
	    selModel : Ext.create('Ext.selection.CheckboxModel'),
	    store : store,
	    contextDetect : true,
	    tbar : [{
			text : msg('MSG_CREATE_OBJECT'),
			btnType : 'info',
			handler : function() {
				var node = treePanel.getSelectionModel().getSelection()[0];
				
				var parentId;
				if (node) {
					parentId = node.get('sys:node-uuid');
				}
				if (Ext.isEmpty(parentId)) {
					parentId = '/';
				}
				
				IVS.changeView('createObject?parentId=' + parentId);
			}
		}, {
			text : Utils.msg('MSG_EDIT'),
			btnType : 'warning',
			dynamic : 'singleselect',
			handler : function() {
				
				var recs = this.ownerCt.ownerCt.getSelectionModel().getSelection();
				
				if (recs.length == 0) {
					return;
				}
				var objectId = recs[0].raw['sys:node-uuid'];
				
				IVS.changeView('objectProperties?objectId=' + objectId);
				
			}
		}, {
			text : Utils.msg('MSG_DELETE'),
			btnType : 'danger',
			dynamic : 'multiselect',
			handler : function() {
				
				var recs = grid.getSelectionModel().getSelection();
				
				Ext.Msg.confirm('', Utils.msg('MSG_CONFIRM_DELETE'), function(btn, text) {
					if(btn != 'yes') {
						return;
					}
					
					Utils.request_AJAX(Utils.getCDAUrl('ObjectManagement', 'batchDelete'), {
						objectIds : Utils.joinRecords(recs, 'sys:node-uuid', ', ')
					}, function() {
						grid.store.reload();
					});
					
				});
				
			}
		}]
	});
	
	var iconPanel = Ext.create('Ext.view.View', {
        store: store,
        tpl: [
            '<tpl for=".">',
                '<div class="thumb-wrap" id="{name:stripTags}">',
                    '<div class="thumb"><img src="images/thumbnail/{extension}.png" title="{name:htmlEncode}"></div>',
                    '<span class="x-editable">{shortName:htmlEncode}</span>',
                '</div>',
            '</tpl>',
            '<div class="x-clear"></div>'
        ],
        multiSelect: true,
        height: 310,
        trackOver: true,
        overItemCls: 'x-item-over',
        itemSelector: 'div.thumb-wrap',
        plugins: [
            Ext.create('Ext.ux.DataView.DragSelector', {})
        ],
        prepareData: function(data) {
            Ext.apply(data, {
                shortName: Ext.util.Format.ellipsis(data['cm:name'], 15),
                sizeString: Ext.util.Format.fileSize(data.size),
                dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a")
            });
            return data;
        },
        listeners: {
            selectionchange: function(dv, nodes ){
            }
        }
    });
    
	return {
		xtype : 'panel',
		border : false,
		layout : 'border',
		bodyBorder : false,
		bodyStyle : {
			background : 'transparent'
		},
		listeners : {
			viewShown : function() {
				store.reload();
			}
		},
		items : [treePanel, {
			region : 'center',
			xtype : 'panel',
			border : false,
			store: store,
		    layout : 'fit',
		    items : grid,
		    bbar : {
		    	cls : 'border-top',
		    	xtype : 'pagingtoolbar',
	    		displayInfo : true,
		    	store : store,
		    	items : [{
					toggleGroup : 'view',
					tooltip : msg('MSG_VIEW_LIST'),
					icon : 'images/common/application_view_list.png',
					pressed : true,
					listeners : {
						toggle : function(btn, pressed) {
							if (pressed) {
								var container = this.ownerCt.ownerCt;
								container.removeAll(false);
								container.add(grid);
							}
						}
					}
				}, {
					toggleGroup : 'view',
					tooltip : msg('MSG_VIEW_THUMB'),
					icon : 'images/common/application_view_icons.png',
					listeners : {
						toggle : function(btn, pressed) {
							if (pressed) {
								var container = this.ownerCt.ownerCt;
								container.removeAll(false);
								container.add(iconPanel);
							}
						}
					}
				}]
		    }
		}]
	};

}