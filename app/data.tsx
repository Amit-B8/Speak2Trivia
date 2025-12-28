export interface Question {
  id: number
  question: string
  answer: string
  level: "Harry Potter" | "Hunger Games" | "MARVEL" | "Addition" | "Cars" 
  | "Sports Numbers"
}

export interface Quiz {
  level: "Harry Potter" | "Hunger Games" | "MARVEL" | "Addition" | "Cars" | "Sports Numbers"
  name: string
  description: string
  backgroundImage: string
  inputMode: "speak-type" | "type-only"
}

export interface BackgroundItem {
  id: string
  name: string
  cost: number
  type: "color" | "image"
  class?: string
  imageSrc?: string
  description: string
}

export const quizzes: Quiz[] = [
  {
    level: "Sports Numbers",
    name: "Test Jersey Numbers",
    description: "\n\n\Test your knowledge on jersey numbers of famous athletes",
    backgroundImage: "/Sports Numbers.png",
    inputMode: "speak-type",
  },
  {
    level: "Addition",
    name: "",
    description: "",
    backgroundImage: "/Addition.png",
    inputMode: "speak-type",
  },
  {
    level: "Harry Potter",
    name: "Harry Potter Level",
    description: "Test your Harry Potter knowledge",
    backgroundImage: "/HarryPotterBackground.jpg",
    inputMode: "type-only",
  },
  {
    level: "Hunger Games",
    name: "Hunger Games Level",
    description: "Test your Hunger Games knowledge",
    backgroundImage: "/HungerGamesBackground.jpg",
    inputMode: "type-only",
  },
  {
    level: "MARVEL",
    name: "⍟ ⎊ ⧗ MARVEL TRIVIA ✇ ϟ ➳",
    description: "MARVEL Trivia!!",
    backgroundImage: "/MARVELBackground.jpg",
    inputMode: "type-only",
  },
  {
    level: "Cars",
    name: "Cars Level",
    description: "Test your Cars knowledge",
    backgroundImage: "/Cars.jpg",
    inputMode: "type-only",
  },
]

