Ext.define('cn.incontent.navi.TreeColumn', {
    extend : 'Ext.tree.Column',
    xtype : 'navitreecolumn',
    cellTpl: [
        '<tpl for="lines">',
            '<img src="{parent.blankUrl}" class="{parent.childCls} {parent.elbowCls}-img ',
            '{parent.elbowCls}-<tpl if=".">line<tpl else>empty</tpl>"/>',
        '</tpl>',
        '<img src="{blankUrl}" class="{childCls} {elbowCls}-img {elbowCls}',
            '<tpl if="isLast">-end</tpl><tpl if="expandable">-plus {expanderCls}</tpl>"/>',
        '<tpl if="checked !== null">',
            '<input type="button" role="checkbox" <tpl if="checked">aria-checked="true" </tpl>',
                'class="{childCls} {checkboxCls}<tpl if="checked"> {checkboxCls}-checked</tpl>"/>',
        '</tpl>',
        //TODO
        '<img src="{blankUrl}" class="{childCls} {baseIconCls} ',
            '{baseIconCls}-<tpl if="leaf">leaf<tpl else>parent</tpl> {iconCls}"',
            '<tpl if="icon">style="background-image:url({icon})"</tpl>/>',
        '<tpl if="href">',
            '<a href="{href}" target="{hrefTarget}" class="{textCls} {childCls}">{value}</a>',
        '<tpl else>',
            '<span class="{textCls} {childCls}" style="font-weight:{bold};">{value}</span>',
        '</tpl>'
    ],
    treeRenderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
    	
        var me = this,
            cls = record.get('cls'),
            renderer = me.origRenderer,
            data = record.data,
            parent = record.parentNode,
            rootVisible = view.rootVisible,
            lines = [],
            parentData;

        if (cls) {
            metaData.tdCls += ' ' + cls;
        }

        while (parent && (rootVisible || parent.data.depth > 0)) {
            parentData = parent.data;
            lines[rootVisible ? parentData.depth : parentData.depth - 1] =
                    parentData.isLast ? 0 : 1;
            parent = parent.parentNode;
        }

        return me.getTpl('cellTpl').apply({
        	bold : (record.parentNode == null || record.parentNode.parentNode == null) ? 'bold' : null,
            record: record,
            baseIconCls: me.iconCls,
            iconCls: data.iconCls,
            icon: data.icon,
            checkboxCls: me.checkboxCls,
            checked: data.checked,
            elbowCls: me.elbowCls,
            expanderCls: me.expanderCls,
            textCls: me.textCls,
            leaf: data.leaf,
            expandable: record.isExpandable(),
            isLast: data.isLast,
            blankUrl: Ext.BLANK_IMAGE_URL,
            href: data.href,
            hrefTarget: data.hrefTarget,
            lines: lines,
            metaData: metaData,
            
            childCls: me.getChildCls ? me.getChildCls() + ' ' : '',
            value: renderer ? renderer.apply(me.origScope, arguments) : value
        });
    }
});