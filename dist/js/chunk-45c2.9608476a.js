(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45c2"],{"10cd":function(t,a,s){},"187d":function(t,a,s){"use strict";var e=s("10cd"),o=s.n(e);o.a},"98db":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("go-back"),s("div",{staticClass:"details"},[s("h3",[t._v(" "+t._s(t.params.title))]),s("p",{staticClass:"update"},[s("span",[t._v(t._s(t._f("dateFilter")(t.params.updateAt)))]),s("span",[t._v(t._s(t.params.writer))])]),s("p",{staticClass:"content",domProps:{innerHTML:t._s(t.params.content)}}),s("my-collection",{attrs:{list:t.list,"is-love":t.isLove,"is-collect":t.isCollect,types:10}})],1)],1)},o=[],i=s("bbc2"),l={name:"articleDetails",components:{},data:function(){return{params:"",getParams:{rid:this.$route.query.id},isCollect:"",solidThumbs:"fa-thumbs-up",hollowThumbs:"fa-thumbs-o-up",isLove:"",solidStar:"fa-star",hollowStar:"fa-star-o",list:""}},created:function(){var t=this,a=console,s=a.log;this.$http.get(i["a"].articleDetails+this.$root.userID,{params:this.getParams}).then(function(a){s(a.data),t.params=a.data.data,t.isCollect=a.data.userCollection,t.isLove=a.data.userLove,t.list={love:t.params.love,collection:t.params.collection}},function(t){s(t)})}},c=l,n=(s("187d"),s("2877")),r=Object(n["a"])(c,e,o,!1,null,"054cb68e",null);a["default"]=r.exports}}]);