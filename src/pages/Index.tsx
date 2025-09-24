import { SavingsCalculator } from "@/components/SavingsCalculator";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-4xl px-4"> {/* Changed max-w-lg to max-w-4xl */}
        <div className="bg-white p-8 rounded-lg shadow-xl w-full mb-8"> {/* Removed max-w-lg here, let SavingsCalculator manage its own width */}
          <SavingsCalculator />
        </div>
      </main>
      <div className="w-full mt-8">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;