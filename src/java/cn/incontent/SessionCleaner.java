package cn.incontent;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import cn.incontent.i18n.utils.PathUtils;

/**
 *@author Val.(Valentine Vincent) E-mail:valer@126.com
 *@version 1.0
 *@date 2013-12-26
 *Instruction : 
 **/
public class SessionCleaner {

	public static void clearSession(HttpServletRequest request) {
		HttpSession session = request.getSession();
		@SuppressWarnings("unchecked")
		Enumeration<String> keys = session.getAttributeNames();

		while (keys.hasMoreElements()) {
			String key = keys.nextElement();
			if (key.equals(SystemConstants.LOCALE)) {
				continue;
			}

			session.removeAttribute(key);
		}
	}
	
	public static void main(String[] args) throws UnsupportedEncodingException {
		
		System.out.println(PathUtils.getClassPath());
	}
	
}
