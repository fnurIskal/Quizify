import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import axios from "axios";

const options = ["option_1", "option_2", "option_3", "option_4"];

export default function QuizPage() {
  const { id } = useLocalSearchParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isAnswer, setIsAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [time, setTime] = useState(15);
  const [correctNum, setCorrectNum] = useState(0);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/categories/${id}`
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("veri çekme hatasi", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      handleNextQuestion();
    }
  }, [time]);

  useEffect(() => {
    if (answer) {
      if (answer === questions[currentQuestionIndex]?.answer.trim()) {
        setIsCorrect(true);
        setCorrectNum((prev) => prev + 1);
      } else {
        setIsCorrect(false);
      }
      console.log(answer);
      console.log(isCorrect);
      console.log(questions[currentQuestionIndex]?.answer.trim());
    }
  }, [answer]);

  const handleAnswer = (selectedOption) => {
    if (!isAnswer) {
      setAnswer(selectedOption);
      setIsAnswer(true);
    }
  };

  const handleNextQuestion = () => {
    if (answer || time === 0) {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsCorrect(false);
        setIsAnswer(false);
        setAnswer("");
        setTime(15);
      } else {
        console.log("Quiz tamamlandı!");
      }
    } else {
      console.log("Cevap seçilmedi.");
    }
  };

  if (questions.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#acded5] justify-around items-center p-4">
      {/* Geri Tuşu */}
      <Pressable
        onPress={() => router.push("/(tabs)/category")}
        className="absolute top-5 left-4"
      >
        <Image
          style={{ height: 35, width: 35 }}
          source={require("../../assets/images/back.png")}
        />
      </Pressable>
      {/* Üst Kısım */}
      <View className="w-ful gap-4">
        {/* Soru Numarası */}
        <Text className="text-[#713c8d] text-lg font-bold text-center mt-2">
          {currentQuestionIndex + 1} / {questions.length}
        </Text>
        <View className="flex justify-center items-center relative w-full">
          {/* Soru Kutusu */}
          <View className="w-full bg-[#005456] border rounded-3xl p-10 mt-4 relative">
            {/* Sayaç */}
            <Text className="absolute -top-6 left-1/2 border border-[#fff] -translate-x-1/2 text-[#acded5] bg-[#005456] text-lg font-bold text-center rounded-full w-12 h-12 flex items-center justify-center">
              {time}
            </Text>

            <Text className="text-white text-center text-base mt-4">
              {questions[currentQuestionIndex]?.question}
            </Text>
          </View>
        </View>
      </View>

      {/* Cevaplar */}
      <View className="gap-2">
        {options.map((option, index) => {
          const getBgColor = (option) => {
            if (!isAnswer) return " bg-[#acded5]";
            if (
              questions[currentQuestionIndex]?.[option] ===
              questions[currentQuestionIndex]?.answer.trim()
            )
              return "bg-[#53e368]"; // Doğru cevap yeşil
            else if (questions[currentQuestionIndex]?.[option] === answer) {
              return "bg-[#771f29]";
            }
            // Yanlış işaretlenen seçenek kırmızı
            return "bg-[#acded5]"; // Diğerleri varsayılan
          };

          return (
            <Pressable
              key={index}
              className={`${getBgColor(
                option
              )} w-72 font-bold py-3 px-6 rounded-2xl border`}
              onPress={() =>
                !isAnswer &&
                handleAnswer(questions[currentQuestionIndex]?.[option])
              }
            >
              <Text className="font-bold text-base text-[#713c8d]">
                {questions[currentQuestionIndex]?.[option]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Sonraki Buton */}
      <View className="w-full items-center">
        <Pressable
          className="bg-[#005456] py-3 px-10 rounded-2xl"
          onPress={handleNextQuestion}
        >
          {currentQuestionIndex === questions.length - 1 ? (
            <Text
              onPress={() => router.push(`/finish/${correctNum}`)}
              className="text-[#acded5] font-bold text-lg"
            >
              Finish
            </Text>
          ) : (
            <Text className="text-[#acded5] font-bold text-lg">Next</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
