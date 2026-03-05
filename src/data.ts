export interface ComicTemplate {
  id: string;
  theme: string;
  panels: string[];
}

export const PERSONALITY_TITLES = [
  "奶油社交家", "黏人小太阳", "冷面小暴君", "高智商焦虑怪", "温柔守护者", "冒险小火箭",
  "戏精小演员", "慵懒小王子", "拆家艺术家", "小哲学家", "宇宙交际花", "安静小月亮"
];

export const COMIC_TEMPLATES: ComicTemplate[] = [
  {
    id: "social_star",
    theme: "社交达人的日常",
    panels: [
      "开场：宠物在门口兴奋地等待客人",
      "性格表现：客人一进门，宠物立刻扑上去热情欢迎",
      "与主人互动：主人拉都拉不住，宠物已经和客人打成一片",
      "情绪变化：客人离开时，宠物依依不舍地望着门口",
      "可爱行为：试图钻进客人的包里想被带走",
      "总结：展示宠物名字、MBTI、星座和人格称号"
    ]
  },
  {
    id: "clingy_sun",
    theme: "黏人精的贴贴生活",
    panels: [
      "开场：主人正在沙发上玩手机",
      "性格表现：宠物像影子一样紧紧贴着主人的腿",
      "与主人互动：主人去洗手间，宠物在门口疯狂挠门",
      "情绪变化：主人抱起宠物时，它露出极度满足的表情",
      "可爱行为：睡觉也要把头枕在主人的脚背上",
      "总结：展示宠物名字、MBTI、星座和人格称号"
    ]
  },
  {
    id: "little_tyrant",
    theme: "霸道总裁的巡视",
    panels: [
      "开场：宠物站在高处俯瞰整个客厅",
      "性格表现：用爪子拍打空碗，示意主人立刻上菜",
      "与主人互动：主人试图摸头，被它傲娇地躲开",
      "情绪变化：看到心爱的零食，瞬间变脸卖萌",
      "可爱行为：霸占主人的枕头，让主人无处可睡",
      "总结：展示宠物名字、MBTI、星座和人格称号"
    ]
  },
  {
    id: "anxious_genius",
    theme: "高智商的烦恼",
    panels: [
      "开场：宠物盯着扫地机器人，眼神充满警惕",
      "性格表现：成功破解了自动喂食器的密码",
      "与主人互动：主人藏起零食，它瞬间识破并找了出来",
      "情绪变化：听到雷声，立刻钻进主人的被窝寻求安全感",
      "可爱行为：试图模仿主人敲击键盘的样子",
      "总结：展示宠物名字、MBTI、星座和人格称号"
    ]
  },
  {
    id: "gentle_guardian",
    theme: "温柔的守护时光",
    panels: [
      "开场：主人下班回家，一脸疲惫地坐下",
      "性格表现：宠物静静地走过来，把头靠在主人膝盖上",
      "与主人互动：主人流泪时，它温柔地舔去主人的泪水",
      "情绪变化：家里有响动，它立刻警觉地护在主人身前",
      "可爱行为：把最心爱的玩具叼给主人，想让主人开心",
      "总结：展示宠物名字、MBTI、星座和人格称号"
    ]
  },
  {
    id: "adventure_rocket",
    theme: "疯狂的冒险之旅",
    panels: [
      "开场：看到牵引绳的瞬间，宠物化身残影",
      "性格表现：在草地上疯狂冲刺，像一颗发射的小火箭",
      "与主人互动：主人在后面追得气喘吁吁，它回头挑衅",
      "情绪变化：被带回家时，四脚朝天耍赖不想走",
      "可爱行为：试图追逐自己的尾巴，转成一个圆圈",
      "总结：展示宠物名字、MBTI、星座和人格称号"
    ]
  },
  {
    id: "drama_actor",
    theme: "戏精的自我修养",
    panels: [
      "开场：主人拿出了洗澡盆，宠物瞬间消失",
      "性格表现：被抓到后，露出仿佛要被送去外星的惊恐表情",
      "与主人互动：主人给它穿上小衣服，它立刻僵住不会走路",
      "情绪变化：看到零食，刚才的委屈瞬间烟消云散",
      "可爱行为：对着镜子里的自己疯狂叫唤，以为是新朋友",
      "总结：展示宠物名字、MBTI、星座和人格称号"
    ]
  },
  {
    id: "lazy_prince",
    theme: "慵懒王子的午后",
    panels: [
      "开场：阳光洒在窗台上，宠物正在摊成一张饼",
      "性格表现：主人叫它名字，它只动了动耳朵尖表示听到了",
      "与主人互动：主人试图逗它玩，它翻个身继续睡",
      "情绪变化：开罐头的声音响起，它以瞬移的速度出现",
      "可爱行为：睡觉时吐出一点点舌头尖，还打着小呼噜",
      "总结：展示宠物名字、MBTI、星座和人格称号"
    ]
  },
  {
    id: "destruction_artist",
    theme: "拆家艺术家的杰作",
    panels: [
      "开场：主人出门了，宠物露出了神秘的微笑",
      "性格表现：卫生纸被拉得满屋子都是，像在办画展",
      "与主人互动：主人回家看到惨状，它一脸无辜地歪头",
      "情绪变化：被训斥时，立刻躲进沙发底下装可怜",
      "可爱行为：把拖鞋叼进窝里，当成自己的战利品",
      "总结：展示宠物名字、MBTI、星座和人格称号"
    ]
  },
  {
    id: "philosopher",
    theme: "小哲学家的沉思",
    panels: [
      "开场：宠物坐在窗边，深沉地望着远方",
      "性格表现：拒绝玩幼稚的球类游戏，保持高冷",
      "与主人互动：主人跟它说话，它用深邃的眼神回应",
      "情绪变化：看到一只飞过的蝴蝶，瞬间破功去追逐",
      "可爱行为：思考时会用爪子托着下巴，像个思想者",
      "总结：展示宠物名字、MBTI、星座和人格称号"
    ]
  },
  {
    id: "universal_friend",
    theme: "宇宙交际花的魅力",
    panels: [
      "开场：在公园里，它主动走向一只巨大的藏獒",
      "性格表现：不仅和狗玩，还试图和路边的流浪猫打招呼",
      "与主人互动：主人带它去宠物店，它和所有员工都贴贴",
      "情绪变化：看到没见过的奇怪生物，第一反应是去闻闻",
      "可爱行为：试图模仿其他动物的叫声，发出奇怪的音节",
      "总结：展示宠物名字、MBTI、星座和人格称号"
    ]
  },
  {
    id: "quiet_moon",
    theme: "安静小月亮的陪伴",
    panels: [
      "开场：夜深了，宠物静静地趴在主人脚边",
      "性格表现：不吵不闹，只是温柔地注视着主人工作",
      "与主人互动：主人伸出手，它轻轻地把爪子搭上去",
      "情绪变化：主人关灯睡觉，它轻手轻脚地跳上床角",
      "可爱行为：在睡梦中轻轻蹬腿，似乎在做美梦",
      "总结：展示宠物名字、MBTI、星座和人格称号"
    ]
  }
];

