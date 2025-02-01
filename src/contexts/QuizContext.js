import React, { createContext, useState, useContext } from 'react';
import apiClient from '../api/apiClient';
import UserDB from '../db/userDB';

const QuizContext = createContext({});

export function QuizProvider({ children }) {
  const [quizData, setQuizData] = useState({
    pergunta1: {
      date: new Date(),
      isToday: false
    },
    pergunta2: {
      texto: ''
    },
    pergunta3: {
      sentimentosList: [],
      observacoes: '',
      selectedSentimento: '',
      selectedIntensidade: '1'
    },
    pergunta4: {
      texto: ''
    },
    pergunta5: {
      texto: ''
    },
    pergunta6: {
      texto: '',
      reavaliacoes: []
    }
  });

  const clearQuizData = () => {
    setQuizData({
      pergunta1: {
        date: new Date(),
        isToday: false
      },
      pergunta2: {
        texto: ''
      },
      pergunta3: {
        sentimentosList: [],
        observacoes: '',
        selectedSentimento: '',
        selectedIntensidade: '1'
      },
      pergunta4: {
        texto: ''
      },
      pergunta5: {
        texto: ''
      },
      pergunta6: {
        texto: '',
        reavaliacoes: []
      }
    });
  };

  const updateQuizData = (pergunta, data) => {
    setQuizData(prev => ({
      ...prev,
      [pergunta]: {
        ...prev[pergunta],
        ...data
      }
    }));
  };

  const saveQuiz = async (titulo = 'Sem título') => {
    try {
      const novoRegistro = {
        id: Date.now().toString(),
        titulo: titulo,
        data: quizData.pergunta1.date,
        situacao: quizData.pergunta2.texto,
        sentimentos: quizData.pergunta3.sentimentosList,
        pensamentosAutomaticos: quizData.pergunta4.texto,
        pensamentosAdaptativos: quizData.pergunta5.texto,
        reavaliacao: {
          texto: quizData.pergunta6.texto,
          reavaliacoes: quizData.pergunta6.reavaliacoes
        }
      };
      
      // Salva localmente usando UserDB
      await UserDB.saveQuizRegistro(novoRegistro);
      
      // Tenta salvar no backend
      try {
        await apiClient.post('/registros', novoRegistro);
      } catch (backendError) {
        console.error('Erro ao salvar registro no backend', backendError);
      }
      
      clearQuizData();
      return true;
    } catch (error) {
      console.error('Erro ao salvar quiz:', error);
      return false;
    }
  };

  const fetchQuizRegistros = async () => {
    try {
      const backendResponse = await apiClient.get('/registros');
      return backendResponse.data;
    } catch (backendError) {
      console.error('Erro ao buscar registros do backend', backendError);
      return await UserDB.getQuizRegistros();
    }
  };

  return (
    <QuizContext.Provider
      value={{
        quizData,
        updateQuizData,
        clearQuizData,
        saveQuiz,
        fetchQuizRegistros
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
} 