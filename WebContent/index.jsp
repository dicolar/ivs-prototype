<%@page import="cn.incontent.cda.client.entry.RepoUser"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<%@ include file="scripts/environment.jsp" %>
<%@ include file="scripts/extjs.jsp" %>
<%@ include file="scripts/jquery.jsp" %>

<link rel="icon" href="${basePath }images/favicon.ico" type="image/x-icon" />
<%
	RepoUser user = (RepoUser) session.getAttribute("_USER");
%>
<script>
var loginUserName = '<%=user.getFirstName() + " " + user.getLastName() %>';
var userLoginId = '<%=user.getUserLoginId() %>';
</script>

<script type="text/javascript" src="${basePath}scripts/utils.js"></script>
<script type="text/javascript" src="${basePath}jslib/ivs/view-presenter.js"></script>
<script type="text/javascript" src="${basePath}jslib/jquery/extends/jquery-hashchange.js"></script>

<script type="text/javascript" src="${basePath}jslib/jquery/extends/jquery-noty.js"></script>
<script type="text/javascript" src="${basePath}jslib/jquery/extends/jquery-tipsy.js"></script>
<script type="text/javascript" src="${basePath}jslib/nprogress/nprogress.js"></script>

<script>
var JSLIB = ['index'];
var CSSLIB = ['css/application', 'css/octicon', 'css/tipsy', 'css/nprogress'];

Ext.Loader.setPath('cn', base + 'base/custom');
</script>
<%@ include file="scripts/preload.jsp" %>
<title></title>
</head>
<body style='background-color:#F9F9F9;'>
</body>
</html>