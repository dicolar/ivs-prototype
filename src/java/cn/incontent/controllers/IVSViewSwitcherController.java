package cn.incontent.controllers;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import cn.incontent.SystemConstants;
import cn.incontent.ivsframework.ViewGenerator;

/**
 *@author Val.(Valentine Vincent) E-mail:valer@126.com
 *@version 1.0
 *@date 2013-12-25
 *Instruction : 
 **/
@Controller
public class IVSViewSwitcherController {
	
	private static final long serialVersionUID = 1L;
	
	@RequestMapping("IVS/getView/{viewName}/")
	public ModelAndView getView(HttpServletRequest request, HttpServletResponse response, @PathVariable("viewName") String viewName) throws Exception {
		response.setContentType("application/x-javascript");
		
		ViewGenerator.outputViewFile(viewName, response.getOutputStream(), (Locale) request.getSession().getAttribute(SystemConstants.LOCALE));
		
		return null;
	}
	
}