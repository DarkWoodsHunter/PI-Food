(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{42:function(e,t,n){},43:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var c=n(2),r=n.n(c),a=n(22),i=n.n(a),l=(n(42),n(43),n(13)),s=n(6),j=n(0);function o(){return Object(j.jsxs)("div",{className:"landing",children:[Object(j.jsx)("h1",{children:"PI FOOD"}),Object(j.jsx)(l.b,{to:"/home",children:Object(j.jsx)("button",{children:"Click to Home"})})]})}var u=n(9);function d(e){var t=e.id,n=e.image,c=e.name,r=e.healthScore,a=e.diets;return Object(j.jsx)("div",{children:Object(j.jsx)("link",{to:"/home/".concat(t),children:Object(j.jsxs)("div",{children:[Object(j.jsx)("img",{src:n,alt:"Receta",width:"300px"}),Object(j.jsx)("h3",{children:c}),Object(j.jsx)("div",{children:Object(j.jsxs)("label",{children:["HealthScore: ",Object(j.jsx)("span",{children:r})]})}),Object(j.jsx)("label",{children:"Diets: "}),null===a||void 0===a?void 0:a.map((function(e){return Object(j.jsx)("p",{children:e.charAt(0).toUpperCase()+e.slice(1)},e)}))]})})})}var b=n(12),p=n(17),h=n(59);var O=n(15);function v(){var e=Object(O.c)(),t=Object(c.useState)(""),n=Object(u.a)(t,2),r=n[0],a=n[1],i=function(t){var n;t.preventDefault(),e((n=r,function(){var e=Object(p.a)(Object(b.a)().mark((function e(t){var c;return Object(b.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.a.get("/recipes/?name=".concat(n));case 3:return c=e.sent,e.abrupt("return",t({type:"GET_RECIPE_BY_NAME",payload:c.data}));case 7:e.prev=7,e.t0=e.catch(0),alert("No se encuentra la receta");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}())),a("")};return Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{children:Object(j.jsx)("h1",{children:"PI FOOD"})}),Object(j.jsxs)("div",{children:[Object(j.jsx)("input",{type:"text",placeholder:"Buscar por nombre...",value:r,onChange:function(e){return function(e){e.preventDefault(),a(e.target.value)}(e)}}),Object(j.jsx)("button",{type:"submit",onClick:function(e){return i(e)},children:"Buscar"})]})]})}function x(e){for(var t=e.recipesPage,n=e.allRecipes,r=e.paged,a=e.setPage,i=e.page,l=Object(u.a)(c.useState,2),s=l[0],o=l[1],d=[],b=1;b<=Math.ceil(n/t);b++)d.push(b);return Object(j.jsxs)("div",{children:[Object(j.jsx)("button",{onClick:(o(parseInt(s)-1),void a(parseInt(s)-1)),disabled:i<=1,children:" \u2b9c "}),Object(j.jsx)("nav",{children:Object(j.jsx)("ul",{children:null===d||void 0===d?void 0:d.map((function(e){return Object(j.jsx)("li",{children:Object(j.jsx)("button",{onClick:function(){return t=e,o(parseInt(t)),void r(t);var t},children:e})},e)}))})}),Object(j.jsx)("button",{onClick:(o(parseInt(s)+1),void a(parseInt(s)+1)),disabled:d===d.length,children:" \u2b9e "})]})}var f=Object(O.b)((function(e){return{allRecipes:e.allRecipes}}),(function(e){return{getRecipes:function(){return e(function(){var e=Object(p.a)(Object(b.a)().mark((function e(t){var n;return Object(b.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.a.get("/recipes");case 3:return n=e.sent,e.abrupt("return",t({type:"GET_RECIPES",payload:n.data}));case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}())},filterbyDiet:function(t){return e(function(e){return{type:"FILTER_BY_DIET",payload:e}}(t))},orderByAlphabet:function(t){return e(function(e){return{type:"ORDER_BY_ALPHABET",payload:e}}(t))},orderByScore:function(t){return e(function(e){return{type:"ORDER_BY_SCORE",payload:e}}(t))}}}))((function(e){var t=Object(c.useState)(1),n=Object(u.a)(t,2),r=n[0],a=n[1],i=9*r,s=i-9,o=e.allRecipes.slice(s,i);Object(c.useEffect)((function(){e.getRecipes()}),[e.getRecipes]);var b,p=function(t){t.preventDefault(),e.orderByScore(t.target.value)};return Object(j.jsxs)("div",{children:[Object(j.jsx)(v,{}),Object(j.jsx)("div",{children:Object(j.jsx)(l.b,{to:"/recipe",children:Object(j.jsx)("button",{children:"Create Recipe"})})}),Object(j.jsx)("div",{children:Object(j.jsxs)("select",{defaultValue:"all",name:"diets",onChange:function(t){return function(t){t.preventDefault(),e.filterbyDiet(t.target.value)}(t)},children:[Object(j.jsx)("option",{value:"all",children:"All"}),Object(j.jsx)("option",{value:"gluten free",children:"Gluten Free"}),Object(j.jsx)("option",{value:"ketogenic",children:"Ketogenic"}),Object(j.jsx)("option",{value:"vegetarian",children:"Vegetarian"}),Object(j.jsx)("option",{value:"lacto vegetarian",children:"Lacto Vegetarian"}),Object(j.jsx)("option",{value:"ovo vegetarian",children:"Ovo Vegetarian"}),Object(j.jsx)("option",{value:"vegan",children:"Vegan"}),Object(j.jsx)("option",{value:"pescatarian",children:"Pescatarian"}),Object(j.jsx)("option",{value:"paleo",children:"Paleo"}),Object(j.jsx)("option",{value:"primal",children:"Primal"}),Object(j.jsx)("option",{value:"low fodmap",children:"Low fodmap"}),Object(j.jsx)("option",{value:"whole 30",children:"Whole 30"})]})}),Object(j.jsx)("div",{children:Object(j.jsxs)("select",{defaultValue:"DEFAULT",name:"Alphabetical",onChange:function(t){return function(t){t.preventDefault(),e.orderByAlphabet(t.target.value)}(t)},children:[Object(j.jsx)("option",{value:"DEFAULT",disabled:!0,children:" Alphabetical Order"}),Object(j.jsx)("option",{value:"atoz",children:"A to Z"}),Object(j.jsx)("option",{value:"No atoz",children:"Z to A"})]})}),Object(j.jsx)("div",{children:Object(j.jsxs)("select",{defaultValue:"DEFAULT",name:"numerical",onChange:function(e){return p},children:[Object(j.jsx)("option",{value:"DEFAULT",disabled:!0,children:" Order by Health Score"}),Object(j.jsx)("option",{value:"asc",children:"Lower to Higher"}),Object(j.jsx)("option",{value:"desc",children:"Higher to Lower"})]})}),Object(j.jsx)("button",{onClick:(b.preventDefault(),void e.getRecipes()),children:"Clear"}),0===e.allRecipes.length?Object(j.jsx)("div",{children:Object(j.jsx)("h5",{children:"Loading..."})}):Object(j.jsx)("div",{children:null===o||void 0===o?void 0:o.map((function(e){return Object(j.jsx)("div",{children:Object(j.jsx)(d,{id:e.id,image:e.image,name:e.name,healthScore:e.healthScore,diets:e.diets},e.id)})}))}),Object(j.jsx)("hr",{}),Object(j.jsx)("div",{children:Object(j.jsx)(x,{recipesPage:9,allRecipes:e.allRecipes.length,paged:function(e){a(e)},setPage:a,page:r})})]})})),m=n(25),g=n(5),y=function(e){return/^[a-zA-Z\s]+$/.test(e)},E=function(e){var t,n=[];return e.name||(n.name="Tiene que tener un Nombre"),e.name&&!y(e.name)&&(n.name="Nombre Invalido"),e.summary||(n.summary="Debe tener una descripcion"),(e.healthScore<1||e.healthScore>100)&&(n.healthScore="Debe ser entre 1 y 100"),e.image||(n.image="Debe agregar una Imagen"),e.image&&(t=e.image,!new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(t))&&(n.image="URL invalido"),e.steps||(n.steps="Agrege los pasos de la receta"),e.diet.lenght||(n.diet="Selecione una Dieta"),e.diet&&!y(e.diet)&&(n.diet="Dieta Invalida"),n};var C=Object(O.b)((function(e){return{diets:e.diets}}),(function(e){return{createRecipe:function(t){return e(function(e){return function(){var t=Object(p.a)(Object(b.a)().mark((function t(n){var c;return Object(b.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,h.a.post("/recipe",e);case 3:return c=t.sent,t.abrupt("return",n({type:"CREATE_RECIPE",payload:c}));case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()}(t))},getDiet:function(){return e(function(){var e=Object(p.a)(Object(b.a)().mark((function e(t){var n;return Object(b.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.a.get("/types");case 3:return n=e.sent,e.abrupt("return",t({type:"GET_DIET",payload:n.data.map((function(e){return e.name}))}));case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}())}}}))((function(e){Object(s.f)();var t=Object(c.useState)({}),n=Object(u.a)(t,2),r=n[0],a=n[1],i=Object(c.useState)({name:"",summary:"",healthScore:"",image:"",steps:"",diets:[],diet:""}),o=Object(u.a)(i,2),d=o[0],b=o[1];Object(c.useEffect)((function(){e.getDiet()}),[]);var p=function(e){e.preventDefault(),b((function(t){var n=Object(g.a)(Object(g.a)({},t),{},Object(m.a)({},e.target.name,e.target.value));return a(E(n)),n}))};return Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{children:Object(j.jsx)("h1",{children:"Crear Receta"})}),Object(j.jsx)("div",{children:Object(j.jsx)("hr",{})})]}),Object(j.jsxs)("form",{children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{children:Object(j.jsx)("label",{children:"Name: "})}),Object(j.jsx)("input",{type:"text",name:"name",value:d.name,onChange:function(e){return p(e)}}),r.name?Object(j.jsx)("p",{children:r.name}):null]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{children:Object(j.jsx)("label",{children:"Summary: "})}),Object(j.jsx)("input",{type:"text",name:"summary",value:d.summary,onChange:function(e){return p(e)}}),r.summary?Object(j.jsx)("p",{children:r.summary}):null]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{children:Object(j.jsx)("label",{children:"healthScore: "})}),Object(j.jsx)("input",{type:"number",name:"healthScore",value:d.healthScore,onChange:function(e){return p(e)}}),r.healthScore?Object(j.jsx)("p",{children:r.healthScore}):null]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{children:Object(j.jsx)("label",{children:"Image: "})}),Object(j.jsx)("input",{type:"url",name:"image",value:d.image,onChange:function(e){return p(e)}}),r.image?Object(j.jsx)("p",{children:r.image}):null]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{children:Object(j.jsx)("label",{children:"Steps: "})}),Object(j.jsx)("input",{type:"text",name:"steps",value:d.steps,onChange:function(e){return p(e)}}),r.steps?Object(j.jsx)("p",{children:r.steps}):null]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{children:Object(j.jsx)("label",{children:"Tipos de Dieta: "})}),Object(j.jsx)("br",{}),e.diets.slice(0,13).map((function(e){return Object(j.jsxs)("div",{children:[Object(j.jsxs)("label",{children:[" ",e[0].toUpperCase()+e.slice(1)," "]}),Object(j.jsx)("input",{type:"checkbox",name:e,value:e,onChange:function(e){return function(e){var t=d.diets,n=t.indexOf(e.target.value);n>=0?t.splice(n,1):t.push(e.target.value),b(Object(g.a)(Object(g.a)({},d),{},{diets:t})),a(E(d))}(e)}})]},e)})),r.diets?Object(j.jsx)("p",{children:r.diets}):null]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{children:Object(j.jsx)("label",{children:"Dieta: "})}),Object(j.jsx)("input",{type:"text",name:"diet",value:d.diet,onChange:function(e){return p(e)}}),r.diet?Object(j.jsx)("p",{children:r.diet}):null]}),Object(j.jsx)("br",{}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{type:"summit",children:" CREATE"})}),Object(j.jsx)("br",{}),Object(j.jsx)("div",{children:Object(j.jsx)(l.b,{to:"/home",children:Object(j.jsx)("button",{children:"Go back"})})}),Object(j.jsx)("br",{})]})]})}));var R=function(){return Object(j.jsx)(l.a,{children:Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)("h1",{children:"Henry Food"}),Object(j.jsxs)(s.c,{children:[Object(j.jsx)(s.a,{exact:!0,path:"/",component:o}),Object(j.jsx)(s.a,{exact:"/home",component:f}),Object(j.jsx)(s.a,{exact:!0,path:"/recipes",component:C})]})]})})},D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,60)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))},S=n(26),T=n(36),_=n(37),I=n(31),A={recipes:[],allRecipes:[],dietType:[],recipeDetails:[]};var w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_RECIPES":return Object(g.a)(Object(g.a)({},e),{},{recipes:t.payload,allRecipes:t.payload});case"GET_RECIPE_BY_NAME":return Object(g.a)(Object(g.a)({},e),{},{recipes:t.payload});case"GET_RECIPE_DETAILS":return Object(g.a)(Object(g.a)({},e),{},{recipeDetails:t.payload});case"GET_DIET":return Object(g.a)(Object(g.a)({},e),{},{dietType:t.payload});case"FILTER_BY_DIET":var n=e.allRecipes,c="allRecipes"===t.payload?n:n.filter((function(e){var n;return null===(n=e.dietType)||void 0===n?void 0:n.some((function(e){return e.toLowerCase()===t.payload.toLowerCase()}))}));return Object(g.a)(Object(g.a)({},e),{},{recipes:c});case"ORDER_BY_ALPHABET":var r=Object(I.a)(e.recipes);return t.payload,r=e.recipes.sort((function(e,t){return e.name.toLowerCase()<t.name.toLowerCase()?1:e.name.toLowerCase()>t.name.toLowerCase()?-1:0})),Object(g.a)(Object(g.a)({},e),{},{recipes:r});case"ORDER_BY_SCORE":var a=Object(I.a)(e.recipes);return t.payload,a=e.recipes.sort((function(e,t){return e.healthScore<t.healthScore?1:e.healthScore>t.healthScore?-1:0})),Object(g.a)(Object(g.a)({},e),{},{recipes:a});case"CREATE_RECIPE":return Object(g.a)({},e);case"CLEAR_DETAIL":return Object(g.a)(Object(g.a)({},e),{},{recipeDetails:[]});default:return e}},L=Object(S.legacy_createStore)(w,Object(T.composeWithDevTools)(Object(S.applyMiddleware)(_.a)));i.a.render(Object(j.jsxs)(O.a,{store:L,children:[Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(l.a,{children:Object(j.jsx)(R,{})})}),","]}),document.getElementById("root")),D()}},[[57,1,2]]]);
//# sourceMappingURL=main.add4d614.chunk.js.map