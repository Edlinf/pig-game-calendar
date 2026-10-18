// Exact timestamps include UTC+8; endAt is the exclusive closing instant.
// A boundaryDate marks a maintenance day, never an invented exact cutoff.
const GAMES=[
  {
    "id": "wow",
    "name": "魔兽世界",
    "short": "魔兽",
    "en": "WORLD OF WARCRAFT",
    "color": "#dbb878",
    "region": "国服 · 正式服",
    "checked": "2026-10-18",
    "source": "https://wow.blizzard.cn/",
    "note": "10月18日复核国服12.1.5上线、冒险手册与中秋规则，补入上海无限派对及联名借记卡福利开放日；星光兑换仍至10月21日23:59:59并关联主体。实际读取WoWDB LIVE既有11个周常窗口，周四05:00截止与洛杉矶夏令时记录保留。暗月按每月首个周日持续一周，补入12月6–12日；万圣节仍为美服日期参考。下个更新的紊乱时间流未公布国服日期。"
  },
  {
    "id": "ff14",
    "name": "最终幻想14",
    "short": "FF14",
    "en": "FINAL FANTASY XIV",
    "color": "#82b9ef",
    "region": "国服",
    "checked": "2026-10-18",
    "source": "https://ff.web.sdo.com/web8/index.html#/newstab/newslist",
    "note": "已直接复核国服官方近期新闻、活动专题与黄金的试炼第85期配置；本期西格玛幻境3挑战至10月18日23:59:59，网页登记至22日13:00。新增守护天节往年道具赠券与第三站周边预售；FF15及成都转播抽选已结束。莫古第2阶段、8.05指南书领奖与8.1兑换的准确日期仍待公告，未推算下期试炼。"
  },
  {
    "id": "endfield",
    "name": "明日方舟：终末地",
    "short": "终末地",
    "en": "ARKNIGHTS: ENDFIELD",
    "color": "#d6dd79",
    "region": "国服",
    "checked": "2026-10-18",
    "source": "https://endfield.hypergryph.com/news",
    "note": "已读取10月15日丹青渡国服更新说明及万物更新、篆玉申领、版本创作征集公告，补齐签到、拍照、引入、演武、网页、重构寻访/申领、危机合约与商店等当前及未来窗口。丰碑刻影仍至10月19日04:00。下次版本维护日期未公布，不推算烟火生缘、明河寻访/签到与危机合约关闭日期；武器申领相对期数不换算日期。TapTap/知乎创作征集已实际核对，其他平台截止仍待核实。"
  },
  {
    "id": "arknights",
    "name": "明日方舟",
    "short": "方舟",
    "en": "ARKNIGHTS",
    "color": "#edaa76",
    "region": "国服",
    "checked": "2026-10-18",
    "source": "https://ak.hypergryph.com/",
    "note": "2026-10-18读取国服官网与TapTap官方栏，复核昨日海、矢量突破及寻访，新增国家图书馆联动与已公告后续时装/剿灭/直播；新一期寻访仅列已公布更新节点，不猜完整排期。"
  },
  {
    "id": "fgo",
    "name": "Fate/Grand Order",
    "short": "FGO",
    "en": "FATE / GRAND ORDER",
    "color": "#b9a7eb",
    "region": "国服 · 简中",
    "checked": "2026-10-18",
    "source": "https://game.bilibili.com/fgo/news.html",
    "note": "10月18日实际读取国服官网公开新闻列表及最新正文，补齐Assassin开幕限时福利、万圣节预热和奏章IV限时任务；任务、领奖与道具期限分开关联。万圣节主体仅确认10月22日开幕，不推算结束；3300万纪念十次登录继续保留10月11日官博转载核对，未将本次概要复核冒充登录正文复核。"
  },
  {
    "id": "genshin",
    "name": "原神",
    "short": "原神",
    "en": "GENSHIN IMPACT",
    "color": "#78d5c1",
    "region": "国服 · 天空岛 / 世界树",
    "checked": "2026-10-18",
    "source": "https://ys.mihoyo.com/main/news",
    "note": "10月18日实际读取国服官方第二期活动速递及祈愿预告图，新增无忧无虑大雪仗（10月21日10:00—11月2日03:59）、祝圣移涌（10月26日04:00—11月2日03:59）、独立面具赠礼和两项官方社区活动。周年拾光册10月18日23:59截止，周年签到10月19日03:59截止；判测预测与论坛抽奖截止不同。复核砺行修远、挑战节点、千星奇域装扮/商城/创作与网页活动；纪行、纪游和例行赛季仍排除。"
  },
  {
    "id": "hsr",
    "name": "崩坏：星穹铁道",
    "short": "崩铁",
    "en": "HONKAI: STAR RAIL",
    "color": "#375b72",
    "region": "国服",
    "checked": "2026-10-10",
    "source": "https://sr.mihoyo.com/news",
    "note": "核对 TapTap 崩坏：星穹铁道官方账号的4.6版本说明、速览排期图和活动公告，收录限时玩法、签到、双倍掉落与网页活动。跃迁、挑战轮换和无名勋礼不列为活动。版本更新后开启的条目不推算精确开服时刻；常驻星际碰碰不设截止。领奖与兑换随主体活动说明。"
  }
];
const GAME_EVENTS=EVENTS.map(e=>({...e,game:'wow',type:e.type||(e.milestone?'版本节点':'活动'),verification:e.verification||(e.confirmed?'国服公告核对':'国服排期待核实')}));
for(const e of GAME_EVENTS)if(['autumn','autumn-wishes'].includes(e.id)){e.rewards=e.id==='autumn'?'星光、优惠券、许愿金币':'随机宠物、礼包等奖励';e.condition='拥有符合活动规则的有效游戏时间';}
const SOURCES={ff14:'https://actff1.web.sdo.com/project/20260928ff14fallguys/4kkmxknj3rno/index.html',endfield:'https://endfield.hypergryph.com/news/2653',arknights:'https://prts.wiki/w/昨日海/活动公告',fgo:'https://fgo.wiki/w/幕末武斗神话_唠唠叨叨新选组_THE_END_REVENGE_OF_MAKOTO',genshin:'https://www.taptap.cn/app/168332/topic?type=official',hsr:'https://www.taptap.cn/moment/853326330178046059'};
function addEvent(game,id,name,short,type,startAt,endAt,desc,detail,rewards,condition,extra={}){
 const e={game,id,name,short,type,startAt,endAt,start:startAt.slice(0,10),end:endAt?endAt.slice(0,10):null,desc,detail,rewards,condition,confirmed:true,checked:'2026-10-09',source:SOURCES[game],verification:game==='fgo'?'国服 Wiki 核对':game==='arknights'?'官方公告转载核对':'国服官方公告',...extra};
 GAME_EVENTS.push(e);
}
addEvent("ff14","ff14-fallguys","Fall Guys 糖豆人联动","糖豆人联动","联动","2026-10-07T16:00:00+08:00","2026-10-27T23:00:00+08:00","在金碟巨豆中心参加障碍赛，积累金碟声誉兑换联动道具。","完成“前往游乐场”和“抓紧胜利的王冠！”后参加。以前完成过联动任务的角色无需重做；声誉获取与兑换均限活动期间。","糖豆人服装、糖豆犀牛坐骑、表情、宠物与家具","任意职业15级，完成对应主线与“前往游乐场”",{"start":"2026-10-07","end":"2026-10-27","confirmed":true,"checked":"2026-10-11","source":"https://actff1.web.sdo.com/project/20260928ff14fallguys/4kkmxknj3rno/index.html","verification":"国服官方专题","dateLabel":"10月7日 16:00 — 10月27日 22:59"});
addEvent("ff14","ff14-ff15","FF15 联动 · 献给英雄的夜曲","FF15联动","联动","2026-09-24T16:00:00+08:00","2026-10-13T23:00:00+08:00","与诺克提斯并肩作战，完成联动任务并兑换四人坐骑等奖励。","从乌尔达哈现世回廊（X:8.5，Y:9.7）的琪琵·嘉奇亚处接取“黑衣青年”。往届未完成的任务可继续推进；开启“季节活动再现”后，须在活动结束前重新完成任务，才能恢复相关商店兑换资格。","四人坐骑雷迦利亚G型、路西斯王子套装、诺克提斯发型与管弦乐琴乐谱","战斗职业50级（设限特职除外），完成主线“超越幻想，究极神兵”",{"start":"2026-09-24","end":"2026-10-13","confirmed":true,"checked":"2026-10-11","source":"https://actff1.web.sdo.com/project/20260915ffxv/index.html","verification":"国服官方专题与公告核对","dateLabel":"9月24日 16:00 — 10月13日 22:59","official":"https://ff.web.sdo.com/web8/index.html#/newstab/newscont/393210","timing":"结束当天10月13日14:00—18:00预计维护，官方联动截止仍为22:59；建议提前完成任务及兑换。"});
addEvent("ff14","ff14-moogle","莫古莫古★大收集 · 天文的行路 第1阶段","莫古莫古大收集","收集","2026-09-09T16:00:00+08:00","2026-10-19T23:00:00+08:00","攻略指定副本、出海垂钓或机遇临门，完成指南书任务，收集稀少神典石：天文1章。","每周任务和每周小莫古挑战于周二16:00切换。兑换呜噜怪角笛需100个稀少神典石与10张票据；小莫古挑战每周给1张，活动期间一次的莫古莫古挑战给5张。票据可留到第2阶段使用，第二阶段日期待公告。","呜噜怪角笛及交换票据、坐骑、饰品等兑换道具","与旅行莫古力对话获取指南书，满足所参加玩法的解锁条件",{"start":"2026-09-09","end":"2026-10-19","confirmed":true,"checked":"2026-10-11","source":"https://actff1.web.sdo.com/project/20260826mogmog/0by196dc8ija/index.html","verification":"国服官方专题","dateLabel":"9月9日 16:00 — 10月19日 22:59","timing":"此日期为第1阶段活动期。专题另列：8.05版本后无法从指南书领奖，8.1版本更新前可向旅行莫古力兑换；这两个版本的准确截止时间尚未公布，不能按10月19日一并结束。"});
addEvent("ff14","ff14-monthcard-gifts","月卡礼赠 · 随身神典石肖像教材","月卡礼赠","网页领奖","2026-07-25T18:00:00+08:00","2026-11-21T00:00:00+08:00","达到月卡天数要求后，在活动页面领取肖像教材。","按活动期间账号已消耗月卡天数与剩余月卡天数之和计算资格；各档天数要求与领奖操作见官方页面。请在领奖截止前领取。","肖像教材：随身神典石1与随身神典石2","账号累计月卡天数达到对应领奖要求",{"start":"2026-07-25","end":"2026-11-21","confirmed":true,"checked":"2026-10-11","source":"https://actff1.web.sdo.com/20260704_CardBill/gift/index.html#/index","verification":"国服官方公告","dateLabel":"7月25日 18:00 — 11月20日 23:59","official":"https://ff.web.sdo.com/web8/index.html#/newstab/newscont/391232"});
addEvent("ff14","ff14-monthcard-offer","月卡启航计划","月卡启航计划","月卡优惠","2026-07-25T18:00:00+08:00","2027-02-01T14:00:00+08:00","活动页面首次购买30天月卡仅需4500点券；符合条件的月卡账号可享续购折扣。","首次特惠与持有月卡时长的账号折扣资格不同，购买前查看活动页面规则。此条目记录优惠期限。","首次30天月卡特惠及符合条件的月卡折扣","通过官方活动页面购买，满足账号对应优惠条件",{"start":"2026-07-25","end":"2027-02-01","confirmed":true,"checked":"2026-10-11","source":"https://actff1.web.sdo.com/20260704_CardBill/index.html#/index","verification":"国服官方公告","dateLabel":"7月25日 18:00 — 2027年2月1日 14:00","deadlineLabel":"2/1 14:00","official":"https://ff.web.sdo.com/web8/index.html#/newstab/newscont/391233"});
addEvent("ff14","ff14-halloween","守护天节 · 奇妙的捉迷藏","守护天节","季节活动","2026-10-15T16:00:00+08:00","2026-11-02T23:00:00+08:00","前往米·凯特露天剧场参加守护天节任务，获取节日防具和家具。","从格里达尼亚旧街的南瓜头女人处接取“守护天节与奇妙的人偶们”。活动任务只能在活动期间接取和推进，结束后无法完成；部分往届道具可在季节商店购买。","守护天节主题防具与家具","任意职业15级",{"start":"2026-10-15","end":"2026-11-02","confirmed":true,"checked":"2026-10-11","source":"https://actff1.web.sdo.com/project/20261005All_Saints_Wake/hjwff6jkcti4/index.html","verification":"国服官方专题与公告核对","dateLabel":"10月15日 16:00 — 11月2日 22:59","official":"https://ff.web.sdo.com/web8/index.html#/newstab/newscont/393960"});
addEvent("ff14","ff14-yokai","妖怪手表联动 · 艾欧泽亚大集合啦喵","妖怪手表联动","联动","2026-08-04T16:00:00+08:00","2026-10-05T23:00:00+08:00","收集妖怪徽章，兑换联动宠物、武器、坐骑和家具。","本期已于10月5日22:59结束，不能再按进行中活动安排。复刻新增三种家具；联动详细玩法见国服专题。","地缚猫与维斯帕等宠物、武器、坐骑、肖像教材和家具","具体任务与收集前置见国服专题",{"start":"2026-08-04","end":"2026-10-05","confirmed":true,"checked":"2026-10-11","source":"https://actff1.web.sdo.com/project/20260715youkai-watch/vaz1gqm16a3h/index.html","verification":"国服官方公告","dateLabel":"8月4日 16:00 — 10月5日 22:59","official":"https://ff.web.sdo.com/web8/index.html#/newstab/newscont/391316"});
addEvent("ff14","ff14-monthcard-lottery","大鲶鱼保佑 · 第三站粉丝节资格期","粉丝节抽奖资格","月卡活动","2026-07-25T18:00:00+08:00","2026-10-31T00:00:00+08:00","活动期间购买过月卡的账号可参与第三站粉丝节特别版抽奖。","每个账号仅计一次。10月30日24点为月卡购买资格截止，抽奖在第三站粉丝节转播时进行；不能将资格截止视作抽奖时间。","官方奖品表中的实物周边，抽选获得","活动开始后至10月30日24点前购买过月卡",{"start":"2026-07-25","end":"2026-10-31","confirmed":true,"checked":"2026-10-11","source":"https://ff.web.sdo.com/web8/index.html#/newstab/newscont/391233","verification":"国服官方公告","dateLabel":"7月25日 18:00 — 10月30日 24:00 · 资格截止"});
addEvent("ff14","ff14-pailifang","FF14 × 拍立方 · 糖糖之魂","拍立方联动","线下联动","2026-08-18T00:00:00+08:00","2027-01-01T00:00:00+08:00","在拍立方设备使用三款糖糖之魂主题相框合拍。","通过拍立方小程序查找附近设备，在设备首页的“动漫”分类选择“最终幻想14”相框。活动发生在线下拍照设备。","三款联动主题相框拍照体验","到支持本次联动的拍立方设备参与",{"start":"2026-08-18","end":"2027-01-01","confirmed":true,"checked":"2026-10-11","source":"https://ff.web.sdo.com/web8/index.html#/newstab/newscont/392085","verification":"国服官方公告","dateLabel":"8月18日 — 12月31日 · 公告仅列日期","datePrecision":"day","lastDay":"2026-12-31","timing":"官方仅给出起止日期，日历按整日覆盖；具体开启与结束时刻未公布。"});
addEvent("ff14","ff14-maintenance","7.57 全区全服更新维护","7.57维护","服务器维护","2026-10-13T14:00:00+08:00","2026-10-13T18:00:00+08:00","预计停机维护四小时，更新至7.57版本。","相关活动页面、后勤补给站和道具商城13:00暂停服务，维护结束后陆续恢复。开服时间可能提前或延后。当天也是FF15联动截止日。","客户端更新至7.57版本","国服全区全服",{"start":"2026-10-13","end":"2026-10-13","confirmed":true,"checked":"2026-10-11","source":"https://ff.web.sdo.com/web8/index.html#/newstab/newscont/393993","verification":"国服官方公告","dateLabel":"10月13日 14:00 — 18:00 · 预计","deadlineLabel":"10/13 18:00 · 预计"});
const gold84={source:'https://actff1.web.sdo.com/20241130_GoldTrial/#/index',verification:'国服官方第84期配置与规则核对'};
addEvent("ff14","ff14-gold84-duty","黄金的试炼 第84期 · 黑涡传说破舰岛","黄金试炼挑战","网页活动挑战","2026-10-09T13:00:00+08:00","2026-10-12T00:00:00+08:00","以等级同步方式通关黑涡传说破舰岛，获得本期试炼登记资格。","须在10月11日23:59:59前以等级同步方式完成黑涡传说破舰岛。完成后通常5—30分钟同步到活动页面；还必须在10月15日13:00前用对应角色进行网页登记，副本通关不会自动完成领奖。每账号每期登记一次；额外奖励于10月15日13:00起抽取，抽中实物者须在7天内查看并填写收货信息。","登记后可领取金碟币铜卡×2，并参与额外奖励抽取","正式账号，解锁60级副本黑涡传说破舰岛，以等级同步方式完成",{"start":"2026-10-09","end":"2026-10-12","confirmed":true,"checked":"2026-10-11","source":"https://actff1.web.sdo.com/20241130_GoldTrial/#/index","verification":"国服官方第84期配置与规则核对","dateLabel":"10月9日 13:00 — 10月11日 23:59"});
addEvent("ff14","ff14-gold84-register","黄金的试炼 第84期 · 网页登记","黄金试炼登记","网页领奖","2026-10-09T13:00:00+08:00","2026-10-15T13:00:00+08:00","使用已完成指定副本的角色，在专题页面查询并登记试炼成功。","每个账号每期仅可登记一次。10月11日挑战期结束后仍可登记至15日13:00；超出登记期视为放弃本期试炼。虚拟奖励发至道具仓库。","金碟币铜卡×2及额外奖励抽取资格","在本期挑战期内完成黑涡传说破舰岛，并用对应角色登记",{"start":"2026-10-09","end":"2026-10-15","confirmed":true,"checked":"2026-10-11","source":"https://actff1.web.sdo.com/20241130_GoldTrial/#/index","verification":"国服官方第84期配置与规则核对","dateLabel":"10月9日 13:00 — 10月15日 13:00","deadlineLabel":"10/15 13:00","parentEvent":"ff14-gold84-duty"});
addEvent("ff14","ff14-gold84-draw","黄金的试炼 第84期 · 幸运奖励抽取","黄金试炼开奖","开奖节点","2026-10-15T13:00:00+08:00",null,"系统从当期成功登记的账号中抽取额外奖励。","抽取持续数分钟，官方建议开奖30分钟后查看记录。虚拟奖励自动进入奖励仓库；获得实物奖励者须在7天内查看并填写收货信息。","黄金坐骑、黄金大河狸、实物与其他幸运奖品，按抽取结果获得","在第84期登记截止前成功登记",{"start":"2026-10-15","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://actff1.web.sdo.com/20241130_GoldTrial/#/index","verification":"国服官方第84期配置与规则核对","milestone":true,"dateLabel":"10月15日 13:00 起抽取"});
addEvent("endfield","end-runners","跑者运动会","跑者运动会","趣味活动","2026-10-01T12:00:00+08:00",null,"完成赛道、收集气球并达成跑者节点，领取奖励。","以三星成绩完成赛道，收集指定气球。截止于版本维护前，具体关服时刻待公告。","1200嵌晶玉、冠军跑者头像框与活动特饮","具体解锁前置见游戏内活动页面",{"start":"2026-10-01","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/2653","verification":"国服官方公告","boundaryDate":"2026-10-15","dateLabel":"10月1日 12:00 — 下一版本维护前","official":"https://endfield.hypergryph.com/news/2653"});
addEvent("endfield","end-signin","陵水渡秋 · 七日签到","七日签到","签到","2026-10-01T12:00:00+08:00",null,"活动期间累计签到七日，领取奖励。","累计七日签到后领取对应奖励，截止于下一版本维护前。","1500嵌晶玉、跑动行进头像与活动特饮","活动期间累计完成七日签到",{"start":"2026-10-01","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/2653","verification":"国服官方公告","boundaryDate":"2026-10-15","dateLabel":"10月1日 12:00 — 下一版本维护前","official":"https://endfield.hypergryph.com/news/2653"});
addEvent("endfield","end-sanity","理智补给","理智补给","日常福利","2026-10-08T04:00:00+08:00","2026-10-15T04:00:00+08:00","每天完成指定任务，领取理智补给。","在本期活动时间内完成指定任务，并及时领取。","理智消耗许可、应急理智加强剂","完成游戏内指定任务",{"start":"2026-10-08","end":"2026-10-15","confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/2653","verification":"国服官方公告","dateLabel":"10月8日 04:00 — 10月15日 04:00","official":"https://endfield.hypergryph.com/news/2653"});
addEvent("endfield","end-monument","丰碑留名 · 刻影","刻影挑战","挑战","2026-10-05T12:00:00+08:00","2026-10-19T04:00:00+08:00","完成影拓丰碑“幽影刻形”对应挑战，领取限时奖励。","新系列包含四个关卡；关卡首通与限时活动领奖为不同事项。","1200嵌晶玉、高阶培养自选箱Ⅰ等","解锁对应玩法并完成挑战",{"start":"2026-10-05","end":"2026-10-19","confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/2653","verification":"国服官方公告","dateLabel":"10月5日 12:00 — 10月19日 04:00","official":"https://endfield.hypergryph.com/news/2653"});
addEvent("endfield","end-patch","丹青渡 · 新版本开启","丹青渡更新","版本节点","2026-10-15",null,"新版本与云·终末地上线，加入工业、战斗和养成体验调整。","前瞻导览页可领取节目奖励。当期活动精确起止时间需继续核对公告；这里只标上线日期。","前瞻导览：1000嵌晶玉及养成物资","导览领奖与版本内容资格见官方页面",{"start":"2026-10-15","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/3805","verification":"国服官方公告","milestone":true,"dateLabel":"10月15日维护后开放","startPrecision":"day","startAt":null});
const sea={official:'https://ak.hypergryph.com/news/5101.html'};
addEvent("arknights","ark-sea","昨日海 · 活动关卡","昨日海关卡","SideStory","2026-10-09T12:00:00+08:00","2026-10-23T04:00:00+08:00","开放雷亚-伊比利亚关卡，完成打捞方案并收集代币。","公告整体活动页延续至10月30日，但关卡10月23日03:59关闭。","活动干员旅骨、家具、模组材料与代币","通关主线1-10",{"start":"2026-10-09","end":"2026-10-23","confirmed":true,"checked":"2026-10-11","source":"https://ak.hypergryph.com/news/5101.html","verification":"国服官方公告","official":"https://ak.hypergryph.com/news/5101.html","dateLabel":"10月9日 12:00 — 10月23日 03:59"});
addEvent("arknights","ark-sea-ex","昨日海 · 后半关卡开启","昨日海后半","解锁节点","2026-10-16T16:00:00+08:00",null,"“我们的伊比利亚”关卡解锁。","关卡同样于10月23日03:59关闭；节点只标解锁日，不表示只开放一天。","关卡与活动任务奖励","完成对应活动前置",{"start":"2026-10-16","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://ak.hypergryph.com/news/5101.html","verification":"国服官方公告","official":"https://ak.hypergryph.com/news/5101.html","milestone":true,"dateLabel":"10月16日 16:00 开放"});
addEvent("arknights","ark-sea-shop","昨日海 · 劳工配给所兑换","昨日海兑换","兑换","2026-10-09T12:00:00+08:00","2026-10-30T04:00:00+08:00","消耗“未来瞻望镜”兑换物品，商店比关卡晚一周关闭。","先在关卡关闭前取得足够代币，再完成商店兑换。","旅骨信物、流星时装、寻访凭证与材料","持有活动代币",{"start":"2026-10-09","end":"2026-10-30","confirmed":true,"checked":"2026-10-11","source":"https://ak.hypergryph.com/news/5101.html","verification":"国服官方公告","official":"https://ak.hypergryph.com/news/5101.html","dateLabel":"10月9日 12:00 — 10月30日 03:59","parentEvent":"ark-sea"});
addEvent("arknights","ark-sea-banner","海渊巡游 · 限时寻访","海渊巡游","寻访","2026-10-09T12:00:00+08:00","2026-10-23T04:00:00+08:00","克莱门莎、德·托莱多与火哨概率提升。","本池为标准寻访。对应专用寻访凭证也在10月23日03:59过期。","概率提升：克莱门莎 / 德·托莱多 / 火哨","使用对应寻访道具；保底规则见公告",{"start":"2026-10-09","end":"2026-10-23","confirmed":true,"checked":"2026-10-11","source":"https://ak.hypergryph.com/news/5101.html","verification":"国服官方公告","official":"https://ak.hypergryph.com/news/5101.html","dateLabel":"10月9日 12:00 — 10月23日 03:59"});
const vector={source:'https://wiki.biligame.com/arknights/【活动预告】矢量突破3「拟生态」限时活动即将开启',official:'https://ak.hypergryph.com/news/1455'};
addEvent("arknights","ark-vector","矢量突破#3 · 拟生态","拟生态关卡","矢量突破","2026-09-29T16:00:00+08:00","2026-10-20T04:00:00+08:00","参与关卡获取“小心地滑”，提高突破里程碑等级。","关卡20日凌晨关闭，里程碑领奖另有截止时间。","空构时装、家具与材料（通过里程碑领取）","通关主线2-10",{"start":"2026-09-29","end":"2026-10-20","confirmed":true,"checked":"2026-10-11","source":"https://ak.hypergryph.com/news/1455","verification":"国服官方公告","official":"https://ak.hypergryph.com/news/1455","dateLabel":"9月29日 16:00 — 10月20日 03:59"});
addEvent("arknights","ark-vector-reward","拟生态 · 突破里程碑领奖","拟生态领奖","领奖","2026-09-29T16:00:00+08:00","2026-10-23T04:00:00+08:00","领取已达成的里程碑奖励，比关卡晚三天关闭。","10月23日为领奖截止，不代表关卡仍开放。","空构“慵怠哼唱”时装、家具与材料","在关卡开放期达成对应里程碑",{"start":"2026-09-29","end":"2026-10-23","confirmed":true,"checked":"2026-10-11","source":"https://ak.hypergryph.com/news/1455","verification":"国服官方公告","official":"https://ak.hypergryph.com/news/1455","dateLabel":"9月29日 16:00 — 10月23日 03:59","parentEvent":"ark-vector"});
const fgoOfficial={official:'https://game.bilibili.com/fgo/news.html'};
addEvent("fgo","fgo-gudaguda","幕末武斗神话 · 唠唠叨叨新选组 THE END","新选组活动","剧情活动","2026-09-24T19:00:00+08:00","2026-10-15T14:00:00+08:00","推进活动剧情、完成任务并刷取商店材料。","完成活动第十二话后原田左之助正式加入；关卡与特别次数登录奖励10月15日13:59关闭，商店兑换10月22日13:59关闭。活动登录最多21次，每日04:00刷新；高难挑战还需完成所有活动限定任务并通关终局特异点。","四星活动从者原田左之助、魔术礼装浅葱的队服、活动礼装、从者币、灵衣和材料","通关特异点F 冬木",{"start":"2026-09-24","end":"2026-10-15","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18397","verification":"国服官方公告（公开新闻接口核对）","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18397","dateLabel":"9月24日 19:00 — 10月15日 13:59","timing":"关卡与登录奖励至10月15日13:59；商店至10月22日13:59，兑换结束后活动货币删除。河上彦斋召唤同样延续至10月22日13:59，近藤勇与召唤2至10月15日13:59，召唤4至10月12日13:59。"});
addEvent("fgo","fgo-gudaguda-shop","新选组 THE END · 商店兑换","新选组兑换","兑换","2026-09-24T19:00:00+08:00","2026-10-22T14:00:00+08:00","关卡结束后仍有一周兑换期，先刷材料再清代币。","商店包含原田左之助从者币、河上彦斋简易灵衣开放权、活动礼装与养成素材。","活动礼装、原田左之助从者币、简易灵衣与材料","持有活动兑换材料",{"start":"2026-09-24","end":"2026-10-22","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18397","verification":"国服官方公告（公开新闻接口核对）","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18397","dateLabel":"9月24日 19:00 — 10月22日 13:59","parentEvent":"fgo-gudaguda"});
addEvent("fgo","fgo-assassin","冠位戴冠战：Assassin · 开幕前夕","Assassin应援","养成应援","2026-10-04T19:00:00+08:00","2026-10-22T14:00:00+08:00","Assassin养成加成及任务，按需安排种火与素材。","Assassin强化经验两倍，大成功与极大成功率三倍，指定种火与修炼场每日开放且AP减半。每日任务追加兑换券的任务期为10月5日00:00—10月18日23:59，奖励领取至10月25日23:59，兑换券使用至11月1日23:59；到期删除。","Assassin育成兑换券与养成加成","各子项目解锁条件以游戏内为准",{"start":"2026-10-04","end":"2026-10-22","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18411","verification":"国服官方公告（公开新闻接口核对）","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18411","dateLabel":"10月4日 19:00 — 10月22日 13:59","timing":"活动总期至10月22日13:59；每日任务必须在各自当日完成，追加报酬最晚10月25日23:59领取。暗匿者养成兑换券交换至11月1日23:59，超时删除。"});