export const getPersonalityTitleAndTemplate = (code: string, scores: { EI: number, SN: number, TF: number, JP: number }) => {
  const e = scores.EI;
  const i = -scores.EI;
  const s = scores.SN;
  const n = -scores.SN;
  const t = scores.TF;
  const f = -scores.TF;
  const j = scores.JP;
  const p = -scores.JP;

  // Logic to pick title
  let title = PERSONALITY_TITLES[0];
  let templateId = "social_star";

  if (e > 0 && f > 0) {
    title = "奶油社交家";
    templateId = "social_star";
  }
  if (e > 2 && f > 2) {
    title = "黏人小太阳";
    templateId = "clingy_sun";
  }
  if (e > 0 && t > 0) {
    title = "冷面小暴君";
    templateId = "little_tyrant";
  }
  if (n > 0 && j > 0) {
    title = "高智商焦虑怪";
    templateId = "anxious_genius";
  }
  if (f > 0 && j > 0) {
    title = "温柔守护者";
    templateId = "gentle_guardian";
  }
  if (e > 0 && p > 0) {
    title = "冒险小火箭";
    templateId = "adventure_rocket";
  }
  if (e > 1 && p > 1 && f > 0) {
    title = "戏精小演员";
    templateId = "drama_actor";
  }
  if (i > 0 && p > 0) {
    title = "慵懒小王子";
    templateId = "lazy_prince";
  }
  if (s > 0 && p > 0) {
    title = "拆家艺术家";
    templateId = "destruction_artist";
  }
  if (i > 0 && n > 0) {
    title = "小哲学家";
    templateId = "philosopher";
  }
  if (e > 3) {
    title = "宇宙交际花";
    templateId = "universal_friend";
  }
  if (i > 2 && f > 0) {
    title = "安静小月亮";
    templateId = "quiet_moon";
  }

  const template = COMIC_TEMPLATES.find(t => t.id === templateId) || COMIC_TEMPLATES[0];
  return { title, template };
};

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    dimension: 'EI' | 'SN' | 'TF' | 'JP';
    value: number;
  }[];
}

export interface BreedInfo {
  id: string;
  name: string;
  enName: string;
  icon: string;
  desc: string;
  modifiers: {
    EI?: number;
    SN?: number;
    TF?: number;
    JP?: number;
  };
}

export const BREED_DATA: BreedInfo[] = [
  { id: 'pomeranian', name: '博美', enName: 'Pomeranian', icon: '🦊', desc: '活泼机警，充满好奇心', modifiers: { EI: 0.5, SN: 0.5 } },
  { id: 'golden', name: '金毛', enName: 'Golden Retriever', icon: '🦮', desc: '温顺友善，天生的疗愈者', modifiers: { TF: -0.5, EI: 0.3 } },
  { id: 'labrador', name: '拉布拉多', enName: 'Labrador', icon: '🐕‍🦺', desc: '憨厚忠诚，贪吃且热情', modifiers: { EI: 0.4, TF: -0.3 } },
  { id: 'border', name: '边牧', enName: 'Border Collie', icon: '🐼', desc: '智商担当，极具观察力', modifiers: { SN: -0.5, JP: 0.5 } },
  { id: 'poodle', name: '贵宾/泰迪', enName: 'Poodle', icon: '🐩', desc: '聪明机灵，擅长察言观色', modifiers: { SN: -0.3, TF: -0.2 } },
  { id: 'shiba', name: '柴犬', enName: 'Shiba Inu', icon: '🐕', desc: '独立固执，有自己的想法', modifiers: { EI: -0.4, JP: 0.3 } },
  { id: 'frenchie', name: '法斗', enName: 'French Bulldog', icon: '🐷', desc: '安静随和，偶尔的小顽皮', modifiers: { EI: -0.3, SN: 0.2 } },
  { id: 'corgi', name: '柯基', enName: 'Corgi', icon: '🍞', desc: '性格开朗，倔强的小短腿', modifiers: { EI: 0.3, JP: 0.2 } },
  { id: 'husky', name: '哈士奇', enName: 'Husky', icon: '🐺', desc: '精力旺盛，脑回路清奇', modifiers: { EI: 0.5, JP: -0.5 } },
  { id: 'chihuahua', name: '吉娃娃', enName: 'Chihuahua', icon: '🌮', desc: '机警勇敢，占有欲强', modifiers: { EI: -0.2, TF: 0.4 } },
  { id: 'other_dog', name: '其他/不确定', enName: 'Other Dog', icon: '🐾', desc: '独特的灵魂，不被定义', modifiers: {} },
];

