"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Volume2, RotateCcw, Trophy, Keyboard } from 'lucide-react'

interface Question {
  id: number
  question: string
  answer: string
  level: "kids" | "advanced" | "MARVEL"
}

const allQuestions: Question[] = [
  // KIDS LEVEL - Basic Education
  { id: 1, question: "What is 2 plus 2?", answer: "four", level: "kids" },
  { id: 2, question: "What letter comes after C?", answer: "d", level: "kids" },
  { id: 3, question: "How many legs does a spider have?", answer: "eight", level: "kids" },
  { id: 4, question: "What color do you get when you mix red and blue?", answer: "purple", level: "kids" },
  { id: 5, question: "What is 5 plus 3?", answer: "eight", level: "kids" },
  { id: 6, question: "What letter comes before F?", answer: "e", level: "kids" },
  { id: 7, question: "How many days are in a week?", answer: "seven", level: "kids" },
  { id: 8, question: "What is 10 minus 3?", answer: "seven", level: "kids" },
  { id: 9, question: "What shape has 3 sides?", answer: "triangle", level: "kids" },
  { id: 10, question: "What is 6 plus 4?", answer: "ten", level: "kids" },
  { id: 11, question: "What letter comes after G?", answer: "h", level: "kids" },
  { id: 12, question: "How many fingers do you have on one hand?", answer: "five", level: "kids" },
  { id: 13, question: "What is 9 minus 4?", answer: "five", level: "kids" },
  { id: 14, question: "What color do you get when you mix yellow and red?", answer: "orange", level: "kids" },
  { id: 15, question: "What is 3 times 2?", answer: "six", level: "kids" },

  // ADVANCED LEVEL - Higher Education
  { id: 16, question: "What is the capital of France?", answer: "paris", level: "advanced" },
  { id: 17, question: "Who wrote Romeo and Juliet?", answer: "shakespeare", level: "advanced" },
  { id: 18, question: "What is 15 times 4?", answer: "sixty", level: "advanced" },
  { id: 19, question: "What gas do plants absorb during photosynthesis?", answer: "carbon dioxide", level: "advanced" },
  { id: 20, question: "Who painted the Mona Lisa?", answer: "leonardo da vinci", level: "advanced" },
  { id: 21, question: "What is the largest planet in our solar system?", answer: "jupiter", level: "advanced" },
  { id: 22, question: "What is 144 divided by 12?", answer: "twelve", level: "advanced" },
  { id: 23, question: "What is the chemical symbol for gold?", answer: "au", level: "advanced" },
  { id: 24, question: "Who was the first president of the United States?", answer: "george washington", level: "advanced" },
  { id: 25, question: "What is the square root of 64?", answer: "eight", level: "advanced" },

  // MARVEL trivia questions

]

