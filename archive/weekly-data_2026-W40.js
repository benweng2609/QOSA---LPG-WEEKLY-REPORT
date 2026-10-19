/* ============================================================
 * QOSA · LPG 七信号周报 —— 数据文件
 * 每周维护这一个文件即可，页面自动渲染。
 *
 * 【每周更新流程】
 *   1. 周五 Baltic Exchange 发布周度评估后，更新 BLPG3 读数与 hist 历史数组
 *   2. 对照下方阈值表，给每个信号填 state：bull(支撑运价) / bear(压制) / neu(中性)
 *   3. 改写 oneLiner / clientNote / actionNote 三段解读
 *   4. 更新 weekLabel / window / published / dataAsOf
 *   5. 保存后刷新页面即可；部署到线上的话重新上传本文件
 * ============================================================ */

window.WEEKLY = {

  /* ===== 期次信息 ===== */
  weekLabel: "2026 年第 40 周",
  window:    "2026-09-28 ~ 10-04",
  published: "2026-09-28",
  dataAsOf:  "2026-09-28",

  /* ===== 客户区：本周解读（三段）===== */
  oneLiner: "海峡局势再度恶化——9/20 过峡仅 1 艘、特朗普拒绝伊朗复航提案，<b>BLPG3 连涨至 $199K/天</b>（$324.00/吨，Baltic 第 39 周）；美出口连续两周站上 2.2M（2.47M），货多船少格局未改，唯 PDH 开工率单周骤降 6.8pp 露出需求端第一道裂缝。",
  clientNote: "对租家：海峡复航谈判破裂、9/20 过峡仅 1 艘，绕行固化加深；巴拿马 32 闸次运行两周，Q4 舱位<b>提前 4-6 周锁定</b>不动摇；对船东：BLPG3 连创阶段新高（$199K）、美出口 2.47M 续强，<b>高价长约该签就签</b>——但 PDH 开工率骤降 6.84pp（隆众 72.37%）且下周预计续降，中国丙烷进口需求边际转弱，是当前第一个需要盯的需求侧信号。",
  actionNote: "本周重点盯三件事：一是 10/1 沙特 10 月 CP 公布（9 月丙烷 $625，若续涨将抬升远东到岸成本，PDH 利润雪上加霜）；二是 PDH 开工率是否如隆众预告继续下滑（再降 3pp 以上则中国进口需求转弱确认）；三是 9/30 EIA 出口（连续两周 >2.2M，若维持则 Q4 美湾货盘无忧）。另：9 月订单潮累计 72→81 艘，2027+ 交付压力继续累积。",

  /* ===== 七个信号 =====
   * state: bull=支撑运价 / bear=压制运价 / neu=中性观望
   * chgVal: 周环比方向，正数涨/负数跌/0平（仅控制箭头颜色）
   * auto: true=公开源自动拉取 / false=人工录入
   */
  signals: [
    {
      name: "BLPG3 即期 TCE",
      value: "$199K", unit: "/天",
      chg: "+$5.5K（Baltic 第 39 周评估 $324.00/吨，再创阶段新高）", chgVal: 1,
      state: "bull",
      bullLine: "跌破 $60K/天 且连跌 4 周",
      bearLine: "站稳 $150K 进入 Q4 ✔ 已触发",
      source: "Baltic Exchange 周度评估",
      auto: false, updated: "09-25"
    },
    {
      name: "霍尔木兹日通行量",
      value: "1", unit: "艘/天",
      chg: "-7（9/20 PortWatch 读数仅 1 艘，基准 85；特朗普拒绝伊朗复航提案，海峡再现袭船）", chgVal: -1,
      state: "bull",
      bullLine: "连续两周 >60 艘/天",
      bearLine: "再度降至个位数 + 战争险费率反弹 ✔ 持续",
      source: "straits.live / Kpler AIS",
      auto: true, updated: "09-28"
    },
    {
      name: "巴拿马拍卖价 / 排队量",
      value: "$2.15M", unit: "· 队列 131 艘",
      chg: "32 闸次运行两周；无新公开拍卖读数（最新仍为 Argus 9/1 $2.15M）", chgVal: 0,
      state: "bull",
      bullLine: "拍卖价 <$200K 且队列 <90 艘",
      bearLine: "日通行量进一步削减（<32 艘）",
      source: "ACP 公告 + 拍卖结果",
      auto: true, updated: "09-15"
    },
    {
      name: "沙特 CP（每月 1 日）",
      value: "$625", unit: "/吨（丙烷，9月）",
      chg: "+$5（止跌回升，8 月 $620；丁烷 $660）", chgVal: 1,
      state: "neu",
      bullLine: "复航后 CP 快速回落至 $500 下方",
      bearLine: "CP 坚挺 + 对美湾价差走阔",
      source: "Aramco 公告（每月 1 日）",
      auto: false, updated: "09-01"
    },
    {
      name: "美国出口量",
      value: "2.47", unit: "M桶/天",
      chg: "+0.26（周止 09-18，EIA 9/23 发布；连续两周站上 2.2M）", chgVal: 1,
      state: "bull",
      bullLine: "连续 4 周 <1.8M桶/天",
      bearLine: "码头扩建超预期 + 持续 >2.2M ✔ 已触发",
      source: "EIA 周度 / Vortexa",
      auto: true, updated: "09-23"
    },
    {
      name: "中国 PDH 开工率",
      value: "72.4", unit: "%",
      chg: "-6.84pp（隆众截至 9/24 当周 72.37%，华东某二期停工；下周预计续降）", chgVal: -1,
      state: "bear",
      bullLine: "利润深度负值（<-$50/吨）+ 开工率回落",
      bearLine: "2026 年 3 套新 PDH 如期满产",
      source: "行业周度开工数据",
      auto: false, updated: "09-24"
    },
    {
      name: "新签订单节奏",
      value: "81", unit: "艘（2026 累计）",
      chg: "+9（Dynacom 恒力 6 艘 VLAC + Akrotiri 新时代 2 艘 VLAC + BGN 现代重工 1 艘 VLGC）", chgVal: 1,
      state: "bear",
      bullLine: "——（订单是 2027+ 利空，非当期）",
      bearLine: "订单簿/船队突破 35%（当前约 31%）",
      source: "Clarksons / TradeWinds",
      auto: false, updated: "09-28"
    }
  ],

  /* ===== 近 12 周历史（趋势图用，每周往后推一格）===== */
  hist: {
    weeks:    ["W29","W30","W31","W32","W33","W34","W35","W36","W37","W38","W39","W40"],
    tce:      [127000, 139000, 142000, 149000, 156000, 152000, 154000, 156000, 167000, 165000, 194000, 199000],
    hormuz:   [4, 3, 5, 4, 3, 4, 5, 3, 6, 6, 8, 1],
    usExport: [2.12, 2.25, 2.31, 2.28, 2.40, 2.33, 2.29, 2.31, 2.15, 1.96, 2.21, 2.47]
  }
};
