import React from "react";
import { Truck, Lock, RotateCcw, Clock } from "lucide-react";

const features = [
  { icon: Truck, text: "Free Shipping", subtext: "On orders over $100" },
  { icon: Lock, text: "Secure Payment", subtext: "100% protected payments" },
  { icon: RotateCcw, text: "Easy Returns", subtext: "30-day return policy" },
  { icon: Clock, text: "24/7 Support", subtext: "Dedicated customer service" },
];

const Features = () => {
  return (
    <div className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition text-center"
          >
            <feature.icon className="mx-auto mb-4 h-10 w-10 text-red-500" />
            <p className="font-semibold text-lg">{feature.text}</p>
            <p className="text-gray-500 text-sm mt-1">{feature.subtext}</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Features;