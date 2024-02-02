"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1662],{3232:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>a,frontMatter:()=>s,metadata:()=>d,toc:()=>c});var t=i(5893),r=i(1151);const s={sidebar_position:36},l="\u6309\u952e\u77e9\u9635\u4f7f\u7528\u6307\u5357",d={id:"D213-DevKit/part3/10-4_GuideToUsingTheKeyMatrix",title:"\u6309\u952e\u77e9\u9635\u4f7f\u7528\u6307\u5357",description:"1. \u6309\u952e\u77e9\u9635\u4f7f\u7528\u6307\u5357",source:"@site/docs/D213-DevKit/part3/10-4_GuideToUsingTheKeyMatrix.md",sourceDirName:"D213-DevKit/part3",slug:"/D213-DevKit/part3/10-4_GuideToUsingTheKeyMatrix",permalink:"/en/docs/D213-DevKit/part3/10-4_GuideToUsingTheKeyMatrix",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/D213-DevKit/part3/10-4_GuideToUsingTheKeyMatrix.md",tags:[],version:"current",sidebarPosition:36,frontMatter:{sidebar_position:36},sidebar:"d213dkSidebar",previous:{title:"WiFi\u8c03\u8bd5\u6307\u5357",permalink:"/en/docs/D213-DevKit/part3/10-3_WiFiDebuggingGuide"},next:{title:"Linux-Bringup\u53c2\u8003",permalink:"/en/docs/category/linux-bringup\u53c2\u8003"}},o={},c=[{value:"1. \u6309\u952e\u77e9\u9635\u4f7f\u7528\u6307\u5357",id:"1-\u6309\u952e\u77e9\u9635\u4f7f\u7528\u6307\u5357",level:2},{value:"1.1. \u6982\u8ff0",id:"11-\u6982\u8ff0",level:3},{value:"1.2. \u5185\u6838\u914d\u7f6e",id:"12-\u5185\u6838\u914d\u7f6e",level:3},{value:"1.3. \u8f6f\u4ef6\u914d\u7f6e",id:"13-\u8f6f\u4ef6\u914d\u7f6e",level:3},{value:"1.4. DTS\u53c2\u6570\u914d\u7f6e",id:"14-dts\u53c2\u6570\u914d\u7f6e",level:3},{value:"1.5. \u6d4b\u8bd5\u6307\u5357",id:"15-\u6d4b\u8bd5\u6307\u5357",level:3}];function h(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"\u6309\u952e\u77e9\u9635\u4f7f\u7528\u6307\u5357",children:"\u6309\u952e\u77e9\u9635\u4f7f\u7528\u6307\u5357"}),"\n",(0,t.jsx)(n.h2,{id:"1-\u6309\u952e\u77e9\u9635\u4f7f\u7528\u6307\u5357",children:"1. \u6309\u952e\u77e9\u9635\u4f7f\u7528\u6307\u5357"}),"\n",(0,t.jsx)(n.h3,{id:"11-\u6982\u8ff0",children:"1.1. \u6982\u8ff0"}),"\n",(0,t.jsx)(n.p,{children:"\u6b64\u7ae0\u8282\u4ecb\u7ecd\u6309\u952e\u77e9\u9635\u7684\u4f7f\u7528\u65b9\u6cd5\u4ee5\u53ca\u76f8\u5173\u914d\u7f6e\u3002"}),"\n",(0,t.jsx)(n.h3,{id:"12-\u5185\u6838\u914d\u7f6e",children:"1.2. \u5185\u6838\u914d\u7f6e"}),"\n",(0,t.jsx)(n.p,{children:"\u5728luban\u6839\u76ee\u5f55\u4e0b\u6267\u884c make kernel-menuconfig\uff0c\u8fdb\u5165kernel\u7684\u529f\u80fd\u914d\u7f6e\uff0c\u6309\u5982\u4e0b\u9009\u62e9\uff1a"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"Linux\n    Device Drivers\n        [*] Input device Support\n            <*> Event interface\n            [*] Keyboards\n                <*> ADC Ladder Buttons\n"})}),"\n",(0,t.jsx)(n.h3,{id:"13-\u8f6f\u4ef6\u914d\u7f6e",children:"1.3. \u8f6f\u4ef6\u914d\u7f6e"}),"\n",(0,t.jsx)(n.p,{children:"\u5728luban\u7684\u6839\u76ee\u5f55\u4e0b\u901a\u8fc7make menuconfig\u53ef\u4ee5\u6253\u5f00test-keyadc\uff1a"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"Artinchip packages\n    Sample code\n        [*] test-keyadc\n"})}),"\n",(0,t.jsx)(n.h3,{id:"14-dts\u53c2\u6570\u914d\u7f6e",children:"1.4. DTS\u53c2\u6570\u914d\u7f6e"}),"\n",(0,t.jsx)(n.p,{children:"\u8fd9\u4e9b\u53c2\u6570\u4e3b\u8981\u5728\u6587\u4ef6target/d211/\u65b9\u6848x/board.dts\u4e2d\uff0c\u529f\u80fd\u53c2\u6570\u7684\u8bbe\u7f6e\u5fc5\u987b\u548c\u786c\u4ef6\u539f\u7406\u56fe\u76f8\u5339\u914d"}),"\n",(0,t.jsx)(n.p,{children:"\u8bbe\u7f6e\u6570\u636e\u901a\u8def\u5982\u4e0b\uff1a"}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'key_button: adc-keys {\n        compatible = "adc-keys";\n        io-channels = <&gpai 6>;\n        io-channel-names = "buttons";\n        poll-interval = <200>;\n        keyup-threshold-microvolt = <3000000>;\n\n        up-key {\n                label = "up_key";\n                linux,code = <KEY_UP>;\n                press-threshold-microvolt = <300000>;\n        };\n\n        down-key {\n                label = "down_key";\n                linux,code = <KEY_DOWN>;\n                press-threshold-microvolt = <800000>;\n        };\n\n        left-key {\n                label = "left_key";\n                linux,code = <KEY_LEFT>;\n                press-threshold-microvolt = <1400000>;\n        };\n\n        right-key {\n                label = "right_key";\n                linux,code = <KEY_RIGHT>;\n                press-threshold-microvolt = <2000000>;\n        };\n};\n'})}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"\u5176\u4e2d\uff1a"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"io-channels\uff1a\u6240\u9009\u62e9\u7684io\u901a\u9053"}),"\n",(0,t.jsx)(n.li,{children:"io-channels-names\uff1aio\u901a\u9053\u7684\u522b\u540d"}),"\n",(0,t.jsx)(n.li,{children:"poll-interval\uff1a\u8868\u793a\u83b7\u53d6ADC\u503c\u7684\u8f6e\u8be2\u95f4\u9694(\u5355\u4f4d\u6beb\u79d2)"}),"\n",(0,t.jsx)(n.li,{children:"keyup-threshold-microvolt\uff1a\u6309\u952e\u62ac\u8d77\u65f6\uff0c\u5bf9\u5e94io\u901a\u9053\u7684\u7535\u538b(\u5355\u4f4d\u5fae\u4f0f)\uff0c\u53ef\u8bbe\u7f6e\u4e3a\u6807\u51c6\u7535\u538b"}),"\n",(0,t.jsx)(n.li,{children:"label\uff1a\u952e\u503c\u7684\u8bf4\u660e"}),"\n",(0,t.jsx)(n.li,{children:"linux,code\uff1a\u6309\u952e\u4e0a\u62a5\u7684\u952e\u503c"}),"\n",(0,t.jsx)(n.li,{children:"press-threshold-microvolt\uff1a\u6309\u952e\u6309\u4e0b\u65f6\uff0c\u5bf9\u5e94io\u901a\u9053\u7684\u7535\u538b(\u5355\u4f4d\u5fae\u4f0f)"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"threshold-microvolt\u8303\u56f4\u5224\u65ad\u903b\u8f91\u5982\u4e0b\uff1a"}),"\n",(0,t.jsx)(n.p,{children:"\u4e3a\u4e86\u7b80\u6d01\u8868\u683c\uff0cup-key\u7684press-threshold-microvolt\u914d\u7f6e\u7b80\u5199\u4e3aup_mv\uff0c\u540c\u7406\u5f97down_mv\u3001left_mv\u3001right_mv\u3002keyup-threshold-microvolt\u7b80\u5199\u4e3akeyup_mv\u3002"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"| \u53c2\u6570\u5b9a\u4e49\u8303\u56f4                                              | \u542b\u4e49              |\n| --------------------------------------------------------- | ----------------- |\n| (right_mv + keyup_mv)/2 <= value                          | no key pressed    |\n| (left_mv + right_mv)/2 <= value < (right_mv + keyup_mv)/2 | KEY_RIGHT pressed |\n| (down_mv + left_mv)/2 <= value < (left_mv + right_mv)/2   | KEY_LEFT pressed  |\n| (up_mv + down_mv)/2 <= value < (down_mv + right_mv)/2     | KEY_DOWN pressed  |\n| value < (up_mv + down_mv)/2                               | KEY_UP pressed    |\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u5c0f\u6280\u5de7"}),"\n",(0,t.jsx)(n.p,{children:"\u6240\u6709press-threshold-microvolt\u503c\u9700\u5747\u5c0f\u4e8ekeyup-threshold-microvolt\uff0c\u5e76\u4e14press-threshold-microvolt\u95f4\u9700\u5747\u4e0d\u76f8\u540c"}),"\n",(0,t.jsx)(n.h3,{id:"15-\u6d4b\u8bd5\u6307\u5357",children:"1.5. \u6d4b\u8bd5\u6307\u5357"}),"\n",(0,t.jsx)(n.p,{children:"\u5728shell\u4e2d\u76f4\u63a5\u8fd0\u884ctest_keyadc\u5373\u53ef"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"[aic@] # test_keyadc -h\nUsage: test_keyadc [options]:\n-d, --device    The name of event device\n-h, --usage\n\nExample: test_keyadc -d event0\n"})}),"\n",(0,t.jsx)(n.p,{children:"test_keyadc\u7684\u4f7f\u7528\u793a\u4f8b\uff1a"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"[aic@] # test_keyadc -d event0\nkey up pressed\nkey left pressed\nkey right pressed\nkey down pressed\n"})})]})}function a(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>d,a:()=>l});var t=i(7294);const r={},s=t.createContext(r);function l(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);