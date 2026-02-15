const getCardType = (number) => {
  const cleanNumber = number.replace(/\s/g, "");

  if (cleanNumber.startsWith("4")) {
    return {
      name: "Visa",
      gradient: "from-blue-600 via-blue-700 to-blue-900",
      logo: "VISA",
      chip: "from-yellow-300 to-yellow-500",
    };
  }

  if (cleanNumber.startsWith("5")) {
    return {
      name: "Mastercard",
      gradient: "from-gray-700 via-gray-800 to-black",
      logo: "Mastercard",
      chip: "from-yellow-300 to-yellow-500",
    };
  }

  if (cleanNumber.startsWith("9")) {
    return {
      name: "Troy",
      gradient: "from-cyan-500 via-blue-500 to-blue-600",
      logo: "TROY",
      chip: "from-yellow-300 to-yellow-500",
    };
  }

  if (cleanNumber.startsWith("5437")) {
    return {
      name: "Vakıfbank",
      gradient: "from-yellow-400 via-red-500 to-red-600",
      logo: "VakıfBank",
      chip: "from-yellow-200 to-yellow-400",
    };
  }

  return {
    name: "Generic",
    gradient: "from-gray-500 via-gray-600 to-gray-700",
    logo: "BANK",
    chip: "from-gray-300 to-gray-400",
  };
};

const DynamicCard = ({ cardData }) => {
  const cardType = getCardType(cardData.card_no || "");

  const formatCardNumber = (number) => {
    if (!number) return "**** **** **** ****";

    const cleaned = number.replace(/\s/g, "");
    const padded = cleaned.padEnd(16, "*");
    return padded.match(/.{1,4}/g)?.join(" ") || padded;
  };

  return (
    <div className="perspective-1000 w-full max-w-md">
      <div
        className={`relative w-full h-52 bg-linear-to-br ${cardType.gradient} rounded-2xl p-6 text-white shadow-2xl transform transition-all duration-500 hover:scale-105`}
      >
        <div className="absolute inset-0 opacity-10 rounded-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full transform translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full transform -translate-x-24 translate-y-24" />
        </div>
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div
              className={`w-14 h-10 bg-linear-to-br ${cardType.chip} rounded-lg shadow-md relative`}
            >
              <div className="absolute inset-1 border border-yellow-600/30 rounded-md" />
              <div className="absolute inset-2 grid grid-cols-4 grid-rows-3 gap-0.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-yellow-600/20 rounded-sm" />
                ))}
              </div>
            </div>
            <div className="font-black italic text-2xl tracking-tighter drop-shadow-lg">
              {cardType.logo}
            </div>
          </div>
          <div className="text-xl md:text-2xl tracking-[0.2em] font-mono drop-shadow-md">
            {formatCardNumber(cardData.card_no)}
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase opacity-70 tracking-wider">
                Card Holder
              </span>
              <span className="text-sm md:text-base font-semibold tracking-wider uppercase drop-shadow">
                {cardData.name_on_card || "NAME SURNAME"}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase opacity-70 tracking-wider">
                Expires
              </span>
              <span className="text-sm md:text-base font-semibold tracking-wider drop-shadow">
                {cardData.expire_month || "MM"}/
                {cardData.expire_year?.toString().slice(-2) || "YY"}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent rounded-2xl" />
      </div>
    </div>
  );
};

export default DynamicCard;
