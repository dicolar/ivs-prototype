Ext.define('cn.incontent.ViewSearcher', {
    extend:'Ext.form.field.Picker',
    requires: ['cn.incontent.TreeFilter', 'Ext.util.DelayedTask', 'Ext.EventObject', 'Ext.view.BoundList', 'Ext.view.BoundListKeyNav', 'Ext.data.StoreManager', 'Ext.layout.component.field.ComboBox'],
    alias: ['widget.viewsearcher'],
    mixins: {
        bindable: 'Ext.util.Bindable'    
    },

    componentLayout: 'combobox',
    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',
    hiddenName: '',
    hiddenDataCls: Ext.baseCSSPrefix + 'hide-display ' + Ext.baseCSSPrefix + 'form-data-hidden',
    //TODO 1
    fieldSubTpl: [
        '<div class="{hiddenDataCls}" role="presentation"></div>',
        '<div style="background-color:white;"><span style="float:left;" role="pathgroup"></span><input id="{id}" type="{type}" {inputAttrTpl} class="{fieldCls} {typeCls} {editableCls}" autocomplete="off"',
            '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
            '<tpl if="name"> name="{name}"</tpl>',
            '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>',
            '<tpl if="size"> size="{size}"</tpl>',
            '<tpl if="maxLength !== undefined"> maxlength="{maxLength}"</tpl>',
            '<tpl if="readOnly"> readonly="readonly"</tpl>',
            '<tpl if="disabled"> disabled="disabled"</tpl>',
            '<tpl if="tabIdx"> tabIndex="{tabIdx}"</tpl>',
            '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
            '/></div>',
        {
            compiled: true,
            disableFormats: true
        }
    ],
    
    //indicate the current select node and its parents.
    //root->1st node->2nd node ... etc
    currentNodes : [],

    getSubTplData: function(){
        var me = this;
        
        Ext.applyIf(me.subTplData, {
            hiddenDataCls: me.hiddenDataCls
        });
        return me.callParent(arguments);
    },
	
	//private 
	adjustWidth : function() {
		
		var me = this;
		
		var width = 0;
	    				
		Ext.each(me.pathgroup.items.items, function(item) {
			width += item.getWidth();
		});
		
		width = width == 0 ? 0 : width + 6;
		me.pathgroup.setWidth(width);
		
		me.inputEl.setWidth(me.getWidth() - width - me.inputIndent);
	},
	
	//private
	refreshPathGroup : function() {
		//TODO
		
		var nodes = this.currentNodes;
		this.pathgroup.removeAll(true);
		
		var me = this;
		var h = me.getHeight() - (Ext.isIE7 ? 9 : 8);
		Ext.each(nodes, function(node, idx) {
			
			if (idx != 0) {
				me.pathgroup.add({
					xtype : 'button',
					text : node.raw.text,
					height : h
				});
			}
			
			if (node.childNodes.length != 0) {
				
				me.pathgroup.add({
	    			xtype : 'button',
	    			iconCls : 'arrow-right',
	    			width : 18,
	    			height : h,
	    			handler : function() {
	    				
	    				var pos = this.getPosition();
	    				
	    				pos[1] = pos[1] + this.getHeight();
	    				
	    				var menus = [];
	    				Ext.each(node.childNodes, function(c) {
	    					menus.push({
	    						text : c.raw.text,
	    						node : c,
	    						icon : c.icon,
	    						iconCls : c.iconCls,
	    						handler : function() {
	    							var nodes = [];
	    							
	    							var n = this.node;
						    		while(n) {
						    			nodes.unshift(n);
						    			n = n.parentNode;
						    		}
						    		
						    		me.currentNodes = nodes;
						    		me.refreshPathGroup();
	    						}
	    					});
	    				});
	    				
	    				Ext.create('Ext.menu.Menu', {
	    					shadow : false,
	    					items : menus
	    				}).showAt(pos);
	    			}
	    		});
			}
		});

		me.inputEl.blur();
		
		if (me.pathgroup._VISIBLE) {
			me.pathgroup.fireEvent('resize');
		}
		
		me.triggerBlur();
		
	},
	
	//private
	buildTree : function() {
		if (this.tree) {
			return;
		}
		
		var me = this;
		
		this.tree = Ext.create('Ext.tree.Panel', {
			plugins: [{
		        ptype : 'treefilter', 
		        allowParentFolders : true
		    }],
		    listeners : {
		    	beforeitemcollapse : function() {
		    		return false;
		    	},
		    	select : function(tree, record) {
		    		var nodes = [];
		    		
		    		var n = record;
		    		while(n) {
		    			nodes.unshift(n);
		    			n = n.parentNode;
		    		}
		    		
		    		me.currentNodes = nodes;
		    		me.refreshPathGroup();
		    	}
		    },
		    rootVisible : false,
        	border : false,
        	bodyBorder : false,
        	bodyStyle : {
        		border : 0
        	},
        	useArrows : true,
        	autoScroll : true,
        	height : 300,
        	store : {
				root: {
		        expanded: true,
		        children: [{
		            text: "detention"
		            , leaf: true
		        }, {
		            text: "homework"
		            , expanded: false
		            , children: [{
		                text: "book report"
		                , leaf: true
		            }, {
		                text: "algebra"
		                , leaf: true
		            }]
		        }, {
		            text: "chores"
		            , expanded: false
		            , children: [{
		                text: "do homework"
		                , leaf: true
		            }, {
		                text: "walk dog"
		                , leaf: true
		            }, {
		                text: "clean room"
		                , leaf: true
		            }, {
		                text: "wash dishes"
		                , leaf: true
		            }, {
		                text: "laundry"
		                , leaf: true
		            }]
		        }, {
		            text: "buy lottery tickets"
		            , leaf: true
		        }, {
		            text: "take over world"
		            , leaf: true
		        }, {
		            text: "Sencha"
		            , expanded: false
		            , children: [{
		                text: "Touch"
		                , expanded: false
		                , children: [{
		                    text: 'Viewport'
		                    , leaf: true
		                }, {
		                    text: 'Panel'
		                    , leaf: true
		                }, {
		                    text: 'Carousel'
		                    , leaf: true
		                }]
		            }, {
		                text: "ExtJS"
		                , expanded: false
		                , children: [{
		                    text: 'viewport.Viewport'
		                    , leaf: true
		                }, {
		                    text: 'panel.Panel'
		                    , leaf: true
		                }, {
		                    text: 'tree.Panel'
		                    , leaf: true
		                }]
		            }]
		        }]
		    }
			}
        });
        
        this.tree.expandAll();
	},
	//private
	searchInTree : function(value) {
		if (value) {
			this.tree.filter(value);
		} else {
			this.tree.clearFilter();
		}
	},
	
    afterRender: function(){
    	
    	this.on('resize', function() {
    		if (Ext.isIE7) {
	    		Ext.fly(this.el.query('span[role=pathgroup]')[0]).parent().setWidth(this.getWidth());
    		}
    		this.adjustWidth();
    	});
    	
        var me = this;
    	//render the button group
    	var pathgroup = Ext.create('Ext.panel.Panel', {
    		width : 200,
    		border : false,
    		bodyPadding : 3,
    		renderTo : this.el.query('span[role=pathgroup]')[0],
    		height : me.getHeight(),
    		listeners : {
    			afterRender : function() {
    				
    				this.el.setStyle('top', 0);
    				
    				this.on('resize', function() {
    					me.adjustWidth();
    				});
    				
    			}
    		},
    		layout : 'hbox'
    	});
    	me.pathgroup = pathgroup;
    	
        me.callParent(arguments);
        me.setHiddenValue(me.value);
        
        me.on('focus', function() {
        	
        	this.tree.clearFilter();
        	this.expand();
        	me.pathgroupwidth = this.pathgroup.getWidth();
        	
        	if (this.pathgroup.items.getCount() == 0) {
        		return;
        	}
        	
        	this.pathgroup.el.slideOut('l', {
        		duration : 200,
        		callback : function() {
        			me.pathgroup._VISIBLE = false;
		        	me.inputEl.setWidth(me.getWidth() - me.inputIndent);
        		}
        	});
        	
        });
        me.on('blur', function() {
        	
        	this.collapse();
        	me.inputEl.dom.value = '';
        	
        	if (me.pathgroup._VISIBLE == true) {
        		return;
        	}
        	
        	if (this.pathgroup.items.getCount() == 0) {
        		return;
        	}
        	
        	me.inputEl.setWidth(0);
        	
        	this.pathgroup.el.slideIn('l', {
        		duration : 200,
        		callback : function() {
        			me.pathgroup._VISIBLE = true;
        			me.inputEl.setWidth(me.getWidth() - me.pathgroupwidth - me.inputIndent);
        			me.adjustWidth();
        		}
        	});
        });
        
        me.adjustWidth();
    },
    multiSelect: false,
    delimiter: ', ',
    displayField: 'text',
    triggerAction: 'all',
    allQuery: '',
    queryParam: 'query',
    queryMode: 'remote',
    queryCaching: true,
    pageSize: 0,
    anyMatch: false,
    caseSensitive: false,
    autoSelect: true,
    typeAhead: false,
    typeAheadDelay: 250,
    selectOnTab: true,
    forceSelection: false,
    treeHeight : 400,
    growToLongestValue: true,
    defaultListConfig: {
        loadingHeight: 70,
        minWidth: 70,
        maxHeight: 300,
        shadow: 'sides'
    },

    //private
    ignoreSelection: 0,
    //private, tells the layout to recalculate its startingWidth when a record is removed from its bound store
    removingRecords: null,
    //private helper
    resizeComboToGrow: function () {
        var me = this;
        return me.grow && me.growToLongestValue;
    },
    initComponent: function() {
    	
    	this.buildTree();
    	
    	this.store = Ext.create('Ext.data.ArrayStore', {
			fields: ['text'],
			data : ['']
		});
		this.displayField = 'text';
		this.queryMode = 'local';
		this.onDownArrow = Ext.emptyFn;
        this.select = Ext.emptyFn;
        this.triggerAction = 'all';
        this.hideTrigger = true;
        
        this.onKeyUp = function(e) {
        	this.searchInTree(this.inputEl.getValue());
        };
		
		var treeDivId = Ext.id();
		this.treeDivId = treeDivId;
		
		this.tpl = '<tpl for="."><div id="' + treeDivId + '"><div></tpl>';
		
		this.listConfig = {
            maxHeight : 400
        };
        
        this.on('expand', function() {
        	
        	if (!this.tree) {
        		this.buildTree();
        	}
        	
        	this.tree.setWidth('100%');
        	if (!this.tree.rendered) {
        		this.tree.render(this.treeDivId);
        	}
        });
        
    	this.inputIndent = 6;
    	if (Ext.isIE7) {
    		this.inputIndent = 0;
    	}
    	
        var me = this,
            isDefined = Ext.isDefined,
            store = me.store,
            transform = me.transform,
            transformSelect, isLocalMode;

        Ext.applyIf(me.renderSelectors, {
            hiddenDataEl: '.' + me.hiddenDataCls.split(' ').join('.')
        });
        
        //<debug>
        if (me.typeAhead && me.multiSelect) {
            Ext.Error.raise('typeAhead and multiSelect are mutually exclusive options -- please remove one of them.');
        }
        if (me.typeAhead && !me.editable) {
            Ext.Error.raise('If typeAhead is enabled the combo must be editable: true -- please change one of those settings.');
        }
        if (me.selectOnFocus && !me.editable) {
            Ext.Error.raise('If selectOnFocus is enabled the combo must be editable: true -- please change one of those settings.');
        }
        //</debug>

        this.addEvents(
            'beforequery',
            'select',
            'beforeselect',
            'beforedeselect'
        );

        // Build store from 'transform' HTML select element's options
        if (transform) {
            transformSelect = Ext.getDom(transform);
            if (transformSelect) {
                if (!me.store) {
                    store = Ext.Array.map(Ext.Array.from(transformSelect.options), function(option){
                        return [option.value, option.text];
                    });
                }
                if (!me.name) {
                    me.name = transformSelect.name;
                }
                if (!('value' in me)) {
                    me.value = transformSelect.value;
                }
            }
        }

        me.bindStore(store || 'ext-empty-store', true);
        store = me.store;
        if (store.autoCreated) {
            me.queryMode = 'local';
            me.valueField = me.displayField = 'field1';
            if (!store.expanded) {
                me.displayField = 'field2';
            }
        }

        if (!isDefined(me.valueField)) {
            me.valueField = me.displayField;
        }

        isLocalMode = me.queryMode === 'local';
        if (!isDefined(me.queryDelay)) {
            me.queryDelay = isLocalMode ? 10 : 500;
        }
        if (!isDefined(me.minChars)) {
            me.minChars = isLocalMode ? 0 : 4;
        }

        if (!me.displayTpl) {
            me.displayTpl = new Ext.XTemplate(
                '<tpl for=".">' +
                    '{[typeof values === "string" ? values : values["' + me.displayField + '"]]}' +
                    '<tpl if="xindex < xcount">' + me.delimiter + '</tpl>' +
                '</tpl>'
            );
        } else if (Ext.isString(me.displayTpl)) {
            me.displayTpl = new Ext.XTemplate(me.displayTpl);
        }

        me.callParent();

        me.doQueryTask = new Ext.util.DelayedTask(me.doRawQuery, me);

        // store has already been loaded, setValue
        if (me.store.getCount() > 0) {
            me.setValue(me.value);
        }

        // render in place of 'transform' select
        if (transformSelect) {
            me.render(transformSelect.parentNode, transformSelect);
            Ext.removeNode(transformSelect);
            delete me.renderTo;
        }
    },

    getStore : function(){
        return this.store;
    },

    beforeBlur: function() {
        this.doQueryTask.cancel();
        this.assertValue();
    },

    // private
    assertValue: function() {
        var me = this,
            value = me.getRawValue(),
            rec, currentValue;

        if (me.forceSelection) {
            if (me.multiSelect) {
                // For multiselect, check that the current displayed value matches the current
                // selection, if it does not then revert to the most recent selection.
                if (value !== me.getDisplayValue()) {
                    me.setValue(me.lastSelection);
                }
            } else {
                // For single-select, match the displayed value to a record and select it,
                // if it does not match a record then revert to the most recent selection.
                rec = me.findRecordByDisplay(value);
                if (rec) {
                    currentValue = me.value;
                    // Prevent an issue where we have duplicate display values with
                    // different underlying values.
                    if (!me.findRecordByValue(currentValue)) {
                        me.select(rec, true);
                    }
                } else {
                    me.setValue(me.lastSelection);
                }
            }
        }
        me.collapse();
    },

    onTypeAhead: function() {
        var me = this,
            displayField = me.displayField,
            record = me.store.findRecord(displayField, me.getRawValue()),
            boundList = me.getPicker(),
            newValue, len, selStart;

        if (record) {
            newValue = record.get(displayField);
            len = newValue.length;
            selStart = me.getRawValue().length;

            boundList.highlightItem(boundList.getNode(record));

            if (selStart !== 0 && selStart !== len) {
                me.setRawValue(newValue);
                me.selectText(selStart, newValue.length);
            }
        }
    },

    // invoked when a different store is bound to this combo
    // than the original
    resetToDefault: Ext.emptyFn,

    beforeReset: function() {
        this.callParent();

        // If filtered on typed value, unfilter.
        if (this.queryFilter && !this.queryFilter.disabled) {
            this.queryFilter.disabled = true;
            this.store.filter();
        }
    },

    onUnbindStore: function(store) {
        var me = this,
            picker = me.picker;

        // If we'd added a local filter, remove it
        if (me.queryFilter) {
            me.store.removeFilter(me.queryFilter);
        }
        if (!store && picker) {
            picker.bindStore(null);
        }
    },

    onBindStore: function(store, initial) {
        var picker = this.picker;
        if (!initial) {
            this.resetToDefault();
        }

        if (picker) {
            picker.bindStore(store);
        }
    },

    getStoreListeners: function() {
        var me = this;

        return {
            beforeload: me.onBeforeLoad,
            clear: me.onClear,
            datachanged: me.onDataChanged,
            load: me.onLoad,
            exception: me.onException,
            remove: me.onRemove
        }; 
    },

    onBeforeLoad: function(){
        ++this.ignoreSelection;    
    },

    onDataChanged: function() {
        var me = this;

        if (me.resizeComboToGrow()) {
            me.updateLayout();
        }
    },

    onClear: function() {
        var me = this;

        if (me.resizeComboToGrow()) {
            me.removingRecords = true;
            me.onDataChanged();
        }
    },

    onRemove: function() {
        var me = this;

        if (me.resizeComboToGrow()) {
            me.removingRecords = true;
        }
    },

    onException: function(){
        if (this.ignoreSelection > 0) {
            --this.ignoreSelection;
        }
        this.collapse();    
    },

    onLoad: function(store, records, success) {
        var me = this;

        if (me.ignoreSelection > 0) {
            --me.ignoreSelection;
        }

        // If not querying using the raw field value, we can set the value now we have data
        if (success && !store.lastOptions.rawQuery) {
            // Set the value on load

            // There's no value.
            if (me.value == null) {
                // Highlight the first item in the list if autoSelect: true
                if (me.store.getCount()) {
                    me.doAutoSelect();
                } else {
                    // assign whatever empty value we have to prevent change from firing
                    me.setValue(me.value);
                }
            } else {
                me.setValue(me.value);
            }
        }
    },

    /**
     * @private
     * Execute the query with the raw contents within the textfield.
     */
    doRawQuery: function() {
        this.doQuery(this.getRawValue(), false, true);
    },

    doQuery: function(queryString, forceAll, rawQuery) {
        var me = this,

            // Decide if, and how we are going to query the store
            queryPlan = me.beforeQuery({
                query: queryString || '',
                rawQuery: rawQuery,
                forceAll: forceAll,
                combo: me,
                cancel: false
            });

        // Allow veto.
        if (queryPlan === false || queryPlan.cancel) {
            return false;
        }

        // If they're using the same value as last time, just show the dropdown
        if (me.queryCaching && queryPlan.query === me.lastQuery) {
            me.expand();
        }
        
        // Otherwise filter or load the store
        else {
            me.lastQuery = queryPlan.query;

            if (me.queryMode === 'local') {
                me.doLocalQuery(queryPlan);

            } else {
                me.doRemoteQuery(queryPlan);
            }
        }

        return true;
    },

    beforeQuery: function(queryPlan) {
        var me = this;

        // Allow beforequery event to veto by returning false
        if (me.fireEvent('beforequery', queryPlan) === false) {
            queryPlan.cancel = true;
        }

        // Allow beforequery event to veto by returning setting the cancel flag
        else if (!queryPlan.cancel) {

            // If the minChars threshold has not been met, and we're not forcing an "all" query, cancel the query
            if (queryPlan.query.length < me.minChars && !queryPlan.forceAll) {
                queryPlan.cancel = true;
            }
        }
        return queryPlan;
    },

    doLocalQuery: function(queryPlan) {
        var me = this,
            queryString = queryPlan.query;

        // Create our filter when first needed
        if (!me.queryFilter) {
            // Create the filter that we will use during typing to filter the Store
            me.queryFilter = new Ext.util.Filter({
                id: me.id + '-query-filter',
                anyMatch: me.anyMatch,
                caseSensitive: me.caseSensitive,
                root: 'data',
                property: me.displayField
            });
            me.store.addFilter(me.queryFilter, false);
        }

        // Querying by a string...
        if (queryString || !queryPlan.forceAll) {
            me.queryFilter.disabled = false;
            me.queryFilter.setValue(me.enableRegEx ? new RegExp(queryString) : queryString);
        }

        // If forceAll being used, or no query string, disable the filter
        else {
            me.queryFilter.disabled = true;
        }

        // Filter the Store according to the updated filter
        me.store.filter();

        // Expand after adjusting the filter unless there are no matches
        if (me.store.getCount()) {
            me.expand();
        } else {
            me.collapse();
        }

        me.afterQuery(queryPlan);
    },

    doRemoteQuery: function(queryPlan) {
        var me = this,
            loadCallback = function() {
                me.afterQuery(queryPlan);
            };

        // expand before loading so LoadMask can position itself correctly
        me.expand();

        // In queryMode: 'remote', we assume Store filters are added by the developer as remote filters,
        // and these are automatically passed as params with every load call, so we do *not* call clearFilter.
        if (me.pageSize) {
            // if we're paging, we've changed the query so start at page 1.
            me.loadPage(1, {
                rawQuery: queryPlan.rawQuery,
                callback: loadCallback
            });
        } else {
            me.store.load({
                params: me.getParams(queryPlan.query),
                rawQuery: queryPlan.rawQuery,
                callback: loadCallback
            });
        }
    },

    afterQuery: function(queryPlan) {
        var me = this;

        if (me.store.getCount()) {
            if (me.typeAhead) {
                me.doTypeAhead();
            }

            // Clear current selection if it does not match the current value in the field
            if (me.getRawValue() !== me.getDisplayValue()) {
                me.ignoreSelection++;
                me.picker.getSelectionModel().deselectAll();
                me.ignoreSelection--;
            }

            if (queryPlan.rawQuery) {
                me.syncSelection();
                if (me.picker && !me.picker.getSelectionModel().hasSelection()) {
                    me.doAutoSelect();
                }
            } else {
                me.doAutoSelect();
            }
        }
    },

    loadPage: function(pageNum, options) {
        this.store.loadPage(pageNum, Ext.apply({
            params: this.getParams(this.lastQuery)
        }, options));
    },

    onPageChange: function(toolbar, newPage){
        /*
         * Return false here so we can call load ourselves and inject the query param.
         * We don't want to do this for every store load since the developer may load
         * the store through some other means so we won't add the query param.
         */
        this.loadPage(newPage);
        return false;
    },

    // private
    getParams: function(queryString) {
        var params = {},
            param = this.queryParam;

        if (param) {
            params[param] = queryString;
        }
        return params;
    },

    /**
     * @private
     * If the autoSelect config is true, and the picker is open, highlights the first item.
     */
    doAutoSelect: function() {
        var me = this,
            picker = me.picker,
            lastSelected, itemNode;
        if (picker && me.autoSelect && me.store.getCount() > 0) {
            // Highlight the last selected item and scroll it into view
            lastSelected = picker.getSelectionModel().lastSelected;
            itemNode = picker.getNode(lastSelected || 0);
            if (itemNode) {
                picker.highlightItem(itemNode);
                picker.listEl.scrollChildIntoView(itemNode, false);
            }
        }
    },

    doTypeAhead: function() {
        if (!this.typeAheadTask) {
            this.typeAheadTask = new Ext.util.DelayedTask(this.onTypeAhead, this);
        }
        if (this.lastKey != Ext.EventObject.BACKSPACE && this.lastKey != Ext.EventObject.DELETE) {
            this.typeAheadTask.delay(this.typeAheadDelay);
        }
    },

    onTriggerClick: function() {
        var me = this;
        if (!me.readOnly && !me.disabled) {
            if (me.isExpanded) {
                me.collapse();
            } else {
                me.onFocus({});
                if (me.triggerAction === 'all') {
                    me.doQuery(me.allQuery, true);
                } else if (me.triggerAction === 'last') {
                    me.doQuery(me.lastQuery, true);
                } else {
                    me.doQuery(me.getRawValue(), false, true);
                }
            }
            me.inputEl.focus();
        }
    },

    onPaste: function(){
        var me = this;
        
        if (!me.readOnly && !me.disabled && me.editable) {
            me.doQueryTask.delay(me.queryDelay);
        }
    },

    // store the last key and doQuery if relevant
    onKeyUp: function(e, t) {
        var me = this,
            key = e.getKey();

        if (!me.readOnly && !me.disabled && me.editable) {
            me.lastKey = key;
            // we put this in a task so that we can cancel it if a user is
            // in and out before the queryDelay elapses

            // perform query w/ any normal key or backspace or delete
            if (!e.isSpecialKey() || key == e.BACKSPACE || key == e.DELETE) {
                me.doQueryTask.delay(me.queryDelay);
            }
        }

        if (me.enableKeyEvents) {
            me.callParent(arguments);
        }
    },

    initEvents: function() {
        var me = this;
        me.callParent();

        /*
         * Setup keyboard handling. If enableKeyEvents is true, we already have
         * a listener on the inputEl for keyup, so don't create a second.
         */
        if (!me.enableKeyEvents) {
            me.mon(me.inputEl, 'keyup', me.onKeyUp, me);
        }
        me.mon(me.inputEl, 'paste', me.onPaste, me);
    },

    onDestroy: function() {
        Ext.destroy(this.listKeyNav);
        this.bindStore(null);
        this.callParent();
    },

    // The picker (the dropdown) must have its zIndex managed by the same ZIndexManager which is
    // providing the zIndex of our Container.
    onAdded: function() {
        var me = this;
        me.callParent(arguments);
        if (me.picker) {
            me.picker.ownerCt = me.up('[floating]');
            me.picker.registerWithOwnerCt();
        }
    },

    createPicker: function() {
        var me = this,
            picker,
            pickerCfg = Ext.apply({
                xtype: 'boundlist',
                pickerField: me,
                selModel: {
                    mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
                },
                floating: true,
                hidden: true,
                store: me.store,
                displayField: me.displayField,
                focusOnToFront: false,
                pageSize: me.pageSize,
                tpl: me.tpl
            }, me.listConfig, me.defaultListConfig);

        picker = me.picker = Ext.widget(pickerCfg);
        if (me.pageSize) {
            picker.pagingToolbar.on('beforechange', me.onPageChange, me);
        }

        me.mon(picker, {
            itemclick: me.onItemClick,
            refresh: me.onListRefresh,
            scope: me
        });

        me.mon(picker.getSelectionModel(), {
            beforeselect: me.onBeforeSelect,
            beforedeselect: me.onBeforeDeselect,
            selectionchange: me.onListSelectionChange,
            scope: me
        });

        return picker;
    },

    alignPicker: function(){
        var me = this,
            picker = me.getPicker(),
            heightAbove = me.getPosition()[1] - Ext.getBody().getScroll().top,
            heightBelow = Ext.Element.getViewHeight() - heightAbove - me.getHeight(),
            space = Math.max(heightAbove, heightBelow);

        // Allow the picker to height itself naturally.
        if (picker.height) {
            delete picker.height;
            picker.updateLayout();
        }
        // Then ensure that vertically, the dropdown will fit into the space either above or below the inputEl.
        if (picker.getHeight() > space - 5) {
            picker.setHeight(space - 5); // have some leeway so we aren't flush against
        }
        me.callParent();
    },

    onListRefresh: function() {
        // Picker will be aligned during the expand call
        if (!this.expanding) {
            this.alignPicker();
        }
        this.syncSelection();
    },

    onItemClick: function(picker, record){
        /*
         * If we're doing single selection, the selection change events won't fire when
         * clicking on the selected element. Detect it here.
         */
        var me = this,
            selection = me.picker.getSelectionModel().getSelection(),
            valueField = me.valueField;

        if (!me.multiSelect && selection.length) {
            if (record.get(valueField) === selection[0].get(valueField)) {
                // Make sure we also update the display value if it's only partial
                me.displayTplData = [record.data];
                me.setRawValue(me.getDisplayValue());
                me.collapse();
            }
        }
    },

    onBeforeSelect: function(list, record) {
        return this.fireEvent('beforeselect', this, record, record.index);
    },

    onBeforeDeselect: function(list, record) {
        return this.fireEvent('beforedeselect', this, record, record.index);
    },

    onListSelectionChange: function(list, selectedRecords) {
        var me = this,
            isMulti = me.multiSelect,
            hasRecords = selectedRecords.length > 0;
        // Only react to selection if it is not called from setValue, and if our list is
        // expanded (ignores changes to the selection model triggered elsewhere)
        if (!me.ignoreSelection && me.isExpanded) {
            if (!isMulti) {
                Ext.defer(me.collapse, 1, me);
            }
            /*
             * Only set the value here if we're in multi selection mode or we have
             * a selection. Otherwise setValue will be called with an empty value
             * which will cause the change event to fire twice.
             */
            if (isMulti || hasRecords) {
                me.setValue(selectedRecords, false);
            }
            if (hasRecords) {
                me.fireEvent('select', me, selectedRecords);
            }
            me.inputEl.focus();
        }
    },

    /**
     * @private
     * Enables the key nav for the BoundList when it is expanded.
     */
    onExpand: function() {
        var me = this,
            keyNav = me.listKeyNav,
            selectOnTab = me.selectOnTab,
            picker = me.getPicker();

        // Handle BoundList navigation from the input field. Insert a tab listener specially to enable selectOnTab.
        if (keyNav) {
            keyNav.enable();
        } else {
            keyNav = me.listKeyNav = new Ext.view.BoundListKeyNav(this.inputEl, {
                boundList: picker,
                forceKeyDown: true,
                tab: function(e) {
                    if (selectOnTab) {
                        this.selectHighlighted(e);
                        me.triggerBlur();
                    }
                    // Tab key event is allowed to propagate to field
                    return true;
                },
                enter: function(e){
                    var selModel = picker.getSelectionModel(),
                        count = selModel.getCount();
                        
                    this.selectHighlighted(e);
                    
                    // Handle the case where the highlighted item is already selected
                    // In this case, the change event won't fire, so just collapse
                    if (!me.multiSelect && count === selModel.getCount()) {
                        me.collapse();
                    }
                }
            });
        }

        // While list is expanded, stop tab monitoring from Ext.form.field.Trigger so it doesn't short-circuit selectOnTab
        if (selectOnTab) {
            me.ignoreMonitorTab = true;
        }

        Ext.defer(keyNav.enable, 1, keyNav); //wait a bit so it doesn't react to the down arrow opening the picker
        me.inputEl.focus();
    },

    /**
     * @private
     * Disables the key nav for the BoundList when it is collapsed.
     */
    onCollapse: function() {
        var me = this,
            keyNav = me.listKeyNav;
        if (keyNav) {
            keyNav.disable();
            me.ignoreMonitorTab = false;
        }
    },

    /**
     * Selects an item by a {@link Ext.data.Model Model}, or by a key value.
     * @param {Object} r
     */
    select: function(r, /* private */ assert) {
        var me = this,
            picker = me.picker,
            doSelect = true,
            fireSelect;
        
        if (r && r.isModel && assert === true && picker) {
            fireSelect = !picker.getSelectionModel().isSelected(r);
        }
        
        me.setValue(r, true);
        // Select needs to be fired after setValue, so that when we call getValue
        // in select it returns the correct value
        if (fireSelect) {
            me.fireEvent('select', me, r);
        }
    },

    findRecord: function(field, value) {
        var ds = this.store,
            idx = ds.findExact(field, value);
        return idx !== -1 ? ds.getAt(idx) : false;
    },

    findRecordByValue: function(value) {
        return this.findRecord(this.valueField, value);
    },

    findRecordByDisplay: function(value) {
        return this.findRecord(this.displayField, value);
    },

    setValue: function(value, doSelect) {
        var me = this,
            valueNotFoundText = me.valueNotFoundText,
            inputEl = me.inputEl,
            i, len, record,
            dataObj,
            matchedRecords = [],
            displayTplData = [],
            processedValue = [];

        if (me.store.loading) {
            // Called while the Store is loading. Ensure it is processed by the onLoad method.
            me.value = value;
            me.setHiddenValue(me.value);
            return me;
        }

        // This method processes multi-values, so ensure value is an array.
        value = Ext.Array.from(value);

        // Loop through values, matching each from the Store, and collecting matched records
        for (i = 0, len = value.length; i < len; i++) {
            record = value[i];
            if (!record || !record.isModel) {
                record = me.findRecordByValue(record);
            }
            // record found, select it.
            if (record) {
                matchedRecords.push(record);
                displayTplData.push(record.data);
                processedValue.push(record.get(me.valueField));
            }
            // record was not found, this could happen because
            // store is not loaded or they set a value not in the store
            else {
                // If we are allowing insertion of values not represented in the Store, then push the value and
                // create a fake record data object to push as a display value for use by the displayTpl
                if (!me.forceSelection) {
                    processedValue.push(value[i]);
                    dataObj = {};
                    dataObj[me.displayField] = value[i];
                    displayTplData.push(dataObj);
                    // TODO: Add config to create new records on selection of a value that has no match in the Store
                }
                // Else, if valueNotFoundText is defined, display it, otherwise display nothing for this value
                else if (Ext.isDefined(valueNotFoundText)) {
                    displayTplData.push(valueNotFoundText);
                }
            }
        }

        // Set the value of this field. If we are multiselecting, then that is an array.
        me.setHiddenValue(processedValue);
        me.value = me.multiSelect ? processedValue : processedValue[0];
        if (!Ext.isDefined(me.value)) {
            me.value = null;
        }
        me.displayTplData = displayTplData; //store for getDisplayValue method
        me.lastSelection = me.valueModels = matchedRecords;

        if (inputEl && me.emptyText && !Ext.isEmpty(value)) {
            inputEl.removeCls(me.emptyCls);
        }

        // Calculate raw value from the collection of Model data
        me.setRawValue(me.getDisplayValue());
        me.checkChange();

        if (doSelect !== false) {
            me.syncSelection();
        }
        me.applyEmptyText();

        return me;
    },

    setHiddenValue: function(values){
        var me = this,
            name = me.hiddenName, 
            i,
            dom, childNodes, input, valueCount, childrenCount;
            
        if (!me.hiddenDataEl || !name) {
            return;
        }
        values = Ext.Array.from(values);
        dom = me.hiddenDataEl.dom;
        childNodes = dom.childNodes;
        input = childNodes[0];
        valueCount = values.length;
        childrenCount = childNodes.length;
        
        if (!input && valueCount > 0) {
            me.hiddenDataEl.update(Ext.DomHelper.markup({
                tag: 'input', 
                type: 'hidden', 
                name: name
            }));
            childrenCount = 1;
            input = dom.firstChild;
        }
        while (childrenCount > valueCount) {
            dom.removeChild(childNodes[0]);
            -- childrenCount;
        }
        while (childrenCount < valueCount) {
            dom.appendChild(input.cloneNode(true));
            ++ childrenCount;
        }
        for (i = 0; i < valueCount; i++) {
            childNodes[i].value = values[i];
        }
    },

    getDisplayValue: function() {
        return this.displayTpl.apply(this.displayTplData);
    },

    getValue: function() {
        // If the user has not changed the raw field value since a value was selected from the list,
        // then return the structured value from the selection. If the raw field value is different
        // than what would be displayed due to selection, return that raw value.
        var me = this,
            picker = me.picker,
            rawValue = me.getRawValue(), //current value of text field
            value = me.value; //stored value from last selection or setValue() call

        if (me.getDisplayValue() !== rawValue) {
            value = rawValue;
            me.value = me.displayTplData = me.valueModels = null;
            if (picker) {
                me.ignoreSelection++;
                picker.getSelectionModel().deselectAll();
                me.ignoreSelection--;
            }
        }

        return value;
    },

    getSubmitValue: function() {
        var value = this.getValue();
        // If the value is null/undefined, we still return an empty string. If we
        // don't, the field will never get posted to the server since nulls are ignored.
        if (Ext.isEmpty(value)) {
            value = '';
        }
        return value;
    },

    isEqual: function(v1, v2) {
        var fromArray = Ext.Array.from,
            i, len;

        v1 = fromArray(v1);
        v2 = fromArray(v2);
        len = v1.length;

        if (len !== v2.length) {
            return false;
        }

        for(i = 0; i < len; i++) {
            if (v2[i] !== v1[i]) {
                return false;
            }
        }

        return true;
    },

    /**
     * Clears any value currently set in the ComboBox.
     */
    clearValue: function() {
        this.setValue([]);
    },

    /**
     * @private Synchronizes the selection in the picker to match the current value of the combobox.
     */
    syncSelection: function() {
        var me = this,
            picker = me.picker,
            selection, selModel,
            values = me.valueModels || [],
            vLen  = values.length, v, value;

        if (picker) {
            // From the value, find the Models that are in the store's current data
            selection = [];
            for (v = 0; v < vLen; v++) {
                value = values[v];

                if (value && value.isModel && me.store.indexOf(value) >= 0) {
                    selection.push(value);
                }
            }

            // Update the selection to match
            me.ignoreSelection++;
            selModel = picker.getSelectionModel();
            selModel.deselectAll();
            if (selection.length) {
                selModel.select(selection, undefined, true);
            }
            me.ignoreSelection--;
        }
    },
    
    onEditorTab: function(e){
        var keyNav = this.listKeyNav;
        
        if (this.selectOnTab && keyNav) {
            keyNav.selectHighlighted(e);
        }
    }
});
