import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const helloLessons = [
  {
    id: 'h02', page: 2, title: '面接の基本セミナー', reading: 'めんせつ の きほん セミナー',
    vi: 'Seminar cơ bản về phỏng vấn',
    summary: 'Không có một “đáp án thần kỳ” đảm bảo 100% được tuyển. Nội dung trả lời phải phù hợp với chính kinh nghiệm và hoàn cảnh của bạn.',
    points: ['面接とは', '面接の流れ', '志望動機', '自己PR', '退職理由', '企業への質問'],
    doText: 'Dùng tài liệu như khung tư duy, sau đó biến thành câu trả lời của chính mình.',
    dontText: 'Học thuộc một mẫu dài rồi đọc như robot.'
  },
  {
    id: 'h03', page: 3, title: '面接とは', reading: 'めんせつ とは',
    vi: 'Phỏng vấn là gì?',
    summary: 'Mục tiêu không chỉ là “được nhận”, mà là tìm nơi bạn có thể làm việc phù hợp và lâu dài. Doanh nghiệp nhìn vào năng lực/kinh nghiệm, động lực và cách bạn hòa nhập.',
    points: ['能力・適性・経験', '意欲（やる気）', '適応性・社会性', '第一印象も重要'],
    doText: 'Chuẩn bị cả nội dung lẫn cách nói, thái độ và tác phong.',
    dontText: 'Chỉ chăm chăm trả lời đúng câu hỏi mà bỏ qua biểu cảm, giọng nói và tác phong.'
  },
  {
    id: 'h04', page: 4, title: '志望動機を話す', reading: 'しぼうどうき を はなす',
    vi: 'Cách nói lý do ứng tuyển',
    summary: 'Khung 3 phần: vì sao chọn công việc/công ty này → bạn có kinh nghiệm/năng lực gì → bạn muốn đóng góp thế nào sau khi vào công ty.',
    points: ['その仕事・企業を選んだ理由', '何ができるのか', '意欲・どう貢献するか'],
    doText: 'Nối kinh nghiệm thật của bạn với nhu cầu của vị trí đang tuyển.',
    dontText: 'Chỉ nói “vì lương tốt”, “vì gần nhà” hoặc khen công ty chung chung.'
  },
  {
    id: 'h05', page: 5, title: '自己PR', reading: 'じこピーアール',
    vi: 'Tự PR / điểm mạnh có căn cứ',
    summary: 'Tự PR hiệu quả là tìm phần giao nhau giữa thế mạnh của bạn và điều doanh nghiệp đang cần. Nên có bằng chứng cụ thể như đánh giá của sếp/khách hàng hoặc một tình huống thực tế.',
    points: ['能力・長所・強み・知識', '求めている人物像', '具体的な根拠やエピソード'],
    doText: 'Nói 1 thế mạnh + 1 ví dụ + cách thế mạnh đó giúp ích cho công việc mới.',
    dontText: 'Liệt kê nhiều tính từ tốt mà không có ví dụ.'
  },
  {
    id: 'h06', page: 6, title: '退職理由を話す', reading: 'たいしょくりゆう を はなす',
    vi: 'Nói lý do nghỉ việc',
    summary: 'Không nên đẩy toàn bộ bất mãn về công ty cũ ra trước. Hãy nói ngắn, khách quan và chuyển trọng tâm sang điều bạn muốn làm tiếp theo.',
    points: ['前職の批判・不満を全面に出さない', '客観的事項を短めに', '今後どうしたいかにつなげる'],
    doText: 'Sự thật → ngắn gọn → hướng tích cực → lý do công việc mới phù hợp.',
    dontText: 'Kể dài chuyện xấu của sếp, đồng nghiệp, lương hoặc công ty cũ.'
  },
  {
    id: 'h07', page: 7, title: '退職理由・企業への質問', reading: 'たいしょくりゆう・きぎょう への しつもん',
    vi: 'Sắp xếp lý do nghỉ và câu hỏi dành cho công ty',
    summary: 'Liệt kê các lý do nghỉ, xếp ưu tiên, sau đó nối với từ khóa tích cực. Cuối phỏng vấn thường có “何か質問はありますか”, nên chuẩn bị câu hỏi thể hiện sự quan tâm đến công việc.',
    points: ['Step1 理由を書き出す', 'Step2 ポジティブにまとめる', '逆質問を準備する'],
    doText: 'Hỏi về công việc thực tế, chuẩn bị trước khi vào làm, điều nhân viên nên chú ý.',
    dontText: 'Nói “không có câu hỏi gì” ngay lập tức khi vẫn còn điều quan trọng chưa rõ.'
  },
  {
    id: 'h08', page: 8, title: '面接ワークシート編', reading: 'めんせつ ワークシート へん',
    vi: 'Phần worksheet chuẩn bị phỏng vấn',
    summary: 'Từ đây tài liệu chuyển sang các worksheet giúp bạn nhìn lại kinh nghiệm, thế mạnh, điều kiện mong muốn và cách chuẩn bị câu trả lời.',
    points: ['自己理解', '強み発見', '質問準備', '希望条件', '自己点検'],
    doText: 'Đọc theo thứ tự trang và ghi chú riêng nếu cần.',
    dontText: 'Bỏ qua phần tự nhìn lại kinh nghiệm rồi nhảy thẳng vào học mẫu.'
  },
  {
    id: 'h09', page: 9, title: '今までの仕事を振り返る', reading: 'いままで の しごと を ふりかえる',
    vi: 'Nhìn lại công việc đã làm',
    summary: 'Tự rà lại công ty, địa điểm, thời gian làm, quy mô nơi làm, nhiệm vụ, kỹ năng đã có, điều khiến bạn thấy có ý nghĩa, bằng cấp và nội dung tự học.',
    points: ['会社・所在地', '勤務期間', '担当業務', '身につけたこと', 'やりがい', '免許・資格・自主学習'],
    doText: 'Chuẩn bị dữ kiện thật để sau này dùng cho 自己紹介, 自己PR và 志望動機.',
    dontText: 'Chỉ nhớ tên công ty mà không mô tả được mình thực sự đã làm gì.'
  },
  {
    id: 'h10', page: 10, title: '強みを探す', reading: 'つよみ を さがす',
    vi: 'Tìm điểm mạnh từ hành động',
    summary: 'Tài liệu gợi ý nhìn vào hành vi thật: từng thử việc khó, giúp người khác, giao tiếp/giảng giải, nghĩ ý tưởng mới, làm việc có kế hoạch, giữ quy tắc và manner.',
    points: ['勤勉性・積極性', '観察力・気配り', 'コミュニケーション能力', '発想力・企画力', '計画性・正確性', '自己管理能力'],
    doText: 'Chọn 2–3 từ khóa phản ánh đúng hành vi của bạn.',
    dontText: 'Chọn một tính từ chỉ vì nghe “xịn”.'
  },
  {
    id: 'h11', page: 11, title: 'リフレーミング', reading: 'リフレーミング',
    vi: 'Đổi cách nhìn một đặc điểm',
    summary: 'Một đặc điểm có thể được diễn đạt tích cực hơn nếu đúng ngữ cảnh: ví dụ nhút nhát → điềm tĩnh/khiêm tốn; cứng đầu → ý chí mạnh; nói ít → biết lắng nghe.',
    points: ['短所を隠すのではなく見方を変える', '性格と行動特性を言い換える'],
    doText: 'Đổi cách diễn đạt nhưng vẫn giữ sự thật.',
    dontText: 'Biến điểm yếu thành một “điểm mạnh giả” quá lộ.'
  },
  {
    id: 'h12', page: 12, title: '面接質問を想定する', reading: 'めんせつ しつもん を そうていする',
    vi: 'Chuẩn bị trước nhóm câu hỏi',
    summary: 'Các nhóm chính gồm: giới thiệu/kinh nghiệm, tính cách–giá trị–năng lực, hiểu công việc và động cơ ứng tuyển, lý do chuyển việc, kinh nghiệm, lương–đãi ngộ và các câu hỏi khác.',
    points: ['自己紹介・経歴', '長所・短所・仕事観', '志望動機', '退職理由', '成功談・失敗談', '給与・残業', '逆質問'],
    doText: 'Mỗi câu nên có lý do hoặc ví dụ ngắn.',
    dontText: 'Trả lời dài đến mức mất trọng tâm.'
  },
  {
    id: 'h13', page: 13, title: '希望条件を明確にする', reading: 'きぼうじょうけん を めいかく に する',
    vi: 'Làm rõ điều kiện công việc mong muốn',
    summary: 'Tài liệu cho chấm mức ưu tiên 1–5 về lĩnh vực công việc, điều kiện lao động, môi trường, cân bằng cuộc sống và kế hoạch tương lai.',
    points: ['仕事内容', '賃金・残業・保険', '職場環境・通勤', '休暇・子育て・介護', '長期勤務・成長・昇進'],
    doText: 'Biết điều nào là “phải có”, điều nào có thể linh hoạt.',
    dontText: 'Ứng tuyển mọi nơi mà không biết mình thật sự cần gì.'
  },
  {
    id: 'h14', page: 14, title: '面接自己点検チェック', reading: 'めんせつ じこてんけん チェック',
    vi: 'Checklist tự kiểm tra',
    summary: 'Tự kiểm tra trang phục–thái độ, biểu cảm, cách lắng nghe, cách nói, kỹ thuật phỏng vấn và những hành vi dễ tạo ấn tượng xấu.',
    points: ['服装と態度', '表現力', '聞く態度', '話し方', '面接技術', '不適格要素'],
    doText: 'Sau mỗi lần luyện mock interview, chọn 1–2 điểm cần sửa.',
    dontText: 'Cố sửa tất cả mọi thứ trong một lần.'
  },
  {
    id: 'h15', page: 15, title: '面接マナー編', reading: 'めんせつ マナー へん',
    vi: 'Phần manner phỏng vấn',
    summary: 'Phần cuối tập trung vào trang phục, cúi chào, vào phòng, rời phòng, kính ngữ và ngôn ngữ tiếp khách.',
    points: ['服装', 'お辞儀', '入室・着席', '退室', '敬語', '接遇用語', 'お礼状'],
    doText: 'Học theo hành động và luyện thành thói quen.',
    dontText: 'Chỉ đọc lý thuyết mà không thử đứng lên thực hành.'
  },
  {
    id: 'h16', page: 16, title: '服装・お辞儀', reading: 'ふくそう・おじぎ',
    vi: 'Trang phục và cúi chào',
    summary: 'Tài liệu khuyên kiểu tóc sạch gọn, sơ mi/blouse trắng, suit đen/xanh navy/xám, túi A4 đứng được, giày đơn giản. Khi cúi chào: eye contact → cúi từ hông → dừng → đứng lên chậm → eye contact.',
    points: ['清潔感', '白いシャツ・ブラウス', '黒・紺・グレーのスーツ', 'アイコンタクト', '会釈・敬礼・最敬礼'],
    doText: 'Ưu tiên sạch, gọn, vừa vặn, dễ vận động.',
    dontText: 'Chọn đồ nổi bật hơn nội dung phỏng vấn.'
  },
  {
    id: 'h17', page: 17, title: '入室・着席', reading: 'にゅうしつ・ちゃくせき',
    vi: 'Vào phòng và ngồi',
    summary: 'Trình tự gốc: gõ 3 lần → nghe “どうぞ” → nói “失礼します” khi mở cửa → 会釈 15° → đóng cửa nhẹ → 敬礼 30° → đi đến ghế → giới thiệu tên và 最敬礼 45° → chỉ ngồi sau khi được mời.',
    points: ['3回ノック', '失礼します', '会釈15°', '敬礼30°', '最敬礼45°', 'おかけください→着席'],
    doText: 'Luyện cả câu nói lẫn động tác theo đúng thứ tự.',
    dontText: 'Vừa nói vừa cúi sâu ở phần 敬礼/最敬礼.'
  },
  {
    id: 'h18', page: 18, title: '退室', reading: 'たいしつ',
    vi: 'Rời phòng',
    summary: 'Khi được báo kết thúc: cúi khi đang ngồi → đứng cạnh ghế và nói cảm ơn kèm 最敬礼 → trước khi ra cửa quay lại 敬礼. Tài liệu cũng lưu ý cách đặt túi, ô và hỏi về việc đeo khẩu trang nếu cần.',
    points: ['ありがとうございました', '最敬礼45°', '出口で敬礼30°', 'かばんは床', '傘の扱い'],
    doText: 'Giữ tác phong đến tận khi rời khỏi phòng.',
    dontText: 'Vừa phỏng vấn xong là thả lỏng ngay.'
  },
  {
    id: 'h19', page: 19, title: 'ビジネス・接遇用語', reading: 'ビジネス・せつぐう ようご',
    vi: 'Kính ngữ và ngôn ngữ business',
    summary: 'Ôn 尊敬語・謙譲語・丁寧語 và các động từ thường gặp như いらっしゃる／伺う／拝見する／申す／おっしゃる. Tài liệu cũng nêu các lỗi kính ngữ thường gặp.',
    points: ['尊敬語', '謙譲語', '丁寧語', '御社・弊社', 'よく使われる間違った敬語'],
    doText: 'Ưu tiên vài mẫu chắc chắn dùng đúng.',
    dontText: 'Cố dùng kính ngữ quá khó rồi dùng sai chủ thể.'
  },
  {
    id: 'h20', page: 20, title: '接遇用語', reading: 'せつぐう ようご',
    vi: 'Cách nói lịch sự trong môi trường công việc',
    summary: 'Trang này chuyển cách nói đời thường sang cách lịch sự hơn, ví dụ よろしいですか, かしこまりました, 少々お待ちください, 恐れ入りますが, お差し支えなければ.',
    points: ['よろしいですか', 'かしこまりました', '少々お待ちください', '恐れ入りますが', 'お差し支えなければ'],
    doText: 'Học theo cụm hoàn chỉnh.',
    dontText: 'Dịch từng chữ từ tiếng Việt sang tiếng Nhật.'
  },
  {
    id: 'h21', page: 21, title: 'お礼状サンプル', reading: 'おれいじょう サンプル',
    vi: 'Mẫu thư cảm ơn sau phỏng vấn',
    summary: 'Tài liệu cho một mẫu thư cảm ơn. Đây không phải việc bắt buộc; có thể dùng khi mức độ mong muốn vào công ty cao hoặc muốn follow-up sau phỏng vấn.',
    points: ['必ずしも書く必要はない', '志望度が高い会社へのアピール', '面接後のフォロー'],
    doText: 'Nếu gửi, cá nhân hóa dựa trên nội dung đã trao đổi trong buổi phỏng vấn.',
    dontText: 'Gửi mẫu copy-paste y hệt cho mọi công ty.'
  }
]

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
  if (!furigana || !reading) return <span className={className}>{text}</span>
  return <ruby className={className}>{text}<rt>{reading}</rt></ruby>
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

