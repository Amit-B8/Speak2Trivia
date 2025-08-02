"use client"

import type React from "react"
import Image from "next/image" // Import the Image component

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Volume2, RotateCcw, Trophy, Keyboard, ShoppingBag, Coins } from "lucide-react"

interface Question {
  id: number
  question: string
  answer: string
  level: "Harry Potter" | "Hunger Games" | "MARVEL"
}

const allQuestions: Question[] = [
  // Harry Potter LEVEL -
  { id: 1, question: "What house at Hogwarts does Harry belong to?", answer: "Gryffindor", level: "Harry Potter" },
  { id: 2, question: "What is the name of Harry's owl?", answer: "Hedwig", level: "Harry Potter" },
  { id: 3, question: "Who is the headmaster of Hogwarts?", answer: "Dumbledore", level: "Harry Potter" },
  { id: 4, question: "What position does Harry play in Quidditch?", answer: "Seeker", level: "Harry Potter" },
  { id: 5, question: "What is the name of the three-headed dog?", answer: "Fluffy", level: "Harry Potter" },
  { id: 6, question: "What spell is used to disarm an opponent?", answer: "Expelliarmus", level: "Harry Potter" },
  { id: 7, question: "What form does Harry's Patronus take?", answer: "Stag", level: "Harry Potter" },
  { id: 8, question: "What is Lord Voldemort's real name?", answer: "Tom Riddle", level: "Harry Potter" },
  { id: 9, question: "Who is Hermione's cat?", answer: "Crookshanks", level: "Harry Potter" },
  {
    id: 10,
    question: "What platform do you use to board the Hogwarts Express?",
    answer: "9 3/4",
    level: "Harry Potter",
  },
  { id: 11, question: "Who teaches Potions at Hogwarts?", answer: "Snape", level: "Harry Potter" },
  { id: 12, question: "What is the name of Hagrid's giant spider?", answer: "Aragog", level: "Harry Potter" },
  {
    id: 13,
    question: "What is Dumbledore's full name?",
    answer: "Albus Percival Wulfric Brian Dumbledore",
    level: "Harry Potter",
  },
  {
    id: 14,
    question: "What Horcrux does Harry destroy with a basilisk fang?",
    answer: "Tom Riddle's diary",
    level: "Harry Potter",
  },
  { id: 15, question: "Who kills Dumbledore?", answer: "Snape", level: "Harry Potter" },

  // Hunger Games Level -
  { id: 1, question: "Who is the main female protagonist?", answer: "Katniss Everdeen", level: "Hunger Games" },
  { id: 2, question: "What district is Katniss from?", answer: "District 12", level: "Hunger Games" },
  { id: 3, question: "What is the name of Katniss's younger sister?", answer: "Prim", level: "Hunger Games" },
  { id: 4, question: "What weapon does Katniss use?", answer: "Bow and arrow", level: "Hunger Games" },
  { id: 5, question: "Who is Katniss's best friend in District 12?", answer: "Gale", level: "Hunger Games" },
  {
    id: 6,
    question: "What is the name of the annual deadly event?",
    answer: "The Hunger Games",
    level: "Hunger Games",
  },
  { id: 7, question: "What is Peeta's talent?", answer: "Baking", level: "Hunger Games" },
  { id: 8, question: "What is the name of the Capitol's leader?", answer: "President Snow", level: "Hunger Games" },
  { id: 9, question: "Who mentors Katniss and Peeta?", answer: "Haymitch", level: "Hunger Games" },
  { id: 10, question: "What is the symbol of the rebellion?", answer: "Mockingjay", level: "Hunger Games" },
  {
    id: 11,
    question: "What poison does Katniss use to threaten the Capitol?",
    answer: "Nightlock",
    level: "Hunger Games",
  },
  { id: 12, question: "Who is the stylist for Katniss?", answer: "Cinna", level: "Hunger Games" },
  { id: 13, question: "Who wins the 74th Hunger Games?", answer: "Katniss and Peeta", level: "Hunger Games" },
  { id: 14, question: "What are the names of the gamekeepers?", answer: "Seneca Crane", level: "Hunger Games" },
  {
    id: 15,
    question: "What is the Capitol's method of punishment for rebels?",
    answer: "The Hunger Games",
    level: "Hunger Games",
  },

  // MARVEL trivia questions -
  { id: 1, question: "Who is Iron Man's real identity?", answer: "Tony Stark", level: "MARVEL" },
  { id: 2, question: "What is Captain America's shield made of?", answer: "Vibranium", level: "MARVEL" },
  { id: 3, question: "What is Thor's hammer called?", answer: "Mjolnir", level: "MARVEL" },
  { id: 4, question: "Who is the villain in Avengers: Infinity War?", answer: "Thanos", level: "MARVEL" },
  { id: 5, question: "Which Infinity Stone does Vision have?", answer: "Mind Stone", level: "MARVEL" },
  { id: 6, question: "Who is Spider-Man's alter ego?", answer: "Peter Parker", level: "MARVEL" },
  { id: 7, question: "Who leads the Guardians of the Galaxy?", answer: "Star-Lord", level: "MARVEL" },
  { id: 8, question: "What country is Black Panther from?", answer: "Wakanda", level: "MARVEL" },
  { id: 9, question: "What is the Hulk's real name?", answer: "Bruce Banner", level: "MARVEL" },
  {
    id: 10,
    question: "What's Doctor Strange's profession before becoming a sorcerer?",
    answer: "Surgeon",
    level: "MARVEL",
  },
  { id: 11, question: "What is the name of Iron Man's AI assistant?", answer: "JARVIS", level: "MARVEL" },
  { id: 12, question: "Who is Natasha Romanoff?", answer: "Black Widow", level: "MARVEL" },
  { id: 13, question: "What organization does Nick Fury lead?", answer: "S.H.I.E.L.D.", level: "MARVEL" },
  { id: 14, question: "Who is Loki's brother?", answer: "Thor", level: "MARVEL" },
  { id: 15, question: "What is the name of the final Avengers movie?", answer: "Endgame", level: "MARVEL" },
]

