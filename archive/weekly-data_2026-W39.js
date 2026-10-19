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
  weekLabel: "2026 年第 39 周",
  window:    "2026-09-21 ~ 09-27",
  published: "2026-09-21",
  dataAsOf:  "2026-09-21",

  /* ===== 客户区：本周解读（三段）===== */
  oneLiner: "海峡复航被伊朗明确排除、9/13 过峡仅 8 艘，<b>BLPG3 单周 +$29K 至 $194K/天再创阶段新高</b>（$320.71/吨，Baltic 第 38 周）——10 月即期运力近乎售罄；巴拿马 32 闸次 9/15 已落地，美出口单周反弹重回 2.2M 上方。",
  clientNote: "对租家：巴拿马 32 闸次已生效，Neopanamax 拍卖评估仍在 $2M 上方（Argus 9/1 $2.15M），好望角已占美亚 LPG 航线约 43%（Vortexa），Q4 舱位<b>提前 4-6 周锁定</b>不动摇；对船东：即期再创阶段新高、10 月运力近乎售罄，一年期租跟涨，<b>高价长约该签就签</b>，但 2027 年起 VLAC 交付潮临近，高位兑现窗口要珍惜。",
  actionNote: "本周重点盯三件事：一是 9/23 EIA 出口能否站稳 2.2M（单周反弹至 2.21M，持续性待确认）；二是 10/1 沙特 10 月 CP（9 月丙烷 $625，若续涨将抬升远东到岸成本）；三是 32 闸次落地后拍卖价与排队走向——厄尔尼诺预警加强，拍卖价若再破 $5.3M 纪录，绕行将彻底固化。",

  /* ===== 七个信号 =====
   * state: bull=支撑运价 / bear=压制运价 / neu=中性观望
   * chgVal: 周环比方向，正数涨/负数跌/0平（仅控制箭头颜色）
   * auto: true=公开源自动拉取 / false=人工录入
   */
  signals: [
    {
      name: "BLPG3 即期 TCE",
      value: "$194K", unit: "/天",
      chg: "+$29K（Baltic 第 38 周评估 $320.71/吨，再创阶段新高）", chgVal: 1,
      state: "bull",
      bullLine: "跌破 $60K/天 且连跌 4 周",
      bearLine: "站稳 $150K 进入 Q4 ✔ 已触发",
      source: "Baltic Exchange 周度评估",
      auto: false, updated: "09-18"
    },
    {
      name: "霍尔木兹日通行量",
      value: "8", unit: "艘/天",
      chg: "9/13 读数 8 艘（基准 85）；伊朗排除复航，VLCC 战争险约 40 倍", chgVal: 0,
      state: "bull",
      bullLine: "连续两周 >60 艘/天",
      bearLine: "再度降至个位数 + 战争险费率反弹 ✔ 持续",
      source: "straits.live / Kpler AIS",
      auto: true, updated: "09-21"
    },
    {
      name: "巴拿马拍卖价 / 排队量",
      value: "$2.15M", unit: "· 队列 131 艘",
      chg: "9/15 起日闸次 32 已生效；Argus 9/1 Neopanamax 评估 $2.15M（8/27 曾 $3.1M）", chgVal: 1,
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
      value: "2.21", unit: "M桶/天",
      chg: "+0.25（周止 09-11，EIA 9/16 发布；重回 2.2M 上方）", chgVal: 1,
      state: "bull",
      bullLine: "连续 4 周 <1.8M桶/天",
      bearLine: "码头扩建超预期 + 持续 >2.2M ✔ 已触发",
      source: "EIA 周度 / Vortexa",
      auto: true, updated: "09-16"
    },
    {
      name: "中国 PDH 开工率",
      value: "71.9", unit: "%",
      chg: "持平（最新公开读数仍为 8/28 当周 71.89%，中泰/卓创；未见新周报）", chgVal: 0,
      state: "bull",
      bullLine: "利润深度负值（<-$50/吨）+ 开工率回落",
      bearLine: "2026 年 3 套新 PDH 如期满产",
      source: "行业周度开工数据",
      auto: false, updated: "09-03"
    },
    {
      name: "新签订单节奏",
      value: "72", unit: "艘（2026 累计）",
      chg: "0（累计维持 72；Dynacom 恒力 8 艘混合单含 VLAC 但未披露艘数，暂未计入）", chgVal: 0,
      state: "bear",
      bullLine: "——（订单是 2027+ 利空，非当期）",
      bearLine: "订单簿/船队突破 35%（当前约 31%）",
      source: "Clarksons / TradeWinds",
      auto: false, updated: "09-21"
    }
  ],

  /* ===== 近 12 周历史（趋势图用，每周往后推一格）===== */
  hist: {
    weeks:    ["W28","W29","W30","W31","W32","W33","W34","W35","W36","W37","W38","W39"],
    tce:      [131000, 127000, 139000, 142000, 149000, 156000, 152000, 154000, 156000, 167000, 165000, 194000],
    hormuz:   [7, 4, 3, 5, 4, 3, 4, 5, 3, 6, 6, 8],
    usExport: [2.18, 2.12, 2.25, 2.31, 2.28, 2.40, 2.33, 2.29, 2.31, 2.15, 1.96, 2.21]
  }
};
