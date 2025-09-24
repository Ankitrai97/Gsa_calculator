import { SavingsCalculator } from "@/components/SavingsCalculator";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Navbar } from "@/components/Navbar"; // Import the new Navbar component

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <Navbar /> {/* Place the Navbar at the top */}
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-lg">
        <SavingsCalculator />
      </div>
      <div className="w-full mt-8"> {/* Remove absolute positioning and add margin-top */}
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;