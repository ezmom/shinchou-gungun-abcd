# Shinchou Gungun ABCD Compare

伸長ぐんぐん習慣（4月HIT記事）の 5月向け BCD 仮説検証用 比較ビュー。

## 構成
- `public/index.html` — 4pane 比較ビュー
- `public/A.html` — A原本（SB 4月HIT / 潜在層 Lv.3）
- `public/B.html` — 顕在層「選ぶ基準が違った」
- `public/C.html` — 準顕在層「飲ませる前提を覆す」
- `public/D.html` — 潜在層 通年版（最小差分）
- `middleware.ts` — Vercel Edge Basic認証

## ホスティング
- Vercel（Basic認証つき）
- 環境変数: `BASIC_AUTH_USER`, `BASIC_AUTH_PASSWORD`

## 背景
Zver RAG（183ブロック解析）→ CMO オーケストレーション → Gate-L3 FULL_PASS (15/15) で生成。
勝ちAtom 5/5 保持、変更ブロック 16/183 = 8.7%。
