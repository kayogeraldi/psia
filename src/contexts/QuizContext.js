import React, { createContext, useState, useContext } from 'react';
import apiClient from '../api/apiClient';
import UserDB from '../db/userDB';
import RpdService from '../api/services/rpdService';

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
      // Converte os sentimentos para o formato esperado
      const sentimentosObj = {};
      quizData.pergunta3.sentimentosList.forEach(sentimento => {
        sentimentosObj[sentimento.sentimento.toLowerCase()] = sentimento.intensidade;
      });

      const novoRpd = [{
        titulo: titulo,
        motivos: quizData.pergunta2.texto,
        sentimentos: sentimentosObj,
        rereavaliacaoDoHumor: quizData.pergunta3.observacoes,
        pensamentosAutomaticos: quizData.pergunta4.texto,
        pensamentosAdaptativos: quizData.pergunta5.texto,
        reavaliacaoDoHumor: quizData.pergunta6.texto,
        dataRpd: quizData.pergunta1.date.toLocaleDateString('pt-BR').replace("/", "-").replace("/", "-")
      }];
      
      // Tenta salvar usando o RpdService
      try {
        await RpdService.inserir(novoRpd);
        clearQuizData();
        return true;
      } catch (backendError) {
        console.error('Erro ao salvar RPD no backend:', backendError);
        // Salva localmente como fallback
        await UserDB.saveQuizRegistro(novoRpd[0]);
        return false;
      }
    } catch (error) {
      console.error('Erro ao salvar RPD:', error);
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