function App() {
  const [screen, setScreen] = useState('home')
  const [furigana, setFurigana] = useStoredState('ns-furigana', true)
  const [answers, setAnswers] = useStoredState('ns-answers', {})
  const [bookmarks, setBookmarks] = useStoredState('ns-bookmarks', [])
  const [learned, setLearned] = useStoredState('ns-learned', [])
  const [streak] = useStoredState('ns-streak', { count: 1, last: new Date().toISOString().slice(0,10) })
  const [filter, setFilter] = useState('Tất cả')
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

        <section className="content-card"><h2>💡 Hiểu nhanh</h2><p className="large-text">{l.summary}</p></section>
        <section className="content-card"><h2>🧩 Ý chính</h2><div className="chip-wrap">{l.points.map(x=><span className="chip" key={x}>{x}</span>)}</div></section>
        <section className="do-dont"><div className="do"><h3>✅ Nên</h3><p>{l.doText}</p></div><div className="dont"><h3>💀 Tự hủy nếu...</h3><p>{l.dontText}</p></div></section>
        <button className={"learn-btn " + (learned.includes(l.id)?'done':'')} onClick={()=>toggleLearned(l.id)}>{learned.includes(l.id)?'✅ Đã học xong':'○ Đánh dấu đã học'}</button>
      </main>
    </div>
  }

  if (screen === 'questions') {
    return <div className="app-shell">
      <Header title="面接質問集" onBack={() => setScreen('interview')} />
      <main className="page">
        <div className="source-order"><b>📖 原文順</b><span>Luôn giữ thứ tự nguồn; filter chỉ giúp tìm nhanh.</span></div>
        <input className="search-box" placeholder="🔍 Tìm bằng Nhật hoặc Việt..." value={search} onChange={e=>setSearch(e.target.value)} />
        <div className="filter-scroll">{categories.map(c=><button key={c} className={filter===c?'active':''} onClick={()=>setFilter(c)}>{c}</button>)}</div>
        <div className="question-list">{filteredQuestions.map(q=><button className="question-row" key={q.id} onClick={()=>openQ(q)}>
          <div className="q-num">{String(q.order).padStart(2,'0')}</div>
          <div><h3><RubyLine text={q.jp} reading={q.reading} furigana={furigana}/></h3><p>{q.vi}</p><span className="tag">{q.category}</span></div>
          <div className="q-status">{answers[q.id] ? '✍️' : ''}{bookmarks.includes(q.id) ? '⭐' : ''}{learned.includes(q.id) ? '✅' : ''}</div>
        </button>)}</div>
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
  )

  return null
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