export const allQuestions: Question[] = [
  // Sports Numbers
  { id: 1, question: "Which jersy numebr was Michael Jordan famous for wearing ?", answer: "23", level: "Sports Numbers" },
  { id: 2, question: "Which jersy numebr is LeBron James most known for ?", answer: "23", level: "Sports Numbers" },
  { id: 3, question: "Which jersy numebr did Kobe Bryant wear later in his career ?", answer: "24", level: "Sports Numbers" },
  { id: 4, question: "Which jersy numebr is Stephen Curry famous for ?", answer: "30", level: "Sports Numbers" },
  { id: 5, question: "Which jersy numebr was Shaquille O’Neal known for ?", answer: "34", level: "Sports Numbers" },
  { id: 6, question: "Which jersy numebr is Kevin Durant famous for ?", answer: "35", level: "Sports Numbers" },
  { id: 7, question: "Which jersy numebr did Magic Johnson wear ?", answer: "32", level: "Sports Numbers" },
  { id: 8, question: "Which jersy numebr is Larry Bird known for ?", answer: "33", level: "Sports Numbers" },
  { id: 9, question: "Which jersy numebr is Tom Brady famous for ?", answer: "12", level: "Sports Numbers" },
  { id: 10, question: "Which jersy numebr did Patrick Mahomes wear ?", answer: "15", level: "Sports Numbers" },
  { id: 11, question: "Which jersy numebr is Lionel Messi most associated with ?", answer: "10", level: "Sports Numbers" },
  { id: 12, question: "Which jersy numebr is Cristiano Ronaldo famous for ?", answer: "7", level: "Sports Numbers" },
  { id: 13, question: "Which jersy numebr did Babe Ruth wear ?", answer: "3", level: "Sports Numbers" },
  { id: 14, question: "Which jersy numebr is Derek Jeter known for ?", answer: "2", level: "Sports Numbers" },
  { id: 15, question: "Which jersy numebr is Wayne Gretzky famous for ?", answer: "99", level: "Sports Numbers" },

  // Math
  { id: 1, question: "What is 3 plus 3?", answer: "6", level: "Addition" },
  { id: 2, question: "What is 5 plus 2?", answer: "7", level: "Addition" },
  { id: 3, question: "What is 4 plus 4?", answer: "8", level: "Addition" },
  { id: 4, question: "What is 10 plus 5?", answer: "15", level: "Addition" },
  { id: 5, question: "What is 2 plus 2?", answer: "4", level: "Addition" },
  { id: 6, question: "What is 9 plus 3?", answer: "12", level: "Addition" },
  { id: 7, question: "What is 7 plus 1?", answer: "8", level: "Addition" },
  { id: 8, question: "What is 6 plus 2?", answer: "8", level: "Addition" },
  { id: 9, question: "What is 8 plus 2?", answer: "10", level: "Addition" },
  { id: 10, question: "What is 5 plus 5?", answer: "10", level: "Addition" },
  { id: 11, question: "What is 9 plus 4?", answer: "13", level: "Addition" },
  { id: 12, question: "What is 3 plus 4?", answer: "7", level: "Addition" },
  { id: 13, question: "What is 10 plus 2?", answer: "12", level: "Addition" },
  { id: 14, question: "What is 1 plus 1?", answer: "2", level: "Addition" },
  { id: 15, question: "What is 6 plus 3?", answer: "9", level: "Addition" },

  // Harry Potter
  { id: 1, question: "What house at Hogwarts does Harry belong to?", answer: "Gryffindor", level: "Harry Potter" },
  { id: 2, question: "What is the name of Harry's owl?", answer: "Hedwig", level: "Harry Potter" },
  { id: 3, question: "Who is the headmaster of Hogwarts?", answer: "Dumbledore", level: "Harry Potter" },
  { id: 4, question: "What position does Harry play in Quidditch?", answer: "Seeker", level: "Harry Potter" },
  { id: 5, question: "What is the name of the three-headed dog?", answer: "Fluffy", level: "Harry Potter" },
  { id: 6, question: "What spell is used to disarm an opponent?", answer: "Expelliarmus", level: "Harry Potter" },
  { id: 7, question: "What form does Harry's Patronus take?", answer: "Stag", level: "Harry Potter" },
  { id: 8, question: "What is Lord Voldemort's real name?", answer: "Tom Riddle", level: "Harry Potter" },
  { id: 9, question: "Who is Hermione's cat?", answer: "Crookshanks", level: "Harry Potter" },
  { id: 10, question: "What platform do you use to board the Hogwarts Express?", answer: "9 3/4", level: "Harry Potter" },
  { id: 11, question: "Who teaches Potions at Hogwarts?", answer: "Snape", level: "Harry Potter" },
  { id: 12, question: "What is the name of Hagrid's giant spider?", answer: "Aragog", level: "Harry Potter" },
  { id: 13, question: "What is Dumbledore's full name?", answer: "Albus Percival Wulfric Brian Dumbledore", level: "Harry Potter" },
  { id: 14, question: "What Horcrux does Harry destroy with a basilisk fang?", answer: "Tom Riddle's diary", level: "Harry Potter" },
  { id: 15, question: "Who kills Dumbledore?", answer: "Snape", level: "Harry Potter" },

  // Hunger Games
  { id: 1, question: "Who is the main female protagonist?", answer: "Katniss Everdeen", level: "Hunger Games" },
  { id: 2, question: "What district is Katniss from?", answer: "District 12", level: "Hunger Games" },
  { id: 3, question: "What is the name of Katniss's younger sister?", answer: "Prim", level: "Hunger Games" },
  { id: 4, question: "What weapon does Katniss use?", answer: "Bow and arrow", level: "Hunger Games" },
  { id: 5, question: "Who is Katniss's best friend in District 12?", answer: "Gale", level: "Hunger Games" },
  { id: 6, question: "What is the name of the annual deadly event?", answer: "The Hunger Games", level: "Hunger Games" },
  { id: 7, question: "What is Peeta's talent?", answer: "Baking", level: "Hunger Games" },
  { id: 8, question: "What is the name of the Capitol's leader?", answer: "President Snow", level: "Hunger Games" },
  { id: 9, question: "Who mentors Katniss and Peeta?", answer: "Haymitch", level: "Hunger Games" },
  { id: 10, question: "What is the symbol of the rebellion?", answer: "Mockingjay", level: "Hunger Games" },
  { id: 11, question: "What poison does Katniss use to threaten the Capitol?", answer: "Nightlock", level: "Hunger Games" },
  { id: 12, question: "Who is the stylist for Katniss?", answer: "Cinna", level: "Hunger Games" },
  { id: 13, question: "Who wins the 74th Hunger Games?", answer: "Katniss and Peeta", level: "Hunger Games" },
  { id: 14, question: "What are the names of the gamekeepers?", answer: "Seneca Crane", level: "Hunger Games" },
  { id: 15, question: "What is the Capitol's method of punishment for rebels?", answer: "The Hunger Games", level: "Hunger Games" },

  // MARVEL
  { id: 1, question: "Who is Iron Man's real identity?", answer: "Tony Stark", level: "MARVEL" },
  { id: 2, question: "What is Captain America's shield made of?", answer: "Vibranium", level: "MARVEL" },
  { id: 3, question: "What is Thor's hammer called?", answer: "Mjolnir", level: "MARVEL" },
  { id: 4, question: "Who is the villain in Avengers: Infinity War?", answer: "Thanos", level: "MARVEL" },
  { id: 5, question: "Which Infinity Stone does Vision have?", answer: "Mind Stone", level: "MARVEL" },
  { id: 6, question: "Who is Spider-Man's alter ego?", answer: "Peter Parker", level: "MARVEL" },
  { id: 7, question: "Who leads the Guardians of the Galaxy?", answer: "Star-Lord", level: "MARVEL" },
  { id: 8, question: "What country is Black Panther from?", answer: "Wakanda", level: "MARVEL" },
  { id: 9, question: "What is the Hulk's real name?", answer: "Bruce Banner", level: "MARVEL" },
  { id: 10, question: "What's Doctor Strange's profession before becoming a sorcerer?", answer: "Surgeon", level: "MARVEL" },
  { id: 11, question: "What is the name of Iron Man's AI assistant?", answer: "JARVIS", level: "MARVEL" },
  { id: 12, question: "Who is Natasha Romanoff?", answer: "Black Widow", level: "MARVEL" },
  { id: 13, question: "What organization does Nick Fury lead?", answer: "S.H.I.E.L.D.", level: "MARVEL" },
  { id: 14, question: "Who is Loki's brother?", answer: "Thor", level: "MARVEL" },
  { id: 15, question: "What is the name of the final Avengers movie?", answer: "Endgame", level: "MARVEL" },

  // Cars
  { id: 1, question: "What is the name of the main character in Cars?", answer: "Lightning McQueen", level: "Cars" },
  { id: 2, question: "What type of vehicle is Mater?", answer: "Tow Truck", level: "Cars" },
  { id: 3, question: "What is the name of the town where Lightning McQueen gets stranded?", answer: "Radiator Springs", level: "Cars" },
  { id: 4, question: "Who is Lightning McQueen's racing rival?", answer: "Chick Hicks", level: "Cars" },
  { id: 5, question: "What is the name of the female car who helps Lightning McQueen?", answer: "Sally", level: "Cars" },
  { id: 6, question: "What type of car is Doc Hudson?", answer: "Hudson Hornet", level: "Cars" },
  { id: 7, question: "What is the name of the race where Lightning McQueen competes?", answer: "Piston Cup", level: "Cars" },
  { id: 8, question: "Who is the owner of the Dinoco racing team?", answer: "Tex Dinoco", level: "Cars" },
  { id: 9, question: "What is the name of the tow truck's best friend?", answer: "Lightning McQueen", level: "Cars" },  
  { id: 10, question: "What type of vehicle is Luigi?", answer: "Fiat 500", level: "Cars" },
]

export const backgroundItems: BackgroundItem[] = [
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
    id: "fcb-logo-bg",
    name: "FCB Logo Background",
    cost: 100,
    type: "image",
    imageSrc: "/FCBLogo.png",
    description: "Show your support with the FCB logo background!",
  },
]