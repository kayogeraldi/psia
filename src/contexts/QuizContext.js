import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const saveQuiz = async () => {
    try {
      // Pegar registros existentes
      const existingData = await AsyncStorage.getItem('quizRegistros');
      const registros = existingData ? JSON.parse(existingData) : [];
      
      // Adicionar novo registro
      const novoRegistro = {
        id: Date.now().toString(),
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
      
      registros.push(novoRegistro);
      await AsyncStorage.setItem('quizRegistros', JSON.stringify(registros));
      
      // Limpar o quiz atual
      clearQuizData();
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar quiz:', error);
      return false;
    }
  };

  return (
    <QuizContext.Provider
      value={{
        quizData,
        updateQuizData,
        clearQuizData,
        saveQuiz
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