import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  VStack,
  HStack,
  Text,
  Box,
  Image,
  Link,
  Button,
} from "@chakra-ui/react";
import WidgetCard from "./widgetCard";
import { ButtonStyles, scrollBarStyles } from "~/style/myStyles";

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export default function NewsWidget() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              country: "us",
              apiKey: "60f9f65ff0314011bf400b1f29f54140",
            },
          }
        );

        setArticles(response.data.articles);
      } catch (error: any) {
        setError(error.message || "An error occurred while fetching news");
      }
    };

    fetchNews();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <WidgetCard title="Top News" showButton={false} cardHeight="750px">
      <Box w="100%" maxH="675px" overflowY="auto" sx={scrollBarStyles}>
        <VStack align="start" spacing={4} pr={2}>
          {articles.map((article, index) => (
            <Box
              key={index}
              px={3}
              py={2}
              shadow="md"
              borderWidth="1px"
              bg="purple.200"
              rounded="lg"
              color="gray.900"
            >
              <VStack w="100%" align="flex-start">
                <Text fontWeight="bold" noOfLines={2}>
                  {article.title}
                </Text>
                <HStack align="start">
                  {article.urlToImage && (
                    <Image
                      boxSize="100px"
                      objectFit="cover"
                      src={article.urlToImage}
                      alt="Article"
                      rounded="md"
                      shadow="1px 1px 5px rgba(0,0,0,0.7)"
                    />
                  )}
                  <VStack align="start">
                    <Text noOfLines={3}>{article.description}</Text>
                    <Link
                      href={article.url}
                      isExternal
                      color="cyan.900"
                      fontWeight="bold"
                    >
                      <Button {...ButtonStyles} fontSize="1rem" h="25px">
                        Read more
                      </Button>
                    </Link>
                  </VStack>
                </HStack>
              </VStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </WidgetCard>
  );
}