addEvent("fgo","fgo-3300-downloads","3300万下载突破纪念活动","3300万下载纪念","纪念活动","2026-10-08","2026-10-22T14:00:00+08:00","领取特别次数登录奖励，并利用限时养成与AP消耗优惠。","特别次数登录奖励需在10月9日04:00—10月23日03:59期间累计登录10次（每天最多计一次），可获30圣晶石、传承结晶、稀有魔力棱镜等。活动总期与登录期不同；种火、幕间、强化关卡及其他养成优惠具体窗口以国服说明为准。","圣晶石30、传承结晶、稀有魔力棱镜、果实、种火与QP等","登录奖励及各类关卡的具体资格，以国服活动页面与玩法解锁条件为准",{"start":"2026-10-08","end":"2026-10-22","confirmed":true,"checked":"2026-10-11","source":"https://fgo.wiki/w/3300万下载突破纪念活动","verification":"国服 Wiki 与官方微博公告转载核对","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18433","dateLabel":"10月8日维护后 — 10月22日 13:59","timing":"纪念活动总窗口10月8日维护后—10月22日13:59；累计10次登录奖励单独至10月23日03:59。永久新增职阶星图任务、风暴罐月度交换不会随本期活动结束消失。官网纪念正文接口暂返回空内容，登录细节由认证国服官博公告转载核对。","crossSource":"https://www.sina.cn/news/detail/5351068138996166.html","startPrecision":"maintenance","startAt":null});
addEvent("fgo","fgo-3300-summon","3300万下载纪念 · 梅塔特隆·贞德推荐召唤","3300万下载召唤","推荐召唤","2026-10-08T19:00:00+08:00","2026-10-22T14:00:00+08:00","3300万下载纪念的限时推荐召唤。","五星梅塔特隆·贞德与四星阿育王概率提升；奔赴战场、花落之时、狩猎三张常驻概念礼装先行登场，其出现概率不提升。保底与从者币规则以召唤详情为准。","概率提升：梅塔特隆·贞德、阿育王","使用圣晶石或呼符，具体召唤规则见游戏内",{"start":"2026-10-08","end":"2026-10-22","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18434","verification":"国服官方公告（公开新闻接口核对）","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18434","dateLabel":"10月8日 19:00 — 10月22日 13:59"});

// A version-opening date covers the calendar day; it is not an announced midnight start.
const genshinVersionStart={startAt:null,startPrecision:'version',timing:'9月23日按版本更新日覆盖月历；实际随7.1维护完成开放，公告未列固定开服时刻。',verification:'国服官方入驻账号公告'};
const genshinOfficial={official:'https://ys.mihoyo.com/main/news',verification:'国服官方入驻账号公告'};
addEvent("genshin","gs-moon","银翎溯月，玄鸟结璘 · 逐月节","逐月节","主题活动","2026-09-24T10:00:00+08:00","2026-10-12T04:00:00+08:00","参与逐月节任务与三种玩法，积累庆典氛围。","驱邪追巡传、纸映幡旗祓祟演义、符箓灵弹巧阵已全部开放；完成佳节要务和妙遇逸事获取奖励。","四星单手剑银釭及精炼材料、原石、智识之冕","冒险等阶≥20级，完成序章第三幕“巨龙与自由之歌”",{"start":"2026-09-24","end":"2026-10-12","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851171335571768168","verification":"国服官方入驻账号公告 · 已读取官方图片排期","official":"https://ys.mihoyo.com/main/news","dateLabel":"9月24日 10:00 — 10月12日 03:59"});
const genshinWish={...genshinOfficial,...genshinVersionStart,source:'https://www.taptap.cn/moment/851175040782174930',dateLabel:'9月23日 7.1版本更新后 — 10月13日 17:59'};
addEvent("genshin","gs-wish-characters","7.1上半 · 煦风欢舞时 / 涌浪叙歌","上半角色祈愿","祈愿","2026-09-23","2026-10-13T18:00:00+08:00","薇斯纳与沃雅妮莎的角色活动祈愿概率提升。","上半五星概率提升薇斯纳、沃雅妮莎；四星为迪奥娜、珐露珊、重云。两项角色祈愿共享保底计数，具体概率与规则见游戏内。","概率提升：薇斯纳 / 沃雅妮莎","解锁祈愿功能，使用纠缠之缘或原石",{"start":"2026-09-23","end":"2026-10-13","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851175040782174930","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","startPrecision":"version","timing":"9月23日按版本更新日覆盖月历；实际随7.1维护完成开放，公告未列固定开服时刻。","dateLabel":"9月23日 7.1版本更新后 — 10月13日 17:59","startAt":null});
addEvent("genshin","gs-wish-weapons","7.1上半 · 神铸赋形","上半武器祈愿","武器祈愿","2026-09-23","2026-10-13T18:00:00+08:00","蝶变与漩流颂歌的武器活动祈愿概率提升。","上半五星单手剑蝶变、法器漩流颂歌概率提升；四星为新枝、凝雪沉心、柔风游弦、西风大剑、匣里灭辰。定轨与保底以游戏内说明为准。","概率提升：单手剑蝶变 / 法器漩流颂歌","解锁祈愿功能，使用纠缠之缘或原石",{"start":"2026-09-23","end":"2026-10-13","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851175040782174930","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","startPrecision":"version","timing":"9月23日按版本更新日覆盖月历；实际随7.1维护完成开放，公告未列固定开服时刻。","dateLabel":"9月23日 7.1版本更新后 — 10月13日 17:59","startAt":null});
addEvent("genshin","gs-anniversary-login","耀星烁熠 · 累计登录","周年累计登录","签到","2026-10-01T04:00:00+08:00","2026-10-19T04:00:00+08:00","在周年累计登录活动中领取各档奖励。","活动内累计登录7天领取各档奖励；当天对应纠缠之缘数量为1、0、2、0、2、0、5。第2天为摩拉80000，第4天为启圣之尘1，第6天为大英雄的经验8。邮件答谢另有收取窗口。","累计登录7天：纠缠之缘10、摩拉80000、大英雄的经验8、启圣之尘1","冒险等阶≥5级",{"start":"2026-10-01","end":"2026-10-19","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/850784339179343138","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","dateLabel":"10月1日 04:00 — 10月19日 03:59"});
addEvent("genshin","gs-anniversary-mail","佳礼来信 · 感恩答谢","周年邮件答谢","周年赠礼","2026-09-28T00:00:00+08:00",null,"登录收取六周年答谢邮件。","9月28日至10月1日依次开放四封答谢邮件，每封含原石400；其他附件依次为“呀吼号”列车长、脆弱树脂2、祝圣之霜、迷你列车难题。可收取至7.1版本结束，精确时刻待公告；收取后邮件有效期30天。","原石1600、脆弱树脂2、祝圣之霜1、“呀吼号”列车长1、迷你列车难题1","冒险等阶≥2级",{"start":"2026-09-28","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/850784339179343138","verification":"国服官方入驻账号公告 · 已读取官方奖励表","official":"https://ys.mihoyo.com/main/news","dateLabel":"9月28日 00:00 — 7.1版本结束 · 截止待公告"});
addEvent("genshin","gs-anniversary-web","周年拾光册 · 六周年网页活动","周年拾光册","网页活动","2026-09-28","2026-10-19T00:00:00+08:00","与派蒙回顾旅程，测一测自己的冒险风格。","通过官方公告进入周年拾光册，完成回顾与星旅鉴语任务；开始仅公布日期，不代表0点开放。","原石180、大英雄的经验、祝圣油膏","登录活动页面，具体资格以网页说明为准",{"start":"2026-09-28","end":"2026-10-19","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/853583446612642962","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","startPrecision":"day","dateLabel":"9月28日 — 10月18日 23:59","startAt":null});
addEvent("genshin","gs-theatre-invite","桌上剧团 · 冒险的前夜会","限定五星自选","角色邀请","2026-09-23","2026-11-03T15:00:00+08:00","推进魔神任务后，自选邀请一名限定五星角色。","达达利亚、妮露、白术、千织、克洛琳德、瓦雷莎六选一；活动期间只能邀请一次。","自选限定五星角色与其等级突破材料","冒险等阶≥18级，完成第七章第四幕“往冥府的安魂歌”",{"start":"2026-09-23","end":"2026-11-03","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/850789386164372042","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","startPrecision":"version","timing":"9月23日按版本更新日覆盖月历；实际随7.1维护完成开放，公告未列固定开服时刻。","dateLabel":"9月23日 7.1版本更新后 — 11月3日 14:59","startAt":null});
addEvent("genshin","gs-standard-invite","巡历雪境，凝铸锋锐","常驻五星自选","角色邀请","2026-09-23","2026-11-03T15:00:00+08:00","自选邀请一名常驻祈愿五星角色。","通过活动界面邀请角色，活动期间只能邀请一次；新注册账号的后续安排以公告为准。","自选常驻五星角色与其等级突破材料","解锁祈愿功能",{"start":"2026-09-23","end":"2026-11-03","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/850788740455467399","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","startPrecision":"version","timing":"9月23日按版本更新日覆盖月历；实际随7.1维护完成开放，公告未列固定开服时刻。","dateLabel":"9月23日 7.1版本更新后 — 11月3日 14:59","startAt":null});
addEvent("genshin","gs-archon-bonus","往冥府的安魂歌 · 魔神任务限时奖励","魔神任务限时奖励","剧情奖励","2026-09-23","2026-11-03T15:00:00+08:00","在时限内完成第七章第三、第四幕，获取额外奖励。","魔神任务永久开放，本条截止额外奖励窗口。完成第四幕后可接取限时系列尾声任务，尾声任务同样于11月3日14:59关闭，请提前体验。","原石620、角色突破与培养素材、至冬区域特产","冒险等阶≥18级，完成第七章第二幕“死魂灵的夜曲”",{"start":"2026-09-23","end":"2026-11-03","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/850787632630729565","verification":"国服官方入驻账号公告 · 已读取官方图片排期","official":"https://ys.mihoyo.com/main/news","startPrecision":"version","timing":"9月23日按版本更新日覆盖月历；实际随7.1维护完成开放，公告未列固定开服时刻。","dateLabel":"9月23日 7.1版本更新后 — 11月3日 14:59","startAt":null});
const genshinOnslaught={...genshinOfficial,source:'https://www.taptap.cn/moment/853584114496833713'};
addEvent("genshin","gs-onslaught","幽境危战 · 本期挑战","幽境危战","战斗挑战","2026-09-30T10:00:00+08:00","2026-11-03T04:00:00+08:00","选择难度，连续完成三场限时战斗。","本期敌人为历经百战的矮灵雕刻师、秘源机兵统御械、游雪的护刃。挑战可至多四人联机；无畏与绝境奖励须单人通关，较高难度通关可一并领取较低难度奖励。","原石、启圣之尘等挑战奖励","冒险等阶≥20级，完成序章第三幕“巨龙与自由之歌”",{"start":"2026-09-30","end":"2026-11-03","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/853584114496833713","verification":"国服官方入驻账号公告 · 已读取官方图片排期","official":"https://ys.mihoyo.com/main/news","dateLabel":"9月30日 10:00 — 11月3日 03:59","timing":"紊乱爆发期10月10日03:59结束，此后无法消耗树脂获取该阶段秘境奖励。"});
addEvent("genshin","gs-onslaught-burst","幽境危战 · 紊乱爆发期","紊乱爆发期","限时阶段","2026-09-30T10:00:00+08:00","2026-10-10T04:00:00+08:00","在困难及以上难度完成战斗后，消耗树脂获取秘境奖励。","这是幽境危战的限时玩法阶段；结束后仍可进行普通挑战，但无法继续积累本阶段危战勋望。","自选祝圣秘境奖励、额外圣遗物与启圣之尘","冒险等阶≥45级，完成幽境危战相应挑战",{"start":"2026-09-30","end":"2026-10-10","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/853584114496833713","verification":"国服官方入驻账号公告 · 已读取官方图片排期","official":"https://ys.mihoyo.com/main/news","dateLabel":"9月30日 10:00 — 10月10日 03:59"});
addEvent("genshin","gs-battlepass","溯月纪行","溯月纪行","纪行","2026-09-23","2026-11-02T04:00:00+08:00","完成纪行任务，提升等级并领取对应奖励。","大地纪行默认解锁；付费档可获得纠缠之缘与指定四星武器。珍珠之歌另含溯月名片、游鱼与水中歌图纸和启圣之尘。购买在11月2日02:59关闭，关闭后仍可完成任务及领取奖励至03:59。","纪行奖励；付费档含纠缠之缘与指定四星武器","冒险等阶≥20级",{"start":"2026-09-23","end":"2026-11-02","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/850786644997964006","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","startPrecision":"version","timing":"珍珠纪行、珍珠之歌及纪行成歌购买于11月2日02:59关闭，任务及奖励领取至11月2日03:59；不要把购买截止当成全部关闭。","dateLabel":"9月23日 7.1版本更新后 — 11月2日 03:59","startAt":null});
addEvent("genshin","gs-training","砺行修远 · 勤修馈赠","砺行修远","长期活动","2026-08-10T04:00:00+08:00","2026-11-02T04:00:00+08:00","完成每日与每周砺行目标，积累进度。","当日领取4次委托奖励且消耗120树脂完成每日目标；当周完成5次每日目标计1次周进度，累计8次周进度可兑换命星。不能选择未获得的角色或过去已兑换过的角色；未兑换机会不跨期。达到8次周目标后次周开启砺行复礼，额外赠礼每周重置。","可选角色命星、阶段奖励与砺行复礼","冒险等阶≥14级，完成“西风骑士团”解锁祈愿，完成“欢迎来到冒险家协会”解锁冒险之证",{"start":"2026-08-10","end":"2026-11-02","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/834936462678953391","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","dateLabel":"8月10日 04:00 — 11月2日 03:59"});
const genshinFestival={...genshinOfficial,source:'https://www.taptap.cn/moment/851174639563443486'};
addEvent("genshin","gs-miliastra-selection","绮星盛会 · 奇域佳选","奇域佳选","千星奇域","2026-10-01T12:00:00+08:00","2026-10-22T04:00:00+08:00","游玩收录奇域，完成聚会目标并参与年度奇域评选。","游玩收录奇域完成聚会目标，积累盛会人气；可投票评选20个年度奇域。玩法10月22日03:59关闭，网页独立任务延续至11月3日04:00；绮星盛会的奇怪丘丘面具赠礼也可在主体入口查看。","冰史莱姆圆帽、原石、重现晶簇、奇丽凝晶、动作与表情","活动入口与具体目标以千星奇域界面为准",{"start":"2026-10-01","end":"2026-10-22","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851174639563443486","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","dateLabel":"10月1日 12:00 — 10月22日 03:59"});
addEvent("genshin","gs-miliastra-web","绮星盛会 · 网页特别活动","绮星盛会网页","网页活动","2026-10-01T12:00:00+08:00","2026-11-03T04:00:00+08:00","通过官方网页完成盛会任务，领取额外奖励。","完成网页独立任务领取奖励；11月3日04:00活动及网页领奖同时关闭，奖励邮件有效期30天。统计进度可能延迟1—2小时。","原石、重现晶簇与千星奇域道具","冒险等阶≥1级，登录米哈游通行证并绑定游戏角色",{"start":"2026-10-01","end":"2026-11-03","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/854673845603273392","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","dateLabel":"10月1日 12:00 — 11月3日 04:00","timing":"入口：https://act.mihoyo.com/ys/event/e20261001ugc-ali0ea/index.html?game_biz=hk4e_cn；结束后不可领取网页奖励，游戏内邮件附件请在30天内领取。"});
addEvent("genshin","gs-miliastra-create","千星之约 · 奇域创作大赛投稿","奇域创作投稿","创作活动","2026-09-23","2026-11-02T12:00:00+08:00","创作并首次发布参赛奇域，参与官方作品评选。","制作投稿期内，在千星沙箱上传界面选择赛事报名并发布参赛奇域；最多投稿2次，投稿后不可更换。评审期11月2日12:00—12月4日23:59，获奖公示12月5日00:00—12月12日23:59，可能由后续公告调整，不另列活动。","一号创作票券、原石与官方宣传机会","按赛事规则发布原创奇域",{"start":"2026-09-23","end":"2026-11-02","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851522363970290890","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","startPrecision":"version","timing":"投稿：7.1更新后—11月2日11:59；评审：11月2日12:00—12月4日23:59；获奖公示：12月5日00:00—12月12日23:59。","dateLabel":"9月23日 7.1版本更新后 — 11月2日 11:59","startAt":null});
addEvent("genshin","gs-miliastra-season","霄练赛季 · 游玩期","霄练赛季","千星奇域","2026-09-24T10:00:00+08:00","2026-11-03T04:00:00+08:00","参与拥有段位或排行榜的奇域，提升赛季成绩。","11月3日04:00进入展示期；届时仍可游玩，但不再获得竞技积分或排行榜分数。","竞技积分与排行榜成绩，具体内容取决于各奇域","唤醒千星奇域奇偶",{"start":"2026-09-24","end":"2026-11-03","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851174464136676617","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","dateLabel":"9月24日 10:00 — 11月3日 03:59"});
addEvent("genshin","gs-verdict","判测胜券本征","判测胜券本征","限时活动","2026-10-12T10:00:00+08:00","2026-10-20T10:00:00+08:00","根据双方阵容预测八轮战斗的胜负，获取参与奖励与预测评分奖励。","每轮预测持续24小时，轮次截止后不能补领该轮参与奖励；预测评分达到目标可获得物资。结果公示期为10月20日10:00至10月23日09:59，保留在主体详情；请以活动界面的本轮预测剩余时间安排参与。","原石、大英雄的经验、武器培养素材等；数量以游戏内为准","冒险等阶≥20级，完成序章第三幕“巨龙与自由之歌”；完成第七章第四幕后体验更佳",{"start":"2026-10-12","end":"2026-10-20","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/857663957001830972","verification":"国服官方入驻账号公告 · 已读取官方图片排期","official":"https://ys.mihoyo.com/main/news","dateLabel":"预测10月12日 10:00 — 10月20日 09:59","timing":"赛事预测：2026/10/12 10:00—2026/10/20 09:59；结果公示：2026/10/20 10:00—2026/10/23 09:59。每轮预测截止后不能补领该轮参与奖励。"});
addEvent("genshin","gs-imaginarium-oct","幻想真境剧诗 · 10月轮换","10月幻想真境剧诗","月度挑战","2026-10-01",null,"本期限定元素为水、冰、风。","10月本期限定水、冰、风。开幕角色为那维莱特、芭芭拉、茜特菈莉、凯亚、流浪者、布伦妮；新一期11月1日更新。只核对轮换日期，不生成准确时刻倒计时。","挑战奖励与新增表演诀窍，详见游戏内","满足幻想真境剧诗解锁条件",{"start":"2026-10-01","end":"2026-11-01","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851520146462737868","verification":"国服官方更新说明 · 仅列日期","official":"https://ys.mihoyo.com/main/news","startPrecision":"day","datePrecision":"day","lastDay":"2026-10-31","dateLabel":"10月1日 — 10月31日 · 重置时刻待核对","startAt":null});

