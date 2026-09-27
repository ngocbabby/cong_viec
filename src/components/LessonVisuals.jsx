import React from 'react'

const Person = ({x=0,y=0,label='Bạn',suit=false}) => (
  <g transform={'translate('+x+' '+y+')'}>
    <circle cx="28" cy="22" r="16" fill="#ffd8b5" stroke="#72513e" strokeWidth="2"/>
    <path d="M13 18c3-15 27-16 31 0" fill="#5a4034"/>
    <rect x="9" y="39" width="38" height="52" rx="15" fill={suit ? "#6e596b" : "#f1b3c0"} stroke="#72513e" strokeWidth="2"/>
    {suit && <path d="M20 40l8 13 8-13M28 53v28" fill="none" stroke="#fff" strokeWidth="2"/>}
    <text x="28" y="108" textAnchor="middle" fontSize="12" fill="#6d5142">{label}</text>
  </g>
)

const Panel = ({children}) => <div className="lesson-visual">{children}</div>

export default function LessonVisual({type}) {
  if (type === 'flow') return <Panel>
    <div className="flow-title">面接の流れ</div>
    <div className="flow-track">
      {['自己紹介','職務経歴','志望動機','自己PR','退職理由','逆質問'].map((x,i)=><React.Fragment key={x}><div className="flow-pill"><b>{i+1}</b><span>{x}</span></div>{i<5&&<span className="flow-arrow">→</span>}</React.Fragment>)}
    </div>
    <div className="visual-caption">Meling Chan tip: 順番が変わっても焦らない 👀</div>
  </Panel>

  if (type === 'venn') return <Panel>
    <svg viewBox="0 0 520 250" className="diagram-svg">
      <circle cx="195" cy="120" r="92" fill="#ffdce6" fillOpacity=".86" stroke="#ba6b7e" strokeWidth="3"/>
      <circle cx="325" cy="120" r="92" fill="#ffe8a5" fillOpacity=".82" stroke="#b48a2d" strokeWidth="3"/>
      <text x="155" y="82" fontSize="21" fontWeight="800" fill="#6d4050">私</text>
      <text x="355" y="82" fontSize="21" fontWeight="800" fill="#6e5524">企業</text>
      <text x="145" y="112" fontSize="15">能力・長所</text><text x="145" y="135" fontSize="15">強み・知識</text>
      <text x="330" y="112" fontSize="14">求める人物像</text><text x="330" y="135" fontSize="14">必要な能力</text><text x="330" y="158" fontSize="14">社風・商品</text>
      <rect x="226" y="92" width="70" height="58" rx="18" fill="#fff" stroke="#9e7f6a" strokeWidth="2"/>
      <text x="261" y="116" textAnchor="middle" fontSize="15" fontWeight="800">共通点</text>
      <text x="261" y="139" textAnchor="middle" fontSize="13">＝PR</text>
    </svg>
    <div className="visual-caption">Điểm giao nhau mới là “アピールポイント”.</div>
  </Panel>

  if (type === 'bow') return <Panel>
    <div className="bow-grid">
      <div><div className="stick">🧍‍♀️</div><b>会釈 15°</b><small>Chào nhẹ</small></div>
      <div><div className="stick tilt30">🧍‍♀️</div><b>敬礼 30°</b><small>Chào chuẩn</small></div>
      <div><div className="stick tilt45">🧍‍♀️</div><b>最敬礼 45°</b><small>Chào sâu</small></div>
    </div>
    <div className="bow-sequence">👀 → cúi từ hông → dừng → đứng lên chậm → 👀</div>
  </Panel>

  if (type === 'enter') return <Panel>
    <div className="scene-grid">
      <div className="scene"><span>🚪</span><b>① 3回ノック</b></div>
      <div className="scene"><span>🙇‍♀️</span><b>②「失礼します」+ 15°</b></div>
      <div className="scene"><span>🚶‍♀️</span><b>③ Đóng cửa → đi đến ghế</b></div>
      <div className="scene"><span>🙇‍♀️</span><b>④ 敬礼 30°</b></div>
      <div className="scene"><span>🪑🧍‍♀️</span><b>⑤ Đứng cạnh ghế + 45°</b></div>
      <div className="scene"><span>🪑🙂</span><b>⑥ Được mời mới ngồi</b></div>
    </div>
  </Panel>

  if (type === 'exit') return <Panel>
    <div className="scene-grid four">
      <div className="scene"><span>🪑🙇‍♀️</span><b>① Ngồi cúi 30°</b></div>
      <div className="scene"><span>🧍‍♀️</span><b>② Đứng cạnh ghế</b></div>
      <div className="scene"><span>🙇‍♀️</span><b>③ Cảm ơn + 45°</b></div>
      <div className="scene"><span>🚪🙇‍♀️</span><b>④ Cửa: quay lại 30°</b></div>
    </div>
    <div className="visual-caption">Phỏng vấn chưa “xong” cho tới khi bạn rời phòng.</div>
  </Panel>

  if (type === 'motivation') return <Panel>
    <div className="triangle-flow">
      <div><b>WHY</b><span>なぜこの仕事・会社？</span></div>
      <span>＋</span>
      <div><b>CAN</b><span>何ができる？</span></div>
      <span>＋</span>
      <div><b>WILL</b><span>どう貢献する？</span></div>
    </div>
    <div className="visual-caption">志望動機 = WHY + CAN + WILL</div>
  </Panel>

  if (type === 'turnPositive') return <Panel>
    <div className="positive-flow"><div className="negative-box">😵 不満だけ<br/><small>“Sếp tệ / lương thấp / quá mệt”</small></div><span>→</span><div className="bridge-box">📌 客観的事実<br/><small>Sự thật ngắn gọn</small></div><span>→</span><div className="positive-box">🌱 今後どうしたい<br/><small>Muốn hướng tới điều gì</small></div></div>
  </Panel>

  if (type === 'reverseQ') return <Panel>
    <div className="reverse-card"><span className="big-emoji">🙋‍♀️</span><div><b>「最後に何か質問はありますか？」</b><p>Đây không phải phần “cho có”. Câu hỏi của bạn cũng cho thấy mức độ quan tâm và sự chuẩn bị.</p></div></div>
  </Panel>

  if (type === 'timeline') return <Panel>
    <div className="career-line">
      <div>🏢<b>会社</b></div><span>→</span><div>🧰<b>担当業務</b></div><span>→</span><div>🧠<b>身につけたこと</b></div><span>→</span><div>✨<b>やりがい</b></div><span>→</span><div>📜<b>資格・学習</b></div>
    </div>
  </Panel>

  if (type === 'strength') return <Panel>
    <div className="strength-cloud"><span>💪 勤勉性</span><span>👀 観察力</span><span>🗣 コミュ力</span><span>💡 発想力</span><span>🗓 計画性</span><span>🤝 礼儀・自己管理</span></div>
  </Panel>

  if (type === 'reframe') return <Panel>
    <div className="reframe-visual"><div>😣 がんこ</div><span>→ 見方を変える →</span><div>💪 意志が強い</div></div>
    <div className="visual-caption">Sự thật không đổi. Cách đóng khung thay đổi.</div>
  </Panel>

  if (type === 'questionMap') return <Panel>
    <div className="question-map">{['人物像','性格・価値観','志望動機','転職理由','職歴','給与・待遇','その他'].map(x=><span key={x}>{x}</span>)}</div>
  </Panel>

  if (type === 'priority') return <Panel>
    <div className="priority-scale"><span>1<br/><small>ít quan trọng</small></span><i/><span>2</span><i/><span>3</span><i/><span>4</span><i/><span>5<br/><small>rất quan trọng</small></span></div>
  </Panel>

  if (type === 'checklist') return <Panel>
    <div className="check-visual"><span>⭕ うまくいった</span><span>❌ できなかった</span><span>➡️ 次に直す</span></div>
  </Panel>

  if (type === 'keigo' || type === 'polite') return <Panel>
    <div className="keigo-visual"><span>🙂 普通</span><b>→</b><span>🎩 丁寧</span><b>→</b><span>💼 面接で自然</span></div>
  </Panel>

  if (type === 'letter') return <Panel>
    <div className="letter-paper"><div className="stamp">御礼</div><p>面接へのお礼</p><p>理解が深まった点</p><p>志望度・貢献意欲</p><p className="sign">敬具</p></div>
  </Panel>

  if (type === 'manner') return <Panel>
    <div className="manner-icons"><span>👔 服装</span><span>🙇 お辞儀</span><span>🚪 入室</span><span>🪑 着席</span><span>👋 退室</span><span>🎩 敬語</span></div>
  </Panel>

  if (type === 'worksheet') return <Panel>
    <div className="worksheet-stack"><span>🧾 経歴</span><span>💪 強み</span><span>🧠 質問準備</span><span>🎯 希望条件</span><span>✅ 自己点検</span></div>
  </Panel>

  if (type === 'toc') return <Panel>
    <div className="toc-visual"><Person x={10} y={5} suit/><div className="toc-list">{['面接とは','面接の流れ','志望動機','自己PR','退職理由','企業への質問'].map(x=><span key={x}>• {x}</span>)}</div></div>
  </Panel>

  return null
}
