Ext.define("Ext.grid.column.Number",{extend:"Ext.grid.column.Column",alias:["widget.numbercolumn"],requires:["Ext.util.Format"],alternateClassName:"Ext.grid.NumberColumn",format:"0,000.00",defaultRenderer:function(a){return Ext.util.Format.number(a,this.format)}});