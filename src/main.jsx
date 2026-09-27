import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import LessonVisual from './components/LessonVisuals.jsx'
import { basicLessons as helloLessons, reframes, preferenceItems, checklistGroups, keigoVerbs, politePairs } from './data/basicLessons.js'
import { interviewBookIntro, getSampleForQuestion } from './data/interviewSamples.js'
import { getLessonMeta } from './data/lessonMeta.js'

const interviewQuestions = [
  ['自己紹介をお願いします。','じこしょうかい を おねがいします','Mời bạn tự giới thiệu về bản thân.','基本','事項紹介していただけるようお願いします'],
  ['あなたの長所を教えてください。','あなた の ちょうしょ を おしえてください','Thế mạnh của bạn là gì?','自己分析','あなたのメリットを教えてくれますか?'],
  ['あなたの短所を教えてください。','あなた の たんしょ を おしえてください','Điểm yếu của bạn là gì?','自己分析','あなたのデメリットを教えてもらいますか?'],
  ['近い将来の目標を教えてください。','ちかい しょうらい の もくひょう を おしえてください','Mục tiêu ngắn hạn của bạn là gì?','目標','あなたの近い将来のターゲットを教えてもらえますか?'],
  ['長期的な目標を教えてください。','ちょうきてき な もくひょう を おしえてください','Mục tiêu dài hạn của bạn là gì?','目標','あなたの長期の目標を教えてもらえますか?'],
  ['5年後、どのような仕事をしていたいですか。','ごねんご、どのような しごと を していたいですか','Bạn muốn mình ở vị trí nào trong 5 năm nữa?','目標','後5年間、どんな職位になりますか?'],
  ['自分について一つ変えられるとしたら、何を変えたいですか。なぜですか。','じぶん について ひとつ かえられる としたら、なに を かえたいですか。なぜですか','Nếu có thể thay đổi một điều ở bản thân, bạn sẽ thay đổi gì và tại sao?','自己分析','もうし自分のいくつかのことを変更できればどこに変更したいですか?'],
  ['あなたにとって、成功とは何ですか。','あなた に とって、せいこう とは なんですか','Theo bạn thành công nghĩa là gì?','価値観','あなたにとって、成功の意味はなんですか?'],
  ['あなたにとって、失敗とは何ですか。','あなた に とって、しっぱい とは なんですか','Theo bạn thất bại nghĩa là gì?','価値観','あなたにとって、失敗の意味はなんですか?'],
  ['あなたは物事を計画的に進めるタイプですか。','あなた は ものごと を けいかくてき に すすめる タイプ ですか','Bạn có phải là người có tổ chức không?','自己分析','あなたは相識できますか?'],
  ['どんな場面では整理・計画が得意で、どんな場面では苦手ですか。','どんな ばめん では せいり・けいかく が とくい で、どんな ばめん では にがて ですか','Trong trường hợp nào bạn có tổ chức tốt và trường hợp nào thì không?','自己分析','どんな場合、組織ができますか?どんな場合、組織ができないですか?'],
  ['時間管理について、どのように工夫していますか。','じかんかんり について、どのように くふう していますか','Bạn quản lý thời gian như thế nào?','仕事力','あなたの時間管理はどうですか?'],
  ['変化には柔軟に対応できますか。','へんか には じゅうなん に たいおう できますか','Bạn có dễ thích nghi với sự thay đổi không?','仕事力','変更のことに良くあわせますか?'],
  ['重要な判断をするとき、どのように決めますか。','じゅうよう な はんだん を する とき、どのように きめますか','Bạn đưa ra quyết định quan trọng như thế nào?','仕事力','重要な判断はどうやって決めていますか?'],
  ['プレッシャーのある状況でも働けますか。','プレッシャー の ある じょうきょう でも はたらけますか','Bạn có chịu được áp lực công việc không?','仕事力','圧力に対応できますか?'],
  ['問題を予測することと、起きた問題を解決することでは、どちらが得意ですか。','もんだい を よそく する こと と、おきた もんだい を かいけつ する こと では、どちら が とくい ですか','Bạn giỏi dự đoán vấn đề hay giải quyết vấn đề hơn?','仕事力','あなたはどんなひとですか? 問題様相できる人ですか?それとも問題が良く対応できる人ですか?'],
  ['当社があなたを採用するメリットは何だと思いますか。','とうしゃ が あなた を さいよう する メリット は なんだ と おもいますか','Tại sao chúng tôi nên tuyển bạn?','志望動機','あなたを募集理由をおしえてくれますか?'],
  ['仕事で失敗した経験と、そこから学んだことを教えてください。','しごと で しっぱい した けいけん と、そこ から まなんだ こと を おしえてください','Hãy kể một lần bạn mắc lỗi và điều đã học được.','経験','間違ったことを聞かせてもらえますか?'],
  ['これまでにした良い判断の例を教えてください。','これまで に した よい はんだん の れい を おしえてください','Hãy kể một lần bạn đưa ra quyết định sáng suốt.','経験','あなたの良い判断をだしたことを教えてください。'],
  ['これまでにした判断で、後悔していることはありますか。','これまで に した はんだん で、こうかい している こと は ありますか','Hãy kể một lần bạn đưa ra quyết định sai lầm.','経験','あなたのよくない決定のを教えてくれますか?'],
  ['好きだった科目は何ですか。','すき だった かもく は なんですか','Môn học yêu thích của bạn là gì?','学歴','あなたの好きな科目はなんですか?'],
  ['あまり好きではなかった科目は何ですか。','あまり すき では なかった かもく は なんですか','Môn học nào bạn không thích?','学歴','好きではない科目はなんですか?'],
  ['親しい友人は、あなたをどんな人だと言いますか。','したしい ゆうじん は、あなた を どんな ひと だ と いいますか','Bạn thân nhận xét bạn là người như thế nào?','自己分析','一番親しいともだちはあなたはどういう人と思っていますか?'],
  ['周囲の人からは、あなたはどのように評価されていますか。','しゅうい の ひと から は、あなた は どのよう に ひょうか されていますか','Những người xung quanh đánh giá bạn như thế nào?','自己分析','各専門者はあなたについてどう評価していますか?'],
  ['お母さまは、あなたをどんな人だと言いますか。','おかあさま は、あなた を どんな ひと だ と いいますか','Mẹ của bạn nhận xét bạn như thế nào?','自己分析','あなたのお母さんはあなたがどいうひとだと言っていますか?'],
  ['これまで経験した主な仕事を三つ教えてください。','これまで けいけん した おもな しごと を みっつ おしえてください','Hãy kể ba công việc/vị trí trước đây bạn đã làm.','経験','過去の3件のしごとを教えてください。'],
  ['どのような仕事が好きですか。','どのような しごと が すき ですか','Công việc yêu thích của bạn là gì?','仕事観','あなたの好きな仕事はなんですか?'],
  ['これまでで一番良かった上司について教えてください。','これまで で いちばん よかった じょうし について おしえてください','Hãy kể về người quản lý tốt nhất bạn từng gặp.','人間関係','今まで一番良い上司を教えてください。'],
  ['これまでで合わなかった上司について、何を学びましたか。','これまで で あわなかった じょうし について、なに を まなびましたか','Hãy kể về một người quản lý bạn thấy khó làm việc cùng.','人間関係','今まで一番よくないボスを教えてください。'],
  ['苦手な上司との関係を改善するために、何をしましたか。','にがて な じょうし との かんけい を かいぜん する ため に、なに を しましたか','Bạn đã làm gì để cải thiện quan hệ với người quản lý không hợp?','人間関係','好きではないボスに対して、どういう風に仕事をして、状況を改善しますか?'],
  ['現在の仕事を辞めたい理由を教えてください。','げんざい の しごと を やめたい りゆう を おしえてください','Tại sao bạn muốn rời công việc hiện tại?','転職','やめた理由をおしえてください'],
  ['今の仕事を続けるとしたら、数年後は何をしていると思いますか。','いま の しごと を つづける としたら、すうねんご は なに を している と おもいますか','Nếu không rời công việc hiện tại, vài năm tới bạn nghĩ mình sẽ làm gì?','転職','今現在の仕事をやめない場合はここ数年間、なにをやりますか?'],
  ['今の仕事に満足している点がある中で、なぜ転職したいのですか。','いま の しごと に まんぞく している てん が ある なか で、なぜ てんしょく したい の ですか','Nếu đang hài lòng với công việc hiện tại, tại sao bạn vẫn muốn chuyển việc?','転職','いまの仕事に満足であれば、なんでやめたいのでしょうか?'],
  ['上司にどのようなことを期待しますか。','じょうし に どのような こと を きたい しますか','Bạn mong đợi gì từ người quản lý của mình?','人間関係','将来のボスにたいして、何を期待していますか?'],
  ['将来、上司のような立場で仕事をしたいですか。','しょうらい、じょうし の ような たちば で しごと を したい ですか','Bạn có muốn làm công việc/vị trí như sếp của mình không?','目標','あなたのボスのような仕事が好きですか?'],
  ['当社について、どのようなことを知っていますか。','とうしゃ について、どのような こと を しって いますか','Bạn biết gì về công ty chúng tôi?','企業研究','わたしの会社について何かわかりますか?'],
  ['当社の商品・サービスについて知っていることを教えてください。','とうしゃ の しょうひん・サービス について しっている こと を おしえてください','Bạn biết gì về sản phẩm/dịch vụ của chúng tôi?','企業研究','弊社の商品についてなにかわかりますか?'],
  ['これまで管理職やリーダーを経験したことはありますか。','これまで かんりしょく や リーダー を けいけん した こと は ありますか','Bạn từng có kinh nghiệm quản lý/lãnh đạo chưa?','経験','今までの仕事では管理職になったことがありますか?'],
  ['どのようなタイプの人と仕事をするのが難しいと感じますか。','どのような タイプ の ひと と しごと を する の が むずかしい と かんじますか','Bạn thấy khó làm việc với kiểu người nào?','人間関係','あなたはどんなにひとによく協力できないですか?'],
  ['なぜ営業の仕事に興味がありますか。','なぜ えいぎょう の しごと に きょうみ が ありますか','Tại sao bạn thích/quan tâm công việc bán hàng?','仕事観','どうしてセールスの仕事が好きですか?'],
  ['就職・転職活動を始めてどのくらいになりますか。','しゅうしょく・てんしょく かつどう を はじめて どのくらい に なりますか','Bạn đã tìm việc này lâu chưa?','転職','いままでどのぐらい就職活動をしていますか?'],
  ['仕事をより良く進めるために、どのように情報を集めますか。','しごと を より よく すすめる ため に、どのよう に じょうほう を あつめますか','Để làm tốt công việc, bạn thu thập thông tin như thế nào?','仕事力','仕事がよくできるように、情報がどうやって集めますか?'],
  ['上司の指示とは別の方法のほうが良いと思った場合、どうしますか。','じょうし の しじ とは べつ の ほうほう の ほう が よい と おもった ばあい、どう しますか','Nếu bạn nghĩ có cách khác tốt hơn cách sếp chỉ, bạn làm gì?','仕事力','あなたの上司から別の方法で指示しましたた、あなたは別の方法をやりたい場合はどうしますか?'],
  ['法律に違反する可能性がある仕事を指示された場合、どうしますか。','ほうりつ に いはん する かのうせい が ある しごと を しじ された ばあい、どう しますか','Nếu được giao việc bạn nghĩ có thể vi phạm pháp luật, bạn làm gì?','仕事力','法律違反の仕事をやらせるばあい、どうしますか?'],
  ['次の仕事で、何を実現したいですか。','つぎ の しごと で、なに を じつげん したい ですか','Trong công việc sắp tới, bạn muốn đạt được điều gì?','目標','将来に仕事になにか期待しますか?'],
  ['仕事のどんなところが一番好きですか。','しごと の どんな ところ が いちばん すき ですか','Khía cạnh nào của công việc bạn thích nhất?','仕事観','仕事の中に、なにが一番好きですか?'],
  ['単調な仕事を任された場合、どのように取り組みますか。','たんちょう な しごと を まかされた ばあい、どのよう に とりくみますか','Nếu được giao công việc rất nhàm chán, bạn sẽ làm gì?','仕事力','つまらない仕事をやらせましたらどうしますか?'],
  ['当社でどのくらいの期間働きたいと考えていますか。','とうしゃ で どのくらい の きかん はたらきたい と かんがえて いますか','Bạn dự định làm việc với công ty này bao lâu?','志望動機','この会社でどのぐらい仕事したいですか?'],
  ['転職回数について、どのように説明しますか。','てんしょく かいすう について、どのよう に せつめい しますか','Bạn giải thích thế nào nếu đã đổi việc nhiều lần?','転職','よく転職しましたが理由をおしえてくれますか?'],
  ['手が空いたときは、何をしますか。','て が あいた とき は、なに を しますか','Bạn làm gì khi không có việc gì để làm?','仕事力','やることがない場合はどうしますか?'],
  ['仕事が多すぎるとき、どのように優先順位をつけますか。','しごと が おおすぎる とき、どのよう に ゆうせんじゅんい を つけますか','Bạn làm gì khi có quá nhiều việc?','仕事力','仕事が多すぎる場合、どうしますか?'],
  ['仕事と家庭をどのように両立しますか。','しごと と かてい を どのよう に りょうりつ しますか','Bạn cân bằng công việc và gia đình như thế nào?','働き方','仕事と家事はどうやって良いバランスを取れますか?'],
  ['当社について聞いたことで、気になっている点はありますか。','とうしゃ について きいた こと で、き に なっている てん は ありますか','Có điều gì bạn nghe về công ty khiến bạn băn khoăn/không thích không?','企業研究','弊社について、好きではないことが聞いたことがありますか?'],
  ['大企業と小規模な会社では、どちらで働きたいですか。理由も教えてください。','だいきぎょう と しょうきぼ な かいしゃ では、どちら で はたらきたい ですか。りゆう も おしえてください','Bạn muốn làm ở công ty lớn hay nhỏ? Vì sao?','仕事観','あなたは大きな会社でしごとしたいですか?小さな会社で仕事をしたいですか?理由を教えてください。'],
  ['仕事で困難な問題に直面したとき、どのように対応しますか。','しごと で こんなん な もんだい に ちょくめん した とき、どのよう に たいおう しますか','Khi gặp khó khăn trong công việc, bạn xử lý thế nào?','仕事力','仕事で困ったことがある場合、どうしますか?'],
  ['上司と意見が合わないとき、どうしますか。','じょうし と いけん が あわない とき、どう しますか','Khi có vấn đề/bất đồng với sếp, bạn làm gì?','人間関係','上司に矛盾があればどうしますか?'],
  ['仕事上の問題が起きたとき、まず何をしますか。','しごとじょう の もんだい が おきた とき、まず なに を しますか','Khi có vấn đề về công việc, bạn sẽ làm gì trước tiên?','仕事力','仕事のなかで困ったことがあれば、どうしますか?'],
  ['同僚と意見が対立したとき、どう解決しますか。','どうりょう と いけん が たいりつ した とき、どう かいけつ しますか','Khi bất đồng ý kiến với đồng nghiệp, bạn làm gì?','人間関係','同僚に衝突したことがある場合、何をやりますか?'],
  ['部下を辞めさせた経験はありますか。ある場合、その理由を教えてください。','ぶか を やめさせた けいけん は ありますか。ある ばあい、その りゆう を おしえてください','Bạn từng sa thải/cho nhân viên nghỉ chưa? Nếu có, vì sao?','管理','部下を首したことがありますか?あった場合、理由を教えてください。'],
  ['一人で働くのとチームで働くのでは、どちらが好きですか。','ひとり で はたらく の と チーム で はたらく の では、どちら が すき ですか','Bạn thích làm việc một mình hay theo nhóm?','仕事観','一人で仕事をしたいですか?それともグループで仕事をしたいですか?'],
  ['暇な時間は何をして過ごしますか。','ひま な じかん は なに を して すごしますか','Thời gian rảnh bạn thích làm gì?','基本','暇な時、何をやりたいですか?'],
  ['ここまで来るのに何か困ったことはありましたか。','ここまで くる の に なにか こまった こと は ありましたか','Bạn có gặp khó khăn khi đến đây không?','基本','ここにいくのに何か困ったことがありあますか?'],
  ['週末勤務については問題ありませんか。','しゅうまつ きんむ について は もんだい ありませんか','Bạn có ngại làm cuối tuần không?','働き方','週末で仕事をするのはいやですか?'],
  ['残業について、どのように考えていますか。','ざんぎょう について、どのよう に かんがえて いますか','Bạn nghĩ thế nào về làm thêm giờ?','働き方','残業はいかがですか?'],
  ['前職の会社に連絡してもよろしいですか。','ぜんしょく の かいしゃ に れんらく しても よろしい ですか','Chúng tôi có thể liên lạc công ty trước đây của bạn không?','確認','あなたの上司に連絡することができますか?'],
  ['推薦者・照会先に連絡してもよろしいですか。','すいせんしゃ・しょうかいさき に れんらく しても よろしい ですか','Chúng tôi có thể liên hệ người tham khảo của bạn không?','確認','あなたの書類をもらえますか?'],
  ['希望する給与額を教えてください。','きぼう する きゅうよがく を おしえてください','Mức lương mong muốn của bạn là bao nhiêu?','給与','給料のご希望を教えてくれますか?'],
  ['いつから勤務できますか。','いつ から きんむ できますか','Khi nào bạn có thể bắt đầu làm việc?','確認','いつ仕事を始まることができますか?']
].map((q, i) => ({
  id: 'q' + (i + 1),
  order: i + 1,
  jp: q[0], reading: q[1], vi: q[2], category: q[3], original: q[4],
  sourceHasSample: i < 24
}))