export default function Speak2Learn() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [feedback, setFeedback] = useState("")
  const [gameLevel, setGameLevel] = useState<"kids" | "advanced" | "MARVEL" | null>(null)
  const [recognition, setRecognition] = useState<any>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [usedQuestions, setUsedQuestions] = useState<number[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  
  // New states for typing feature
  const [showTypeInput, setShowTypeInput] = useState(false)
  const [typedAnswer, setTypedAnswer] = useState("")
  const [voiceTimeout, setVoiceTimeout] = useState<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = "en-US"

      recognitionInstance.onresult = (event: any) => {
        const result = event.results[0][0].transcript.toLowerCase().trim()
        console.log("Speech result:", result)
        setTranscript(result)
        setIsListening(false)
        
        // Clear the 10-second timeout since we got a result
        if (voiceTimeout) {
          clearTimeout(voiceTimeout)
          setVoiceTimeout(null)
        }
        
        checkAnswer(result)
      }

      recognitionInstance.onend = () => {
        console.log("Speech recognition ended")
        setIsListening(false)
      }

      recognitionInstance.onerror = (event: any) => {
        console.log("Speech recognition error:", event.error)
        setIsListening(false)
        setFeedback("Sorry, I didn't catch that. You can try speaking again or type your answer.")
      }

      setRecognition(recognitionInstance)
    }
  }, [voiceTimeout])

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const startGame = (level: "kids" | "advanced" | "MARVEL") => {
    setGameLevel(level)
    setScore(0)
    setTotalQuestions(0)
    setIsComplete(false)
    setFeedback("")
    setTranscript("")
    setUsedQuestions([])
    setIsProcessing(false)
    setShowTypeInput(false)
    setTypedAnswer("")
    getNextQuestion(level)
  }

  const getNextQuestion = (level: string) => {
    const availableQuestions = allQuestions.filter((q) => 
      q.level === level && !usedQuestions.includes(q.id)
    )

    if (availableQuestions.length > 0) {
      const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
      setCurrentQuestion(randomQuestion)
      setUsedQuestions(prev => [...prev, randomQuestion.id])
      setFeedback("")
      setTranscript("")
      setIsProcessing(false)
      setShowTypeInput(false)
      setTypedAnswer("")
      
      // Clear any existing timeout
      if (voiceTimeout) {
        clearTimeout(voiceTimeout)
        setVoiceTimeout(null)
      }
      
      setTimeout(() => {
        speakText(randomQuestion.question)
      }, 500)
    } else {
      setIsComplete(true)
      setTimeout(() => {
        speakText(`Amazing! You completed all available questions! Final score: ${score} out of ${totalQuestions}`)
      }, 1000)
    }
  }

  const startListening = () => {
    if (recognition && !isListening && !isProcessing) {
      setIsListening(true)
      setTranscript("")
      setFeedback("")
      setShowTypeInput(false)
      
      try {
        recognition.start()
        
        // Set 10-second timeout to show typing option
        const timeout = setTimeout(() => {
          setShowTypeInput(true)
          setIsListening(false)
          if (recognition) {
            recognition.stop()
          }
          setFeedback("Having trouble with voice? You can type your answer below!")
          // Focus on the input field
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus()
            }
          }, 100)
        }, 10000)
        
        setVoiceTimeout(timeout)
        
      } catch (error) {
        console.log("Error starting recognition:", error)
        setIsListening(false)
      }
    }
  }

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop()
      setIsListening(false)
    }
    
    if (voiceTimeout) {
      clearTimeout(voiceTimeout)
      setVoiceTimeout(null)
    }
  }

  const checkAnswer = (userAnswer: string) => {
    if (!currentQuestion || isProcessing) return

    setIsProcessing(true)
    console.log("Checking answer:", userAnswer, "vs", currentQuestion.answer)

    const correctAnswer = currentQuestion.answer.toLowerCase()
    const userAnswerClean = userAnswer.toLowerCase().trim()

    // More flexible answer checking
    const isCorrect = userAnswerClean === correctAnswer || 
                     userAnswerClean.includes(correctAnswer) || 
                     correctAnswer.includes(userAnswerClean) ||
                     // Handle number words and digits
                     (correctAnswer === "four" && (userAnswerClean.includes("4") || userAnswerClean === "four")) ||
                     (correctAnswer === "eight" && (userAnswerClean.includes("8") || userAnswerClean === "eight")) ||
                     (correctAnswer === "seven" && (userAnswerClean.includes("7") || userAnswerClean === "seven")) ||
                     (correctAnswer === "ten" && (userAnswerClean.includes("10") || userAnswerClean === "ten")) ||
                     (correctAnswer === "five" && (userAnswerClean.includes("5") || userAnswerClean === "five")) ||
                     (correctAnswer === "six" && (userAnswerClean.includes("6") || userAnswerClean === "six"))

    // Update states immediately
    if (isCorrect) {
      const newScore = score + 1
      setScore(newScore)
      setFeedback("Correct! Great job! 🎉")
      speakText("Correct! Great job!")
      console.log("Score updated to:", newScore)
    } else {
      setFeedback(`Not quite right. The answer was: ${currentQuestion.answer}`)
      speakText(`Not quite right. The answer was ${currentQuestion.answer}`)
    }

    const newTotal = totalQuestions + 1
    setTotalQuestions(newTotal)
    
    const finalScore = isCorrect ? score + 1 : score

    // Win condition: Get 10 correct answers
    if (finalScore >= 10) {
      setTimeout(() => {
        setIsComplete(true)
        speakText(`Fantastic! You got 10 questions correct! You're a champion!`)
      }, 2500)
    } else if (newTotal >= 15) {
      setTimeout(() => {
        setIsComplete(true)
        speakText(`Game complete! You got ${finalScore} out of ${newTotal} questions correct!`)
      }, 2500)
    } else {
      // Continue to next question after showing feedback
      setTimeout(() => {
        getNextQuestion(gameLevel!)
      }, 3000)
    }
  }

  const handleTypedSubmit = () => {
    if (typedAnswer.trim()) {
      checkAnswer(typedAnswer.trim())
      setTypedAnswer("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTypedSubmit()
    }
  }

  const resetGame = () => {
    setGameLevel(null)
    setCurrentQuestion(null)
    setScore(0)
    setTotalQuestions(0)
    setIsComplete(false)
    setFeedback("")
    setTranscript("")
    setUsedQuestions([])
    setIsProcessing(false)
    setShowTypeInput(false)
    setTypedAnswer("")
    
    if (voiceTimeout) {
      clearTimeout(voiceTimeout)
      setVoiceTimeout(null)
    }
  }

  const skipQuestion = () => {
    if (gameLevel && !isProcessing) {
      getNextQuestion(gameLevel)
    }
  }

  // Main Menu Screen
  if (!gameLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🎤 Speak2Trivia</h1>
            <p className="text-lg text-gray-600">Choose your learning level!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => startGame("kids")}>
              <CardHeader>
                <CardTitle className="text-center text-3xl">👶 Kids Level</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 mb-4">
                  Perfect for young learners! Basic math, alphabet, colors, and simple questions.
                </p>
                <div className="text-sm text-gray-500">
                  <p>• Simple addition (2+2)</p>
                  <p>• Alphabet letters</p>
                  <p>• Colors and shapes</p>
                  <p>• Basic counting</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => startGame("advanced")}>
              <CardHeader>
                <CardTitle className="text-center text-3xl">🎓 Advanced Level</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 mb-4">
                  Challenge yourself! Geography, history, science, and complex math.
                </p>
                <div className="text-sm text-gray-500">
                  <p>• World capitals</p>
                  <p>• Historical figures</p>
                  <p>• Science facts</p>
                  <p>• Complex math</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => startGame("MARVEL")}>
              <CardHeader>
                <CardTitle className="text-center text-3xl"> ⍟ ⎊ ⧗ MARVEL TRIVIA ✇ ϟ ➳ </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 mb-4">
                  MARVEL Trivia!!
                </p>
                <div className="text-sm text-gray-500">
                  <p>• Test your MARVEL knowledge</p>
                </div>
              </CardContent>
            </Card>
          
          </div>
        </div>
      </div>
    )
  }

  // Game Complete Screen
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
              {score >= 10
                ? "Perfect! You're a learning champion! 🏆"
                : score >= 7
                  ? "Excellent work! Keep it up! 👏"
                  : score >= 5
                    ? "Great job! Practice makes perfect! 💪"
                    : "Good effort! Try again to improve! 🌟"}
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

  // Game Playing Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-lg px-3 py-1">
              Score: {score}/10
            </Badge>
            <Badge variant="secondary">
              {gameLevel === "kids" ? "👶 Kids Level" : "🎓 Advanced Level"}
            </Badge>
          </div>
          <Button variant="outline" onClick={resetGame}>
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
        </div>

        {currentQuestion && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge>Question {totalQuestions + 1}</Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => speakText(currentQuestion.question)}>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Repeat
                  </Button>
                  <Button variant="outline" size="sm" onClick={skipQuestion}>
                    Skip
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>

              <div className="space-y-4">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                  className={`w-full py-6 text-lg ${
                    isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-green-500 hover:bg-green-600"
                  } ${isProcessing ? "opacity-50" : ""}`}
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : isListening ? (
                    <>
                      <MicOff className="w-6 h-6 mr-2" />
                      Stop Listening (Auto-type in {Math.ceil((voiceTimeout ? 10 : 0))}s)
                    </>
                  ) : (
                    <>
                      <Mic className="w-6 h-6 mr-2" />
                      Speak Your Answer
                    </>
                  )}
                </Button>

                {/* Typing Input - Shows after 10 seconds or on demand */}
                {showTypeInput && (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        ref={inputRef}
                        type="text"
                        placeholder="Type your answer here..."
                        value={typedAnswer}
                        onChange={(e) => setTypedAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                      />
                      <Button onClick={handleTypedSubmit} disabled={!typedAnswer.trim()}>
                        <Keyboard className="w-4 h-4 mr-2" />
                        Submit
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">Press Enter or click Submit</p>
                  </div>
                )}

                {/* Manual typing button */}
                {!showTypeInput && !isListening && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowTypeInput(true)
                      setTimeout(() => {
                        if (inputRef.current) {
                          inputRef.current.focus()
                        }
                      }, 100)
                    }}
                    className="w-full"
                  >
                    <Keyboard className="w-4 h-4 mr-2" />
                    Type Answer Instead
                  </Button>
                )}

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

        <div className="text-center text-sm text-gray-500">
          🎯 Goal: Get 10 correct answers to win! | Speak or type after 10 seconds
        </div>
      </div>
    </div>
  )
}