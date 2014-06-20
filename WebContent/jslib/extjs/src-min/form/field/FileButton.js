Ext.define("Ext.form.field.FileButton",{extend:"Ext.button.Button",alias:"widget.filebutton",childEls:["btnEl","btnWrap","btnInnerEl","btnIconEl","fileInputEl"],inputCls:Ext.baseCSSPrefix+"form-file-input",cls:Ext.baseCSSPrefix+"form-file-btn",preventDefault:false,renderTpl:['<span id="{id}-btnWrap" class="{baseCls}-wrap','<tpl if="splitCls"> {splitCls}</tpl>','{childElCls}" unselectable="on">','<span id="{id}-btnEl" class="{baseCls}-button">','<span id="{id}-btnInnerEl" class="{baseCls}-inner {innerCls}','{childElCls}" unselectable="on">',"{text}","</span>",'<span role="img" id="{id}-btnIconEl" class="{baseCls}-icon-el {iconCls}','{childElCls} {glyphCls}" unselectable="on" style="','<tpl if="iconUrl">background-image:url({iconUrl});</tpl>','<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">','<tpl if="glyph">&#{glyph};</tpl><tpl if="iconCls || iconUrl">&#160;</tpl>',"</span>","</span>","</span>",'<input id="{id}-fileInputEl" class="{childElCls} {inputCls}" type="file" size="1" name="{inputName}">'],getTemplateArgs:function(){var a=this.callParent();a.inputCls=this.inputCls;a.inputName=this.inputName;return a},afterRender:function(){var a=this;a.callParent(arguments);a.fileInputEl.on("change",a.fireChange,a)},fireChange:function(a){this.fireEvent("change",this,a,this.fileInputEl.dom.value)},createFileInput:function(a){var b=this;b.fileInputEl=b.el.createChild({name:b.inputName,id:!a?b.id+"-fileInputEl":undefined,cls:b.inputCls,tag:"input",type:"file",size:1});b.fileInputEl.on("change",b.fireChange,b)},reset:function(a){if(a){this.fileInputEl.remove()}this.createFileInput(!a)},restoreInput:function(a){this.fileInputEl.remove();a=Ext.get(a);this.el.appendChild(a);this.fileInputEl=a},onDisable:function(){this.callParent();this.fileInputEl.dom.disabled=true},onEnable:function(){this.callParent();this.fileInputEl.dom.disabled=false}});