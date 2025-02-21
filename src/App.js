import React, { useState } from "react";

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
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "pisces";
    return "";
  };

  const fetchHoroscope = async () => {
    if (!zodiacSign) return;

    try {
      const response = await fetch(
        `https://aztro.sameerkumar.website/?sign=${zodiacSign}&day=tomorrow`,
        { method: "POST" }
      );

      const data = await response.json();
      setHoroscope(data.description);
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


