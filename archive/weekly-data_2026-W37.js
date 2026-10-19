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
  weekLabel: "2026 年第 37 周",
  window:    "2026-09-07 ~ 09-13",
  published: "2026-09-08",
  dataAsOf:  "2026-09-08",

  /* ===== 客户区：本周解读（三段）===== */
  oneLiner: "海峡通行仍是个位数（08-30 仅 6 艘），<b>BLPG3 TCE 升至 $167K/天</b>（$283.33/吨，Baltic 第 36 周评估）——多头逻辑（双封锁+旺季临近）未被证伪，巴拿马 9/15 起日闸次降至 32，运河引擎重新点火。",
  clientNote: "对租家：运河拍卖 8 月均价已约 <b>$1.1M</b>、无预约船舶等待超 10 天，Q4 舱位建议<b>提前 4-6 周锁定</b>并核算好望角绕行成本；对船东：2026 年新签已至 72 艘、连 2030 年交付船都被下单（Dorian 9/4），<b>高价位长约该签就签</b>，不要赌即期再翻倍。",
  actionNote: "本周重点盯三件事：一是 9/15 巴拿马日闸次正式降至 32 后拍卖价能否守住 $1M 上方；二是 9/10 EIA 周度出口能否重回 2.2M 桶/天上方；三是 10/1 沙特 10 月 CP——9 月 $625 已止跌回升，若续涨说明实货端比盘面更紧。",

  /* ===== 七个信号 =====
   * state: bull=支撑运价 / bear=压制运价 / neu=中性观望
   * chgVal: 周环比方向，正数涨/负数跌/0平（仅控制箭头颜色）
   * auto: true=公开源自动拉取 / false=人工录入
   */
  signals: [
    {
      name: "BLPG3 即期 TCE",
      value: "$167K", unit: "/天",
      chg: "+$11.6K（Baltic 第 36 周评估 $283.33/吨）", chgVal: 1,
      state: "bull",
      bullLine: "跌破 $60K/天 且连跌 4 周",
      bearLine: "站稳 $150K 进入 Q4 ✔ 已触发",
      source: "Baltic Exchange 周度评估",
      auto: false, updated: "09-04"
    },
    {
      name: "霍尔木兹日通行量",
      value: "6", unit: "艘/天",
      chg: "持平个位数（08-30 读数；基准 85 艘/天，复航无实质进展）", chgVal: 0,
      state: "bull",
      bullLine: "连续两周 >60 艘/天",
      bearLine: "再度降至个位数 + 战争险费率反弹 ✔ 持续",
      source: "straits.live / Kpler AIS",
      auto: true, updated: "09-05"
    },
    {
      name: "巴拿马拍卖价 / 排队量",
      value: "$1.1M", unit: "· 队列 131 艘",
      chg: "8 月拍卖均价约 $1.1M（FT 引 Argus）；9/15 起日闸次降至 32", chgVal: 1,
      state: "bull",
      bullLine: "拍卖价 <$200K 且队列 <90 艘",
      bearLine: "日通行量进一步削减（<32 艘）",
      source: "ACP 公告 + 拍卖结果",
      auto: true, updated: "09-03"
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
      value: "2.15", unit: "M桶/天",
      chg: "+0.14（周止 08-28，EIA 9/2 发布；仍处高位区）", chgVal: 1,
      state: "bull",
      bullLine: "连续 4 周 <1.8M桶/天",
      bearLine: "码头扩建超预期 + 持续 >2.2M ✔ 已触发",
      source: "EIA 周度 / Vortexa",
      auto: true, updated: "09-02"
    },
    {
      name: "中国 PDH 开工率",
      value: "72.9", unit: "%",
      chg: "+1.4pp（8 月月均，隆众；利润向好驱动重启）", chgVal: 1,
      state: "bull",
      bullLine: "利润深度负值（<-$50/吨）+ 开工率回落",
      bearLine: "2026 年 3 套新 PDH 如期满产",
      source: "行业周度开工数据",
      auto: false, updated: "08-31"
    },
    {
      name: "新签订单节奏",
      value: "72", unit: "艘（2026 累计）",
      chg: "+5（7 月末 67 → 72：Union 2 艘 VLAC + Dorian 3 艘 VLGC）", chgVal: 1,
      state: "bear",
      bullLine: "——（订单是 2027+ 利空，非当期）",
      bearLine: "订单簿/船队突破 35%（当前约 31%）",
      source: "Clarksons / TradeWinds",
      auto: false, updated: "09-04"
    }
  ],

  /* ===== 近 12 周历史（趋势图用，每周往后推一格）===== */
  hist: {
    weeks:    ["W26","W27","W28","W29","W30","W31","W32","W33","W34","W35","W36","W37"],
    tce:      [118000, 124000, 131000, 127000, 139000, 142000, 149000, 156000, 152000, 154000, 156000, 167000],
    hormuz:   [6, 5, 7, 4, 3, 5, 4, 3, 4, 5, 3, 6],
    usExport: [2.05, 2.10, 2.18, 2.12, 2.25, 2.31, 2.28, 2.40, 2.33, 2.29, 2.31, 2.15]
  }
};
