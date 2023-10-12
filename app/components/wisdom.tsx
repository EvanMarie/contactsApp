import React, { useState } from "react";
import WidgetCard from "./widgetCard";
import { Text, VStack } from "@chakra-ui/react";

type QuoteObject = {
  quote: string;
  author: string;
};

export default function WisdomQuotes() {
  const quotes: QuoteObject[] = [
    {
      quote: "The only true wisdom is in knowing you know nothing.",
      author: "Socrates",
    },
    { quote: "The unexamined life is not worth living.", author: "Socrates" },
    {
      quote:
        "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
      author: "Ralph Waldo Emerson",
    },
    {
      quote: "The best way to predict your future is to create it.",
      author: "Abraham Lincoln",
    },
    {
      quote:
        "In the end, it's not the years in your life that count. It's the life in your years.",
      author: "Abraham Lincoln",
    },
    {
      quote: "Life is what happens when you're busy making other plans.",
      author: "John Lennon",
    },
    {
      quote:
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela",
    },
    {
      quote:
        "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      quote: "It does not do to dwell on dreams and forget to live.",
      author: "J.K. Rowling",
    },
    {
      quote: "The only thing we have to fear is fear itself.",
      author: "Franklin D. Roosevelt",
    },
    {
      quote: "You must be the change you wish to see in the world.",
      author: "Mahatma Gandhi",
    },
    {
      quote:
        "I have learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
      author: "Maya Angelou",
    },
    {
      quote: "Whether you think you can or you think you can't, you're right.",
      author: "Henry Ford",
    },
    { quote: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    {
      quote:
        "To live is the rarest thing in the world. Most people exist, that is all.",
      author: "Oscar Wilde",
    },
    {
      quote:
        "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
      author: "Albert Schweitzer",
    },
    {
      quote: "The mind is everything. What you think you become.",
      author: "Buddha",
    },
    {
      quote:
        "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb",
    },
    { quote: "An unexamined life is not worth living.", author: "Socrates" },
    {
      quote:
        "Your time is limited, so don't waste it living someone else's life.",
      author: "Steve Jobs",
    },
    {
      quote:
        "Be not afraid of life. Believe that life is worth living, and your belief will help create the fact.",
      author: "William James",
    },
    {
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      quote:
        "If you want to live a happy life, tie it to a goal, not to people or things.",
      author: "Albert Einstein",
    },
    {
      quote: "The greatest wealth is to live content with little.",
      author: "Plato",
    },
    {
      quote: "The journey of a thousand miles begins with one step.",
      author: "Lao Tzu",
    },
    {
      quote:
        "The most difficult thing is the decision to act, the rest is merely tenacity.",
      author: "Amelia Earhart",
    },
    {
      quote: "What we achieve inwardly will change outer reality.",
      author: "Plutarch",
    },
    {
      quote:
        "Happiness is not something ready-made. It comes from your own actions.",
      author: "Dalai Lama",
    },
    {
      quote: "Everything you've ever wanted is on the other side of fear.",
      author: "George Addair",
    },
    {
      quote: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      quote:
        "Don't judge each day by the harvest you reap but by the seeds that you plant.",
      author: "Robert Louis Stevenson",
    },
    {
      quote:
        "The only limit to our realization of tomorrow will be our doubts of today.",
      author: "Franklin D. Roosevelt",
    },
    {
      quote: "It's not what you look at that matters, it's what you see.",
      author: "Henry David Thoreau",
    },
    {
      quote:
        "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
      author: "Helen Keller",
    },
    {
      quote:
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      quote: "Love the life you live. Live the life you love.",
      author: "Bob Marley",
    },
    {
      quote: "Life is either a daring adventure or nothing at all.",
      author: "Helen Keller",
    },
    {
      quote:
        "You have within you right now, everything you need to deal with whatever the world can throw at you.",
      author: "Brian Tracy",
    },
    {
      quote:
        "Do not go where the path may lead, go instead where there is no path and leave a trail.",
      author: "Ralph Waldo Emerson",
    },
    {
      quote: "Life is really simple, but we insist on making it complicated.",
      author: "Confucius",
    },
    {
      quote:
        "In three words I can sum up everything I've learned about life: it goes on.",
      author: "Robert Frost",
    },
    { quote: "Dream big and dare to fail.", author: "Norman Vaughan" },
    {
      quote: "Change your thoughts and you change your world.",
      author: "Norman Vincent Peale",
    },
    {
      quote:
        "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela",
    },
    {
      quote: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins",
    },
    {
      quote: "Life is 10% what happens to us and 90% how we react to it.",
      author: "Charles R. Swindoll",
    },
    {
      quote:
        "The two most important days in your life are the day you are born and the day you find out why.",
      author: "Mark Twain",
    },
    {
      quote:
        "Your life does not get better by chance, it gets better by change.",
      author: "Jim Rohn",
    },
    {
      quote:
        "When we strive to become better than we are, everything around us becomes better too.",
      author: "Paulo Coelho",
    },
    {
      quote: "The secret of getting ahead is getting started.",
      author: "Mark Twain",
    },
  ];

  const [currentQuote, setCurrentQuote] = useState<QuoteObject>({
    quote: "",
    author: "",
  });

  const getNewQuote = () => {
    const randNum = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randNum]);
  };

  React.useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <WidgetCard
      image="/iroh.webp"
      cardHeight="fit-content"
      title="Wise words..."
      bg="purple.700"
      onClick={getNewQuote}
    >
      <VStack w="100%" align="flex-start">
        <Text fontStyle="italic" fontSize="xl">
          “{currentQuote.quote}”{" "}
        </Text>
        <Text fontSize="xl"> - {currentQuote.author}</Text>
      </VStack>
    </WidgetCard>
  );
}
