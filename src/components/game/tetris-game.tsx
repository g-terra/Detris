import { cn } from "../../lib/utils"

interface TetrisGameProps {
  className?: string
}

export function TetrisGame({ className }: TetrisGameProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen bg-[#8B956D]", className)}>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-[#1F1F1F] mb-4">DETRIS</h1>
        <div className="flex gap-8">
          {/* Main game area */}
          <div className="bg-[#1F1F1F] p-4 rounded-lg">
            <div className="grid grid-cols-10 grid-rows-20 gap-px w-[300px] h-[600px] bg-[#9BA37E]">
              {Array.from({ length: 200 }).map((_, i) => (
                <div key={i} className="bg-[#8B956D]" />
              ))}
            </div>
          </div>

          {/* Game info section */}
          <div className="space-y-8">
            <div className="text-[#1F1F1F]">
              <div className="text-xl font-bold">SCORE</div>
              <div className="font-mono text-2xl">000000</div>
            </div>
            <div className="text-[#1F1F1F]">
              <div className="text-xl font-bold">NEXT</div>
              <div className="w-24 h-24 bg-[#1F1F1F] rounded-lg mt-2 p-2">
                <div className="w-full h-full bg-[#9BA37E]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 