export const CAT_BREED_DATA: BreedInfo[] = [
  { id: 'british_shorthair', name: '英短', enName: 'British Shorthair', icon: '🐱', desc: '安静稳重，适应力强', modifiers: { EI: -0.3, JP: 0.3 } },
  { id: 'american_shorthair', name: '美短', enName: 'American Shorthair', icon: '🐈', desc: '活泼友善，体格强健', modifiers: { EI: 0.3, SN: 0.2 } },
  { id: 'ragdoll', name: '布偶', enName: 'Ragdoll', icon: '🧸', desc: '温顺粘人，天生的伴侣', modifiers: { TF: -0.5, EI: 0.4 } },
  { id: 'maine_coon', name: '缅因', enName: 'Maine Coon', icon: '🦁', desc: '体型巨大，性格温柔', modifiers: { EI: 0.2, TF: -0.2 } },
  { id: 'siamese', name: '暹罗', enName: 'Siamese', icon: '🗣️', desc: '话痨粘人，感情丰富', modifiers: { EI: 0.5, TF: -0.3 } },
  { id: 'persian', name: '波斯', enName: 'Persian', icon: '👑', desc: '高贵安静，需要细心呵护', modifiers: { EI: -0.5, JP: 0.2 } },
  { id: 'russian_blue', name: '俄罗斯蓝猫', enName: 'Russian Blue', icon: '💎', desc: '文静害羞，对主人忠诚', modifiers: { EI: -0.4, SN: -0.2 } },
  { id: 'norwegian_forest', name: '挪威森林猫', enName: 'Norwegian Forest', icon: '🌲', desc: '勇敢独立，喜欢攀爬', modifiers: { SN: 0.4, JP: -0.2 } },
  { id: 'scottish_fold', name: '苏格兰折耳', enName: 'Scottish Fold', icon: '👂', desc: '性格温和，长相甜美', modifiers: { TF: -0.3, EI: -0.1 } },
  { id: 'bombay', name: '孟买猫', enName: 'Bombay', icon: '🐈‍⬛', desc: '活泼好动，像个小黑豹', modifiers: { EI: 0.4, SN: 0.3 } },
  { id: 'orange', name: '橘猫', enName: 'Orange Tabby', icon: '🍊', desc: '开朗贪吃，心宽体胖', modifiers: { EI: 0.3, TF: -0.2 } },
  { id: 'other_cat', name: '其他/不确定', enName: 'Other Cat', icon: '🐾', desc: '神秘莫测，不被定义', modifiers: {} },
];

export const GENDER_LABELS: Record<string, Record<string, string>> = {
  male: {
    E: "阳光大哥型",
    I: "冷静绅士型",
    S: "务实硬汉型",
    N: "睿智谋士型",
    T: "理性直男型",
    F: "温柔暖男型",
    J: "严谨管家型",
    P: "随性浪子型"
  },
  female: {
    E: "元气少女型",
    I: "高冷女神型",
    S: "干练御姐型",
    N: "灵动才女型",
    T: "酷飒大女主型",
    F: "甜美小公举型",
    J: "精致名媛型",
    P: "自由精灵型"
  },
  neutral: {
    E: "社交达人型",
    I: "静谧思考型",
    S: "稳健派型",
    N: "创意家型",
    T: "逻辑控型",
    F: "情感系型",
    J: "规划者型",
    P: "探索者型"
  }
};

export interface MBTIType {
  code: string;
  name: string;
  title: string;
  summary: string;
  description: string;
  pros: string[];
  cons: string[];
  toy: string;
  ownerType: string;
  loveStyle: string;
  avatarStyle: string;
  color: string;
  elementModifier: string; // Used for fusion title
}

export interface ZodiacInfo {
  name: string;
  trait: string;
  element: string;
  luckyColor: string;
  modifier: string;
}

export const ZODIAC_DATA: Record<string, ZodiacInfo> = {
  "白羊座": { name: "白羊座", trait: "热情冲锋，永动机", element: "火", luckyColor: "正红色", modifier: "烈焰" },
  "金牛座": { name: "金牛座", trait: "固执吃货，稳如山", element: "土", luckyColor: "金黄色", modifier: "厚土" },
  "双子座": { name: "双子座", trait: "精分戏精，社交王", element: "风", luckyColor: "明黄色", modifier: "灵动" },
  "巨蟹座": { name: "巨蟹座", trait: "敏感宅宅，爱贴贴", element: "水", luckyColor: "银白色", modifier: "柔水" },
  "狮子座": { name: "狮子座", trait: "霸道总裁，求关注", element: "火", luckyColor: "亮金色", modifier: "骄阳" },
  "处女座": { name: "处女座", trait: "洁癖细节，挑剔怪", element: "土", luckyColor: "浅灰色", modifier: "清冷" },
  "天秤座": { name: "天秤座", trait: "优雅纠结，和平鸽", element: "风", luckyColor: "粉蓝色", modifier: "和风" },
  "天蝎座": { name: "天蝎座", trait: "腹黑深情，占有欲", element: "水", luckyColor: "深紫色", modifier: "幽冥" },
  "射手座": { name: "射手座", trait: "放飞自我，浪里个浪", element: "火", luckyColor: "橘红色", modifier: "疾风" },
  "摩羯座": { name: "摩羯座", trait: "高冷卷王，事业心", element: "土", luckyColor: "深棕色", modifier: "磐石" },
  "水瓶座": { name: "水瓶座", trait: "外星来客，脑回路奇特", element: "风", luckyColor: "天蓝色", modifier: "星辰" },
  "双鱼座": { name: "双鱼座", trait: "浪漫幻想，爱哭包", element: "水", luckyColor: "海绿色", modifier: "幻梦" }
};

export const WU_XING_DATA: Record<string, { name: string, desc: string }> = {
  "木": { name: "木元素", desc: "生机勃勃，具有极强的生命力与成长性。" },
  "火": { name: "火元素", desc: "热情奔放，是家庭中绝对的能量中心。" },
  "土": { name: "土元素", desc: "厚德载物，性格沉稳，是值得信赖的伙伴。" },
  "金": { name: "金元素", desc: "刚毅果断，具有极强的领地意识与原则感。" },
  "水": { name: "水元素", desc: "温柔细腻，情感丰富，能感知主人的细微情绪。" }
};

