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
  weekLabel: "2026 年第 38 周",
  window:    "2026-09-14 ~ 09-20",
  published: "2026-09-14",
  dataAsOf:  "2026-09-14",

  /* ===== 客户区：本周解读（三段）===== */
  oneLiner: "9 月第一周海峡日均仅 3 艘过峡、复航谈判无限期推迟，<b>BLPG3 高位小幅回落至 $165K/天</b>（$281.57/吨，Baltic 第 37 周）——多头逻辑未被证伪；明日巴拿马日闸次正式降至 32，单闸纪录已被 LPG 船刷新至 $5.3M。",
  clientNote: "对租家：明日（9/15）起运河日闸次降至 32，SK Gas 为 LPG 船 G. Spirit 单闸支付 <b>$5.3M</b> 创历史纪录，Q4 舱位<b>提前 4-6 周锁定</b>不动摇，好望角绕行已成半数气体船选择；对船东：即期周跌 $1.9K 属高位喘息，一年期租仍在历史高位区，<b>高价长约该签就签</b>。",
  actionNote: "本周重点盯三件事：一是 9/15 闸次降至 32 后拍卖价与排队走向（再破 $5.3M 则绕行固化）；二是 9/16 EIA 出口能否止跌（上周回落至 1.96M，2.2M 持续线已失守）；三是复航谈判——阿曼称谈判无限期推迟，任何重启信号都是即期运价最大的空头触发器。",

  /* ===== 七个信号 =====
   * state: bull=支撑运价 / bear=压制运价 / neu=中性观望
   * chgVal: 周环比方向，正数涨/负数跌/0平（仅控制箭头颜色）
   * auto: true=公开源自动拉取 / false=人工录入
   */
  signals: [
    {
      name: "BLPG3 即期 TCE",
      value: "$165K", unit: "/天",
      chg: "-$1.9K（Baltic 第 37 周评估 $281.57/吨，高位喘息）", chgVal: -1,
      state: "bull",
      bullLine: "跌破 $60K/天 且连跌 4 周",
      bearLine: "站稳 $150K 进入 Q4 ✔ 已触发",
      source: "Baltic Exchange 周度评估",
      auto: false, updated: "09-11"
    },
    {
      name: "霍尔木兹日通行量",
      value: "6", unit: "艘/天",
      chg: "9/1-6 周均仅 3.2 艘/天（GMN 引 PortWatch），复航谈判推迟", chgVal: 0,
      state: "bull",
      bullLine: "连续两周 >60 艘/天",
      bearLine: "再度降至个位数 + 战争险费率反弹 ✔ 持续",
      source: "straits.live / Kpler AIS",
      auto: true, updated: "09-14"
    },
    {
      name: "巴拿马拍卖价 / 排队量",
      value: "$1.1M", unit: "· 队列 131 艘",
      chg: "9/1 单闸 $5.3M 创纪录（LPG 船 G. Spirit）；9/15 起日闸次 32", chgVal: 1,
      state: "bull",
      bullLine: "拍卖价 <$200K 且队列 <90 艘",
      bearLine: "日通行量进一步削减（<32 艘）",
      source: "ACP 公告 + 拍卖结果",
      auto: true, updated: "09-14"
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
      value: "1.96", unit: "M桶/天",
      chg: "-0.19（周止 09-04，EIA 9/10 发布；回落至 2M 下方）", chgVal: -1,
      state: "neu",
      bullLine: "连续 4 周 <1.8M桶/天",
      bearLine: "码头扩建超预期 + 持续 >2.2M ✔ 已触发",
      source: "EIA 周度 / Vortexa",
      auto: true, updated: "09-10"
    },
    {
      name: "中国 PDH 开工率",
      value: "71.9", unit: "%",
      chg: "-1pp（9 月初当周 71.89%，卓创；8 月月均近 73%）", chgVal: -1,
      state: "bull",
      bullLine: "利润深度负值（<-$50/吨）+ 开工率回落",
      bearLine: "2026 年 3 套新 PDH 如期满产",
      source: "行业周度开工数据",
      auto: false, updated: "09-03"
    },
    {
      name: "新签订单节奏",
      value: "72", unit: "艘（2026 累计）",
      chg: "0（本周未见新签公开报道，累计维持 72 艘）", chgVal: 0,
      state: "bear",
      bullLine: "——（订单是 2027+ 利空，非当期）",
      bearLine: "订单簿/船队突破 35%（当前约 31%）",
      source: "Clarksons / TradeWinds",
      auto: false, updated: "09-14"
    }
  ],

  /* ===== 近 12 周历史（趋势图用，每周往后推一格）===== */
  hist: {
    weeks:    ["W27","W28","W29","W30","W31","W32","W33","W34","W35","W36","W37","W38"],
    tce:      [124000, 131000, 127000, 139000, 142000, 149000, 156000, 152000, 154000, 156000, 167000, 165000],
    hormuz:   [5, 7, 4, 3, 5, 4, 3, 4, 5, 3, 6, 6],
    usExport: [2.10, 2.18, 2.12, 2.25, 2.31, 2.28, 2.40, 2.33, 2.29, 2.31, 2.15, 1.96]
  }
};
