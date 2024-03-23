import axios from 'axios';
import exceljs from 'exceljs';
import React from 'react';
import { convertCellToString } from '@/utils/excelUtils';

export const useEnglishWordPrac = () => {
  const [sessions, setSessions] = React.useState<IEnglishWordPracSession[]>([]);
  const [words, setWords] = React.useState<IEnglishWordPracWord[]>([]);

  const [selectedSession, setSelectedSession] =
    React.useState<IEnglishWordPracSession>();

  const fetchSessions = async () => {
    const response = await fetch('/api/english/word_prac/sessions', {
      method: 'GET',
    });
    const { sessions } = await response.json();
    setSessions(sessions);
    setSelectedSession(sessions[0] ?? undefined);
  };

  const fetchWords = async () => {
    const response = await fetch('/api/english/word_prac/words', {
      method: 'GET',
    });
    const { words } = await response.json();
    setWords(words);
  };

  React.useEffect(() => {
    fetchSessions();
  }, []);

  React.useEffect(() => {
    fetchWords();
  }, [selectedSession]);

  const uploadWords = React.useCallback(
    async (
      words: {
        row: number;
        session_id: number;
        en_title: string;
        jp_title: string;
        study_year: string;
      }[]
    ) => {
      try {
        await axios.put('/api/english/word_prac/words', { words });
        fetchWords();
      } catch (error) {
        // eslint-disable-next-line
        console.error('Wordデータのアップロードに失敗しました:', error);
      }
    },
    []
  );

  // Excelファイルを処理する関数
  const processWordExcelData = React.useCallback(
    async (worksheet: exceljs.Worksheet) => {
      const words: {
        row: number;
        session_id: number;
        en_title: string;
        jp_title: string;
        study_year: string;
      }[] = [];

      for (let i = 2; i < 1000; i++) {
        const row: exceljs.Row = worksheet.getRow(i);
        const id = row.getCell(1).value as number;
        const sessionStringValue = row.getCell(2).value; // セッション
        const enTitleValue = row.getCell(3).value; // 英語
        const jpTitleValue = row.getCell(4).value; // 日本語
        const studyYear = row.getCell(5).value; // 履修学年

        try {
          if (id && sessionStringValue && enTitleValue && jpTitleValue) {
            const sessionString = convertCellToString(sessionStringValue);
            const session_id = sessions.find(
              (session) =>
                `${String(session.id).padStart(2, '0')}　${session.title}` ===
                sessionString
            )?.id;
            if (!session_id) throw new Error('存在しないSessionです');
            const en_title = convertCellToString(enTitleValue);
            const jp_title = convertCellToString(jpTitleValue);
            const study_year = convertCellToString(studyYear);
            words.push({
              row: id,
              session_id,
              en_title,
              jp_title,
              study_year,
            });
          }
        } catch (e) {
          throw new Error(`${i}行目付近にエラーがありました：${e}`);
        }
      }
      await uploadWords(words);
    },
    [sessions, uploadWords]
  );

  return {
    /**
     * セッションデータ
     */
    sessions,
    /**
     * Wordデータ
     */
    words,
    /**
     * Excelデータアップロード（ワーク取得成功）時の処理
     */
    processWordExcelData,
  };
};
