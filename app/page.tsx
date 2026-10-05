"use client"
import { useHome } from "./useHome";

import '../canvas/css/canvas.css'
import '../canvas/css/nodes.css'
import { WeightModal } from "@/components/weightModal";
import { WeightTilde } from "lucide-react";

export default function Home() {
  const {
    inputs,
    setInputs,

    hidden,
    setHidden,

    outputs,
    setOutputs,

    setIsWeightModalOpen,
    isWeigthModalOpen,

    handleNodesSetter,

    sinapses,
    feedfoward,
  } = useHome()

  return (
    <main className="min-h-screen w-screen bg-[#f7f8f6] text-[#172033] [background-image:linear-gradient(rgba(48,64,96,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(48,64,96,0.025)_1px,transparent_1px)] [background-size:32px_32px]">
      <header className="flex min-h-[88px] items-center justify-between gap-8 border-b border-[#e4e7ec] bg-white/95 px-[clamp(24px,4vw,64px)] py-4 max-[920px]:flex-col max-[920px]:items-start max-[920px]:gap-3.5 max-[620px]:px-4">
        <section
          className="flex w-full items-center justify-end gap-3 max-[920px]:flex-wrap max-[920px]:justify-start max-[620px]:grid max-[620px]:grid-cols-3"
          aria-label="Configuração da rede"
        >
          <label className="flex items-center gap-2 text-xs font-semibold text-[#5f6877] max-[620px]:flex-col max-[620px]:items-start max-[620px]:gap-[5px]">
            <span>Inputs</span>
            <input
              className="h-[38px] w-[62px] rounded-[9px] border border-[#d7dce3] bg-[#fafbfc] px-2.5 text-[#172033] outline-none transition hover:border-[#b9c2ce] hover:bg-white focus:border-[#7198b5] focus:bg-white focus:ring-3 focus:ring-[#628eae]/15 max-[620px]:w-full"
              aria-label="Quantidade de inputs"
              min="1"
              type="number"
              value={inputs}
              onChange={(event) =>
                handleNodesSetter(Number(event.target.value), setInputs)
              }
            />
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#5f6877] max-[620px]:flex-col max-[620px]:items-start max-[620px]:gap-[5px]">
            <span>Ocultas</span>
            <input
              className="h-[38px] w-[62px] rounded-[9px] border border-[#d7dce3] bg-[#fafbfc] px-2.5 text-[#172033] outline-none transition hover:border-[#b9c2ce] hover:bg-white focus:border-[#7198b5] focus:bg-white focus:ring-3 focus:ring-[#628eae]/15 max-[620px]:w-full"
              aria-label="Quantidade de neurônios ocultos"
              min="1"
              type="number"
              value={hidden}
              onChange={(event) =>
                handleNodesSetter(Number(event.target.value), setHidden)
              }
            />
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#5f6877] max-[620px]:flex-col max-[620px]:items-start max-[620px]:gap-[5px]">
            <span>Ocultas</span>
            <input
              className="h-[38px] w-[62px] rounded-[9px] border border-[#d7dce3] bg-[#fafbfc] px-2.5 text-[#172033] outline-none transition hover:border-[#b9c2ce] hover:bg-white focus:border-[#7198b5] focus:bg-white focus:ring-3 focus:ring-[#628eae]/15 max-[620px]:w-full"
              aria-label="Quantidade de outputs"
              min="1"
              type="number"
              value={outputs}
              onChange={(event) =>
                handleNodesSetter(Number(event.target.value), setOutputs)
              }
            />
          </label>
          <div className="ml-1.5 flex gap-2 max-[620px]:col-span-3 max-[620px]:mt-0.5 max-[620px]:ml-0 max-[620px]:grid max-[620px]:grid-cols-2">
            <button
              className="inline-flex h-[38px] items-center justify-center gap-2 rounded-[9px] border border-transparent bg-[#244d69] px-[15px] text-xs font-semibold whitespace-nowrap text-white shadow-[0_4px_12px_rgba(36,77,105,0.16)] transition hover:-translate-y-px hover:bg-[#1d415a] hover:shadow-[0_6px_16px_rgba(36,77,105,0.2)] active:translate-y-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#628eae]/25"
              type="button"
              onClick={feedfoward}
            >
              <span
                className="h-0 w-0 border-y-4 border-y-transparent border-l-6 border-l-current"
                aria-hidden="true"
              />
              FeedForward
            </button>
          </div>
        </section>
      </header>

      <div className="flex flex-1 justify-center items-center p-1" id="container">
        {sinapses && (isWeigthModalOpen ? (
          <WeightModal
            sinapses={sinapses}
            isOpen={isWeigthModalOpen}
            onClose={() => setIsWeightModalOpen(false)} />
        ) : (
          <button
            type="button"
            onClick={() => setIsWeightModalOpen(true)}
            className="absolute bottom-6 right-10 flex cursor-pointer flex-col items-center gap-1 text-[#52606f] transition hover:text-[#28506c]"
            aria-label="Ver pesos da rede"
          >
            <WeightTilde size={24} />

            <span className="text-[11px] font-bold">
              Pesos e Bias
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