function useStoredState(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial } catch { return initial }
  })
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)) }, [key, value])
  return [value, setValue]
}

function RubyLine({ text, reading, furigana = true, className = '' }) {
  const t = String(text ?? '').normalize('NFC')
  const r = String(reading ?? '').normalize('NFC')
  if (!furigana || !r) return <span className={className}>{t}</span>

  // A single <ruby> around a whole paragraph makes Chrome stretch the <rt>
  // into one unbreakable line. For long text, keep the reading ABOVE the
  // Japanese as a wrapping study line instead of letting it overflow.
  if (t.length > 28 || r.length > 42) {
    return <span className={(className + ' long-furi').trim()}>
      <span className="long-furi-reading">{r}</span>
      <span className="long-furi-text">{t}</span>
    </span>
  }

  return <ruby className={className}>{t}<rt>{r}</rt></ruby>
}

function speak(text, repeat = 1) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  let n = 0
  const run = () => {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ja-JP'
    u.rate = 0.92
    u.onend = () => {
      n += 1
      if (n < repeat) setTimeout(run, 650)
    }
    window.speechSynthesis.speak(u)
  }
  run()
}

function mascotLine(progress) {
  if (progress >= 80) return '面接官より先に合格する気でいる 😤✨'
  if (progress >= 50) return 'ほう…ちゃんと勉強してるじゃん 👀'
  if (progress >= 20) return 'その調子。その調子。でも油断は禁止。'
  return '勉強は？？？ 👁️👄👁️'
}


