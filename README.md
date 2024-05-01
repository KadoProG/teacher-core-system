# 個別教師 システム

手動でやっている作業（Excel Wordでの入力）をシステム化する。

## 概要

英単語を管理し、その英単語からランダムに単語を出題し、印刷できるようにしたもの。
友達が塾のアルバイトをしているが、WordやExcelの単純作業が多く、また単語をランダムに出題するのが手間がかかりすぎてできていない、という現状があった。そこで、単語テストを自動化するシステムを打ち合わせしながら決めて作成に至った。

|単語リスト画面|印刷画面|
|-|-|
|<img width="980" alt="icatch" src="https://github.com/KadoProG/teacher-core-system/assets/65702927/eca33bd7-4946-48ba-88cd-6ae8a9ef3b3c">|<img width="960" alt="スクリーンショット 2024-04-24 10 28 23" src="https://github.com/KadoProG/teacher-core-system/assets/65702927/7d022c69-14ce-4cb2-8703-88ade56d030a">|


### 技術スタック

- フロントエンド
  - Next.js（App Router）
  - TypeScript
  - MUI
- バックエンド
  - Next.js（API Router）
- インフラ
  - 認証→NextAuth
  - DB→firebase
  - デプロイ→Vercel


## 作業ログ

- 2024/04/17 v1.0.0 最低限、単語リストの追加・削除ができ、ランダムに印刷ができる状態となったため友達にリリース
- 2024/04/22 v1.0.1 ダークモードのフル対応
- 2024/04/24 v1.0.2 アクセシビリティの修正
- 2024/04/24 v1.0.3 削除・ログアウト時の確認ダイアログの表示と、印刷アーカイブの氏名記述
- 2024/05/01 v1.1.0 api routerの削除、アカウント認証のfirebase移行、firebaseテーブルの最適化