// Define background items
const backgroundItems = [
  {
    id: "blue-bg",
    name: "Blue Background",
    cost: 25,
    type: "color", 
    class: "bg-gradient-to-br from-blue-100 to-blue-200",
    description: "Change your background to a cool blue theme!",
  },
  {
    id: "green-bg",
    name: "Green Background",
    cost: 25,
    type: "color", 
    class: "bg-gradient-to-br from-green-100 to-green-200",
    description: "Change your background to a fresh green theme!",
  },
  {
    id: "purple-bg",
    name: "Purple Background",
    cost: 25,
    type: "color", 
    class: "bg-gradient-to-br from-purple-100 to-purple-200",
    description: "Change your background to a royal purple theme!",
  },
  {
    id: "fcb-logo-bg", // Unique ID
    name: "FCB Logo Background", // Display name
    cost: 100, // Cost in points
    type: "image", // New: type property set to "image"
    imageSrc: "/FCBLogo.png", // New: path to your image file
    description: "Show your support with the FCB logo background!", // Description for the shop card
  },
  // Use this to add more image backgrounds here following the same structure:
  // {
  //   id: "custom-image-bg",
  //   name: "My Custom Image",
  //   cost: 150,
  //   type: "image",
  //   imageSrc: "/path/to/your/image.jpg", // Make sure to place your image in the public folder
  //   description: "A unique background from your collection!",
  // },
]