function FuriParagraph({jp, reading, furigana}) {
  return <div className="jp-study-block">
    <RubyLine text={jp} reading={reading} furigana={furigana} className="jp-rich" />
    <button className="mini-audio" onClick={() => speak(jp)}>🔊</button>
  </div>
}

function StudyTerm({text, vi, reading, furigana, compact=false}) {
  const meta = getLessonMeta(text)
  const r = reading || meta?.[0] || ''
  const meaning = vi || meta?.[1] || ''
  return <div className={'study-term ' + (compact ? 'compact' : '')}>
    <div className="study-term-main">
      <RubyLine text={text} reading={r} furigana={furigana} className="study-term-jp" />
      <button className="term-audio" type="button" aria-label={'Nghe ' + text} onClick={(e)=>{e.stopPropagation();speak(text)}}>🔊</button>
    </div>
    {meaning && <div className="study-term-vi">🇻🇳 {meaning}</div>}
  </div>
}

function PairTable({rows, left='Gốc', right='Nên dùng', furigana=true}) {
  return <div className="pair-table">
    <div className="pair-head"><b>{left}</b><b>{right}</b></div>
    {rows.map((r,i)=><div className="pair-row" key={i}>
      <StudyTerm text={r[0]} furigana={furigana} compact />
      <StudyTerm text={r[1]} furigana={furigana} compact />
    </div>)}
  </div>
}

