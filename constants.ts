
import { Module, Cycle, PerspectiveType } from './types';

export const CYCLES: Cycle[] = [
  { id: 1, title: '第一循環：世界是否值得信任？', description: '探討因果、努力與公義的根基。' },
  { id: 2, title: '第二循環：人如何活在有限中？', description: '探討時間、言語、財富與成功的界限。' },
  { id: 3, title: '第三循環：當人生開始崩塌', description: '面對痛苦、沈默與神學的崩解。' },
  { id: 4, title: '第四循環：成熟的信仰如何整合？', description: '智慧的辨識、修正與生命定位。' }
];

export const MODULES: Module[] = [
  // 第一循環 (1-6)
  {
    id: 1,
    cycleId: 1,
    title: '第 1 課｜什麼是智慧？',
    subtitle: '敬畏、失效與苦難中的尋求',
    lifeQuestions: ['你覺得一個「有智慧」的人應該具備什麼樣的特徵？', '當你做對了所有事結果卻不如預期時，你會懷疑自己嗎？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '敬畏是起點', description: '「敬畏耶和華是知識的開端。」學習規律與敬虔能帶來有序的人生. ' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '智慧仍會失效', description: '「智慧人死亡，與愚昧人無異。」智慧有其限制，不能保證掌控結果。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '智慧不能避免苦難', description: '約伯完全正直卻失去一切，智慧在此刻沈默，甚至成為被嘲諷的對象。' }
    },
    tensionGuide: '箴言給我們地圖，傳道書告訴我們天氣會變，約伯記提醒我們地圖有時會被撕碎。',
    discussionPrompts: ['這三種視角中，哪一種最符合你現在的生活狀態？'],
    summary: '智慧不是一套永遠正確的公式，而是在秩序與崩潰之間選擇誠實。'
  },
  {
    id: 2,
    cycleId: 1,
    title: '第 2 課｜因果報應是真的嗎？',
    subtitle: '當善惡與報償不再掛鉤',
    lifeQuestions: ['你相信「好人有好報」嗎？', '看到壞人飛黃騰達，你的第一反應是什麼？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '善惡有別', description: '行為的後果是社會秩序的基石，義人的路如晨光。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '義人受苦', description: '「有義人行義，反而滅亡。」現實中因果鏈條經常斷裂。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '義人崩潰', description: '約伯友人堅持因果論（受苦必因有罪），約伯拒絕這種廉價的解釋。' }
    },
    tensionGuide: '因果是生活的指引，但不是用來審判他人痛苦的工具。',
    discussionPrompts: ['當「因果」失效時，是什麼支撐你繼續做對的事？'],
    summary: '信仰不是投資，而是即便在混亂中仍選擇善良。'
  },
  {
    id: 3,
    cycleId: 1,
    title: '第 3 課｜努力是否有意義？',
    subtitle: '在勤奮、捕風與失去之間',
    lifeQuestions: ['你是否曾經非常努力卻換來一場空？', '如果努力不保證成功，你還會繼續嗎？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '勤奮蒙福', description: '「手勤的，卻要富足。」這是生活的常規。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '勞碌捕風', description: '成就終將消逝，誰知道後人是智慧還是愚昧？' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '努力仍失去一切', description: '約伯在努力經營家庭與信仰多年後，一夕之間化為烏有。' }
    },
    tensionGuide: '勤奮是態度，但結果不在我們手中。',
    discussionPrompts: ['如何在「虛空」的感覺中找到工作的喜樂？'],
    summary: '工作是上帝的禮物，但不是我們的救贖。'
  },
  {
    id: 4,
    cycleId: 1,
    title: '第 4 課｜品格能保護人嗎？',
    subtitle: '正直的界限與價值',
    lifeQuestions: ['你覺得「正直」在現代社會是優勢還是劣勢？', '你曾因為堅持原則而受損嗎？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '義人的路', description: '「正直人的純正必引導自己。」品格是安全的避風港。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '正直不保證結果', description: '「不要行義過分，何必自取毀滅？」提醒過度理想化的危險。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '完全人仍被擊打', description: '上帝稱讚約伯，但這份稱讚卻引發了撒旦的試煉。' }
    },
    tensionGuide: '品格不是為了逃避痛苦，而是為了在痛苦中仍能昂首。',
    discussionPrompts: ['如果「上帝的稱讚」帶來了苦難，你能接受嗎？'],
    summary: '品格的價值不在於其帶來的利益，而在於其本身的真實。'
  },
  {
    id: 5,
    cycleId: 1,
    title: '第 5 課｜世界是否公平？',
    subtitle: '正義秩序、不公常態與極限',
    lifeQuestions: ['當你看到不公義的事發生，你最深的憤怒是什麼？', '你如何定義「公平」？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '正義秩序', description: '「公平的升和秤都屬耶和華。」上帝是最終的平衡者。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '不公平是常態', description: '「我見權力位下有奸惡。」在人間不要對公平抱持過高期待。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '不公平的極限', description: '約伯質問上帝：為什麼惡人長壽？他在痛苦中向天庭上訴。' }
    },
    tensionGuide: '世界的不公平不代表上帝不在場，而是人類處於破碎的狀態。',
    discussionPrompts: ['在不公平的世界裡，我們該如何行公義？'],
    summary: '公義不是即時的演算結果，而是終極的盼望。'
  },
  {
    id: 6,
    cycleId: 1,
    title: '第 6 課｜信仰給的是答案還是方向？',
    subtitle: '三卷書的信仰功能總結',
    lifeQuestions: ['你來到信仰中是為了找「解決方案」還是「生命道路」？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '生活指南', description: '教我們如何負責任地生活。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '眼界擴張', description: '教我們看透名利的虛幻。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '沈默中的同在', description: '教我們在神沈默時如何哀慟與堅持。' }
    },
    tensionGuide: '成熟的信仰必須同時容納這三卷書的聲音。',
    discussionPrompts: ['這六堂課下來，你對「智慧」的定義有改變嗎？'],
    summary: '聖經的智慧不是給你一套模式正確的答案，而是在不同人生狀態中，你領悟該用哪一種誠實來活。'
  },

  // 第二循環 (7-12)
  {
    id: 7,
    cycleId: 2,
    title: '第 7 課｜時間與時機',
    subtitle: '把握機會、凡事有時與時機被奪',
    lifeQuestions: ['你是否常感到被時間追趕？', '你曾經歷過「錯的時間遇到對的事」嗎？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '把握機會', description: '「夏天聚斂的是智慧之子。」強調勤奮與對時機的主動把握。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '凡事有時', description: '「生有時，死有時。」強調時間的節奏不在人手中，只能順應。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '時機被奪走', description: '約伯的「好時機」在一夕間崩解，他的哀悼是在被奪走的時光中掙扎。' }
    },
    tensionGuide: '積極把握與順服節奏並不衝突，關鍵在於認清主權歸誰。',
    discussionPrompts: ['你現在處於什麼樣的「時」？是栽種、還是撥出的時候？'],
    summary: '智慧是學會與上帝的時間表同步。'
  },
  {
    id: 8,
    cycleId: 2,
    title: '第 8 課｜言語與沉默',
    subtitle: '說話的力量與沈默的智慧',
    lifeQuestions: ['你曾被言語傷害過嗎？', '你是否發現有時候沈默比辯解更有力？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '言語的力量', description: '「生死在舌頭的權下。」強調說話的責任與造就人的能力。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '沉默的智慧', description: '「在神面前不可冒失開口。」強調對奧秘的敬畏與少言。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '朋友的錯話', description: '約伯友人的神學大道理成為「累人的安慰者」，他們的說話反而成為傷害。' }
    },
    tensionGuide: '話語能救人也能殺人，沈默能同情也能冷漠。',
    discussionPrompts: ['如何判斷何時該說，何時該靜默？'],
    summary: '最高級的說話是帶來醫治，最高級的沈默是帶來同在。'
  },
  {
    id: 9,
    cycleId: 2,
    title: '第 9 課｜財富與失去',
    subtitle: '秩序中的財富與虛空中的擁有',
    lifeQuestions: ['如果財產一夕歸零，你還剩下什麼？', '你如何平衡「努力賺錢」與「不被財富奴役」？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '財富的秩序', description: '「尊榮、長壽、富貴」常被視為智慧的賞賜。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '財富的虛空', description: '「貪愛銀子的，不因得銀子知足。」富足反而讓人睡不著覺。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '一夕失去', description: '「賞賜的是耶和華，收取的也是耶和華。」約伯展示了赤身而出的尊嚴。' }
    },
    tensionGuide: '財富是工具而非目的，是上帝的託付而非個人的成就。',
    discussionPrompts: ['你曾因金錢失去過平安嗎？如何找回？'],
    summary: '我們不擁有財富，我們只是財富暫時的管家。'
  },
  {
    id: 10,
    cycleId: 2,
    title: '第 10 課｜成功與失敗',
    subtitle: '成功的模式與失敗的無辜',
    lifeQuestions: ['你如何定義「成功」？', '你曾見過無辜的失敗嗎？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '成功的模式', description: '規律生活、敬畏神、勤奮工作，路徑清晰可循。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '成功的空洞', description: '「我為自己修造大工程...誰知都是虛空。」登頂後的失落是常態。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '失敗的無辜', description: '約伯的崩塌不是因為錯誤，而是超自然的角力。' }
    },
    tensionGuide: '成功的路徑值得學習，但不能神格化；失敗的痛苦需要同理，不能標籤化。',
    discussionPrompts: ['當你失敗時，你會先自責還是尋求神？'],
    summary: '上帝看重的是我們在成敗中的忠誠，而非結果。'
  },
  {
    id: 11,
    cycleId: 2,
    title: '第 11 課｜享受人生對嗎？',
    subtitle: '在有限中尋找喜樂',
    lifeQuestions: ['在壓力巨大的生活中，尋找「小確幸」是否顯得自私或奢侈？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '節制中的喜樂', description: '「吃素菜彼此相愛，強如吃肥牛彼此相恨。」喜樂源於關係與節制。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '有限中的享受', description: '「在你虛空的年日，當與你所愛的妻快活度日。」這是人在虛空中應得的分。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '痛苦中無法享受', description: '約伯的身體與心靈痛苦到求死，展現了人類受苦的真實界限。' }
    },
    tensionGuide: '享受不是逃避現實，而是對上帝恩典的感謝。',
    discussionPrompts: ['你最近一次感受到純粹的驚喜與快樂是什麼時候？'],
    summary: '在虛空中仍能喜樂，是靈魂的最高抵抗。'
  },
  {
    id: 12,
    cycleId: 2,
    title: '第 12 課｜敬畏是什麼？',
    subtitle: '三卷書中敬畏的不同樣貌',
    lifeQuestions: ['你對神的敬畏是源於「害怕被罰」還是「讚嘆祂的偉大」？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '道德的敬畏', description: '敬畏神就是恨惡罪惡，帶來紀律與長壽。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '奧祕的敬畏', description: '神在天上，你在地下，所以你的言語要少。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '旋風中的敬畏', description: '在無法解釋的苦難中，見到神後的沈默與臣服。' }
    },
    tensionGuide: '敬畏從守規矩開始，在面對奧祕時昇華。',
    discussionPrompts: ['哪一種敬畏的樣貌最能幫助你面對現在的難關？'],
    summary: '敬畏是知道自己在上帝面前的正確位置。'
  },

  // 第三循環 (13-18)
  {
    id: 13,
    cycleId: 3,
    title: '第 13 課｜痛苦是否有意義？',
    subtitle: '痛苦的教育性與荒謬性',
    lifeQuestions: ['痛苦真的能讓人成長嗎？還是只是單純的毀滅？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '痛苦的教育性', description: '「耶和華所愛的，他必責備。」痛苦有時是為了矯正錯誤。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '痛苦的荒謬性', description: '「在日光之下，這也是一件虛空。」有時痛苦就是發生了，沒有理由。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '痛苦的抗議', description: '約伯拒絕接受廉價的理由，他的痛苦是向上帝大聲呼求與辯論。' }
    },
    tensionGuide: '痛苦可能有意義，但不一定要馬上找到意義。',
    discussionPrompts: ['你曾有過那種「找不到理由」的痛苦經驗嗎？當時如何度過？'],
    summary: '意義有時不在理由裡，而在上帝的沈默陪伴中。'
  },
  {
    id: 14,
    cycleId: 3,
    title: '第 14 課｜為什麼是我？',
    subtitle: '三種回答的張力與不足',
    lifeQuestions: ['當不幸發生，你的第一個念頭是「我做錯了什麼」嗎？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '檢視自我', description: '智慧邀請我們反省行為與後果。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '時運隨機', description: '「時日與機會」隨機臨到眾人，不要過度解讀。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '靈界的奧秘', description: '人的視角有限，看不見雲層之上的對話。' }
    },
    tensionGuide: '「為什麼」往往沒有終極答案，只有終極的託付。',
    discussionPrompts: ['如果上帝不告訴你原因，你還能繼續相信祂嗎？'],
    summary: '問題是「為什麼是我」，答案可能是「我與你同在」。'
  },
  {
    id: 15,
    cycleId: 3,
    title: '第 15 課｜向神抱怨可以嗎？',
    subtitle: '克制、直言與抗辯',
    lifeQuestions: ['你敢在禱告中對上帝誠實生氣嗎？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '言語的克制', description: '「愚昧人怒氣全發。」強調情緒的管理與敬虔的儀態。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '真實的直言', description: '「在神面前不可冒失，心也不可急促。」雖然直言，但存敬畏。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '劇烈的抗辯', description: '約伯咒詛自己的生日，質問神的公義，這也是一種深度的敬拜。' }
    },
    tensionGuide: '最深處的抗辯往往源於最深處的相信（相信神是公義的）。',
    discussionPrompts: ['誠實的憤怒與不敬的褻瀆，界限在哪裡？'],
    summary: '上帝能承載你的憤怒，但祂不能承載你的偽裝。'
  },
  {
    id: 16,
    cycleId: 3,
    title: '第 16 課｜神的沉默',
    subtitle: '面對無回應的生命階段',
    lifeQuestions: ['你曾有過禱告像撞在銅牆鐵壁上的經驗嗎？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '話語已備', description: '神已將規律寫在世界中，尋求就必尋見。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '巨大的距離', description: '神在天上，距離本身就是一種沈默的威嚴。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '旋風前的寂靜', description: '在最黑暗的時刻，神完全沈默，直到最後才親自發聲。' }
    },
    tensionGuide: '沈默不代表缺席，而是更深層次的臨在。',
    discussionPrompts: ['在沈默中，你學會了什麼關於信心的事？'],
    summary: '神的沈默有時是為了讓我們聽見自己靈魂最深的渴望。'
  },
  {
    id: 17,
    cycleId: 3,
    title: '第 17 課｜錯誤的安慰',
    subtitle: '當神學變成暴力',
    lifeQuestions: ['你聽過最讓你反感的「屬靈安慰」是什麼？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '被誤用的原理', description: '拿箴言當公式去套別人的痛苦，常造成二次傷害。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '被誤解的虛空', description: '拿虛空當藉口叫人「看開一點」，是廉價的消極。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '友人的神學暴力', description: '為了保護自己的神學框架，不惜定罪受苦的朋友。' }
    },
    tensionGuide: '真理若沒有愛，就不是真理。',
    discussionPrompts: ['當朋友受苦時，除了說話，我們還能做什麼？'],
    summary: '最好的陪伴是坐在灰塵中沈默七天，而非說教。'
  },
  {
    id: 18,
    cycleId: 3,
    title: '第 18 課｜沒有答案的信仰',
    subtitle: '信仰是否一定要解釋世界？',
    lifeQuestions: ['如果你的一生都找不到某些痛苦的解釋，你還會繼續跟隨嗎？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '理性的秩序', description: '信仰提供了一種理解世界的和諧視角。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '認知的極限', description: '人不能查出神自始至總的作為，要接受有限。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '超越解釋的相遇', description: '「我從前風聞有你，現在親眼看見你。」看見神，就不再需要解釋。' }
    },
    tensionGuide: '我們跟隨的是一位主，而不是一套解釋系統。',
    discussionPrompts: ['什麼是「雖然不知道，但我依然相信」？'],
    summary: '信仰不是為了解釋痛苦，而是為了在痛苦中活下去。'
  },

  // 第四循環 (19-24)
  {
    id: 19,
    cycleId: 4,
    title: '第 19 課｜何時用哪種智慧？',
    subtitle: '智慧的辨識力',
    lifeQuestions: ['你如何判斷現在該「努力」（箴言）還是「放手」（傳道書）？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '播種有時', description: '順境時，要建立規模與正直。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '看淡有時', description: '當一切轉眼即逝時，學習安息於上帝的賞賜。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '哀慟有時', description: '當世界崩塌，唯有誠實的哀慟是合適的反應。' }
    },
    tensionGuide: '智慧不是固定的，而是對當下處境的精準回應。',
    discussionPrompts: ['回顧過去一年，你覺得你最需要哪卷書的智慧？'],
    summary: '成熟的標誌是知道地圖與現實的差距。'
  },
  {
    id: 20,
    cycleId: 4,
    title: '第 20 課｜不要用箴言傷害約伯',
    subtitle: '現實中的神學濫用',
    lifeQuestions: ['你有過「好心做壞事」的屬靈勸告經驗嗎？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '真理的邊界', description: '箴言是觀察，而非絕對的法律。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '現實的複雜', description: '提醒我們人生有太多變數。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '受苦者的尊嚴', description: '不要用教義抹殺一個靈魂真實的痛苦。' }
    },
    tensionGuide: '對受苦者而言，箴言是未來的盼望，而非過去的定罪。',
    discussionPrompts: ['如何建立一個能容納約伯式痛苦的信仰群體？'],
    summary: '愛的首要任務是傾聽，而非修正。'
  },
  {
    id: 21,
    cycleId: 4,
    title: '第 21 課｜不要用傳道書逃避',
    subtitle: '虛空不等於犬儒',
    lifeQuestions: ['「一切都是虛空」是否讓你變得消極、想躺平？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '責任的呼喚', description: '即使世界短暫，今日的忠心仍有永恆價值。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '在當下盡責', description: '虛空是看透，不是看輕；是放手，不是放棄。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '堅持的勇氣', description: '在毫無希望中仍守住純正。' }
    },
    tensionGuide: '因為世界是虛空的，所以當下的每一刻恩典都更顯珍貴。',
    discussionPrompts: ['如何在「看透虛空」之後，依然熱情地生活？'],
    summary: '真正的勇敢是在看清生活的真相後，依然熱愛生活。'
  },
  {
    id: 22,
    cycleId: 4,
    title: '第 22 課｜約伯之後如何再活？',
    subtitle: '恢復、關係與創傷後成長',
    lifeQuestions: ['經歷過巨大的挫折或創傷後，生活還能「恢復正常」嗎？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '生活的重建', description: '重新建立穩定的日常。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '帶著傷痕享受', description: '明白美好是短暫且珍貴的禮物。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '關係的深化', description: '恢復不是補償，而是與神有了全新的鏈接。' }
    },
    tensionGuide: '恢復不是回到過去，而是帶著傷痕邁向新的人生。',
    discussionPrompts: ['約伯最後得到了倍增的財產，這對你有何意義？'],
    summary: '苦難後的喜樂不是忘了痛苦，而是跨越了痛苦。'
  },
  {
    id: 23,
    cycleId: 4,
    title: '第 23 課｜三卷書如何互補？',
    subtitle: '信仰的全貌',
    lifeQuestions: ['如果聖經只有箴言，或只有約伯記，你的信仰會變怎樣？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '架構', description: '給予生活的結構。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '空間', description: '給予呼吸的餘裕。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '深度', description: '給予沈默的厚度。' }
    },
    tensionGuide: '三卷書像三原色，疊加出生命真實的色彩。',
    discussionPrompts: ['你最想推薦哪卷書給現在的社會？為什麼？'],
    summary: '智慧是讓這三種聲音在心中達成動態平衡。'
  },
  {
    id: 24,
    cycleId: 4,
    title: '第 24 課｜你正在活哪一卷書？',
    subtitle: '個人整合與生命定位',
    lifeQuestions: ['回顧這 24 課，哪一課的智慧最能代表你現在的生命篇章？'],
    perspectives: {
      [PerspectiveType.ORDER]: { book: '箴言', theme: '正常時不天真', description: '建立根基，但不傲慢。' },
      [PerspectiveType.VANITY]: { book: '傳道書', theme: '無常時不虛無', description: '接受有限，但不絕望。' },
      [PerspectiveType.COLLAPSE]: { book: '約伯記', theme: '反常時不說謊', description: '面對黑暗，但不虛偽。' }
    },
    tensionGuide: '你的生命正在書寫屬於你自己的智慧書。',
    discussionPrompts: ['這套課程結束後，你的第一個行動計畫是什麼？'],
    summary: '聖經的智慧不是給你一套模式正確的答案，而是在不同人生狀態中，你領悟該用哪一種誠實來活。'
  }
];
