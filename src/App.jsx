
import React, { useState, useEffect } from "react";

// N2 Somatome Kanji Data with Myanmar translations
const kanjiData = {
  "Week 1": {
    "Day 1": {
      topic: "立て札。注意書き - ဆိုင်းဘုတ်နှင့် သတိပေးစာများ",
      cards: [
        { kanji: "禁止", reading: "きんし", meaning: "prohibition", myanmar: "တားမြစ်ခြင်း" },
        { kanji: "禁煙", reading: "きんえん", meaning: "no smoking", myanmar: "ဆေးလိပ်သောက်ခြင်းမပြုရ" },
        { kanji: "煙", reading: "けむり", meaning: "smoke", myanmar: "မီးခိုး" },
        { kanji: "安静", reading: "あんせい", meaning: "quietly", myanmar: "တိတ်ဆိတ်စွာ" },
        { kanji: "静か", reading: "しずか", meaning: "quiet", myanmar: "တိတ်ဆိတ်သော" },
        { kanji: "静まる", reading: "しずまる", meaning: "become quiet", myanmar: "တိတ်ဆိတ်သွားသည်" },
        { kanji: "危機", reading: "きき", meaning: "a crisis", myanmar: "အကျပ်အတည်း" },
        { kanji: "危ない", reading: "あぶない", meaning: "dangerous", myanmar: "အန္တရာယ်ရှိသော" },
        { kanji: "危うい", reading: "あやうい", meaning: "dangerous/narrow", myanmar: "အန္တရာယ်ရှိသော/ကျဉ်းမြောင်းသော" },
        { kanji: "危険", reading: "きけん", meaning: "danger", myanmar: "အန္တရာယ်" },
        { kanji: "険しい", reading: "けわしい", meaning: "steep", myanmar: "မတ်စောက်သော" },
        { kanji: "関心", reading: "かんしん", meaning: "an interest", myanmar: "စိတ်ဝင်စားမှု" },
        { kanji: "関する", reading: "かんする", meaning: "related to", myanmar: "ဆက်စပ်သည်" },
        { kanji: "関わる", reading: "かかわる", meaning: "have to do with", myanmar: "ပတ်သက်သည်" },
        { kanji: "関係", reading: "かんけい", meaning: "relation/connection", myanmar: "ဆက်ဆံရေး" },
        { kanji: "係", reading: "かかり", meaning: "person in charge", myanmar: "တာဝန်ခံ" },
        { kanji: "係員", reading: "かかりいん", meaning: "staff member", myanmar: "ဝန်ထမ်း" },
        { kanji: "転落", reading: "てんらく", meaning: "a fall", myanmar: "ပြုတ်ကျခြင်း" },
        { kanji: "落第", reading: "らくだい", meaning: "failing a course", myanmar: "စာမေးပွဲကျခြင်း" },
        { kanji: "落ちる", reading: "おちる", meaning: "to fall", myanmar: "ကျသည်" },
        { kanji: "落とす", reading: "おとす", meaning: "to drop", myanmar: "ချသည်" },
        { kanji: "落石", reading: "らくせき", meaning: "falling rocks", myanmar: "ကျောက်ကျခြင်း" },
        { kanji: "磁石", reading: "じしゃく", meaning: "magnet/compass", myanmar: "သံလိုက်" },
        { kanji: "石", reading: "いし", meaning: "stone", myanmar: "ကျောက်" },
        { kanji: "飛行場", reading: "ひこうじょう", meaning: "airport", myanmar: "လေဆိပ်" },
        { kanji: "飛ぶ", reading: "とぶ", meaning: "to fly", myanmar: "ပျံသည်" },
        { kanji: "飛び出す", reading: "とびだす", meaning: "run out suddenly", myanmar: "ရုတ်တရက်ထွက်ပြေးသည်" },
        { kanji: "駐車場", reading: "ちゅうしゃじょう", meaning: "parking lot", myanmar: "ကားပါကင်" },
        { kanji: "駐車", reading: "ちゅうしゃ", meaning: "parking", myanmar: "ကားရပ်ခြင်း" },
        { kanji: "捨てる", reading: "すてる", meaning: "throw away", myanmar: "စွန့်ပစ်သည်" },
        { kanji: "遊泳", reading: "ゆうえい", meaning: "swimming", myanmar: "ရေကူးခြင်း" },
        { kanji: "遊ぶ", reading: "あそぶ", meaning: "to play", myanmar: "ကစားသည်" },
        { kanji: "水泳", reading: "すいえい", meaning: "swimming", myanmar: "ရေကူးခြင်း" },
        { kanji: "泳ぐ", reading: "およぐ", meaning: "to swim", myanmar: "ရေကူးသည်" },
      ]
    },
    "Day 2": {
      topic: "建物の中でよく見る表示 - အဆောက်အအုံအတွင်း မကြာခဏတွေ့ရသော ဆိုင်းဘုတ်များ",
      cards: [
        { kanji: "喫茶店", reading: "きっさてん", meaning: "coffee shop", myanmar: "ကော်ဖီဆိုင်" },
        { kanji: "喫煙所", reading: "きつえんじょ", meaning: "smoking area", myanmar: "ဆေးလိပ်သောက်ခွင့်ပြုဧရိယာ" },
        { kanji: "非常口", reading: "ひじょうぐち", meaning: "emergency exit", myanmar: "အရေးပေါ်ထွက်ပေါက်" },
        { kanji: "非常に", reading: "ひじょうに", meaning: "extremely", myanmar: "အလွန်" },
        { kanji: "お手洗い", reading: "おてあらい", meaning: "toilet", myanmar: "အိမ်သာ" },
        { kanji: "日常", reading: "にちじょう", meaning: "everyday", myanmar: "နေ့စဉ်" },
        { kanji: "常識", reading: "じょうしき", meaning: "common sense", myanmar: "အထွေထွေဗဟုသုတ" },
        { kanji: "常に", reading: "つねに", meaning: "always", myanmar: "အမြဲတမ်း" },
        { kanji: "受験", reading: "じゅけん", meaning: "taking an exam", myanmar: "စာမေးပွဲဝင်ခြင်း" },
        { kanji: "受ける", reading: "うける", meaning: "to receive", myanmar: "လက်ခံသည်" },
        { kanji: "付近", reading: "ふきん", meaning: "vicinity", myanmar: "အနီးအနား" },
        { kanji: "受付", reading: "うけつけ", meaning: "reception", myanmar: "ဧည့်ကြိုကောင်တာ" },
        { kanji: "日付", reading: "ひづけ", meaning: "date", myanmar: "ရက်စွဲ" },
        { kanji: "案内", reading: "あんない", meaning: "information", myanmar: "သတင်းအချက်အလက်" },
        { kanji: "案", reading: "あん", meaning: "proposal/plan", myanmar: "အကြံပြုချက်" },
        { kanji: "以内", reading: "いない", meaning: "within", myanmar: "အတွင်း" },
        { kanji: "社内", reading: "しゃない", meaning: "within company", myanmar: "ကုမ္ပဏီအတွင်း" },
        { kanji: "内", reading: "うち", meaning: "inside", myanmar: "အတွင်း" },
        { kanji: "会議室", reading: "かいぎしつ", meaning: "meeting room", myanmar: "အစည်းအဝေးခန်း" },
        { kanji: "不思議", reading: "ふしぎ", meaning: "wonderful/strange", myanmar: "အံ့သြဖွယ်" },
        { kanji: "議論", reading: "ぎろん", meaning: "discussion", myanmar: "ဆွေးနွေးမှု" },
        { kanji: "議員", reading: "ぎいん", meaning: "assembly member", myanmar: "လွှတ်တော်အမတ်" },
        { kanji: "文化", reading: "ぶんか", meaning: "culture", myanmar: "ယဉ်ကျေးမှု" },
        { kanji: "科学", reading: "かがく", meaning: "science", myanmar: "သိပ္ပံ" },
        { kanji: "化粧室", reading: "けしょうしつ", meaning: "powder room", myanmar: "မိတ်ကပ်ခန်း" },
        { kanji: "階段", reading: "かいだん", meaning: "stairs", myanmar: "လှေကား" },
        { kanji: "階", reading: "かい", meaning: "floor", myanmar: "ထပ်" },
        { kanji: "段階", reading: "だんかい", meaning: "level/stage", myanmar: "အဆင့်" },
        { kanji: "手段", reading: "しゅだん", meaning: "means/way", myanmar: "နည်းလမ်း" },
        { kanji: "石段", reading: "いしだん", meaning: "stone steps", myanmar: "ကျောက်လှေကား" },
      ]
    },
    "Day 3": {
      topic: "建物の内外でよく見る表示 - အဆောက်အအုံအတွင်းအပြင် မကြာခဏတွေ့ရသော ဆိုင်းဘုတ်များ",
      cards: [
        { kanji: "営業", reading: "えいぎょう", meaning: "business", myanmar: "စီးပွားရေးလုပ်ငန်း" },
        { kanji: "放送", reading: "ほうそう", meaning: "broadcast", myanmar: "ထုတ်လွှင့်ခြင်း" },
        { kanji: "開放", reading: "かいほう", meaning: "opening", myanmar: "ဖွင့်လှစ်ခြင်း" },
        { kanji: "放す", reading: "はなす", meaning: "let go", myanmar: "လွှတ်ပေးသည်" },
        { kanji: "押す", reading: "おす", meaning: "push", myanmar: "တွန်းသည်" },
        { kanji: "押し入れ", reading: "おしいれ", meaning: "closet", myanmar: "ဗီဒိုခန်း" },
        { kanji: "押さえる", reading: "おさえる", meaning: "hold down", myanmar: "ဖိထားသည်" },
        { kanji: "準備", reading: "じゅんび", meaning: "preparation", myanmar: "ပြင်ဆင်ခြင်း" },
        { kanji: "水準", reading: "すいじゅん", meaning: "standard", myanmar: "စံနှုန်း" },
        { kanji: "準急", reading: "じゅんきゅう", meaning: "semi-express", myanmar: "တစ်ဝက်အမြန်ရထား" },
        { kanji: "準決勝", reading: "じゅんけっしょう", meaning: "semifinals", myanmar: "ဆီမီးဖိုင်နယ်" },
        { kanji: "備品", reading: "びひん", meaning: "equipment", myanmar: "ပစ္စည်းကိရိယာ" },
        { kanji: "備える", reading: "そなえる", meaning: "prepare", myanmar: "ပြင်ဆင်သည်" },
        { kanji: "定員", reading: "ていいん", meaning: "capacity", myanmar: "လူဦးရေကန့်သတ်ချက်" },
        { kanji: "定休日", reading: "ていきゅうび", meaning: "regular holiday", myanmar: "ပုံမှန်ပိတ်ရက်" },
        { kanji: "定食", reading: "ていしょく", meaning: "set meal", myanmar: "အစုံထမင်း" },
        { kanji: "定規", reading: "じょうぎ", meaning: "ruler", myanmar: "ပေတံ" },
        { kanji: "流行", reading: "りゅうこう", meaning: "fashion", myanmar: "ဖက်ရှင်" },
        { kanji: "流れる", reading: "ながれる", meaning: "flow", myanmar: "စီးဆင်းသည်" },
        { kanji: "流す", reading: "ながす", meaning: "let flow", myanmar: "စီးဆင်းစေသည်" },
        { kanji: "清書", reading: "せいしょ", meaning: "clean copy", myanmar: "သန့်ရှင်းသောမိတ္တူ" },
        { kanji: "清流", reading: "せいりゅう", meaning: "clear stream", myanmar: "ကြည်လင်သောချောင်း" },
        { kanji: "清い", reading: "きよい", meaning: "clean/pure", myanmar: "သန့်ရှင်းသော" },
        { kanji: "清掃", reading: "せいそう", meaning: "cleaning", myanmar: "သန့်ရှင်းရေး" },
        { kanji: "掃く", reading: "はく", meaning: "sweep", myanmar: "လှည်းသည်" },
        { kanji: "閉会", reading: "へいかい", meaning: "closing of meeting", myanmar: "အစည်းအဝေးပိတ်ခြင်း" },
        { kanji: "閉店", reading: "へいてん", meaning: "closing of store", myanmar: "ဆိုင်ပိတ်ခြင်း" },
        { kanji: "閉まる", reading: "しまる", meaning: "shut/close", myanmar: "ပိတ်သည်" },
        { kanji: "閉める", reading: "しめる", meaning: "to close", myanmar: "ပိတ်သည်" },
        { kanji: "点", reading: "てん", meaning: "point", myanmar: "အမှတ်" },
        { kanji: "欠点", reading: "けってん", meaning: "shortcoming", myanmar: "အားနည်းချက်" },
        { kanji: "点検", reading: "てんけん", meaning: "inspection", myanmar: "စစ်ဆေးခြင်း" },
      ]
    },
    "Day 4": {
      topic: "駅でよく見る表示 - ဘူတာမှာ မကြာခဏတွေ့ရသော ဆိုင်းဘုတ်များ",
      cards: [
        { kanji: "地下鉄", reading: "ちかてつ", meaning: "subway", myanmar: "မြေအောက်ရထား" },
        { kanji: "私鉄", reading: "してつ", meaning: "private railway", myanmar: "ပုဂ္ဂလိကရထားလမ်း" },
        { kanji: "同窓会", reading: "どうそうかい", meaning: "school reunion", myanmar: "ကျောင်းသားဟောင်းပွဲ" },
        { kanji: "窓", reading: "まど", meaning: "window", myanmar: "ပြတင်းပေါက်" },
        { kanji: "窓口", reading: "まどぐち", meaning: "service window", myanmar: "ကောင်တာ" },
        { kanji: "切符", reading: "きっぷ", meaning: "ticket", myanmar: "လက်မှတ်" },
        { kanji: "精算", reading: "せいさん", meaning: "fare adjustment", myanmar: "ခရီးစရိတ်ချိန်ညှိခြင်း" },
        { kanji: "精神", reading: "せいしん", meaning: "spirit/mind", myanmar: "စိတ်ဓာတ်" },
        { kanji: "計算", reading: "けいさん", meaning: "calculation", myanmar: "တွက်ချက်ခြင်း" },
        { kanji: "引き算", reading: "ひきざん", meaning: "subtraction", myanmar: "အနုတ်" },
        { kanji: "足し算", reading: "たしざん", meaning: "addition", myanmar: "အပေါင်း" },
        { kanji: "改正", reading: "かいせい", meaning: "amendment", myanmar: "ပြင်ဆင်ချက်" },
        { kanji: "改める", reading: "あらためる", meaning: "change", myanmar: "ပြောင်းလဲသည်" },
        { kanji: "改札口", reading: "かいさつぐち", meaning: "ticket gate", myanmar: "လက်မှတ်စစ်ဂိတ်" },
        { kanji: "札", reading: "ふだ", meaning: "card/note", myanmar: "ကတ်/မှတ်စု" },
        { kanji: "下線", reading: "かせん", meaning: "underline", myanmar: "အောက်မျဉ်း" },
        { kanji: "線路", reading: "せんろ", meaning: "railway track", myanmar: "ရထားလမ်း" },
        { kanji: "新幹線", reading: "しんかんせん", meaning: "bullet train", myanmar: "ကျည်ဆန်ရထား" },
        { kanji: "時刻", reading: "じこく", meaning: "time", myanmar: "အချိန်" },
        { kanji: "刻む", reading: "きざむ", meaning: "engrave", myanmar: "ထွင်းထုသည်" },
        { kanji: "番号", reading: "ばんごう", meaning: "number", myanmar: "နံပါတ်" },
        { kanji: "信号", reading: "しんごう", meaning: "signal", myanmar: "မီးပွိုင့်" },
        { kanji: "快速", reading: "かいそく", meaning: "high speed", myanmar: "အမြန်" },
        { kanji: "快い", reading: "こころよい", meaning: "pleasant", myanmar: "သာယာသော" },
        { kanji: "時速", reading: "じそく", meaning: "speed per hour", myanmar: "တစ်နာရီအရှိန်" },
        { kanji: "早速", reading: "さっそく", meaning: "at once", myanmar: "ချက်ချင်း" },
        { kanji: "道路", reading: "どうろ", meaning: "road", myanmar: "လမ်း" },
        { kanji: "通路", reading: "つうろ", meaning: "aisle", myanmar: "စင်္ကြံ" },
      ]
    },
    "Day 5": {
      topic: "乗り物でよく見る表示 - ယာဉ်ပေါ်မှာ မကြာခဏတွေ့ရသော ဆိုင်းဘုတ်များ",
      cards: [
        { kanji: "空港", reading: "くうこう", meaning: "airport", myanmar: "လေဆိပ်" },
        { kanji: "港", reading: "みなと", meaning: "port", myanmar: "ဆိပ်ကမ်း" },
        { kanji: "理由", reading: "りゆう", meaning: "reason", myanmar: "အကြောင်းပြချက်" },
        { kanji: "不自由", reading: "ふじゆう", meaning: "disability", myanmar: "မသန်စွမ်းမှု" },
        { kanji: "経由", reading: "けいゆ", meaning: "via", myanmar: "မှတစ်ဆင့်" },
        { kanji: "深夜", reading: "しんや", meaning: "midnight", myanmar: "သန်းခေါင်ယံ" },
        { kanji: "深刻", reading: "しんこく", meaning: "serious", myanmar: "ပြင်းထန်သော" },
        { kanji: "深い", reading: "ふかい", meaning: "deep", myanmar: "နက်သော" },
        { kanji: "降車口", reading: "こうしゃぐち", meaning: "exit door", myanmar: "ဆင်းရန်တံခါး" },
        { kanji: "下降", reading: "かこう", meaning: "descent", myanmar: "ဆင်းခြင်း" },
        { kanji: "降りる", reading: "おりる", meaning: "get off", myanmar: "ဆင်းသည်" },
        { kanji: "降る", reading: "ふる", meaning: "fall (rain)", myanmar: "ရွာသည်" },
        { kanji: "両親", reading: "りょうしん", meaning: "parents", myanmar: "မိဘနှစ်ပါး" },
        { kanji: "両方", reading: "りょうほう", meaning: "both", myanmar: "နှစ်ဖက်စလုံး" },
        { kanji: "両替", reading: "りょうがえ", meaning: "money exchange", myanmar: "ငွေလဲခြင်း" },
        { kanji: "着替える", reading: "きがえる", meaning: "change clothes", myanmar: "အဝတ်လဲသည်" },
        { kanji: "家賃", reading: "やちん", meaning: "rent", myanmar: "အိမ်ခ" },
        { kanji: "運賃", reading: "うんちん", meaning: "fare", myanmar: "ခရီးစရိတ်" },
        { kanji: "分割", reading: "ぶんかつ", meaning: "split", myanmar: "ခွဲခြမ်းခြင်း" },
        { kanji: "割れる", reading: "われる", meaning: "crack", myanmar: "ကွဲသည်" },
        { kanji: "割引", reading: "わりびき", meaning: "discount", myanmar: "လျှော့စျေး" },
        { kanji: "増加", reading: "ぞうか", meaning: "increase", myanmar: "တိုးပွားခြင်း" },
        { kanji: "増える", reading: "ふえる", meaning: "increase", myanmar: "တိုးသည်" },
        { kanji: "優先", reading: "ゆうせん", meaning: "priority", myanmar: "ဦးစားပေး" },
        { kanji: "優しい", reading: "やさしい", meaning: "kind", myanmar: "ကြင်နာသော" },
        { kanji: "優れる", reading: "すぐれる", meaning: "excel", myanmar: "ထူးချွန်သည်" },
        { kanji: "席", reading: "せき", meaning: "seat", myanmar: "ထိုင်ခုံ" },
        { kanji: "出席", reading: "しゅっせき", meaning: "attendance", myanmar: "တက်ရောက်ခြင်း" },
        { kanji: "指定席", reading: "していせき", meaning: "reserved seat", myanmar: "ကြိုတင်မှာထားသောထိုင်ခုံ" },
        { kanji: "座席", reading: "ざせき", meaning: "seat", myanmar: "ထိုင်ခုံ" },
        { kanji: "座る", reading: "すわる", meaning: "sit", myanmar: "ထိုင်သည်" },
        { kanji: "寄付", reading: "きふ", meaning: "donation", myanmar: "လှူဒါန်းခြင်း" },
        { kanji: "立ち寄る", reading: "たちよる", meaning: "drop in", myanmar: "ဝင်ကြည့်သည်" },
      ]
    },
    "Day 6": {
      topic: "郵便局・病院で見る表示 - စာတိုက်နှင့် ဆေးရုံမှာတွေ့ရသော ဆိုင်းဘုတ်များ",
      cards: [
        { kanji: "郵便局", reading: "ゆうびんきょく", meaning: "post office", myanmar: "စာတိုက်" },
        { kanji: "郵便", reading: "ゆうびん", meaning: "mail", myanmar: "စာပို့" },
        { kanji: "郵送", reading: "ゆうそう", meaning: "sending by post", myanmar: "စာတိုက်မှပို့ခြင်း" },
        { kanji: "薬局", reading: "やっきょく", meaning: "drugstore", myanmar: "ဆေးဆိုင်" },
        { kanji: "放送局", reading: "ほうそうきょく", meaning: "broadcasting station", myanmar: "ရုပ်သံလွှင့်ဌာန" },
        { kanji: "貯金", reading: "ちょきん", meaning: "savings", myanmar: "စုဆောင်းငွေ" },
        { kanji: "包帯", reading: "ほうたい", meaning: "bandage", myanmar: "ပတ်တီး" },
        { kanji: "包む", reading: "つつむ", meaning: "wrap", myanmar: "ထုပ်သည်" },
        { kanji: "小包", reading: "こづつみ", meaning: "parcel", myanmar: "ပါဆယ်" },
        { kanji: "発達", reading: "はったつ", meaning: "development", myanmar: "ဖွံ့ဖြိုးတိုးတက်ခြင်း" },
        { kanji: "速達", reading: "そくたつ", meaning: "special delivery", myanmar: "အမြန်စာပို့" },
        { kanji: "友達", reading: "ともだち", meaning: "friend", myanmar: "သူငယ်ချင်း" },
        { kanji: "国際", reading: "こくさい", meaning: "international", myanmar: "နိုင်ငံတကာ" },
        { kanji: "実際に", reading: "じっさいに", meaning: "actually", myanmar: "အမှန်တကယ်" },
        { kanji: "病院", reading: "びょういん", meaning: "hospital", myanmar: "ဆေးရုံ" },
        { kanji: "初診", reading: "しょしん", meaning: "first consultation", myanmar: "ပထမဆုံးဆေးစစ်ခြင်း" },
        { kanji: "初めて", reading: "はじめて", meaning: "for the first time", myanmar: "ပထမဆုံးအကြိမ်" },
        { kanji: "初恋", reading: "はつこい", meaning: "first love", myanmar: "ပထမဆုံးအချစ်" },
        { kanji: "再診", reading: "さいしん", meaning: "follow-up", myanmar: "ပြန်လည်စစ်ဆေးခြင်း" },
        { kanji: "再生", reading: "さいせい", meaning: "regeneration", myanmar: "ပြန်လည်ထုတ်လုပ်ခြင်း" },
        { kanji: "再び", reading: "ふたたび", meaning: "again", myanmar: "ထပ်မံ" },
        { kanji: "診療", reading: "しんりょう", meaning: "medical treatment", myanmar: "ဆေးကုသခြင်း" },
        { kanji: "治療", reading: "ちりょう", meaning: "treatment", myanmar: "ကုသခြင်း" },
        { kanji: "医療", reading: "いりょう", meaning: "medical care", myanmar: "ဆေးဘက်ဆိုင်ရာ" },
        { kanji: "外科", reading: "げか", meaning: "surgery", myanmar: "ခွဲစိတ်ကုသရေး" },
        { kanji: "内科", reading: "ないか", meaning: "internal medicine", myanmar: "အတွင်းလူနာဌာန" },
        { kanji: "産婦人科", reading: "さんふじんか", meaning: "obstetrics", myanmar: "သားဖွားမီးယပ်" },
        { kanji: "主婦", reading: "しゅふ", meaning: "housewife", myanmar: "အိမ်ရှင်မ" },
        { kanji: "皮膚", reading: "ひふ", meaning: "skin", myanmar: "အရေပြား" },
        { kanji: "救急", reading: "きゅうきゅう", meaning: "first aid", myanmar: "ရှေးဦးသူနာပြု" },
        { kanji: "救う", reading: "すくう", meaning: "save", myanmar: "ကယ်တင်သည်" },
        { kanji: "看護師", reading: "かんごし", meaning: "nurse", myanmar: "သူနာပြု" },
        { kanji: "看板", reading: "かんばん", meaning: "signboard", myanmar: "ဆိုင်းဘုတ်" },
      ]
    }
  },
  "Week 2": {
    "Day 1": {
      topic: "自動券売機 - အလိုအလျောက်လက်မှတ်ရောင်းစက်",
      cards: [
        { kanji: "普通", reading: "ふつう", meaning: "ordinary", myanmar: "သာမန်" },
        { kanji: "普段", reading: "ふだん", meaning: "usually", myanmar: "ပုံမှန်အားဖြင့်" },
        { kanji: "回数券", reading: "かいすうけん", meaning: "commuter tickets", myanmar: "အကြိမ်ရေလက်မှတ်" },
        { kanji: "乗車券", reading: "じょうしゃけん", meaning: "boarding ticket", myanmar: "စီးနင်းလက်မှတ်" },
        { kanji: "旅券", reading: "りょけん", meaning: "passport", myanmar: "နိုင်ငံကူးလက်မှတ်" },
        { kanji: "発券", reading: "はっけん", meaning: "ticket issue", myanmar: "လက်မှတ်ထုတ်ခြင်း" },
        { kanji: "数字", reading: "すうじ", meaning: "number", myanmar: "ဂဏန်း" },
        { kanji: "数学", reading: "すうがく", meaning: "mathematics", myanmar: "သင်္ချာ" },
        { kanji: "点数", reading: "てんすう", meaning: "score", myanmar: "အမှတ်" },
        { kanji: "数える", reading: "かぞえる", meaning: "count", myanmar: "ရေတွက်သည်" },
        { kanji: "飛行機", reading: "ひこうき", meaning: "airplane", myanmar: "လေယာဉ်" },
        { kanji: "交通機関", reading: "こうつうきかん", meaning: "transportation", myanmar: "သယ်ယူပို့ဆောင်ရေး" },
        { kanji: "復習", reading: "ふくしゅう", meaning: "review", myanmar: "ပြန်လည်လေ့လာခြင်း" },
        { kanji: "往復", reading: "おうふく", meaning: "round trip", myanmar: "အသွားအပြန်" },
        { kanji: "回復", reading: "かいふく", meaning: "recovery", myanmar: "ပြန်လည်ကောင်းမွန်ခြင်း" },
        { kanji: "片道", reading: "かたみち", meaning: "one-way", myanmar: "အသွားတစ်ခေါက်" },
        { kanji: "片づける", reading: "かたづける", meaning: "tidy up", myanmar: "ရှင်းလင်းသည်" },
        { kanji: "期間", reading: "きかん", meaning: "period", myanmar: "ကာလ" },
        { kanji: "定期", reading: "ていき", meaning: "fixed period", myanmar: "ပုံမှန်" },
        { kanji: "定期券", reading: "ていきけん", meaning: "commuter pass", myanmar: "ရာသီလက်မှတ်" },
        { kanji: "販売", reading: "はんばい", meaning: "selling", myanmar: "ရောင်းချခြင်း" },
        { kanji: "自動販売機", reading: "じどうはんばいき", meaning: "vending machine", myanmar: "အလိုအလျောက်ရောင်းစက်" },
        { kanji: "指定席", reading: "していせき", meaning: "reserved seat", myanmar: "ကြိုတင်မှာထားသောထိုင်ခုံ" },
        { kanji: "指", reading: "ゆび", meaning: "finger", myanmar: "လက်ချောင်း" },
        { kanji: "指す", reading: "さす", meaning: "point", myanmar: "ညွှန်ပြသည်" },
        { kanji: "調整", reading: "ちょうせい", meaning: "adjustment", myanmar: "ချိန်ညှိခြင်း" },
        { kanji: "調子", reading: "ちょうし", meaning: "condition", myanmar: "အခြေအနေ" },
        { kanji: "調べる", reading: "しらべる", meaning: "investigate", myanmar: "စုံစမ်းသည်" },
        { kanji: "整理", reading: "せいり", meaning: "arrangement", myanmar: "စီစဉ်ခြင်း" },
        { kanji: "整備", reading: "せいび", meaning: "maintenance", myanmar: "ထိန်းသိမ်းခြင်း" },
        { kanji: "時刻表", reading: "じこくひょう", meaning: "timetable", myanmar: "အချိန်ဇယား" },
        { kanji: "発表", reading: "はっぴょう", meaning: "announcement", myanmar: "ကြေညာခြင်း" },
        { kanji: "表示", reading: "ひょうじ", meaning: "indication", myanmar: "ပြသခြင်း" },
        { kanji: "指示", reading: "しじ", meaning: "instruction", myanmar: "ညွှန်ကြားချက်" },
      ]
    },
    "Day 2": {
      topic: "現金自動支払機 (ATM)",
      cards: [
        { kanji: "現金", reading: "げんきん", meaning: "cash", myanmar: "ငွေသား" },
        { kanji: "表現", reading: "ひょうげん", meaning: "expression", myanmar: "ဖော်ပြခြင်း" },
        { kanji: "現れる", reading: "あらわれる", meaning: "appear", myanmar: "ပေါ်လာသည်" },
        { kanji: "支店", reading: "してん", meaning: "branch office", myanmar: "ဘဏ်ခွဲ" },
        { kanji: "支持", reading: "しじ", meaning: "support", myanmar: "ထောက်ခံခြင်း" },
        { kanji: "支える", reading: "ささえる", meaning: "support", myanmar: "ထောက်ပံ့သည်" },
        { kanji: "払う", reading: "はらう", meaning: "pay", myanmar: "ပေးသည်" },
        { kanji: "支払う", reading: "しはらう", meaning: "pay", myanmar: "ပေးချေသည်" },
        { kanji: "預金", reading: "よきん", meaning: "deposit", myanmar: "အပ်ငွေ" },
        { kanji: "預ける", reading: "あずける", meaning: "entrust", myanmar: "အပ်နှံသည်" },
        { kanji: "預かる", reading: "あずかる", meaning: "keep", myanmar: "ထိန်းသိမ်းသည်" },
        { kanji: "払い戻し", reading: "はらいもどし", meaning: "refund", myanmar: "ပြန်အမ်းငွေ" },
        { kanji: "戻る", reading: "もどる", meaning: "return", myanmar: "ပြန်လာသည်" },
        { kanji: "残高", reading: "ざんだか", meaning: "balance", myanmar: "လက်ကျန်ငွေ" },
        { kanji: "残る", reading: "のこる", meaning: "remain", myanmar: "ကျန်ရှိသည်" },
        { kanji: "残す", reading: "のこす", meaning: "leave behind", myanmar: "ချန်ထားသည်" },
        { kanji: "照明", reading: "しょうめい", meaning: "illumination", myanmar: "အလင်းရောင်" },
        { kanji: "照らす", reading: "てらす", meaning: "light up", myanmar: "ထွန်းလင်းစေသည်" },
        { kanji: "硬貨", reading: "こうか", meaning: "coin", myanmar: "အကြွေစေ့" },
        { kanji: "硬い", reading: "かたい", meaning: "hard", myanmar: "မာသော" },
        { kanji: "貨物", reading: "かもつ", meaning: "freight", myanmar: "ကုန်စည်" },
        { kanji: "通貨", reading: "つうか", meaning: "currency", myanmar: "ငွေကြေး" },
        { kanji: "確定", reading: "かくてい", meaning: "determination", myanmar: "အတည်ပြုခြင်း" },
        { kanji: "確か", reading: "たしか", meaning: "certain", myanmar: "သေချာသော" },
        { kanji: "確かめる", reading: "たしかめる", meaning: "confirm", myanmar: "အတည်ပြုသည်" },
        { kanji: "確認", reading: "かくにん", meaning: "confirmation", myanmar: "အတည်ပြုခြင်း" },
        { kanji: "認める", reading: "みとめる", meaning: "admit", myanmar: "အသိအမှတ်ပြုသည်" },
        { kanji: "違法", reading: "いほう", meaning: "illegal", myanmar: "တရားမဝင်" },
        { kanji: "違い", reading: "ちがい", meaning: "difference", myanmar: "ကွာခြားချက်" },
        { kanji: "間違える", reading: "まちがえる", meaning: "make mistake", myanmar: "မှားသည်" },
        { kanji: "取り消し", reading: "とりけし", meaning: "cancellation", myanmar: "ပယ်ဖျက်ခြင်း" },
        { kanji: "消える", reading: "きえる", meaning: "disappear", myanmar: "ပျောက်သည်" },
        { kanji: "消す", reading: "けす", meaning: "extinguish", myanmar: "ပိတ်သည်" },
      ]
    },
    "Day 3": {
      topic: "自動販売機 - အလိုအလျောက်ရောင်းစက်",
      cards: [
        { kanji: "温度", reading: "おんど", meaning: "temperature", myanmar: "အပူချိန်" },
        { kanji: "体温計", reading: "たいおんけい", meaning: "thermometer", myanmar: "ကိုယ်ပူချိန်တိုင်း" },
        { kanji: "温室", reading: "おんしつ", meaning: "greenhouse", myanmar: "ဖန်လုံအိမ်" },
        { kanji: "暖かい", reading: "あたたかい", meaning: "warm", myanmar: "နွေးသော" },
        { kanji: "冷静", reading: "れいせい", meaning: "calm", myanmar: "တည်ငြိမ်သော" },
        { kanji: "冷たい", reading: "つめたい", meaning: "cold", myanmar: "အေးသော" },
        { kanji: "冷える", reading: "ひえる", meaning: "become cold", myanmar: "အေးသွားသည်" },
        { kanji: "冷やす", reading: "ひやす", meaning: "cool", myanmar: "အေးအောင်လုပ်သည်" },
        { kanji: "冷める", reading: "さめる", meaning: "cool down", myanmar: "အေးသွားသည်" },
        { kanji: "緑茶", reading: "りょくちゃ", meaning: "green tea", myanmar: "လက်ဖက်ရည်စိမ်း" },
        { kanji: "新緑", reading: "しんりょく", meaning: "fresh greenery", myanmar: "စိမ်းလန်းသောအရွက်" },
        { kanji: "緑", reading: "みどり", meaning: "green", myanmar: "အစိမ်းရောင်" },
        { kanji: "紅茶", reading: "こうちゃ", meaning: "tea", myanmar: "လက်ဖက်ရည်" },
        { kanji: "口紅", reading: "くちべに", meaning: "lipstick", myanmar: "နှုတ်ခမ်းနီ" },
        { kanji: "玉", reading: "たま", meaning: "ball/sphere", myanmar: "ဘောလုံး" },
        { kanji: "返事", reading: "へんじ", meaning: "reply", myanmar: "ပြန်ကြားချက်" },
        { kanji: "返却", reading: "へんきゃく", meaning: "returning", myanmar: "ပြန်အပ်ခြင်း" },
        { kanji: "返金", reading: "へんきん", meaning: "refund", myanmar: "ပြန်အမ်းငွေ" },
        { kanji: "返す", reading: "かえす", meaning: "return", myanmar: "ပြန်ပေးသည်" },
        { kanji: "団体", reading: "だんたい", meaning: "group", myanmar: "အဖွဲ့အစည်း" },
        { kanji: "集団", reading: "しゅうだん", meaning: "group", myanmar: "အုပ်စု" },
        { kanji: "団地", reading: "だんち", meaning: "housing complex", myanmar: "အိမ်ယာ" },
        { kanji: "布団", reading: "ふとん", meaning: "Japanese mattress", myanmar: "ဂျပန်အိပ်ယာ" },
        { kanji: "一般", reading: "いっぱん", meaning: "general", myanmar: "အထွေထွေ" },
        { kanji: "幼児", reading: "ようじ", meaning: "baby", myanmar: "ကလေးငယ်" },
        { kanji: "幼い", reading: "おさない", meaning: "very young", myanmar: "ငယ်ရွယ်သော" },
        { kanji: "小児科", reading: "しょうにか", meaning: "pediatrics", myanmar: "ကလေးအထူးကု" },
        { kanji: "未定", reading: "みてい", meaning: "undecided", myanmar: "မဆုံးဖြတ်ရသေး" },
        { kanji: "未来", reading: "みらい", meaning: "future", myanmar: "အနာဂတ်" },
        { kanji: "未知", reading: "みち", meaning: "unknown", myanmar: "မသိသေးသော" },
        { kanji: "未満", reading: "みまん", meaning: "less than", myanmar: "အောက်" },
        { kanji: "満員", reading: "まんいん", meaning: "full", myanmar: "ပြည့်သော" },
        { kanji: "満足", reading: "まんぞく", meaning: "satisfaction", myanmar: "ကျေနပ်မှု" },
        { kanji: "老人", reading: "ろうじん", meaning: "old person", myanmar: "သက်ကြီးရွယ်အို" },
      ]
    },
    "Day 4": {
      topic: "家電のリモコン - အိမ်သုံးလျှပ်စစ်ပစ္စည်း အဝေးထိန်း",
      cards: [
        { kanji: "設定", reading: "せってい", meaning: "setting", myanmar: "သတ်မှတ်ခြင်း" },
        { kanji: "設計", reading: "せっけい", meaning: "design", myanmar: "ဒီဇိုင်း" },
        { kanji: "設備", reading: "せつび", meaning: "equipment", myanmar: "ပစ္စည်းကိရိယာ" },
        { kanji: "換気", reading: "かんき", meaning: "ventilation", myanmar: "လေဝင်လေထွက်" },
        { kanji: "停止", reading: "ていし", meaning: "stop", myanmar: "ရပ်တန့်ခြင်း" },
        { kanji: "停電", reading: "ていでん", meaning: "blackout", myanmar: "မီးပြတ်ခြင်း" },
        { kanji: "暖房", reading: "だんぼう", meaning: "heating", myanmar: "အပူပေးစနစ်" },
        { kanji: "温暖", reading: "おんだん", meaning: "temperate", myanmar: "သမမျှတသော" },
        { kanji: "除湿", reading: "じょしつ", meaning: "dehumidification", myanmar: "စိုထိန်းခြင်း" },
        { kanji: "掃除", reading: "そうじ", meaning: "cleaning", myanmar: "သန့်ရှင်းရေး" },
        { kanji: "湿度", reading: "しつど", meaning: "humidity", myanmar: "စိုထိုင်းမှု" },
        { kanji: "録画", reading: "ろくが", meaning: "video recording", myanmar: "ဗီဒီယိုဖမ်းခြင်း" },
        { kanji: "録音", reading: "ろくおん", meaning: "audio recording", myanmar: "အသံဖမ်းခြင်း" },
        { kanji: "音量", reading: "おんりょう", meaning: "volume", myanmar: "အသံအတိုးအကျယ်" },
        { kanji: "予定", reading: "よてい", meaning: "schedule", myanmar: "အစီအစဉ်" },
        { kanji: "予約", reading: "よやく", meaning: "reservation", myanmar: "ကြိုတင်မှာခြင်း" },
        { kanji: "約束", reading: "やくそく", meaning: "promise", myanmar: "ကတိ" },
      ]
    },
    "Day 5": {
      topic: "電話・携帯電話 - ဖုန်း",
      cards: [
        { kanji: "携帯電話", reading: "けいたいでんわ", meaning: "cellphone", myanmar: "မိုဘိုင်းဖုန်း" },
        { kanji: "保険", reading: "ほけん", meaning: "insurance", myanmar: "အာမခံ" },
        { kanji: "保つ", reading: "たもつ", meaning: "maintain", myanmar: "ထိန်းသိမ်းသည်" },
        { kanji: "留学", reading: "りゅうがく", meaning: "study abroad", myanmar: "နိုင်ငံခြားတက်ခြင်း" },
        { kanji: "留守", reading: "るす", meaning: "absence", myanmar: "အိမ်မရှိခြင်း" },
        { kanji: "守る", reading: "まもる", meaning: "protect", myanmar: "ကာကွယ်သည်" },
        { kanji: "伝言", reading: "でんごん", meaning: "message", myanmar: "စကားအစား" },
        { kanji: "伝える", reading: "つたえる", meaning: "convey", myanmar: "ပို့ဆောင်သည်" },
        { kanji: "手伝う", reading: "てつだう", meaning: "help", myanmar: "ကူညီသည်" },
        { kanji: "通信", reading: "つうしん", meaning: "communication", myanmar: "ဆက်သွယ်ရေး" },
        { kanji: "信じる", reading: "しんじる", meaning: "believe", myanmar: "ယုံကြည်သည်" },
        { kanji: "履歴", reading: "りれき", meaning: "history", myanmar: "မှတ်တမ်း" },
        { kanji: "選択", reading: "せんたく", meaning: "choice", myanmar: "ရွေးချယ်ခြင်း" },
        { kanji: "選ぶ", reading: "えらぶ", meaning: "choose", myanmar: "ရွေးသည်" },
        { kanji: "決定", reading: "けってい", meaning: "decision", myanmar: "ဆုံးဖြတ်ချက်" },
        { kanji: "決める", reading: "きめる", meaning: "decide", myanmar: "ဆုံးဖြတ်သည်" },
      ]
    },
    "Day 6": {
      topic: "パソコン - ကွန်ပျူတာ",
      cards: [
        { kanji: "登録", reading: "とうろく", meaning: "registration", myanmar: "မှတ်ပုံတင်ခြင်း" },
        { kanji: "登山", reading: "とざん", meaning: "mountain climbing", myanmar: "တောင်တက်ခြင်း" },
        { kanji: "編集", reading: "へんしゅう", meaning: "editing", myanmar: "တည်းဖြတ်ခြင်း" },
        { kanji: "機能", reading: "きのう", meaning: "function", myanmar: "လုပ်ဆောင်ချက်" },
        { kanji: "可能", reading: "かのう", meaning: "possible", myanmar: "ဖြစ်နိုင်သော" },
        { kanji: "能力", reading: "のうりょく", meaning: "ability", myanmar: "စွမ်းရည်" },
        { kanji: "修正", reading: "しゅうせい", meaning: "correction", myanmar: "ပြင်ဆင်ခြင်း" },
        { kanji: "修理", reading: "しゅうり", meaning: "repair", myanmar: "ပြုပြင်ခြင်း" },
        { kanji: "完了", reading: "かんりょう", meaning: "completion", myanmar: "ပြီးစီးခြင်း" },
        { kanji: "完成", reading: "かんせい", meaning: "accomplishment", myanmar: "ပြီးမြောက်ခြင်း" },
        { kanji: "画像", reading: "がぞう", meaning: "image", myanmar: "ပုံရိပ်" },
        { kanji: "書類", reading: "しょるい", meaning: "document", myanmar: "စာရွက်စာတမ်း" },
        { kanji: "分類", reading: "ぶんるい", meaning: "classification", myanmar: "အမျိုးအစားခွဲခြင်း" },
        { kanji: "保存", reading: "ほぞん", meaning: "save", myanmar: "သိမ်းဆည်းခြင်း" },
        { kanji: "印刷", reading: "いんさつ", meaning: "printing", myanmar: "ပုံနှိပ်ခြင်း" },
        { kanji: "拡大", reading: "かくだい", meaning: "enlargement", myanmar: "ချဲ့ခြင်း" },
        { kanji: "縮小", reading: "しゅくしょう", meaning: "reduction", myanmar: "ချုံ့ခြင်း" },
      ]
    }
  },
  "Week 3": {
    "Day 1": {
      topic: "料金通知・払い込み用紙 - ငွေပေးချေရန်အကြောင်းကြားစာ",
      cards: [
        { kanji: "様子", reading: "ようす", meaning: "situation", myanmar: "အခြေအနေ" },
        { kanji: "同様", reading: "どうよう", meaning: "same", myanmar: "တူညီသော" },
        { kanji: "重要", reading: "じゅうよう", meaning: "important", myanmar: "အရေးကြီးသော" },
        { kanji: "利用", reading: "りよう", meaning: "use", myanmar: "အသုံးပြုခြင်း" },
        { kanji: "便利", reading: "べんり", meaning: "convenient", myanmar: "အဆင်ပြေသော" },
        { kanji: "明細", reading: "めいさい", meaning: "details", myanmar: "အသေးစိတ်" },
        { kanji: "細かい", reading: "こまかい", meaning: "fine/detailed", myanmar: "သေးငယ်သော" },
        { kanji: "現在", reading: "げんざい", meaning: "present", myanmar: "လက်ရှိ" },
        { kanji: "不在", reading: "ふざい", meaning: "absence", myanmar: "မရှိခြင်း" },
        { kanji: "金額", reading: "きんがく", meaning: "amount", myanmar: "ပမာဏ" },
        { kanji: "領収書", reading: "りょうしゅうしょ", meaning: "receipt", myanmar: "ပြေစာ" },
        { kanji: "収入", reading: "しゅうにゅう", meaning: "income", myanmar: "ဝင်ငွေ" },
        { kanji: "機械", reading: "きかい", meaning: "machine", myanmar: "စက်" },
        { kanji: "汚染", reading: "おせん", meaning: "pollution", myanmar: "ညစ်ညမ်းမှု" },
      ]
    },
    "Day 2": {
      topic: "不在通知 - မရှိကြောင်းအကြောင်းကြားစာ",
      cards: [
        { kanji: "連絡", reading: "れんらく", meaning: "contact", myanmar: "ဆက်သွယ်ခြင်း" },
        { kanji: "連続", reading: "れんぞく", meaning: "continuous", myanmar: "ဆက်တိုက်" },
        { kanji: "連休", reading: "れんきゅう", meaning: "holidays", myanmar: "ဆက်တိုက်ရုံးပိတ်ရက်" },
        { kanji: "届ける", reading: "とどける", meaning: "deliver", myanmar: "ပို့ဆောင်သည်" },
        { kanji: "届く", reading: "とどく", meaning: "arrive", myanmar: "ရောက်သည်" },
        { kanji: "参考", reading: "さんこう", meaning: "reference", myanmar: "ကိုးကား" },
        { kanji: "衣類", reading: "いるい", meaning: "clothing", myanmar: "အဝတ်အစား" },
        { kanji: "冷凍", reading: "れいとう", meaning: "frozen", myanmar: "အေးခဲသော" },
        { kanji: "凍る", reading: "こおる", meaning: "freeze", myanmar: "အေးခဲသည်" },
        { kanji: "配達", reading: "はいたつ", meaning: "delivery", myanmar: "ပို့ဆောင်ခြင်း" },
        { kanji: "心配", reading: "しんぱい", meaning: "worry", myanmar: "စိုးရိမ်မှု" },
        { kanji: "担当", reading: "たんとう", meaning: "in charge", myanmar: "တာဝန်ခံ" },
        { kanji: "弁当", reading: "べんとう", meaning: "lunch box", myanmar: "ထမင်းဘူး" },
      ]
    },
    "Day 3": {
      topic: "ポイントカード・商品券 - ပွိုင့်ကတ်",
      cards: [
        { kanji: "商品", reading: "しょうひん", meaning: "goods", myanmar: "ကုန်ပစ္စည်း" },
        { kanji: "商売", reading: "しょうばい", meaning: "business", myanmar: "အရောင်းအဝယ်" },
        { kanji: "個人", reading: "こじん", meaning: "individual", myanmar: "တစ်ဦးချင်း" },
        { kanji: "首相", reading: "しゅしょう", meaning: "prime minister", myanmar: "ဝန်ကြီးချုပ်" },
        { kanji: "相手", reading: "あいて", meaning: "partner", myanmar: "လက်တွဲဖက်" },
        { kanji: "交換", reading: "こうかん", meaning: "exchange", myanmar: "လဲလှယ်ခြင်း" },
        { kanji: "交通", reading: "こうつう", meaning: "traffic", myanmar: "သယ်ယူပို့ဆောင်ရေး" },
        { kanji: "有効", reading: "ゆうこう", meaning: "valid", myanmar: "တရားဝင်" },
        { kanji: "効果", reading: "こうか", meaning: "effect", myanmar: "အကျိုးသက်ရောက်မှု" },
        { kanji: "期限", reading: "きげん", meaning: "deadline", myanmar: "သတ်မှတ်ရက်" },
        { kanji: "全国", reading: "ぜんこく", meaning: "nationwide", myanmar: "နိုင်ငံတစ်ဝှမ်း" },
        { kanji: "完全", reading: "かんぜん", meaning: "perfect", myanmar: "ပြည့်စုံသော" },
        { kanji: "経験", reading: "けいけん", meaning: "experience", myanmar: "အတွေ့အကြုံ" },
        { kanji: "経済", reading: "けいざい", meaning: "economy", myanmar: "စီးပွားရေး" },
        { kanji: "責任", reading: "せきにん", meaning: "responsibility", myanmar: "တာဝန်" },
      ]
    },
    "Day 4": {
      topic: "ゴミの分別 - အမှိုက်ခွဲခြားခြင်း",
      cards: [
        { kanji: "必要", reading: "ひつよう", meaning: "necessary", myanmar: "လိုအပ်သော" },
        { kanji: "必ず", reading: "かならず", meaning: "certainly", myanmar: "သေချာပေါက်" },
        { kanji: "袋", reading: "ふくろ", meaning: "bag", myanmar: "အိတ်" },
        { kanji: "燃料", reading: "ねんりょう", meaning: "fuel", myanmar: "လောင်စာ" },
        { kanji: "枝", reading: "えだ", meaning: "branch", myanmar: "အကိုင်း" },
        { kanji: "葉", reading: "は", meaning: "leaf", myanmar: "အရွက်" },
        { kanji: "落ち葉", reading: "おちば", meaning: "fallen leaves", myanmar: "ကြွေလွင့်အရွက်" },
        { kanji: "埋める", reading: "うめる", meaning: "bury", myanmar: "မြှုပ်သည်" },
        { kanji: "製品", reading: "せいひん", meaning: "product", myanmar: "ထုတ်ကုန်" },
        { kanji: "内容", reading: "ないよう", meaning: "contents", myanmar: "အကြောင်းအရာ" },
        { kanji: "容器", reading: "ようき", meaning: "container", myanmar: "ဘူး" },
        { kanji: "食器", reading: "しょっき", meaning: "tableware", myanmar: "စားသောက်ကိရိယာ" },
        { kanji: "雑誌", reading: "ざっし", meaning: "magazine", myanmar: "မဂ္ဂဇင်း" },
        { kanji: "資源", reading: "しげん", meaning: "resources", myanmar: "သယံဇာတ" },
        { kanji: "資料", reading: "しりょう", meaning: "materials", myanmar: "အချက်အလက်" },
      ]
    },
    "Day 5": {
      topic: "いろいろな通知 - အမျိုးမျိုးသောအကြောင်းကြားစာ",
      cards: [
        { kanji: "避難", reading: "ひなん", meaning: "evacuation", myanmar: "ရှောင်တိမ်းခြင်း" },
        { kanji: "困難", reading: "こんなん", meaning: "difficult", myanmar: "ခက်ခဲသော" },
        { kanji: "訓練", reading: "くんれん", meaning: "training", myanmar: "လေ့ကျင့်ခြင်း" },
        { kanji: "練習", reading: "れんしゅう", meaning: "practice", myanmar: "လေ့ကျင့်ခြင်း" },
        { kanji: "地震", reading: "じしん", meaning: "earthquake", myanmar: "ငလျင်" },
        { kanji: "震える", reading: "ふるえる", meaning: "tremble", myanmar: "တုန်သည်" },
        { kanji: "参加", reading: "さんか", meaning: "participate", myanmar: "ပါဝင်ခြင်း" },
        { kanji: "加える", reading: "くわえる", meaning: "add", myanmar: "ထည့်သည်" },
        { kanji: "延期", reading: "えんき", meaning: "postpone", myanmar: "ရွှေ့ဆိုင်းခြင်း" },
        { kanji: "断水", reading: "だんすい", meaning: "water outage", myanmar: "ရေပြတ်ခြင်း" },
        { kanji: "断る", reading: "ことわる", meaning: "refuse", myanmar: "ငြင်းသည်" },
        { kanji: "管理", reading: "かんり", meaning: "management", myanmar: "စီမံခန့်ခွဲခြင်း" },
        { kanji: "記入", reading: "きにゅう", meaning: "fill in", myanmar: "ဖြည့်သွင်းခြင်း" },
        { kanji: "協力", reading: "きょうりょく", meaning: "cooperation", myanmar: "ပူးပေါင်းဆောင်ရွက်ခြင်း" },
        { kanji: "平日", reading: "へいじつ", meaning: "weekday", myanmar: "ရုံးဖွင့်ရက်" },
      ]
    },
    "Day 6": {
      topic: "健診結果 - ကျန်းမာရေးစစ်ဆေးမှုရလဒ်",
      cards: [
        { kanji: "結果", reading: "けっか", meaning: "result", myanmar: "ရလဒ်" },
        { kanji: "結局", reading: "けっきょく", meaning: "after all", myanmar: "နောက်ဆုံးတွင်" },
        { kanji: "結ぶ", reading: "むすぶ", meaning: "tie", myanmar: "ချည်သည်" },
        { kanji: "方法", reading: "ほうほう", meaning: "method", myanmar: "နည်းလမ်း" },
        { kanji: "文法", reading: "ぶんぽう", meaning: "grammar", myanmar: "သဒ္ဒါ" },
        { kanji: "地位", reading: "ちい", meaning: "status", myanmar: "အဆင့်အတန်း" },
        { kanji: "異常", reading: "いじょう", meaning: "abnormal", myanmar: "ပုံမှန်မဟုတ်သော" },
        { kanji: "異なる", reading: "ことなる", meaning: "differ", myanmar: "ကွဲပြားသည်" },
        { kanji: "移転", reading: "いてん", meaning: "relocate", myanmar: "ပြောင်းရွှေ့ခြင်း" },
        { kanji: "移動", reading: "いどう", meaning: "move", myanmar: "ရွှေ့ပြောင်းခြင်း" },
        { kanji: "事務所", reading: "じむしょ", meaning: "office", myanmar: "ရုံး" },
        { kanji: "変更", reading: "へんこう", meaning: "change", myanmar: "ပြောင်းလဲခြင်း" },
        { kanji: "更新", reading: "こうしん", meaning: "renewal", myanmar: "သက်တမ်းတိုးခြင်း" },
        { kanji: "笑顔", reading: "えがお", meaning: "smile", myanmar: "ပြုံးချိုမျက်နှာ" },
        { kanji: "涙", reading: "なみだ", meaning: "tears", myanmar: "မျက်ရည်" },
      ]
    }
  },
  "Week 4": {
    "Day 1": {
      topic: "履歴書 - ကိုယ်ရေးမှတ်တမ်း",
      cards: [
        { kanji: "氏名", reading: "しめい", meaning: "full name", myanmar: "အမည်အပြည့်အစုံ" },
        { kanji: "性別", reading: "せいべつ", meaning: "gender", myanmar: "ကျား/မ" },
        { kanji: "住所", reading: "じゅうしょ", meaning: "address", myanmar: "နေရပ်လိပ်စာ" },
        { kanji: "学歴", reading: "がくれき", meaning: "education", myanmar: "ပညာရေး" },
        { kanji: "職歴", reading: "しょくれき", meaning: "work history", myanmar: "အလုပ်အတွေ့အကြုံ" },
        { kanji: "資格", reading: "しかく", meaning: "qualification", myanmar: "အရည်အချင်း" },
        { kanji: "志望", reading: "しぼう", meaning: "aspiration", myanmar: "ဆန္ဒ" },
        { kanji: "動機", reading: "どうき", meaning: "motive", myanmar: "ရည်ရွယ်ချက်" },
        { kanji: "面接", reading: "めんせつ", meaning: "interview", myanmar: "အင်တာဗျူး" },
        { kanji: "採用", reading: "さいよう", meaning: "hiring", myanmar: "ခန့်အပ်ခြင်း" },
      ]
    },
    "Day 2": {
      topic: "求人広告 - အလုပ်ခေါ်စာ",
      cards: [
        { kanji: "募集", reading: "ぼしゅう", meaning: "recruit", myanmar: "ခေါ်ယူခြင်း" },
        { kanji: "経験者", reading: "けいけんしゃ", meaning: "experienced", myanmar: "အတွေ့အကြုံရှိသူ" },
        { kanji: "勤務", reading: "きんむ", meaning: "work", myanmar: "အလုပ်လုပ်ခြင်း" },
        { kanji: "給料", reading: "きゅうりょう", meaning: "salary", myanmar: "လစာ" },
        { kanji: "時給", reading: "じきゅう", meaning: "hourly wage", myanmar: "တစ်နာရီလုပ်ခ" },
        { kanji: "交通費", reading: "こうつうひ", meaning: "transport cost", myanmar: "ခရီးစရိတ်" },
        { kanji: "社会保険", reading: "しゃかいほけん", meaning: "social insurance", myanmar: "လူမှုအာမခံ" },
        { kanji: "応募", reading: "おうぼ", meaning: "apply", myanmar: "လျှောက်ထားခြင်း" },
        { kanji: "条件", reading: "じょうけん", meaning: "conditions", myanmar: "အခြေအနေ" },
        { kanji: "正社員", reading: "せいしゃいん", meaning: "full-time", myanmar: "အမြဲတမ်းဝန်ထမ်း" },
      ]
    },
    "Day 3": {
      topic: "会社案内 - ကုမ္ပဏီလမ်းညွှန်",
      cards: [
        { kanji: "会社", reading: "かいしゃ", meaning: "company", myanmar: "ကုမ္ပဏီ" },
        { kanji: "設立", reading: "せつりつ", meaning: "establish", myanmar: "တည်ထောင်ခြင်း" },
        { kanji: "資本金", reading: "しほんきん", meaning: "capital", myanmar: "အရင်းအနှီး" },
        { kanji: "従業員", reading: "じゅうぎょういん", meaning: "employee", myanmar: "ဝန်ထမ်း" },
        { kanji: "事業", reading: "じぎょう", meaning: "business", myanmar: "လုပ်ငန်း" },
        { kanji: "製造", reading: "せいぞう", meaning: "manufacture", myanmar: "ထုတ်လုပ်ခြင်း" },
        { kanji: "輸出", reading: "ゆしゅつ", meaning: "export", myanmar: "တင်ပို့ခြင်း" },
        { kanji: "輸入", reading: "ゆにゅう", meaning: "import", myanmar: "တင်သွင်းခြင်း" },
        { kanji: "取引", reading: "とりひき", meaning: "transaction", myanmar: "အရောင်းအဝယ်" },
        { kanji: "契約", reading: "けいやく", meaning: "contract", myanmar: "စာချုပ်" },
      ]
    },
    "Day 4": {
      topic: "新聞記事 - သတင်းစာ",
      cards: [
        { kanji: "記事", reading: "きじ", meaning: "article", myanmar: "ဆောင်းပါး" },
        { kanji: "政治", reading: "せいじ", meaning: "politics", myanmar: "နိုင်ငံရေး" },
        { kanji: "選挙", reading: "せんきょ", meaning: "election", myanmar: "ရွေးကောက်ပွဲ" },
        { kanji: "投票", reading: "とうひょう", meaning: "vote", myanmar: "မဲပေးခြင်း" },
        { kanji: "当選", reading: "とうせん", meaning: "win election", myanmar: "အနိုင်ရခြင်း" },
        { kanji: "議会", reading: "ぎかい", meaning: "parliament", myanmar: "လွှတ်တော်" },
        { kanji: "法律", reading: "ほうりつ", meaning: "law", myanmar: "ဥပဒေ" },
        { kanji: "改革", reading: "かいかく", meaning: "reform", myanmar: "ပြုပြင်ပြောင်းလဲခြင်း" },
        { kanji: "税金", reading: "ぜいきん", meaning: "tax", myanmar: "အခွန်" },
        { kanji: "国民", reading: "こくみん", meaning: "citizen", myanmar: "နိုင်ငံသား" },
      ]
    },
    "Day 5": {
      topic: "経済ニュース - စီးပွားရေးသတင်း",
      cards: [
        { kanji: "景気", reading: "けいき", meaning: "economy", myanmar: "စီးပွားရေးအခြေအနေ" },
        { kanji: "株式", reading: "かぶしき", meaning: "stock", myanmar: "စတော့ရှယ်ယာ" },
        { kanji: "投資", reading: "とうし", meaning: "investment", myanmar: "ရင်းနှီးမြှုပ်နှံမှု" },
        { kanji: "利益", reading: "りえき", meaning: "profit", myanmar: "အမြတ်" },
        { kanji: "損失", reading: "そんしつ", meaning: "loss", myanmar: "အရှုံး" },
        { kanji: "物価", reading: "ぶっか", meaning: "prices", myanmar: "ကုန်စျေးနှုန်း" },
        { kanji: "消費", reading: "しょうひ", meaning: "consumption", myanmar: "စားသုံးမှု" },
        { kanji: "需要", reading: "じゅよう", meaning: "demand", myanmar: "လိုအပ်ချက်" },
        { kanji: "供給", reading: "きょうきゅう", meaning: "supply", myanmar: "ထောက်ပံ့မှု" },
        { kanji: "貿易", reading: "ぼうえき", meaning: "trade", myanmar: "ကုန်သွယ်ရေး" },
      ]
    },
    "Day 6": {
      topic: "社会ニュース - လူမှုရေးသတင်း",
      cards: [
        { kanji: "事故", reading: "じこ", meaning: "accident", myanmar: "မတော်တဆမှု" },
        { kanji: "犯罪", reading: "はんざい", meaning: "crime", myanmar: "ရာဇဝတ်မှု" },
        { kanji: "被害", reading: "ひがい", meaning: "damage", myanmar: "ထိခိုက်မှု" },
        { kanji: "警察", reading: "けいさつ", meaning: "police", myanmar: "ရဲ" },
        { kanji: "逮捕", reading: "たいほ", meaning: "arrest", myanmar: "ဖမ်းဆီးခြင်း" },
        { kanji: "裁判", reading: "さいばん", meaning: "trial", myanmar: "တရားရုံး" },
        { kanji: "環境", reading: "かんきょう", meaning: "environment", myanmar: "ပတ်ဝန်းကျင်" },
        { kanji: "災害", reading: "さいがい", meaning: "disaster", myanmar: "သဘာဝဘေး" },
        { kanji: "救助", reading: "きゅうじょ", meaning: "rescue", myanmar: "ကယ်ဆယ်ခြင်း" },
        { kanji: "復旧", reading: "ふっきゅう", meaning: "restoration", myanmar: "ပြန်လည်ထူထောင်ခြင်း" },
      ]
    }
  },
  "Week 5": {
    "Day 1": {
      topic: "天気予報 - မိုးလေဝသ",
      cards: [
        { kanji: "天気", reading: "てんき", meaning: "weather", myanmar: "မိုးလေဝသ" },
        { kanji: "予報", reading: "よほう", meaning: "forecast", myanmar: "ခန့်မှန်းချက်" },
        { kanji: "晴れ", reading: "はれ", meaning: "sunny", myanmar: "နေသာသော" },
        { kanji: "曇り", reading: "くもり", meaning: "cloudy", myanmar: "တိမ်ထူသော" },
        { kanji: "雨", reading: "あめ", meaning: "rain", myanmar: "မိုး" },
        { kanji: "雪", reading: "ゆき", meaning: "snow", myanmar: "နှင်း" },
        { kanji: "風", reading: "かぜ", meaning: "wind", myanmar: "လေ" },
        { kanji: "台風", reading: "たいふう", meaning: "typhoon", myanmar: "မုန်တိုင်း" },
        { kanji: "気温", reading: "きおん", meaning: "temperature", myanmar: "အပူချိန်" },
        { kanji: "湿度", reading: "しつど", meaning: "humidity", myanmar: "စိုထိုင်းမှု" },
      ]
    },
    "Day 2": {
      topic: "自然 - သဘာဝ",
      cards: [
        { kanji: "山", reading: "やま", meaning: "mountain", myanmar: "တောင်" },
        { kanji: "川", reading: "かわ", meaning: "river", myanmar: "မြစ်" },
        { kanji: "海", reading: "うみ", meaning: "sea", myanmar: "ပင်လယ်" },
        { kanji: "湖", reading: "みずうみ", meaning: "lake", myanmar: "အင်း" },
        { kanji: "森", reading: "もり", meaning: "forest", myanmar: "သစ်တော" },
        { kanji: "島", reading: "しま", meaning: "island", myanmar: "ကျွန်း" },
        { kanji: "火山", reading: "かざん", meaning: "volcano", myanmar: "မီးတောင်" },
        { kanji: "地球", reading: "ちきゅう", meaning: "earth", myanmar: "ကမ္ဘာ" },
        { kanji: "宇宙", reading: "うちゅう", meaning: "space", myanmar: "အာကာသ" },
        { kanji: "太陽", reading: "たいよう", meaning: "sun", myanmar: "နေ" },
      ]
    },
    "Day 3": {
      topic: "動物・植物 - တိရစ္ဆာန်နှင့်အပင်",
      cards: [
        { kanji: "動物", reading: "どうぶつ", meaning: "animal", myanmar: "တိရစ္ဆာန်" },
        { kanji: "植物", reading: "しょくぶつ", meaning: "plant", myanmar: "အပင်" },
        { kanji: "昆虫", reading: "こんちゅう", meaning: "insect", myanmar: "ပိုးမွှား" },
        { kanji: "鳥", reading: "とり", meaning: "bird", myanmar: "ငှက်" },
        { kanji: "魚", reading: "さかな", meaning: "fish", myanmar: "ငါး" },
        { kanji: "花", reading: "はな", meaning: "flower", myanmar: "ပန်း" },
        { kanji: "木", reading: "き", meaning: "tree", myanmar: "သစ်ပင်" },
        { kanji: "草", reading: "くさ", meaning: "grass", myanmar: "မြက်" },
        { kanji: "種", reading: "たね", meaning: "seed", myanmar: "မျိုးစေ့" },
        { kanji: "根", reading: "ね", meaning: "root", myanmar: "အမြစ်" },
      ]
    },
    "Day 4": {
      topic: "身体 - ခန္ဓာကိုယ်",
      cards: [
        { kanji: "頭", reading: "あたま", meaning: "head", myanmar: "ခေါင်း" },
        { kanji: "顔", reading: "かお", meaning: "face", myanmar: "မျက်နှာ" },
        { kanji: "目", reading: "め", meaning: "eye", myanmar: "မျက်စိ" },
        { kanji: "耳", reading: "みみ", meaning: "ear", myanmar: "နား" },
        { kanji: "鼻", reading: "はな", meaning: "nose", myanmar: "နှာခေါင်း" },
        { kanji: "口", reading: "くち", meaning: "mouth", myanmar: "ပါးစပ်" },
        { kanji: "手", reading: "て", meaning: "hand", myanmar: "လက်" },
        { kanji: "足", reading: "あし", meaning: "foot", myanmar: "ခြေ" },
        { kanji: "心臓", reading: "しんぞう", meaning: "heart", myanmar: "နှလုံး" },
        { kanji: "血液", reading: "けつえき", meaning: "blood", myanmar: "သွေး" },
      ]
    },
    "Day 5": {
      topic: "病気・症状 - ရောဂါ",
      cards: [
        { kanji: "病気", reading: "びょうき", meaning: "illness", myanmar: "ရောဂါ" },
        { kanji: "症状", reading: "しょうじょう", meaning: "symptom", myanmar: "လက္ခဏာ" },
        { kanji: "熱", reading: "ねつ", meaning: "fever", myanmar: "ဖျား" },
        { kanji: "咳", reading: "せき", meaning: "cough", myanmar: "ချောင်းဆိုး" },
        { kanji: "頭痛", reading: "ずつう", meaning: "headache", myanmar: "ခေါင်းကိုက်" },
        { kanji: "怪我", reading: "けが", meaning: "injury", myanmar: "ဒဏ်ရာ" },
        { kanji: "手術", reading: "しゅじゅつ", meaning: "surgery", myanmar: "ခွဲစိတ်မှု" },
        { kanji: "注射", reading: "ちゅうしゃ", meaning: "injection", myanmar: "ဆေးထိုး" },
        { kanji: "薬", reading: "くすり", meaning: "medicine", myanmar: "ဆေး" },
        { kanji: "入院", reading: "にゅういん", meaning: "hospitalization", myanmar: "ဆေးရုံတက်ခြင်း" },
      ]
    },
    "Day 6": {
      topic: "感情 - ခံစားချက်",
      cards: [
        { kanji: "嬉しい", reading: "うれしい", meaning: "happy", myanmar: "ပျော်သော" },
        { kanji: "悲しい", reading: "かなしい", meaning: "sad", myanmar: "ဝမ်းနည်းသော" },
        { kanji: "怒る", reading: "おこる", meaning: "angry", myanmar: "စိတ်ဆိုးသည်" },
        { kanji: "驚く", reading: "おどろく", meaning: "surprised", myanmar: "အံ့သြသည်" },
        { kanji: "心配", reading: "しんぱい", meaning: "worry", myanmar: "စိုးရိမ်မှု" },
        { kanji: "安心", reading: "あんしん", meaning: "relief", myanmar: "စိတ်ချမှု" },
        { kanji: "寂しい", reading: "さびしい", meaning: "lonely", myanmar: "အထီးကျန်သော" },
        { kanji: "恥ずかしい", reading: "はずかしい", meaning: "embarrassed", myanmar: "ရှက်သော" },
        { kanji: "懐かしい", reading: "なつかしい", meaning: "nostalgic", myanmar: "လွမ်းဆွတ်ဖွယ်" },
        { kanji: "感動", reading: "かんどう", meaning: "moved", myanmar: "စိတ်လှုပ်ရှားခြင်း" },
      ]
    }
  },
  "Week 6": {
    "Day 1": {
      topic: "性格 - စရိုက်",
      cards: [
        { kanji: "性格", reading: "せいかく", meaning: "personality", myanmar: "စရိုက်" },
        { kanji: "明るい", reading: "あかるい", meaning: "cheerful", myanmar: "ရွှင်လန်းသော" },
        { kanji: "優しい", reading: "やさしい", meaning: "kind", myanmar: "ကြင်နာသော" },
        { kanji: "厳しい", reading: "きびしい", meaning: "strict", myanmar: "တင်းကျပ်သော" },
        { kanji: "真面目", reading: "まじめ", meaning: "serious", myanmar: "လေးနက်သော" },
        { kanji: "素直", reading: "すなお", meaning: "honest", myanmar: "ရိုးသားသော" },
        { kanji: "我慢", reading: "がまん", meaning: "patience", myanmar: "သည်းခံခြင်း" },
        { kanji: "積極的", reading: "せっきょくてき", meaning: "active", myanmar: "တက်ကြွသော" },
        { kanji: "消極的", reading: "しょうきょくてき", meaning: "passive", myanmar: "တုံ့ဆိုင်းသော" },
        { kanji: "勇気", reading: "ゆうき", meaning: "courage", myanmar: "သတ္တိ" },
      ]
    },
    "Day 2": {
      topic: "人間関係 - လူမှုဆက်ဆံရေး",
      cards: [
        { kanji: "家族", reading: "かぞく", meaning: "family", myanmar: "မိသားစု" },
        { kanji: "親戚", reading: "しんせき", meaning: "relative", myanmar: "ဆွေမျိုး" },
        { kanji: "友人", reading: "ゆうじん", meaning: "friend", myanmar: "သူငယ်ချင်း" },
        { kanji: "恋人", reading: "こいびと", meaning: "lover", myanmar: "ချစ်သူ" },
        { kanji: "夫婦", reading: "ふうふ", meaning: "married couple", myanmar: "လင်မယား" },
        { kanji: "先輩", reading: "せんぱい", meaning: "senior", myanmar: "အကြီးအကဲ" },
        { kanji: "後輩", reading: "こうはい", meaning: "junior", myanmar: "အငယ်တန်း" },
        { kanji: "同僚", reading: "どうりょう", meaning: "colleague", myanmar: "လုပ်ဖော်ကိုင်ဖက်" },
        { kanji: "上司", reading: "じょうし", meaning: "boss", myanmar: "အထက်လူကြီး" },
        { kanji: "部下", reading: "ぶか", meaning: "subordinate", myanmar: "လက်အောက်ငယ်သား" },
      ]
    },
    "Day 3": {
      topic: "生活 - နေထိုင်မှု",
      cards: [
        { kanji: "起きる", reading: "おきる", meaning: "wake up", myanmar: "နိုးသည်" },
        { kanji: "寝る", reading: "ねる", meaning: "sleep", myanmar: "အိပ်သည်" },
        { kanji: "食べる", reading: "たべる", meaning: "eat", myanmar: "စားသည်" },
        { kanji: "飲む", reading: "のむ", meaning: "drink", myanmar: "သောက်သည်" },
        { kanji: "着る", reading: "きる", meaning: "wear", myanmar: "ဝတ်သည်" },
        { kanji: "洗う", reading: "あらう", meaning: "wash", myanmar: "ဆေးသည်" },
        { kanji: "掃除", reading: "そうじ", meaning: "clean", myanmar: "သန့်ရှင်းရေး" },
        { kanji: "料理", reading: "りょうり", meaning: "cooking", myanmar: "ချက်ပြုတ်ခြင်း" },
        { kanji: "買い物", reading: "かいもの", meaning: "shopping", myanmar: "ဈေးဝယ်ခြင်း" },
        { kanji: "散歩", reading: "さんぽ", meaning: "walk", myanmar: "လမ်းလျှောက်ခြင်း" },
      ]
    },
    "Day 4": {
      topic: "趣味 - ဝါသနာ",
      cards: [
        { kanji: "趣味", reading: "しゅみ", meaning: "hobby", myanmar: "ဝါသနာ" },
        { kanji: "旅行", reading: "りょこう", meaning: "travel", myanmar: "ခရီးသွားခြင်း" },
        { kanji: "読書", reading: "どくしょ", meaning: "reading", myanmar: "စာဖတ်ခြင်း" },
        { kanji: "映画", reading: "えいが", meaning: "movie", myanmar: "ရုပ်ရှင်" },
        { kanji: "音楽", reading: "おんがく", meaning: "music", myanmar: "ဂီတ" },
        { kanji: "絵画", reading: "かいが", meaning: "painting", myanmar: "ပန်းချီ" },
        { kanji: "写真", reading: "しゃしん", meaning: "photo", myanmar: "ဓာတ်ပုံ" },
        { kanji: "運動", reading: "うんどう", meaning: "exercise", myanmar: "ကစားခြင်း" },
        { kanji: "釣り", reading: "つり", meaning: "fishing", myanmar: "ငါးမျှားခြင်း" },
        { kanji: "園芸", reading: "えんげい", meaning: "gardening", myanmar: "ဥယျာဉ်စိုက်ပျိုးခြင်း" },
      ]
    },
    "Day 5": {
      topic: "スポーツ - အားကစား",
      cards: [
        { kanji: "野球", reading: "やきゅう", meaning: "baseball", myanmar: "ဘေ့စ်ဘော" },
        { kanji: "水泳", reading: "すいえい", meaning: "swimming", myanmar: "ရေကူး" },
        { kanji: "柔道", reading: "じゅうどう", meaning: "judo", myanmar: "ဂျူဒို" },
        { kanji: "試合", reading: "しあい", meaning: "match", myanmar: "ပွဲစဉ်" },
        { kanji: "練習", reading: "れんしゅう", meaning: "practice", myanmar: "လေ့ကျင့်ခြင်း" },
        { kanji: "優勝", reading: "ゆうしょう", meaning: "championship", myanmar: "ချန်ပီယံ" },
        { kanji: "記録", reading: "きろく", meaning: "record", myanmar: "မှတ်တမ်း" },
        { kanji: "選手", reading: "せんしゅ", meaning: "player", myanmar: "အားကစားသမား" },
        { kanji: "監督", reading: "かんとく", meaning: "coach", myanmar: "နည်းပြ" },
        { kanji: "応援", reading: "おうえん", meaning: "support", myanmar: "အားပေးခြင်း" },
      ]
    },
    "Day 6": {
      topic: "教育 - ပညာရေး",
      cards: [
        { kanji: "教育", reading: "きょういく", meaning: "education", myanmar: "ပညာရေး" },
        { kanji: "学校", reading: "がっこう", meaning: "school", myanmar: "ကျောင်း" },
        { kanji: "授業", reading: "じゅぎょう", meaning: "class", myanmar: "အတန်း" },
        { kanji: "試験", reading: "しけん", meaning: "exam", myanmar: "စာမေးပွဲ" },
        { kanji: "成績", reading: "せいせき", meaning: "grades", myanmar: "အမှတ်" },
        { kanji: "卒業", reading: "そつぎょう", meaning: "graduation", myanmar: "ကျောင်းပြီးခြင်း" },
        { kanji: "入学", reading: "にゅうがく", meaning: "enrollment", myanmar: "ကျောင်းဝင်ခြင်း" },
        { kanji: "専門", reading: "せんもん", meaning: "specialty", myanmar: "အထူးပြု" },
        { kanji: "研究", reading: "けんきゅう", meaning: "research", myanmar: "သုတေသန" },
        { kanji: "奨学金", reading: "しょうがくきん", meaning: "scholarship", myanmar: "ပညာသင်ဆု" },
      ]
    }
  },
  "Week 7": {
    "Day 1": {
      topic: "仕事 - အလုပ်",
      cards: [
        { kanji: "仕事", reading: "しごと", meaning: "work", myanmar: "အလုပ်" },
        { kanji: "会議", reading: "かいぎ", meaning: "meeting", myanmar: "အစည်းအဝေး" },
        { kanji: "出張", reading: "しゅっちょう", meaning: "business trip", myanmar: "ခရီးထွက်" },
        { kanji: "残業", reading: "ざんぎょう", meaning: "overtime", myanmar: "အချိန်ပိုလုပ်ခြင်း" },
        { kanji: "休暇", reading: "きゅうか", meaning: "vacation", myanmar: "အားလပ်ရက်" },
        { kanji: "退職", reading: "たいしょく", meaning: "retirement", myanmar: "အငြိမ်းစား" },
        { kanji: "昇進", reading: "しょうしん", meaning: "promotion", myanmar: "ရာထူးတိုးခြင်း" },
        { kanji: "転職", reading: "てんしょく", meaning: "job change", myanmar: "အလုပ်ပြောင်းခြင်း" },
        { kanji: "報告", reading: "ほうこく", meaning: "report", myanmar: "အစီရင်ခံခြင်း" },
        { kanji: "相談", reading: "そうだん", meaning: "consultation", myanmar: "တိုင်ပင်ခြင်း" },
      ]
    },
    "Day 2": {
      topic: "お金 - ငွေကြေး",
      cards: [
        { kanji: "銀行", reading: "ぎんこう", meaning: "bank", myanmar: "ဘဏ်" },
        { kanji: "口座", reading: "こうざ", meaning: "account", myanmar: "အကောင့်" },
        { kanji: "貯金", reading: "ちょきん", meaning: "savings", myanmar: "စုဆောင်းငွေ" },
        { kanji: "借金", reading: "しゃっきん", meaning: "debt", myanmar: "အကြွေး" },
        { kanji: "利子", reading: "りし", meaning: "interest", myanmar: "အတိုး" },
        { kanji: "為替", reading: "かわせ", meaning: "exchange rate", myanmar: "ငွေလဲနှုန်း" },
        { kanji: "領収書", reading: "りょうしゅうしょ", meaning: "receipt", myanmar: "ပြေစာ" },
        { kanji: "請求書", reading: "せいきゅうしょ", meaning: "invoice", myanmar: "ပြေစာတောင်းခံလွှာ" },
        { kanji: "支払い", reading: "しはらい", meaning: "payment", myanmar: "ငွေပေးချေခြင်း" },
        { kanji: "振り込み", reading: "ふりこみ", meaning: "transfer", myanmar: "ငွေလွှဲခြင်း" },
      ]
    },
    "Day 3": {
      topic: "住居 - နေအိမ်",
      cards: [
        { kanji: "住居", reading: "じゅうきょ", meaning: "residence", myanmar: "နေအိမ်" },
        { kanji: "家賃", reading: "やちん", meaning: "rent", myanmar: "အိမ်ခ" },
        { kanji: "引っ越し", reading: "ひっこし", meaning: "moving", myanmar: "အိမ်ပြောင်းခြင်း" },
        { kanji: "不動産", reading: "ふどうさん", meaning: "real estate", myanmar: "အိမ်ခြံမြေ" },
        { kanji: "間取り", reading: "まどり", meaning: "layout", myanmar: "အခန်းဖွဲ့စည်းပုံ" },
        { kanji: "設備", reading: "せつび", meaning: "facilities", myanmar: "အဆောက်အအုံ" },
        { kanji: "修理", reading: "しゅうり", meaning: "repair", myanmar: "ပြုပြင်ခြင်း" },
        { kanji: "騒音", reading: "そうおん", meaning: "noise", myanmar: "ဆူညံသံ" },
        { kanji: "隣人", reading: "りんじん", meaning: "neighbor", myanmar: "အိမ်နီးချင်း" },
        { kanji: "管理人", reading: "かんりにん", meaning: "manager", myanmar: "စီမံသူ" },
      ]
    },
    "Day 4": {
      topic: "交通 - သယ်ယူပို့ဆောင်ရေး",
      cards: [
        { kanji: "交通", reading: "こうつう", meaning: "traffic", myanmar: "သယ်ယူပို့ဆောင်ရေး" },
        { kanji: "電車", reading: "でんしゃ", meaning: "train", myanmar: "ရထား" },
        { kanji: "自転車", reading: "じてんしゃ", meaning: "bicycle", myanmar: "စက်ဘီး" },
        { kanji: "運転", reading: "うんてん", meaning: "driving", myanmar: "မောင်းနှင်ခြင်း" },
        { kanji: "免許", reading: "めんきょ", meaning: "license", myanmar: "လိုင်စင်" },
        { kanji: "渋滞", reading: "じゅうたい", meaning: "traffic jam", myanmar: "ယာဉ်ကြောပိတ်ခြင်း" },
        { kanji: "事故", reading: "じこ", meaning: "accident", myanmar: "မတော်တဆမှု" },
        { kanji: "信号", reading: "しんごう", meaning: "signal", myanmar: "မီးပွိုင့်" },
        { kanji: "横断歩道", reading: "おうだんほどう", meaning: "crosswalk", myanmar: "လူကူးမျဉ်းကြား" },
        { kanji: "駐車", reading: "ちゅうしゃ", meaning: "parking", myanmar: "ကားရပ်ခြင်း" },
      ]
    },
    "Day 5": {
      topic: "通信 - ဆက်သွယ်ရေး",
      cards: [
        { kanji: "電話", reading: "でんわ", meaning: "telephone", myanmar: "ဖုန်း" },
        { kanji: "携帯", reading: "けいたい", meaning: "mobile", myanmar: "မိုဘိုင်း" },
        { kanji: "送信", reading: "そうしん", meaning: "send", myanmar: "ပို့ခြင်း" },
        { kanji: "受信", reading: "じゅしん", meaning: "receive", myanmar: "လက်ခံခြင်း" },
        { kanji: "添付", reading: "てんぷ", meaning: "attach", myanmar: "ပူးတွဲခြင်း" },
        { kanji: "削除", reading: "さくじょ", meaning: "delete", myanmar: "ဖျက်ခြင်း" },
        { kanji: "検索", reading: "けんさく", meaning: "search", myanmar: "ရှာဖွေခြင်း" },
        { kanji: "接続", reading: "せつぞく", meaning: "connect", myanmar: "ချိတ်ဆက်ခြင်း" },
        { kanji: "更新", reading: "こうしん", meaning: "update", myanmar: "အဆင့်မြှင့်ခြင်း" },
        { kanji: "設定", reading: "せってい", meaning: "setting", myanmar: "သတ်မှတ်ခြင်း" },
      ]
    },
    "Day 6": {
      topic: "買い物 - ဈေးဝယ်ခြင်း",
      cards: [
        { kanji: "店", reading: "みせ", meaning: "store", myanmar: "ဆိုင်" },
        { kanji: "値段", reading: "ねだん", meaning: "price", myanmar: "ဈေးနှုန်း" },
        { kanji: "割引", reading: "わりびき", meaning: "discount", myanmar: "လျှော့စျေး" },
        { kanji: "税込み", reading: "ぜいこみ", meaning: "tax included", myanmar: "အခွန်ပါ" },
        { kanji: "現金", reading: "げんきん", meaning: "cash", myanmar: "ငွေသား" },
        { kanji: "返品", reading: "へんぴん", meaning: "return", myanmar: "ပြန်အပ်ခြင်း" },
        { kanji: "交換", reading: "こうかん", meaning: "exchange", myanmar: "လဲလှယ်ခြင်း" },
        { kanji: "品質", reading: "ひんしつ", meaning: "quality", myanmar: "အရည်အသွေး" },
        { kanji: "保証", reading: "ほしょう", meaning: "warranty", myanmar: "အာမခံ" },
        { kanji: "在庫", reading: "ざいこ", meaning: "stock", myanmar: "ကုန်ပစ္စည်းလက်ကျန်" },
      ]
    }
  },
  "Week 8": {
    "Day 1": {
      topic: "食事 - အစားအသောက်",
      cards: [
        { kanji: "食事", reading: "しょくじ", meaning: "meal", myanmar: "အစားအသောက်" },
        { kanji: "朝食", reading: "ちょうしょく", meaning: "breakfast", myanmar: "မနက်စာ" },
        { kanji: "昼食", reading: "ちゅうしょく", meaning: "lunch", myanmar: "နေ့လည်စာ" },
        { kanji: "夕食", reading: "ゆうしょく", meaning: "dinner", myanmar: "ညစာ" },
        { kanji: "和食", reading: "わしょく", meaning: "Japanese food", myanmar: "ဂျပန်အစား" },
        { kanji: "味", reading: "あじ", meaning: "taste", myanmar: "အရသာ" },
        { kanji: "栄養", reading: "えいよう", meaning: "nutrition", myanmar: "အာဟာရ" },
        { kanji: "材料", reading: "ざいりょう", meaning: "ingredients", myanmar: "ပါဝင်ပစ္စည်း" },
        { kanji: "調味料", reading: "ちょうみりょう", meaning: "seasoning", myanmar: "ဟင်းခတ်အမွှေး" },
        { kanji: "新鮮", reading: "しんせん", meaning: "fresh", myanmar: "လတ်ဆတ်သော" },
      ]
    },
    "Day 2": {
      topic: "レストラン - စားသောက်ဆိုင်",
      cards: [
        { kanji: "予約", reading: "よやく", meaning: "reservation", myanmar: "ကြိုတင်မှာခြင်း" },
        { kanji: "注文", reading: "ちゅうもん", meaning: "order", myanmar: "မှာခြင်း" },
        { kanji: "定食", reading: "ていしょく", meaning: "set meal", myanmar: "အစုံထမင်း" },
        { kanji: "会計", reading: "かいけい", meaning: "bill", myanmar: "ငွေရှင်းခြင်း" },
        { kanji: "禁煙", reading: "きんえん", meaning: "no smoking", myanmar: "ဆေးလိပ်မသောက်ရ" },
        { kanji: "個室", reading: "こしつ", meaning: "private room", myanmar: "သီးသန့်အခန်း" },
        { kanji: "席", reading: "せき", meaning: "seat", myanmar: "ထိုင်ခုံ" },
        { kanji: "満席", reading: "まんせき", meaning: "full", myanmar: "ပြည့်သော" },
        { kanji: "空席", reading: "くうせき", meaning: "empty seat", myanmar: "လွတ်နေသော" },
        { kanji: "混雑", reading: "こんざつ", meaning: "crowded", myanmar: "လူစည်သော" },
      ]
    },
    "Day 3": {
      topic: "旅行 - ခရီးသွားခြင်း",
      cards: [
        { kanji: "旅行", reading: "りょこう", meaning: "travel", myanmar: "ခရီးသွားခြင်း" },
        { kanji: "観光", reading: "かんこう", meaning: "sightseeing", myanmar: "ခရီးသွားလုပ်ငန်း" },
        { kanji: "宿泊", reading: "しゅくはく", meaning: "stay", myanmar: "တည်းခိုခြင်း" },
        { kanji: "案内所", reading: "あんないじょ", meaning: "information", myanmar: "သတင်းအချက်အလက်" },
        { kanji: "地図", reading: "ちず", meaning: "map", myanmar: "မြေပုံ" },
        { kanji: "お土産", reading: "おみやげ", meaning: "souvenir", myanmar: "လက်ဆောင်" },
        { kanji: "名所", reading: "めいしょ", meaning: "famous place", myanmar: "နာမည်ကြီးနေရာ" },
        { kanji: "温泉", reading: "おんせん", meaning: "hot spring", myanmar: "ရေပူစမ်း" },
        { kanji: "景色", reading: "けしき", meaning: "scenery", myanmar: "ရှုခင်း" },
        { kanji: "記念", reading: "きねん", meaning: "memorial", myanmar: "အမှတ်တရ" },
      ]
    },
    "Day 4": {
      topic: "イベント - ပွဲတော်",
      cards: [
        { kanji: "祭り", reading: "まつり", meaning: "festival", myanmar: "ပွဲတော်" },
        { kanji: "花火", reading: "はなび", meaning: "fireworks", myanmar: "မီးရှူး" },
        { kanji: "正月", reading: "しょうがつ", meaning: "New Year", myanmar: "နှစ်သစ်" },
        { kanji: "誕生日", reading: "たんじょうび", meaning: "birthday", myanmar: "မွေးနေ့" },
        { kanji: "結婚式", reading: "けっこんしき", meaning: "wedding", myanmar: "မင်္ဂလာဆောင်" },
        { kanji: "招待", reading: "しょうたい", meaning: "invitation", myanmar: "ဖိတ်ကြားခြင်း" },
        { kanji: "参加", reading: "さんか", meaning: "participation", myanmar: "ပါဝင်ခြင်း" },
        { kanji: "贈り物", reading: "おくりもの", meaning: "gift", myanmar: "လက်ဆောင်" },
        { kanji: "挨拶", reading: "あいさつ", meaning: "greeting", myanmar: "နှုတ်ဆက်ခြင်း" },
        { kanji: "感謝", reading: "かんしゃ", meaning: "gratitude", myanmar: "ကျေးဇူးတင်ခြင်း" },
      ]
    },
    "Day 5": {
      topic: "宗教・文化 - ဘာသာရေးနှင့်ယဉ်ကျေးမှု",
      cards: [
        { kanji: "宗教", reading: "しゅうきょう", meaning: "religion", myanmar: "ဘာသာရေး" },
        { kanji: "神社", reading: "じんじゃ", meaning: "shrine", myanmar: "ရှင်းတိုး" },
        { kanji: "寺", reading: "てら", meaning: "temple", myanmar: "ဘုရားကျောင်း" },
        { kanji: "伝統", reading: "でんとう", meaning: "tradition", myanmar: "ရိုးရာ" },
        { kanji: "習慣", reading: "しゅうかん", meaning: "custom", myanmar: "ဓလေ့ထုံးစံ" },
        { kanji: "芸術", reading: "げいじゅつ", meaning: "art", myanmar: "အနုပညာ" },
        { kanji: "美術館", reading: "びじゅつかん", meaning: "art museum", myanmar: "ပြတိုက်" },
        { kanji: "博物館", reading: "はくぶつかん", meaning: "museum", myanmar: "ပြတိုက်" },
        { kanji: "歴史", reading: "れきし", meaning: "history", myanmar: "သမိုင်း" },
        { kanji: "文化", reading: "ぶんか", meaning: "culture", myanmar: "ယဉ်ကျေးမှု" },
      ]
    },
    "Day 6": {
      topic: "総復習 - စုစုပေါင်းပြန်လည်လေ့လာခြင်း",
      cards: [
        { kanji: "復習", reading: "ふくしゅう", meaning: "review", myanmar: "ပြန်လည်လေ့လာခြင်း" },
        { kanji: "漢字", reading: "かんじ", meaning: "kanji", myanmar: "ခန်းဂျိ" },
        { kanji: "読み方", reading: "よみかた", meaning: "reading", myanmar: "ဖတ်နည်း" },
        { kanji: "書き方", reading: "かきかた", meaning: "writing", myanmar: "ရေးနည်း" },
        { kanji: "意味", reading: "いみ", meaning: "meaning", myanmar: "အဓိပ္ပါယ်" },
        { kanji: "例文", reading: "れいぶん", meaning: "example", myanmar: "ဥပမာစာကြောင်း" },
        { kanji: "練習", reading: "れんしゅう", meaning: "practice", myanmar: "လေ့ကျင့်ခြင်း" },
        { kanji: "合格", reading: "ごうかく", meaning: "pass", myanmar: "အောင်မြင်ခြင်း" },
        { kanji: "頑張る", reading: "がんばる", meaning: "do your best", myanmar: "အားထုတ်ပါ" },
        { kanji: "努力", reading: "どりょく", meaning: "effort", myanmar: "ကြိုးစားမှု" },
      ]
    }
  }
};