// Honkai: Star Rail CN notices. Version-only starts retain their calendar date without inventing an opening time.
const hsrOfficial={checked:'2026-10-10',official:'https://sr.mihoyo.com/news',verification:'国服官方公告'};
const hsrSpeed={...hsrOfficial,source:'https://www.taptap.cn/moment/852209345755090727',verification:'国服官方速览排期图'};
const hsrVersionStart={startAt:null,startPrecision:'version',timing:'9月28日4.6版本更新后开启，官方未列精确开放时刻；日历按日期覆盖。'};
function addHsr(id,name,short,type,startAt,endAt,desc,rewards,condition,extra={}){
 addEvent('hsr',id,name,short,type,startAt,endAt,desc,'活动规则、奖励领取与解锁条件以对应国服公告和游戏内活动页面为准。',rewards,condition,{...hsrOfficial,...extra});
}
addHsr('hsr-ghost-robot','爱，幽灵与机器人','幽灵与机器人','限时活动','2026-09-28','2026-11-11T04:00:00+08:00','参与本期主题活动，完成玩法与任务领取限时奖励。','活动限时奖励','开拓等级≥21；支持终末视界，推荐先完成对应千星城主线',{...hsrVersionStart,dateLabel:'4.6版本更新后 — 11月11日 03:59'});
addHsr('hsr-peace-festival','星际和平盛典：一镜到底','一镜到底','限时活动','2026-10-21T12:00:00+08:00','2026-11-11T04:00:00+08:00','完成盛典活动任务，获取星琼与养成奖励。','星琼、命运的足迹、遗器残骸与纪念奖章','开拓等级≥21',{dateLabel:'10月21日 12:00 — 11月11日 03:59'});
addHsr('hsr-pet-warp','星际潮玩 · 幻宠抽取','星际潮玩','幻宠活动','2026-09-28','2026-11-11T06:00:00+08:00','使用潮玩礼券参与幻宠抽取；游园伴手礼登录福利合并在此条目。','猫猫狸、奇美拉等幻宠；登录可领取潮玩礼券×6','开拓等级≥4',{...hsrVersionStart,dateLabel:'4.6版本更新后 — 11月11日 06:00',detail:'游园伴手礼在同一期间开放，登录领取6张潮玩礼券。抽取奖励与礼券获取规则见游戏内；登录领奖不重复列活动。'});
addHsr('hsr-gather-wishes','镇伏「贪饕」，汇聚愿力','汇聚愿力','限时活动','2026-09-28','2026-11-11T06:00:00+08:00','击败被侵蚀的敌人汇聚愿力，达成活动目标。','潮玩礼券×18、星琼×500与纪念奖章','解锁金色拟造花萼「回忆之蕾」',{...hsrVersionStart,dateLabel:'4.6版本更新后 — 11月11日 06:00'});
addHsr('hsr-stellar-gift','巡星之礼 · 七日签到','巡星之礼','签到','2026-09-28','2026-11-10T04:00:00+08:00','活动期间累计签到七日，领取跃迁道具。','星轨专票×10','满足游戏内活动开放条件',{...hsrVersionStart,...hsrSpeed,dateLabel:'4.6版本更新后 — 11月10日 03:59'});
addHsr('hsr-nameless-honor','无名勋礼 · 4.6期','无名勋礼','纪行','2026-09-28','2026-11-09T04:00:00+08:00','完成本期任务提升勋礼等级，并在截止前领取已解锁奖励。','各等级勋礼奖励；付费档按购买情况领取','解锁无名勋礼',{...hsrVersionStart,...hsrSpeed,dateLabel:'4.6版本更新后 — 11月9日 03:59'});
addHsr('hsr-planar-fissure','位面分裂 · 双倍位面饰品','位面分裂','双倍掉落','2026-10-12T04:00:00+08:00','2026-10-25T04:00:00+08:00','在活动规定次数内获取双倍位面饰品奖励。','双倍位面饰品掉落','解锁对应位面饰品获取玩法',{...hsrSpeed,dateLabel:'10月12日 04:00 — 10月25日 03:59'});
addHsr('hsr-garden-plenty','花藏繁生 · 双倍拟造花萼','花藏繁生','双倍掉落','2026-10-30T04:00:00+08:00','2026-11-11T04:00:00+08:00','在活动规定次数内挑战拟造花萼，获取双倍材料奖励。','金色、赤色拟造花萼双倍掉落','解锁对应拟造花萼',{...hsrSpeed,dateLabel:'10月30日 04:00 — 11月11日 03:59'});
addHsr('hsr-pearl-warp','真珠 / 献给明日的色彩 · 活动跃迁','真珠跃迁','跃迁','2026-09-28','2026-11-10T15:00:00+08:00','真珠角色与「献给明日的色彩」光锥分别在对应活动跃迁中概率提升。','活动角色与光锥的概率提升机会','解锁跃迁；角色与光锥池独立消耗道具',{...hsrVersionStart,source:'https://www.taptap.cn/moment/852211155802787824',dateLabel:'4.6版本更新后 — 11月10日 15:00',deadlineLabel:'11/10 15:00'});
addHsr('hsr-feiying-warp','绯英 / 邂逅于下一个花季 · 活动跃迁','绯英跃迁','跃迁','2026-09-28','2026-10-21T12:00:00+08:00','绯英角色与「邂逅于下一个花季」光锥分别在对应活动跃迁中概率提升。','活动角色与光锥的概率提升机会','解锁跃迁；角色与光锥池独立消耗道具',{...hsrVersionStart,source:'https://www.taptap.cn/moment/852211155802787824',dateLabel:'4.6版本更新后 — 10月21日 11:59'});
addHsr('hsr-blade-warp','千冶·刃 / 灼尽炼狱的新骸 · 活动跃迁','千冶·刃跃迁','跃迁','2026-10-21T12:00:00+08:00','2026-11-10T15:00:00+08:00','千冶·刃角色与「灼尽炼狱的新骸」光锥分别在对应活动跃迁中概率提升。','活动角色与光锥的概率提升机会','解锁跃迁；角色与光锥池独立消耗道具',{...hsrSpeed,dateLabel:'10月21日 12:00 — 11月10日 15:00',deadlineLabel:'11/10 15:00'});
addHsr('hsr-pure-fiction-boundary','虚构叙事 · 立界开篇','立界开篇','挑战轮换','2026-09-14T04:00:00+08:00','2026-10-19T04:00:00+08:00','完成本期虚构叙事挑战，领取对应进度奖励。','本期挑战奖励','解锁虚构叙事',{source:'https://www.taptap.cn/moment/841375445998898274',dateLabel:'9月14日 04:00 — 10月19日 03:59'});
addHsr('hsr-moc-afterlife','混沌回忆 · 来生泅渡','来生泅渡','挑战轮换','2026-09-28','2026-11-02T04:00:00+08:00','完成本期混沌回忆挑战，领取对应进度奖励。','本期挑战奖励','解锁混沌回忆',{...hsrVersionStart,dateLabel:'4.6版本更新后 — 11月2日 03:59'});
addHsr('hsr-apocalyptic-forgetting','末日幻影 · 支配遗忘','支配遗忘','挑战轮换','2026-10-05T04:00:00+08:00','2026-11-16T04:00:00+08:00','完成本期末日幻影挑战，领取对应进度奖励。','本期挑战奖励','解锁末日幻影',{dateLabel:'10月5日 04:00 — 11月16日 03:59'});
addHsr('hsr-pure-fiction-images','虚构叙事 · 取象为文','取象为文','挑战轮换','2026-10-19T04:00:00+08:00','2026-11-30T04:00:00+08:00','本期虚构叙事于10月19日轮换开放。','本期挑战奖励','解锁虚构叙事',{dateLabel:'10月19日 04:00 — 11月30日 03:59'});
addHsr('hsr-moc-selection','混沌回忆 · 物竞天择','物竞天择','挑战轮换','2026-11-02T04:00:00+08:00','2026-12-14T04:00:00+08:00','本期混沌回忆于11月2日轮换开放。','本期挑战奖励','解锁混沌回忆',{dateLabel:'11月2日 04:00 — 12月14日 03:59'});
addHsr('hsr-currency-war-double','货币战争·零和博弈 · 双倍晋升点','双倍晋升点','赛季活动','2026-09-28','2026-11-11T06:00:00+08:00','4.6版本更新后开放双倍晋升点模式，本期零和博弈于11月11日结束。','命运的足迹、星轨通票、星琼等本期奖励','解锁货币战争',{...hsrVersionStart,source:'https://www.taptap.cn/moment/851522315148593252',dateLabel:'4.6版本更新后 — 11月11日 06:00',detail:'双倍模式开启时间来自4.6官方速览；此条目的起点是双倍模式开启，并非零和博弈赛季的首次开放。请在11月11日06:00赛季关闭前领取已达成奖励。'});
addHsr('hsr-outfit-offer','4.6时装限时特惠 · 月待花时 / 云边拾暖','时装限时特惠','商城优惠','2026-09-28','2026-11-11T04:00:00+08:00','绯英与风堇时装在活动期间提供限时优惠价格。','月待花时：2680星琼；云边拾暖：1350古老梦华','通过游戏内指定商城购买',{...hsrVersionStart,...hsrSpeed,dateLabel:'4.6版本更新后 — 11月11日 03:59',detail:'两款时装使用不同货币，价格与购买条件见游戏内。此条目记录特惠截止，不能将其视作优惠结束后时装下架。'});
addHsr('hsr-web-joy','乐子神智取米哈游','乐子神网页活动','网页活动','2026-09-28T10:00:00+08:00','2026-11-11T06:00:00+08:00','参与网页小队集结、回归邀请与愿力集结任务。','星琼、实物周边抽选机会等，以网页规则为准','登录官方活动页面，满足各项任务要求',{source:'https://www.taptap.cn/moment/853596636167801477',dateLabel:'9月28日 10:00 — 11月11日 06:00'});

addEvent("genshin","gs-wish-characters-second","7.1下半 · 虚星临渡 / 莓色香颂","下半角色祈愿","祈愿","2026-10-13T18:00:00+08:00","2026-11-03T15:00:00+08:00","丝柯克与爱可菲的角色活动祈愿概率提升。","丝柯克与爱可菲分别进入角色活动祈愿、角色活动祈愿-2；两者共享保底计数。四星概率提升角色同为塔利雅、坎蒂丝、米卡。同步开启且试身手角色试用，完成试用可领取奖励。","概率提升：丝柯克 / 爱可菲；塔利雅、坎蒂丝、米卡","解锁祈愿功能，使用纠缠之缘或原石",{"start":"2026-10-13","end":"2026-11-03","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/857214405664835491","official":"https://ys.mihoyo.com/main/news","verification":"国服官方入驻账号公告 · 已读取官方图片排期","dateLabel":"10月13日 18:00 — 11月3日 14:59","timing":"爱可菲同一期官方公告：https://www.taptap.cn/moment/857212584774861889"});

addEvent("genshin","gs-wish-weapons-second","7.1下半 · 神铸赋形","下半武器祈愿","武器祈愿","2026-10-13T18:00:00+08:00","2026-11-03T15:00:00+08:00","苍耀与香韵奏者的武器活动祈愿概率提升。","五星概率提升武器为单手剑苍耀、长柄武器香韵奏者；四星为弥坚骨、祭礼大剑、西风长枪、流浪乐章、祭礼弓。神铸定轨与保底规则以游戏内详情为准。","概率提升：单手剑苍耀 / 长柄武器香韵奏者","解锁祈愿功能，使用纠缠之缘或原石",{"start":"2026-10-13","end":"2026-11-03","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/857214131231526663","official":"https://ys.mihoyo.com/main/news","verification":"国服官方入驻账号公告 · 已读取官方图片排期","dateLabel":"10月13日 18:00 — 11月3日 14:59"});

addEvent("genshin","gs-tcg-hot-battle","七圣召唤 · 热斗模式：自行巧局","自行巧局","七圣召唤","2026-10-10T10:00:00+08:00","2026-10-26T04:00:00+08:00","随机选择角色牌与支援，以自动战斗规则连续挑战。","角色牌具有攻击力、等级和等阶；重复挑选可提升等级，达到条件后可突破。每场战斗前打出事件牌或装备牌、调整站位，战斗后双方角色依序自动行动。前往猫尾酒馆邀请板参与。","幸运牌币；数量以活动界面为准","冒险等阶≥32级，完成序章第三幕“巨龙与自由之歌”和世界任务“骰子、猫与卡牌的战场”",{"start":"2026-10-10","end":"2026-10-26","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/857211203124986045","official":"https://ys.mihoyo.com/main/news","verification":"国服官方入驻账号公告 · 已读取官方图片排期","dateLabel":"10月10日 10:00 — 10月26日 03:59"});

addEvent("arknights","ark-directional","定向甄选 · 自选概率提升寻访","定向甄选","寻访","2026-09-29T16:00:00+08:00","2026-10-13T04:00:00+08:00","从当期范围中选择3名六星和3名五星干员作为概率提升对象。","六星候选：Mon3tr、圣聆初雪、贝洛内、真言、锏、烛煌。本池六星只会出现已选的3名干员；五星候选与规则见公告。","自选六星与五星干员概率提升","选定并锁定当期概率提升干员，使用寻访道具",{"start":"2026-09-29","end":"2026-10-13","confirmed":true,"checked":"2026-10-11","source":"https://ak.hypergryph.com/news/1455","official":"https://ak.hypergryph.com/news/1455","verification":"国服官方公告","dateLabel":"9月29日 16:00 — 10月13日 03:59"});

addEvent("arknights","ark-resource-open","资源收集 · 关卡全天开放","资源全天开放","养成应援","2026-09-29T16:00:00+08:00","2026-10-20T04:00:00+08:00","活动期间资源收集所有关卡全天开放。","仅取消本期开放日限制；仍须满足对应关卡解锁与理智要求。","资源收集关卡的养成材料","解锁对应资源收集关卡",{"start":"2026-09-29","end":"2026-10-20","confirmed":true,"checked":"2026-10-11","source":"https://ak.hypergryph.com/news/1455","official":"https://ak.hypergryph.com/news/1455","verification":"国服官方公告","dateLabel":"9月29日 16:00 — 10月20日 03:59"});

addEvent("arknights","ark-sea-creation","昨日海 · 多平台创作征集","昨日海征集","创作活动","2026-10-09","2026-11-01T00:00:00+08:00","在已公布统一截止的平台投稿或参与互动，争取创作与抽奖奖励。","本条仅覆盖哔哩哔哩、抖音、微博、快手及QQ频道，均截至10月31日23:59。各平台话题、投稿、直播及互动门槛不同，须查对应活动页。小红书在该公告中写10月8日23:59，早于10月9日公告，日期矛盾待核实；微信游戏圈未给出截止日期，均不纳入本条截止。","现金、游戏礼包和实物周边，依平台评选或抽奖规则","按所选平台规定话题、分区、挂载或互动任务参与",{"start":"2026-10-09","end":"2026-11-01","confirmed":true,"checked":"2026-10-11","source":"https://ak.hypergryph.com/news/3033","official":"https://ak.hypergryph.com/news/3033","verification":"国服官方公告","startPrecision":"day","dateLabel":"10月9日公告后 — 10月31日 23:59 · 已核对平台","startAt":null});

addEvent("endfield","end-web-fusion","融合！山团团！","融合山团团","网页活动","2026-10-01T12:00:00+08:00",null,"融合山团团获取积分，完成指定网页任务。","期限为下次版本更新维护前。丹青渡更新日已公布为10月15日，维护时刻仍待官方公告。","300嵌晶玉、折金票","通过活动网页登录账号，完成指定任务",{"start":"2026-10-01","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/2653","official":"https://endfield.hypergryph.com/news/2653","verification":"国服官方公告","boundaryDate":"2026-10-15","dateLabel":"10月01日 12:00 — 10月15日版本维护前 · 时刻待公告"});

addEvent("endfield","end-npu-gift","我们的大菲林！来袭！","大菲林馈赠","登录福利","2026-09-24T12:00:00+08:00",null,"登录并参与各类玩法，领取干员与武器馈赠。","各项领取条件按游戏内活动要求；截止于10月15日版本维护前，具体时刻待公告。","五星干员噗切娜、其信物×5、五星单手剑点心时刻×6","登录并完成对应玩法任务",{"start":"2026-09-24","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/2653","official":"https://endfield.hypergryph.com/news/2653","verification":"国服官方公告","boundaryDate":"2026-10-15","dateLabel":"09月24日 12:00 — 10月15日版本维护前 · 时刻待公告"});

addEvent("endfield","end-oldcity","于钟鸣的旧城","钟鸣旧城","引入活动","2026-09-24T12:00:00+08:00",null,"前往武陵遂明完成指定引入任务。","引入活动奖励截止于10月15日版本维护前，具体时刻待公告。","1200嵌晶玉、存续的痕迹","达到遂明对应任务解锁前置",{"start":"2026-09-24","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/2653","official":"https://endfield.hypergryph.com/news/2653","verification":"国服官方公告","boundaryDate":"2026-10-15","dateLabel":"09月24日 12:00 — 10月15日版本维护前 · 时刻待公告"});

addEvent("endfield","end-war-misvision","战争回响 · 错视赛季","错视赛季","挑战赛季","2026-09-24T12:00:00+08:00",null,"挑战错视赛季的轮换关卡，领取赛季首通奖励。","官方说明分3个轮换周期，每期3关；未公开具体轮换边界，不自行推算。赛季截至10月15日维护前。","新增关卡普通难度全部完成可获300嵌晶玉等","解锁战争回响并完成关卡",{"start":"2026-09-24","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/2653","official":"https://endfield.hypergryph.com/news/2653","verification":"国服官方公告","boundaryDate":"2026-10-15","dateLabel":"09月24日 12:00 — 10月15日版本维护前 · 时刻待公告"});

addEvent("endfield","end-yvonne-banner","绚丽异彩 · 重构寻访#1","伊冯重构寻访","寻访","2026-09-24T12:00:00+08:00",null,"六星干员伊冯获取概率提升。","重构寻访与其他寻访类型规则不同；本系列前120次必获伊冯仅生效一次，计数继承本系列后续寻访。结束于10月15日维护前。","概率提升：伊冯","完成第一章进程Ⅰ主线任务“基地解围”",{"start":"2026-09-24","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/2651","official":"https://endfield.hypergryph.com/news/2651","verification":"国服官方公告","boundaryDate":"2026-10-15","dateLabel":"09月24日 12:00 — 10月15日版本维护前 · 时刻待公告"});

addEvent("endfield","end-art-weapon","点绘申领 · 重构申领#1","艺术暴君申领","武器申领","2026-09-24T12:00:00+08:00",null,"六星手铳艺术暴君获取概率提升。","重构申领规则与其他武库申领不同，具体次数奖励及规则以公告和游戏内为准；10月15日维护前结束。","概率提升：艺术暴君（手铳）","完成第一章进程Ⅰ主线任务“基地解围”",{"start":"2026-09-24","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/2651","official":"https://endfield.hypergryph.com/news/2651","verification":"国服官方公告","boundaryDate":"2026-10-15","dateLabel":"09月24日 12:00 — 10月15日版本维护前 · 时刻待公告"});

addEvent("endfield","end-preview-gift","丹青渡 · 新版本导览奖励","丹青渡导览奖励","独立领奖","2026-10-06T21:00:00+08:00",null,"登录新版本导览网页领取前瞻节目奖励。","网页长期可浏览且内容随版本替换，奖励领取按钮只保留至对应版本更新维护前；领取后发放至角色邮箱。同一期每个账号仅领一次。","1000嵌晶玉、折金票×10000、初级认知载体×8、武器检查套组×4","在页面登录游戏账号，且在游戏内已创建角色",{"start":"2026-10-06","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/4774","official":"https://endfield.hypergryph.com/news/4774","verification":"国服官方公告","boundaryDate":"2026-10-15","dateLabel":"10月6日 21:00 — 10月15日版本维护前 · 时刻待公告"});

addEvent("fgo","fgo-3300-login","3300万下载纪念 · 十次登录领奖","3300万登录领奖","签到","2026-10-09T04:00:00+08:00","2026-10-23T04:00:00+08:00","在登录窗口内累计十次登录，领取纪念奖励。","一天最多计一次，与纪念活动总窗口的截止不同。","30圣晶石、传承结晶、稀有魔力棱镜等","累计登录10次",{"start":"2026-10-09","end":"2026-10-23","confirmed":true,"checked":"2026-10-11","source":"https://www.sina.cn/news/detail/5351068138996166.html","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18433","verification":"认证国服官博公告转载核对","parentEvent":"fgo-3300-downloads","dateLabel":"10月9日 04:00 — 10月23日 03:59"});

addEvent("fgo","fgo-assassin-tickets","Assassin应援 · 暗匿者养成兑换券交换","暗匿者兑换券","兑换","2026-10-05T00:00:00+08:00","2026-11-02T00:00:00+08:00","兑换已获得的暗匿者养成兑换券。","任务10月18日23:59结束、报酬10月25日23:59停止领取；兑换券11月1日23:59停止交换并在到期后删除。","暗阶银棋、暗阶金像、暗之辉石、暗之魔石、暗之秘石中选择","持有暗匿者养成兑换券",{"start":"2026-10-05","end":"2026-11-02","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18411","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18411","verification":"国服官方公告","parentEvent":"fgo-assassin","dateLabel":"10月5日 00:00 — 11月1日 23:59"});

addEvent("fgo","fgo-assassin-summon","冠位戴冠战：Assassin · 推荐召唤","Assassin召唤","推荐召唤","2026-10-04T19:00:00+08:00","2026-10-22T14:00:00+08:00","13种卡池同时推荐包含限定从者在内的32骑Assassin职阶从者。","各卡池计数独立，不能互相继承；本期也可能抽到其他职阶从者。对象测试关卡与幕间物语同期开放。具体每池从者见公告图片及游戏内详情。","Assassin从者概率提升，测试与幕间体验","解锁召唤功能，持有所需圣晶石或呼符",{"start":"2026-10-04","end":"2026-10-22","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18412","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18412","verification":"国服官方公告","dateLabel":"10月4日 19:00 — 10月22日 13:59"});

addEvent("fgo","fgo-guda-kawakami","新选组 THE END · 河上彦斋推荐召唤","河上彦斋召唤","推荐召唤","2026-09-24","2026-10-22T14:00:00+08:00","河上彦斋、藤堂平助及3张活动礼装概率提升。活动关卡结束后卡池仍延续一周。","各独立卡池的开启日及推荐对象按国服召唤详情区分，召唤计数不互相继承。卡池整体关闭不等于剧情活动或商店关闭。","概率提升：河上彦斋、藤堂平助及活动礼装","解锁召唤功能，持有所需圣晶石或呼符",{"start":"2026-09-24","end":"2026-10-22","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18398","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18398","verification":"国服官方公告","dateLabel":"9月24日维护后 — 10月22日 13:59","startPrecision":"version","startAt":null});

addEvent("fgo","fgo-guda-kondo","新选组 THE END · 近藤勇推荐召唤","近藤勇召唤","推荐召唤","2026-09-30T19:00:00+08:00","2026-10-15T14:00:00+08:00","近藤勇、藤堂平助及3张活动礼装概率提升。","各独立卡池的开启日及推荐对象按国服召唤详情区分，召唤计数不互相继承。卡池整体关闭不等于剧情活动或商店关闭。","概率提升：近藤勇、藤堂平助及活动礼装","解锁召唤功能，持有所需圣晶石或呼符",{"start":"2026-09-30","end":"2026-10-15","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18406","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18406","verification":"国服官方公告","dateLabel":"09-30 19:00 — 10-15 13:59"});

addEvent("fgo","fgo-guda-summon2","新选组 THE END · 土方岁三推荐召唤","土方岁三召唤","推荐召唤","2026-09-26T19:00:00+08:00","2026-10-15T14:00:00+08:00","土方岁三、斋藤一、永仓新八及3张活动礼装概率提升。","已读取国服官方排期图片。本独立卡池9月26日19:00开启、10月15日13:59结束；与同期冲田总司卡池的召唤计数不互相继承。","概率提升：土方岁三、斋藤一、永仓新八及活动礼装","解锁召唤功能，持有所需圣晶石或呼符",{"start":"2026-09-26","end":"2026-10-15","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18399","verification":"国服官方公告及排期图核对","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18399","dateLabel":"9月26日 19:00 — 10月15日 13:59"});

addEvent("fgo","fgo-guda-summon4","新选组 THE END · 坂本龙马（Lancer）推荐召唤","坂本龙马召唤","推荐召唤","2026-10-05T19:00:00+08:00","2026-10-12T14:00:00+08:00","坂本龙马（Lancer）、冈田以藏及3张活动礼装概率提升。","已读取国服官方排期图片。本独立卡池10月5日19:00开启、10月12日13:59结束；魔王信长卡池已于10月10日13:59关闭，各卡池的召唤计数不互相继承。","概率提升：坂本龙马（Lancer）、冈田以藏及活动礼装","解锁召唤功能，持有所需圣晶石或呼符",{"start":"2026-10-05","end":"2026-10-12","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18407","verification":"国服官方公告及排期图核对","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18407","dateLabel":"10月5日 19:00 — 10月12日 13:59"});

addEvent("fgo","fgo-fop-oc1","Final Order Project · 奏章Ⅰ通关应援限定任务","奏章Ⅰ限定任务","主线限定任务","2026-09-29T19:00:00+08:00","2026-10-06T19:00:00+08:00","在限定任务完成期内推进对应主线，领取通关应援任务奖励。","限定任务只到10-06 18:59，奖励领取到10-13 18:59。推进对象主线1、2、3关分别得1圣晶石；已全通主线者可自动完成但须登录领取。新增奏章特殊通关任务为常驻，不在12月20日消失；灵脉石特价交换和使用各至12月31日23:59。 本条首页截止采用限时任务完成期；公告总应援窗口延续至12月20日13:59，相关永久特殊通关任务继续保留。主线AP减免与灵脉石优惠另按共同应援窗口记录，持续至12月31日23:59。","限定推进任务合计3圣晶石；永久奏章通关任务含五星芙芙、种火、巡灵之叶与QP","限定任务不含亚种特异点、第2部5.5/6.5章和主线物语；永久任务须通关对应奏章章节",{"start":"2026-09-29","end":"2026-10-06","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18400","verification":"国服官方公告","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18400","dateLabel":"09-29 19:00 — 10-06 18:59","timing":"本期限定任务完成至10-06 18:59；领取至10-13 18:59。灵脉石优惠兑换与道具使用至12月31日23:59。特殊通关任务为永久新增，活动总窗口不代表这些任务到期。"});


addEvent("fgo","fgo-fop-oc1-claim","奏章Ⅰ应援 · 限定任务领奖","奏章Ⅰ领奖","领奖","2026-09-29T19:00:00+08:00","2026-10-13T19:00:00+08:00","领取已完成的本期主线推进任务奖励。","领奖截止比任务完成截止晚一周。","最多3圣晶石","在对应任务期达成任务并登录领取",{"start":"2026-09-29","end":"2026-10-13","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18400","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18400","verification":"国服官方公告","parentEvent":"fgo-fop-oc1","dateLabel":"09-29 19:00 — 10-13 18:59"});

addEvent("fgo","fgo-fop-oc2","Final Order Project · 奏章Ⅱ通关应援限定任务","奏章Ⅱ限定任务","主线限定任务","2026-10-06T19:00:00+08:00","2026-10-13T19:00:00+08:00","在限定任务完成期内推进对应主线，领取通关应援任务奖励。","限定任务只到10-13 18:59，奖励领取到10-20 18:59。推进对象主线1、2、3关分别得1圣晶石；已全通主线者可自动完成但须登录领取。新增奏章特殊通关任务为常驻，不在12月20日消失；灵脉石特价交换和使用各至12月31日23:59。 本条首页截止采用限时任务完成期；公告总应援窗口延续至12月20日13:59，相关永久特殊通关任务继续保留。主线AP减免与灵脉石优惠另按共同应援窗口记录，持续至12月31日23:59。","限定推进任务合计3圣晶石；永久奏章通关任务含五星芙芙、种火、巡灵之叶与QP","限定任务不含亚种特异点、第2部5.5/6.5章和主线物语；永久任务须通关对应奏章章节",{"start":"2026-10-06","end":"2026-10-13","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18413","verification":"国服官方公告","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18413","dateLabel":"10-06 19:00 — 10-13 18:59","timing":"本期限定任务完成至10-13 18:59；领取至10-20 18:59。灵脉石优惠兑换与道具使用至12月31日23:59。特殊通关任务为永久新增，活动总窗口不代表这些任务到期。"});


addEvent("fgo","fgo-fop-oc2-claim","奏章Ⅱ应援 · 限定任务领奖","奏章Ⅱ领奖","领奖","2026-10-06T19:00:00+08:00","2026-10-20T19:00:00+08:00","领取已完成的本期主线推进任务奖励。","领奖截止比任务完成截止晚一周。","最多3圣晶石","在对应任务期达成任务并登录领取",{"start":"2026-10-06","end":"2026-10-20","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18413","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18413","verification":"国服官方公告","parentEvent":"fgo-fop-oc2","dateLabel":"10-06 19:00 — 10-20 18:59"});

addEvent("fgo","fgo-fop-oc3","Final Order Project · 奏章Ⅲ通关应援限定任务","奏章Ⅲ限定任务","主线限定任务","2026-10-13T19:00:00+08:00","2026-10-20T19:00:00+08:00","在限定任务完成期内推进对应主线，领取通关应援任务奖励。","限定任务只到10-20 18:59，奖励领取到10-27 18:59。推进对象主线1、2、3关分别得1圣晶石；已全通主线者可自动完成但须登录领取。新增奏章特殊通关任务为常驻，不在12月20日消失；灵脉石特价交换和使用各至12月31日23:59。 本条首页截止采用限时任务完成期；公告总应援窗口延续至12月20日13:59，相关永久特殊通关任务继续保留。主线AP减免与灵脉石优惠另按共同应援窗口记录，持续至12月31日23:59。","限定推进任务合计3圣晶石；永久奏章通关任务含五星芙芙、种火、巡灵之叶与QP","限定任务不含亚种特异点、第2部5.5/6.5章和主线物语；永久任务须通关对应奏章章节",{"start":"2026-10-13","end":"2026-10-20","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18439","verification":"国服官方公告","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18439","dateLabel":"10-13 19:00 — 10-20 18:59","timing":"本期限定任务完成至10-20 18:59；领取至10-27 18:59。灵脉石优惠兑换与道具使用至12月31日23:59。特殊通关任务为永久新增，活动总窗口不代表这些任务到期。"});