export const PAST_LIFE_DATA = [
  "御膳房试毒官", "失散多年的贵族之后", "巡山的大王", "江南第一深情", "仗剑走天涯的侠客", 
  "被贬凡间的星君", "深山里的守林人", "马戏团的王牌演员", "地主家的傻儿子", "隐居的世外高人",
  "紫禁城的御猫", "威风凛凛的将军战马", "神庙里的守护神兽", "远洋货轮的捕鼠官", "诗人笔下的灵感缪斯",
  "古埃及祭司的宠儿", "丝绸之路上的领路驼", "昆仑山上的雪山精灵", "深海人鱼的座驾", "月宫里的捣药兔"
];

export const FORTUNE_DATA = [
  { yi: "拆家", ji: "洗澡" },
  { yi: "贴贴", ji: "出门" },
  { yi: "加餐", ji: "运动" },
  { yi: "睡觉", ji: "思考" },
  { yi: "社交", ji: "独处" },
  { yi: "卖萌", ji: "剪指甲" },
  { yi: "巡视领地", ji: "穿衣服" },
  { yi: "拆快递", ji: "听雷声" },
  { yi: "钻纸箱", ji: "照镜子" },
  { yi: "发呆", ji: "被摸肚皮" },
  { yi: "跳高", ji: "进航空箱" },
  { yi: "埋屎", ji: "看医生" }
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "当家里来了陌生客人时，你的宠物通常会？",
    options: [
      { text: "第一时间冲过去摇尾巴/蹭腿欢迎", dimension: 'EI', value: 2 },
      { text: "躲在远处观察，确认安全后再靠近", dimension: 'EI', value: -2 },
      { text: "礼貌性地看一眼，然后继续做自己的事", dimension: 'EI', value: -1 },
      { text: "完全看心情，有时候热情有时候冷漠", dimension: 'EI', value: 0 },
    ]
  },
  {
    id: 2,
    text: "面对新买的玩具，它的第一反应是？",
    options: [
      { text: "立刻开玩，甚至想拆开看看结构", dimension: 'SN', value: 2 },
      { text: "先闻个遍，研究半天气味和质地", dimension: 'SN', value: -2 },
      { text: "先看看你的反应，你让玩才玩", dimension: 'SN', value: -1 },
      { text: "先叼到自己的秘密基地藏起来", dimension: 'SN', value: 1 },
    ]
  },
  {
    id: 3,
    text: "如果你假装哭泣，它会？",
    options: [
      { text: "立刻跑过来舔你，试图安慰你", dimension: 'TF', value: -2 },
      { text: "歪头看着你，仿佛在思考你又在演哪出", dimension: 'TF', value: 2 },
      { text: "把它的玩具叼给你，想让你开心", dimension: 'TF', value: -1 },
      { text: "默默走开，给你留出安静的空间", dimension: 'TF', value: 1 },
    ]
  },
  {
    id: 4,
    text: "每天的散步或喂食时间到了，它会？",
    options: [
      { text: "准时守在碗边或门口，一秒都不差", dimension: 'JP', value: 2 },
      { text: "随缘，想起来才去提醒你", dimension: 'JP', value: -2 },
      { text: "如果你忘了，它会用委婉的方式提醒", dimension: 'JP', value: 1 },
      { text: "它似乎完全没有时间概念", dimension: 'JP', value: -1 },
    ]
  },
  {
    id: 5,
    text: "在宠物公园遇到一群小伙伴，它会？",
    options: [
      { text: "社交天花板，迅速加入大部队", dimension: 'EI', value: 2 },
      { text: "社交恐惧症，只愿意待在你脚边", dimension: 'EI', value: -2 },
      { text: "只找自己熟悉的几个玩伴", dimension: 'EI', value: -1 },
      { text: "在旁边观察，偶尔参与一下", dimension: 'EI', value: 1 },
    ]
  },
  {
    id: 6,
    text: "它最喜欢的零食掉进了够不到的缝隙里？",
    options: [
      { text: "疯狂用爪子刨，直到弄出来为止", dimension: 'SN', value: 2 },
      { text: "盯着缝隙思考，试图从另一个角度观察", dimension: 'SN', value: -2 },
      { text: "立刻跑来找你求助，眼神充满渴望", dimension: 'SN', value: -1 },
      { text: "尝试几次不行就放弃了，去吃别的", dimension: 'SN', value: 1 },
    ]
  },
  {
    id: 7,
    text: "当你因为它犯错而大声责备它时？",
    options: [
      { text: "一脸委屈，立刻低头认错求原谅", dimension: 'TF', value: -2 },
      { text: "眼神躲闪，甚至试图跟你讲道理（叫唤）", dimension: 'TF', value: 2 },
      { text: "装作没听见，继续做自己的事", dimension: 'TF', value: 1 },
      { text: "反过来安慰你，让你别生气了", dimension: 'TF', value: -1 },
    ]
  },
  {
    id: 8,
    text: "睡觉的地方，它更倾向于？",
    options: [
      { text: "永远睡在同一个窝里，姿势都差不多", dimension: 'JP', value: 2 },
      { text: "家里任何地方都是床，姿势极其放飞", dimension: 'JP', value: -2 },
      { text: "喜欢睡在你的衣服上或者你身边", dimension: 'JP', value: -1 },
      { text: "每天都要换一个新地方探索", dimension: 'JP', value: 1 },
    ]
  },
  {
    id: 9,
    text: "带它去一个全新的环境，它会？",
    options: [
      { text: "兴奋地到处探险，毫无压力", dimension: 'EI', value: 2 },
      { text: "紧贴着你，需要很长时间才能放松", dimension: 'EI', value: -2 },
      { text: "先找个安全的地方躲起来观察", dimension: 'EI', value: -1 },
      { text: "表现得很淡定，仿佛在哪都一样", dimension: 'EI', value: 1 },
    ]
  },
  {
    id: 10,
    text: "它对“指令”的理解程度是？",
    options: [
      { text: "你说什么它做什么，非常务实", dimension: 'SN', value: 2 },
      { text: "它总有自己的想法，甚至会预判你", dimension: 'SN', value: -2 },
      { text: "看在零食的面子上才勉强配合", dimension: 'SN', value: 1 },
      { text: "它似乎听不懂，但它很爱你", dimension: 'SN', value: -1 },
    ]
  },
  {
    id: 11,
    text: "家里其他宠物（如果有）不开心了？",
    options: [
      { text: "主动去贴贴，分享自己的玩具", dimension: 'TF', value: -2 },
      { text: "保持距离，静静观察局势发展", dimension: 'TF', value: 2 },
      { text: "趁机抢走对方的零食或地盘", dimension: 'TF', value: 1 },
      { text: "表现得很困惑，不知道发生了什么", dimension: 'TF', value: -1 },
    ]
  },
  {
    id: 12,
    text: "出门前的准备工作，它的表现是？",
    options: [
      { text: "看到你拿钥匙就开始兴奋，知道要出发了", dimension: 'JP', value: 2 },
      { text: "直到你叫它，它才反应过来要出门", dimension: 'JP', value: -2 },
      { text: "如果你没带它，它会表现得很失落", dimension: 'JP', value: 1 },
      { text: "它似乎对出门这件事无感", dimension: 'JP', value: -1 },
    ]
  },
  {
    id: 13,
    text: "它在独处时的状态通常是？",
    options: [
      { text: "拆家、找乐子，一刻也停不下来", dimension: 'EI', value: 2 },
      { text: "安静地睡觉或发呆，享受孤独", dimension: 'EI', value: -2 },
      { text: "守在门口等你回来", dimension: 'EI', value: -1 },
      { text: "在家里巡逻，确保领地安全", dimension: 'EI', value: 1 },
    ]
  },
  {
    id: 14,
    text: "它对新食物的接受度？",
    options: [
      { text: "只要是吃的，立刻吞下去", dimension: 'SN', value: 2 },
      { text: "先闻闻，舔舔，确认没毒再吃", dimension: 'SN', value: -2 },
      { text: "看你吃得香它才愿意尝试", dimension: 'SN', value: -1 },
      { text: "非常挑食，只吃固定的几种", dimension: 'SN', value: 1 },
    ]
  },
  {
    id: 15,
    text: "当你表现出极度兴奋时，它会？",
    options: [
      { text: "跟着你一起疯跑乱跳", dimension: 'TF', value: -2 },
      { text: "冷静地看着你，觉得你可能疯了", dimension: 'TF', value: 2 },
      { text: "试图让你冷静下来（比如按住你）", dimension: 'TF', value: 1 },
      { text: "被你的情绪吓到，躲进角落", dimension: 'TF', value: -1 },
    ]
  },
  {
    id: 16,
    text: "它的玩具箱通常是？",
    options: [
      { text: "整齐地堆在一起（或者它知道都在哪）", dimension: 'JP', value: 2 },
      { text: "散落全家各处，甚至在沙发底下", dimension: 'JP', value: -2 },
      { text: "它只玩最心爱的那一个，其他的不管", dimension: 'JP', value: 1 },
      { text: "它似乎更喜欢玩塑料袋或纸箱", dimension: 'JP', value: -1 },
    ]
  },
  {
    id: 17,
    text: "在电视上看到别的动物，它会？",
    options: [
      { text: "冲到电视机前试图互动或叫唤", dimension: 'EI', value: 2 },
      { text: "歪头看一眼，然后继续做自己的事", dimension: 'EI', value: -2 },
      { text: "试图绕到电视后面找那个动物", dimension: 'EI', value: 1 },
      { text: "完全没发现电视里有东西", dimension: 'EI', value: -1 },
    ]
  },
  {
    id: 18,
    text: "它学习新技能（如握手）的速度？",
    options: [
      { text: "为了零食，可以重复练习一百遍", dimension: 'SN', value: 2 },
      { text: "很快就能领悟逻辑，但看心情做不做", dimension: 'SN', value: -2 },
      { text: "它似乎觉得这些技能很无聊", dimension: 'SN', value: 1 },
      { text: "它更喜欢自创一些奇怪的动作", dimension: 'SN', value: -1 },
    ]
  },
  {
    id: 19,
    text: "如果你长时间不理它，它会？",
    options: [
      { text: "各种撒娇卖萌，非要你关注不可", dimension: 'TF', value: -2 },
      { text: "自己找个角落待着，不强求", dimension: 'TF', value: 2 },
      { text: "故意做一些坏事来吸引你的注意", dimension: 'TF', value: 1 },
      { text: "它似乎比你还享受这种清静", dimension: 'TF', value: -1 },
    ]
  },
  {
    id: 20,
    text: "它的作息时间？",
    options: [
      { text: "像闹钟一样精准", dimension: 'JP', value: 2 },
      { text: "完全看心情，黑白颠倒也是常事", dimension: 'JP', value: -2 },
      { text: "跟着你的作息走，你起它起", dimension: 'JP', value: 1 },
      { text: "它似乎永远都在睡觉", dimension: 'JP', value: -1 },
    ]
  },
  {
    id: 21,
    text: "去宠物店洗澡，它的表现是？",
    options: [
      { text: "跟美容师打成一片，甚至不想回家", dimension: 'EI', value: 2 },
      { text: "瑟瑟发抖，全程只想快点逃离", dimension: 'EI', value: -2 },
      { text: "表现得很乖，但眼神充满幽怨", dimension: 'EI', value: -1 },
      { text: "只要有零食，在哪洗都行", dimension: 'EI', value: 1 },
    ]
  },
  {
    id: 22,
    text: "它对镜子里的自己？",
    options: [
      { text: "试图攻击或跟对方玩耍", dimension: 'SN', value: 2 },
      { text: "看一眼就走，知道那是虚像", dimension: 'SN', value: -2 },
      { text: "对着镜子臭美，摆各种姿势", dimension: 'SN', value: 1 },
      { text: "它似乎看不见镜子里的东西", dimension: 'SN', value: -1 },
    ]
  },
  {
    id: 23,
    text: "你生病卧床时，它会？",
    options: [
      { text: "寸步不离守着你，甚至不吃饭", dimension: 'TF', value: -2 },
      { text: "偶尔来看看你，确认你还活着", dimension: 'TF', value: 2 },
      { text: "试图把它的零食分给你吃", dimension: 'TF', value: -1 },
      { text: "它似乎觉得你只是在偷懒不带它玩", dimension: 'TF', value: 1 },
    ]
  },
  {
    id: 24,
    text: "它的零食储藏室被打开时？",
    options: [
      { text: "立刻到位，准备执行讨食流程", dimension: 'JP', value: 2 },
      { text: "如果刚好在忙别的，可能晚点才来", dimension: 'JP', value: -2 },
      { text: "它会试图自己去打开那个柜子", dimension: 'JP', value: 1 },
      { text: "它对零食似乎没有那么大的执念", dimension: 'JP', value: -1 },
    ]
  },
  {
    id: 25,
    text: "当你在电话里大声说话时，它会？",
    options: [
      { text: "以为你在跟它说话，兴奋地回应", dimension: 'EI', value: 2 },
      { text: "默默走开，觉得你太吵了", dimension: 'EI', value: -2 },
      { text: "好奇地盯着手机，想看谁在里面", dimension: 'EI', value: 1 },
      { text: "完全无视你的存在", dimension: 'EI', value: -1 },
    ]
  },
  {
    id: 26,
    text: "它对家里新添置的家具（如扫地机）？",
    options: [
      { text: "勇敢挑战，试图征服这个新成员", dimension: 'SN', value: 2 },
      { text: "保持警惕，观察很久才敢靠近", dimension: 'SN', value: -2 },
      { text: "把它当成新的坐骑或者玩具", dimension: 'SN', value: 1 },
      { text: "被吓得魂飞魄散，从此绕着走", dimension: 'SN', value: -1 },
    ]
  },
  {
    id: 27,
    text: "当你和其他宠物玩耍而忽略它时？",
    options: [
      { text: "立刻挤进中间，强行索要关注", dimension: 'TF', value: -2 },
      { text: "在一旁冷眼旁观，记在心里", dimension: 'TF', value: 2 },
      { text: "默默走开，表现得很落寞", dimension: 'TF', value: -1 },
      { text: "它似乎并不介意，自己玩去了", dimension: 'TF', value: 1 },
    ]
  },
  {
    id: 28,
    text: "它的玩具被弄坏了，它会？",
    options: [
      { text: "守着残骸伤心很久", dimension: 'JP', value: 2 },
      { text: "立刻寻找下一个替代品", dimension: 'JP', value: -2 },
      { text: "试图让你帮它修好", dimension: 'JP', value: 1 },
      { text: "它似乎更喜欢坏掉的那个", dimension: 'JP', value: -1 },
    ]
  },
  {
    id: 29,
    text: "在户外遇到下雨，它的反应是？",
    options: [
      { text: "不管不顾，继续疯跑", dimension: 'EI', value: 2 },
      { text: "立刻找地方躲雨，拒绝走路", dimension: 'EI', value: -2 },
      { text: "一脸嫌弃地甩干身上的水", dimension: 'EI', value: 1 },
      { text: "觉得下雨很好玩，试图接雨水", dimension: 'EI', value: -1 },
    ]
  },
  {
    id: 30,
    text: "它对“镜子”里的激光红点？",
    options: [
      { text: "疯狂追逐，不抓到不罢休", dimension: 'SN', value: 2 },
      { text: "看一眼你的手，知道是你干的", dimension: 'SN', value: -2 },
      { text: "追两下就累了，躺下休息", dimension: 'SN', value: 1 },
      { text: "完全看不见那个红点", dimension: 'SN', value: -1 },
    ]
  },
  {
    id: 31,
    text: "当你准备出门旅行收拾行李时？",
    options: [
      { text: "跳进箱子里，想让你带它走", dimension: 'TF', value: -2 },
      { text: "在一旁静静看着，眼神充满忧郁", dimension: 'TF', value: 2 },
      { text: "故意弄乱你的衣服表示抗议", dimension: 'TF', value: 1 },
      { text: "它似乎还没意识到你要走", dimension: 'TF', value: -1 },
    ]
  },
  {
    id: 32,
    text: "它的零食被藏在复杂的机关里？",
    options: [
      { text: "暴力拆解，直接暴力破解", dimension: 'JP', value: 2 },
      { text: "耐心研究，寻找逻辑漏洞", dimension: 'JP', value: -2 },
      { text: "尝试一下不行就找你帮忙", dimension: 'JP', value: 1 },
      { text: "它似乎对这种游戏没兴趣", dimension: 'JP', value: -1 },
    ]
  }
];

