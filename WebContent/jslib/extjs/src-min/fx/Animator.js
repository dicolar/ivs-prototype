Ext.define("Ext.fx.Animator",{mixins:{observable:"Ext.util.Observable"},requires:["Ext.fx.Manager"],isAnimator:true,duration:250,delay:0,delayStart:0,dynamic:false,easing:"ease",running:false,paused:false,damper:1,iterations:1,currentIteration:0,keyframeStep:0,animKeyFramesRE:/^(from|to|\d+%?)$/,constructor:function(a){var b=this;a=Ext.apply(b,a||{});b.config=a;b.id=Ext.id(null,"ext-animator-");b.addEvents("beforeanimate","keyframe","afteranimate");b.mixins.observable.constructor.call(b,a);b.timeline=[];b.createTimeline(b.keyframes);if(b.target){b.applyAnimator(b.target);Ext.fx.Manager.addAnim(b)}},sorter:function(d,c){return d.pct-c.pct},createTimeline:function(d){var g=this,k=[],h=g.to||{},b=g.duration,l,a,c,f,j,e;for(j in d){if(d.hasOwnProperty(j)&&g.animKeyFramesRE.test(j)){e={attrs:Ext.apply(d[j],h)};if(j=="from"){j=0}else{if(j=="to"){j=100}}e.pct=parseInt(j,10);k.push(e)}}Ext.Array.sort(k,g.sorter);f=k.length;for(c=0;c<f;c++){l=(k[c-1])?b*(k[c-1].pct/100):0;a=b*(k[c].pct/100);g.timeline.push({duration:a-l,attrs:k[c].attrs})}},applyAnimator:function(d){var g=this,h=[],k=g.timeline,f=k.length,b,e,a,j,c;if(g.fireEvent("beforeanimate",g)!==false){for(c=0;c<f;c++){b=k[c];j=b.attrs;e=j.easing||g.easing;a=j.damper||g.damper;delete j.easing;delete j.damper;b=new Ext.fx.Anim({target:d,easing:e,damper:a,duration:b.duration,paused:true,to:j});h.push(b)}g.animations=h;g.target=b.target;for(c=0;c<f-1;c++){b=h[c];b.nextAnim=h[c+1];b.on("afteranimate",function(){this.nextAnim.paused=false});b.on("afteranimate",function(){this.fireEvent("keyframe",this,++this.keyframeStep)},g)}h[f-1].on("afteranimate",function(){this.lastFrame()},g)}},start:function(d){var e=this,c=e.delay,b=e.delayStart,a;if(c){if(!b){e.delayStart=d;return}else{a=d-b;if(a<c){return}else{d=new Date(b.getTime()+c)}}}if(e.fireEvent("beforeanimate",e)!==false){e.startTime=d;e.running=true;e.animations[e.keyframeStep].paused=false}},lastFrame:function(){var c=this,a=c.iterations,b=c.currentIteration;b++;if(b<a){c.startTime=new Date();c.currentIteration=b;c.keyframeStep=0;c.applyAnimator(c.target);c.animations[c.keyframeStep].paused=false}else{c.currentIteration=0;c.end()}},end:function(){var a=this;a.fireEvent("afteranimate",a,a.startTime,new Date()-a.startTime)},isReady:function(){return this.paused===false&&this.running===false&&this.iterations>0},isRunning:function(){return false}});