function SectionRenderer({section, furigana}) {
  return <section className="content-card rich-section">
    <div className="rich-heading">
      <StudyTerm text={section.h} vi={section.vi} furigana={furigana} />
    </div>

    {section.jp && <FuriParagraph jp={section.jp} reading={section.reading} furigana={furigana} />}
    {section.body && <p className="large-text">{section.body}</p>}

    {section.bullets && <div className="lesson-study-list">
      {section.bullets.map((x,i)=><StudyTerm key={i} text={x} furigana={furigana} />)}
    </div>}

    {section.cards && <div className="info-card-grid">
      {section.cards.map((x,i)=><div className="mini-info-card" key={i}><StudyTerm text={x[0]} vi={x[1]} furigana={furigana} /></div>)}
    </div>}

    {section.steps && <div className="steps-list">{section.steps.map((x,i)=><div className="step-row" key={i}>
      <b>{x[0]}</b><div><StudyTerm text={x[1]} vi={x[2]} furigana={furigana} compact /></div>
    </div>)}</div>}

    {section.prompts && <div className="prompt-list">{section.prompts.map((x,i)=><div key={i}><StudyTerm text={x[0]} vi={x[1]} furigana={furigana} compact /></div>)}</div>}

    {section.strengths && <div className="strength-table">{section.strengths.map((x,i)=><div key={i}>
      <StudyTerm text={x[0]} furigana={furigana} compact />
      <StudyTerm text={x[1]} furigana={furigana} compact />
    </div>)}</div>}

    {section.reframes && <PairTable rows={reframes} left="書きかえたい語" right="積極的表現" furigana={furigana} />}

    {section.preferences && <div className="preference-list">{preferenceItems.map((x,i)=><div key={i}>
      <StudyTerm text={x} furigana={furigana} compact />
      <div className="scale-dots">{[1,2,3,4,5].map(n=><i key={n}>{n}</i>)}</div>
    </div>)}</div>}

    {section.checklist && <div className="checklist-groups">{checklistGroups.map(g=><div className="check-group" key={g.title}>
      <StudyTerm text={g.title} furigana={furigana} />
      <div>{g.items.map(x=><div className="check-study-row" key={x}><span>○ / ×</span><StudyTerm text={x} furigana={furigana} compact /></div>)}</div>
    </div>)}</div>}

    {section.keigoTable && <div className="data-table four-col">
      <div className="data-head"><b>普通</b><b>丁寧語</b><b>尊敬語</b><b>謙譲語</b></div>
      {keigoVerbs.map((r,i)=><div className="data-row study-data-row" key={i}>{r.map((x,j)=><StudyTerm text={x} furigana={furigana} compact key={j}/>)}</div>)}
    </div>}

    {section.pairs && <PairTable rows={section.pairs} left="避けたい / 対象" right="自然・正しい" furigana={furigana} />}

    {section.politePairs && <PairTable rows={politePairs} left="普通の言葉" right="丁寧な言葉" furigana={furigana} />}

    {section.note && <div className="lesson-note">💡 {section.note}</div>}
  </section>
}

