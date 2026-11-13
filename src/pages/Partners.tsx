import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  CONTACT,
  FAQS,
  FORM_ENDPOINT,
  PROGRAMS,
  STATS,
  STEPS,
  TERMS,
} from '../data/partners';

export function Partners() {
  const [sent, setSent] = useState(false);
  const [program, setProgram] = useState(PROGRAMS[0].id);

  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const data = new FormData(e.currentTarget);
    const field = (name: string) => String(data.get(name) ?? '').trim();
    const programTitle =
      PROGRAMS.find((p) => p.id === program)?.title ?? '其他';

    setSending(true);
    setError('');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `【零件咖 合作需求】${programTitle} — ${field('contact')}`,
          _template: 'table',
          _honey: field('_honey'),
          合作項目: programTitle,
          '公司 / 店名': field('company') || '(未填)',
          聯絡人: field('contact'),
          // 欄位名稱用 email,FormSubmit 會自動設為回信地址
          email: field('email'),
          電話: field('phone') || '(未填)',
          '機型 / 品項 / 數量': field('items') || '(未填)',
          需求說明: field('message') || '(未填)',
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || String(json?.success) !== 'true') {
        throw new Error('send failed');
      }
      setSent(true);
    } catch {
      setError('送出失敗,請稍後再試,或改用蝦皮聊聊與我們聯絡。');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="hero-tag">Business Partnership</p>
          <h1 className="page-title">商業合作項目</h1>
          <p className="page-desc">
            從單店維修到連鎖保養,零件咖提供零件批發、原廠代訂、缺件尋源與設備服務。
            提出需求,兩個工作天內回覆方案。
          </p>
          <div className="page-actions">
            <button
              type="button"
              className="add-btn"
              onClick={() =>
                document
                  .getElementById('partner-form')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            >
              提出合作需求
            </button>
            <a
              className="ghost-btn"
              href={CONTACT.shopee}
              target="_blank"
              rel="noreferrer"
            >
              蝦皮聊聊詢問 ↗
            </a>
          </div>
          <div className="hero-stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="main page-main">
        <section className="page-section" id="programs">
          <div className="section-head">
            <h2 className="section-title">合作項目</h2>
            <span className="section-count">{PROGRAMS.length} 種方案</span>
          </div>
          <div className="program-grid">
            {PROGRAMS.map((p) => (
              <article className="program" key={p.id}>
                <div className="program-head">
                  <h3 className="program-title">{p.title}</h3>
                  <p className="program-target">適合:{p.target}</p>
                </div>
                <p className="program-summary">{p.summary}</p>
                <ul className="program-points">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <a
                  className="program-cta"
                  href="#partner-form"
                  onClick={(e) => {
                    e.preventDefault();
                    setProgram(p.id);
                    document
                      .getElementById('partner-form')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  詢問此方案 →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section">
          <div className="section-head">
            <h2 className="section-title">合作流程</h2>
          </div>
          <ol className="steps">
            {STEPS.map((s) => (
              <li className="step" key={s.n}>
                <span className="step-n">{s.n}</span>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="page-section two-col">
          <div>
            <div className="section-head">
              <h2 className="section-title">合作條件</h2>
            </div>
            <dl className="terms">
              {TERMS.map((t) => (
                <div className="term" key={t.k}>
                  <dt>{t.k}</dt>
                  <dd>{t.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <div className="section-head">
              <h2 className="section-title">常見問題</h2>
            </div>
            <div className="faqs">
              {FAQS.map((f) => (
                <details className="faq" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section" id="partner-form">
          <div className="section-head">
            <h2 className="section-title">提出合作需求</h2>
            <span className="section-count">2 個工作天內回覆</span>
          </div>
          <div className="form-wrap">
            {sent ? (
              <div className="form-done">
                <h3>已收到您的需求</h3>
                <p>
                  我們將在 2 個工作天內以 Email 回覆報價與方案。急件請直接來電{' '}
                  {CONTACT.phone}({CONTACT.hours})。
                </p>
                <button className="ghost-btn" onClick={() => setSent(false)}>
                  再填一筆
                </button>
              </div>
            ) : (
              <form className="partner-form" onSubmit={onSubmit}>
                <label>
                  合作項目
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                  >
                    {PROGRAMS.map((p, i) => (
                      <option key={p.id} value={p.id}>
                        {i + 1}. {p.title}
                      </option>
                    ))}
                    <option value="other">{PROGRAMS.length + 1}. 其他</option>
                  </select>
                </label>
                <label>
                  公司 / 店名(非必填)
                  <input name="company" placeholder="例:山丘咖啡有限公司" />
                </label>
                <label>
                  聯絡人
                  <input name="contact" required placeholder="姓名" />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="name@company.com"
                  />
                </label>
                <label>
                  電話
                  <input name="phone" type="tel" placeholder="09xx-xxx-xxx" />
                </label>
                <label>
                  機型 / 品項 / 數量
                  <input
                    name="items"
                    placeholder="例:Faema E98RE 沖泡頭墊圈 x 50"
                  />
                </label>
                <label className="span-2">
                  需求說明
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="請描述合作需求、預估月採購量、希望的帳期或交期。"
                  />
                </label>
                {/* 防機器人欄位:真人看不到也不會填 */}
                <input
                  className="form-honey"
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="form-foot span-2">
                  {error && (
                    <p className="form-note form-error" role="alert">
                      {error}
                    </p>
                  )}
                  <button className="add-btn" type="submit" disabled={sending}>
                    {sending ? '送出中…' : '送出需求'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