export const MBTI_TYPES: Record<string, MBTIType> = {
  "ESTJ": {
    code: "ESTJ",
    name: "秩序指挥官",
    title: "奶油社交家",
    summary: "家里的规矩，它说了算。",
    description: "它是天生的领导者，对家里的作息有着严格的要求。如果晚了五分钟喂饭，它会用眼神或叫声严厉提醒你。它非常务实，只对看得见摸得着的零食感兴趣。",
    pros: ["极度自律", "执行力强", "守护家庭"],
    cons: ["固执己见", "缺乏耐心"],
    toy: "自动投食器（它喜欢掌控感）",
    ownerType: "同样自律的职场精英",
    loveStyle: "霸道总裁式贴贴",
    avatarStyle: "戴着金丝眼镜的英短或德牧",
    color: "#FF6B6B",
    elementModifier: "铁血"
  },
  "ISTJ": {
    code: "ISTJ",
    name: "沉稳老干部",
    title: "家庭守护者",
    summary: "沉默寡言，但永远是你最可靠的后盾。",
    description: "它不喜欢花里胡哨的社交，更喜欢待在自己熟悉的角落。它对主人的忠诚是刻在骨子里的，虽然不常撒娇，但它总是在你回家时第一个出现在门口。",
    pros: ["情绪稳定", "忠诚可靠", "生活规律"],
    cons: ["不擅表达", "拒绝改变"],
    toy: "耐咬的实心球",
    ownerType: "喜欢安静生活的独居青年",
    loveStyle: "默默陪伴的深情派",
    avatarStyle: "穿着中山装的柴犬",
    color: "#4D96FF",
    elementModifier: "磐石"
  },
  "ENFP": {
    code: "ENFP",
    name: "快乐小太阳",
    title: "派对灵魂",
    summary: "只要有它在，家里永远充满欢笑。",
    description: "它是天生的乐天派，对世界充满了好奇心。它能跟任何生物成为朋友，哪怕是一只苍蝇。它思维跳跃，经常做出一些让你哭笑不得的迷惑行为。",
    pros: ["充满活力", "极具创意", "治愈系高手"],
    cons: ["注意力涣散", "容易拆家"],
    toy: "彩色羽毛棒或尖叫鸡",
    ownerType: "充满好奇心的创意工作者",
    loveStyle: "热烈如火的粘人精",
    avatarStyle: "戴着花环的金毛或布偶",
    color: "#FFD93D",
    elementModifier: "极光"
  },
  "INFP": {
    code: "INFP",
    name: "忧郁小诗人",
    title: "治愈系精灵",
    summary: "它能读懂你所有的情绪，哪怕你一言不发。",
    description: "它有着极其细腻的内心世界，经常对着窗外发呆，仿佛在思考猫生/狗生。它非常敏感，如果你不开心，它会静静地靠在你身边，用体温温暖你。",
    pros: ["同理心极强", "温柔安静", "极具灵性"],
    cons: ["玻璃心", "容易受惊"],
    toy: "柔软的毛绒公仔",
    ownerType: "内心柔软的文艺青年",
    loveStyle: "柏拉图式的灵魂伴侣",
    avatarStyle: "戴着贝雷帽的折耳猫",
    color: "#6BCB77",
    elementModifier: "幻梦"
  },
  "ENTP": {
    code: "ENTP",
    name: "拆家发明家",
    title: "逻辑鬼才",
    summary: "没有它拆不了的家，只有它不想拆的锁。",
    description: "它极其聪明，甚至会观察你开门的动作并偷偷学会。它喜欢挑战权威，你越不让它做的事，它越要做。它对新奇事物有着近乎疯狂的执着。",
    pros: ["智商极高", "勇敢无畏", "极具幽默感"],
    cons: ["破坏力惊人", "不服管教"],
    toy: "高难度漏食球",
    ownerType: "喜欢挑战的极客玩家",
    loveStyle: "相爱相杀的损友派",
    avatarStyle: "戴着护目镜的哈士奇",
    color: "#9772FB",
    elementModifier: "雷霆"
  },
  "INTJ": {
    code: "INTJ",
    name: "冷酷大军师",
    title: "幕后黑手",
    summary: "它看你的眼神，仿佛在看一个愚蠢的人类。",
    description: "它有着极强的逻辑和预判能力。它不需要你的过度关注，甚至觉得你的撒娇很幼稚。它只在它认为需要的时候才会对你展现温柔。",
    pros: ["独立自主", "洞察力强", "极具个性"],
    cons: ["孤傲冷漠", "难以亲近"],
    toy: "激光笔（它喜欢追逐虚幻的逻辑）",
    ownerType: "高冷的科研人员或程序员",
    loveStyle: "高冷克制的精英派",
    avatarStyle: "穿着西装的黑猫",
    color: "#2C3333",
    elementModifier: "幽冥"
  },
  "ESFP": {
    code: "ESFP",
    name: "聚光灯宠儿",
    title: "时尚弄潮儿",
    summary: "它就是为镜头而生的，天生的网红胚子。",
    description: "它非常享受被关注的感觉，只要你拿起手机，它就会自动摆好姿势。它喜欢热闹，哪里人多往哪钻。它的生活哲学就是：及时行乐，零食管够。",
    pros: ["表现力强", "乐观开朗", "适应力极佳"],
    cons: ["虚荣心强", "三分钟热度"],
    toy: "会发光的弹力球",
    ownerType: "爱分享生活的博主",
    loveStyle: "全城热恋的浮夸派",
    avatarStyle: "戴着墨镜的法斗",
    color: "#FF8E9E",
    elementModifier: "霓虹"
  },
  "ISFP": {
    code: "ISFP",
    name: "流浪艺术家",
    title: "自由灵魂",
    summary: "它不属于任何人，它只属于它自己。",
    description: "它对美有着独特的感知，喜欢在阳光最好的地方睡觉。它不喜欢冲突，如果家里气氛紧张，它会默默躲开。它有着一种超凡脱俗的淡然气质。",
    pros: ["审美极佳", "温柔随和", "不争不抢"],
    cons: ["难以捉摸", "缺乏目标"],
    toy: "带有天然草本气味的抱枕",
    ownerType: "自由职业者或插画师",
    loveStyle: "若即若离的朦胧派",
    avatarStyle: "戴着草帽的田园猫",
    color: "#B4E197",
    elementModifier: "微风"
  },
  "ENTJ": {
    code: "ENTJ",
    name: "铁腕统治者",
    title: "家族领袖",
    summary: "这个家，必须按照它的意志运转。",
    description: "它有着极强的领地意识和统治欲。它会监督你的一举一动，甚至会试图纠正你的错误行为。它非常自信，从不怀疑自己的决定。",
    pros: ["领导力爆棚", "果断勇敢", "气场强大"],
    cons: ["控制欲强", "过于强势"],
    toy: "大型互动式拉力绳",
    ownerType: "有决断力的企业高管",
    loveStyle: "绝对占有的霸道派",
    avatarStyle: "披着斗篷的杜宾",
    color: "#820000",
    elementModifier: "烈火"
  },
  "INFJ": {
    code: "INFJ",
    name: "神秘预言家",
    title: "灵魂导师",
    summary: "它似乎能看透你的前世今生。",
    description: "它有着一种超乎寻常的静谧感。它不经常叫唤，但每次发声都仿佛在传达某种深意。它对主人的情感连接非常深，甚至能感应到你的身体不适。",
    pros: ["直觉敏锐", "深情内敛", "极具智慧"],
    cons: ["过于敏感", "难以理解"],
    toy: "复杂的迷宫玩具",
    ownerType: "追求精神世界的哲学家",
    loveStyle: "一眼万年的宿命派",
    avatarStyle: "戴着围巾的萨摩耶",
    color: "#4E6C50",
    elementModifier: "星灵"
  },
  "ESTP": {
    code: "ESTP",
    name: "极限运动员",
    title: "冒险王",
    summary: "生命在于运动，拆家在于速度。",
    description: "它一刻也停不下来，不是在跑就是在跳。它喜欢刺激，敢于挑战任何高度。它非常聪明，但这种聪明都用在了如何逃跑和寻找乐子上。",
    pros: ["身体素质极佳", "反应敏捷", "充满激情"],
    cons: ["鲁莽冲动", "容易受伤"],
    toy: "飞盘或高速移动的电子老鼠",
    ownerType: "热爱运动的健身达人",
    loveStyle: "速度与激情的狂野派",
    avatarStyle: "戴着运动头带的边牧",
    color: "#F99417",
    elementModifier: "疾风"
  },
  "ISTP": {
    code: "ISTP",
    name: "冷酷修理工",
    title: "独行侠",
    summary: "别管我，我只想研究这颗螺丝钉。",
    description: "它对机械和工具非常感兴趣，经常盯着运转的洗衣机或扫地机器人看个不停。它非常冷静，遇到突发状况也能保持镇定。它不喜欢被打扰。",
    pros: ["动手能力强", "冷静理智", "独立性强"],
    cons: ["情感淡漠", "难以沟通"],
    toy: "可以拆解的益智积木",
    ownerType: "喜欢动手的DIY爱好者",
    loveStyle: "实用主义的硬核派",
    avatarStyle: "戴着扳手的柯基",
    color: "#393E46",
    elementModifier: "寒铁"
  },
  "ENFJ": {
    code: "ENFJ",
    name: "暖心大哥哥",
    title: "社交达人",
    summary: "它的使命就是让每个人都开心。",
    description: "它是家里的和事佬，如果有人吵架，它会主动过去劝架。它非常热衷于照顾别人，不管是小主人还是其他小动物。它是最受邻居欢迎的宠物。",
    pros: ["极具亲和力", "乐于助人", "责任感强"],
    cons: ["过度操心", "容易焦虑"],
    toy: "可以多人互动的拔河玩具",
    ownerType: "热衷公益的社区志愿者",
    loveStyle: "无微不至的暖男派",
    avatarStyle: "戴着领结的拉布拉多",
    color: "#F7C8E0",
    elementModifier: "圣光"
  },
  "ISFJ": {
    code: "ISFJ",
    name: "温柔小护士",
    title: "贴心小棉袄",
    summary: "只要你需要，它永远都在。",
    description: "它非常细心，能注意到你最微小的情绪变化。它不喜欢出风头，更愿意默默地为你服务。它对家庭环境非常依赖，喜欢温馨稳定的氛围。",
    pros: ["体贴入微", "耐心十足", "忠诚度极高"],
    cons: ["过于保守", "不善拒绝"],
    toy: "带有心跳声的安抚玩偶",
    ownerType: "温柔细心的家庭主妇/主夫",
    loveStyle: "细水长流的陪伴派",
    avatarStyle: "戴着护士帽的加菲猫",
    color: "#DBC4F0",
    elementModifier: "晨曦"
  },
  "ESFJ": {
    code: "ESFJ",
    name: "热心大管家",
    title: "居委会主任",
    summary: "家里的每一粒灰尘，都在它的掌控之下。",
    description: "它非常热衷于参与家庭事务，不管是你做饭还是打扫卫生，它都要插一脚。它非常看重传统和规矩，喜欢固定的社交圈子。",
    pros: ["组织能力强", "热情大方", "极具责任感"],
    cons: ["爱管闲事", "依赖性强"],
    toy: "成套的宠物餐具或清洁刷",
    ownerType: "喜欢热闹的大家庭成员",
    loveStyle: "全心全意的奉献派",
    avatarStyle: "戴着围裙的博美",
    color: "#A0E4CB",
    elementModifier: "暖阳"
  },
  "INTP": {
    code: "INTP",
    name: "逻辑思想家",
    title: "科学怪猫/狗",
    summary: "它在想什么？可能在想宇宙的起源。",
    description: "它经常陷入沉思，对周围的事物表现出一种超然的冷淡。它喜欢钻研复杂的逻辑，比如如何从封闭的笼子里逃脱。它不需要太多的社交，大脑就是它的游乐场。",
    pros: ["逻辑严密", "极具创意", "独立思考"],
    cons: ["不修边幅", "难以捉摸"],
    toy: "复杂的机关盒",
    ownerType: "深居简出的学者或作家",
    loveStyle: "脑回路清奇的极客派",
    avatarStyle: "戴着博士帽的暹罗猫",
    color: "#7F8487",
    elementModifier: "极智"
  }
};
