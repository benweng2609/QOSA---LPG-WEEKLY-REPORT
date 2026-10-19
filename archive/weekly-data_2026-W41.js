/* ============================================================
 * QOSA · LPG 七信号周报 —— 数据文件
 * 每周维护这一个文件即可，页面自动渲染。
 *
 * 【每周更新流程】
 *   1. 周五 Baltic Exchange 发布周度评估后，更新 BLPG3 读数与 hist 历史数组
 *   2. 对照下方阈值表，给每个信号填 state：bull(支撑运价) / bear(压制) / neu(中性)
 *   3. 改写 oneLiner / clientNote / actionNote 三段解读（以 ../tanker-lpg-weekly/reports/lpg/ 当周润色稿为底稿）
 *   4. 更新 weekLabel / window / published / dataAsOf
 *   5. 保存后刷新页面即可；部署到线上的话重新上传本文件
 * ============================================================ */

window.WEEKLY = {

  /* ===== 期次信息 ===== */
  weekLabel: "2026 年第 41 周",
  window:    "2026-10-05 ~ 10-11",
  published: "2026-10-08",
  dataAsOf:  "2026-10-05",

  /* ===== 客户区：本周解读（三段，依据 tanker-lpg-weekly/reports/lpg/2026-W41-润色稿）===== */
  oneLiner: "沙特 10 月 CP 三连涨：丙烷 <b>$680/吨</b>、丁烷 $730/吨（卓创测算折到岸约 7,542 / 8,138 元/吨）；霍尔木兹袭击蔓延至气体船（10/5 四起袭击涉 Sinokor、Maran Gas、Sinogas），巴拿马 10/5 公告旱季长期闸位提前三个月竞拍；美国上半年丙烷出口日均 200 万桶创新高——成本抬升叠加通道承压，VLGC 收益维持历史高位区，焦点转向 11 月 CP 预期与运河旱情。",
  clientNote: "对租家：CP 三连涨后到岸成本已上 7,500 元/吨、国内批发基准 7,900 元/吨，进口商对高贴水承接力接近极限，Q4 货盘<b>提前 4-6 周锁定</b>不动摇，并紧盯 11 月 CP 预期；巴拿马旱情未解（5-8 月降雨较均值低 34%、日通航约 32 艘），9/1 SK Gas 曾为 LPG 船支付约 $530 万插队，旱季附加成本已实质计入美湾-远东航程经济性；对船东：ClarkSea 三季度均值创历史纪录、VLGC 与 VLCC 收益同步飙升，即期高位<b>该锁则锁</b>；气体船遇袭意味着战争险与绕航成本同步抬升，高报价有成本支撑。",
  actionNote: "本周三件事：一是<b>盯 BLPG3 周度读数与气体船遇袭后续</b>——若再有 VLGC/LPG 船遇袭或扣押，即期与战争险报价将跳升，是提醒客户锁价的触发点；反之连续平静两周以上，警惕运价高位松动；二是<b>盯 11 月 CP 预期与远东贴水</b>——CP 预期回落或贴水收窄将直接改变 12 月装船的租船需求，提前与进口商客户对表；三是<b>盯巴拿马两轮长期名额竞拍（11/17 新闸、11/24 旧闸）</b>——成交价若再创新高，美湾-远东 VLGC 运价将获得新的成本支撑。",

  /* ===== 七个信号 =====
   * state: bull=支撑运价 / bear=压制运价 / neu=中性观望
   * chgVal: 周环比方向，正数涨/负数跌/0平（仅控制箭头颜色）
   * auto: true=公开源自动拉取 / false=人工录入
   */
  signals: [
    {
      name: "BLPG3 即期 TCE",
      value: "$198K", unit: "/天",
      chg: "-$1.4K（Baltic 第 40 周评估 $321.86/吨，高位小幅回落）", chgVal: -1,
      state: "bull",
      bullLine: "跌破 $60K/天 且连跌 4 周",
      bearLine: "站稳 $150K 进入 Q4 ✔ 已触发",
      source: "Baltic Exchange 周度评估",
      auto: false, updated: "10-02"
    },
    {
      name: "霍尔木兹日通行量",
      value: "1", unit: "艘/天",
      chg: "9/27 读数仍为 1 艘（基准 85）；袭击蔓延至气体船：10/5 UKMTO 四起袭击涉 Sinokor、Maran Gas、Sinogas 旗下船舶；伊朗七项复航条件遭搁置", chgVal: 0,
      state: "bull",
      bullLine: "连续两周 >60 艘/天",
      bearLine: "再度降至个位数 + 战争险费率反弹 ✔ 持续",
      source: "straits.live / Kpler AIS",
      auto: true, updated: "10-05"
    },
    {
      name: "巴拿马拍卖价 / 排队量",
      value: "$2.15M", unit: "· 队列 131 艘",
      chg: "ACP 10/5 公告：旱季长期闸位提前竞拍（新闸 11/17、旧闸 11/24 各 3 个名额）；旱情未解——5-8 月降雨较均值低 34%、日通航约 32 艘，9/1 SK Gas 曾付约 $530 万为 LPG 船插队（拍卖价最新读数仍为 $2.15M）", chgVal: 0,
      state: "bull",
      bullLine: "拍卖价 <$200K 且队列 <90 艘",
      bearLine: "日通行量进一步削减（<32 艘）",
      source: "ACP 公告 + 拍卖结果",
      auto: true, updated: "10-05"
    },
    {
      name: "沙特 CP（每月 1 日）",
      value: "$680", unit: "/吨（丙烷，10月）",
      chg: "+$55（三连涨，年内最大单月涨幅，9 月 $625；丁烷 $730 +$70；折到岸丙烷约 7,542 元/吨）", chgVal: 1,
      state: "neu",
      bullLine: "复航后 CP 快速回落至 $500 下方",
      bearLine: "CP 坚挺 + 对美湾价差走阔",
      source: "Aramco 公告（每月 1 日）",
      auto: false, updated: "10-01"
    },
    {
      name: "美国出口量",
      value: "1.67", unit: "M桶/天",
      chg: "-0.80（周止 09-25，EIA 9/30 发布；单周骤降，库存反季节累积；上半年丙烷出口日均 200 万桶创新高为年度背景）", chgVal: -1,
      state: "bear",
      bullLine: "连续 4 周 <1.8M桶/天",
      bearLine: "码头扩建超预期 + 持续 >2.2M ✔ 已触发",
      source: "EIA 周度 / Vortexa",
      auto: true, updated: "09-30"
    },
    {
      name: "中国 PDH 开工率",
      value: "72.4", unit: "%",
      chg: "最新读数仍为 9/24 当周 72.37%（隆众）；较 9 月上旬 79.4%（卓创）已回落 7pp，假期周报暂停", chgVal: 0,
      state: "bear",
      bullLine: "利润深度负值（<-$50/吨）+ 开工率回落",
      bearLine: "2026 年 3 套新 PDH 如期满产",
      source: "行业周度开工数据",
      auto: false, updated: "09-24"
    },
    {
      name: "新签订单节奏",
      value: "81", unit: "艘（2026 累计）",
      chg: "本周订单潮延续：摩根大通三星重工再签 2 艘 VLGC（年内 6 艘）、Dorian 韩华 3 艘 VLGC、SFL 首进气体船订 2 艘 VLAC、Akrotiri 传订 2 艘 VLAC——金融与产业资本同锁 2028-2030 运力；累计维持 81 艘", chgVal: 0,
      state: "bear",
      bullLine: "——（订单是 2027+ 利空，非当期）",
      bearLine: "订单簿/船队突破 35%（当前约 31%）",
      source: "Clarksons / TradeWinds",
      auto: false, updated: "10-08"
    }
  ],

  /* ===== 近 12 周历史（趋势图用，每周往后推一格）===== */
  hist: {
    weeks:    ["W30","W31","W32","W33","W34","W35","W36","W37","W38","W39","W40","W41"],
    tce:      [139000, 142000, 149000, 156000, 152000, 154000, 156000, 167000, 165000, 194000, 199000, 198000],
    hormuz:   [3, 5, 4, 3, 4, 5, 3, 6, 6, 8, 1, 1],
    usExport: [2.25, 2.31, 2.28, 2.40, 2.33, 2.29, 2.31, 2.15, 1.96, 2.21, 2.47, 1.67]
  }
};
