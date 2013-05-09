(function(){var t,e,i,r,n,s,o,a,h,u,l,c,p,d,f,g,y,v,m,_,b,w,x,E,k,S,T,$,O,H,A,I,N,P,C,U,j,R=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};k=this,x=k.Backbone,h=[],E=h.push,O=h.slice,A=h.splice,"undefined"!=typeof exports&&null!==exports?t=exports:(k.Backbone={},t=k.Backbone),j=k._,null==j&&"undefined"!=typeof require&&null!==require&&(j=require("underscore")),v={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"},j.extend(t,{VERSION:"1.0.0",$:k.jQuery||k.Zepto||k.ender||k.$,noConflict:function(){return k.Backbone=x,this},emulateHTTP:!1,emulateJSON:!1,ajax:function(){var e;return(e=t.$).ajax.apply(e,arguments)},sync:function(e,i,r){var n,s,o,a;return null==r&&(r={}),o=v[e],j.defaults(r,{emulateHTTP:t.emulateHTTP,emulateJSON:t.emulateJSON}),s={type:o,dataType:"json"},r.url||(s.url=j.result(i,"url")||P()),null!=r.data||!i||"create"!==e&&"update"!==e&&"patch"!==e||(s.contentType="application/json",s.data=JSON.stringify(r.attrs||i.toJSON(r))),r.emulateJSON&&(s.contentType="application/x-www-form-urlencoded",s.data=s.data?{model:s.data}:{}),!r.emulateHTTP||"PUT"!==o&&"DELETE"!==o&&"PATCH"!==o||(s.type="POST",r.emulateJSON&&(s.data._method=o),n=r.beforeSend,r.beforeSend=function(t){return t.setRequestHeader("X-HTTP-Method-Override",o),n?n.apply(this,arguments):void 0}),"GET"===s.type||r.emulateJSON||(s.processData=!1),"PATCH"!==s.type||!window.ActiveXObject||window.external&&window.external.msActiveXFilteringEnabled||(s.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")}),r.xhr=t.ajax(j.extend(s,r)),a=r.xhr,i.trigger("request",i,a,r),a}}),t.Events=function(){function t(){}return t.on=function(t,e,i){var r,n,s,o;return d(this,"on",t,[e,i])&&e?(null==(s=this._events)&&(this._events={}),null==(o=(n=this._events)[t])&&(n[t]=[]),r=this._events[t],r.push({callback:e,context:i,ctx:i||this}),this):this},t.once=function(t,e,i){var r,n;return d(this,"once",t,[e,i])&&e?(n=this,r=j.once(function(){return n.off(t,r),e.apply(this,arguments)}),r._callback=e,this.on(t,r,i)):this},t.off=function(t,e,i){var r,n,s,o,a,h,u,l;if(!this._events||!d(this,"off",t,[e,i]))return this;if(!t&&!e&&!i)return this._events={},this;for(s=t?[t]:j.keys(this._events),a=0,u=s.length;u>a;a++)if(t=s[a],n=this._events[t]){if(o=[],this._events[t]=o,e||i)for(h=0,l=n.length;l>h;h++)r=n[h],(e&&e!==r.callback&&e!==r.callback._callback||i&&i!==r.context)&&o.push(r);o.length||delete this._events[t]}return this},t.trigger=function(t){var e,i,r;return this._events?(i=O.call(arguments,1),d(this,"trigger",t,i)?(r=this._events[t],e=this._events.all,r&&N(r,i),e&&N(e,arguments),this):this):this},t.stopListening=function(t,e,i){var r,n,s,o;if(s=this._listeners,!s)return this;r=!e&&!i,j.isObject(e)&&(i=this),t&&(s={},s[t._listenerId]=t);for(n in s)o=s[n],s[n].off(e,i,this),r&&delete this._listeners[n];return this},t}(),i=t.Events,p=/\s+/,d=function(t,e,i,r){var n,s,o,a,h,u;if(!i)return!0;if(j.isObject(i)){for(s in i)a=i[s],t[e].apply(t,[s,i[s]].concat(r));return!1}if(p.test(i)){for(o=i.split(p),n=h=0,u=o.length;u>=0?u>h:h>u;n=u>=0?++h:--h)t[e].apply(t,[o[n]].concat(r));return!1}return!0},N=function(t,e){var i,r,n,s,o,a,h,u,l,c,p;switch(o=-1,a=t.length,i=e[0],r=e[1],n=e[2],e.length){case 0:for(h=[];a>++o;)s=t[o],h.push(s.callback.call(s.ctx));return h;case 1:for(u=[];a>++o;)s=t[o],u.push(s.callback.call(s.ctx,i));return u;case 2:for(l=[];a>++o;)s=t[o],l.push(s.callback.call(s.ctx,i,r));return l;case 3:for(c=[];a>++o;)s=t[o],c.push(s.callback.call(s.ctx,i,r,n));return c;default:for(p=[];a>++o;)s=t[o],p.push(s.callback.apply(s.ctx,e));return p}},y={listenTo:"on",listenToOnce:"once"},j.each(y,function(t,e){return i[e]=function(e,i,r){var n,s,o,a;return null==(o=this._listeners)&&(this._listeners={}),s=this._listeners,null==(a=e._listenerId)&&(e._listenerId=j.uniqueId("l")),n=e._listenerId,s[n]=e,j.isObject(i)&&(r=this),e[t](i,r,this),this}}),i.bind=i.on,i.unbind=i.off,j.extend(t,i),t.Model=function(){function e(t,e){var i,r;null==e&&(e={}),i=t||{},this.cid=j.uniqueId("c"),this.attributes={},e.collection&&(this.collection=e.collection),e.parse&&(i=this.parse(i,e)||{}),e._attrs=i,r=j.result(this,"defaults"),r&&(i=j.defaults({},i,r)),this.set(i,e),this.changed={},this.initialize.apply(this,arguments)}return j.extend(e.prototype,i),e.prototype.changed=null,e.prototype.validationError=null,e.prototype.idAttribute="id",e.prototype.initialize=function(){},e.prototype.toJSON=function(){return j.clone(this.attributes)},e.prototype.sync=function(){return t.sync.apply(this,arguments)},e.prototype.get=function(t){return this.attributes[t]},e.prototype.escape=function(t){return j.escape(this.get(t))},e.prototype.has=function(t){return null!=this.get(t)},e.prototype.set=function(t,e,i){var r,n,s,o,a,h,u,l,c,p,d,f;if(null==i&&(i={}),null==t)return this;if(j.isObject(t)?(n=t,i=e||{}):(n={},n[t]=e),!this._validate(n,i))return!1;c=i.unset,l=i.silent,o=[],a=this._changing,this._changing=!0,a||(this._previousAttributes=j.clone(this.attributes),this.changed={}),h=this.attributes,u=this._previousAttributes,j.has(n,this.idAttribute)&&(this.id=n[this.idAttribute]);for(r in n)p=n[r],e=n[r],j.isEqual(h[r],e)||o.push(r),j.isEqual(u[r],e)?delete this.changed[r]:this.changed[r]=e,c?delete h[r]:h[r]=e;if(!l)for(o.length&&(this._pending=!0),d=0,f=o.length;f>d;d++)s=o[d],this.trigger("change:"+s,this,h[s],i);if(a)return this;if(!l)for(;this._pending;)this._pending=!1,this.trigger("change",this,i);return this._pending=!1,this._changing=!1,this},e.prototype.unset=function(t,e){return this.set(t,void 0,j.extend({},e,{unset:!0}))},e.prototype.clear=function(t){var e,i,r,n;e={},n=this.attributes;for(i in n)r=n[i],e[i]=void 0;return this.set(e,j.extend({},t,{unset:!0}))},e.prototype.hasChanged=function(t){return null==t?!j.isEmpty(this.changed):j.has(this.changed,t)},e.prototype.changedAttributes=function(t){var e,i,r,n;if(!t)return this.hasChanged()?j.clone(this.changed):!1;i=!1,r=this._changing?this._previousAttributes:this.attributes;for(e in t)n=t[e],j.isEqual(r[e],n)||(i||(i={}),i[e]=n);return i},e.prototype.previous=function(t){return null!=t&&this._previousAttributes?this._previousAttributes[t]:null},e.prototype.previousAttributes=function(){return j.clone(this._previousAttributes)},e.prototype.fetch=function(t){var e,i;return null==t&&(t={}),t=j.clone(t),null==t.parse&&(t.parse=!0),e=this,i=t.success,t.success=function(r){return e.set(e.parse(r,t),t)?(i&&i(e,r,t),e.trigger("sync",e,r,t)):!1},U(this,t),this.sync("read",this,t)},e.prototype.save=function(t,e,i){var r,n,s,o,a,h;if(r=this.attributes,null==t||j.isObject(t)?(n=t,i=e):(n={},n[t]=e),i=j.extend({validate:!0},i),n&&!i.wait){if(!this.set(n,i))return!1}else if(!this._validate(n,i))return!1;return n&&i.wait&&(this.attributes=j.extend({},r,n)),null==i.parse&&(i.parse=!0),o=this,a=i.success,i.success=function(t){var e;return o.attributes=r,e=o.parse(t,i),i.wait&&(e=j.extend(n||{},e)),j.isObject(e)&&!o.set(e,i)?!1:(a&&a(o,t,i),o.trigger("sync",o,t,i))},U(this,i),s=this.isNew()?"create":i.patch?"patch":"update","patch"===s&&(i.attrs=n),h=this.sync(s,this,i),n&&i.wait&&(this.attributes=r),h},e.prototype.destroy=function(t){var e,i,r,n;return null==t&&(t={}),t=j.clone(t),i=this,r=t.success,e=function(){return i.trigger("destroy",i,i.collection,t)},t.success=function(n){return(t.wait||i.isNew())&&e(),r&&r(i,n,t),i.isNew()?void 0:i.trigger("sync",i,n,t)},this.isNew()?(t.success(),!1):(U(this,t),n=this.sync("delete",this,t),t.wait||e(),n)},e.prototype.url=function(){var t;return t=j.result(this,"urlRoot")||j.result(this.collection,"url")||P(),this.isNew()?t:t+("/"===t.charAt(t.length-1)?"":"/")+encodeURIComponent(this.id)},e.prototype.parse=function(t){return t},e.prototype.clone=function(){return new this.constructor(this.attributes)},e.prototype.isNew=function(){return null==this.id},e.prototype.isValid=function(t){return this._validate({},j.extend(t||{},{validate:!0}))},e.prototype._validate=function(t,e){var i;return null==e&&(e={}),e.validate&&this.validate?(t=j.extend({},this.attributes,t),this.validationError=this.validate(t,e)||null,(i=this.validationError)?(this.trigger("invalid",this,i,j.extend(e||{},{validationError:i})),!1):!0):!0},e}(),n=t.Model,_=["keys","values","pairs","invert","pick","omit"],j.each(_,function(t){return n.prototype[t]=function(){var e;return e=O.call(arguments),e.unshift(this.attributes),j[t].apply(j,e)}}),$={add:!0,remove:!0,merge:!0},a={add:!0,merge:!1,remove:!1},t.Collection=function(){function e(t,e){e||(e={}),e.model&&(this.model=e.model),j.isUndefined(e.comparator)||(this.comparator=e.comparator),this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,j.extend({silent:!0},e))}return j.extend(e.prototype,i),e.prototype.model=n,e.prototype.initialize=function(){},e.prototype.toJSON=function(t){return this.map(function(e){return e.toJSON(t)})},e.prototype.sync=function(){return t.sync.apply(this,arguments)},e.prototype.add=function(t,e){return null==e&&(e={}),this.set(t,j.defaults(e,a))},e.prototype.remove=function(t,e){var i,r,n,s,o;for(null==e&&(e={}),t=j.isArray(t)?t.slice():[t],i=s=0,o=t.length;o>=0?o>s:s>o;i=o>=0?++s:--s)n=this.get(t[i]),n&&(delete this._byId[n.id],delete this._byId[n.cid],r=this.indexOf(n),this.models.splice(r,1),this.length--,e.silent||(e.index=r,n.trigger("remove",n,this,e)),this._removeReference(n));return this},e.prototype.set=function(t,e){var i,r,n,s,o,a,h,u,l,c,p,d,f,g,y,v,m,_,b,w,x;for(null==e&&(e={}),e=j.defaults(e,$),e.parse&&(t=this.parse(t,e)),j.isArray(t)||(t=t?[t]:[]),r=e.at,f=this.comparator&&null==r&&e.sort!==!1,d=j.isString(this.comparator)?this.comparator:null,g=[],y=[],u={},i=e.add,a=e.merge,c=e.remove,l=!f&&i&&c?[]:!1,o=v=0,w=t.length;w>=0?w>v:v>w;o=w>=0?++v:--v)n=t[o],h=this._prepareModel(n,e),h&&(s=this.get(h),s?(c&&(u[s.cid]=!0),a&&(n=n===h?h.attributes:e._attrs,s.set(n,e),f&&!p&&s.hasChanged(d)&&(p=!0))):i&&(g.push(h),h.on("all",this._onModelEvent,this),this._byId[h.cid]=h,null!=h.id&&(this._byId[h.id]=h)),l&&l.push(s||h));if(c){for(o=m=0,x=this.length;x>=0?x>m:m>x;o=x>=0?++m:--m)h=this.models[o],u[h.cid]||y.push(h);y.length&&this.remove(y,e)}if((g.length||l&&l.length)&&(f&&(p=!0),this.length+=g.length,null!=r?A.apply(this.models,[r,0].concat(g)):(l&&(this.models.length=0),E.apply(this.models,l||g))),p&&this.sort({silent:!0}),e.silent)return this;for(_=0,b=g.length;b>_;_++)h=g[_],h.trigger("add",h,this,e);return(p||l&&l.length)&&this.trigger("sort",this,e),this},e.prototype.reset=function(t,e){var i,r,n,s;for(null==e&&(e={}),s=this.models,r=0,n=s.length;n>r;r++)i=s[r],this._removeReference(i);return e.previousModels=this.models,this._reset(),this.add(t,j.extend({silent:!0},e)),e.silent||this.trigger("reset",this,e),this},e.prototype.push=function(t,e){return t=this._prepareModel(t,e),this.add(t,j.extend({at:this.length},e)),t},e.prototype.pop=function(t){var e;return e=this.at(this.length-1),this.remove(e,t),e},e.prototype.unshift=function(t,e){return t=this._prepareModel(t,e),this.add(t,j.extend({at:0},e)),t},e.prototype.shift=function(t){var e;return e=this.at(0),this.remove(e,t),e},e.prototype.slice=function(){return O.apply(this.models,arguments)},e.prototype.get=function(t){var e;return null==t?void 0:this._byId[null!=(e=t.id)?e:t.cid||t]},e.prototype.at=function(t){return this.models[t]},e.prototype.where=function(t,e){return j.isEmpty(t)?e?void 0:[]:this[e?"find":"filter"](function(e){var i,r;for(i in t)if(r=t[i],r!==e.get(i))return!1;return!0})},e.prototype.findWhere=function(t){return this.where(t,!0)},e.prototype.sort=function(t){if(null==t&&(t={}),!this.comparator)throw Error("Cannot sort a set without a comparator");return j.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(j.bind(this.comparator,this)),t.silent||this.trigger("sort",this,t),this},e.prototype.sortedIndex=function(t,e,i){var r;return e=e||this.comparator,r=j.isFunction(e)?e:function(t){return t.get(e)},j.sortedIndex(this.models,t,r,i)},e.prototype.pluck=function(t){return j.invoke(this.models,"get",t)},e.prototype.fetch=function(t){var e,i;return null==t&&(t={}),t=j.clone(t),null==t.parse&&(t.parse=!0),i=t.success,e=this,t.success=function(r){var n;return n=t.reset?"reset":"set",e[n](r,t),i&&i(e,r,t),e.trigger("sync",e,r,t)},U(this,t),this.sync("read",this,t)},e.prototype.create=function(t,e){var i,r;return null==e&&(e={}),e=j.clone(e),(t=this._prepareModel(t,e))?(e.wait||this.add(t,e),i=this,r=e.success,e.success=function(n){return e.wait&&i.add(t,e),r?r(t,n,e):void 0},t.save(null,e),t):!1},e.prototype.parse=function(t){return t},e.prototype.clone=function(){return new this.constructor(this.models)},e.prototype._reset=function(){return this.length=0,this.models=[],this._byId={}},e.prototype._prepareModel=function(t,e){var i;return null==e&&(e={}),t instanceof n?(t.collection||(t.collection=this),t):(e.collection=this,i=new this.model(t,e),i._validate(t,e)?i:(this.trigger("invalid",this,t,e),!1))},e.prototype._removeReference=function(t){return this===t.collection&&delete t.collection,t.off("all",this._onModelEvent,this)},e.prototype._onModelEvent=function(t,e,i,r){return"add"!==t&&"remove"!==t||i===this?("destroy"===t&&this.remove(e,r),e&&t==="change:"+e.idAttribute&&(delete this._byId[e.previous(e.idAttribute)],null!=e.id&&(this._byId[e.id]=e)),this.trigger.apply(this,arguments)):void 0},e}(),e=t.Collection,m=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","indexOf","shuffle","lastIndexOf","isEmpty","chain"],j.each(m,function(t){return e.prototype[t]=function(){var e;return e=O.call(arguments),e.unshift(this.models),j[t].apply(j,e)}}),u=["groupBy","countBy","sortBy"],j.each(u,function(t){return e.prototype[t]=function(e,i){var r;return r=j.isFunction(e)?e:function(t){return t.get(e)},j[t](this.models,r,i)}}),l=/^(\S+)\s*(.*)$/,C=["model","collection","el","id","attributes","className","tagName","events"],t.View=function(){function e(t){null==t&&(t={}),this.cid=j.uniqueId("view"),j.extend(this,j.pick(t,C)),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()}return j.extend(e.prototype,i),e.prototype.tagName="div",e.prototype.$=function(t){return this.$el.find(t)},e.prototype.initialize=function(){},e.prototype.render=function(){return this},e.prototype.remove=function(){return this.$el.remove(),this.stopListening(),this},e.prototype.setElement=function(e,i){return this.$el&&this.undelegateEvents(),this.$el=e instanceof t.$?e:t.$(e),this.el=this.$el[0],i!==!1&&this.delegateEvents(),this},e.prototype.delegateEvents=function(t){var e,i,r,n,s;if(t=t||j.result(this,"events"),!t)return this;this.undelegateEvents();for(i in t)n=t[i],j.isFunction(n)||(n=this[t[i]]),n&&(r=i.match(l),e=r[1],s=r[2],n=j.bind(n,this),e+=".delegateEvents"+this.cid,""===s?this.$el.on(e,n):this.$el.on(e,s,n));return this},e.prototype.undelegateEvents=function(){return this.$el.off(".delegateEvents"+this.cid),this},e.prototype._ensureElement=function(){var e,i;return this.el?this.setElement(j.result(this,"el"),!1):(i=j.extend({},j.result(this,"attributes")),this.id&&(i.id=j.result(this,"id")),this.className&&(i["class"]=j.result(this,"className")),e=t.$("<"+j.result(this,"tagName")+">").attr(i),this.setElement(e,!1))},e}(),o=t.View,w=/\((.*?)\)/g,b=/(\(\?)?:\w+/g,H=/\*\w+/g,c=/[\-{}\[\]+?.,\\\^$|#\s]/g,t.Router=function(){function e(t){null==t&&(t={}),t.routes&&(this.routes=t.routes),this._bindRoutes(),this.initialize.apply(this,arguments)}return j.extend(e.prototype,i),e.prototype.initialize=function(){},e.prototype.route=function(e,i,r){var n;return j.isRegExp(e)||(e=this._routeToRegExp(e)),j.isFunction(i)&&(r=i,i=""),r||(r=this[i]),n=this,t.history.route(e,function(s){var o;return o=n._extractParameters(e,s),null!=r&&r.apply(n,o),n.trigger.apply(n,["route:"+i].concat(o)),n.trigger("route",i,o),t.history.trigger("route",n,i,o)}),this},e.prototype.navigate=function(e,i){return t.history.navigate(e,i),this},e.prototype._bindRoutes=function(){var t,e,i;if(this.routes){for(this.routes=j.result(this,"routes"),e=j.keys(this.routes),t=e.pop(),i=[];null!=t;)this.route(t,this.routes[t]),i.push(t=e.pop());return i}},e.prototype._routeToRegExp=function(t){return t=t.replace(c,"\\$&").replace(w,"(?:$1)?").replace(b,function(t,e){return e?t:"([^/]+)"}).replace(H,"(.*?)"),RegExp("^"+t+"$")},e.prototype._extractParameters=function(t,e){var i;return i=t.exec(e).slice(1),j.map(i,function(t){return t?decodeURIComponent(t):null})},e}(),s=t.Router,T=/^[#\/]|\s+$/g,S=/^\/+|\/+$/g,g=/msie [\w.]+/,I=/\/$/,t.History=function(){function e(){this.handlers=[],j.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)}return j.extend(e.prototype,i),e.started=!1,e.prototype.interval=50,e.prototype.getHash=function(t){var e;return e=(t||this).location.href.match(/#(.*)$/),e?e[1]:""},e.prototype.getFragment=function(t,e){return null==t&&(this._hasPushState||!this._wantsHashChange||e?(t=this.location.pathname,k=this.root.replace(I,""),t.indexOf(k)||(t=t.substr(k.length))):t=this.getHash()),t.replace(T,"")},e.prototype.start=function(i){var r,n,s,o,a;if(e.started)throw Error("Backbone.history has already been started");return e.started=!0,this.options=j.extend({},{root:"/"},this.options,i),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState),s=this.getFragment(),n=document.documentMode,a=g.exec(navigator.userAgent.toLowerCase())&&(!n||7>=n),this.root=("/"+this.root+"/").replace(S,"/"),a&&this._wantsHashChange&&(this.iframe=t.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(s)),this._hasPushState?t.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&R.call(window,"onhashchange")>=0&&!a?t.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=s,o=this.location,r=o.pathname.replace(/[^\/]$/,"$&/")===this.root,this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!r?(this.fragment=this.getFragment(null,!0),this.location.replace(this.root+this.location.search+"#"+this.fragment),!0):(this._wantsPushState&&this._hasPushState&&r&&o.hash&&(this.fragment=this.getHash().replace(T,""),this.history.replaceState({},document.title,this.root+this.fragment+o.search)),this.options.silent?void 0:this.loadUrl())},e.prototype.stop=function(){return t.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),e.started=!1},e.prototype.route=function(t,e){return this.handlers.unshift({route:t,callback:e})},e.prototype.checkUrl=function(){var t;return t=this.getFragment(),t===this.fragment&&this.iframe&&(t=this.getFragment(this.getHash(this.iframe))),t===this.fragment?!1:(this.iframe&&this.navigate(t),this.loadUrl()||this.loadUrl(this.getHash()))},e.prototype.loadUrl=function(t){var e,i;return this.fragment=this.getFragment(t),e=this.fragment,i=j.any(this.handlers,function(t){return t.route.test(e)?(t.callback(e),!0):void 0})},e.prototype.navigate=function(t,i){var r;if(!e.started)return!1;if(i&&i!==!0||(i={trigger:i}),t=this.getFragment(t||""),this.fragment!==t){if(this.fragment=t,r=this.root+t,this._hasPushState)this.history[i.replace?"replaceState":"pushState"]({},document.title,r);else{if(!this._wantsHashChange)return this.location.assign(r);this._updateHash(this.location,t,i.replace),this.iframe&&t!==this.getFragment(this.getHash(this.iframe))&&(i.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,t,i.replace))}return i.trigger?this.loadUrl(t):void 0}},e.prototype._updateHash=function(t,e,i){var r;return i?(r=t.href.replace(/(javascript:|#).*$/,""),t.replace(r+"#"+e)):t.hash="#"+e},e}(),r=t.History,t.history=new r,f=function(t,e){var i,r,n;return n=this,r=t&&j.has(t,"constructor")?t.constructor:function(){return n.apply(this,arguments)},j.extend(r,n,e),i=function(){function t(){this.constructor=r}return t}(),i.prototype=n.prototype,r.prototype=new i,t&&j.extend(r.prototype,t),r.__super__=n.prototype,r},n.extend=e.extend=s.extend=o.extend=r.extend=f,P=function(){throw Error('A "url" property or function must be specified')},U=function(t,e){var i;return i=e.error,e.error=function(r){return i&&i(t,r,e),t.trigger("error",t,r,e)}}}).call(this);
//@ sourceMappingURL=backbone-min.map