addEvent("fgo","fgo-fop-oc3-claim","奏章Ⅲ应援 · 限定任务领奖","奏章Ⅲ领奖","领奖","2026-10-13T19:00:00+08:00","2026-10-27T19:00:00+08:00","领取已完成的本期主线推进任务奖励。","领奖截止比任务完成截止晚一周。","最多3圣晶石","在对应任务期达成任务并登录领取",{"start":"2026-10-13","end":"2026-10-27","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18439","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18439","verification":"国服官方公告","parentEvent":"fgo-fop-oc3","dateLabel":"10-13 19:00 — 10-27 18:59"});

addEvent("fgo","fgo-assassin-opening","冠位戴冠战：Assassin · 开幕","Assassin开幕","开放节点","2026-10-15",null,"Assassin职阶冠位戴冠战预定10月15日开幕。","官方预告只公布开幕日期，未列精确开启时刻；开放前先强化所需Assassin从者。","常驻冠位战玩法与养成奖励","冠位从者选定和玩法解锁条件以游戏内为准",{"start":"2026-10-15","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18411","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18411","verification":"国服官方公告","milestone":true,"startPrecision":"day","dateLabel":"10月15日预定开幕 · 时刻待公告","startAt":null});

addEvent("genshin","gs-exploration-bonus","无神怜爱的冻土 · 至冬探索限时奖励","至冬探索奖励","探索奖励","2026-08-12","2026-11-03T15:00:00+08:00","完成指定至冬探索任务，领取额外原石奖励。","覆盖古兽冰原、永凝冻土、霜殛寒峰、焰羽谷、白桦雪葬地；地区永久开放，截止的是额外探索任务奖励。","原石400","在活动界面完成指定探索任务；公告未单列等级条件",{"start":"2026-08-12","end":"2026-11-03","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/835831203461334278","official":"https://ys.mihoyo.com/main/news","verification":"国服官方入驻账号公告","dateLabel":"8月12日 7.0版本更新后 — 11月3日 14:59","startPrecision":"version","timing":"按版本更新日覆盖月历；实际随维护完成开放，不设固定开服时刻。","startAt":null});

addEvent("genshin","gs-miliastra-free-outfit","绮衣珍赏·晴暖","午后蜜果装扮","千星奇域","2026-09-23","2026-11-04T06:00:00+08:00","完成珍赏任务，积累珍赏见闻领取装扮。","每周可得奖励次数有上限；首次领取部件前可切换奖励套装，领取后不能再改。","自选午后蜜果装扮套装一套、重现晶簇","唤醒千星奇域奇偶后",{"start":"2026-09-23","end":"2026-11-04","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851174279427917260","official":"https://ys.mihoyo.com/main/news","verification":"国服官方入驻账号公告","dateLabel":"9月23日 7.1版本更新后 — 11月4日 05:59","startPrecision":"version","timing":"按版本更新日覆盖月历；实际随维护完成开放，不设固定开服时刻。","startAt":null});

addEvent("genshin","gs-miliastra-dress-wishes","奇域秘藏 · 暄霁霄练 / 幻夜游烛","装扮活动颂愿","装扮颂愿","2026-09-23","2026-11-03T15:00:00+08:00","两类活动颂愿提供限定奇偶装扮。","桂影霄练与烛影狂欢夜分别进入装扮活动颂愿及活动颂愿-2；同一性别5星装扮再次获得可解锁升炼效果，具体出率见游戏内。","限定5星桂影霄练 / 烛影狂欢夜及相应4星装扮","唤醒千星奇域奇偶，消耗颂愿道具；具体出率见游戏内",{"start":"2026-09-23","end":"2026-11-03","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851173745778230617","official":"https://ys.mihoyo.com/main/news","verification":"国服官方入驻账号公告","dateLabel":"9月23日 7.1版本更新后 — 11月3日 14:59","startPrecision":"version","timing":"按版本更新日覆盖月历；实际随维护完成开放，不设固定开服时刻。","relatedSource":"https://www.taptap.cn/moment/851173940167443550","startAt":null});

addEvent("genshin","gs-miliastra-battlepass","霄练纪游","霄练纪游","千星纪游","2026-09-23","2026-11-02T04:00:00+08:00","完成千星奇域纪游任务，领取各档奖励。","诸界纪游付费档可得佳时萤火装扮，诸界史诗另含清虚桂殿·花间独酌私人大厅。付费购买11月2日02:59关闭，任务及领取至03:59。","纪游奖励；付费档含佳时萤火装扮及对应专属大厅","唤醒千星奇域奇偶；付费档按游戏内购买规则",{"start":"2026-09-23","end":"2026-11-02","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851173745778230617","official":"https://ys.mihoyo.com/main/news","verification":"国服官方入驻账号公告","dateLabel":"9月23日 7.1版本更新后 — 11月2日 03:59","startPrecision":"version","timing":"按版本更新日覆盖月历；实际随维护完成开放，不设固定开服时刻。","startAt":null});

addEvent("genshin","gs-miliastra-shop-discount","千星商城 · 盛会特惠","盛会特惠","限时优惠","2026-09-23","2026-11-02T04:00:00+08:00","7.1上新装扮限时6折。","本条截止仅为折扣；新品连续上架三个版本，未公告最终固定日期。部分男女装扮组合仅在折扣期售卖。","对应装扮购买6折优惠","唤醒千星奇域奇偶；需消耗事象凝核购买",{"start":"2026-09-23","end":"2026-11-02","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851173745778230617","official":"https://ys.mihoyo.com/main/news","verification":"国服官方入驻账号公告","dateLabel":"9月23日 7.1版本更新后 — 11月2日 03:59","startPrecision":"version","timing":"按版本更新日覆盖月历；实际随维护完成开放，不设固定开服时刻。","startAt":null});

addEvent("genshin","gs-miliastra-shop-return","千星商城 · 装扮限时返场","装扮返场","限时返场","2026-09-23","2026-11-03T04:00:00+08:00","部分已下架的装扮在商城限时返场。","返场期间最多可8折购买3套装扮，名单与购买细则见千星商城。","返场装扮限时购买与8折优惠","唤醒千星奇域奇偶；需消耗商城货币购买",{"start":"2026-09-23","end":"2026-11-03","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851173940167443550","official":"https://ys.mihoyo.com/main/news","verification":"国服官方入驻账号公告","dateLabel":"9月23日 7.1版本更新后 — 11月3日 03:59:59","startPrecision":"version","timing":"按版本更新日覆盖月历；实际随维护完成开放，不设固定开服时刻。","startAt":null});

addEvent("genshin","gs-tcg-forging","七圣召唤 · 铸境研炼：巧策进斗","巧策进斗","七圣召唤","2026-09-23",null,"设置挑战条件，完成四个牌局关卡获取积分。","可选关卡难度、对手生命值及对局回合数，达到积分目标领取奖励。活动持续至7.1版本结束，准确关闭时刻待后续公告。","幸运牌币等奖励；数量见活动界面","冒险等阶≥32级，完成巨龙与自由之歌及骰子、猫与卡牌的战场",{"start":"2026-09-23","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/850785708992889226","official":"https://ys.mihoyo.com/main/news","verification":"国服官方入驻账号公告","dateLabel":"9月23日 7.1版本更新后 — 7.1版本结束 · 时刻待公告","startPrecision":"version","timing":"按版本更新日覆盖月历；实际随维护完成开放，不设固定开服时刻。","startAt":null});

addEvent("genshin","gs-abyss-current","深境螺旋 · 辉卷之月","当前深境螺旋","月度挑战","2026-09-16",null,"当前期深境螺旋，10月16日进入下一轮。","第11层风雷伤害加成，第12层分别强化扩散/星扩散和感电/月感电。官方只列9月16日与10月16日轮换日期；准确重置时刻待核对。","原石、培养材料与圣物匣等；按挑战结果领取","达到深境螺旋解锁条件，推进对应层数",{"start":"2026-09-16","end":"2026-10-16","confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/836309619453201032","official":"https://ys.mihoyo.com/main/news","verification":"国服官方入驻账号公告","dateLabel":"9月16日 — 10月15日 · 10月16日轮换，时刻待核对","startPrecision":"day","datePrecision":"day","lastDay":"2026-10-15","timing":"下一轮10月16日更新来源：https://www.taptap.cn/moment/851520146462737868；本条按完整日期覆盖，不生成精确倒计时。","startAt":null});

addEvent("genshin","gs-abyss-oct-update","深境螺旋 · 骇星之月更新","10月深境更新","挑战节点","2026-10-16",null,"官方确认10月16日更新深境螺旋。","新期第11层风冰伤害加成，第12层上半强化星烁、下半强化冰伤。只列开放日，不推算下一期关闭日。","挑战奖励按游戏内层数与星数领取","达到深境螺旋解锁条件",{"start":"2026-10-16","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851520146462737868","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","dateLabel":"10月16日更新 · 具体时刻待核对","startPrecision":"day","milestone":true,"startAt":null});

addEvent("genshin","gs-imaginarium-nov-update","幻想真境剧诗 · 11月轮换","11月幻想真境更新","挑战节点","2026-11-01",null,"官方确认11月1日更新，限定水、雷、岩。","开幕角色为夜兰、爱诺、菲林斯、菲谢尔、钟离、卡齐娜；只列开放日，不推算本期关闭日。","挑战奖励及新增表演诀窍，详见游戏内","满足幻想真境剧诗解锁条件",{"start":"2026-11-01","end":null,"confirmed":true,"checked":"2026-10-11","source":"https://www.taptap.cn/moment/851520146462737868","verification":"国服官方入驻账号公告","official":"https://ys.mihoyo.com/main/news","dateLabel":"11月1日更新 · 具体时刻待核对","startPrecision":"day","milestone":true,"startAt":null});

addEvent("ff14","ff14-fanfest3-register","Fan Festival 2026 第三站 · 成都转播会抽选登记","转播会抽选","线下活动报名","2026-10-10T14:00:00+08:00","2026-10-12T14:00:00+08:00","满足条件的账号可登记成都主题演讲线下转播会门票抽选。","登记窗口为10月10日14:00—10月12日14:00；抽中后的确认窗口为10月12日16:00—10月14日16:00，请在官方专题完成确认。10月31日10:00—12:00主题演讲同步进行官方线上直播，开始时间可能调整。","成都线下主题演讲转播会门票抽选资格（不保证抽中）","2026年4月28日至10月9日期间有登录游戏记录，且最高职业等级达到100级的账号",{"start":"2026-10-10","end":"2026-10-12","source":"https://ff.web.sdo.com/web8/index.html#/newstab/newscont/393963","confirmed":true,"checked":"2026-10-11","verification":"国服官方公告与活动规则","dateLabel":"10月10日 14:00 — 10月12日 14:00","official":"https://ff.web.sdo.com/web8/index.html#/newstab/newscont/393963"});

addEvent("ff14","ff14-fanfest3-confirm","Fan Festival 2026 第三站 · 抽选确认","转播会确认","网页确认","2026-10-12T16:00:00+08:00","2026-10-14T16:00:00+08:00","已抽中账号在指定窗口确认线下转播会资格。","请在官方专题检查结果及确认；与抽选登记主体关联，不单独计入日历或首页。","保留抽选获得的线下转播会资格","本次登记并抽中的账号",{"start":"2026-10-12","end":"2026-10-14","source":"https://ff.web.sdo.com/web8/index.html#/newstab/newscont/393963","confirmed":true,"checked":"2026-10-11","verification":"国服官方公告与活动规则","parentEvent":"ff14-fanfest3-register","dateLabel":"10月12日 16:00 — 10月14日 16:00"});

addEvent("ff14","ff14-fanfest3-keynote","Fan Festival 2026 第三站 · 主题演讲转播","粉丝节转播","直播活动","2026-10-31T10:00:00+08:00","2026-10-31T12:00:00+08:00","吉田直树介绍最终幻想14今后的最新发展，官方B站直播间转播。","以上均为北京时间，节目开始时间可能根据现场情况调整；11月1日节目不设转播。观看入口：https://live.bilibili.com/5225。","主题演讲直播内容","通过官方B站直播间观看；线下成都转播会须满足抽选要求",{"start":"2026-10-31","end":"2026-10-31","source":"https://ff.web.sdo.com/web8/index.html#/newstab/newscont/393963","confirmed":true,"checked":"2026-10-11","verification":"国服官方公告与活动规则","dateLabel":"10月31日 10:00 — 12:00 · 官方预计"});

addEvent("fgo","fgo-guda-okita","新选组 THE END · 冲田总司（Saber）推荐召唤","冲田总司召唤","推荐召唤","2026-09-28T19:00:00+08:00","2026-10-15T14:00:00+08:00","冲田总司（Saber）、山南敬助及3张活动礼装概率提升。","已读取国服官方排期图片。本独立卡池9月28日19:00开启、10月15日13:59结束；与同期土方岁三卡池的召唤计数不互相继承。","概率提升：冲田总司（Saber）、山南敬助及活动礼装","解锁召唤功能，持有所需圣晶石或呼符",{"start":"2026-09-28","end":"2026-10-15","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18399","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18399","verification":"国服官方公告及排期图核对","dateLabel":"9月28日 19:00 — 10月15日 13:59"});

addEvent("fgo","fgo-guda-maou-ended","新选组 THE END · 魔王信长推荐召唤","魔王信长召唤","推荐召唤","2026-10-03T19:00:00+08:00","2026-10-10T14:00:00+08:00","魔王信长及3张活动礼装的推荐召唤，本池已结束。","已读取国服官方排期图片，本池只到10月10日13:59，不能将召唤4总截止10月12日套在本卡池。","概率提升：织田信长（魔王信长）及活动礼装","解锁召唤功能，持有所需圣晶石或呼符",{"start":"2026-10-03","end":"2026-10-10","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18407","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18407","verification":"国服官方公告及排期图核对","dateLabel":"10月3日 19:00 — 10月10日 13:59"});

addEvent("fgo","fgo-fop-mainline-aid","Final Order Project · 主线AP减免与灵脉石优惠","主线AP与续关应援","主线通关应援","2026-09-29","2027-01-01T00:00:00+08:00","主线AP消耗0持续至年底；以优惠价格获取可用于对应主线续关的灵脉石。","国服官方奏章Ⅰ/Ⅱ/Ⅲ应援公告共同确认：第1部、第2部、奏章Ⅰ—Ⅳ主线关卡AP消耗0至12月31日23:59。本条9月29日起记录已实施优惠，不是AP减免初次开启日；未把自由关卡或所有玩法列为AP0。魔力棱镜交换中，本期追加灵脉石特价1魔力棱镜/次，次数以工房库存为准。灵脉石优惠交换和道具使用均至12月31日23:59，超过期限无法使用。","主线AP消耗0；优惠灵脉石续关","已解锁对象主线；交换需魔力棱镜，续关需持有灵脉石",{"start":"2026-09-29","startPrecision":"day","end":"2027-01-01","confirmed":true,"checked":"2026-10-11","source":"https://game.bilibili.com/fgo/news.html#!news/0/1/18400","official":"https://game.bilibili.com/fgo/news.html#!news/0/1/18400","verification":"国服官方公告（公开新闻接口核对）","dateLabel":"9月29日起已核对持续生效 — 12月31日 23:59","timing":"12月20日13:59为相关应援公告总窗口，不是主线AP0、灵脉石特价交换或道具使用的结束。灵脉石可续关对象还包含亚种特异点、5.5/6.5章及终章，具体适用关卡按游戏内说明。","startAt":null});

addEvent("endfield","end-bow-trial","挽弓试炼 · 限时挑战","挽弓试炼","挑战","2026-09-09T12:00:00+08:00",null,"完成提弗洛斯靶场的模拟训练与试炼任务，领取限时奖励。","活动10月15日版本维护前结束。结束后无法完成试炼任务或领取对应限时奖励；提弗洛斯靶场仍可游玩并取得模拟训练首通奖励，两者不要混同。","1200嵌晶玉、高级认知载体、存续的痕迹与高阶培养自选箱Ⅰ等","解锁提弗洛斯靶场并完成对应模拟训练与试炼任务",{"end":null,"confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/2653","official":"https://endfield.hypergryph.com/news/2653","verification":"国服官方公告","boundaryDate":"2026-10-15","start":"2026-09-09","dateLabel":"9月9日 12:00 — 10月15日版本维护前 · 时刻待公告"});

addEvent("endfield","end-pass-forest","协议通行证 · 幽林","幽林通行证","通行证","2026-09-02",null,"在雪凇幽梦版本期间提升通行证等级，领取对应支援奖励。","基础配给在每期开启时默认解锁。官方仅写雪凇幽梦版本期间，未公布精确结算时刻；10月15日新版本开启，请提前完成等级任务并领取已解锁奖励。","基础寻访凭证、嵌晶玉、兑换惊喜箱与培养素材等","解锁协议通行证功能并达成对应等级；付费配给另按游戏内要求",{"end":null,"confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/2653","official":"https://endfield.hypergryph.com/news/2653","verification":"国服官方公告","boundaryDate":"2026-10-15","start":"2026-09-02","startPrecision":"version","dateLabel":"9月2日版本更新后 — 10月15日版本更替 · 结算时刻待公告","startAt":null});

addEvent("endfield","end-snow-mail-compensation","雪凇幽梦 · 更新补偿邮件领取","雪凇补偿邮件","独立领奖","2026-09-02",null,"领取雪凇幽梦版本更新维护和问题修复补偿邮件。","两封补偿邮件均于下次版本更新维护时过期；10月15日丹青渡开启，维护时刻仍待公告。领取本项无需完成叙事或挑战活动，但须满足创建角色和邮箱条件。","合计1800嵌晶玉（维护补偿900＋问题修复补偿900）","2026年9月2日更新前已创建角色并解锁邮箱功能",{"end":null,"confirmed":true,"checked":"2026-10-11","source":"https://endfield.hypergryph.com/news/2653","official":"https://endfield.hypergryph.com/news/2653","verification":"国服官方公告","boundaryDate":"2026-10-15","start":"2026-09-02","startPrecision":"version","dateLabel":"9月2日维护后 — 10月15日版本维护前 · 时刻待公告","startAt":null});

// Related reward windows stay in source data and appear as reminders in the main activity details.
const RELATED_REWARD_WINDOWS={
 'ff14-gold84-register':'ff14-gold84-duty',
 'ark-sea-shop':'ark-sea',
 'ark-vector-reward':'ark-vector',
 'fgo-gudaguda-shop':'fgo-gudaguda'
};
for(const e of GAME_EVENTS)if(RELATED_REWARD_WINDOWS[e.id])e.parentEvent=RELATED_REWARD_WINDOWS[e.id];

// Version-bound progression and routine version items are kept for source history,
// but are not listed as independent activities in the overview or game calendars.
const VERSION_ROUTINE_TYPES=new Set(['通行证','纪行','千星纪游','无名勋礼']);
const VERSION_ROUTINE_IDS=new Set(['gs-miliastra-season','end-snow-mail-compensation']);
for(const e of GAME_EVENTS)if(VERSION_ROUTINE_TYPES.has(e.type)||VERSION_ROUTINE_IDS.has(e.id))e.versionRoutine=true;

