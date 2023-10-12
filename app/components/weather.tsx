import axios from "axios";
import { useEffect, useState } from "react";
import WidgetCard from "./widgetCard";
import {
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { InputStyles } from "~/style/myStyles";
import { SearchIcon } from "@chakra-ui/icons";
import LocaLDatetime from "~/utils/localTime";

interface WeatherData {
  location: {
    name: string;
    region: string;
    localtime: string;
  };
  current: {
    temp_f: number;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_mph: number;
    precip_in: number;
    humidity: number;
    feelslike_f: number;
    feelslike_c: number;
  };
}

export default function Weather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [zip, setZip] = useState<string>(""); // No default zip code
  const [city, setCity] = useState<string>(""); // No default city

  const fetchData = async (query: string) => {
    try {
      const response = await axios.get<WeatherData>(
        "http://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: "fe4e56e13a2a469ebd4192319231210",
            q: query,
            aqi: "no",
          },
        }
      );

      setData(response.data);
      setError(null);
    } catch (error: any) {
      setError(error.message || "An error occurred while fetching data");
    }
  };

  useEffect(() => {
    fetchData("New York"); // Fetch data for a default location when the component mounts
  }, []);

  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZip(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSearchClick = () => {
    const query = zip.trim() !== "" ? zip : city;
    if (query !== "") {
      fetchData(query);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <WidgetCard title="Weather" cardHeight="fit-content" showButton={false}>
      <VStack spacing={0}>
        <HStack>
          <Input
            type="text"
            placeholder="Enter Zip Code"
            sx={InputStyles}
            maxW="150px"
            value={zip}
            onChange={handleZipChange}
            focusBorderColor="cyan.400"
            h="35px"
          />
          <Input
            type="text"
            placeholder="Enter City"
            sx={InputStyles}
            maxW="150px"
            value={city}
            onChange={handleCityChange}
            focusBorderColor="cyan.400"
            h="35px"
          />
          <IconButton
            h="35px"
            w="35px"
            aria-label="Search database"
            icon={<SearchIcon boxSize={5} />}
            onClick={handleSearchClick}
          />
        </HStack>
        <VStack fontSize="1.1rem" align="flex-start" spacing={0}>
          <HStack>
            <Image src={data.current.condition.icon} alt="weather condition" />
            <Text fontSize="2xl" color="purple.200" fontWeight="bold">
              {data.location.name}, {data.location.region}
            </Text>
          </HStack>
          <Text>
            <span style={{ color: "cyan" }}>Local Time: </span>
            {LocaLDatetime(data.location.localtime)}
          </Text>
          <Text>
            <span style={{ color: "cyan" }}>Conditions: </span>
            {data.current.condition.text}
          </Text>
          <Text>
            <span style={{ color: "cyan" }}>Temperature: </span>
            {data.current.temp_f} °F / {data.current.temp_c} °C
          </Text>
          <Text>
            <span style={{ color: "cyan" }}>Feels Like: </span>
            {data.current.feelslike_f} °F / {data.current.feelslike_c} °C
          </Text>
          <Text>
            <span style={{ color: "cyan" }}>Humidity: </span>
            {data.current.humidity}%
          </Text>
          <Text>
            <span style={{ color: "cyan" }}>Precipitation: </span>
            {data.current.precip_in} in
          </Text>
          <Text>
            <span style={{ color: "cyan" }}>Wind: </span>
            {data.current.wind_mph} mph
          </Text>
        </VStack>
      </VStack>
    </WidgetCard>
  );
}
