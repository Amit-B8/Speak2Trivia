"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, RotateCcw, Trophy } from 'lucide-react'

interface Question {
  id: number
  question: string
  answer: string
  category: string
  difficulty: "easy" | "medium" | "hard"
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What color do you get when you mix red and blue?",
    answer: "purple",
    category: "Colors",
    difficulty: "easy",
  },
  { id: 2, question: "How many legs does a spider have?", answer: "eight", category: "Animals", difficulty: "easy" },
  {
    id: 3,
    question: "What is the largest organ in the human body?",
    answer: "skin",
    category: "Biology",
    difficulty: "medium",
  },
  {
    id: 4,
    question: "Who is Thor's brother in Marvel comics?",
    answer: "loki",
    category: "Marvel",
    difficulty: "medium",
  },
  {
    id: 5,
    question: "What gas do plants absorb from the atmosphere during photosynthesis?",
    answer: "carbon dioxide",
    category: "Biology",
    difficulty: "hard",
  },
]

export default function Speak2Learn() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [feedback, setFeedback] = useState("")
  const [gameMode, setGameMode] = useState<"kids" | "biology" | "marvel" | null>(null)
  const [recognition, setRecognition] = useState<any>(null)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = "en-US"

      recognitionInstance.onresult = (event: any) => {
        const result = event.results[0][0].transcript.toLowerCase().trim()
        setTranscript(result)
        checkAnswer(result)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const startGame = (mode: "kids" | "biology" | "marvel") => {
    setGameMode(mode)
    setScore(0)
    setTotalQuestions(0)
    setIsComplete(false)
    setFeedback("")
    setTranscript("")
    getNextQuestion(mode)
  }

  const getNextQuestion = (mode: string) => {
    const filteredQuestions = sampleQuestions.filter((q) => {
      if (mode === "kids") return q.difficulty === "easy"
      if (mode === "biology") return q.category === "Biology"
      if (mode === "marvel") return q.category === "Marvel"
      return true
    })

    if (filteredQuestions.length > 0) {
      const randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)]
      setCurrentQuestion(randomQuestion)
      setTimeout(() => speakText(randomQuestion.question), 500)
    }
  }

  const startListening = () => {
    if (recognition && !isListening) {
      setIsListening(true)
      setTranscript("")
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop()
      setIsListening(false)
    }
  }

  const checkAnswer = (userAnswer: string) => {
    if (!currentQuestion) return

    const correctAnswer = currentQuestion.answer.toLowerCase()
    const isCorrect = userAnswer.includes(correctAnswer) || correctAnswer.includes(userAnswer)

    if (isCorrect) {
      setScore(score + 1)
      setFeedback("Correct! Great job! 🎉")
      speakText("Correct! Great job!")
    } else {
      setFeedback(`Not quite right. The answer was: ${currentQuestion.answer}`)
      speakText(`Not quite right. The answer was ${currentQuestion.answer}`)
    }

    setTotalQuestions(totalQuestions + 1)

    // Check if game is complete (10 questions or 7 correct answers)
    if (totalQuestions + 1 >= 10 || score + (isCorrect ? 1 : 0) >= 7) {
      setIsComplete(true)
      setTimeout(() => {
        speakText(
          `Game complete! You got ${score + (isCorrect ? 1 : 0)} out of ${totalQuestions + 1} questions correct!`,
        )
      }, 2000)
    } else {
      // Get next question after a delay
      setTimeout(() => {
        getNextQuestion(gameMode!)
        setFeedback("")
        setTranscript("")
      }, 3000)
    }
  }

  const resetGame = () => {
    setGameMode(null)
    setCurrentQuestion(null)
    setScore(0)
    setTotalQuestions(0)
    setIsComplete(false)
    setFeedback("")
    setTranscript("")
  }

  if (!gameMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🎤 Speak2Learn</h1>
            <p className="text-lg text-gray-600">Choose your learning adventure!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => startGame("kids")}>
              <CardHeader>
                <CardTitle className="text-center text-2xl">👶 Kids Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  Fun and easy questions perfect for young learners. Colors, animals, and basic knowledge!
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => startGame("biology")}>
              <CardHeader>
                <CardTitle className="text-center text-2xl">🧬 Biology Study</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  Test your biology knowledge! Answer questions about the human body, plants, and life science.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => startGame("marvel")}>
              <CardHeader>
                <CardTitle className="text-center text-2xl">🦸 Marvel Trivia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  Think you know the Marvel universe? Test your superhero knowledge with voice commands!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Game Complete! 🎉</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl font-bold text-green-600">
              {score}/{totalQuestions}
            </div>
            <p className="text-gray-600">
              {score >= 7
                ? "Excellent work! You're a champion! 🏆"
                : score >= 5
                  ? "Great job! Keep practicing! 👏"
                  : "Good effort! Try again to improve! 💪"}
            </p>
            <div className="space-y-2">
              <Button onClick={resetGame} className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Badge variant="outline" className="text-lg px-3 py-1">
            Score: {score}/{totalQuestions}
          </Badge>
          <Button variant="outline" onClick={resetGame}>
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
        </div>

        {currentQuestion && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge>{currentQuestion.category}</Badge>
                <Button variant="outline" size="sm" onClick={() => speakText(currentQuestion.question)}>
                  <Volume2 className="w-4 h-4 mr-2" />
                  Repeat
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>

              <div className="space-y-4">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-full py-6 text-lg ${
                    isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-6 h-6 mr-2" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="w-6 h-6 mr-2" />
                      Speak Your Answer
                    </>
                  )}
                </Button>

                {transcript && (
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600">You said:</p>
                    <p className="font-medium">"{transcript}"</p>
                  </div>
                )}

                {feedback && (
                  <div
                    className={`p-3 rounded-lg ${
                      feedback.includes("Correct") ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <p className="font-medium">{feedback}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-sm text-gray-500">🎯 Goal: Get 7 correct answers or complete 10 questions</div>
      </div>
    </div>
  )
}