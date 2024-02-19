"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6712],{3299:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var t=i(5893),r=i(1151);const s={sidebar_position:32},c="\u786c\u4ef6\u6388\u6743\u8ba4\u8bc1",o={id:"D213-DevKit/part3/08-4_HardwareAuthorizationCertification",title:"\u786c\u4ef6\u6388\u6743\u8ba4\u8bc1",description:"1. \u786c\u4ef6\u6388\u6743\u8ba4\u8bc1",source:"@site/docs/D213-DevKit/part3/08-4_HardwareAuthorizationCertification.md",sourceDirName:"D213-DevKit/part3",slug:"/D213-DevKit/part3/08-4_HardwareAuthorizationCertification",permalink:"/en/docs/D213-DevKit/part3/08-4_HardwareAuthorizationCertification",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/D213-DevKit/part3/08-4_HardwareAuthorizationCertification.md",tags:[],version:"current",sidebarPosition:32,frontMatter:{sidebar_position:32},sidebar:"d213dkSidebar",previous:{title:"eFuse \u4f7f\u7528\u6307\u5357",permalink:"/en/docs/D213-DevKit/part3/08-3_eFuse-Useguide"},next:{title:"\u89e6\u6478\u5c4f\u8c03\u8bd5\u6307\u5357",permalink:"/en/docs/D213-DevKit/part3/10-1_TouchscreenDebuggingGuide"}},a={},d=[{value:"1. \u786c\u4ef6\u6388\u6743\u8ba4\u8bc1",id:"1-\u786c\u4ef6\u6388\u6743\u8ba4\u8bc1",level:2},{value:"1.1. \u8eab\u4efd\u8ba4\u8bc1\u539f\u7406",id:"11-\u8eab\u4efd\u8ba4\u8bc1\u539f\u7406",level:3},{value:"1.2. \u82af\u7247\u578b\u53f7\u8ba4\u8bc1",id:"12-\u82af\u7247\u578b\u53f7\u8ba4\u8bc1",level:3},{value:"1.3. \u8f6f\u4ef6\u6388\u6743\u8ba4\u8bc1",id:"13-\u8f6f\u4ef6\u6388\u6743\u8ba4\u8bc1",level:3},{value:"1.4. \u63a5\u53e3\u8bbe\u8ba1",id:"14-\u63a5\u53e3\u8bbe\u8ba1",level:3},{value:"1.4.1. aic_rsa_priv_enc",id:"141-aic_rsa_priv_enc",level:4},{value:"1.4.2. aic_rsa_pub_dec",id:"142-aic_rsa_pub_dec",level:4},{value:"1.4.3. aic_hwp_rsa_priv_enc",id:"143-aic_hwp_rsa_priv_enc",level:4},{value:"1.5. API\u4f7f\u7528DEMO",id:"15-api\u4f7f\u7528demo",level:3}];function l(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:"\u786c\u4ef6\u6388\u6743\u8ba4\u8bc1",children:"\u786c\u4ef6\u6388\u6743\u8ba4\u8bc1"}),"\n",(0,t.jsx)(e.h2,{id:"1-\u786c\u4ef6\u6388\u6743\u8ba4\u8bc1",children:"1. \u786c\u4ef6\u6388\u6743\u8ba4\u8bc1"}),"\n",(0,t.jsx)(e.p,{children:"\u786c\u4ef6\u6388\u6743\u8ba4\u8bc1\u662f\u57fa\u4e8e\u8eab\u4efd\u8ba4\u8bc1\u539f\u7406\u4ee5\u53ca\u786c\u4ef6\u5b89\u5168\u5bc6\u94a5\u5b9e\u73b0\u7684\u5b89\u5168\u529f\u80fd\uff0c\u53ef\u4ee5\u8ba9\u8f6f\u4ef6\u6216\u8005\u7b2c\u4e09\u65b9\u5408\u4f5c\u4f19\u4f34\u5bf9\u82af\u7247\u7684\u5408\u6cd5\u6027\u8fdb\u884c\u8ba4\u8bc1\u3002"}),"\n",(0,t.jsx)(e.h3,{id:"11-\u8eab\u4efd\u8ba4\u8bc1\u539f\u7406",children:"1.1. \u8eab\u4efd\u8ba4\u8bc1\u539f\u7406"}),"\n",(0,t.jsx)(e.p,{children:"\u5982\u4e0b\u56fe\u6240\u793a\uff0c\u5047\u8bbe\u82af\u7247\u62e5\u6709\u4e00\u4e2a RSA \u79c1\u94a5\uff0c\u8f6f\u4ef6\u62e5\u6709\u5bf9\u5e94\u7684 RSA \u516c\u94a5\u3002\u5982\u679c\u8f6f\u4ef6\u6307\u5b9a\u4e00\u7b14\u6570\u636e\uff0c\u8ba9\u82af\u7247\u4f7f\u7528 RSA \u79c1\u94a5\u8fdb\u884c\u52a0\u5bc6\u8fd4\u56de\uff0c \u8f6f\u4ef6\u4f7f\u7528 RSA \u516c\u94a5\u5bf9\u5176\u8fdb\u884c\u8fdb\u884c\u89e3\u5bc6\uff0c\u5f97\u5230\u7684\u6570\u636e\u662f\u6b63\u786e\u7684\uff0c\u5219\u53ef\u8bc1\u660e\u8be5\u82af\u7247\u662f\u6b63\u786e RSA \u79c1\u94a5\u7684\u62e5\u6709\u8005\u3002"}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/identification-17067693186801.png",alt:"../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/identification.png"})}),"\n",(0,t.jsx)(e.p,{children:"\u82af\u7247\u5b89\u5168\u5b58\u50a8 RSA \u79c1\u94a5\u7684\u65b9\u5f0f\u6709\u591a\u79cd\uff0c\u5305\u62ec\u70e7\u5f55\u5728 eFuse \u4e2d\uff0c\u7136\u540e\u8bbe\u7f6e\u8f6f\u4ef6\u4e0d\u53ef\u8bfb\u5199\u3002"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"D211\u786c\u4ef6\u7279\u6027\uff1a"}),"\n",(0,t.jsx)(e.p,{children:"eFuse \u53ef\u4ee5\u901a\u8fc7\u8bfb\u5199\u7981\u6b62\u4f4d\uff0c\u63a7\u5236\u5b89\u5168\u5bc6\u94a5\u533a\u57df\u662f\u5426\u53ef\u4ee5\u88ab\u8f6f\u4ef6\u8bfb\u548c\u5199eFuse \u7684\u5b89\u5168\u5bc6\u94a5\u533a\u57df\uff0c\u4e00\u65e6\u88ab\u8bbe\u7f6e\u4e3a\u8bfb\u7981\u6b62\u4e4b\u540e\uff0c\u4ec5 CE \u786c\u4ef6\u53ef\u8bbf\u95eeCE \u5185\u90e8\u6709\u72ec\u7acb\u7684\u5b89\u5168 SRAM\uff0c\u4e0e\u5916\u754c\u9694\u7edd\uff0c\u4ec5 CE \u53ef\u8bbf\u95ee\uff0c\u53ef\u5b89\u5168\u5b58\u653e\u5bc6\u94a5"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"D211 \u7684\u65b9\u6848\u901a\u8fc7\u786c\u4ef6\u5b89\u5168\u5bc6\u94a5\u7684\u65b9\u5f0f\uff0c\u52a0\u5bc6\u4fdd\u5b58 RSA \u79c1\u94a5\u3002"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"\u5177\u4f53\u6b65\u9aa4\uff1a"}),"\n",(0,t.jsx)(e.p,{children:"\u901a\u8fc7 AES/DES \u52a0\u5bc6\u7684\u65b9\u5f0f\uff0c\u5c06 RSA \u79c1\u94a5\u52a0\u5bc6\u5c06\u89e3\u5bc6\u7684 AES/DES \u5bc6\u94a5\uff0c\u70e7\u5f55\u5728 eFuse \u5b89\u5168\u5bc6\u94a5\u533a\u57df\uff0c\u8f6f\u4ef6\u4e0d\u53ef\u8bfb\u5199\u4f7f\u7528\u65f6\uff0c\u5c06 RSA \u79c1\u94a5\u89e3\u5bc6\u5230\u5b89\u5168 SRAM"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.h3,{id:"12-\u82af\u7247\u578b\u53f7\u8ba4\u8bc1",children:"1.2. \u82af\u7247\u578b\u53f7\u8ba4\u8bc1"}),"\n",(0,t.jsx)(e.p,{children:"\u5728\u4e00\u4e9b\u5e94\u7528\u4e2d\uff0c\u901a\u4fe1\u7684\u4e00\u65b9\u9700\u8981\u8ba4\u8bc1\u82af\u7247\u7684\u8eab\u4efd\uff0c\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u4ec5\u9760\u8bfb\u53d6 CHIP ID \u8fd4\u56de\u662f\u4e0d\u53ef\u4fe1\u7684\uff0c\u53ef\u4ee5\u901a\u8fc7 RSA \u8eab\u4efd\u8ba4\u8bc1\u7684\u65b9\u5f0f\u8fdb\u884c\u3002"}),"\n",(0,t.jsx)(e.p,{children:"\u82af\u7247\u578b\u53f7\u8eab\u4efd\u8ba4\u8bc1\u901a\u8fc7 AIC \u9881\u53d1\u7684 RSA \u79c1\u94a5(\u52a0\u5bc6) \u548c RSA \u516c\u94a5\u5bf9\u5b8c\u6210\u3002AIC \u4e3a\u6bcf\u4e00\u6b3e\u82af\u7247\u5185\u7f6e\u4e00\u4e2aPNK(Part Number Key) \u5bc6\u94a5\uff0c\u8be5\u5bc6\u94a5\u4e0e\u578b\u53f7\u4e00\u4e00\u5bf9\u5e94\uff0c\u5916\u754c\u65e0\u6cd5\u8bfb\u53d6\u3002"}),"\n",(0,t.jsx)(e.p,{children:"AIC \u4e3a\u8be5\u578b\u53f7\u751f\u6210\u4e00\u5bf9 RSA \u5bc6\u94a5\uff0c\u5e76\u4e14\u4f7f\u7528 PNK \u5bf9 RSA \u79c1\u94a5\u8fdb\u884c\u52a0\u5bc6\uff0c\u7136\u540e\u5c06\u52a0\u5bc6\u540e\u7684 RSA \u79c1\u94a5\uff0c\u4ee5\u53ca\u516c\u94a5\u9881\u53d1\u7ed9\u7528\u6237\u3002"}),"\n",(0,t.jsx)(e.p,{children:"\u5bf9\u4e8e\u9700\u8981\u5bf9\u82af\u7247\u578b\u53f7\u8fdb\u884c\u8ba4\u8bc1\u7684\u7528\u6237\u9700\u8981\u8fdb\u884c\u4e0b\u5217\u64cd\u4f5c\u3002"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"\u5177\u4f53\u6b65\u9aa4\uff1a"}),"\n",(0,t.jsx)(e.p,{children:"\u8bbe\u7f6e CE \u4f7f\u7528 PNK \u5c06\u52a0\u5bc6\u7684 RSA \u79c1\u94a5\u89e3\u5bc6\u5230\u5b89\u5168 SRAM\u8ba9 CE \u4f7f\u7528\u5b89\u5168 SRAM \u4e2d\u7684 RSA \u79c1\u94a5\u52a0\u5bc6\u4e00\u6bb5\u6570\u636e Nonce\uff0c\u8fd4\u56de\u7ed9\u8ba4\u8bc1\u65b9EncNonce\u8ba4\u8bc1\u65b9\u4f7f\u7528 RSA \u516c\u94a5\u5bf9\u8fd4\u56de\u7684\u52a0\u5bc6\u6570\u636e\u8fdb\u884c\u89e3\u5bc6\uff0c\u5f97\u5230 Nonce\uff0c\u9a8c\u8bc1\u6570\u636e\u662f\u5426\u6b63\u786e\u6570\u636e\u6b63\u786e\uff0c\u8bf4\u660e\u8be5\u578b\u53f7\u82af\u7247\u5408\u6cd5"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/chip_certification-17067693556383.png",alt:"../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/chip_certification.png"})}),"\n",(0,t.jsx)(e.h3,{id:"13-\u8f6f\u4ef6\u6388\u6743\u8ba4\u8bc1",children:"1.3. \u8f6f\u4ef6\u6388\u6743\u8ba4\u8bc1"}),"\n",(0,t.jsx)(e.p,{children:"\u82af\u7247\u8eab\u4efd\u8ba4\u8bc1\u53ef\u5728\u8f6f\u4ef6\u6388\u6743\u8ba4\u8bc1\u4e2d\u5e94\u7528\u3002"}),"\n",(0,t.jsx)(e.p,{children:"\u5728\u5b9e\u9645\u5e94\u7528\u4e2d\uff0c\u8bbe\u5907\u53ef\u80fd\u4f1a\u96c6\u6210\u4e86\u4e0d\u540c\u5382\u5546\u7684\u8f6f\u4ef6\u548c\u7b97\u6cd5\u3002\u8f6f\u4ef6\u5382\u5546\u4f1a\u6709\u76f8\u5173\u77e5\u8bc6\u4ea7\u6743\u4fdd\u62a4\u3001\u8f6f\u4ef6\u6388\u6743\u4e0a\u7684\u9700\u6c42\uff0c\u5373\u5e0c\u671b\u80fd\u591f\u9650\u5b9a\u81ea\u8eab\u7684\u8f6f\u4ef6\u53ea\u80fd\u8fd0\u884c\u5728\u6307\u5b9a\u82af\u7247\u578b\u53f7\u4e0a\u3002"}),"\n",(0,t.jsx)(e.p,{children:"\u8f6f\u4ef6\u5382\u5546\u53ef\u4ee5\u901a\u8fc7 PSK(Partner Secret Key) \u673a\u5236\u5b9e\u73b0\u5b89\u5168\u7684\u6388\u6743\u8ba4\u8bc1\u3002"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"\u5177\u4f53\u6b65\u9aa4\uff1a"}),"\n",(0,t.jsx)(e.p,{children:"\u8bbe\u5907\u5382\u5546\u5c06\u4e00\u4e2a eFuse PSK \u533a\u57df\u5206\u914d\u7ed9\u5408\u4f5c\u4f19\u4f34\u5408\u4f5c\u5382\u5546\u5c06\u81ea\u5df1\u7684\u5bc6\u94a5\u70e7\u5f55\u5230 PSK \u533a\u57df\uff0c\u5e76\u4e14\u8bbe\u7f6e\u4e3a\u8f6f\u4ef6\u4e0d\u53ef\u8bfb\u5199\u5408\u4f5c\u5382\u5546\u751f\u6210\u4e00\u5bf9 RSA \u5bc6\u94a5\uff0c\u5e76\u4e14\u4f7f\u7528 PSK \u5c06 RSA \u79c1\u94a5\u52a0\u5bc6\u5c06\u52a0\u5bc6\u540e\u7684 RSA \u79c1\u94a5\uff0c\u4ee5\u53ca\u5bf9\u5e94\u7684 RSA \u516c\u94a5\u96c6\u6210\u5230\u8f6f\u4ef6\u5f53\u4e2d\u9700\u8981\u8fdb\u884c\u6388\u6743\u68c0\u67e5\u65f6\uff0c\u8f6f\u4ef6\u8bbe\u7f6e CE \u4f7f\u7528 PSK\uff0c\u5c06\u52a0\u5bc6\u7684 RSA \u79c1\u94a5\u89e3\u5bc6\u5230\u5b89\u5168 SRAM\u4f7f\u7528\u5b89\u5168 SRAM \u4e2d\u7684 RSA \u79c1\u94a5\u52a0\u5bc6\u4e00\u7b14\u6570\u636e\uff0c\u8fd4\u56de\u7ed9\u8ba4\u8bc1\u8f6f\u4ef6\u8ba4\u8bc1\u8f6f\u4ef6\u4f7f\u7528 RSA \u516c\u94a5\u89e3\u5bc6\u8fd4\u56de\u7684\u6570\u636e\uff0c\u5982\u679c\u7ed3\u679c\u6b63\u786e\uff0c\u8bf4\u660e\u8be5\u82af\u7247\u662f\u5408\u6cd5\u6388\u6743\u7684\u82af\u7247"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{src:"https://photos.100ask.net/artinchip-docs/d213-devkit/sw_certification-17067693681275.png",alt:"../../../_https://photos.100ask.net/artinchip-docs/d213-devkit/sw_certification.png"})}),"\n",(0,t.jsx)(e.p,{children:"\u6ce8\u89e3"}),"\n",(0,t.jsx)(e.p,{children:"D211\u5171\u67095\u7ec4\u4fdd\u62a4\u5bc6\u94a5\uff0c\u4e00\u7ec4\u662fPNK\uff0c\u51fa\u5382\u70e7\u5f55\u3002\u53e6\u5916\u56db\u7ec4\u662fPSK\uff0c\u7531\u7ec8\u7aef\u5382\u5546\u81ea\u884c\u70e7\u5f55\u3002"}),"\n",(0,t.jsx)(e.h3,{id:"14-\u63a5\u53e3\u8bbe\u8ba1",children:"1.4. \u63a5\u53e3\u8bbe\u8ba1"}),"\n",(0,t.jsx)(e.h4,{id:"141-aic_rsa_priv_enc",children:"1.4.1. aic_rsa_priv_enc"}),"\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:(0,t.jsx)(e.strong,{children:"\u51fd\u6570\u539f\u578b"})}),(0,t.jsx)(e.th,{children:"int aic_rsa_priv_enc(int flen, unsigned char *from, unsigned char *to, struct ak_options *opts)"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"\u529f\u80fd\u8bf4\u660e"})}),(0,t.jsx)(e.td,{children:"\u4f7f\u7528\u79c1\u94a5\u8fdb\u884c\u52a0\u5bc6\u3002"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"\u53c2\u6570\u5b9a\u4e49"})}),(0,t.jsx)(e.td,{children:"int flen\u8f93\u5165\u6570\u636e\u957f\u5ea6from\u8f93\u5165\u9700\u8981\u88ab\u52a0\u5bc6\u7684\u6570\u636eto\u8f93\u51fa\u52a0\u5bc6\u540e\u7684\u6570\u636eopts\u4e00\u4e9b\u5176\u5b83\u53c2\u6570"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"\u8fd4\u56de\u503c"})}),(0,t.jsx)(e.td,{children:"\u6210\u529f\u8fd4\u56de\u52a0\u5bc6\u540e\u6570\u636e\u957f\u5ea6\uff0c\u5931\u8d25\u8fd4\u56de-1"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"\u6ce8\u610f\u4e8b\u9879"})}),(0,t.jsx)(e.td,{})]})]})]}),"\n",(0,t.jsx)(e.h4,{id:"142-aic_rsa_pub_dec",children:"1.4.2. aic_rsa_pub_dec"}),"\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:(0,t.jsx)(e.strong,{children:"\u51fd\u6570\u539f\u578b"})}),(0,t.jsx)(e.th,{children:"int aic_rsa_pub_dec(int flen, unsigned char *from, unsigned char *to, struct ak_options *opts)"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"\u529f\u80fd\u8bf4\u660e"})}),(0,t.jsx)(e.td,{children:"\u4f7f\u7528\u516c\u94a5\u8fdb\u884c\u89e3\u5bc6\u3002"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"\u53c2\u6570\u5b9a\u4e49"})}),(0,t.jsx)(e.td,{children:"int flen\u8f93\u5165\u6570\u636e\u957f\u5ea6from\u8f93\u5165\u9700\u8981\u88ab\u89e3\u5bc6\u7684\u6570\u636eto\u8f93\u51fa\u89e3\u5bc6\u540e\u7684\u6570\u636eopts\u4e00\u4e9b\u5176\u5b83\u53c2\u6570"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"\u8fd4\u56de\u503c"})}),(0,t.jsx)(e.td,{children:"\u6210\u529f\u8fd4\u56de\u52a0\u5bc6\u540e\u6570\u636e\u957f\u5ea6\uff0c\u5931\u8d25\u8fd4\u56de-1"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"\u6ce8\u610f\u4e8b\u9879"})}),(0,t.jsx)(e.td,{})]})]})]}),"\n",(0,t.jsx)(e.h4,{id:"143-aic_hwp_rsa_priv_enc",children:"1.4.3. aic_hwp_rsa_priv_enc"}),"\n",(0,t.jsxs)(e.table,{children:[(0,t.jsx)(e.thead,{children:(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.th,{children:(0,t.jsx)(e.strong,{children:"\u51fd\u6570\u539f\u578b"})}),(0,t.jsx)(e.th,{children:"int aic_hwp_rsa_priv_enc(int flen, unsigned char *from, unsigned char *to, struct ak_options *opts, char *algo)"})]})}),(0,t.jsxs)(e.tbody,{children:[(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"\u529f\u80fd\u8bf4\u660e"})}),(0,t.jsxs)(e.td,{children:["\u4f7f\u7528\u7ecf\u8fc7 ",(0,t.jsx)(e.code,{children:"\u4fdd\u62a4\u5bc6\u94a5\u52a0\u5bc6\u8fc7\u7684\u79c1\u94a5"})," \u8fdb\u884c\u52a0\u5bc6\u3002"]})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"\u53c2\u6570\u5b9a\u4e49"})}),(0,t.jsx)(e.td,{children:"flen\u8f93\u5165\u6570\u636e\u957f\u5ea6from\u8f93\u5165\u9700\u8981\u88ab\u89e3\u5bc6\u7684\u6570\u636eto\u8f93\u51fa\u89e3\u5bc6\u540e\u7684\u6570\u636eopts\u4e00\u4e9b\u5176\u5b83\u53c2\u6570algo\u6307\u5b9a\u9009\u7528\u70e7\u5f55\u5728eFuse\u4e2d\u7684\u4fdd\u62a4\u5bc6\u94a5PNK_PROTECTED_RSAPSK0_PROTECTED_RSAPSK1_PROTECTED_RSAPSK2_PROTECTED_RSAPSK3_PROTECTED_RSA"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"\u8fd4\u56de\u503c"})}),(0,t.jsx)(e.td,{children:"\u6210\u529f\u8fd4\u56de\u52a0\u5bc6\u540e\u6570\u636e\u957f\u5ea6\uff0c\u5931\u8d25\u8fd4\u56de-1"})]}),(0,t.jsxs)(e.tr,{children:[(0,t.jsx)(e.td,{children:(0,t.jsx)(e.strong,{children:"\u6ce8\u610f\u4e8b\u9879"})}),(0,t.jsx)(e.td,{})]})]})]}),"\n",(0,t.jsx)(e.h3,{id:"15-api\u4f7f\u7528demo",children:"1.5. API\u4f7f\u7528DEMO"}),"\n",(0,t.jsx)(e.p,{children:"\u6388\u6743\u7684\u68c0\u67e5\u53ef\u4ee5\u5728 APP/\u4e2d\u95f4\u4ef6 \u542f\u52a8\u65f6\u8fdb\u884c\uff0c\u6216\u8005\u5728\u8fd0\u884c\u65f6\u968f\u673a\u8fdb\u884c\u3002"}),"\n",(0,t.jsx)(e.p,{children:"Demo \u89c1 source/artinchip/aic-authorization/test/test_aic_hw_authorization.c"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{children:'int app_hw_authorization_check(unsigned char *from, int flen,\n                unsigned char *esk, int esk_len,\n                unsigned char *pk, int pk_len, char *algo)\n{\n    struct ak_options opts = {0};\n    uint8_t *inbuf = NULL, *outbuf = NULL;\n    uint8_t esk_buf[esk_len];\n    uint8_t pk_buf[pk_len];\n    size_t pagesize = (size_t)sysconf(_SC_PAGESIZE);\n    int ret = 0, rlen, nonce;\n\n    if (posix_memalign((void **)&inbuf, pagesize, 2 * pagesize)) {\n        printf("Failed to allocate inbuf.\\n");\n        ret = -ENOMEM;\n        goto out;\n    }\n    if (posix_memalign((void **)&outbuf, pagesize, 2 * pagesize)) {\n        printf("Failed to allocate outbuf.\\n");\n        ret = -ENOMEM;\n        goto out;\n    }\n\n    // 1. Set RSA key parameters\n    memcpy(esk_buf, esk, esk_len);\n    memcpy(pk_buf, pk, pk_len);\n    opts.esk_buf = esk_buf;\n    opts.esk_len = esk_len;\n    opts.pk_buf = pk_buf;\n    opts.pk_len = pk_len;\n\n    // 2. Nonce private key encryption\n    rlen = aic_hwp_rsa_priv_enc(flen, from, outbuf, &opts, algo);\n    if (rlen < 0) {\n        printf("aic_hwp_rsa_priv_enc failed.\\n");\n        goto out;\n    }\n    memcpy(inbuf, outbuf, rlen);\n    memset(outbuf, 0, 2 * pagesize);\n\n    // 3. EncNonce public key decryption\n    rlen = aic_rsa_pub_dec(rlen, inbuf, outbuf, &opts);\n    if (rlen < 0) {\n        printf("aic_rsa_pub_dec failed.\\n");\n        goto out;\n    }\n\n    // 4. Compare Nonce and DecNonce\n    if (memcmp(from, outbuf, rlen))\n    {\n        hexdump("Expect", (unsigned char *)&nonce, rlen);\n        hexdump("Got Result", (unsigned char *)outbuf, rlen);\n        printf("App %s stop.\\n", algo);\n        ret = -1;\n    } else {\n        printf("App %s running.\\n", algo);\n        ret = 0;\n    }\n\nout:\n    if (inbuf)\n        free(inbuf);\n    if (outbuf)\n        free(outbuf);\n\n    return ret;\n}\nint main()\n{\n    int ret = 0;\n    int nonce, flen, esk_len, pk_len;\n    unsigned char *esk, *pk;\n    char *algo;\n\n    esk = rsa_private_key2048_encrypted_der;\n    esk_len = rsa_private_key2048_encrypted_der_len;\n    pk = rsa_public_key2048_der;\n    pk_len = rsa_public_key2048_der_len;\n    while(1) {\n        nonce = rand();     /* Generate random number Nonce */\n        flen = sizeof(nonce);\n        algo = PNK_PROTECTED_RSA;   /* Specify hardware protection key */\n        ret = app_hw_authorization_check((unsigned char *)&nonce, flen,\n                        esk, esk_len, pk, pk_len, algo);\n        if (ret < 0) {\n            printf("Application %s not authorization.\\n", algo);\n        }\n\n        nonce = rand();     /* Generate random number Nonce */\n        flen = sizeof(nonce);\n        algo = PSK0_PROTECTED_RSA;  /* Specify hardware protection key */\n        ret = app_hw_authorization_check((unsigned char *)&nonce, flen,\n                        esk, esk_len, pk, pk_len, algo);\n        if (ret < 0) {\n            printf("Application %s not authorization.\\n", algo);\n        }\n\n        nonce = rand();     /* Generate random number Nonce */\n        flen = sizeof(nonce);\n        algo = PSK1_PROTECTED_RSA;  /* Specify hardware protection key */\n        ret = app_hw_authorization_check((unsigned char *)&nonce, flen,\n                        esk, esk_len, pk, pk_len, algo);\n        if (ret < 0) {\n            printf("Application %s not authorization.\\n", algo);\n        }\n\n        nonce = rand();     /* Generate random number Nonce */\n        flen = sizeof(nonce);\n        algo = PSK2_PROTECTED_RSA;  /* Specify hardware protection key */\n        ret = app_hw_authorization_check((unsigned char *)&nonce, flen,\n                        esk, esk_len, pk, pk_len, algo);\n        if (ret < 0) {\n            printf("Application %s not authorization.\\n", algo);\n        }\n\n        nonce = rand();     /* Generate random number Nonce */\n        flen = sizeof(nonce);\n        algo = PSK3_PROTECTED_RSA;  /* Specify hardware protection key */\n        ret = app_hw_authorization_check((unsigned char *)&nonce, flen,\n                        esk, esk_len, pk, pk_len, algo);\n        if (ret < 0) {\n            printf("Application %s not authorization.\\n", algo);\n        }\n\n        sleep(2);\n    }\n\n    return 0;\n}\n'})})]})}function h(n={}){const{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(l,{...n})}):l(n)}},1151:(n,e,i)=>{i.d(e,{Z:()=>o,a:()=>c});var t=i(7294);const r={},s=t.createContext(r);function c(n){const e=t.useContext(s);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:c(n.components),t.createElement(s.Provider,{value:e},n.children)}}}]);