// Published US calendar windows mapped to CN weekly dates at the user's request.
const WOW_US_CALENDAR_20261014=[
  {
    "id": "wow-us-mop-20261008",
    "name": "熊猫人之谜 · 时光漫游",
    "short": "熊猫人之谜漫游",
    "type": "时光漫游",
    "game": "wow",
    "start": "2026-10-08",
    "startAt": null,
    "startPrecision": "day",
    "end": "2026-10-16",
    "endAt": null,
    "datePrecision": "day",
    "lastDay": "2026-10-15",
    "confirmed": true,
    "checked": "2026-10-14",
    "source": "https://www.wowdb.com/world-events/643-timewalking-dungeon-event",
    "crossSource": "https://www.wowdb.com/world-events/weekly/",
    "verification": "周常活动日历",
    "dateLabel": "2026-10-08 — 2026-10-15 05:00",
    "deadlineLabel": "10/15 05:00",
    "desc": "重访熊猫人之谜地下城，参与本期时光漫游。",
    "detail": "未核实国服实际可排副本池、参与等级和周常任务奖励，不把旧版本奖励数值直接套入。",
    "rewards": "本期奖励事件奖励；数量与物品等级以国服游戏内为准",
    "condition": "解锁对应玩法并满足国服游戏内参与条件",
    "timing": "周常每周四北京时间05:00结束。",
    "usCalendar": {
      "region": "US",
      "timeZone": "America/Los_Angeles",
      "startLocal": "2026-10-06T08:00:00-07:00",
      "endLocal": "2026-10-13T07:00:00-07:00",
      "startBeijing": "2026-10-06T23:00:00+08:00",
      "endBeijing": "2026-10-13T22:00:00+08:00",
      "mapping": "US-Tuesday-to-CN-Thursday"
    },
    "weeklyResetDate": "2026-10-15"
  },
  {
    "id": "wow-us-pet-20261015",
    "name": "宠物对战奖励周",
    "short": "宠物对战奖励周",
    "type": "奖励周",
    "game": "wow",
    "start": "2026-10-15",
    "startAt": null,
    "startPrecision": "day",
    "end": "2026-10-23",
    "endAt": null,
    "datePrecision": "day",
    "lastDay": "2026-10-22",
    "confirmed": true,
    "checked": "2026-10-14",
    "source": "https://www.wowdb.com/world-events/565-pet-battle-bonus-event",
    "crossSource": "https://www.wowdb.com/world-events/weekly/",
    "verification": "周常活动日历",
    "dateLabel": "2026-10-15 — 2026-10-22 05:00",
    "deadlineLabel": "10/22 05:00",
    "desc": "活动期间宠物对战经验提高；具体任务和奖励以游戏内为准。",
    "detail": "未核实国服实际可排副本池、参与等级和周常任务奖励，不把旧版本奖励数值直接套入。",
    "rewards": "本期奖励事件奖励；数量与物品等级以国服游戏内为准",
    "condition": "解锁对应玩法并满足国服游戏内参与条件",
    "timing": "周常每周四北京时间05:00结束。",
    "usCalendar": {
      "region": "US",
      "timeZone": "America/Los_Angeles",
      "startLocal": "2026-10-13T08:00:00-07:00",
      "endLocal": "2026-10-20T07:00:00-07:00",
      "startBeijing": "2026-10-13T23:00:00+08:00",
      "endBeijing": "2026-10-20T22:00:00+08:00",
      "mapping": "US-Tuesday-to-CN-Thursday"
    },
    "weeklyResetDate": "2026-10-22"
  },
  {
    "id": "wow-us-bg-20261015",
    "name": "战场奖励周",
    "short": "战场奖励周",
    "type": "奖励周",
    "game": "wow",
    "start": "2026-10-15",
    "startAt": null,
    "startPrecision": "day",
    "end": "2026-10-23",
    "endAt": null,
    "datePrecision": "day",
    "lastDay": "2026-10-22",
    "confirmed": true,
    "checked": "2026-10-14",
    "source": "https://www.wowdb.com/world-events/563-battleground-bonus-event",
    "crossSource": "https://www.wowdb.com/world-events/weekly/",
    "verification": "周常活动日历",
    "dateLabel": "2026-10-15 — 2026-10-22 05:00",
    "deadlineLabel": "10/22 05:00",
    "desc": "活动期间随机战场提供额外荣誉。",
    "detail": "未核实国服实际可排副本池、参与等级和周常任务奖励，不把旧版本奖励数值直接套入。",
    "rewards": "本期奖励事件奖励；数量与物品等级以国服游戏内为准",
    "condition": "解锁对应玩法并满足国服游戏内参与条件",
    "timing": "周常每周四北京时间05:00结束。",
    "usCalendar": {
      "region": "US",
      "timeZone": "America/Los_Angeles",
      "startLocal": "2026-10-13T08:00:00-07:00",
      "endLocal": "2026-10-20T07:00:00-07:00",
      "startBeijing": "2026-10-13T23:00:00+08:00",
      "endBeijing": "2026-10-20T22:00:00+08:00",
      "mapping": "US-Tuesday-to-CN-Thursday"
    },
    "weeklyResetDate": "2026-10-22"
  },
  {
    "id": "wow-us-delves-20261022",
    "name": "地下堡奖励周",
    "short": "地下堡奖励周",
    "type": "奖励周",
    "game": "wow",
    "start": "2026-10-22",
    "startAt": null,
    "startPrecision": "day",
    "end": "2026-10-30",
    "endAt": null,
    "datePrecision": "day",
    "lastDay": "2026-10-29",
    "confirmed": true,
    "checked": "2026-10-14",
    "source": "https://www.wowdb.com/world-events/1559-delves-bonus-event",
    "crossSource": "https://www.wowdb.com/world-events/weekly/",
    "verification": "周常活动日历",
    "dateLabel": "2026-10-22 — 2026-10-29 05:00",
    "deadlineLabel": "10/29 05:00",
    "desc": "本期地下堡提供额外奖励，具体加成见游戏内事件说明。",
    "detail": "未核实国服实际可排副本池、参与等级和周常任务奖励，不把旧版本奖励数值直接套入。",
    "rewards": "本期奖励事件奖励；数量与物品等级以国服游戏内为准",
    "condition": "解锁对应玩法并满足国服游戏内参与条件",
    "timing": "周常每周四北京时间05:00结束。",
    "usCalendar": {
      "region": "US",
      "timeZone": "America/Los_Angeles",
      "startLocal": "2026-10-20T08:00:00-07:00",
      "endLocal": "2026-10-27T07:00:00-07:00",
      "startBeijing": "2026-10-20T23:00:00+08:00",
      "endBeijing": "2026-10-27T22:00:00+08:00",
      "mapping": "US-Tuesday-to-CN-Thursday"
    },
    "weeklyResetDate": "2026-10-29"
  },
  {
    "id": "wow-us-wod-20261029",
    "name": "德拉诺之王 · 时光漫游",
    "short": "德拉诺之王漫游",
    "type": "时光漫游",
    "game": "wow",
    "start": "2026-10-29",
    "startAt": null,
    "startPrecision": "day",
    "end": "2026-11-06",
    "endAt": null,
    "datePrecision": "day",
    "lastDay": "2026-11-05",
    "confirmed": true,
    "checked": "2026-10-14",
    "source": "https://www.wowdb.com/world-events/1056-timewalking-dungeon-event",
    "crossSource": "https://www.wowdb.com/world-events/weekly/",
    "verification": "周常活动日历",
    "dateLabel": "2026-10-29 — 2026-11-05 05:00",
    "deadlineLabel": "11/05 05:00",
    "desc": "重访德拉诺之王地下城，参与本期时光漫游。",
    "detail": "未核实国服实际可排副本池、参与等级和周常任务奖励，不把旧版本奖励数值直接套入。",
    "rewards": "本期奖励事件奖励；数量与物品等级以国服游戏内为准",
    "condition": "解锁对应玩法并满足国服游戏内参与条件",
    "timing": "周常每周四北京时间05:00结束。",
    "usCalendar": {
      "region": "US",
      "timeZone": "America/Los_Angeles",
      "startLocal": "2026-10-27T08:00:00-07:00",
      "endLocal": "2026-11-03T07:00:00-08:00",
      "startBeijing": "2026-10-27T23:00:00+08:00",
      "endBeijing": "2026-11-03T23:00:00+08:00",
      "mapping": "US-Tuesday-to-CN-Thursday"
    },
    "weeklyResetDate": "2026-11-05"
  },
  {
    "id": "wow-us-dungeons-20261105",
    "name": "至暗之夜地下城奖励周",
    "short": "至暗之夜地下城奖励周",
    "type": "奖励周",
    "game": "wow",
    "start": "2026-11-05",
    "startAt": null,
    "startPrecision": "day",
    "end": "2026-11-13",
    "endAt": null,
    "datePrecision": "day",
    "lastDay": "2026-11-12",
    "confirmed": true,
    "checked": "2026-10-14",
    "source": "https://www.wowdb.com/world-events/1802-midnight-dungeon-event",
    "crossSource": "https://www.wowdb.com/world-events/weekly/",
    "verification": "周常活动日历",
    "dateLabel": "2026-11-05 — 2026-11-12 05:00",
    "deadlineLabel": "11/12 05:00",
    "desc": "至暗之夜地下城最终首领提供额外掉落物品。",
    "detail": "未核实国服实际可排副本池、参与等级和周常任务奖励，不把旧版本奖励数值直接套入。",
    "rewards": "本期奖励事件奖励；数量与物品等级以国服游戏内为准",
    "condition": "解锁对应玩法并满足国服游戏内参与条件",
    "timing": "周常每周四北京时间05:00结束。",
    "usCalendar": {
      "region": "US",
      "timeZone": "America/Los_Angeles",
      "startLocal": "2026-11-03T07:00:00-08:00",
      "endLocal": "2026-11-10T06:00:00-08:00",
      "startBeijing": "2026-11-03T23:00:00+08:00",
      "endBeijing": "2026-11-10T22:00:00+08:00",
      "mapping": "US-Tuesday-to-CN-Thursday"
    },
    "weeklyResetDate": "2026-11-12"
  },
  {
    "id": "wow-us-arena-20261112",
    "name": "竞技场练习赛奖励周",
    "short": "竞技场练习赛奖励周",
    "type": "奖励周",
    "game": "wow",
    "start": "2026-11-12",
    "startAt": null,
    "startPrecision": "day",
    "end": "2026-11-20",
    "endAt": null,
    "datePrecision": "day",
    "lastDay": "2026-11-19",
    "confirmed": true,
    "checked": "2026-10-14",
    "source": "https://www.wowdb.com/world-events/561-arena-skirmish-bonus-event",
    "crossSource": "https://www.wowdb.com/world-events/weekly/",
    "verification": "周常活动日历",
    "dateLabel": "2026-11-12 — 2026-11-19 05:00",
    "deadlineLabel": "11/19 05:00",
    "desc": "参与本期竞技场练习赛奖励事件；加成及任务见游戏内。",
    "detail": "未核实国服实际可排副本池、参与等级和周常任务奖励，不把旧版本奖励数值直接套入。",
    "rewards": "本期奖励事件奖励；数量与物品等级以国服游戏内为准",
    "condition": "解锁对应玩法并满足国服游戏内参与条件",
    "timing": "周常每周四北京时间05:00结束。",
    "usCalendar": {
      "region": "US",
      "timeZone": "America/Los_Angeles",
      "startLocal": "2026-11-10T07:00:00-08:00",
      "endLocal": "2026-11-17T06:00:00-08:00",
      "startBeijing": "2026-11-10T23:00:00+08:00",
      "endBeijing": "2026-11-17T22:00:00+08:00",
      "mapping": "US-Tuesday-to-CN-Thursday"
    },
    "weeklyResetDate": "2026-11-19"
  },
  {
    "id": "wow-us-legion-20261119",
    "name": "军团再临 · 时光漫游",
    "short": "军团再临漫游",
    "type": "时光漫游",
    "game": "wow",
    "start": "2026-11-19",
    "startAt": null,
    "startPrecision": "day",
    "end": "2026-11-27",
    "endAt": null,
    "datePrecision": "day",
    "lastDay": "2026-11-26",
    "confirmed": true,
    "checked": "2026-10-14",
    "source": "https://www.wowdb.com/world-events/1263-timewalking-dungeon-event",
    "crossSource": "https://www.wowdb.com/world-events/weekly/",
    "verification": "周常活动日历",
    "dateLabel": "2026-11-19 — 2026-11-26 05:00",
    "deadlineLabel": "11/26 05:00",
    "desc": "重访军团再临地下城，参与本期时光漫游。",
    "detail": "未核实国服实际可排副本池、参与等级和周常任务奖励，不把旧版本奖励数值直接套入。",
    "rewards": "本期奖励事件奖励；数量与物品等级以国服游戏内为准",
    "condition": "解锁对应玩法并满足国服游戏内参与条件",
    "timing": "周常每周四北京时间05:00结束。",
    "usCalendar": {
      "region": "US",
      "timeZone": "America/Los_Angeles",
      "startLocal": "2026-11-17T07:00:00-08:00",
      "endLocal": "2026-11-24T06:00:00-08:00",
      "startBeijing": "2026-11-17T23:00:00+08:00",
      "endBeijing": "2026-11-24T22:00:00+08:00",
      "mapping": "US-Tuesday-to-CN-Thursday"
    },
    "weeklyResetDate": "2026-11-26"
  },
  {
    "id": "wow-us-wq-20261126",
    "name": "世界任务奖励周",
    "short": "世界任务奖励周",
    "type": "奖励周",
    "game": "wow",
    "start": "2026-11-26",
    "startAt": null,
    "startPrecision": "day",
    "end": "2026-12-04",
    "endAt": null,
    "datePrecision": "day",
    "lastDay": "2026-12-03",
    "confirmed": true,
    "checked": "2026-10-14",
    "source": "https://www.wowdb.com/world-events/592-world-quest-bonus-event",
    "crossSource": "https://www.wowdb.com/world-events/weekly/",
    "verification": "周常活动日历",
    "dateLabel": "2026-11-26 — 2026-12-03 05:00",
    "deadlineLabel": "12/03 05:00",
    "desc": "完成世界任务获取本期额外奖励；具体声望加成和任务见游戏内。",
    "detail": "未核实国服实际可排副本池、参与等级和周常任务奖励，不把旧版本奖励数值直接套入。",
    "rewards": "本期奖励事件奖励；数量与物品等级以国服游戏内为准",
    "condition": "解锁对应玩法并满足国服游戏内参与条件",
    "timing": "周常每周四北京时间05:00结束。",
    "usCalendar": {
      "region": "US",
      "timeZone": "America/Los_Angeles",
      "startLocal": "2026-11-24T07:00:00-08:00",
      "endLocal": "2026-12-01T06:00:00-08:00",
      "startBeijing": "2026-11-24T23:00:00+08:00",
      "endBeijing": "2026-12-01T22:00:00+08:00",
      "mapping": "US-Tuesday-to-CN-Thursday"
    },
    "weeklyResetDate": "2026-12-03"
  },
  {
    "id": "wow-us-bfa-20261210",
    "name": "争霸艾泽拉斯 · 时光漫游",
    "short": "争霸艾泽拉斯漫游",
    "type": "时光漫游",
    "game": "wow",
    "start": "2026-12-10",
    "startAt": null,
    "startPrecision": "day",
    "end": "2026-12-18",
    "endAt": null,
    "datePrecision": "day",
    "lastDay": "2026-12-17",
    "confirmed": true,
    "checked": "2026-10-14",
    "source": "https://www.wowdb.com/world-events/1669-timewalking-dungeon-event",
    "crossSource": "https://www.wowdb.com/world-events/weekly/",
    "verification": "周常活动日历",
    "dateLabel": "2026-12-10 — 2026-12-17 05:00",
    "deadlineLabel": "12/17 05:00",
    "desc": "重访争霸艾泽拉斯地下城，参与本期时光漫游。",
    "detail": "未核实国服实际可排副本池、参与等级和周常任务奖励，不把旧版本奖励数值直接套入。",
    "rewards": "本期奖励事件奖励；数量与物品等级以国服游戏内为准",
    "condition": "解锁对应玩法并满足国服游戏内参与条件",
    "timing": "周常每周四北京时间05:00结束。",
    "usCalendar": {
      "region": "US",
      "timeZone": "America/Los_Angeles",
      "startLocal": "2026-12-08T07:00:00-08:00",
      "endLocal": "2026-12-15T06:00:00-08:00",
      "startBeijing": "2026-12-08T23:00:00+08:00",
      "endBeijing": "2026-12-15T22:00:00+08:00",
      "mapping": "US-Tuesday-to-CN-Thursday"
    },
    "weeklyResetDate": "2026-12-17"
  },
  {
    "id": "wow-us-sl-20261231",
    "name": "暗影国度 · 时光漫游",
    "short": "暗影国度漫游",
    "type": "时光漫游",
    "game": "wow",
    "start": "2026-12-31",
    "startAt": null,
    "startPrecision": "day",
    "end": "2027-01-08",
    "endAt": null,
    "datePrecision": "day",
    "lastDay": "2027-01-07",
    "confirmed": true,
    "checked": "2026-10-14",
    "source": "https://www.wowdb.com/world-events/1703-timewalking-dungeon-event",
    "crossSource": "https://www.wowdb.com/world-events/weekly/",
    "verification": "周常活动日历",
    "dateLabel": "2026-12-31 — 2027-01-07 05:00",
    "deadlineLabel": "01/07 05:00",
    "desc": "重访暗影国度地下城，参与本期时光漫游。",
    "detail": "未核实国服实际可排副本池、参与等级和周常任务奖励，不把旧版本奖励数值直接套入。",
    "rewards": "本期奖励事件奖励；数量与物品等级以国服游戏内为准",
    "condition": "解锁对应玩法并满足国服游戏内参与条件",
    "timing": "周常每周四北京时间05:00结束。",
    "usCalendar": {
      "region": "US",
      "timeZone": "America/Los_Angeles",
      "startLocal": "2026-12-29T07:00:00-08:00",
      "endLocal": "2027-01-05T06:00:00-08:00",
      "startBeijing": "2026-12-29T23:00:00+08:00",
      "endBeijing": "2027-01-05T22:00:00+08:00",
      "mapping": "US-Tuesday-to-CN-Thursday"
    },
    "weeklyResetDate": "2027-01-07"
  },
  {
    "id": "wow-us-hallows-end-2026",
    "game": "wow",
    "name": "万圣节",
    "short": "万圣节",
    "type": "节日活动",
    "start": "2026-10-19",
    "startAt": null,
    "startPrecision": "day",
    "end": "2026-11-03",
    "endAt": null,
    "lastDay": "2026-11-02",
    "datePrecision": "day",
    "confirmed": false,
    "scheduleReference": "us-calendar",
    "checked": "2026-10-14",
    "source": "https://www.wowdb.com/world-events/324-hallows-end",
    "crossSource": "https://www.wowhead.com/guide/world-events/holidays/hallows-end",
    "verification": "美服正式服节日日历 → 国服日期参考",
    "dateLabel": "10月19日 — 11月2日 · 美服日历参考",
    "deadlineLabel": "11/02 · 美服日历参考",
    "desc": "参与无头骑士、旅店糖果桶与节日任务。",
    "detail": "采用美服正式服日历公布的2026年节日日期。节日按各地区本地日历开放，不按周常统一加两天；国服起止时刻和当年奖励仍待游戏内核对。",
    "rewards": "节日货币、成就及无头骑士相关奖励；当年名单以游戏内为准",
    "condition": "满足各节日任务与节日地下城的参与条件",
    "timing": "美服日历列10月19日10:00—11月2日11:00；此条只记录节日日期参考，不把美服时刻当作国服开关时间。"
  },
  {
    "id": "wow-us-darkmoon-202611",
    "game": "wow",
    "name": "暗月马戏团 · 11月",
    "short": "11月暗月马戏团",
    "type": "月度活动",
    "start": "2026-11-01",
    "startAt": null,
    "startPrecision": "day",
    "end": "2026-11-08",
    "endAt": null,
    "lastDay": "2026-11-07",
    "datePrecision": "day",
    "confirmed": true,
    "checked": "2026-10-14",
    "source": "https://wow-achievement-plan.com/events",
    "verification": "固定月度排期",
    "dateLabel": "11月1日 — 11月7日",
    "deadlineLabel": "11/07",
    "desc": "参与暗月岛小游戏、专业任务与收藏活动。",
    "detail": "暗月马戏团每月第一个周日开始，持续一周。本期为11月1日至7日，可参与专业任务、小游戏与收藏活动。",
    "rewards": "暗月奖券、收藏和专业任务奖励",
    "condition": "前往暗月岛，满足相应任务或小游戏条件",
    "timing": "每月第一个周日开始，持续一周；本期按11月1日至7日覆盖月历。",
    "scheduleRule": "first-sunday-week"
  }
];
GAME_EVENTS.push(...WOW_US_CALENDAR_20261014);