export default function KanjiFlashcardApp() {
  const [selectedWeek, setSelectedWeek] = useState("Week 1");
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [studyMode, setStudyMode] = useState("browse"); // browse, quiz
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [knownCards, setKnownCards] = useState(new Set());

  const weeks = Object.keys(kanjiData);
  const days = Object.keys(kanjiData[selectedWeek] || {});
  const currentDayData = kanjiData[selectedWeek]?.[selectedDay];
  const cards = currentDayData?.cards || [];
  const currentCard = cards[currentCardIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setShowReading(false);
    setCurrentCardIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowReading(false);
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnown = () => {
    const cardId = `${selectedWeek}-${selectedDay}-${currentCardIndex}`;
    setKnownCards((prev) => new Set([...prev, cardId]));
    setScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    handleNext();
  };

  const handleUnknown = () => {
    setScore((prev) => ({ ...prev, total: prev.total + 1 }));
    handleNext();
  };

  const resetProgress = () => {
    setKnownCards(new Set());
    setScore({ correct: 0, total: 0 });
    setCurrentCardIndex(0);
  };

  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowReading(false);
  }, [selectedWeek, selectedDay]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            日本語総まとめ N2
          </h1>
          <h2 className="text-xl md:text-2xl text-purple-300 font-light">
            Kanji Flash Cards • မြန်မာဘာသာပြန်
          </h2>
        </div>

        {/* Week & Day Selection */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <div className="flex gap-2 flex-wrap justify-center">
            {weeks.map((week) => (
              <button
                key={week}
                onClick={() => {
                  setSelectedWeek(week);
                  setSelectedDay(Object.keys(kanjiData[week])[0]);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedWeek === week
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg shadow-purple-500/30"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {week}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                selectedDay === day
                  ? "bg-cyan-500/80 shadow-lg shadow-cyan-500/30"
                  : "bg-white/5 hover:bg-white/15"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Topic */}
        {currentDayData && (
          <div className="text-center mb-6 px-4">
            <p className="text-purple-300/80 text-sm md:text-base">
              📚 {currentDayData.topic}
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-purple-300 mb-2">
            <span>
              Card {currentCardIndex + 1} of {cards.length}
            </span>
            <span>
              ✓ {score.correct} / {score.total}
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${((currentCardIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flash Card */}
        {currentCard && (
          <div className="perspective-1000 mb-6">
            <div
              onClick={handleFlip}
              className={`relative w-full aspect-[4/3] md:aspect-[16/9] cursor-pointer transition-transform duration-700 transform-style-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front of Card */}
              <div
                className="absolute inset-0 rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div className="text-6xl md:text-9xl font-bold mb-4 text-white drop-shadow-lg">
                  {currentCard.kanji}
                </div>
                {showReading && (
                  <div className="text-2xl md:text-3xl text-cyan-300 animate-fade-in">
                    {currentCard.reading}
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowReading(!showReading);
                  }}
                  className="mt-4 px-4 py-2 bg-white/90 text-purple-800 text-sm font-semibold rounded-lg shadow-md transition transform hover:scale-105 active:scale-95"
                >
                  {showReading ? "အသံဖတ်ပုံဖျောက်ရန်" : "အသံဖတ်ပုံပြရန်"} 👁️
                </button>
                <p className="absolute bottom-4 text-purple-300/50 text-sm">
                  Click to flip • လှန်ရန်နှိပ်ပါ
                </p>
              </div>

              {/* Back of Card */}
              <div
                className="absolute inset-0 rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div className="text-4xl md:text-6xl font-bold mb-3 text-white">
                  {currentCard.kanji}
                </div>
                <div className="text-xl md:text-2xl text-cyan-300 mb-2">
                  {currentCard.reading}
                </div>
                <div className="text-lg md:text-xl text-purple-200 mb-2">
                  {currentCard.meaning}
                </div>
                <div className="text-xl md:text-2xl text-yellow-300 font-medium mt-2 px-4 py-2 bg-white/10 rounded-xl">
                  🇲🇲 {currentCard.myanmar}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handlePrev}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 flex items-center gap-2"
          >
            ← နောက်သို့
          </button>
          <button
            onClick={handleFlip}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30"
          >
            🔄 လှန်ရန်
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 flex items-center gap-2"
          >
            ရှေ့သို့ →
          </button>
        </div>

        {/* Quiz Mode Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleUnknown}
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded-xl transition-all duration-300 text-red-300"
          >
            ❌ မသိသေး
          </button>
          <button
            onClick={handleKnown}
            className="px-6 py-3 bg-green-500/20 hover:bg-green-500/40 border border-green-500/50 rounded-xl transition-all duration-300 text-green-300"
          >
            ✓ သိပြီ
          </button>
        </div>

        {/* Stats & Reset */}
        <div className="text-center">
          <button
            onClick={resetProgress}
            className="mt-4 px-4 py-2 bg-slate-700 text-white text-sm rounded-lg shadow transition transform hover:scale-105 active:scale-95"
          >
            🔄 အစကပြန်စရန်
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-purple-300/40 text-sm">
          <p>N2 日本語総まとめ 漢字 Flash Card App</p>
          <p>Data source: Hla Hla Htay's Notes</p>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}