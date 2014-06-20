Ext.define("Ext.rtl.util.Renderable",{override:"Ext.util.Renderable",_rtlCls:Ext.baseCSSPrefix+"rtl",_ltrCls:Ext.baseCSSPrefix+"ltr",rtlFrameTableTpl:["{%this.renderDockedItems(out,values,0);%}",'<table class="',Ext.plainTableCls,'" cellpadding="0"><tbody>','<tpl if="top">',"<tr>",'<tpl if="right"><td id="{fgid}TR" class="{frameCls}-tr {baseCls}-tr {baseCls}-{ui}-tr<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tr</tpl>{frameElCls}" role="presentation"></td></tpl>','<td id="{fgid}TC" class="{frameCls}-tc {baseCls}-tc {baseCls}-{ui}-tc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tc</tpl>{frameElCls}" role="presentation"></td>','<tpl if="left"><td id="{fgid}TL" class="{frameCls}-tl {baseCls}-tl {baseCls}-{ui}-tl<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tl</tpl>{frameElCls}" role="presentation"></td></tpl>',"</tr>","</tpl>","<tr>",'<tpl if="right"><td id="{fgid}MR" class="{frameCls}-mr {baseCls}-mr {baseCls}-{ui}-mr<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-mr</tpl>{frameElCls}" role="presentation"></td></tpl>','<td id="{fgid}MC" class="{frameCls}-mc {baseCls}-mc {baseCls}-{ui}-mc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-mc</tpl>{frameElCls}" role="presentation">',"{%this.applyRenderTpl(out, values)%}","</td>",'<tpl if="left"><td id="{fgid}ML" class="{frameCls}-ml {baseCls}-ml {baseCls}-{ui}-ml<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-ml</tpl>{frameElCls}" role="presentation"></td></tpl>',"</tr>",'<tpl if="bottom">',"<tr>",'<tpl if="right"><td id="{fgid}BR" class="{frameCls}-br {baseCls}-br {baseCls}-{ui}-br<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-br</tpl>{frameElCls}" role="presentation"></td></tpl>','<td id="{fgid}BC" class="{frameCls}-bc {baseCls}-bc {baseCls}-{ui}-bc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-bc</tpl>{frameElCls}" role="presentation"></td>','<tpl if="left"><td id="{fgid}BL" class="{frameCls}-bl {baseCls}-bl {baseCls}-{ui}-bl<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-bl</tpl>{frameElCls}" role="presentation"></td></tpl>',"</tr>","</tpl>","</tbody></table>","{%this.renderDockedItems(out,values,1);%}"],beforeRender:function(){var a=this.getHierarchyState().rtl;if(a){this.addCls(this._rtlCls)}else{if(a===false){this.addCls(this._ltrCls)}}this.callParent()},getFrameTpl:function(a){return(a&&this.getHierarchyState().rtl)?this.getTpl("rtlFrameTableTpl"):this.callParent(arguments)},initRenderData:function(){var b=this,c=b.callParent(),a=b._rtlCls;if(a&&b.getHierarchyState().rtl){c.childElCls=" "+a}return c},getFrameRenderData:function(){var b=this,c=b.callParent(),a=b._rtlCls;if(a&&b.getHierarchyState().rtl){c.frameElCls=" "+a}return c}});