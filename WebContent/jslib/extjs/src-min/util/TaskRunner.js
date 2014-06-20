Ext.define("Ext.util.TaskRunner",{interval:10,timerId:null,constructor:function(a){var b=this;if(typeof a=="number"){b.interval=a}else{if(a){Ext.apply(b,a)}}b.tasks=[];b.timerFn=Ext.Function.bind(b.onTick,b)},newTask:function(b){var a=new Ext.util.TaskRunner.Task(b);a.manager=this;return a},start:function(a){var c=this,b=Ext.Date.now();if(!a.pending){c.tasks.push(a);a.pending=true}a.stopped=false;a.taskStartTime=b;a.taskRunTime=a.fireOnStart!==false?0:a.taskStartTime;a.taskRunCount=0;if(!c.firing){if(a.fireOnStart!==false){c.startTimer(0,b)}else{c.startTimer(a.interval,b)}}return a},stop:function(a){if(!a.stopped){a.stopped=true;if(a.onStop){a.onStop.call(a.scope||a,a)}}return a},stopAll:function(){Ext.each(this.tasks,this.stop,this)},firing:false,nextExpires:1e+99,onTick:function(){var l=this,e=l.tasks,a=Ext.Date.now(),m=1e+99,j=e.length,c,n,g,b,d,f;l.timerId=null;l.firing=true;for(g=0;g<j||g<(j=e.length);++g){b=e[g];if(!(f=b.stopped)){c=b.taskRunTime+b.interval;if(c<=a){d=1;try{d=b.run.apply(b.scope||b,b.args||[++b.taskRunCount])}catch(h){try{Ext.log({msg:h,level:"error"});if(b.onError){d=b.onError.call(b.scope||b,b,h)}}catch(k){}}b.taskRunTime=a;if(d===false||b.taskRunCount===b.repeat){l.stop(b);f=true}else{f=b.stopped;c=a+b.interval}}if(!f&&b.duration&&b.duration<=(a-b.taskStartTime)){l.stop(b);f=true}}if(f){b.pending=false;if(!n){n=e.slice(0,g)}}else{if(n){n.push(b)}if(m>c){m=c}}}if(n){l.tasks=n}l.firing=false;if(l.tasks.length){l.startTimer(m-a,Ext.Date.now())}if(l.fireIdleEvent!==false){Ext.EventManager.idleEvent.fire()}},startTimer:function(e,c){var d=this,b=c+e,a=d.timerId;if(a&&d.nextExpires-b>d.interval){clearTimeout(a);a=null}if(!a){if(e<d.interval){e=d.interval}d.timerId=setTimeout(d.timerFn,e);d.nextExpires=b}}},function(){var b=this,a=b.prototype;a.destroy=a.stopAll;Ext.util.TaskManager=Ext.TaskManager=new b();b.Task=new Ext.Class({isTask:true,stopped:true,fireOnStart:false,constructor:function(c){Ext.apply(this,c)},restart:function(c){if(c!==undefined){this.interval=c}this.manager.start(this)},start:function(c){if(this.stopped){this.restart(c)}},stop:function(){this.manager.stop(this)}});a=b.Task.prototype;a.destroy=a.stop});