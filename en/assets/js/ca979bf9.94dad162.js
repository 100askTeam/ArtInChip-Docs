"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3711],{317:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>c,contentTitle:()=>o,default:()=>a,frontMatter:()=>_,metadata:()=>t,toc:()=>s});var r=i(5893),d=i(1151);const _={sidebar_position:7},o="U-Boot \u9636\u6bb5",t={id:"D213-DevKit/part5/03-7_U-BootStage",title:"U-Boot \u9636\u6bb5",description:"U-Boot \u5728 Artinchip \u5e73\u53f0\u4e0a\u627f\u62c5\u4e24\u4e2a\u529f\u80fd\u89d2\u8272\uff1a",source:"@site/docs/D213-DevKit/part5/03-7_U-BootStage.md",sourceDirName:"D213-DevKit/part5",slug:"/D213-DevKit/part5/03-7_U-BootStage",permalink:"/en/docs/D213-DevKit/part5/03-7_U-BootStage",draft:!1,unlisted:!1,editUrl:"https://github.com/100askTeam/ArtInChip-Docs/tree/master/docs/D213-DevKit/part5/03-7_U-BootStage.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"d213dkSidebar",previous:{title:"SPL \u9636\u6bb5",permalink:"/en/docs/D213-DevKit/part5/03-6_SPLStage"},next:{title:"\u9a71\u52a8\u652f\u6301",permalink:"/en/docs/D213-DevKit/part5/03-8_DriverSupport"}},c={},s=[{value:"1. \u524d\u521d\u59cb\u5316",id:"1-\u524d\u521d\u59cb\u5316",level:2},{value:"2. \u4ee3\u7801\u91cd\u5b9a\u4f4d",id:"2-\u4ee3\u7801\u91cd\u5b9a\u4f4d",level:2},{value:"3. \u540e\u521d\u59cb\u5316",id:"3-\u540e\u521d\u59cb\u5316",level:2},{value:"4. \u73af\u5883\u53d8\u91cf\u52a0\u8f7d\u5982\u524d\u9762\u6240\u8ff0\uff0c\u73af\u5883\u53d8\u91cf\u7684\u5904\u7406\u6709\u4e24\u4e2a\u9636\u6bb5\uff1a",id:"4-\u73af\u5883\u53d8\u91cf\u52a0\u8f7d\u5982\u524d\u9762\u6240\u8ff0\u73af\u5883\u53d8\u91cf\u7684\u5904\u7406\u6709\u4e24\u4e2a\u9636\u6bb5",level:2},{value:"5. \u547d\u4ee4\u884c\u9636\u6bb5",id:"5-\u547d\u4ee4\u884c\u9636\u6bb5",level:2}];function l(n){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,d.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h1,{id:"u-boot-\u9636\u6bb5",children:"U-Boot \u9636\u6bb5"}),"\n",(0,r.jsx)(e.p,{children:"U-Boot \u5728 Artinchip \u5e73\u53f0\u4e0a\u627f\u62c5\u4e24\u4e2a\u529f\u80fd\u89d2\u8272\uff1a"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5f15\u5bfc\u5185\u6838"}),"\n",(0,r.jsx)(e.li,{children:"\u955c\u50cf\u70e7\u5f55"}),"\n"]}),"\n",(0,r.jsxs)(e.p,{children:["\u672c\u7ae0\u91cd\u70b9\u63cf\u8ff0 U-Boot \u8fd9\u4e00\u7ea7\u5f15\u5bfc\u7a0b\u5e8f\u7684\u4e3b\u8981\u542f\u52a8\u6d41\u7a0b\u4ee5\u53ca\u5728\u4e0d\u540c\u542f\u52a8\u4ecb\u8d28\u4e0b\u7684\u5904\u7406\u3002 \u955c\u50cf\u70e7\u5f55\u529f\u80fd\u5c06\u5728 ",(0,r.jsx)(e.a,{href:"../fw_upg/index.html#ref-fw-upgrade",children:"\u955c\u50cf\u70e7\u5f55"})," \u7ae0\u8282\u8fdb\u884c\u63cf\u8ff0\u3002"]}),"\n",(0,r.jsx)(e.h2,{id:"1-\u524d\u521d\u59cb\u5316",children:"1. \u524d\u521d\u59cb\u5316"}),"\n",(0,r.jsx)(e.p,{children:"U-Boot \u7684\u524d\u521d\u59cb\u5316\u662f\u6307\u6267\u884c\u4ee3\u7801\u91cd\u5b9a\u4f4d\u4e4b\u524d\u7684\u521d\u59cb\u5316\uff0c\u6b64\u65f6 U-Boot \u5728 DRAM \u7684\u524d\u7aef\u7a7a\u95f4\u6267\u884c\u3002"}),"\n",(0,r.jsx)(e.p,{children:"\u524d\u521d\u59cb\u5316\u5206\u4e3a\u4e24\u4e2a\u9636\u6bb5\uff1a"}),"\n",(0,r.jsxs)(e.blockquote,{children:["\n",(0,r.jsxs)(e.ol,{children:["\n",(0,r.jsx)(e.li,{children:"\u82af\u7247\u67b6\u6784\u76f8\u5173\u7684\u521d\u59cb\u5316\u4ee3\u7801"}),"\n",(0,r.jsx)(e.li,{children:"\u677f\u5b50\u76f8\u5173\u7684\u524d\u521d\u59cb\u5316\u4ee3\u7801"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.strong,{children:"\u9636\u6bb5\u4e00\uff1a"})," \u82af\u7247\u67b6\u6784\u76f8\u5173\u521d\u59cb\u5316"]}),"\n",(0,r.jsxs)(e.p,{children:["\u8fd9\u4e2a\u9636\u6bb5\u4e3b\u8981\u662f\u5bf9 CPU \u8fdb\u884c\u4e86\u57fa\u672c\u7684\u521d\u59cb\u5316\uff0c\u5e76\u4e14\u5c06\u4e0a\u4e00\u7ea7\u5f15\u5bfc\u7a0b\u5e8f\u4f20\u9012\u8fc7\u6765\u7684\u53c2\u6570\u4fdd\u5b58\u8d77\u6765\u3002 ArtInChip \u5e73\u53f0\u4e0a\u5b9e\u73b0\u4e86\u5bf9\u5e94\u7684 ",(0,r.jsx)(e.code,{children:"save_boot_params"})," \u5904\u7406\u51fd\u6570\uff0c\u5e76\u4e14\u5c06\u8c03\u7528\u73b0\u573a\u7684\u5173\u952e\u5bc4\u5b58\u5668\u4fe1\u606f\u4fdd\u5b58\u5230 ",(0,r.jsx)(e.code,{children:"boot_params_stash"})," \u5168\u5c40\u53d8\u91cf\u4e2d\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"_start // arch/riscv/cpu/start.S\n|-> save_boot_params // arch/riscv/mach-artinchip/lowlevel_init.S\n|   // BROM \u6216\u8005 SPL \u8df3\u8f6c\u5230 U-Boot \u6267\u884c\u7684\u65f6\u5019\uff0c\u4f20\u9012\u4e86\u4e00\u4e9b\u53c2\u6570\uff0c\u8fd9\u91cc\u9996\u5148\u5c06\u8fd9\n|   // \u4e9b\u53c2\u6570\u4fdd\u5b58\u8d77\u6765\u3002\n|\n|-> la  t0, trap_entry // \u8bbe\u7f6e\u5f02\u5e38\u5904\u7406\n|-> li  t1, CONFIG_SYS_INIT_SP_ADDR // \u8bbe\u7f6e\u521d\u59cb\u6808\n|-> jal     board_init_f_alloc_reserve\n|-> jal harts_early_init\n"})}),"\n",(0,r.jsx)(e.p,{children:"\u540e\u7eed\u7684\u7a0b\u5e8f\u5728\u9700\u8981\u4e86\u89e3\u5f53\u524d\u7684\u542f\u52a8\u4ecb\u8d28\u65f6\uff0c\u53ef\u4ee5\u4ece\u4e2d\u8bfb\u53d6\u76f8\u5173\u7684\u4fe1\u606f\u3002"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.strong,{children:"\u9636\u6bb5\u4e8c\uff1a"})," \u677f\u5b50\u76f8\u5173\u7684\u524d\u521d\u59cb\u5316"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"_start // arch/riscv/cpu/start.S\n|-> save_boot_params // arch/riscv/mach-artinchip/lowlevel_init.S\n|-> ...\n|-> la  t5, board_init_f\n"})}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"board_init_f()"})," \u51fd\u6570\u5185\u9010\u4e2a\u8c03\u7528\u521d\u59cb\u5316\u51fd\u6570\u5217\u8868 ",(0,r.jsx)(e.code,{children:"init_sequence_f"})," \u4e2d\u7684\u51fd\u6570\uff1a"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"static const init_fnc_t init_sequence_f[] = {\n    setup_mon_len,\n#ifdef CONFIG_OF_CONTROL\n    fdtdec_setup,\n#endif\n    initf_malloc,\n    log_init,\n    initf_bootstage,        /* uses its own timer, so does not need DM */\n    setup_spl_handoff,\n    initf_console_record,\n    arch_cpu_init,          /* basic arch cpu dependent setup */\n    mach_cpu_init,          /* SoC/machine dependent CPU setup */\n    initf_dm,\n    arch_cpu_init_dm,\n#if defined(CONFIG_BOARD_EARLY_INIT_F)\n    board_early_init_f,\n#endif\n    env_init,               /* initialize environment */\n    init_baud_rate,         /* initialze baudrate settings */\n    serial_init,            /* serial communications setup */\n    console_init_f,         /* stage 1 init of console */\n    display_options,        /* say that we are here */\n    display_text_info,      /* show debugging info if required */\n    INIT_FUNC_WATCHDOG_INIT\n#if defined(CONFIG_MISC_INIT_F)\n    misc_init_f,\n#endif\n    INIT_FUNC_WATCHDOG_RESET\n#if defined(CONFIG_SYS_I2C)\n    init_func_i2c,\n#endif\n    announce_dram_init,\n    dram_init,              /* configure available RAM banks */\n    setup_dest_addr,\n    reserve_round_4k,\n#ifdef CONFIG_ARM\n    reserve_mmu,\n#endif\n    reserve_video,\n    reserve_trace,\n    reserve_uboot,\n    reserve_malloc,\n    reserve_board,\n    setup_machine,\n    reserve_global_data,\n    reserve_fdt,\n    reserve_bootstage,\n    reserve_bloblist,\n    reserve_arch,\n    reserve_stacks,\n    dram_init_banksize,\n    show_dram_config,\n    display_new_sp,\n#ifdef CONFIG_OF_BOARD_FIXUP\n    fix_fdt,\n#endif\n    INIT_FUNC_WATCHDOG_RESET\n    reloc_fdt,\n    reloc_bootstage,\n    reloc_bloblist,\n    setup_reloc,\n    NULL,\n};\n"})}),"\n",(0,r.jsxs)(e.p,{children:["\u7531\u4e8e DRAM \u5728 PBP \u9636\u6bb5\u5df2\u7ecf\u521d\u59cb\u5316\uff0c\u8fd9\u91cc\u7684 ",(0,r.jsx)(e.code,{children:"dram_init"})," \u53ea\u662f\u521d\u59cb\u5316 DRAM \u9a71\u52a8\uff0c \u7528\u4e8e\u83b7\u53d6 DRAM \u57fa\u672c\u4fe1\u606f\u3002"]}),"\n",(0,r.jsxs)(e.p,{children:["DTS \u76f8\u5173\u7684\u6d41\u7a0b\u53ef\u53c2\u8003 ",(0,r.jsx)(e.code,{children:"fdtdec_setup"})," \u548c ",(0,r.jsx)(e.code,{children:"initf_dm"})," \uff1a"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:'fdtdec_setup(); // lib/fdtdec.c\n|-> gd->fdt_blob = board_fdt_blob_setup(); // lib/fdtdec.c\n|   // \u5bf9\u4e8e U-Boot, DTB \u7684\u4f4d\u7f6e\u662f _end \u5f00\u59cb\u7684\u4f4d\u7f6e\uff0c\u6b64\u5904\u52a0\u8f7d dtb\n|-> fdtdec_prepare_fdt();\n    |-> fdt_check_header(gd->fdt_blob);\ninitf_dm(); // common/board_f.c\n|-> dm_init_and_scan(true); // drivers/core/root.c\n     |-> dm_init(IS_ENABLED(CONFIG_OF_LIVE)); // drivers/core/root.c\n     |-> dm_scan_platdata(pre_reloc_only=true);\n     |-> dm_extended_scan_fdt(gd->fdt_blob, pre_reloc_only=true);\n     |   |-> dm_scan_fdt(blob, pre_reloc_only);\n     |   |   |-> dm_scan_fdt_node(gd->dm_root, blob, 0, true);\n     |   |       |-> lists_bind_fdt(parent, offset_to_ofnode(offset), NULL,true);\n     |   |           |   // drivers/core/lists.c\n     |   |           |   // \u6b64\u9636\u6bb5\u4ec5\u5904\u7406\u8bbe\u7f6e\u4e86 "u-boot,dm-pre-reloc" \u7684\u5e76\u4e14\n     |   |           |   // \u5bf9\u5e94\u9a71\u52a8\u4e5f\u662f\u8bbe\u7f6e\u4e86 DM_FLAG_PRE_RELOC \u7684\u8bbe\u5907\u548c\u9a71\u52a8\u7684\u7ed1\u5b9a\n     |   |           |\n     |   |           |-> device_bind_with_driver_data(parent, entry, name,id->data,\n     |   |               |                            node, &dev);\n     |   |               |-> device_bind_common(...)\n     |   |                   |   // dev = calloc(1, sizeof(struct udevice));\n     |   |                   |   //\n     |   |                   |   // dev->platdata = platdata;\n     |   |                   |   // dev->driver_data = driver_data;\n     |   |                   |   // dev->name = name;\n     |   |                   |   // dev->node = node;\n     |   |                   |   // dev->parent = parent;\n     |   |                   |   // dev->driver = drv;\n     |   |                   |   // dev->uclass = uc;\n     |   |                   |   // \u521b\u5efa udevice\uff0c\u5e76\u5c06 driver \u6302\u4e0a\n     |   |                   |\n     |   |                   |-> uclass_bind_device(dev);\n     |   |-> dm_scan_fdt_ofnode_path("/clocks", pre_reloc_only);\n     |   |-> dm_scan_fdt_ofnode_path("/firmware", pre_reloc_only);\n     |-> dm_scan_other(pre_reloc_only);\n'})}),"\n",(0,r.jsx)(e.p,{children:"\u6b64\u9636\u6bb5\u5e76\u6ca1\u6709\u5bf9 DTS \u4e2d\u5217\u51fa\u7684\u6240\u6709\u8bbe\u5907\u548c\u9a71\u52a8\u8fdb\u884c\u521d\u59cb\u5316\u5904\u7406\uff0c\u4ec5\u5bf9\u6807\u8bb0\u4e86 \u201cu-boot,dm-pre-reloc\u201d \u7684\u8bbe\u5907\uff0c \u4ee5\u53ca\u9a71\u52a8\u4e2d\u6807\u8bb0\u4e86 DM_FLAG_PRE_RELOC \u7684\u9a71\u52a8\u8fdb\u884c\u5904\u7406\uff0c\u4ee5\u7f29\u77ed\u8fd9\u4e2a\u9636\u6bb5\u7684\u5904\u7406\u65f6\u95f4\u3002"}),"\n",(0,r.jsx)(e.p,{children:"\u6ce8\u610f"}),"\n",(0,r.jsx)(e.p,{children:"initf_dm \u548c initr_dm \u90fd\u4f1a\u641c\u7d22\u4e00\u904d DTB\uff0c\u82b1\u8d39\u7684\u65f6\u95f4\u6bd4\u8f83\u591a\uff0c\u5982\u679c\u8fd9\u91cc\u80fd\u591f\u8282\u7701\u641c\u7d22\u7684\u6570\u91cf\uff0c \u5bf9\u4e8e\u5feb\u901f\u542f\u52a8\u4f1a\u6709\u6bd4\u8f83\u5927\u7684\u5e2e\u52a9\u3002"}),"\n",(0,r.jsx)(e.h2,{id:"2-\u4ee3\u7801\u91cd\u5b9a\u4f4d",children:"2. \u4ee3\u7801\u91cd\u5b9a\u4f4d"}),"\n",(0,r.jsx)(e.p,{children:"\u901a\u5e38\u5185\u6838\u7684\u4ee3\u7801\u6bb5\u653e\u5728 DRAM \u7684\u5f00\u59cb\u4f4d\u7f6e\uff0cU-Boot \u7684\u4ee3\u7801\u4f4d\u7f6e\u653e\u5230 DRAM \u7684\u672b\u7aef\u3002 \u4f46\u662f\u7531\u4e8e\u4e0d\u540c\u9879\u76ee\u6240\u7528\u7684 DRAM \u5927\u5c0f\u4e0d\u4e00\u81f4\uff0c\u4e3a\u4e86\u65b9\u4fbf\uff0c\u5c06 U-Boot \u7684\u94fe\u63a5\u5730\u5740\u4e5f\u5b9a\u4e49\u5728 DRAM \u6bd4\u8f83\u524d\u9762\u7684\u56fa\u5b9a\u4f4d\u7f6e\u3002\u5728\u52a0\u8f7d U-Boot \u521d\u59cb\u5316\u5b8c DRAM \u4e4b\u540e\uff0cU-Boot \u8bfb\u53d6\u5f53\u524d\u5e73\u53f0\u7684 DRAM \u5927\u5c0f\uff0c \u7136\u540e\u5728\u52a0\u8f7d Kernel \u4e4b\u524d\u5c06\u81ea\u8eab\u4ee3\u7801\u6bb5\u548c\u6570\u636e\u6bb5\u7b49\u4fe1\u606f\u91cd\u5b9a\u4f4d\u5230 DRAM \u7684\u672b\u7aef\u7ee7\u7eed\u8fd0\u884c\uff0c \u5c06 DRAM \u7684\u524d\u7aef\u7a7a\u95f4\u8ba9\u7ed9 Kernel\u3002"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"_start // arch/riscv/cpu/start.S\n|-> save_boot_params // arch/riscv/mach-artinchip/lowlevel_init.S\n|-> ...\n|-> board_init_f(); // common/board_f.c\n    |-> setup_reloc(); // common/board_f.c\n    |-> jump_to_copy(); // common/board_f.c\n        |-> relocate_code(); // arch/riscv/cpu/start.S\n            |       // RISCV \u4e0a\u7684\u5b9e\u73b0\uff0crelocate \u4e4b\u540e\uff0c\u51fd\u6570\u4e0d\u8fd4\u56de\uff0c\u76f4\u63a5\u8df3\u8f6c\u5230 board_init_r \u6267\u884c\n            |-> invalidate_icache_all()\n            |-> flush_dcache_all()\n            |-> board_init_r();\n"})}),"\n",(0,r.jsxs)(e.p,{children:["\u91cd\u5b9a\u4f4d\u7684\u5177\u4f53\u4f4d\u7f6e ",(0,r.jsx)(e.code,{children:"gd->relocaddr"})," \u7684\u8ba1\u7b97\u53ef\u67e5\u770b ",(0,r.jsx)(e.code,{children:"common/board_f.c"})," \uff1a"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"static const init_fnc_t init_sequence_f[] = {\n    ...\n    setup_dest_addr,\n    reserve_round_4k,\n    reserve_mmu,\n    reserve_video,\n    reserve_trace,\n    reserve_uboot,\n    ...\n    setup_reloc,\n    NULL,\n};\n"})}),"\n",(0,r.jsxs)(e.p,{children:["\u6700\u7ec8 ",(0,r.jsx)(e.code,{children:"gd->reloc_off"})," \u7684\u8ba1\u7b97\uff0c\u5728 ",(0,r.jsx)(e.code,{children:"setup_reloc"})," \u4e2d\u5b8c\u6210\u3002"]}),"\n",(0,r.jsx)(e.p,{children:"\u6ce8\u89e3"}),"\n",(0,r.jsx)(e.p,{children:"\u5982\u679c CONFIG_SYS_TEXT_BASE == relocation address\uff0c\u5219\u4e0d\u9700\u8981\u505a\u91cd\u5b9a\u4f4d\u7684\u5de5\u4f5c\uff0c \u53ef\u4ee5\u8282\u7701\u542f\u52a8\u65f6\u95f4\u3002\u8fd9\u4e2a\u9700\u8981\u6839\u636e\u5f53\u524d\u9879\u76ee\u7684 DRAM \u5927\u5c0f\u8fdb\u884c\u8ba1\u7b97 CONFIG_SYS_TEXT_BASE \u7684\u503c\u3002"}),"\n",(0,r.jsx)(e.h2,{id:"3-\u540e\u521d\u59cb\u5316",children:"3. \u540e\u521d\u59cb\u5316"}),"\n",(0,r.jsxs)(e.p,{children:["\u540e\u521d\u59cb\u5316\u9636\u6bb5\u662f\u4ee3\u7801\u91cd\u5b9a\u4f4d\u4e4b\u540e\u6267\u884c\u7684\u521d\u59cb\u5316\u6d41\u7a0b\uff0c\u7531\u4e0b\u9762\u7684 ",(0,r.jsx)(e.code,{children:"board_init_r"})," \u5f00\u59cb\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"_start // arch/riscv/cpu/start.S\n|-> save_boot_params // arch/riscv/mach-artinchip/lowlevel_init.S\n|-> ...\n|-> board_init_f(); // common/board_f.c\n    |-> setup_reloc(); // common/board_f.c\n    |-> jump_to_copy(); // common/board_f.c\n        |-> relocate_code(); // arch/riscv/cpu/start.S\n            |       // RISCV \u4e0a\u7684\u5b9e\u73b0\uff0crelocate \u4e4b\u540e\uff0c\u51fd\u6570\u4e0d\u8fd4\u56de\uff0c\u76f4\u63a5\u8df3\u8f6c\u5230 board_init_r \u6267\u884c\n            |-> invalidate_icache_all()\n            |-> flush_dcache_all()\n            |-> board_init_r();\n"})}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"board_init_r"})," \u51fd\u6570\u4e2d\u9010\u4e2a\u6267\u884c\u51fd\u6570\u5217\u8868 ",(0,r.jsx)(e.code,{children:"init_sequence_r"})," \u4e2d\u7684\u521d\u59cb\u5316\u51fd\u6570\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"static init_fnc_t init_sequence_r[] = {\n    initr_trace,\n    initr_reloc,\n#ifdef CONFIG_ARM\n    initr_caches,\n#endif\n    initr_reloc_global_data,\n    initr_barrier,\n    initr_malloc,\n    log_init,\n    initr_bootstage,    /* Needs malloc() but has its own timer */\n    initr_console_record,\n#ifdef CONFIG_SYS_NONCACHED_MEMORY\n    initr_noncached,\n#endif\n    bootstage_relocate,\n#ifdef CONFIG_OF_LIVE\n    initr_of_live,\n#endif\n#ifdef CONFIG_DM\n    initr_dm,\n#endif\n#if defined(CONFIG_ARM) || defined(CONFIG_NDS32) || defined(CONFIG_RISCV) || \\\n    defined(CONFIG_SANDBOX)\n    board_init,    /* Setup chipselects */\n#endif\n    stdio_init_tables,\n    initr_serial,\n    initr_announce,\n#if CONFIG_IS_ENABLED(WDT)\n    initr_watchdog,\n#endif\n    INIT_FUNC_WATCHDOG_RESET\n#ifdef CONFIG_NEEDS_MANUAL_RELOC\n    initr_manual_reloc_cmdtable,\n#endif\n#ifdef CONFIG_ADDR_MAP\n    initr_addr_map,\n#endif\n#if defined(CONFIG_BOARD_EARLY_INIT_R)\n    board_early_init_r,\n#endif\n    INIT_FUNC_WATCHDOG_RESET\n#ifdef CONFIG_POST\n    initr_post_backlog,\n#endif\n    INIT_FUNC_WATCHDOG_RESET\n#ifdef CONFIG_ARCH_EARLY_INIT_R\n    arch_early_init_r,\n#endif\n    power_init_board,\n#ifdef CONFIG_MTD_NOR_FLASH\n    initr_flash,\n#endif\n    INIT_FUNC_WATCHDOG_RESET\n#ifdef CONFIG_CMD_NAND\n    initr_nand,\n#endif\n#ifdef CONFIG_CMD_ONENAND\n    initr_onenand,\n#endif\n#ifdef CONFIG_MMC\n    initr_mmc,\n#endif\n    initr_env,\n#ifdef CONFIG_SYS_BOOTPARAMS_LEN\n    initr_malloc_bootparams,\n#endif\n    INIT_FUNC_WATCHDOG_RESET\n    initr_secondary_cpu,\n#if defined(CONFIG_ID_EEPROM) || defined(CONFIG_SYS_I2C_MAC_OFFSET)\n    mac_read_from_eeprom,\n#endif\n    INIT_FUNC_WATCHDOG_RESET\n    stdio_add_devices,\n    initr_jumptable,\n#ifdef CONFIG_API\n    initr_api,\n#endif\n    console_init_r,        /* fully init console as a device */\n#ifdef CONFIG_DISPLAY_BOARDINFO_LATE\n    console_announce_r,\n    show_board_info,\n#endif\n#ifdef CONFIG_ARCH_MISC_INIT\n    arch_misc_init,        /* miscellaneous arch-dependent init */\n#endif\n#ifdef CONFIG_MISC_INIT_R\n    misc_init_r,        /* miscellaneous platform-dependent init */\n#endif\n    INIT_FUNC_WATCHDOG_RESET\n    interrupt_init,\n#ifdef CONFIG_ARM\n    initr_enable_interrupts,\n#endif\n#ifdef CONFIG_CMD_NET\n    initr_ethaddr,\n#endif\n#ifdef CONFIG_BOARD_LATE_INIT\n    board_late_init,\n#endif\n#ifdef CONFIG_CMD_NET\n    INIT_FUNC_WATCHDOG_RESET\n    initr_net,\n#endif\n#ifdef CONFIG_POST\n    initr_post,\n#endif\n#if defined(CONFIG_PRAM)\n    initr_mem,\n#endif\n    run_main_loop,\n};\n"})}),"\n",(0,r.jsx)(e.p,{children:"\u5176\u4e2d\u4e0b\u9762\u51e0\u4e2a\u91cd\u8981\u7684\u9636\u6bb5\u9700\u8981\u7559\u610f\u3002"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:'board_init_r();\n|\n|-> initr_dm  // \u521d\u59cb\u5316\u8bbe\u5907\u9a71\u52a8\uff0c\u8fd9\u6b21\u626b\u63cf\u6240\u6709\u7684\u8bbe\u5907\uff0c\u5e76\u4e14\u7ed1\u5b9a\u5230\u5339\u914d\u7684\u9a71\u52a8\u4e0a\n|   |-> dm_init_and_scan(false);\n|       |-> dm_init(IS_ENABLED(CONFIG_OF_LIVE)); // drivers/core/root.c\n|       |-> dm_scan_platdata(pre_reloc_only=true);\n|       |-> dm_extended_scan_fdt(gd->fdt_blob, pre_reloc_only=true);\n|       |-> dm_scan_other(pre_reloc_only);\n|\n|-> initr_flash // SPI NOR \u7684\u521d\u59cb\u5316\n|   |-> flash_size = flash_init();\n|\n|-> initr_nand  // RAW NAND \u7684\u521d\u59cb\u5316\n|-> initr_mmc\n|   |-> mmc_initialize(gd->bd);\n|\n|-> initr_env\n|   |-> env_relocate(); // env/common.c\n|       |-> env_load(); // env/env.c\n|\n|-> stdio_add_devices();\n|\n|-> board_late_init(); // board/artinchip/d211/d211.c\n    |-> setup_boot_device();\n        |-> env_set("boot_device", "mmc");\n'})}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"Cache Enable"})}),"\n",(0,r.jsx)(e.p,{children:"RISCV \u4e0a\uff0cU-Boot \u8fd0\u884c\u5728 S-Mode\uff0c\u6ca1\u6709\u6743\u9650\u5f00\u5173 Cache\uff0c\u56e0\u6b64\u53ea\u80fd\u7531 SPL \u6765\u5f00\u5173 Cache\u3002"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"Device Model"})}),"\n",(0,r.jsx)(e.p,{children:"\u5728\u540e\u521d\u59cb\u5316\u9636\u6bb5\uff0c\u4f1a\u626b\u63cf\u6240\u6709\u7684\u8bbe\u5907\u548c\u9a71\u52a8\uff0c\u5e76\u4e14\u5c06\u8bbe\u5907\u548c\u5bf9\u5e94\u7684\u9a71\u52a8\u8fdb\u884c\u7ed1\u5b9a\u3002"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"\u5b58\u50a8\u4ecb\u8d28\u7684\u521d\u59cb\u5316"})}),"\n",(0,r.jsx)(e.p,{children:"NOR/NAND/MMC \u7b49\u5b58\u50a8\u4ecb\u8d28\u7684\u9a71\u52a8\u5728\u8fd9\u4e2a\u9636\u6bb5\u5f00\u59cb\u521d\u59cb\u5316\u3002"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"\u73af\u5883\u53d8\u91cf\u52a0\u8f7d"})}),"\n",(0,r.jsx)(e.p,{children:"\u73af\u5883\u53d8\u91cf\u4e2d\u4fdd\u5b58\u7740 U-Boot \u7684\u914d\u7f6e\uff0c\u4ee5\u53ca\u76f8\u5173\u7684\u542f\u52a8\u4fe1\u606f\uff0c\u6b64\u65f6\u9700\u8981\u4ece\u5bf9\u5e94\u7684\u5b58\u50a8\u4ecb\u8d28\u4e2d\u52a0\u8f7d\u4f7f\u7528\u3002"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"\u663e\u793a\u9a71\u52a8"})}),"\n",(0,r.jsxs)(e.p,{children:["\u5982\u679c\u9879\u76ee\u4f7f\u80fd\u4e86 U-Boot \u9636\u6bb5\u7684\u663e\u793a\uff0c\u6b64\u65f6\u5728 ",(0,r.jsx)(e.code,{children:"stdio_add_devices()"})," \u4e2d\u5bf9\u663e\u793a\u548c\u6309\u952e\u9a71\u52a8\u8fdb\u884c\u521d\u59cb\u5316\u3002"]}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"\u5176\u4ed6\u914d\u7f6e"})}),"\n",(0,r.jsxs)(e.p,{children:["\u5728 ",(0,r.jsx)(e.code,{children:"board_late_init()"})," \u4e2d\uff0c\u5c06\u4ece SPL \u4f20\u9012\u8fc7\u6765\u7684\u542f\u52a8\u8bbe\u5907\u4fe1\u606f\uff0c\u66f4\u65b0\u5230\u73af\u5883\u53d8\u91cf\u4e2d\uff0c\u4f7f\u5f97\u540e\u7eed\u7684\u542f\u52a8\u811a\u672c \u53ef\u4ee5\u83b7\u77e5\u5f53\u524d\u7684\u542f\u52a8\u8bbe\u5907\u4fe1\u606f\u3002"]}),"\n",(0,r.jsx)(e.h2,{id:"4-\u73af\u5883\u53d8\u91cf\u52a0\u8f7d\u5982\u524d\u9762\u6240\u8ff0\u73af\u5883\u53d8\u91cf\u7684\u5904\u7406\u6709\u4e24\u4e2a\u9636\u6bb5",children:"4. \u73af\u5883\u53d8\u91cf\u52a0\u8f7d\u5982\u524d\u9762\u6240\u8ff0\uff0c\u73af\u5883\u53d8\u91cf\u7684\u5904\u7406\u6709\u4e24\u4e2a\u9636\u6bb5\uff1a"}),"\n",(0,r.jsxs)(e.blockquote,{children:["\n",(0,r.jsxs)(e.ol,{children:["\n",(0,r.jsx)(e.li,{children:"\u73af\u5883\u53d8\u91cf\u521d\u59cb"}),"\n",(0,r.jsx)(e.li,{children:"\u73af\u5883\u53d8\u91cf\u8bfb\u53d6"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.p,{children:["\u5982\u4e0b\u9762\u7684\u8c03\u7528\u6d41\u7a0b\uff0c ",(0,r.jsx)(e.code,{children:"env_init()"})," \u5728 ",(0,r.jsx)(e.code,{children:"board_init_f()"})," \u9636\u6bb5\u6267\u884c\uff0c\u4f46\u5177\u4f53\u7684\u52a0\u8f7d\u8fc7\u7a0b \u5728 ",(0,r.jsx)(e.code,{children:"board_init_r()"})," \u9636\u6bb5\u6267\u884c\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:'reset // arch/riscv/cpu/start.S\n|-> save_boot_params // arch/riscv/mach-artinchip/lowlevel_init.S\n|-> ...\n|-> board_init_f(); // common/board_f.c\n    |-> setup_reloc(); // common/board_f.c\n    |-> jump_to_copy(); // common/board_f.c\n        |-> relocate_code(); // arch/riscv/cpu/start.S\n            |-> invalidate_icache_all()\n            |-> flush_dcache_all()\n            |-> board_init_r();\n                |   // \u9010\u4e2a\u8c03\u7528 init_sequence_r \u91cc\u9762\u7684\u51fd\u6570\uff0c\u5176\u4e2d\u5305\u62ec initr_env\n                |-> initr_env(); // common/board_r.c\n                    |-> should_load_env(void);// common/board_r.c\n                    |   // \u7531\u4e8e\u6ca1\u6709\u5728 DTS \u4e2d\u8fdb\u884c\u914d\u7f6e\uff0c\u603b\u662f\u8fd4\u56de 1\n                    |   // fdtdec_get_config_int(gd->fdt_blob, "load-environment", 1);\n                    |-> env_relocate(); // env/common.c\n                        |-> env_load(); // env/env.c\n'})}),"\n",(0,r.jsx)(e.p,{children:"U-Boot \u652f\u6301\u5728\u591a\u79cd\u5b58\u50a8\u4ecb\u8d28\u4e2d\u4fdd\u5b58\u73af\u5883\u53d8\u91cf\uff0c\u5e76\u4e14\u63d0\u4f9b\u4e86\u4e00\u4e2a\u63d2\u62d4\u5f0f\u7684\u673a\u5236\uff0c\u7528\u4e8e\u5b9e\u73b0\u4ece \u4e0d\u540c\u7684\u5b58\u50a8\u4ecb\u8d28\u4e2d\u52a0\u8f7d\u73af\u5883\u53d8\u91cf\u5185\u5bb9\u3002"}),"\n",(0,r.jsxs)(e.p,{children:["\u5728\u6dfb\u52a0\u65b0\u7684\u73af\u5883\u53d8\u91cf\u52a0\u8f7d\u5668\u65f6\uff0c\u53ea\u9700\u8981\u5b9e\u73b0\u5bf9\u5e94\u5b58\u50a8\u4ecb\u8d28\u7684 ",(0,r.jsx)(e.code,{children:"load"})," \u548c ",(0,r.jsx)(e.code,{children:"save"})," \u51fd\u6570\uff0c \u7136\u540e\u901a\u8fc7\u5b8f ",(0,r.jsx)(e.code,{children:"U_BOOT_ENV_LOCATION"})," \u5c06\u5bf9\u5e94\u7684\u4fe1\u606f\u6dfb\u52a0\u5230 ",(0,r.jsx)(e.code,{children:".u_boot_list_2"})," \u94fe\u63a5\u6bb5\u4e2d\u3002 \u6bd4\u5982\u4e0b\u9762\u7684\u5b9a\u4e49\uff0c\u5c06\u751f\u6210 ",(0,r.jsx)(e.code,{children:".u_boot_list_2_env_driver_2_spinand"})," \u4fe1\u606f\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:'U_BOOT_ENV_LOCATION(spinand) = {\n    .location   = ENVL_SPINAND,\n    ENV_NAME("SPINAND")\n    .load       = env_spinand_load,\n#if defined(CMD_SAVEENV)\n    .save       = env_save_ptr(env_spinand_save),\n#endif\n};\n'})}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"env_driver_lookup()"})," \u51fd\u6570\u9996\u5148\u901a\u8fc7\u68c0\u67e5\u5f53\u524d\u7684\u542f\u52a8\u8bbe\u5907\uff0c\u7136\u540e\u4ece ",(0,r.jsx)(e.code,{children:".u_boot_list_2"})," \u6bb5\u4e2d\u67e5\u627e\u5bf9\u5e94\u542f\u52a8\u8bbe\u5907\u7684 ENV \u52a0\u8f7d\u9a71\u52a8\uff0c\u6700\u540e\u8c03\u7528\u5bf9\u5e94\u7684\u9a71\u52a8\u8bfb\u53d6\u5e76\u5bfc\u5165\u73af\u5883\u53d8\u91cf\u5185\u5bb9\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"env_load(); // env/env.c\n|-> env_driver_lookup(ENVOP_LOAD, prio);\n|   |-> loc = env_get_location(); // board/artinchip/d211/env_location.c\n|   |   |-> bd = aic_get_boot_device(); // \u83b7\u53d6\u5f53\u524d\u7684\u542f\u52a8\u8bbe\u5907\n|   |\n|   |-> _env_driver_lookup(loc);\n|       |-> drv = ll_entry_start();\n|       // \u67e5\u627e\u6307\u5b9a\u5b58\u50a8\u4ecb\u8d28\u7684 env \u52a0\u8f7d\u9a71\u52a8\n|\n|-> drv->load();\n        // \u6b64\u5904\u8c03\u7528\u4e2a\u5b58\u50a8\u4ecb\u8d28\u7684\u5bf9\u5e94\u51fd\u6570\n        env_ram_load(); // board/artinchip/d211/env_location.c\n        env_spinand_load(); // env/spinand.c\n        env_sf_load(); // env/sf.c\n        env_mmc_load(); // env/mmc.c\n"})}),"\n",(0,r.jsxs)(e.p,{children:["\u5177\u4f53\u5404\u79cd\u5b58\u50a8\u4ecb\u8d28\u4e2d\uff0c\u73af\u5883\u53d8\u91cf\u4fdd\u5b58\u7684\u4f4d\u7f6e\u53ef\u53c2\u8003 ",(0,r.jsx)(e.a,{href:"../env_setting/index.html#env-store-setting",children:"\u5b58\u50a8\u4ecb\u8d28\u4e0a\u7684\u4fdd\u5b58"})," \u3002"]}),"\n",(0,r.jsx)(e.h2,{id:"5-\u547d\u4ee4\u884c\u9636\u6bb5",children:"5. \u547d\u4ee4\u884c\u9636\u6bb5"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"board_init_r"})," \u51fd\u6570\u6700\u540e\u8fdb\u5165 ",(0,r.jsx)(e.code,{children:"run_main_loop"})," \u6267\u884c Autoboot \u547d\u4ee4\u6216\u8005\u8fdb\u5165\u63a7\u5236\u53f0\u3002"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:'board_init_r(); // common/board_r.c\n|-> run_main_loop(); // common/board_r.c\n    |-> main_loop(); // common/main.c\n        |-> cli_init();    // \u521d\u59cb\u5316 command line\n        |   |--\x3eu_boot_hush_start();\n        |\n        |-> bootdelay_process(); // common/autoboot.c\n        |   | // \u83b7\u53d6boot delay\u65f6\u95f4\u53c2\u6570\uff0c\u4eceenv\u4e2d\u83b7\u53d6bootcmd\u53c2\u6570\n        |   |-> s = env_get("bootcmd");\n        |           // \u83b7\u53d6 bootcmd \u7684\u5185\u5bb9\n        |-> cli_process_fdt(); // common/cli.c\n        |   // \u5c1d\u8bd5\u4ece DTS \u4e2d\u83b7\u53d6 bootcmd \u53c2\u6570\uff0cDTS \u7684\u914d\u7f6e\u4f18\u5148\u7ea7\u9ad8\u4e8e ENV\n        |-> autoboot_command(); // common/autoboot.c\n            |-> abortboot();\n            |   // \u68c0\u67e5\u662f\u5426\u9700\u8981\u7ec8\u6b62\u542f\u52a8\n            |\n            |-> run_command_list(); // common/cli.c\n                // \u6267\u884c bootcmd \u7684\u5185\u5bb9\uff0c\u4e00\u822c\u662f\u6267\u884c\u811a\u672c\n'})}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"\u5012\u8ba1\u65f6\u8bfb\u79d2"})}),"\n",(0,r.jsx)(e.p,{children:"\u8fdb\u5165\u547d\u4ee4\u884c\u7684\u4e3b\u5faa\u73af\u4e4b\u540e\uff0cU-Boot \u9996\u5148\u83b7\u53d6 boot delay \u7684\u65f6\u95f4\u8bbe\u7f6e\u3002Boot delay \u7684\u65f6\u95f4 \u662f\u6307 U-Boot \u5728\u6267\u884c\u542f\u52a8\u547d\u4ee4\u4e4b\u524d\u7684\u5012\u8ba1\u65f6\u8bfb\u79d2\u7684\u65f6\u95f4\uff0c\u8be5\u65f6\u95f4\u5728 ArtInChip \u5e73\u53f0\u4e0a\u5728\u73af\u5883\u53d8\u91cf env.txt \u4e2d\u8fdb\u884c\u914d\u7f6e:"}),"\n",(0,r.jsxs)(e.blockquote,{children:["\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.code,{children:"bootdelay=3"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.p,{children:"\u5982\u679c\u4e0d\u9700\u8981\u5012\u8ba1\u65f6\u8bfb\u79d2\uff0c\u53ef\u4ee5\u5c06\u8be5\u8bbe\u7f6e\u6539\u4e3a 0 \u3002"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"\u542f\u52a8\u547d\u4ee4"})}),"\n",(0,r.jsxs)(e.p,{children:["U-Boot \u68c0\u67e5\u5e76\u4e14\u9ed8\u8ba4\u6267\u884c ",(0,r.jsx)(e.code,{children:"bootcmd"})," \u6240\u6307\u5b9a\u7684\u542f\u52a8\u547d\u4ee4\u3002\u8be5\u542f\u52a8\u547d\u4ee4\u53ef\u4ee5\u5728\u4e24\u4e2a\u5730\u65b9\u8bbe\u7f6e\uff1a"]}),"\n",(0,r.jsxs)(e.blockquote,{children:["\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u73af\u5883\u53d8\u91cf\u4e2d\u8bbe\u7f6e"}),"\n",(0,r.jsx)(e.li,{children:"DTS \u4e2d\u8bbe\u7f6e"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.p,{children:"ArtInChip \u5e73\u53f0\u4e0a\u901a\u8fc7\u73af\u5883\u53d8\u91cf env.txt \u8bbe\u7f6e\uff0c\u540c\u884c\u662f\u4e00\u6bb5\u542f\u52a8\u811a\u672c\u3002"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"\u6309\u952e\u4e2d\u65ad"})}),"\n",(0,r.jsxs)(e.p,{children:["\u8fdb\u5165 ",(0,r.jsx)(e.code,{children:"autoboot_command"})," \u5728\u6267\u884c\u542f\u52a8\u547d\u4ee4\u4e4b\u524d\uff0cU-Boot \u8fd8\u4f1a\u68c0\u67e5\u7528\u6237\u662f\u5426\u6709\u901a\u8fc7\u4e32\u53e3 \u6309\u952e\u4e2d\u65ad\u542f\u52a8\u6d41\u7a0b\u3002\u8be5\u68c0\u67e5\u65e0\u8bba bootdelay \u65f6\u95f4\u662f\u5426\u4e3a 0 \u90fd\u4f1a\u8fdb\u884c\u3002"]})]})}function a(n={}){const{wrapper:e}={...(0,d.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(l,{...n})}):l(n)}},1151:(n,e,i)=>{i.d(e,{Z:()=>t,a:()=>o});var r=i(7294);const d={},_=r.createContext(d);function o(n){const e=r.useContext(_);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function t(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(d):n.components||d:o(n.components),r.createElement(_.Provider,{value:e},n.children)}}}]);