function BookIntroCard() {
  return <section className="book-intro-card">
    <div className="book-cover-mini">面接<br/><small>質問及び回答</small></div>
    <div>
      <span className="course-kicker">SOURCE GUIDE</span>
      <h2>{interviewBookIntro.title}</h2>
      <p>{interviewBookIntro.sourceNote}</p>
      <div className="source-structure">{interviewBookIntro.structure.map(x=><div key={x[0]}><b>{x[0]}</b><span>{x[1]}</span></div>)}</div>
      <div className="source-warning">⚠️ {interviewBookIntro.warning}</div>
    </div>
  </section>
}

function App() {
  const [screen, setScreen] = useState('home')
  const [furigana, setFurigana] = useStoredState('ns-furigana', true)
  const [answers, setAnswers] = useStoredState('ns-answers', {})
  const [bookmarks, setBookmarks] = useStoredState('ns-bookmarks', [])
  const [learned, setLearned] = useStoredState('ns-learned', [])
  const [streak] = useStoredState('ns-streak', { count: 1, last: new Date().toISOString().slice(0,10) })
  const [filter, setFilter] = useState('Tất cả')
  const [questionTab, setQuestionTab] = useState('questions')
  const [search, setSearch] = useState('')
  const [activeQ, setActiveQ] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [studyHidden, setStudyHidden] = useState(false)
  const [mock, setMock] = useState([])
  const [mockIndex, setMockIndex] = useState(0)
  const [showMockAnswer, setShowMockAnswer] = useState(false)
  const [installPrompt, setInstallPrompt] = useState(null)
  const mediaRecorder = useRef(null)
  const chunks = useRef([])
  const [recording, setRecording] = useState(false)
  const [recordUrl, setRecordUrl] = useState(null)

  useEffect(() => {
    const handler = e => { e.preventDefault(); setInstallPrompt(e) }
    window.addEventListener('beforeinstallprompt', handler)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js').catch(() => {})
    }
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const categories = useMemo(() => ['Tất cả', ...new Set(interviewQuestions.map(q => q.category))], [])
  const filteredQuestions = useMemo(() => interviewQuestions.filter(q => {
    const okCat = filter === 'Tất cả' || q.category === filter
    const s = search.trim().toLowerCase()
    const okSearch = !s || q.jp.toLowerCase().includes(s) || q.vi.toLowerCase().includes(s) || q.reading.toLowerCase().includes(s)
    return okCat && okSearch
  }), [filter, search])

  const progress = Math.round((learned.length / (helloLessons.length + interviewQuestions.length)) * 100)

  function openQ(q) {
    setActiveQ(q); setDraft(answers[q.id] || ''); setEditing(false); setStudyHidden(false); setRecordUrl(null); setScreen('question')
  }

  function toggleBookmark(id) {
    setBookmarks(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id])
  }

  function toggleLearned(id) {
    setLearned(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id])
  }

  async function startRecording() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      alert('Trình duyệt này chưa hỗ trợ ghi âm.')
      return
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    chunks.current = []
    const rec = new MediaRecorder(stream)
    mediaRecorder.current = rec
    rec.ondataavailable = e => chunks.current.push(e.data)
    rec.onstop = () => {
      const blob = new Blob(chunks.current, { type: rec.mimeType || 'audio/webm' })
      if (recordUrl) URL.revokeObjectURL(recordUrl)
      setRecordUrl(URL.createObjectURL(blob))
      stream.getTracks().forEach(t => t.stop())
    }
    rec.start()
    setRecording(true)
  }

  function stopRecording() {
    mediaRecorder.current?.stop()
    setRecording(false)
  }

  function saveAnswer() {
    setAnswers(v => ({ ...v, [activeQ.id]: draft }))
    setEditing(false)
  }

  async function exportBackup() {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      furigana, answers, bookmarks, learned
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type:'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'nihongo-study-backup-' + new Date().toISOString().slice(0,10) + '.json'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  function importBackup(file) {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const p = JSON.parse(reader.result)
        if (typeof p.furigana === 'boolean') setFurigana(p.furigana)
        if (p.answers) setAnswers(p.answers)
        if (p.bookmarks) setBookmarks(p.bookmarks)
        if (p.learned) setLearned(p.learned)
        alert('Đã khôi phục dữ liệu.')
      } catch { alert('File backup không hợp lệ.') }
    }
    reader.readAsText(file)
  }

  function startMock() {
    const shuffled = [...interviewQuestions].sort(() => Math.random() - 0.5).slice(0, 10)
    setMock(shuffled); setMockIndex(0); setShowMockAnswer(false); setScreen('mock')
  }

  const Header = ({title, onBack}) => (
    <header className="topbar">
      {onBack ? <button className="icon-btn" onClick={onBack}>←</button> : <img src={import.meta.env.BASE_URL + 'meling-chan.svg'} className="mini-mascot" />}
      <div><div className="top-title">{title}</div><div className="top-sub">Nihongo Study</div></div>
      <button className={"furigana-toggle " + (furigana ? 'on' : '')} onClick={() => setFurigana(!furigana)}>ふ {furigana ? 'ON' : 'OFF'}</button>
    </header>
  )

  if (screen === 'home') {
    return <div className="app-shell">
      <Header title="🌻 Nihongo Study" />
      <main className="page home-page">
        <section className="hero">
          <div>
            <div className="eyebrow">Meling Chan đang canh bạn học đó 👀</div>
            <h1>Học tiếng Nhật để <span>dùng được thật</span>.</h1>
            <p>{mascotLine(progress)}</p>
          </div>
          <img src={import.meta.env.BASE_URL + 'meling-chan.svg'} className="hero-mascot" />
        </section>

        <section className="stats-row">
          <div className="stat"><b>{progress}%</b><span>Tiến độ</span></div>
          <div className="stat"><b>{learned.length}</b><span>Đã học</span></div>
          <div className="stat"><b>{bookmarks.length}</b><span>Đã lưu</span></div>
          <div className="stat"><b>🔥 {streak.count}</b><span>Streak</span></div>
        </section>

        <button className="course-card main-course" onClick={() => setScreen('interview')}>
          <div className="course-icon">💼</div>
          <div><span className="course-kicker">ĐANG BUILD</span><h2>面接 <small>Phỏng vấn</small></h2><p>Cơ bản + câu hỏi + luyện nói + mock interview</p></div>
          <span className="arrow">›</span>
        </button>

        <div className="coming-grid">
          <div className="course-card disabled"><div className="course-icon">📚</div><div><h3>BJT</h3><p>Coming soon</p></div></div>
          <div className="course-card disabled"><div className="course-icon">🗣️</div><div><h3>Kaiwa</h3><p>Coming soon</p></div></div>
        </div>

        <section className="backup-card">
          <h3>💾 Dữ liệu của tôi</h3>
          <p>Câu trả lời, bookmark, tiến độ và cài đặt được lưu ngay trên máy.</p>
          <div className="button-row">
            <button className="soft-btn" onClick={exportBackup}>📤 Xuất backup</button>
            <label className="soft-btn file-btn">📥 Nhập backup<input type="file" accept="application/json" onChange={e => e.target.files?.[0] && importBackup(e.target.files[0])} /></label>
            {installPrompt && <button className="soft-btn" onClick={async()=>{await installPrompt.prompt(); setInstallPrompt(null)}}>📱 Cài app</button>}
          </div>
        </section>
      </main>
    </div>
  }

  if (screen === 'interview') {
    return <div className="app-shell">
      <Header title="面接 / Phỏng vấn" onBack={() => setScreen('home')} />
      <main className="page">
        <div className="section-intro"><h1>Chọn phần học</h1><p>Giữ thứ tự tài liệu gốc, nhưng trình bày lại cho dễ học trên điện thoại.</p></div>
        <button className="menu-card pink" onClick={() => setScreen('hello')}><span>🌱</span><div><h2>面接の基本・実践</h2><p>Tài liệu Hello Work • theo thứ tự trang 2 → 21</p></div><b>›</b></button>
        <button className="menu-card yellow" onClick={() => setScreen('questions')}><span>💼</span><div><h2>面接質問集</h2><p>Bộ câu hỏi phỏng vấn • Nhật tự nhiên + nguyên văn</p></div><b>›</b></button>
        <button className="menu-card mock-card" onClick={startMock}><span>🎤</span><div><h2>Mock Interview</h2><p>Random 10 câu • nghe câu hỏi • tự trả lời • xem câu đã lưu</p></div><b>›</b></button>
      </main>
    </div>
  }

  if (screen === 'hello') {
    return <div className="app-shell">
      <Header title="面接の基本・実践" onBack={() => setScreen('interview')} />
      <main className="page">
        <div className="section-intro"><h1>Theo thứ tự trang gốc</h1><p>Không đảo chương. Mỗi trang được biên tập thành một bài ngắn.</p></div>
        <div className="lesson-list">{helloLessons.map(l => <button className="lesson-row" key={l.id} onClick={()=>{setActiveLesson(l);setScreen('lesson')}}>
          <div className="page-badge">P.{l.page}</div>
          <div><h3><RubyLine text={l.title} reading={l.reading} furigana={furigana}/></h3><p>{l.vi}</p></div>
          <span>{learned.includes(l.id) ? '✅' : '›'}</span>
        </button>)}</div>
      </main>
    </div>
  }

  if (screen === 'lesson' && activeLesson) {
    const l = activeLesson
    return <div className="app-shell">
      <Header title={"P." + l.page + " • " + l.vi} onBack={() => setScreen('hello')} />
      <main className="page lesson-page">
        <div className="big-title-card">
          <div className="page-badge large">P.{l.page}</div>
          <h1><RubyLine text={l.title} reading={l.reading} furigana={furigana}/></h1>
          <p>{l.vi}</p>
          <div className="audio-row"><button onClick={()=>speak(l.title)}>🔊 Nghe</button><button onClick={()=>speak(l.title,3)}>🔁 x3</button></div>
        </div>

        <LessonVisual type={l.visual} />
        {l.sections.map((s,i)=><SectionRenderer key={i} section={s} furigana={furigana} />)}

        <button className={"learn-btn " + (learned.includes(l.id)?'done':'')} onClick={()=>toggleLearned(l.id)}>{learned.includes(l.id)?'✅ Đã học xong':'○ Đánh dấu đã học'}</button>
      </main>
    </div>
  }

  if (screen === 'questions') {
    return <div className="app-shell">
      <Header title="面接質問集" onBack={() => setScreen('interview')} />
      <main className="page">
        <div className="source-tabs">
          <button className={questionTab==='intro'?'active':''} onClick={()=>setQuestionTab('intro')}>📘 Giới thiệu</button>
          <button className={questionTab==='questions'?'active':''} onClick={()=>setQuestionTab('questions')}>❓ 69 câu hỏi</button>
          <button className={questionTab==='samples'?'active':''} onClick={()=>setQuestionTab('samples')}>💬 24 bài mẫu</button>
        </div>

        {questionTab === 'intro' && <BookIntroCard />}

        {questionTab === 'questions' && <>
          <div className="source-order"><b>📖 原文順</b><span>Giữ nguyên thứ tự nguồn; câu Nhật chính đã được sửa tự nhiên để học.</span></div>
          <input className="search-box" placeholder="🔍 Tìm bằng Nhật hoặc Việt..." value={search} onChange={e=>setSearch(e.target.value)} />
          <div className="filter-scroll">{categories.map(c=><button key={c} className={filter===c?'active':''} onClick={()=>setFilter(c)}>{c}</button>)}</div>
          <div className="question-list">{filteredQuestions.map(q=><button className="question-row" key={q.id} onClick={()=>openQ(q)}>
            <div className="q-num">{String(q.order).padStart(2,'0')}</div>
            <div><h3><RubyLine text={q.jp} reading={q.reading} furigana={furigana}/></h3><p>{q.vi}</p><span className="tag">{q.category}</span>{q.sourceHasSample&&<span className="tag source">Có bài mẫu</span>}</div>
            <div className="q-status">{answers[q.id] ? '✍️' : ''}{bookmarks.includes(q.id) ? '⭐' : ''}{learned.includes(q.id) ? '✅' : ''}</div>
          </button>)}</div>
        </>}

        {questionTab === 'samples' && <>
          <div className="source-order"><b>💬 24 đáp án có trong file</b><span>Không bỏ phần này nữa: mỗi bài có ý gốc + bản Nhật tự nhiên + dịch Việt + TTS.</span></div>
          <div className="question-list">{interviewQuestions.slice(0,24).map(q=>{
            const s=getSampleForQuestion(q.id)
            return <button className="question-row sample-row" key={q.id} onClick={()=>openQ(q)}>
              <div className="q-num">{String(q.order).padStart(2,'0')}</div>
              <div><h3>{s?.title || q.jp}</h3><p>{s?.sourceIdeaVi}</p><span className="tag source">Bài mẫu từ sách</span></div>
              <div className="q-status">›</div>
            </button>
          })}</div>
        </>}
      </main>
    </div>
  }

  if (screen === 'question' && activeQ) {
    const q = activeQ
    return <div className="app-shell">
      <Header title={"Câu " + q.order} onBack={() => setScreen('questions')} />
      <main className="page question-detail">
        <section className="question-main">
          <div className="tag-row"><span className="tag">{q.category}</span>{q.sourceHasSample && <span className="tag source">PDF có đáp án mẫu</span>}</div>
          <h1><RubyLine text={q.jp} reading={q.reading} furigana={furigana}/></h1>
          <div className="audio-row"><button onClick={()=>speak(q.jp)}>🔊 Nghe</button><button onClick={()=>speak(q.jp,3)}>🔁 x3</button></div>
          {!studyHidden && <p className="translation">🇻🇳 {q.vi}</p>}
          <button className="ghost-btn" onClick={()=>setStudyHidden(!studyHidden)}>{studyHidden?'👀 Hiện nghĩa':'🙈 Ẩn nghĩa để tự nhớ'}</button>
        </section>

        <details className="original-box"><summary>📖 原文を見る • Xem câu gốc trong tài liệu</summary><p>{q.original}</p><small>Câu chính phía trên đã được biên tập thành cách hỏi tự nhiên hơn.</small></details>

        {getSampleForQuestion(q.id) ? (() => {
          const s = getSampleForQuestion(q.id)
          return <section className="sample-answer-card">
            <div className="sample-answer-head"><div><span>💬</span><div><b>Đáp án gợi ý từ tài liệu</b><small>Câu {q.order}/24 có mẫu trong file</small></div></div><button className="mini-audio" onClick={()=>speak(s.naturalJp)}>🔊</button></div>
            <details className="source-idea"><summary>🧠 Ý đầy đủ của mẫu gốc</summary><p>{s.sourceIdeaVi}</p></details>
            <div className="natural-answer">
              <span className="label-good">✅ Bản Nhật tự nhiên nên học</span>
              <RubyLine text={s.naturalJp} reading={s.reading} furigana={furigana} className="jp-rich" />
            </div>
            <p className="translation">🇻🇳 {s.vi}</p>
            <div className="sample-tip">Meling Chan: dùng mẫu để học cấu trúc, đừng học thuộc thông tin cá nhân của người trong sách 😭</div>
          </section>
        })() : <div className="no-sample-note">📌 File gốc chỉ cung cấp đáp án đến câu 24. Từ câu 25 trở đi app không tự bịa “đáp án của sách”; bạn vẫn có thể tự viết và lưu câu trả lời của mình.</div>}

        <section className="answer-card">
          <div className="answer-head"><div><span>🙋</span><h2>Câu trả lời của tôi</h2></div><button className="star-btn" onClick={()=>toggleBookmark(q.id)}>{bookmarks.includes(q.id)?'⭐':'☆'}</button></div>
          {editing ? <>
            <textarea value={draft} onChange={e=>setDraft(e.target.value)} placeholder="ここに自分の答えを書いてください…"></textarea>
            <div className="button-row"><button className="soft-btn" onClick={()=>setEditing(false)}>Hủy</button><button className="primary-btn" onClick={saveAnswer}>💾 Lưu</button></div>
          </> : <>
            <div className={"saved-answer " + (!answers[q.id]?'empty':'')}>{answers[q.id] || 'Chưa viết câu trả lời.'}</div>
            <div className="button-row"><button className="soft-btn" onClick={()=>{setDraft(answers[q.id]||'');setEditing(true)}}>✏️ Ghi / Sửa</button><button className="soft-btn" onClick={()=>answers[q.id]&&speak(answers[q.id])} disabled={!answers[q.id]}>🔊 Nghe</button></div>
          </>}
        </section>

        <section className="record-card">
          <h2>🎙️ Luyện nói</h2><p>Thu giọng của bạn rồi nghe lại. File chỉ tồn tại trong phiên hiện tại.</p>
          {!recording ? <button className="primary-btn" onClick={startRecording}>● Bắt đầu ghi</button> : <button className="danger-btn" onClick={stopRecording}>■ Dừng ghi</button>}
          {recordUrl && <audio className="audio-player" controls src={recordUrl}></audio>}
        </section>

        <button className={"learn-btn " + (learned.includes(q.id)?'done':'')} onClick={()=>toggleLearned(q.id)}>{learned.includes(q.id)?'✅ Đã chuẩn bị câu này':'○ Đánh dấu đã chuẩn bị'}</button>
      </main>
    </div>
  }

  if (screen === 'mock') {
    const q = mock[mockIndex]
    if (!q) return null
    return <div className="app-shell mock-screen">
      <Header title="🎤 Mock Interview" onBack={() => setScreen('interview')} />
      <main className="page">
        <div className="mock-progress"><span>{mockIndex+1} / {mock.length}</span><div><i style={{width:((mockIndex+1)/mock.length*100)+'%'}} /></div></div>
        <section className="mock-question">
          <img src={import.meta.env.BASE_URL + 'meling-chan.svg'} className="mock-mascot" />
          <div className="speech-bubble">面接官モード。逃げるな 😌</div>
          <h1><RubyLine text={q.jp} reading={q.reading} furigana={furigana}/></h1>
          <button className="listen-big" onClick={()=>speak(q.jp)}>🔊 Câu hỏi</button>
        </section>
        <section className="mock-answer">
          {!recording ? <button className="record-big" onClick={startRecording}>🎙️ Bắt đầu trả lời</button> : <button className="record-big recording" onClick={stopRecording}>■ Đang ghi... Dừng</button>}
          {recordUrl && <audio className="audio-player" controls src={recordUrl}></audio>}
          <button className="ghost-btn" onClick={()=>setShowMockAnswer(!showMockAnswer)}>{showMockAnswer?'🙈 Ẩn câu của tôi':'👀 Xem câu trả lời đã lưu'}</button>
          {showMockAnswer && <div className="saved-answer">{answers[q.id] || 'Bạn chưa chuẩn bị câu này.'}</div>}
        </section>
        <div className="mock-nav">
          <button className="soft-btn" disabled={mockIndex===0} onClick={()=>{setMockIndex(i=>i-1);setShowMockAnswer(false);setRecordUrl(null)}}>← Trước</button>
          {mockIndex < mock.length-1 ? <button className="primary-btn" onClick={()=>{setMockIndex(i=>i+1);setShowMockAnswer(false);setRecordUrl(null)}}>Câu tiếp →</button> : <button className="primary-btn" onClick={()=>setScreen('interview')}>🏁 Kết thúc</button>}
        </div>
      </main>
    </div>
  }

  return null
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
