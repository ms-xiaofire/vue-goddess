(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ffa"],{2369:function(t,s,e){"use strict";var i=e("8bb2"),o=e.n(i);o.a},"8bb2":function(t,s,e){},da29:function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("go-back"),e("div",{staticClass:"detailsBox"},[e("div",{staticClass:"title"},[e("img",{staticClass:"title-left",attrs:{src:t.videos.photo}}),e("div",{staticClass:"title-right"},[e("h3",[t._v(t._s(t.videos.title))]),e("div",[e("span",{staticClass:"times"},[t._v(t._s(t._f("dateFilter")(t.videos.updateAt)))]),e("span",{staticClass:"name"},[t._v(t._s(t.videos.name))])])])]),e("p",{staticClass:"intros"},[t._v(t._s(t.videos.intro))]),e("my-video",{attrs:{"prop-b":t.videos,titles:t.videos.title}}),e("div",{staticClass:"contents",domProps:{innerHTML:t._s(t.videos.content)}},[t._v(t._s(t.videos.content))]),e("my-collection",{attrs:{list:t.list,"is-love":t.isLove,types:20,"is-collect":t.isCollect}})],1)],1)},o=[],a=e("bbc2"),l=e("5710"),n={name:"videoDetails",components:{MyCollection:l["default"]},data:function(){return{videos:"",userID:this.$root.userID,type:20,rid:this.$route.query.id,isLove:"",isCollect:"",list:"",types:""}},created:function(){var t=this,s=console,e=s.log;this.$http.get(a["a"].videoDetails+this.userID,{params:{rid:this.rid}}).then(function(s){t.videos=s.data.data,t.isLove=s.data.userLove,t.isCollect=s.data.userCollection,t.list={love:t.videos.love,collection:t.videos.collection},e(s),e(t.loveStatus)},function(t){e(t)})},methods:{postLove:function(t){var s=console,e=s.log;this.$http.post(a["a"].love+this.$root.userID,{rid:this.$route.query.id,type:20,status:t}).then(function(t){e(t)},function(t){e(t)})}}},c=n,d=(e("2369"),e("2877")),r=Object(d["a"])(c,i,o,!1,null,null,null);s["default"]=r.exports}}]);