// Weekly review 2026-10-18. Only records actually re-read receive a new check date.
const REVIEW_20261018={
  "patches": [
    {
      "id": "wow-us-mop-20261008",
      "checked": "2026-10-18",
      "usCalendar": {
        "region": "US",
        "timeZone": "America/Los_Angeles",
        "startLocal": "2026-10-06T08:00:00-07:00",
        "endLocal": "2026-10-13T07:00:00-07:00",
        "startBeijing": "2026-10-06T23:00:00+08:00",
        "endBeijing": "2026-10-13T22:00:00+08:00",
        "mapping": "US-Tuesday-to-CN-Thursday",
        "checked": "2026-10-18"
      },
      "externalActivity": false
    },
    {
      "id": "wow-us-pet-20261015",
      "checked": "2026-10-18",
      "usCalendar": {
        "region": "US",
        "timeZone": "America/Los_Angeles",
        "startLocal": "2026-10-13T08:00:00-07:00",
        "endLocal": "2026-10-20T07:00:00-07:00",
        "startBeijing": "2026-10-13T23:00:00+08:00",
        "endBeijing": "2026-10-20T22:00:00+08:00",
        "mapping": "US-Tuesday-to-CN-Thursday",
        "checked": "2026-10-18"
      },
      "externalActivity": false
    },
    {
      "id": "wow-us-bg-20261015",
      "checked": "2026-10-18",
      "usCalendar": {
        "region": "US",
        "timeZone": "America/Los_Angeles",
        "startLocal": "2026-10-13T08:00:00-07:00",
        "endLocal": "2026-10-20T07:00:00-07:00",
        "startBeijing": "2026-10-13T23:00:00+08:00",
        "endBeijing": "2026-10-20T22:00:00+08:00",
        "mapping": "US-Tuesday-to-CN-Thursday",
        "checked": "2026-10-18"
      },
      "externalActivity": false
    },
    {
      "id": "wow-us-delves-20261022",
      "checked": "2026-10-18",
      "usCalendar": {
        "region": "US",
        "timeZone": "America/Los_Angeles",
        "startLocal": "2026-10-20T08:00:00-07:00",
        "endLocal": "2026-10-27T07:00:00-07:00",
        "startBeijing": "2026-10-20T23:00:00+08:00",
        "endBeijing": "2026-10-27T22:00:00+08:00",
        "mapping": "US-Tuesday-to-CN-Thursday",
        "checked": "2026-10-18"
      },
      "externalActivity": false,
      "desc": "地下堡与金多赞的迷宫提供额外奖励，具体加成见国服游戏内说明。",
      "detail": "WoWDB LIVE事件说明已包含地下堡与金多赞的迷宫；本次未取得国服游戏内任务奖励、加成数值与参与门槛的实证，不沿用旧版本物品等级。"
    },
    {
      "id": "wow-us-wod-20261029",
      "checked": "2026-10-18",
      "usCalendar": {
        "region": "US",
        "timeZone": "America/Los_Angeles",
        "startLocal": "2026-10-27T08:00:00-07:00",
        "endLocal": "2026-11-03T07:00:00-08:00",
        "startBeijing": "2026-10-27T23:00:00+08:00",
        "endBeijing": "2026-11-03T23:00:00+08:00",
        "mapping": "US-Tuesday-to-CN-Thursday",
        "checked": "2026-10-18"
      },
      "externalActivity": false
    },
    {
      "id": "wow-us-dungeons-20261105",
      "checked": "2026-10-18",
      "usCalendar": {
        "region": "US",
        "timeZone": "America/Los_Angeles",
        "startLocal": "2026-11-03T07:00:00-08:00",
        "endLocal": "2026-11-10T06:00:00-08:00",
        "startBeijing": "2026-11-03T23:00:00+08:00",
        "endBeijing": "2026-11-10T22:00:00+08:00",
        "mapping": "US-Tuesday-to-CN-Thursday",
        "checked": "2026-10-18"
      },
      "externalActivity": false
    },
    {
      "id": "wow-us-arena-20261112",
      "checked": "2026-10-18",
      "usCalendar": {
        "region": "US",
        "timeZone": "America/Los_Angeles",
        "startLocal": "2026-11-10T07:00:00-08:00",
        "endLocal": "2026-11-17T06:00:00-08:00",
        "startBeijing": "2026-11-10T23:00:00+08:00",
        "endBeijing": "2026-11-17T22:00:00+08:00",
        "mapping": "US-Tuesday-to-CN-Thursday",
        "checked": "2026-10-18"
      },
      "externalActivity": false
    },
    {
      "id": "wow-us-legion-20261119",
      "checked": "2026-10-18",
      "usCalendar": {
        "region": "US",
        "timeZone": "America/Los_Angeles",
        "startLocal": "2026-11-17T07:00:00-08:00",
        "endLocal": "2026-11-24T06:00:00-08:00",
        "startBeijing": "2026-11-17T23:00:00+08:00",
        "endBeijing": "2026-11-24T22:00:00+08:00",
        "mapping": "US-Tuesday-to-CN-Thursday",
        "checked": "2026-10-18"
      },
      "externalActivity": false
    },
    {
      "id": "wow-us-wq-20261126",
      "checked": "2026-10-18",
      "usCalendar": {
        "region": "US",
        "timeZone": "America/Los_Angeles",
        "startLocal": "2026-11-24T07:00:00-08:00",
        "endLocal": "2026-12-01T06:00:00-08:00",
        "startBeijing": "2026-11-24T23:00:00+08:00",
        "endBeijing": "2026-12-01T22:00:00+08:00",
        "mapping": "US-Tuesday-to-CN-Thursday",
        "checked": "2026-10-18"
      },
      "externalActivity": false
    },
    {
      "id": "wow-us-bfa-20261210",
      "checked": "2026-10-18",
      "usCalendar": {
        "region": "US",
        "timeZone": "America/Los_Angeles",
        "startLocal": "2026-12-08T07:00:00-08:00",
        "endLocal": "2026-12-15T06:00:00-08:00",
        "startBeijing": "2026-12-08T23:00:00+08:00",
        "endBeijing": "2026-12-15T22:00:00+08:00",
        "mapping": "US-Tuesday-to-CN-Thursday",
        "checked": "2026-10-18"
      },
      "externalActivity": false
    },
    {
      "id": "wow-us-sl-20261231",
      "checked": "2026-10-18",
      "usCalendar": {
        "region": "US",
        "timeZone": "America/Los_Angeles",
        "startLocal": "2026-12-29T07:00:00-08:00",
        "endLocal": "2027-01-05T06:00:00-08:00",
        "startBeijing": "2026-12-29T23:00:00+08:00",
        "endBeijing": "2027-01-05T22:00:00+08:00",
        "mapping": "US-Tuesday-to-CN-Thursday",
        "checked": "2026-10-18"
      },
      "externalActivity": false
    },
    {
      "id": "autumn",
      "checked": "2026-10-18"
    },
    {
      "id": "autumn-wishes",
      "checked": "2026-10-18"
    },
    {
      "id": "starlight-double",
      "checked": "2026-10-18"
    },
    {
      "id": "wow-adventure-handbook",
      "checked": "2026-10-18"
    },
    {
      "id": "wow-autumn-starlight-exchange",
      "checked": "2026-10-18"
    },
    {
      "id": "extra-core",
      "checked": "2026-10-18"
    },
    {
      "id": "venomstone",
      "checked": "2026-10-18"
    },
    {
      "id": "patch-1215",
      "checked": "2026-10-18",
      "source": "https://wow.blizzard.cn/news/24307306/index.html",
      "crossSource": "https://wow.blizzard.cn/news/24304162/index.html",
      "detail": "国服12.1.5已于10月15日上线。官方上线说明确认基希克斯单首领团队副本含剧情、普通、英雄和史诗难度，史诗支持15–25人弹性团队；10月2日完整更新说明另列随机团队难度。本次未核实各难度实际开放节奏及正式服首领技能，未将PTR预览升级为正式服打法。金多赞的迷宫包含九座房间，亚基入侵每小时开启、持续10分钟。",
      "desc": "12.1.5已上线：单首领团本、金多赞的迷宫、亚基入侵及季中成长开放。"
    },
    {
      "id": "wow-us-hallows-end-2026",
      "checked": "2026-10-18",
      "usCalendar": {
        "region": "US",
        "timeZone": "America/Los_Angeles",
        "startLocal": "2026-10-19T10:00:00-07:00",
        "endLocal": "2026-11-02T11:00:00-08:00",
        "startBeijing": "2026-10-20T01:00:00+08:00",
        "endBeijing": "2026-11-03T03:00:00+08:00",
        "mapping": "holiday-local-dates-no-weekly-offset",
        "checked": "2026-10-18"
      }
    },
    {
      "id": "ff14-fallguys",
      "checked": "2026-10-18",
      "official": "https://ff.web.sdo.com/web8/index.html#/newstab/newscont/393660",
      "verification": "国服官方专题与公告正文核对"
    },
    {
      "id": "ff14-ff15",
      "checked": "2026-10-18",
      "detail": "从乌尔达哈现世回廊（X:8.5，Y:9.7）的琪琵·嘉奇亚处接取“黑衣青年”。往届未完成的任务可继续推进；开启“季节活动再现”后，须在活动结束前重新完成任务，才能恢复相关商店兑换资格。 本期已于10月13日22:59结束，相关兑换也在活动期间完成。",
      "timing": "本期已结束。结束当天10月13日原预计14:00—18:00维护，官网17:29已发布维护完成公告；联动官方截止为22:59。"
    },
    {
      "id": "ff14-moogle",
      "checked": "2026-10-18",
      "official": "https://ff.web.sdo.com/web8/index.html#/newstab/newscont/392697",
      "detail": "每周任务和每周小莫古挑战于周二16:00切换。兑换呜噜怪角笛需100个稀少神典石与10张票据；小莫古挑战每周给1张，活动期间一次的莫古莫古挑战给5张。票据可留到第2阶段使用，第二阶段日期待公告。 常规任务报酬自动获得；每周任务、每周小莫古挑战与莫古莫古挑战需在指南书中点击领取。8.05版本前领取指南书报酬，8.1版本更新前兑换道具，准确日期及第二阶段排期尚未公布。"
    },
    {
      "id": "ff14-monthcard-gifts",
      "checked": "2026-10-18"
    },
    {
      "id": "ff14-monthcard-offer",
      "checked": "2026-10-18"
    },
    {
      "id": "ff14-halloween",
      "checked": "2026-10-18"
    },
    {
      "id": "ff14-monthcard-lottery",
      "checked": "2026-10-18"
    },
    {
      "id": "ff14-pailifang",
      "checked": "2026-10-18"
    },
    {
      "id": "ff14-fanfest3-register",
      "checked": "2026-10-18",
      "detail": "登记窗口为10月10日14:00—10月12日14:00；抽中后的确认窗口为10月12日16:00—10月14日16:00，请在官方专题完成确认。10月31日10:00—12:00主题演讲同步进行官方线上直播，开始时间可能调整。 10月15日官方已公告门票抽选结束，现不能继续报名或确认。",
      "verification": "国服官方抽选规则与10月15日结束公告核对",
      "sources": [
        "https://ff.web.sdo.com/web8/index.html#/newstab/newscont/393963",
        "https://ff.web.sdo.com/web8/index.html#/newstab/newscont/394274"
      ],
      "crossSource": "https://ff.web.sdo.com/web8/index.html#/newstab/newscont/394274"
    },
    {
      "id": "ff14-fanfest3-confirm",
      "checked": "2026-10-18",
      "detail": "与抽选登记主体关联，不单独计入日历或首页。官方10月15日已公告线下转播门票抽选结束；确认窗口已于10月14日16:00结束。"
    },
    {
      "id": "ff14-fanfest3-keynote",
      "checked": "2026-10-18"
    },
    {
      "id": "ff14-maintenance",
      "checked": "2026-10-18",
      "desc": "10月13日维护已完成，国服客户端更新至7.57版本。",
      "detail": "官方于10月13日17:29发布维护完成公告。原预计维护窗口为14:00—18:00，所列18:00是原计划结束时刻，并非实际开服时刻。相关活动页面、后勤补给站和道具商城当日13:00暂停服务，维护完成后陆续恢复。",
      "source": "https://ff.web.sdo.com/web8/index.html#/newstab/newscont/394157",
      "official": "https://ff.web.sdo.com/web8/index.html#/newstab/newscont/393993",
      "dateLabel": "10月13日 14:00 — 18:00 · 原预计，维护已完成",
      "deadlineLabel": "10/13 18:00 · 预计（维护已完成）",
      "timing": "已完成；现存18:00仅保留原公告预计维护结束时间。",
      "verification": "国服官方维护计划与完成公告核对"
    },
    {
      "id": "ff14-gold84-draw",
      "parentEvent": "ff14-gold84-duty"
    },
    {
      "id": "end-runners",
      "checked": "2026-10-18"
    },
    {
      "id": "end-signin",
      "checked": "2026-10-18"
    },
    {
      "id": "end-sanity",
      "checked": "2026-10-18"
    },
    {
      "id": "end-monument",
      "checked": "2026-10-18"
    },
    {
      "id": "end-patch",
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "desc": "丹青渡版本已开启，开放祀的画区域与新剧情。",
      "detail": "10月15日版本更新后开放；公告计划维护06:00—12:00，实际开服可能调整，因此不设置固定开始时刻。云·终末地同日正式上线，常驻时长福利不作为限时活动截止。前瞻网页奖励已于10月15日06:00关闭，不能再领取。",
      "rewards": "版本内容开放；前瞻导览奖励已结束",
      "condition": "按主线与探索进度逐步解锁",
      "startPrecision": "version",
      "dateLabel": "10月15日版本更新后开放"
    },
    {
      "id": "end-web-fusion",
      "checked": "2026-10-18"
    },
    {
      "id": "end-npu-gift",
      "checked": "2026-10-18"
    },
    {
      "id": "end-oldcity",
      "checked": "2026-10-18"
    },
    {
      "id": "end-war-misvision",
      "checked": "2026-10-18",
      "versionRoutine": true
    },
    {
      "id": "end-yvonne-banner",
      "checked": "2026-10-18"
    },
    {
      "id": "end-art-weapon",
      "checked": "2026-10-18"
    },
    {
      "id": "end-preview-gift",
      "checked": "2026-10-18"
    },
    {
      "id": "end-bow-trial",
      "checked": "2026-10-18"
    },
    {
      "id": "end-pass-forest",
      "checked": "2026-10-18"
    },
    {
      "id": "end-snow-mail-compensation",
      "checked": "2026-10-18"
    },
    {
      "id": "ark-sea",
      "checked": "2026-10-18",
      "detail": "活动关卡于10月23日03:59关闭；后半关卡已于10月16日16:00开启。劳工配给所另至10月30日03:59，须在关卡关闭前准备兑换代币。"
    },
    {
      "id": "ark-sea-ex",
      "checked": "2026-10-18",
      "detail": "10月16日官方闪断公告确认本段开启；所有昨日海活动关卡仍于10月23日03:59关闭。本条只标解锁节点。"
    },
    {
      "id": "ark-sea-shop",
      "checked": "2026-10-18"
    },
    {
      "id": "ark-sea-banner",
      "checked": "2026-10-18",
      "detail": "标准寻访，六星克莱门莎占六星出率50%，德·托莱多/火哨合计占五星出率50%；连续150次未出UP六星后，下一位六星必为UP。专用凭证均于10月23日03:59过期；对应礼包提前于10月22日23:59停售。"
    },
    {
      "id": "ark-vector",
      "checked": "2026-10-18",
      "detail": "关卡于10月20日03:59关闭；突破里程碑奖励须另在10月23日03:59前领取。"
    },
    {
      "id": "ark-vector-reward",
      "checked": "2026-10-18"
    },
    {
      "id": "ark-directional",
      "checked": "2026-10-18"
    },
    {
      "id": "ark-resource-open",
      "checked": "2026-10-18"
    },
    {
      "id": "ark-sea-creation",
      "checked": "2026-10-18"
    },
    {
      "id": "fgo-assassin",
      "checked": "2026-10-18"
    },
    {
      "id": "fgo-assassin-tickets",
      "checked": "2026-10-18"
    },
    {
      "id": "fgo-assassin-summon",
      "checked": "2026-10-18",
      "verification": "国服官方公告正文及原图核对",
      "detail": "已读取官方原图：13种卡池同时开放，推荐13骑五星Assassin与19骑四星/三星Assassin，共32骑。各卡池召唤计数独立，不能互相继承；也可能召唤到其他职阶从者。10月22日13:59全部结束，具体每池对象以官方推荐召唤一览和游戏内详情为准。"
    },
    {
      "id": "fgo-guda-kawakami",
      "checked": "2026-10-18",
      "startPrecision": "maintenance"
    },
    {
      "id": "fgo-fop-oc3",
      "checked": "2026-10-18"
    },
    {
      "id": "fgo-fop-oc3-claim",
      "checked": "2026-10-18"
    },
    {
      "id": "fgo-fop-mainline-aid",
      "checked": "2026-10-18",
      "detail": "国服官方奏章Ⅰ/Ⅱ/Ⅲ应援公告共同确认：第1部、第2部、奏章Ⅰ—Ⅳ主线关卡AP消耗0至12月31日23:59。本条9月29日起记录已实施优惠，不是AP减免初次开启日；未把自由关卡或所有玩法列为AP0。魔力棱镜交换中，本期追加灵脉石特价1魔力棱镜/次，次数以工房库存为准。灵脉石优惠交换和道具使用均至12月31日23:59，超过期限无法使用。 10月20日19:00奏章IV应援追加10次灵脉石优惠交换，每次1魔力棱镜；仍于12月31日23:59结束交换与使用。",
      "crossSource": "https://game.bilibili.com/fgo/news.html#!news/0/1/18455"
    },
    {
      "id": "fgo-gudaguda",
      "checked": "2026-10-18",
      "startAt": null,
      "startPrecision": "maintenance",
      "dateLabel": "9月24日维护后 — 10月15日 13:59"
    },
    {
      "id": "fgo-gudaguda-shop",
      "checked": "2026-10-18",
      "startAt": null,
      "startPrecision": "maintenance",
      "dateLabel": "9月24日维护后 — 10月22日 13:59"
    },
    {
      "id": "fgo-3300-summon",
      "checked": "2026-10-18",
      "startAt": null,
      "startPrecision": "maintenance",
      "dateLabel": "10月8日维护后 — 10月22日 13:59"
    },
    {
      "id": "fgo-assassin-opening",
      "checked": "2026-10-18",
      "startAt": null,
      "startPrecision": "maintenance",
      "source": "https://game.bilibili.com/fgo/news.html#!news/0/1/18453",
      "official": "https://game.bilibili.com/fgo/news.html#!news/0/1/18453",
      "dateLabel": "10月15日维护后开放 · 常驻",
      "desc": "Assassin职阶冠位戴冠战已在10月15日维护后常驻开放。",
      "detail": "官方已明确10月15日维护后开放，关卡没有开放期限；不把10月22日风暴罐0消耗、限时任务和登录截止误作为玩法关闭。冠位戴冠战须通关奏章序幕 Ordeal Call 0。",
      "condition": "通关「奏章序幕 Ordeal Call 0」",
      "verification": "国服官方公告（公开新闻接口正文核对）"
    },
    {
      "id": "gs-anniversary-login",
      "checked": "2026-10-18",
      "verification": "国服官方入驻账号公告 · 已读取官方签到奖励表"
    },
    {
      "id": "gs-anniversary-mail",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-anniversary-web",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-theatre-invite",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-standard-invite",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-training",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-miliastra-selection",
      "checked": "2026-10-18",
      "detail": "游玩收录奇域，积累盛会人气并投票评选20个年度奇域。玩法10月22日03:59关闭；网页独立任务延续至11月3日04:00，入口及奖励见网页活动条目。直接领取奇怪丘丘面具的独立装扮赠礼另按11月3日04:00截止提醒。"
    },
    {
      "id": "gs-miliastra-web",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-miliastra-create",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-imaginarium-oct",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-imaginarium-nov-update",
      "checked": "2026-10-18",
      "detail": "开幕角色为夜兰、爱诺、菲林斯、菲谢尔、钟离、卡齐娜；特邀角色七七、奥黛塔、薇斯纳、雅珂达。伊涅芙、爱诺、荒泷一斗、托马新增表演诀窍。官方只列11月1日更新，不推算关闭日或具体重置时刻。"
    },
    {
      "id": "gs-abyss-oct-update",
      "checked": "2026-10-18",
      "detail": "10月16日已更新。第11层全队获得60%风伤与60%冰伤；第12层上半星烁反应伤害提升75%，下半全队冰伤提升75%。骇星之月：触发超导、星超导、冰扩散、星扩散、冻结、碎冰，或造成星超导/星扩散反应伤害，可释放真实伤害冲击波，每2秒至多一次。只列开放日，未取得国服官方下一期关闭日期和具体重置时刻。"
    },
    {
      "id": "gs-miliastra-free-outfit",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-miliastra-dress-wishes",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-miliastra-battlepass",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-miliastra-shop-discount",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-miliastra-shop-return",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-tcg-forging",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-onslaught",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-onslaught-burst",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-tcg-hot-battle",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-exploration-bonus",
      "checked": "2026-10-18"
    },
    {
      "id": "gs-verdict",
      "checked": "2026-10-18",
      "verification": "国服官方入驻账号公告 · 已读取第二期速递图片排期",
      "crossSource": "https://www.taptap.cn/moment/858661606224038474"
    },
    {
      "id": "gs-wish-characters-second",
      "checked": "2026-10-18",
      "verification": "国服官方入驻账号公告 · 已读取10月13日第二期祈愿预告图",
      "crossSource": "https://www.taptap.cn/moment/859033532628993355"
    },
    {
      "id": "gs-wish-weapons-second",
      "checked": "2026-10-18",
      "verification": "国服官方入驻账号公告 · 已读取10月13日第二期祈愿预告图",
      "crossSource": "https://www.taptap.cn/moment/859033532628993355"
    }
  ],
  "additions": [
    {
      "id": "wow-infinite-party-202610",
      "game": "wow",
      "name": "无限派对 · 地上达拉然",
      "short": "上海无限派对",
      "type": "线下活动",
      "start": "2026-10-16",
      "startAt": "2026-10-16T08:30:00+08:00",
      "end": "2026-10-18",
      "endAt": "2026-10-18T17:00:00+08:00",
      "confirmed": true,
      "checked": "2026-10-18",
      "externalActivity": true,
      "source": "https://wow.blizzard.cn/news/20261003/40565_1315833.html",
      "sourceImage": "https://nie.res.netease.com/r/pic/20261003/0f969010-d6d8-4c94-aa14-155384cd34b3.png",
      "verification": "国服官方公告与已读取的长图",
      "dateLabel": "10月16日 — 10月18日（普通票每日09:30–17:00；豪华票08:30–17:00）",
      "deadlineLabel": "10/18 17:00",
      "timing": "10月16日至18日，普通票每日09:30–17:00、豪华票08:30–17:00；每日16:00停止检票。",
      "desc": "上海国家会展中心1.2馆，达拉然主题街景、互动任务与嘉宾活动；10月18日为最后一天。",
      "detail": "地点为国家会展中心（上海）1.2馆。普通票每日09:30–17:00，豪华票每日08:30–17:00；16:00停止检票。须实名购票并携带原件核验，14周岁以上方可购票，未满18周岁须现场签署安全承诺书。场内任务与礼品按当日现场规则发放，票务及剩余名额以大麦为准。",
      "rewards": "每日伴手礼、完成现场互动任务后的金币及兑换礼品，具体以票种和现场规则为准",
      "condition": "实名购票入场并满足年龄及票种条件"
    },
    {
      "id": "wow-citic-debit-launch-20261015",
      "game": "wow",
      "name": "魔兽世界 × 中信银行联名借记卡福利开放",
      "short": "联名借记卡福利",
      "type": "官网联动",
      "start": "2026-10-15",
      "startAt": null,
      "startPrecision": "day",
      "end": null,
      "endAt": null,
      "milestone": true,
      "confirmed": true,
      "checked": "2026-10-18",
      "externalActivity": true,
      "source": "https://wow.blizzard.cn/news/2610142301/index.html",
      "sourceImage": "https://nie.res.netease.com/r/pic/20261015/f6bc4e30-cc7a-4eb4-9d3c-2879255d4b5b.png",
      "verification": "国服官方公告与已读取的长图",
      "dateLabel": "10月15日起；截止日期未公布",
      "timing": "本条仅标记开放日；并非10月16日结束，官方图未列最终截止。线下申领激活实体卡为10月16–18日无限派对银行区域。",
      "desc": "申请联名借记卡并完成用卡任务，可领取30天游戏时间和正式服幻化奖励；最终截止未公布。",
      "detail": "需本人持有效证件在中信银行线下网点激活并完成用卡任务。公告图列新中信银行用户时点金融资产不少于1000元，老用户不少于10000元；“时点金融资产”的组成及用户定义以银行活动页为准。30天游戏时间同一战网账号手动追加仅可兑换一次；正式服幻化赤红领结也在奖励清单。公告没有最终申领或兑换截止，不推算活动结束日。",
      "rewards": "30天游戏时间、正式服幻化赤红领结",
      "condition": "本人申请指定联名借记卡、线下激活并满足公告用卡任务及资产条件"
    },
    {
      "id": "wow-darkmoon-202612",
      "game": "wow",
      "name": "暗月马戏团 · 12月",
      "short": "12月暗月马戏团",
      "type": "月度活动",
      "start": "2026-12-06",
      "startAt": null,
      "startPrecision": "day",
      "end": "2026-12-13",
      "endAt": null,
      "lastDay": "2026-12-12",
      "datePrecision": "day",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://wow-achievement-plan.com/events",
      "verification": "固定月度排期",
      "dateLabel": "12月6日 — 12月12日",
      "deadlineLabel": "12/12",
      "desc": "参与暗月岛小游戏、专业任务与收藏活动。",
      "detail": "暗月马戏团每月第一个周日开始，持续一周。本期按固定月度规则为12月6日至12日，可参与专业任务、小游戏与收藏活动。",
      "rewards": "暗月奖券、收藏和专业任务奖励",
      "condition": "前往暗月岛，满足相应任务或小游戏条件",
      "timing": "每月第一个周日开始，持续七个自然日；本期按12月6日至12日覆盖月历，不另设小时。",
      "scheduleRule": "first-sunday-week",
      "externalActivity": false
    },
    {
      "game": "ff14",
      "confirmed": true,
      "checked": "2026-10-18",
      "externalActivity": true,
      "source": "https://actff1.web.sdo.com/20241130_GoldTrial/#/index",
      "verification": "国服官方第85期公开配置（POST GetCurrentActive.ashx）与规则核对",
      "id": "ff14-gold85-duty",
      "name": "黄金的试炼 第85期 · 欧米茄时空狭缝·西格玛幻境3",
      "short": "黄金试炼85期",
      "type": "网页活动挑战",
      "start": "2026-10-16",
      "end": "2026-10-19",
      "startAt": "2026-10-16T13:00:00+08:00",
      "endAt": "2026-10-19T00:00:00+08:00",
      "dateLabel": "10月16日 13:00 — 10月18日 23:59:59",
      "deadlineLabel": "10/18 23:59:59",
      "desc": "以等级同步方式通关欧米茄时空狭缝·西格玛幻境3，取得第85期网页登记资格。",
      "detail": "官方当前配置确认本期为第85期，指定70级副本“欧米茄时空狭缝 西格玛幻境3”。挑战期为10月16日13:00至10月18日23:59:59；游戏内完成后通常5—30分钟同步。必须在10月22日13:00前使用对应角色到网页登记，每账号每期限一次；通关不会自动登记。登记后金碟币铜卡×2发至奖励仓库，并参与10月22日13:00起的额外奖励抽取；抽中实物者须在7天内查看并填写收货信息。下一期配置为空，不推算期次或副本。",
      "rewards": "登记后获得金碟币铜卡×2及额外奖励抽取资格",
      "condition": "正式账号，解锁70级欧米茄时空狭缝·西格玛幻境3，并在挑战期内以等级同步完成"
    },
    {
      "game": "ff14",
      "confirmed": true,
      "checked": "2026-10-18",
      "externalActivity": true,
      "source": "https://actff1.web.sdo.com/20241130_GoldTrial/#/index",
      "verification": "国服官方第85期公开配置（POST GetCurrentActive.ashx）与规则核对",
      "id": "ff14-gold85-register",
      "name": "黄金的试炼 第85期 · 网页登记",
      "short": "黄金试炼登记",
      "type": "网页领奖",
      "start": "2026-10-16",
      "end": "2026-10-22",
      "startAt": "2026-10-16T13:00:00+08:00",
      "endAt": "2026-10-22T13:00:00+08:00",
      "dateLabel": "10月16日 13:00 — 10月22日 13:00",
      "deadlineLabel": "10/22 13:00",
      "parentEvent": "ff14-gold85-duty",
      "desc": "使用已在挑战期内通关的对应角色完成网页登记。",
      "detail": "挑战于10月18日23:59:59结束，网页登记仍延续至10月22日13:00；超出登记期视为放弃本期试炼。每账号每期限登记一次，虚拟奖励发至奖励仓库。",
      "rewards": "金碟币铜卡×2及额外奖励抽取资格",
      "condition": "挑战期内完成指定副本的正式账号，使用对应角色登记"
    },
    {
      "game": "ff14",
      "confirmed": true,
      "checked": "2026-10-18",
      "externalActivity": true,
      "source": "https://actff1.web.sdo.com/20241130_GoldTrial/#/index",
      "verification": "国服官方第85期公开配置（POST GetCurrentActive.ashx）与规则核对",
      "id": "ff14-gold85-draw",
      "name": "黄金的试炼 第85期 · 幸运奖励抽取",
      "short": "黄金试炼开奖",
      "type": "开奖节点",
      "start": "2026-10-22",
      "end": null,
      "startAt": "2026-10-22T13:00:00+08:00",
      "endAt": null,
      "dateLabel": "10月22日 13:00起抽取",
      "milestone": true,
      "parentEvent": "ff14-gold85-duty",
      "desc": "系统从第85期成功登记账号中抽取额外奖励。",
      "detail": "抽取持续数分钟，官方建议开奖30分钟后查看记录。额外虚拟奖励自动发至仓库；抽中实物者须在7天内查看并填写收货信息。与挑战主体关联，不单独展示或统计。",
      "rewards": "黄金坐骑、黄金大河狸、实物及幸运奖品，按抽取结果发放",
      "condition": "第85期网页登记截止前成功登记"
    },
    {
      "game": "ff14",
      "confirmed": true,
      "checked": "2026-10-18",
      "externalActivity": true,
      "source": "https://ff.web.sdo.com/web8/index.html#/newstab/newscont/394270",
      "verification": "国服官方10月15日公告正文与优惠券规则",
      "id": "ff14-halloween-coupons",
      "name": "守护天节 · 往年道具专属优惠券",
      "short": "守护天节赠券",
      "type": "网页福利",
      "official": "https://qu.sdo.com/personal-center?merchantId=1#giftcardindex",
      "start": "2026-10-15",
      "startAt": null,
      "startPrecision": "day",
      "end": "2026-11-03",
      "endAt": "2026-11-03T00:00:00+08:00",
      "dateLabel": "10月15日公告起 — 11月2日 24:00",
      "deadlineLabel": "11/2 24:00",
      "desc": "在官方商城兑换代码W30F，领取6张往年守护天节道具专属优惠券。",
      "detail": "通过官方商城礼品码入口使用W30F兑换6张优惠券，每张为满5000点券减1500点券，使用期限至11月2日24:00。每个用户限用，具体以商城规则为准；优惠券不适用于10月15日当日新上架道具。季节活动任务仍于11月2日22:59结束，不能将优惠券截止当成游戏内任务截止。公告只写“即日起”，没有另给发券开始时刻，故开始日仅记10月15日。",
      "rewards": "6张满5000减1500点券的往年守护天节专属优惠券",
      "condition": "在官方商城礼品码入口兑换W30F；仅限公告列明往年道具，遵守账号限用规则"
    },
    {
      "game": "ff14",
      "confirmed": true,
      "checked": "2026-10-18",
      "externalActivity": true,
      "source": "https://ff.web.sdo.com/web8/index.html#/newstab/newscont/393346",
      "verification": "国服官方预售公告正文核对",
      "id": "ff14-fanfest3-merch-presale",
      "name": "Fan Festival 2026 第三站 · 进口周边预售",
      "short": "粉丝节周边预售",
      "type": "官方周边预售",
      "official": "https://qu.sdo.com/surround-shop?merchantId=1",
      "start": "2026-09-22",
      "end": "2026-11-30",
      "startAt": "2026-09-22T14:00:00+08:00",
      "endAt": "2026-11-30T00:00:00+08:00",
      "dateLabel": "9月22日 14:00 — 11月29日 23:59",
      "deadlineLabel": "11/29 23:59",
      "desc": "第三站进口周边在官方周边商城限量预售。",
      "detail": "官方公告预售时间为9月22日14:00至11月29日23:59，数量有限；预计12月下旬发货，发货时间不是预售截止。具体商品、库存和订单条件以官方商城为准。",
      "rewards": "按订单购买的进口周边商品",
      "condition": "通过官方周边商城下单，按商品库存及预售规则购买"
    },
    {
      "game": "ff14",
      "id": "ff14-moogle-guide-claim",
      "name": "莫古莫古★大收集 · 指南书奖励领取",
      "short": "指南书奖励领取",
      "type": "领奖",
      "parentEvent": "ff14-moogle",
      "start": "2026-09-09",
      "startAt": "2026-09-09T16:00:00+08:00",
      "end": null,
      "endAt": null,
      "confirmed": false,
      "checked": "2026-10-18",
      "externalActivity": false,
      "source": "https://actff1.web.sdo.com/project/20260826mogmog/0by196dc8ija/index.html",
      "verification": "国服官方专题，具体关闭日期待公告",
      "dateLabel": "8.05版本前，具体日期待公告",
      "desc": "指南书任务报酬须在8.05版本前领取。",
      "detail": "官方专题只给出“8.05版本前”，准确更新日与时刻未公布，不能套用10月19日活动结束。",
      "rewards": "指南书任务报酬",
      "condition": "符合对应指南书任务完成条件"
    },
    {
      "game": "ff14",
      "id": "ff14-moogle-exchange",
      "name": "莫古莫古★大收集 · 旅行莫古力道具兑换",
      "short": "旅行莫古力道具兑换",
      "type": "兑换",
      "parentEvent": "ff14-moogle",
      "start": "2026-09-09",
      "startAt": "2026-09-09T16:00:00+08:00",
      "end": null,
      "endAt": null,
      "confirmed": false,
      "checked": "2026-10-18",
      "externalActivity": false,
      "source": "https://actff1.web.sdo.com/project/20260826mogmog/0by196dc8ija/index.html",
      "verification": "国服官方专题，具体关闭日期待公告",
      "dateLabel": "8.1版本更新前，具体日期待公告",
      "desc": "可在8.1版本更新前兑换道具。",
      "detail": "官方专题只给出“8.1版本更新前”，准确日期与时刻未公布，不能套用10月19日活动结束。",
      "rewards": "旅行莫古力兑换道具",
      "condition": "持有对应稀少神典石及所需交换票据"
    },
    {
      "game": "endfield",
      "id": "end-si-banner",
      "name": "万物更新 · 特许寻访",
      "short": "祀特许寻访",
      "type": "寻访",
      "startAt": null,
      "endAt": "2026-11-05T12:00:00+08:00",
      "start": "2026-10-15",
      "end": "2026-11-05",
      "desc": "祀获取概率提升。",
      "detail": "30次寻访所赠加急招募仅本期有效，不继承；60次奖励的寻访情报书在下一次特许寻访开启后转为专用凭证，该凭证随对应寻访结束失效。配额兑换所同期特惠可兑换万物有灵寻访凭证×5。",
      "rewards": "概率提升：6星干员祀",
      "condition": "完成第一章进程Ⅰ主线任务「基地解围」",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/8548",
      "official": "https://endfield.hypergryph.com/news/8548",
      "verification": "国服官方公告",
      "externalActivity": false,
      "startPrecision": "version",
      "dateLabel": "2026-10-15 版本更新后 — 11月5日 11:59",
      "deadlineLabel": "11月5日 11:59"
    },
    {
      "game": "endfield",
      "id": "end-si-trial",
      "name": "作战演练 · 祀",
      "short": "祀试用演练",
      "type": "干员试用",
      "startAt": null,
      "endAt": "2026-11-05T12:00:00+08:00",
      "start": "2026-10-15",
      "end": "2026-11-05",
      "desc": "使用包含祀的固定试用队伍完成指定关卡。",
      "detail": "武库防具箱含适配试用干员的特殊满精锻60级套组装备；试用活动与万物更新寻访同期开放。",
      "rewards": "100嵌晶玉、武库防具箱、存续的痕迹等",
      "condition": "解锁活动中心，并完成祀的指定试用关卡",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/8548",
      "official": "https://endfield.hypergryph.com/news/8548",
      "verification": "国服官方公告",
      "externalActivity": false,
      "startPrecision": "version",
      "dateLabel": "2026-10-15 版本更新后 — 11月5日 11:59",
      "deadlineLabel": "11月5日 11:59"
    },
    {
      "game": "endfield",
      "id": "end-jade-weapon",
      "name": "篆玉申领",
      "short": "玉中身申领",
      "type": "武器申领",
      "startAt": null,
      "endAt": null,
      "start": "2026-10-15",
      "end": null,
      "desc": "玉中身（双手剑）获取概率提升。",
      "detail": "自万物更新起，经过3次特许寻访后关闭。官方仅公布相对寻访次数，未给出具体日期，不换算为版本维护日。申领奖励计数于本申领关闭时清零。",
      "rewards": "概率提升：6星武器玉中身",
      "condition": "完成第一章进程Ⅰ主线任务「基地解围」",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/7212",
      "official": "https://endfield.hypergryph.com/news/7212",
      "verification": "国服官方公告",
      "externalActivity": false,
      "startPrecision": "version",
      "dateLabel": "10月15日版本更新后 — 3次特许寻访后结束 · 日期待公告"
    },
    {
      "game": "endfield",
      "id": "end-tangtang-banner",
      "name": "祖泉的新流 · 重构寻访#1",
      "short": "汤汤重构寻访",
      "type": "寻访",
      "startAt": "2026-10-29T12:00:00+08:00",
      "endAt": "2026-11-19T12:00:00+08:00",
      "start": "2026-10-29",
      "end": "2026-11-19",
      "desc": "汤汤获取概率提升。",
      "detail": "重构寻访为独立寻访类型，不套用特许寻访奖励计数规则。",
      "rewards": "概率提升：6星干员汤汤",
      "condition": "解锁干员寻访；详细规则以游戏内重构寻访说明为准",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "2026-10-29 12:00 — 11月19日 11:59",
      "deadlineLabel": "11月19日 11:59"
    },
    {
      "game": "endfield",
      "id": "end-grass-weapon",
      "name": "细枝申领 · 重构申领#1",
      "short": "落草重构申领",
      "type": "武器申领",
      "startAt": "2026-10-29T12:00:00+08:00",
      "endAt": "2026-11-19T12:00:00+08:00",
      "start": "2026-10-29",
      "end": "2026-11-19",
      "desc": "落草（手铳）获取概率提升。",
      "detail": "此为重构申领，不将特许武库申领的关闭或计数规则套用于本期。",
      "rewards": "概率提升：6星武器落草",
      "condition": "解锁武库申领；具体次数奖励见游戏内",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "2026-10-29 12:00 — 11月19日 11:59",
      "deadlineLabel": "11月19日 11:59"
    },
    {
      "game": "endfield",
      "id": "end-minghe-banner",
      "name": "烟火邀星河 · 特许寻访",
      "short": "明河特许寻访",
      "type": "寻访",
      "startAt": "2026-11-05T12:00:00+08:00",
      "endAt": null,
      "start": "2026-11-05",
      "end": null,
      "desc": "明河获取概率提升。",
      "detail": "截止写为版本更新维护前；下次维护日期尚未公告，不猜测日期或时刻。同期集成配额交易新增星河共我寻访凭证×5特惠兑换。",
      "rewards": "概率提升：6星干员明河",
      "condition": "解锁干员寻访，具体开放条件见游戏内",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "2026-11-05 12:00 — 下次版本维护前 · 日期待公告"
    },
    {
      "game": "endfield",
      "id": "end-minghe-trial",
      "name": "作战演练 · 明河",
      "short": "明河试用演练",
      "type": "干员试用",
      "startAt": "2026-11-05T12:00:00+08:00",
      "endAt": null,
      "start": "2026-11-05",
      "end": null,
      "desc": "使用包含明河的固定试用队伍完成指定关卡。",
      "detail": "与烟火邀星河特许寻访同期开放；截止为下次版本维护前，日期待公告。武库防具箱含适配干员的满精锻60级套组装备。",
      "rewards": "100嵌晶玉、武库防具箱、存续的痕迹等",
      "condition": "解锁活动中心并完成明河指定试用关卡",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "2026-11-05 12:00 — 下次版本维护前 · 日期待公告"
    },
    {
      "game": "endfield",
      "id": "end-moon-weapon",
      "name": "月映申领",
      "short": "唤月申领",
      "type": "武器申领",
      "startAt": "2026-11-05T12:00:00+08:00",
      "endAt": null,
      "start": "2026-11-05",
      "end": null,
      "desc": "唤月（单手剑）获取概率提升。",
      "detail": "自烟火邀星河起，经过3次特许寻访后结束；只有相对期数，未公布日历日期。",
      "rewards": "概率提升：6星武器唤月",
      "condition": "解锁武库申领，具体条件见游戏内",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "11月5日 12:00 — 3次特许寻访后结束 · 日期待公告"
    },
    {
      "game": "endfield",
      "id": "end-ghost-weapon",
      "name": "幽寒申领",
      "short": "寒夜幽影申领",
      "type": "武器申领",
      "startAt": null,
      "endAt": null,
      "start": "2026-09-02",
      "end": null,
      "desc": "寒夜幽影（施术单元）获取概率提升。",
      "detail": "旧版公告明确自冬猎起，经过3次特许寻访后结束，并未写10月15日关闭；不将其他上期活动维护截止套用于此武器申领。具体结束日期仍待公告。",
      "rewards": "概率提升：6星武器寒夜幽影",
      "condition": "解锁武库申领，具体条件见游戏内",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/2653",
      "official": "https://endfield.hypergryph.com/news/2653",
      "verification": "国服官方公告",
      "externalActivity": false,
      "startPrecision": "version",
      "dateLabel": "9月2日版本更新后 — 自冬猎起3次特许寻访后结束 · 日期待公告"
    },
    {
      "game": "endfield",
      "id": "end-inn",
      "name": "烟火生缘",
      "short": "烟火生缘",
      "type": "趣味活动",
      "startAt": null,
      "endAt": null,
      "start": "2026-10-15",
      "end": null,
      "desc": "经营缘缘庄客栈，完成经营任务与里程目标。",
      "detail": "10月22日04:00更新活动内容。限时经营任务及其奖励在下次版本维护前关闭；结束后仍可经营客栈并获取经营里程阶段奖励，勿混同。下次维护日期待公告。",
      "rewards": "1000嵌晶玉、存续的痕迹等",
      "condition": "前往武陵「祀的画」并解锁缘缘庄经营",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "startPrecision": "version",
      "dateLabel": "2026-10-15 版本更新后 — 下次版本维护前 · 日期待公告"
    },
    {
      "game": "endfield",
      "id": "end-si-signin",
      "name": "万物有灵 · 七日签到",
      "short": "万物有灵签到",
      "type": "签到",
      "startAt": null,
      "endAt": "2026-11-05T12:00:00+08:00",
      "start": "2026-10-15",
      "end": "2026-11-05",
      "desc": "活动期间累计签到7日。",
      "detail": "签到期与万物更新寻访同期结束；专用凭证的使用范围以该寻访说明为准，请及时领取使用。",
      "rewards": "万物有灵寻访凭证×5等",
      "condition": "在活动期内累计签到7日",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/8548",
      "official": "https://endfield.hypergryph.com/news/8548",
      "verification": "国服官方公告",
      "externalActivity": false,
      "startPrecision": "version",
      "dateLabel": "2026-10-15 版本更新后 — 11月5日 11:59",
      "deadlineLabel": "11月5日 11:59"
    },
    {
      "game": "endfield",
      "id": "end-ink",
      "name": "墨分诸彩",
      "short": "墨分诸彩",
      "type": "引入活动",
      "startAt": null,
      "endAt": "2026-11-05T12:00:00+08:00",
      "start": "2026-10-15",
      "end": "2026-11-05",
      "desc": "在祀的画区域完成指定任务。",
      "detail": "公告截止为11月5日12:00，与同期签到/寻访公告写明的11:59分别记录。",
      "rewards": "1200嵌晶玉、存续的痕迹",
      "condition": "前往武陵「祀的画」并解锁指定任务",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "startPrecision": "version",
      "dateLabel": "2026-10-15 版本更新后 — 11月5日 12:00",
      "deadlineLabel": "11月5日 12:00"
    },
    {
      "game": "endfield",
      "id": "end-photo",
      "name": "卡莉的芳菲童话",
      "short": "芳菲童话拍照",
      "type": "拍照活动",
      "startAt": "2026-10-22T12:00:00+08:00",
      "endAt": "2026-11-05T04:00:00+08:00",
      "start": "2026-10-22",
      "end": "2026-11-05",
      "desc": "完成指定拍照任务。",
      "detail": "独立固定截止，不随下一版本维护时间调整。",
      "rewards": "1500嵌晶玉、卡莉的芳菲集头像框、存续的痕迹等",
      "condition": "解锁对应活动、玩法或区域；详细前置见游戏内",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "2026-10-22 12:00 — 2026-11-05 04:00"
    },
    {
      "game": "endfield",
      "id": "end-crisis-prep",
      "name": "危机筹备",
      "short": "危机筹备",
      "type": "限时福利",
      "startAt": "2026-10-29T04:00:00+08:00",
      "endAt": "2026-11-05T04:00:00+08:00",
      "start": "2026-10-29",
      "end": "2026-11-05",
      "desc": "每日完成指定筹备任务。",
      "detail": "每日任务与奖励请在活动期内完成领取，11月5日04:00关闭。",
      "rewards": "理智消耗许可、应急理智加强剂、武陵精锻助剂、冷却脂",
      "condition": "每日完成活动指定任务",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "2026-10-29 04:00 — 2026-11-05 04:00"
    },
    {
      "game": "endfield",
      "id": "end-martial",
      "name": "百趣演武",
      "short": "百趣演武",
      "type": "挑战",
      "startAt": "2026-10-29T12:00:00+08:00",
      "endAt": "2026-11-19T04:00:00+08:00",
      "start": "2026-10-29",
      "end": "2026-11-19",
      "desc": "完成挑战积累演武积分，领取历程奖励。",
      "detail": "11月11日04:00更新活动内容；达到演武历程各档目标后领取对应奖励。",
      "rewards": "1200嵌晶玉、存续的痕迹等",
      "condition": "解锁对应活动、玩法或区域；详细前置见游戏内",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "2026-10-29 12:00 — 2026-11-19 04:00"
    },
    {
      "game": "endfield",
      "id": "end-web-cinema",
      "name": "予众魂的新光影",
      "short": "新光影网页",
      "type": "网页活动",
      "startAt": "2026-10-31T12:00:00+08:00",
      "endAt": "2026-11-14T04:00:00+08:00",
      "start": "2026-10-31",
      "end": "2026-11-14",
      "desc": "在网页搭配演员与道具拍摄故事、解锁结局。",
      "detail": "实际参与在网页完成，属于游戏外活动；11月14日04:00关闭。",
      "rewards": "300嵌晶玉、折金票",
      "condition": "前往活动网页，登录账号并完成指定故事任务",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": true,
      "dateLabel": "2026-10-31 12:00 — 2026-11-14 04:00"
    },
    {
      "game": "endfield",
      "id": "end-guiye",
      "name": "归野 · 叙事活动开放",
      "short": "归野开放",
      "type": "内容开放",
      "startAt": "2026-11-05T12:00:00+08:00",
      "endAt": null,
      "start": "2026-11-05",
      "end": null,
      "desc": "支线归野与叙事活动页面开放。",
      "detail": "活动页面展示至下次版本维护前；页面下线后仍可在任务中体验支线并获得对应奖励，因此这里只标开放节点，不制造奖励截止。",
      "rewards": "600嵌晶玉、初级认知载体等",
      "condition": "满足支线「归野」任务参与条件",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "11月5日 12:00开放 · 支线及任务奖励后续仍可取得",
      "milestone": true
    },
    {
      "game": "endfield",
      "id": "end-minghe-signin",
      "name": "星河共我 · 七日签到",
      "short": "星河共我签到",
      "type": "签到",
      "startAt": "2026-11-05T12:00:00+08:00",
      "endAt": null,
      "start": "2026-11-05",
      "end": null,
      "desc": "活动期间累计签到7日。",
      "detail": "截止为下次版本更新维护前，下次维护日期待公告；不根据版本周期推算。",
      "rewards": "星河共我寻访凭证×5等",
      "condition": "在活动期内累计签到7日",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "2026-11-05 12:00 — 下次版本维护前 · 日期待公告"
    },
    {
      "game": "endfield",
      "id": "end-cc-blue",
      "name": "危机合约 · 浸蓝测试作战",
      "short": "浸蓝测试作战",
      "type": "挑战",
      "startAt": "2026-11-05T12:00:00+08:00",
      "endAt": null,
      "start": "2026-11-05",
      "end": null,
      "desc": "自选指标组合完成战斗挑战与活动任务。",
      "detail": "11月12日12:00更新内容。挑战结束于下次版本维护前，维护日期待公告。机密圣所兑换独立开放至12月3日04:00，可兑换2000嵌晶玉、除危记号贴纸、高阶培养自选箱Ⅱ等；兑换截止不等于关卡截止。",
      "rewards": "白刃的奖章头像、危机响应头像框、晶化硬币·浸蓝",
      "condition": "解锁危机合约活动并完成对应挑战和任务",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "2026-11-05 12:00 — 下次版本维护前 · 日期待公告"
    },
    {
      "game": "endfield",
      "id": "end-cc-blue-shop",
      "name": "浸蓝测试作战 · 机密圣所兑换",
      "short": "浸蓝商店兑换",
      "type": "关联兑换",
      "startAt": "2026-11-05T12:00:00+08:00",
      "endAt": "2026-12-03T04:00:00+08:00",
      "start": "2026-11-05",
      "end": "2026-12-03",
      "desc": "使用晶化硬币·浸蓝兑换物资。",
      "detail": "兑换期与挑战期不同；关联主体活动，仅在主体详情提醒，不单独显示或计数。",
      "rewards": "2000嵌晶玉、除危记号贴纸、高阶培养自选箱Ⅱ等",
      "condition": "持有晶化硬币·浸蓝",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "2026-11-05 12:00 — 2026-12-03 04:00",
      "parentEvent": "end-cc-blue"
    },
    {
      "game": "endfield",
      "id": "end-sanity-nov",
      "name": "理智补给 · 11月",
      "short": "11月理智补给",
      "type": "日常福利",
      "startAt": "2026-11-19T04:00:00+08:00",
      "endAt": "2026-11-26T04:00:00+08:00",
      "start": "2026-11-19",
      "end": "2026-11-26",
      "desc": "每日完成指定任务领取理智补给。",
      "detail": "公告为独立固定时段，不将11月26日视为版本维护日期。",
      "rewards": "理智消耗许可、应急理智加强剂",
      "condition": "完成每日指定任务",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "2026-11-19 04:00 — 2026-11-26 04:00"
    },
    {
      "game": "endfield",
      "id": "end-monument-forest",
      "name": "丰碑留名 · 魇林",
      "short": "魇林限时挑战",
      "type": "挑战",
      "startAt": "2026-10-22T12:00:00+08:00",
      "endAt": "2026-11-05T04:00:00+08:00",
      "start": "2026-10-22",
      "end": "2026-11-05",
      "desc": "完成影拓丰碑深林呓语对应挑战。",
      "detail": "新系列有4个关卡。这里的截止仅限丰碑留名活动，常驻关卡及常驻首通奖励不随活动关闭。",
      "rewards": "1200嵌晶玉、高阶培养自选箱Ⅱ等",
      "condition": "解锁影拓丰碑「深林呓语」系列并完成对应挑战",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "2026-10-22 12:00 — 2026-11-05 04:00"
    },
    {
      "game": "endfield",
      "id": "end-spaces-ink",
      "name": "密境行者 · 画外遗光开放",
      "short": "画外遗光开放",
      "type": "内容开放",
      "startAt": "2026-11-12T12:00:00+08:00",
      "endAt": null,
      "start": "2026-11-12",
      "end": null,
      "desc": "新空间组画外遗光分两批开放。",
      "detail": "11月12日12:00先开3个协议空间，11月19日04:00再开3个。公告没有关闭日期，仅列内容开放节点。",
      "rewards": "1200嵌晶玉、存续的痕迹等",
      "condition": "解锁密境行者对应空间组",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://endfield.hypergryph.com/news/6094",
      "official": "https://endfield.hypergryph.com/news/6094",
      "verification": "国服官方版本更新说明",
      "externalActivity": false,
      "dateLabel": "11月12日 12:00首批开放 · 11月19日04:00追加",
      "milestone": true
    },
    {
      "game": "endfield",
      "id": "end-creator-taptap",
      "name": "丹青渡 · TapTap创作征集",
      "short": "TapTap创作征集",
      "type": "站外投稿",
      "startAt": null,
      "endAt": "2026-11-26T00:00:00+08:00",
      "start": "2026-10-15",
      "end": "2026-11-26",
      "desc": "带终末地丹青渡话题投稿原创作品。",
      "detail": "投稿截至11月25日23:59。获奖名单在结束后30个工作日内更新；道具/实物获奖者须在收到站内信后10个自然日内登记信息，按通知执行，不另猜统一登记日期。",
      "rewards": "现金、嵌晶玉、周边套组；最高档648元＋5000嵌晶玉等",
      "condition": "按活动要求参与话题，原创图文至少1图，视频时长须大于15秒",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://www.taptap.cn/moment/859392463293382768?group_id=323017",
      "official": "https://endfield.hypergryph.com/news/9326",
      "verification": "官网链接的TapTap官方合作活动公告",
      "externalActivity": true,
      "dateLabel": "2026-10-15 — 11月25日 23:59",
      "deadlineLabel": "11月25日 23:59",
      "startPrecision": "day"
    },
    {
      "game": "endfield",
      "id": "end-creator-zhihu",
      "name": "丹青渡 · 知乎创作激励",
      "short": "知乎创作激励",
      "type": "站外投稿",
      "startAt": null,
      "endAt": null,
      "start": "2026-10-15",
      "end": "2026-11-26",
      "desc": "参与终末地话题提问、原创回答与互动。",
      "detail": "已实际读取合作活动图片：活动10月15日至11月25日，未列活动关闭小时，按日期展示。规则另列积分在11月25日23:59失效，请此前兑换；评选奖收到信息后3个工作日内反馈UID。",
      "rewards": "活动积分兑换游戏道具及周边，回答榜最高5000嵌晶玉",
      "condition": "按页面要求完成原创中文回答；评选回答长度不少于500字",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://www.zhihu.com/parker/campaign/2092990271961166464",
      "official": "https://endfield.hypergryph.com/news/9326",
      "verification": "官网链接的知乎合作活动 · 已读取规则图片",
      "externalActivity": true,
      "dateLabel": "10月15日 — 11月25日 · 活动按日期公布",
      "startPrecision": "day",
      "datePrecision": "day",
      "lastDay": "2026-11-25"
    },
    {
      "game": "arknights",
      "id": "ark-library-checkin",
      "name": "恒远津梁 · 国家图书馆联动签到",
      "short": "恒远津梁签到",
      "type": "签到",
      "startAt": "2026-10-16T16:00:00+08:00",
      "endAt": "2026-10-30T04:00:00+08:00",
      "start": "2026-10-16",
      "end": "2026-10-30",
      "desc": "活动内累计签到3日，领取联动家具。",
      "detail": "游戏内签到；联动时装、礼包的售卖截止不同，至11月6日03:59。",
      "rewards": "绒毛读书伴侣等家具",
      "condition": "活动期间在游戏内累计签到3日",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://ak.hypergryph.com/news/1454.html",
      "official": "https://ak.hypergryph.com/news/1454.html",
      "verification": "国服官方公告",
      "externalActivity": false,
      "dateLabel": "10月16日 16:00 — 10月30日 03:59"
    },
    {
      "game": "arknights",
      "id": "ark-library-shop",
      "name": "恒远津梁 · 联动时装与博览群书包",
      "short": "国家图书馆限定商城",
      "type": "限时商城",
      "startAt": "2026-10-16T16:00:00+08:00",
      "endAt": "2026-11-06T04:00:00+08:00",
      "start": "2026-10-16",
      "end": "2026-11-06",
      "desc": "国家图书馆合作时装及头像礼包限时售卖。",
      "detail": "联动时装不可用时装自选凭证兑换；全部在游戏内采购中心或时装商店购买。",
      "rewards": "黍/烛煌/琳琅诗怀雅合作时装；礼包含合成玉800及3款头像",
      "condition": "按游戏内价格购买",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://ak.hypergryph.com/news/1454.html",
      "official": "https://ak.hypergryph.com/news/1454.html",
      "verification": "国服官方公告",
      "externalActivity": false,
      "dateLabel": "10月16日 16:00 — 11月6日 03:59"
    },
    {
      "game": "arknights",
      "id": "ark-dahuang-qinghe-return",
      "name": "大荒青禾 · 主题组合包返场",
      "short": "大荒青禾返场",
      "type": "限时商城",
      "startAt": "2026-10-16T16:00:00+08:00",
      "endAt": "2026-11-06T04:00:00+08:00",
      "start": "2026-10-16",
      "end": "2026-11-06",
      "desc": "大荒界面与青穰场景组合包限时返场。",
      "detail": "本次返场不再享受首次上架优惠。",
      "rewards": "大荒界面主题、青穰主题场景",
      "condition": "按游戏内价格购买",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://ak.hypergryph.com/news/1454.html",
      "official": "https://ak.hypergryph.com/news/1454.html",
      "verification": "国服官方公告",
      "externalActivity": false,
      "dateLabel": "10月16日 16:00 — 11月6日 03:59"
    },
    {
      "game": "arknights",
      "id": "ark-outfits-20261024",
      "name": "复刻时装与罗德岛风尚回顾",
      "short": "10月复刻时装",
      "type": "限时商城",
      "startAt": "2026-10-24T04:00:00+08:00",
      "endAt": "2026-11-21T04:00:00+08:00",
      "start": "2026-10-24",
      "end": "2026-11-21",
      "desc": "多款时装复刻及当期风尚回顾限时开放。",
      "detail": "复刻范围包含光耀之途、追悼、无序的谦卑等；风尚回顾含沉思之庭、倾听等，完整清单见官方公告。",
      "rewards": "指定复刻时装，可按游戏内售价购买",
      "condition": "进入时装商店，按各时装售价购买",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://ak.hypergryph.com/news/1454.html",
      "official": "https://ak.hypergryph.com/news/1454.html",
      "verification": "国服官方公告",
      "externalActivity": false,
      "dateLabel": "10月24日 04:00 — 11月21日 03:59"
    },
    {
      "game": "arknights",
      "id": "ark-annihilation-graystone",
      "name": "剿灭委托 · 灰石剧场",
      "short": "灰石剧场",
      "type": "挑战轮换",
      "startAt": "2026-10-26T04:00:00+08:00",
      "endAt": "2027-01-25T04:00:00+08:00",
      "start": "2026-10-26",
      "end": "2027-01-25",
      "desc": "新增剿灭委托替换默祷圣祠。",
      "detail": "默祷圣祠关闭后收录进假定作战目标；此为已公布剿灭委托窗口，不推算下一轮关卡。",
      "rewards": "剿灭作战结算奖励，以游戏内规则为准",
      "condition": "通关主线2-8",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://ak.hypergryph.com/news/1454.html",
      "official": "https://ak.hypergryph.com/news/1454.html",
      "verification": "国服官方公告",
      "externalActivity": false,
      "dateLabel": "10月26日 04:00 — 2027年1月25日 03:59"
    },
    {
      "game": "arknights",
      "id": "ark-thanks-preview-2026",
      "name": "2026感谢庆典 · 前瞻特别直播",
      "short": "感谢庆典前瞻",
      "type": "直播",
      "startAt": "2026-10-24T19:30:00+08:00",
      "endAt": null,
      "start": "2026-10-24",
      "end": null,
      "desc": "官方前瞻介绍感谢庆典、新SideStory及限定寻访。",
      "detail": "可在哔哩哔哩直播间5555734等官方渠道观看；仅公布直播开始时刻，未公布结束或新活动完整排期。",
      "rewards": "后续活动情报；未公布观看奖励",
      "condition": "在官方直播平台观看",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://ak.hypergryph.com/news/0799",
      "official": "https://ak.hypergryph.com/news/0799",
      "verification": "国服官方公告",
      "externalActivity": true,
      "milestone": true,
      "dateLabel": "10月24日 19:30 开始；结束时刻未公告"
    },
    {
      "game": "arknights",
      "id": "ark-comms70-gift",
      "name": "制作组通讯70 · 邮件奖励",
      "short": "通讯70邮件",
      "type": "独立领奖",
      "startAt": "2026-10-17T17:00:00+08:00",
      "endAt": "2026-10-24T17:00:00+08:00",
      "start": "2026-10-17",
      "end": "2026-10-24",
      "desc": "通讯70奖励通过邮件发放，领取有效期7日。",
      "detail": "10月17日17:00发放，按官方7日有效期对应10月24日17:00；具体以邮箱所示剩余时长为准。此为独立通讯福利，非版本维护补偿。",
      "rewards": "合成玉200、聚酸酯组5",
      "condition": "10月17日17:00前注册并创建角色",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://ak.hypergryph.com/news/0799",
      "official": "https://ak.hypergryph.com/news/0799",
      "verification": "国服官方公告",
      "externalActivity": false,
      "dateLabel": "10月17日 17:00发放 · 邮件领取有效期7日",
      "deadlineLabel": "10月24日 17:00（按发放后7日）"
    },
    {
      "game": "arknights",
      "id": "ark-standard-20261008",
      "name": "常驻标准寻访 · 左乐/斥罪",
      "short": "左乐·斥罪UP",
      "type": "寻访",
      "startAt": "2026-10-08T04:00:00+08:00",
      "endAt": "2026-10-22T04:00:00+08:00",
      "start": "2026-10-08",
      "end": "2026-10-22",
      "desc": "当期标准寻访概率提升。",
      "detail": "TapTap官方栏原帖；斥罪、和弦可在本期高级凭证区兑换。",
      "rewards": "左乐/斥罪；五星寒檀/和弦/聆音概率提升",
      "condition": "使用标准寻访道具，兑换须持有相应凭证",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://www.taptap.cn/moment/856135623801572080",
      "official": "https://www.taptap.cn/moment/856135623801572080",
      "verification": "国服官方账号公告（TapTap官方栏）",
      "externalActivity": false,
      "dateLabel": "10月8日 04:00 — 10月22日 03:59"
    },
    {
      "game": "arknights",
      "id": "ark-classic-20261015",
      "name": "中坚寻访 · 棘刺/凯尔希",
      "short": "棘刺·凯尔希UP",
      "type": "寻访",
      "startAt": "2026-10-15T04:00:00+08:00",
      "endAt": "2026-10-29T04:00:00+08:00",
      "start": "2026-10-15",
      "end": "2026-10-29",
      "desc": "当期中坚寻访概率提升。",
      "detail": "TapTap官方栏原帖；棘刺、灰喉可在本期高级凭证或通用凭证区兑换。",
      "rewards": "棘刺/凯尔希；五星灰喉/诗怀雅/四月概率提升",
      "condition": "使用中坚寻访道具，兑换须持有相应凭证",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://www.taptap.cn/moment/859523733377781690",
      "official": "https://www.taptap.cn/moment/859523733377781690",
      "verification": "国服官方账号公告（TapTap官方栏）",
      "externalActivity": false,
      "dateLabel": "10月15日 04:00 — 10月29日 03:59"
    },
    {
      "game": "arknights",
      "id": "ark-standard-20261022-node",
      "name": "常驻标准寻访与凭证区更新",
      "short": "10月22日寻访更新",
      "type": "解锁节点",
      "startAt": "2026-10-22T04:00:00+08:00",
      "endAt": null,
      "start": "2026-10-22",
      "end": null,
      "desc": "官方已公布当期标准寻访更新节点。",
      "detail": "10月16日公告仅确认10月22日04:00更新及可兑换妮芙、波卜；未据此推算完整UP阵容或本期结束时刻。",
      "rewards": "高级凭证区可兑换妮芙、波卜，完整规则待单项公告",
      "condition": "查看游戏内当期寻访及高级凭证区",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://ak.hypergryph.com/news/3020",
      "official": "https://ak.hypergryph.com/news/3020",
      "verification": "国服官方公告",
      "externalActivity": false,
      "milestone": true,
      "dateLabel": "10月22日 04:00 更新；完整寻访排期待公告"
    },
    {
      "game": "arknights",
      "id": "ark-sea-shop-limited",
      "name": "昨日海 · 时装家具与养成包",
      "short": "昨日海限时商城",
      "type": "限时商城",
      "startAt": "2026-10-09T12:00:00+08:00",
      "endAt": "2026-10-23T04:00:00+08:00",
      "start": "2026-10-09",
      "end": "2026-10-23",
      "desc": "新装、复刻时装、时装回顾展及部分主题家具限时售卖。",
      "detail": "本条同刻关闭项目含错位巡礼新装、复刻时装、时装回顾展V、商店部分港都会客室家具，以及近卫芯片/港都之礼资金箱/黑流树海特训组合。活动代币商店另至10月30日03:59。",
      "rewards": "时装、家具及礼包内养成资源，具体清单与定价见游戏",
      "condition": "按各商店或礼包规则参与",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://ak.hypergryph.com/news/5101.html",
      "official": "https://ak.hypergryph.com/news/5101.html",
      "verification": "国服官方公告",
      "externalActivity": false,
      "dateLabel": "10月9日 12:00 — 10月23日 03:59"
    },
    {
      "game": "arknights",
      "id": "ark-sea-banner-packs",
      "name": "海渊巡游 · 专用寻访包售卖",
      "short": "海渊巡游专用包",
      "type": "限时商城",
      "startAt": "2026-10-09T12:00:00+08:00",
      "endAt": "2026-10-23T00:00:00+08:00",
      "start": "2026-10-09",
      "end": "2026-10-23",
      "desc": "两种专用寻访礼包在寻访关池前提前停售。",
      "detail": "海渊巡游寻访包、海渊巡游寻访组合包于10月22日23:59停售；专用凭证仍须在10月23日03:59前使用，不能留到其他卡池。",
      "rewards": "对应单抽凭证2张或专用十连凭证1张",
      "condition": "按游戏内价格及限购规则购买",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://ak.hypergryph.com/news/5101.html",
      "official": "https://ak.hypergryph.com/news/5101.html",
      "verification": "国服官方公告",
      "externalActivity": false,
      "dateLabel": "10月9日 12:00 — 10月22日 23:59"
    },
    {
      "game": "arknights",
      "id": "ark-theatre-prologue-pack",
      "name": "剧场序幕 · 主题组合包",
      "short": "剧场序幕组合包",
      "type": "限时商城",
      "startAt": "2026-10-09T12:00:00+08:00",
      "endAt": "2026-10-30T04:00:00+08:00",
      "start": "2026-10-09",
      "end": "2026-10-30",
      "desc": "主题场景与界面主题组合包限时售卖。",
      "detail": "当期为首次上架优惠；不是昨日海代币兑换窗口。",
      "rewards": "序幕主题场景、剧目界面主题",
      "condition": "按游戏内价格购买",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://ak.hypergryph.com/news/5101.html",
      "official": "https://ak.hypergryph.com/news/5101.html",
      "verification": "国服官方公告",
      "externalActivity": false,
      "dateLabel": "10月9日 12:00 — 10月30日 03:59"
    },
    {
      "game": "arknights",
      "id": "ark-vector-packs",
      "name": "拟生态 · 限时组合包",
      "short": "拟生态组合包",
      "type": "限时商城",
      "startAt": "2026-09-29T16:00:00+08:00",
      "endAt": "2026-10-20T04:00:00+08:00",
      "start": "2026-09-29",
      "end": "2026-10-20",
      "desc": "定向甄选与养成类组合包限时售卖。",
      "detail": "含寻访、模组、特训、技能与资金组合包，具体内容和售价见公告；本期定向甄选寻访已于10月13日03:59结束，礼包售卖仍至10月20日03:59。",
      "rewards": "寻访凭证、源石及指定养成资源",
      "condition": "按游戏内定价和限购要求购买",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://ak.hypergryph.com/news/1455",
      "official": "https://ak.hypergryph.com/news/1455",
      "verification": "国服官方公告",
      "externalActivity": false,
      "dateLabel": "9月29日 16:00 — 10月20日 03:59"
    },
    {
      "game": "fgo",
      "id": "fgo-assassin-daily-tasks",
      "name": "Assassin应援 · 每日任务追加奖励",
      "short": "暗匿者每日任务",
      "type": "限时任务",
      "start": "2026-10-05",
      "end": "2026-10-19",
      "startAt": "2026-10-05T00:00:00+08:00",
      "endAt": "2026-10-19T00:00:00+08:00",
      "desc": "完成当日所有每日任务，领取暗匿者养成兑换券。",
      "detail": "每天00:00刷新，各日必须当天完成；每个任务奖励3张兑换券，最后一天为10月18日23:59。已完成任务领奖至10月25日23:59；兑换券交换至11月1日23:59，届时删除。",
      "rewards": "每日3张暗匿者养成兑换券，可选暗阶银棋、金像及三类技能石",
      "condition": "在对应日期完成全部每日任务；已解锁每日任务",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://game.bilibili.com/fgo/news.html#!news/0/1/18411",
      "official": "https://game.bilibili.com/fgo/news.html#!news/0/1/18411",
      "verification": "国服官方公告（公开新闻接口正文核对）",
      "externalActivity": false,
      "dateLabel": "10月5日 00:00 — 10月18日 23:59",
      "timing": "任务完成至10月18日23:59；领取至10月25日23:59；兑换券使用至11月1日23:59。"
    },
    {
      "game": "fgo",
      "id": "fgo-assassin-daily-claim",
      "name": "Assassin应援 · 每日追加任务领奖",
      "short": "暗匿者任务领奖",
      "type": "领奖",
      "start": "2026-10-05",
      "end": "2026-10-26",
      "startAt": "2026-10-05T00:00:00+08:00",
      "endAt": "2026-10-26T00:00:00+08:00",
      "desc": "领取已完成的每日追加任务奖励。",
      "detail": "任务必须在10月5日至18日各对应日期完成；这里只保留已完成任务的领取期。",
      "rewards": "暗匿者养成兑换券",
      "condition": "已完成对应每日追加任务",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://game.bilibili.com/fgo/news.html#!news/0/1/18411",
      "official": "https://game.bilibili.com/fgo/news.html#!news/0/1/18411",
      "verification": "国服官方公告（公开新闻接口正文核对）",
      "externalActivity": false,
      "parentEvent": "fgo-assassin-daily-tasks",
      "dateLabel": "10月5日 00:00 — 10月25日 23:59"
    },
    {
      "game": "fgo",
      "id": "fgo-assassin-celebration",
      "name": "冠位戴冠战：Assassin · 开幕纪念",
      "short": "Assassin开幕纪念",
      "type": "限时任务与签到",
      "start": "2026-10-15",
      "end": "2026-10-22",
      "startAt": null,
      "endAt": "2026-10-22T14:00:00+08:00",
      "desc": "选定Assassin冠位、完成限时挑战，并利用冠位钻研战风暴罐0消耗。",
      "detail": "冠位战本体常驻；限时福利至10月22日13:59。选定1骑Assassin冠位可得3圣晶石，通关任务最多18个占星茶壶；首批任务10月15日维护后—16日23:59，17、18、19、20日各当天完成，最后批次21日00:00—22日13:59，各批最多3次。任务领取至10月29日13:59，占星茶壶使用至11月30日23:59。同期累计登录7天最多7个黄金果实，首次为维护后，此后每日04:00刷新。注意自动使用风暴罐设为ON时，0消耗期间仍会使用风暴罐以获得星光之砂。永久追加任务不在本期结束时消失。",
      "rewards": "3圣晶石、最多18占星茶壶、最多7黄金果实；冠位钻研战风暴罐0消耗",
      "condition": "冠位战须通关奏章序幕 Ordeal Call 0；登录奖励须通关特异点F冬木。任务能否完成取决于主线进度及冠位选定资格。",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://game.bilibili.com/fgo/news.html#!news/0/1/18453",
      "official": "https://game.bilibili.com/fgo/news.html#!news/0/1/18453",
      "verification": "国服官方公告（公开新闻接口正文核对）",
      "externalActivity": false,
      "startPrecision": "maintenance",
      "dateLabel": "10月15日维护后 — 10月22日 13:59",
      "timing": "限时挑战、任务及登录至10月22日13:59；已完成任务领取至10月29日13:59；占星茶壶至11月30日23:59使用。永久关卡、特殊任务继续开放。"
    },
    {
      "game": "fgo",
      "id": "fgo-assassin-celebration-claim",
      "name": "Assassin开幕纪念 · 限定任务领奖",
      "short": "Assassin开幕领奖",
      "type": "领奖",
      "start": "2026-10-15",
      "end": "2026-10-29",
      "startAt": null,
      "endAt": "2026-10-29T14:00:00+08:00",
      "desc": "领取已完成的开幕纪念限定任务奖励。",
      "detail": "完成期只到10月22日13:59；领取期比完成期多一周。",
      "rewards": "3圣晶石、最多18占星茶壶",
      "condition": "已完成对应Assassin开幕纪念限定任务",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://game.bilibili.com/fgo/news.html#!news/0/1/18453",
      "official": "https://game.bilibili.com/fgo/news.html#!news/0/1/18453",
      "verification": "国服官方公告（公开新闻接口正文核对）",
      "externalActivity": false,
      "startPrecision": "maintenance",
      "parentEvent": "fgo-assassin-celebration",
      "dateLabel": "10月15日维护后 — 10月29日 13:59"
    },
    {
      "game": "fgo",
      "id": "fgo-assassin-celebration-teapot",
      "name": "Assassin开幕纪念 · 占星茶壶使用",
      "short": "占星茶壶使用",
      "type": "道具期限",
      "start": "2026-10-15",
      "end": "2026-12-01",
      "startAt": null,
      "endAt": "2026-12-01T00:00:00+08:00",
      "desc": "在使用期结束前用掉本次获得的占星茶壶。",
      "detail": "11月30日23:59后本期占星茶壶删除；获得任务与领奖截止均早于道具使用截止。",
      "rewards": "本次获得的占星茶壶在期限内使用",
      "condition": "持有本次获得且尚未使用的占星茶壶",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://game.bilibili.com/fgo/news.html#!news/0/1/18453",
      "official": "https://game.bilibili.com/fgo/news.html#!news/0/1/18453",
      "verification": "国服官方公告（公开新闻接口正文核对）",
      "externalActivity": false,
      "startPrecision": "maintenance",
      "parentEvent": "fgo-assassin-celebration",
      "dateLabel": "10月15日维护后 — 11月30日 23:59"
    },
    {
      "game": "fgo",
      "id": "fgo-halloween2026-prelude",
      "name": "「万圣节2026」开幕前夕纪念活动",
      "short": "万圣节开幕前夕",
      "type": "纪念活动",
      "start": "2026-10-17",
      "end": "2026-10-31",
      "startAt": "2026-10-17T19:00:00+08:00",
      "endAt": "2026-10-31T14:00:00+08:00",
      "desc": "领取倒计时登录奖励，提前强化活动加成从者。",
      "detail": "活动总期10月17日19:00—31日13:59。对象从者牵绊获得量+20%只到10月22日13:59，冠位戴冠战不在对象内。10月20日04:00—21日03:59登录得1圣晶石、21日04:00—22日03:59得2圣晶石、22日04:00—23日03:59得1呼符，各日期仅能领对应奖励。10月22日维护后—31日13:59对象从者强化大成功/极大成功率2倍，指定强化关卡和幕间AP减半。魔术礼装「万圣节王室成员」10月22日维护后常驻追加，通关第2部序章的指定章节可免费交换，不设本期交换期限。万圣节主体仅已公布10月22日开幕，未推算结束日期。",
      "rewards": "倒计时共3圣晶石、1呼符；指定从者牵绊及养成优惠",
      "condition": "倒计时登录须在各期03:59前通关特异点F冬木；其他加成按官方名单与关卡解锁条件",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://game.bilibili.com/fgo/news.html#!news/0/1/18454",
      "official": "https://game.bilibili.com/fgo/news.html#!news/0/1/18454",
      "verification": "国服官方公告（公开新闻接口正文核对）",
      "externalActivity": false,
      "dateLabel": "10月17日 19:00 — 10月31日 13:59",
      "timing": "牵绊+20%至10月22日13:59；倒计时登录10月20日04:00—23日03:59；强化优惠为10月22日维护后—31日13:59。"
    },
    {
      "game": "fgo",
      "id": "fgo-halloween2026-prelude-login",
      "name": "万圣节2026开幕前夕 · 倒计时登录",
      "short": "万圣节倒计时登录",
      "type": "签到",
      "start": "2026-10-20",
      "end": "2026-10-23",
      "startAt": "2026-10-20T04:00:00+08:00",
      "endAt": "2026-10-23T04:00:00+08:00",
      "desc": "在三个指定日分别登录领取奖励。",
      "detail": "20日04:00—21日03:59得1圣晶石，21日04:00—22日03:59得2圣晶石，22日04:00—23日03:59得1呼符。不能补领其他日期，每日04:00更换。",
      "rewards": "合计3圣晶石、1呼符",
      "condition": "在各奖励期结束前通关特异点F冬木并登录",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://game.bilibili.com/fgo/news.html#!news/0/1/18454",
      "official": "https://game.bilibili.com/fgo/news.html#!news/0/1/18454",
      "verification": "国服官方公告（公开新闻接口正文核对）",
      "externalActivity": false,
      "parentEvent": "fgo-halloween2026-prelude",
      "dateLabel": "10月20日 04:00 — 10月23日 03:59"
    },
    {
      "game": "fgo",
      "id": "fgo-halloween2026-opening",
      "name": "万圣节2026 · 预定开幕",
      "short": "万圣节开幕",
      "type": "开放节点",
      "start": "2026-10-22",
      "end": null,
      "startAt": null,
      "endAt": null,
      "desc": "万圣节2026预定10月22日开幕。",
      "detail": "本次官方开幕前夕公告仅确认10月22日开幕；未取得主体完整公告，不推算开服钟点、关卡结束、商店兑换或推荐召唤日期。",
      "rewards": "主体奖励待正式公告",
      "condition": "主体活动参与条件待正式公告",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://game.bilibili.com/fgo/news.html#!news/0/1/18454",
      "official": "https://game.bilibili.com/fgo/news.html#!news/0/1/18454",
      "verification": "国服官方公告（公开新闻接口正文核对）",
      "externalActivity": false,
      "milestone": true,
      "startPrecision": "day",
      "dateLabel": "10月22日预定开幕 · 主体详细排期待公告"
    },
    {
      "game": "fgo",
      "id": "fgo-fop-oc4",
      "name": "Final Order Project · 奏章Ⅳ通关应援限定任务",
      "short": "奏章Ⅳ限定任务",
      "type": "主线限定任务",
      "start": "2026-10-20",
      "end": "2026-10-27",
      "startAt": "2026-10-20T19:00:00+08:00",
      "endAt": "2026-10-27T19:00:00+08:00",
      "desc": "在一周期限内推进对象主线三关，领取最多3圣晶石。",
      "detail": "限定任务完成期10月20日19:00—27日18:59，奖励领取至11月3日18:59。推进对象主线1、2、3关各得1圣晶石；已经全通对象主线时任务自动完成。第2部5.5章/6.5章、亚种特异点、主线物语不计入。本公告总应援期至12月20日13:59；奏章IV特殊通关任务和莫里亚蒂Ruler简易灵衣为常驻，无本期到期。灵脉石追加10次优惠交换，交换和使用均至12月31日23:59。通关奏章IV后迎接第2部终章的1000圣晶石条件仍需在12月20日维护前满足，维护准确钟点不据此推算。",
      "rewards": "限定推进任务最多3圣晶石；常驻特殊任务含五星芙芙、种火、巡灵之叶与QP",
      "condition": "推进第1部、第2部及奏章IV为止的对象主线；不包含5.5/6.5章、亚种特异点和主线物语",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://game.bilibili.com/fgo/news.html#!news/0/1/18455",
      "official": "https://game.bilibili.com/fgo/news.html#!news/0/1/18455",
      "verification": "国服官方公告（公开新闻接口正文核对）",
      "externalActivity": false,
      "dateLabel": "10月20日 19:00 — 10月27日 18:59",
      "timing": "限定任务完成至10月27日18:59，领取至11月3日18:59。永久特殊任务与灵衣无期限；灵脉石交换、使用至12月31日23:59。"
    },
    {
      "game": "fgo",
      "id": "fgo-fop-oc4-claim",
      "name": "奏章Ⅳ应援 · 限定任务领奖",
      "short": "奏章Ⅳ领奖",
      "type": "领奖",
      "start": "2026-10-20",
      "end": "2026-11-03",
      "startAt": "2026-10-20T19:00:00+08:00",
      "endAt": "2026-11-03T19:00:00+08:00",
      "desc": "领取已经完成的奏章IV应援限定推进任务奖励。",
      "detail": "任务必须在10月27日18:59前完成；奖励领取比任务完成期多一周。",
      "rewards": "最多3圣晶石",
      "condition": "对应任务已在完成期限内达成",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://game.bilibili.com/fgo/news.html#!news/0/1/18455",
      "official": "https://game.bilibili.com/fgo/news.html#!news/0/1/18455",
      "verification": "国服官方公告（公开新闻接口正文核对）",
      "externalActivity": false,
      "parentEvent": "fgo-fop-oc4",
      "dateLabel": "10月20日 19:00 — 11月3日 18:59"
    },
    {
      "game": "genshin",
      "id": "gs-snowball",
      "name": "无忧无虑大雪仗",
      "short": "无忧无虑大雪仗",
      "type": "限时活动",
      "startAt": "2026-10-21T10:00:00+08:00",
      "endAt": "2026-11-02T04:00:00+08:00",
      "start": "2026-10-21",
      "end": "2026-11-02",
      "desc": "参与趣味投掷挑战，获取原石和特殊摆设。",
      "detail": "时间及奖励已从国服官方第二期活动速递长图核对；参与等级、前置任务与关卡规则待单项公告补充，以活动界面为准。",
      "rewards": "原石、特殊摆设、培养材料",
      "condition": "具体参与等级与前置任务待单项公告核对",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://www.taptap.cn/moment/858661606224038474",
      "official": "https://ys.mihoyo.com/main/news",
      "verification": "国服官方入驻账号公告 · 已实际读取官方图片排期",
      "externalActivity": false,
      "dateLabel": "10月21日 10:00 — 11月2日 03:59"
    },
    {
      "game": "genshin",
      "id": "gs-blessing-overflow",
      "name": "祝圣移涌 · 圣遗物双倍掉落",
      "short": "祝圣移涌",
      "type": "双倍掉落",
      "startAt": "2026-10-26T04:00:00+08:00",
      "endAt": "2026-11-02T04:00:00+08:00",
      "start": "2026-10-26",
      "end": "2026-11-02",
      "desc": "在祝圣秘境消耗原粹树脂领取秘宝，获得双倍奖励。",
      "detail": "官方第二期速递长图明确列出本期时间；每天共有3次双倍掉落机会，需消耗原粹树脂。具体秘境解锁条件和领奖细则以游戏内为准。",
      "rewards": "祝圣秘境圣遗物双倍掉落，每日3次",
      "condition": "解锁并成功挑战相应祝圣秘境，消耗原粹树脂",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://www.taptap.cn/moment/858661606224038474",
      "official": "https://ys.mihoyo.com/main/news",
      "verification": "国服官方入驻账号公告 · 已实际读取官方图片排期",
      "externalActivity": false,
      "dateLabel": "10月26日 04:00 — 11月2日 03:59"
    },
    {
      "game": "genshin",
      "id": "gs-miliastra-mask-gift",
      "name": "绮星盛会 · 奇怪丘丘面具赠礼",
      "short": "丘丘面具赠礼",
      "type": "装扮赠礼",
      "startAt": null,
      "endAt": "2026-11-03T04:00:00+08:00",
      "start": "2026-09-23",
      "end": "2026-11-03",
      "desc": "在绮星盛会活动界面直接领取头饰装扮。",
      "detail": "这是无需完成奇域佳选玩法的独立装扮赠礼；官方绮星盛会公告列出7.1更新后至11月3日04:00活动窗口。奇域佳选玩法另于10月22日03:59关闭，请勿混淆。",
      "rewards": "头饰装扮“奇怪丘丘面具”",
      "condition": "前往千星奇域的绮星盛会界面；具体资格以游戏内为准",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://www.taptap.cn/moment/851174639563443486",
      "official": "https://ys.mihoyo.com/main/news",
      "verification": "国服官方入驻账号公告",
      "externalActivity": false,
      "startPrecision": "version",
      "dateLabel": "9月23日 7.1版本更新后 — 11月3日 04:00"
    },
    {
      "game": "genshin",
      "id": "gs-taptap-verdict-discussion",
      "name": "TapTap 有奖讨论 · 判测胜券本征",
      "short": "判测心得抽奖",
      "type": "社区活动",
      "startAt": null,
      "endAt": "2026-10-21T00:00:00+08:00",
      "start": "2026-10-12",
      "end": "2026-10-21",
      "desc": "在官方活动帖分享游戏UID和预测心得，参与原石抽奖。",
      "detail": "这是独立论坛抽奖，游戏内预测活动另于10月20日09:59结束；论坛投稿可至当日23:59。10月29日在原帖更新获奖名单，不作为新的领奖条目。仅有效的原帖评论参与，楼中楼或独立开帖无效。",
      "rewards": "随机抽取5名，每名原石160",
      "condition": "在指定官方帖评论区按规则填写游戏UID、成绩及预测心得",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://www.taptap.cn/moment/858658734300203297",
      "official": "https://ys.mihoyo.com/main/news",
      "verification": "TapTap国服官方入驻账号“史莱姆酱”活动公告",
      "externalActivity": true,
      "startPrecision": "day",
      "dateLabel": "10月12日 — 10月20日 23:59"
    },
    {
      "game": "genshin",
      "id": "gs-taptap-oct-birthdays",
      "name": "TapTap 10月生日会话题活动",
      "short": "10月生日会抽奖",
      "type": "社区活动",
      "startAt": null,
      "endAt": "2026-11-01T00:00:00+08:00",
      "start": "2026-10-02",
      "end": "2026-11-01",
      "desc": "在官方生日会话题帖为角色送祝福，参与周边抽奖。",
      "detail": "在原帖评论区以角色名和祝福语回复；可向多个角色送祝福。11月10日在原帖更新获奖名单；中国港澳台地区及国外无法获得本次实物奖品。",
      "rewards": "随机抽取45名，每人随机款原神周边1份",
      "condition": "在指定官方帖按格式回复角色生日祝福；遵守原帖有效回复规则",
      "confirmed": true,
      "checked": "2026-10-18",
      "source": "https://www.taptap.cn/moment/854675085875743153",
      "official": "https://ys.mihoyo.com/main/news",
      "verification": "TapTap国服官方入驻账号“史莱姆酱”活动公告",
      "externalActivity": true,
      "startPrecision": "day",
      "dateLabel": "10月2日 — 10月31日 23:59"
    }
  ]
};
for(const patch of REVIEW_20261018.patches){
 const {id,remove=[],...fields}=patch;
 const event=GAME_EVENTS.find(e=>e.id===id);
 if(!event)throw new Error('Missing reviewed event: '+id);
 Object.assign(event,fields);
 for(const field of remove)delete event[field];
}
GAME_EVENTS.push(...REVIEW_20261018.additions);

