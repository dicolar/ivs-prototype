Ext.define('cn.incontent.navi.TreeView', {
    extend : 'Ext.tree.View',
    xtype : 'navitreeview',
    focusedItemCls : 'navi-selected',
    cellTpl : [
	    '<td role="gridcell" title="{description}" class="navi-cell {naviCellRoot} {tdCls}" {tdAttr} id="{[Ext.id()]}">',
	        '<div {unselectableAttr} class="' + Ext.baseCSSPrefix + 'grid-cell-inner {innerCls}"',
	            'style="text-align:{align};<tpl if="style">{style}</tpl>">{value}</div>',
	    '</td>', {
	        priority: 0
	    }
	],
	renderCell: function(column, record, recordIndex, columnIndex, out) {
		
        var me = this,
            selModel = me.selModel,
            cellValues = me.cellValues,
            classes = cellValues.classes,
            fieldValue = record.data[column.dataIndex],
            cellTpl = me.cellTpl,
            value, clsInsertPoint;

		cellValues.naviCellRoot = (record.parentNode == null || record.parentNode.parentNode == null) ? 'navi-cell-root' : null;
		
		cellValues.description = record.raw.description;
        cellValues.record = record;
        cellValues.column = column;
        cellValues.recordIndex = recordIndex;
        cellValues.columnIndex = columnIndex;
        cellValues.cellIndex = columnIndex;
        cellValues.align = column.align;
        cellValues.tdCls = column.tdCls;
        cellValues.innerCls = column.innerCls;
        cellValues.style = cellValues.tdAttr = "";
        cellValues.unselectableAttr = me.enableTextSelection ? '' : 'unselectable="on"';

        if (column.renderer && column.renderer.call) {
            value = column.renderer.call(column.scope || me.ownerCt, fieldValue, cellValues, record, recordIndex, columnIndex, me.dataSource, me);
            if (cellValues.css) {
                
                
                record.cssWarning = true;
                cellValues.tdCls += ' ' + cellValues.css;
                delete cellValues.css;
            }
        } else {
            value = fieldValue;
        }
        
        if (record.raw.tcode != null) {
        	value += '-' + record.raw.tcode;
        }
        
        cellValues.value = (value == null || value === '') ? '&#160;' : value;
        
        classes[1] = Ext.baseCSSPrefix + 'grid-cell-' + column.getItemId();
            
        clsInsertPoint = 2;

        if (column.tdCls) {
            classes[clsInsertPoint++] = column.tdCls;
        }
        if (me.markDirty && record.isModified(column.dataIndex)) {
            classes[clsInsertPoint++] = me.dirtyCls;
        }
        if (column.isFirstVisible) {
            classes[clsInsertPoint++] = me.firstCls;
        }
        if (column.isLastVisible) {
            classes[clsInsertPoint++] = me.lastCls;
        }
        if (!me.enableTextSelection) {
            classes[clsInsertPoint++] = Ext.baseCSSPrefix + 'unselectable';
        }

        classes[clsInsertPoint++] = cellValues.tdCls;
        if (selModel && selModel.isCellSelected && selModel.isCellSelected(me, recordIndex, columnIndex)) {
            classes[clsInsertPoint++] = (me.selectedCellCls);
        }
        
        classes.length = clsInsertPoint;

        cellValues.tdCls = classes.join(' ');

        cellTpl.applyOut(cellValues, out);
        
        cellValues.column = null;
    }
});