export default function Speak2Learn() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [feedback, setFeedback] = useState("")
  const [gameLevel, setGameLevel] = useState<"Harry Potter" | "Hunger Games" | "MARVEL" | null>(null)
  const [recognition, setRecognition] = useState<any>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [usedQuestions, setUsedQuestions] = useState<number[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const [totalPoints, setTotalPoints] = useState(0)
  const [showShop, setShowShop] = useState(false)
  const [ownedBackgrounds, setOwnedBackgrounds] = useState<string[]>([])
  const [activeBackground, setActiveBackground] = useState("default") // Tracks the currently active background

  const [showTypeInput, setShowTypeInput] = useState(false)
  const [typedAnswer, setTypedAnswer] = useState("")
  const [voiceTimeout, setVoiceTimeout] = useState<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load points and owned items from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPoints = localStorage.getItem("speak2learn-points")
      if (storedPoints !== null) {
        setTotalPoints(Number.parseInt(storedPoints))
      }
      const storedOwnedBackgrounds = localStorage.getItem("speak2learn-owned-backgrounds")
      if (storedOwnedBackgrounds) {
        setOwnedBackgrounds(JSON.parse(storedOwnedBackgrounds))
      }
      const storedActiveBackground = localStorage.getItem("speak2learn-active-background")
      if (storedActiveBackground) {
        setActiveBackground(storedActiveBackground)
      }
    }
  }, [])

  // Save points and owned items to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("speak2learn-points", totalPoints.toString())
      localStorage.setItem("speak2learn-owned-backgrounds", JSON.stringify(ownedBackgrounds))
      localStorage.setItem("speak2learn-active-background", activeBackground)
    }
  }, [totalPoints, ownedBackgrounds, activeBackground])

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
      speechSynthesis.cancel() // Add this line to stop any current speech
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const startGame = (level: "Harry Potter" | "Hunger Games" | "MARVEL") => {
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
    setShowShop(false)
    getNextQuestion(level)
  }

  const getNextQuestion = (level: string) => {
    const availableQuestions = allQuestions.filter((q) => q.level === level && !usedQuestions.includes(q.id))

    if (availableQuestions.length > 0) {
      const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
      setCurrentQuestion(randomQuestion)
      setUsedQuestions((prev) => [...prev, randomQuestion.id])
      setFeedback("")
      setTranscript("")
      setIsProcessing(false)
      setShowTypeInput(false)
      setTypedAnswer("")

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

        const timeout = setTimeout(() => {
          setShowTypeInput(true)
          setIsListening(false)
          if (recognition) {
            recognition.stop()
          }
          setFeedback("Having trouble with voice? You can type your answer below!")
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

    const isCorrect =
      userAnswerClean === correctAnswer ||
      userAnswerClean.includes(correctAnswer) ||
      correctAnswer.includes(userAnswerClean) ||
      (correctAnswer === "four" && (userAnswerClean.includes("4") || userAnswerClean === "four")) ||
      (correctAnswer === "eight" && (userAnswerClean.includes("8") || userAnswerClean === "eight")) ||
      (correctAnswer === "seven" && (userAnswerClean.includes("7") || userAnswerClean === "seven")) ||
      (correctAnswer === "ten" && (userAnswerClean.includes("10") || userAnswerClean === "ten")) ||
      (correctAnswer === "five" && (userAnswerClean.includes("5") || userAnswerClean === "five")) ||
      (correctAnswer === "six" && (userAnswerClean.includes("6") || userAnswerClean === "six"))

    if (isCorrect) {
      const newScore = score + 1
      setScore(newScore)
      setTotalPoints((prev) => prev + 1)
      setFeedback("Correct! Great job! 🎉 (+1 point)")
      speakText("Correct! Great job!")
      console.log("Score updated to:", newScore)
    } else {
      setFeedback(`Not quite right. The answer was: ${currentQuestion.answer}`)
      speakText(`Not quite right. The answer was ${currentQuestion.answer}`)
    }

    const newTotal = totalQuestions + 1
    setTotalQuestions(newTotal)

    const finalScore = isCorrect ? score + 1 : score

    if (finalScore >= 10) {
      setTotalPoints((prev) => prev + 10)
      setTimeout(() => {
        setIsComplete(true)
        speakText(`Fantastic! You got 10 questions correct! You're a champion! Bonus 10 points!`)
      }, 2500)
    } else if (newTotal >= 15) {
      setTimeout(() => {
        setIsComplete(true)
        speakText(`Game complete! You got ${finalScore} out of ${newTotal} questions correct!`)
      }, 2500)
    } else {
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
    if (e.key === "Enter") {
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
    setShowShop(false)

    if (voiceTimeout) {
      clearTimeout(voiceTimeout)
      setVoiceTimeout(null)
    }
    // Stop any ongoing speech when resetting the game
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
    }
  }

  // Add a new function to clear local storage
  const clearAllData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("speak2learn-points")
      localStorage.removeItem("speak2learn-owned-backgrounds")
      localStorage.removeItem("speak2learn-active-background")
      setTotalPoints(0)
      setOwnedBackgrounds([])
      setActiveBackground("default")
      resetGame() // Also reset the game state
    }
  }

  const skipQuestion = () => {
    if (gameLevel && !isProcessing) {
      getNextQuestion(gameLevel)
    }
  }

  const buyItem = (itemId: string, cost: number) => {
    if (totalPoints >= cost && !ownedBackgrounds.includes(itemId)) {
      setTotalPoints((prev) => prev - cost)
      setOwnedBackgrounds((prev) => [...prev, itemId])
      setActiveBackground(itemId) // Automatically activate when bought
    }
  }

  const toggleBackground = (itemId: string) => {
    if (activeBackground === itemId) {
      setActiveBackground("default") // Deactivate, go back to default
    } else {
      setActiveBackground(itemId) // Activate this background
    }
  }

  // Function to render the main background based on activeBackground
  const renderMainBackground = () => {
    const activeBgItem = backgroundItems.find((item) => item.id === activeBackground)

    if (activeBgItem?.type === "image") {
      return (
        <Image
          src={activeBgItem.imageSrc! || "/placeholder.svg"}
          alt={activeBgItem.name}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: -10 }} // Ensure it covers and is behind content
          priority // Good for initial background images
        />
      )
    } else if (activeBgItem?.type === "color") {
      return <div className={`absolute inset-0 ${activeBgItem.class} -z-10`} />
    }
    // Default background
    return <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 -z-10" />
  }

  // Shop Screen
  if (showShop) {
    return (
      <div className="min-h-screen relative p-4">
        {" "}
        {/* Added relative to main container */}
        {renderMainBackground()} {/* Render the background here */}
        {/* Points Display - Top Right */}
        <div className="fixed top-4 right-4 z-50">
          <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-lg border">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-700">{totalPoints}</span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto pt-16 relative z-10">
          {" "}
          {/* Added relative z-10 to content */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🛍️ Item Shop</h1>
            <Button variant="outline" onClick={() => setShowShop(false)} className="mt-4">
              ← Back to Main Menu
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {backgroundItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-center">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  {/* Conditional rendering for preview */}
                  {item.type === "color" ? (
                    <div className={`h-20 w-full rounded-md mb-2 ${item.class}`}></div>
                  ) : (
                    <div className="h-20 w-full rounded-md mb-2 relative overflow-hidden">
                      <Image
                        src={item.imageSrc! || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        sizes="100px" // Smaller size for preview
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <p className="text-gray-600">{item.description}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span className="text-lg font-semibold">{item.cost} Points</span>
                  </div>
                  {ownedBackgrounds.includes(item.id) ? (
                    <Button
                      onClick={() => toggleBackground(item.id)}
                      className={`w-full ${activeBackground === item.id ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                    >
                      {activeBackground === item.id ? "Active" : "Activate"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => buyItem(item.id, item.cost)}
                      disabled={totalPoints < item.cost}
                      className="w-full"
                    >
                      Buy for {item.cost} Points
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Default Background Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-center">⚪ Default Background</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="h-20 w-full rounded-md mb-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
                </div>
                <p className="text-gray-600">Revert to the original background theme.</p>
                <div className="flex items-center justify-center space-x-2">
                  <Coins className="w-4 h-4 text-yellow-500" />
                  <span className="text-lg font-semibold">0 Points</span>
                </div>
                <Button
                  onClick={() => setActiveBackground("default")}
                  disabled={activeBackground === "default"}
                  className={`w-full ${activeBackground === "default" ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                >
                  {activeBackground === "default" ? "Active" : "Activate"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Main Menu Screen
  if (!gameLevel) {
    return (
      <div className="min-h-screen relative p-4">
        {" "}
        {/* Added relative to main container */}
        {renderMainBackground()} {/* Render the background here */}
        {/* Shop Button - Top Left */}
        <div className="fixed top-4 left-4 z-50">
          <Button onClick={() => setShowShop(true)} variant="outline" size="sm">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Shop
          </Button>
          {/* Conditionally render Clear All Data button only in development */}
          {process.env.NODE_ENV === "development" && (
            <Button onClick={clearAllData} variant="destructive" size="sm" className="ml-2">
              Clear All Data
            </Button>
          )}
        </div>
        {/* Points Display - Top Right */}
        <div className="fixed top-4 right-4 z-50">
          <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-lg border">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-700">{totalPoints}</span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto pt-16 relative z-10">
          {" "}
          {/* Added relative z-10 to content */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🎤 Speak2Trivia</h1>
            <p className="text-lg text-gray-600">Choose your trivia level!</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer bg-cover bg-center h-64 text-white"
              style={{ backgroundImage: "url('/HarryPotterBackground.jpg')" }}
              onClick={() => startGame("Harry Potter")}
            >
              <CardHeader>
                <CardTitle className="text-center text-3xl">Harry Potter Level</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-white-600 mb-4">Perfect for testing your Harry Potter knowledge</p>
                <div className="text-sm text-white-500">
                  <p>• Answer Some Harry Potter Questions</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer bg-cover bg-center h-64 text-white"
              style={{ backgroundImage: "url('/HungerGamesBackground.jpg')" }}
              onClick={() => startGame("Hunger Games")}
            >
              <CardHeader>
                <CardTitle className="text-center text-3xl">Hunger Games Level</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-whtie-600 mb-4">Test your Hunger Games knowledge.</p>
                <div className="text-sm text-white-500">
                  <p>• Answer Some Hunger Games Questions</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer bg-cover bg-center h-64 text-white"
              style={{ backgroundImage: "url('/MARVELBackground.jpg')" }}
              onClick={() => startGame("MARVEL")}
            >
              <CardHeader>
                <CardTitle className="text-center text-3xl"> ⍟ ⎊ ⧗ MARVEL TRIVIA ✇ ϟ ➳ </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-white-600 mb-4">MARVEL Trivia!!</p>
                <div className="text-sm text-white-500">
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
      <div className="min-h-screen relative p-4 flex items-center justify-center">
        {" "}
        {/* Added relative to main container */}
        {renderMainBackground()} {/* Render the background here */}
        {/* Points Display - Top Right */}
        <div className="fixed top-4 right-4 z-50">
          <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-lg border">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-700">{totalPoints}</span>
          </div>
        </div>
        <Card className="max-w-md w-full relative z-10">
          {" "}
          {/* Added relative z-10 to content */}
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
    <div className="min-h-screen relative p-4">
      {" "}
      {/* Added relative to main container */}
      {renderMainBackground()} {/* Render the background here */}
      {/* Points Display - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-lg border">
          <Coins className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-semibold text-gray-700">{totalPoints}</span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto pt-16 relative z-10">
        {" "}
        {/* Added relative z-10 to content */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-lg px-3 py-1">
              Score: {score}/10
            </Badge>
            <Badge variant="secondary">
              {gameLevel === "Harry Potter"
                ? "Harry Potter Level"
                : gameLevel === "Hunger Games"
                  ? "Hunger Games Level"
                  : "MARVEL Level"}
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
                      Stop Listening (Auto-type in {Math.ceil(voiceTimeout ? 10 : 0)}s)
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