// Fixed deadlines for weekly resets and announced maintenance dates (UTC+8).
const STANDARD_DEADLINE_HOURS={wowWeekly:'05:00',endfieldMaintenance:'06:00'};
for(const e of GAME_EVENTS){
 const wow=e.game==='wow'&&e.weeklyResetDate;
 const endfield=e.game==='endfield'&&e.boundaryDate;
 if(!wow&&!endfield)continue;
 const date=wow?e.weeklyResetDate:e.boundaryDate;
 const clock=wow?STANDARD_DEADLINE_HOURS.wowWeekly:STANDARD_DEADLINE_HOURS.endfieldMaintenance;
 e.cutoffBasis='fixed-schedule';
 e.cutoffChecked='2026-10-14';
 e.endAt=date+'T'+clock+':00+08:00';
 e.end=date;
 delete e.datePrecision;
 delete e.lastDay;
 delete e.boundaryDate;
 e.deadlineLabel=date.slice(5).replace('-','/')+' '+clock;
 const opening=(e.dateLabel||e.start).split(' — ')[0];
 e.dateLabel=opening+' — '+date+' '+clock+(wow?'':' · 维护前');
 if(wow)e.timing='周常每周四北京时间05:00结束。';
 else e.timing=[e.timing,'版本维护前活动截至'+date+' 06:00（北京时间）。'].filter(Boolean).join(' ');
 if(endfield){
  for(const field of ['desc','detail'])if(e[field])e[field]=e[field].replaceAll('具体关服时刻待公告','维护开始时间为06:00').replaceAll('维护时刻仍待官方公告','维护开始时间为06:00').replaceAll('具体时刻待公告','维护开始时间为06:00').replaceAll('维护时刻仍待公告','维护开始时间为06:00');
 }
}

