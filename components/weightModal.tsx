import { useState } from "react"

import { ISinapses } from "@/canvas/types"

interface WeightModalProps {
	isOpen: boolean
	sinapses: ISinapses
	onClose: () => void
}

type Tab = "weights" | "bias"

export const WeightModal = ({
	isOpen,
	sinapses,
	onClose,
}: WeightModalProps) => {
	console.log(sinapses)
	const [activeTab, setActiveTab] = useState<Tab>("weights")

	if (!isOpen) return null

	const weightsIH = sinapses.weitghs.weights_ih.data
	const weightsHO = sinapses.weitghs.weights_ho.data

	const biasHidden = sinapses.bias.bias_ih.data.flat()
	const biasOutput = sinapses.bias.bias_ho.data.flat()

	return (
		<div
			className="fixed inset-0 z-50 grid place-items-center bg-[#111827]/35 p-4 backdrop-blur-[2px] sm:p-6"
			onClick={onClose}
		>
			<section
				className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#e4e8ed] bg-white shadow-[0_20px_60px_rgba(17,24,39,0.15)]"
				onClick={(event) => event.stopPropagation()}
			>
				<header className="flex items-center justify-between border-b border-[#e7eaee] px-6 py-4">
					<div>
						<h2 className="text-base font-semibold text-[#24384a]">
							Pesos da Rede
						</h2>

						<p className="mt-1 text-xs text-[#8b94a2]">
							Valores utilizados no processamento da rede neural
						</p>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#7b8794] transition hover:bg-[#f3f5f7] hover:text-[#24384a]"
						aria-label="Fechar"
					>
						×
					</button>
				</header>

				<div className="border-b border-[#e7eaee] px-6">
					<div className="flex gap-6">
						<button
							type="button"
							onClick={() => setActiveTab("weights")}
							className={`relative cursor-pointer py-3 text-xs font-semibold transition ${activeTab === "weights"
									? "text-[#28506c]"
									: "text-[#8b94a2] hover:text-[#52606f]"
								}`}
						>
							Pesos

							{activeTab === "weights" && (
								<span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#28506c]" />
							)}
						</button>

						<button
							type="button"
							onClick={() => setActiveTab("bias")}
							className={`relative cursor-pointer py-3 text-xs font-semibold transition ${activeTab === "bias"
									? "text-[#28506c]"
									: "text-[#8b94a2] hover:text-[#52606f]"
								}`}
						>
							Bias

							{activeTab === "bias" && (
								<span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#28506c]" />
							)}
						</button>
					</div>
				</div>

				<div className="overflow-y-auto px-6 py-5">
					{activeTab === "weights" ? (
						<div className="grid gap-8 md:grid-cols-2">
							<section>
								<div className="mb-4 flex items-center gap-3">
									<div>
										<h3 className="text-sm font-semibold text-[#24384a]">
											Entrada → Oculta
										</h3>

										<p className="mt-1 text-[11px] text-[#8b94a2]">
											{weightsIH.length}{" "}
											{weightsIH.length === 1
												? "neurônio"
												: "neurônios"}
										</p>
									</div>

									<span
										className="h-px flex-1 bg-[#e7eaee]"
										aria-hidden="true"
									/>
								</div>

								<div className="space-y-2.5">
									{weightsIH.map((weights, neuronIndex) => (
										<article
											key={`ih-${neuronIndex}`}
											className="rounded-xl border border-[#e4e8ed] bg-[#fbfcfd] px-4 py-3.5"
										>
											<p className="mb-2.5 text-[11px] font-semibold text-[#52606f]">
												Neurônio {neuronIndex}
											</p>

											<div className="flex flex-wrap gap-1.5">
												{weights.map((weight, weightIndex) => (
													<code
														key={`ih-${neuronIndex}-${weightIndex}`}
														className="rounded-md border border-[#dfe6eb] bg-white px-2 py-1 font-mono text-[11px] font-medium tabular-nums text-[#28506c]"
													>
														{weight.toFixed(4)}
													</code>
												))}
											</div>
										</article>
									))}
								</div>
							</section>

							<section>
								<div className="mb-4 flex items-center gap-3">
									<div>
										<h3 className="text-sm font-semibold text-[#24384a]">
											Oculta → Saída
										</h3>

										<p className="mt-1 text-[11px] text-[#8b94a2]">
											{weightsHO.length}{" "}
											{weightsHO.length === 1
												? "neurônio"
												: "neurônios"}
										</p>
									</div>

									<span
										className="h-px flex-1 bg-[#e7eaee]"
										aria-hidden="true"
									/>
								</div>

								<div className="space-y-2.5">
									{weightsHO.map((weights, neuronIndex) => (
										<article
											key={`ho-${neuronIndex}`}
											className="rounded-xl border border-[#e4e8ed] bg-[#fbfcfd] px-4 py-3.5"
										>
											<p className="mb-2.5 text-[11px] font-semibold text-[#52606f]">
												Neurônio {neuronIndex}
											</p>

											<div className="flex flex-wrap gap-1.5">
												{weights.map((weight, weightIndex) => (
													<code
														key={`ho-${neuronIndex}-${weightIndex}`}
														className="rounded-md border border-[#dfe6eb] bg-white px-2 py-1 font-mono text-[11px] font-medium tabular-nums text-[#28506c]"
													>
														{weight.toFixed(4)}
													</code>
												))}
											</div>
										</article>
									))}
								</div>
							</section>
						</div>
					) : (
						<div className="grid gap-8 md:grid-cols-2">
							<section>
								<div className="mb-4 flex items-center gap-3">
									<div>
										<h3 className="text-sm font-semibold text-[#24384a]">
											Bias — Camada Oculta
										</h3>

										<p className="mt-1 text-[11px] text-[#8b94a2]">
											{biasHidden.length}{" "}
											{biasHidden.length === 1
												? "neurônio"
												: "neurônios"}
										</p>
									</div>

									<span
										className="h-px flex-1 bg-[#e7eaee]"
										aria-hidden="true"
									/>
								</div>

								<div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
									{biasHidden.map((bias, neuronIndex) => (
										<article
											key={`bias-h-${neuronIndex}`}
											className="rounded-xl border border-[#e4e8ed] bg-[#fbfcfd] px-4 py-3.5"
										>
											<p className="mb-2 text-[11px] font-semibold text-[#52606f]">
												Neurônio {neuronIndex}
											</p>

											<code className="font-mono text-xs font-medium tabular-nums text-[#28506c]">
												{bias.toFixed(4)}
											</code>
										</article>
									))}
								</div>
							</section>

							<section>
								<div className="mb-4 flex items-center gap-3">
									<div>
										<h3 className="text-sm font-semibold text-[#24384a]">
											Bias — Camada de Saída
										</h3>

										<p className="mt-1 text-[11px] text-[#8b94a2]">
											{biasOutput.length}{" "}
											{biasOutput.length === 1
												? "neurônio"
												: "neurônios"}
										</p>
									</div>

									<span
										className="h-px flex-1 bg-[#e7eaee]"
										aria-hidden="true"
									/>
								</div>

								<div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
									{biasOutput.map((bias, neuronIndex) => (
										<article
											key={`bias-o-${neuronIndex}`}
											className="rounded-xl border border-[#e4e8ed] bg-[#fbfcfd] px-4 py-3.5"
										>
											<p className="mb-2 text-[11px] font-semibold text-[#52606f]">
												Neurônio {neuronIndex}
											</p>

											<code className="font-mono text-xs font-medium tabular-nums text-[#28506c]">
												{bias.toFixed(4)}
											</code>
										</article>
									))}
								</div>
							</section>
						</div>
					)}
				</div>

				<footer className="flex justify-end border-t border-[#e7eaee] px-6 py-3">
					<button
						type="button"
						onClick={onClose}
						className="cursor-pointer rounded-lg bg-[#28506c] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#203f55]"
					>
						Fechar
					</button>
				</footer>
			</section>
		</div>
	)
}