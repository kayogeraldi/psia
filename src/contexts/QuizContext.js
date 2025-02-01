import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/apiClient';

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
      // Busca os registros existentes
      const existingData = await AsyncStorage.getItem('quizRegistros');
      const registros = existingData ? JSON.parse(existingData) : [];
      
      // Cria novo registro
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
      
      // Salva no AsyncStorage
      registros.push(novoRegistro);
      await AsyncStorage.setItem('quizRegistros', JSON.stringify(registros));
      
      // Tenta salvar no backend
      try {
        await apiClient.post('/registros', novoRegistro);
      } catch (backendError) {
        console.error('Erro ao salvar registro no backend', backendError);
        // Opcional: Adicionar lógica de sincronização posterior
      }
      
      // Limpa o quiz atual
      clearQuizData();
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar quiz:', error);
      return false;
    }
  };

  const fetchQuizRegistros = async () => {
    try {
      // Primeiro, tenta buscar do backend
      const backendResponse = await apiClient.get('/registros');
      
      // Se sucesso, retorna os registros do backend
      return backendResponse.data;
    } catch (backendError) {
      console.error('Erro ao buscar registros do backend', backendError);
      
      // Fallback para registros locais
      const localData = await AsyncStorage.getItem('quizRegistros');
      return localData ? JSON.parse(localData) : [];
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