// Participation location is explicit metadata, independent of rewards or links.
// Legacy web campaigns include mixed in-game tasks with separate website entry.
const EXTERNAL_ACTIVITY_IDS=new Set([
 'autumn','autumn-wishes','starlight-double','wow-adventure-handbook',
 'ff14-monthcard-gifts','ff14-monthcard-offer','ff14-monthcard-lottery',
 'ff14-pailifang','ff14-gold84-duty','ff14-gold84-draw',
 'ff14-fanfest3-register','ff14-fanfest3-keynote',
 'end-web-fusion','end-preview-gift','ark-sea-creation',
 'gs-anniversary-web','gs-miliastra-web','hsr-web-joy'
]);
for(const e of GAME_EVENTS){
 if(typeof e.externalActivity!=='boolean')e.externalActivity=EXTERNAL_ACTIVITY_IDS.has(e.id);
}
for(const e of GAME_EVENTS){
 if(e.parentEvent&&GAME_EVENTS.find(parent=>parent.id===e.parentEvent)?.externalActivity)e.externalActivity=true;
}

// Star Rail banners and recurring challenge cycles are outside this calendar.
// Keep source history while excluding current, future and archived windows.
const HSR_EXCLUDED_EVENT_TYPES=new Set(['跃迁','活动跃迁','角色跃迁','光锥跃迁','挑战轮换','挑战节点']);
for(const e of GAME_EVENTS){
 if(e.game==='hsr'&&HSR_EXCLUDED_EVENT_TYPES.has(e.type))e.excludedFromCalendar=true;
}
