(this.webpackJsonpforms=this.webpackJsonpforms||[]).push([[0],{104:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(9),o=a.n(s),l=(a(92),a(13)),i=a.n(l),c=a(20),u=a(72),d=(a(94),a(49)),m=a(50),p=a(51),h=a(58),g=a(57),f=(a(95),a(105)),b=a(167),w=a(153),v=a(165),E=a(150),C=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(){var e;Object(m.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={email:"",pswd:"",rePswd:"",selectedTab:0,warning:""},e.clearAllFields=function(){e.setState({email:"",pswd:"",rePswd:"",warning:""})},e.validateEmail=function(){return/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.state.email)?"":"Invalid email"},e.logInUser=function(){var t=Object(c.a)(i.a.mark((function t(a){var n,r;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),n="",n=0===e.state.email.length?"Please enter an email id":e.validateEmail(),0===e.state.pswd.length&&(n+="\n Please enter your password"),0===n.length){t.next=7;break}return alert(n),t.abrupt("return");case 7:return t.next=9,D("http://localhost:5000/login",{email:e.state.email,pswd:e.state.pswd});case 9:if("noEmail"===(r=t.sent).result?n="Email id doesn't exist, please sign up first":"passwordError"===r.result?n="wrong password, please check your password":"loggedIn"===r.result&&e.props.history.push("/customers"),0===n.length){t.next=14;break}return alert(n),t.abrupt("return");case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.signUpUser=Object(c.a)(i.a.mark((function t(){var a,n,r;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a="",a=0===e.state.email.length?"Please enter an email id":e.validateEmail(),0===e.state.pswd.length?a+="\nPlease enter a password":e.state.pswd!==e.state.rePswd&&(a+="\nPasswords don't match"),0===a.trim().length){t.next=6;break}return alert(a),t.abrupt("return");case 6:return(n=new Map).email=e.state.email,n.pswd=e.state.pswd,t.next=11,D("https://65qlar.deta.dev/signup",n);case 11:if(r=t.sent,console.log("response of sign up post request"),console.log(r),"failed"===r.result&&(a="failed to sign up, please try again"),"duplicateEmail"===r.result&&(a="Email id already, exist, please use another email id  or reset password"),0===a.trim().length){t.next=19;break}return alert(a),t.abrupt("return");case 19:0===a.length&&e.setState({selectedTab:0});case 20:case"end":return t.stop()}}),t)}))),e.handleInputChange=function(t){e.setState(Object(d.a)({},t.target.name,t.target.value))},e.changeTab=function(t){e.setState({selectedTab:t}),e.clearAllFields()},e}return Object(p.a)(a,[{key:"matchPasswords",value:function(){if(this.state.pswd!==this.state.rePswd)return"passwords don't match"}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"crmHome-main"},r.a.createElement("div",{className:"crmHome-title"},"Best CRM App"),r.a.createElement(f.a,{className:"paperForm"},r.a.createElement(v.a,{value:this.state.selectedTab,onChange:function(t,a){return e.changeTab(a)},"aria-label":"simple tabs example"},r.a.createElement(E.a,{label:"LOGIN"}),r.a.createElement(E.a,{label:"SIGN UP"})),r.a.createElement("div",{className:"loginView tabView",hidden:0!==this.state.selectedTab},r.a.createElement(b.a,{name:"email",id:"logIn-email",label:"email",variant:"outlined",onChange:this.handleInputChange,value:this.state.email}),r.a.createElement(b.a,{name:"pswd",id:"logIn-pswd",label:"password",variant:"outlined",type:"password",onChange:this.handleInputChange,value:this.state.pswd}),r.a.createElement(w.a,{color:"primary",variant:"contained",onClick:function(t){return e.logInUser(t)}},"log in")),r.a.createElement("div",{className:"signupView tabView",hidden:1!==this.state.selectedTab},r.a.createElement(b.a,{name:"email",id:"signUp-email",label:"email",variant:"outlined",onChange:this.handleInputChange,value:this.state.email}),r.a.createElement(b.a,{name:"pswd",id:"signUp-pswd",label:"password",variant:"outlined",type:"password",onChange:this.handleInputChange,value:this.state.pswd}),r.a.createElement(b.a,{name:"rePswd",id:"signUpRe-pswd",label:"password",variant:"outlined",type:"password",onChange:this.handleInputChange,value:this.state.rePswd}),r.a.createElement(w.a,{color:"primary",variant:"contained",onClick:function(){return e.signUpUser()}},"Sign Up"))))}}]),a}(r.a.Component);function D(e,t){return y.apply(this,arguments)}function y(){return(y=Object(c.a)(i.a.mark((function e(t,a){var n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(a)});case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var I=a(12),N=(a(99),a(161)),k=a(164),S=a(171),x=a(154),O=a(156),j=a(160),L=a(159),B=a(155),U=a(157),P=a(158),T=a(71),A=a.n(T),M=Object(x.a)({table:{minWidth:650}});function _(e){var t=M();return r.a.createElement(B.a,{component:f.a},r.a.createElement(O.a,{className:t.table,"aria-label":"simple table"},r.a.createElement(U.a,null,r.a.createElement(P.a,null,r.a.createElement(L.a,null,"Customer ID"),r.a.createElement(L.a,{align:"right"},"Name"),r.a.createElement(L.a,{align:"right"},"Gender"),r.a.createElement(L.a,{align:"right"},"Contact No"),r.a.createElement(L.a,{align:"right"},"Remove?"))),r.a.createElement(j.a,null,e.tableData.map((function(t,a){return r.a.createElement(P.a,{key:t.name},r.a.createElement(L.a,{component:"th",scope:"row"},t._id),r.a.createElement(L.a,{align:"right"},t.name),r.a.createElement(L.a,{align:"right"},t.gender),r.a.createElement(L.a,{align:"right"},t.contact),r.a.createElement(L.a,{align:"right"},e.deletingCustList.includes(t._id)?r.a.createElement("div",null,r.a.createElement(N.a,{color:"secondary"})):r.a.createElement(w.a,{variant:"contained",color:"secondary",className:"deleteBtn",startIcon:r.a.createElement(A.a,null),onClick:function(){e.deleteCustomerId(t._id,a)}})))})))))}var F=a(169),J=a(166),R=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={customerName:"",gender:"Male",mobNo:"",fetchedData:"",tableData:[],deletingCustList:[],openSnackBar:!1,lastDeletedCustomer:{},showUndoIndicator:!1},n.errorBoolsList=[!1,!1],n.setErrorsList=function(e){console.log("errorList is:"+e),n.errorBoolsList=[].concat(e)},n.showSnackBar=function(){n.setState({openSnackBar:!0})},n.closeSnackBar=function(e,t){"clickaway"!==t&&n.setState({openSnackBar:!1})},n.createData=function(e,t,a,n){return{_id:e,name:t,gender:a,contact:n}},n.deleteCustomerId=function(){var e=Object(c.a)(i.a.mark((function e(t,a){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r={}).data=n.state.tableData[a],r.index=a,n.setState({deletingCustList:n.state.deletingCustList.concat(t)}),console.log("deleting custID:"+t),e.next=7,D("http://localhost:5000/deleteCustomer",{customerID:t});case 7:e.sent,t,console.log("deleting custID from network, now updating local variables:"+t),n.setState({lastDeletedCustomer:r,tableData:n.state.tableData.filter((function(e){return e._id!=t})),deletingCustList:n.state.deletingCustList.filter((function(e){return e!==t}))}),console.log("main list, deleting id list and last cust deleting list updated using setState, showing snackbar now"+t),n.showSnackBar();case 13:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),n.validateData=function(){var e=[!1,!1],t=[];return 0===n.state.customerName.length&&(t.push("Customer Name can't be empty"),e[0]=!0),0===n.state.mobNo.length&&(t.push("Contact number can't be empty"),e[1]=!0),isNaN(n.state.mobNo)&&(t.push("Please enter valid mob number"),e[1]=!0),10!=="".concat(parseInt(n.state.mobNo)).length&&(t.push("Contact Number needs to be of 10 digit"),e[1]=!0),t.length>0&&alert(t.join("\n")),n.setErrorsList(e),n.setState(),0===t.length},n.handleInputChange=function(e){n.setState(Object(d.a)({},e.target.name,e.target.value))},n.genderList=["Male","Female","Rather Not Say","Others"],n.undoDelete=Object(c.a)(i.a.mark((function e(){var t,a,r,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.closeSnackBar(),n.setState({showUndoIndicator:!0}),(t=new Map).customerID=n.state.lastDeletedCustomer.data._id,e.next=6,D("http://localhost:5000/undoDelete",t);case 6:return a=e.sent,console.log("res from undo"+JSON.stringify(a)),r=[].concat(n.state.tableData),s=(s=[].concat(n.state.deletingCustList)).filter((function(e){return a.deletedCustomer.customerID!==e})),n.setState({custIdBeingDeleted:s}),console.log("trying to update table data after undo, custID and index is",a.deletedCustomerId,n.state.lastDeletedCustomer.index),console.log("going to undo delete for cust with data and at index",n.state.lastDeletedCustomer.data,n.state.lastDeletedCustomer.index),e.next=16,n.updateTableData(r,n.state.lastDeletedCustomer.data,n.state.lastDeletedCustomer.index);case 16:n.setState({showUndoIndicator:!1});case 17:case"end":return e.stop()}}),e)}))),n.updateTableData=function(){var e=Object(c.a)(i.a.mark((function e(t,a,r){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("position in new function is: and element to be added is "+r,a),void 0===r?t.push(a):t.splice(r,0,a),n.setState({tableData:t||[],lastDeletedCustomer:{}});case 3:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),n.getCustomerIdAndSaveData=Object(c.a)(i.a.mark((function e(){var t,a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.validateData()){e.next=3;break}return n.setState({},(function(){return n.errorBoolsList})),e.abrupt("return",0);case 3:return n.setState({fetchedData:null}),(t=new Map).name=n.state.customerName,t.gender=n.state.gender,t.contact=n.state.mobNo,e.next=10,D("http://localhost:5000/",t);case 10:return a=e.sent,n.setState({fetchedData:a._id}),console.log("response from server after adding another customer is ,",a),console.log(n.state),console.log("fetched CustomerID is: "+a._id),r=[].concat(n.state.tableData),e.next=18,n.updateTableData(r,n.createData(a._id,n.state.customerName,n.state.gender,n.state.mobNo));case 18:n.setState({customerName:"",gender:"Male",mobNo:"",fetchedData:""},(function(){return n.errorBoolsList}));case 19:case"end":return e.stop()}}),e)}))),n.fetchFormData=Object(c.a)(i.a.mark((function e(){var t,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:5000/customers",{credentials:"include"});case 2:return 403===(t=e.sent).status&&(alert("You need to login to view this page"),n.props.history.push("/"),console.log("gone to home page")),e.next=6,t.json();case 6:a=e.sent,n.setState({tableData:null!==a&&void 0!==a?a:[]});case 8:case"end":return e.stop()}}),e)}))),n}return Object(p.a)(a,[{key:"componentDidMount",value:function(){console.log("mounted"),this.fetchFormData(),console.log("data from local storage")}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(f.a,{className:"paper"},r.a.createElement("form",null,r.a.createElement("div",null,r.a.createElement(b.a,{name:"customerName",id:"customerName",label:"Customer Name",variant:"outlined",onChange:this.handleInputChange,value:this.state.customerName,error:this.errorBoolsList[0]})),r.a.createElement("div",null,r.a.createElement(b.a,{name:"mobNo",id:"mobNo",label:"Contact No.",variant:"outlined",onChange:this.handleInputChange,value:this.state.mobNo,error:this.errorBoolsList[1]})),r.a.createElement("div",null,r.a.createElement(k.a,{labelId:"demo-simple-select-outlined-label",id:"demo-simple-select-outlined",name:"gender",value:this.state.gender,onChange:this.handleInputChange,color:"secondary"},this.genderList.map((function(e){return r.a.createElement(S.a,{value:e},e)}))))),null===this.state.fetchedData?r.a.createElement("div",null,r.a.createElement(N.a,{color:"secondary"})):r.a.createElement("div",null,r.a.createElement(w.a,{color:"primary",variant:"contained",onClick:function(){return e.getCustomerIdAndSaveData()}},"Save info"),this.state.showUndoIndicator?r.a.createElement("div",null,r.a.createElement(N.a,{color:"secondary"})):"")),0!==this.state.tableData.length?r.a.createElement(_,{className:"simpleTable",tableData:this.state.tableData,deletingCustList:this.state.deletingCustList,deleteCustomerId:function(t,a){return e.deleteCustomerId(t,a)}}):"",r.a.createElement(F.a,{open:this.state.openSnackBar,autoHideDuration:3e3,onClose:this.closeSnackBar},r.a.createElement(J.a,{onClose:this.closeSnackBar,severity:"success",action:r.a.createElement(w.a,{color:"inherit",size:"small",onClick:this.undoDelete},"Undo")},"Customer Deleted!")))}}]),a}(r.a.Component),V=a(162),q=a(163);var G=function(e){var t=Object(I.f)(),a=Object(n.useState)(window.location.pathname.includes("customers")?"LogOut":"LogIn"),s=Object(u.a)(a,2),o=(s[0],s[1]);function l(){return(l=Object(c.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("logging out user"),e.next=3,D("http://localhost:5000/logout",{reqType:"log me out"});case 3:"loggedOut"===e.sent.status?t.push("/"):alert("Error logging out, try again"),o("LogIn");case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){var t=e;console.log("test:"),console.log(t),console.log("history:--"+window.location.pathname.includes("customers"))}),[]),r.a.createElement("div",{className:"App"},r.a.createElement(V.a,{position:"static",className:"topAppBar"},r.a.createElement(q.a,{className:"appBar-toolBar"},r.a.createElement(w.a,{color:"inherit",onClick:function(){return l.apply(this,arguments)}},window.location.pathname.includes("customers")?"LogOut":"LogIn"))),r.a.createElement("header",{className:"App-header"},r.a.createElement(I.c,null,r.a.createElement(I.a,{exact:!0,path:"/customers",component:R}),r.a.createElement(I.a,{path:"/",component:C}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var H=a(59);o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(H.a,null,r.a.createElement(G,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},87:function(e,t,a){e.exports=a(104)},92:function(e,t,a){},94:function(e,t,a){},95:function(e,t,a){},99:function(e,t,a){}},[[87,1,2]]]);
//# sourceMappingURL=main.65b7467c.chunk.js.map