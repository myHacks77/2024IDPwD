import{a as _}from"./chunk-FPIATIJV.js";import"./chunk-GU3ICRQD.js";import{$a as g,Ea as a,Na as p,Qb as C,Sa as c,Sb as S,Za as s,ab as t,bb as n,cb as f,db as u,eb as h,fb as v,ia as m,ja as d,kb as r}from"./chunk-ZLMIVOC7.js";function F(i,l){if(i&1){let e=u();t(0,"div",3)(1,"h1"),r(2,'"Hello Friend"'),n(),t(3,"p"),r(4,"This level focuses on daily friendly greetings, using sign language to take the first step in \u201Cconversation\u201D with the deaf community and convey kindness."),n(),t(5,"button",4),h("click",function(){m(e);let E=v();return d(E.startGame())}),r(6,"Start"),n()()}}var y=class i{isEntered=!1;gameSetting={levelTitle:"Hello Friend",nextStepLink:"/thank-you",requiredGestures:[{gestures:["point_to_other"],word:"\u4F60(You)"},{gestures:["thumbs_up"],word:"\u597D(Good)"}]};startGame(){this.isEntered=!0}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=p({type:i,selectors:[["app-hello-friend"]],decls:3,vars:4,consts:[["class","glass-container",4,"ngIf"],[1,"game-container"],[3,"gameSetting"],[1,"glass-container"],[3,"click"]],template:function(e,o){e&1&&(c(0,F,7,0,"div",0),t(1,"div",1),f(2,"app-sign-language-game",2),n()),e&2&&(s("ngIf",!o.isEntered),a(),g("hide",!o.isEntered),a(),s("gameSetting",o.gameSetting))},dependencies:[_,S,C],encapsulation:2})};export{y as HelloFriendComponent};