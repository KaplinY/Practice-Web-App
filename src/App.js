import React, { useState } from "react";
import axios from "axios";

function App() {
  const [dob, setDob] = useState("");
  const [zodiacSign, setZodiacSign] = useState("");
  const [horoscope, setHoroscope] = useState("");

  const handleDobChange = (event) => {
    setDob(event.target.value);
    setZodiacSign("");
    setHoroscope("");
  };

  const calculateZodiacSign = () => {
    if (!dob) return;

    const date = new Date(dob);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const sign = getZodiacSign(day, month);
    setZodiacSign(sign);
  };

  const getZodiacSign = (day, month) => {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
    return "Invalid date";
  };

  const fetchHoroscope = async () => {
    if (!zodiacSign) return;

    try {
      const response = await axios.get(
        `https://api.prokerala.com/v1/astrology/horoscope/${zodiacSign.toLowerCase()}`,
        {
          headers: {
            "Client-Id": "0e8a6c34-2a72-4449-bfc4-381fe3f52495", 
            "Client-Secret": "Fsg6eT0i5eu5Eh2BWqJWOpX5XL9nl356aaAwtIc5",
          },
        }
      );
      setHoroscope(response.data.horoscope);
    } catch (error) {
      console.error("Error fetching horoscope:", error);
      setHoroscope("Failed to fetch horoscope.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Astrology App</h1>

      <label>Enter your date of birth: </label>
      <input type="date" value={dob} onChange={handleDobChange} />
      <button onClick={calculateZodiacSign}>Find Zodiac Sign</button>

      {zodiacSign && (
        <>
          <h2>Your Zodiac Sign: {zodiacSign}</h2>
          <button onClick={fetchHoroscope}>Get Horoscope</button>
        </>
      )}

      {horoscope && <p>Horoscope: {horoscope}</p>}
    </div>
  );
}

export default App;


