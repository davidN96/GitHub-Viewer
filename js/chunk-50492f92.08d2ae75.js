(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-50492f92"],{"0747":function(e,t,r){},b34a:function(e,t,r){"use strict";r("0747")},e9a0:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"searchResultsWrapper"},[e.error.isActive?r("ErrorModal",{attrs:{title:e.error.title,message:e.error.message,redirectTo:e.error.redirection}}):e._e(),r("Loader",{attrs:{isActive:e.data.isFetching}}),r("div",{staticClass:"list",class:{fadedIn:!e.data.isFetching,fadedOut:e.data.isFetching}},[r("SearchFilters",{attrs:{perPageOptions:e.searchFilterControl.perPageOptions,sortOptions:e.searchFilterControl.sortOptions,orderOptions:e.searchFilterControl.orderOptions,results:e.data.resultsCount,sort:e.searchFilters.sort,order:e.searchFilters.order,perPage:e.searchFilters.perPage},on:{filtersChange:e.handleFiltersChange}}),r("ResultsCounter",{attrs:{results:e.data.resultsCount,page:e.searchPageControl.page,maxPage:e.searchPageControl.maxPage}}),e._l(e.data.results,(function(t){return r("ItemTile",{key:t.node_id,attrs:{item:t,type:e.mode}})})),r("Paginator",{attrs:{page:e.searchPageControl.page,maxPage:e.searchPageControl.maxPage},on:{pageChange:e.handlePageChange}})],2)],1)},s=[],n=r("5530"),o=r("1da1"),i=r("d4ec"),c=r("bee2"),u=r("262e"),h=r("2caf"),l=(r("96cf"),r("841c"),r("ac1f"),r("9ab4")),g=r("1b40"),p=function(e){return setTimeout((function(){return window.scrollTo(0,0)}),e)},d=r("04a9"),f=r("1af4"),m=r("c786"),P=r("c5fa"),v=r("09bf"),C=function(e){Object(u["a"])(r,e);var t=Object(h["a"])(r);function r(){var e,a;return Object(i["a"])(this,r),a=t.apply(this,arguments),a.mode=a.$route.params.mode,a.keyword=a.$route.params.keyword,a.error={isActive:!1,title:"Sorry",message:"Error ocurred",redirection:""},a.data={results:[],resultsCount:0,isFetching:!0},a.searchPageControl={page:parseInt(a.$route.params.page),maxPage:1},a.searchFilterControl={sortOptions:a.mode===d["a"].user?d["h"]:d["f"],perPageOptions:d["e"],orderOptions:d["d"]},a.searchFilters={perPage:d["e"][0],sort:null!==(e=a.searchFilterControl.sortOptions)&&void 0!==e&&e.length?a.searchFilterControl.sortOptions[0]:null,order:f["a"].desc},a}return Object(c["a"])(r,[{key:"handlePageChange",value:function(e){this.searchPageControl.page=e}},{key:"searchCount",get:function(){return this.$store.state.requests.search.count}},{key:"profileCount",get:function(){return this.$store.state.requests.profile.count}},{key:"decrementRequestCount",value:function(){this.$store.commit("decrementRequestCount",{type:"search",quantity:1})}},{key:"showLoader",value:function(){this.data.isFetching=!0}},{key:"hideLoader",value:function(){var e=this;setTimeout((function(){return e.data.isFetching=!1}),300)}},{key:"showError",value:function(e,t){this.error={title:e,message:t,isActive:!0,redirection:"/"}}},{key:"searchUser",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=Object(n["a"])({q:this.keyword,page:this.searchPageControl.page},this.searchFilters),e.next=3,v["a"].findUser(t);case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"searchRepository",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=Object(n["a"])({q:this.keyword,page:this.searchPageControl.page},this.searchFilters),e.next=3,v["a"].findRepository(t);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"handleRequestFinish",value:function(){this.decrementRequestCount(),this.hideLoader()}},{key:"handleSearch",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.data.isFetching=!0,e.prev=1,this.mode!==d["a"].user){e.next=8;break}return e.next=5,this.searchUser();case 5:e.t0=e.sent,e.next=11;break;case 8:return e.next=10,this.searchRepository();case 10:e.t0=e.sent;case 11:t=e.t0,this.data.resultsCount=m["b"](t.total_count,1e3),this.data.results=t.items,this.searchPageControl.maxPage=m["a"](this.data.resultsCount,this.searchFilters.perPage),0===t.total_count&&this.showError("Sorry","No results found"),e.next=21;break;case 18:e.prev=18,e.t1=e["catch"](1),403===(null===e.t1||void 0===e.t1?void 0:e.t1.status)?this.showError("Sorry","API limit exceeded"):this.showError("Sorry","API error ocurred. Please refresh page");case 21:return e.prev=21,this.handleRequestFinish(),e.finish(21);case 24:case"end":return e.stop()}}),e,this,[[1,18,21,24]])})));function t(){return e.apply(this,arguments)}return t}()},{key:"recalculatePages",value:function(){this.searchPageControl.maxPage=m["a"](this.data.resultsCount,this.searchFilters.perPage),this.searchPageControl.page>this.searchPageControl.maxPage&&(this.searchPageControl.page=this.searchPageControl.maxPage)}},{key:"changePage",value:function(){this.$router.push({params:Object(n["a"])(Object(n["a"])({},this.$route.params),{},{page:"".concat(this.searchPageControl.page)})}),p(250)}},{key:"handleFiltersChange",value:function(e){this.searchFilters=e}},{key:"handlPageChange",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.handleSearch(),this.changePage();case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"handlePerPageChange",value:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.recalculatePages(),this.handleSearch();case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"mounted",value:function(){this.handleSearch()}}]),r}(g["c"]);Object(l["a"])([Object(g["d"])("searchPageControl.page")],C.prototype,"handlPageChange",null),Object(l["a"])([Object(g["d"])("searchFilters",{deep:!0})],C.prototype,"handlePerPageChange",null),C=Object(l["a"])([Object(g["a"])({components:{ItemTile:P["a"]}})],C);var y=C,b=y,k=(r("b34a"),r("2877")),w=Object(k["a"])(b,a,s,!1,null,"5cc88d88",null);t["default"]=w.exports}}]);
//# sourceMappingURL=chunk-50492f92.08d2ae75.js.map