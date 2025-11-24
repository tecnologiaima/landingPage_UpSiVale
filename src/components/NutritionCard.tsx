import React from "react";

export interface FoodAnalysisData {
    valid: boolean;
    name_ES?: string;
    name_EN?: string;
    quantity?: number;
    energy_kcal?: number;
    carbohydrates_g?: number;
    fat_g?: number;
    protein_g?: number;
}

interface NutritionCardProps {
    data: FoodAnalysisData;
}

export const NutritionCard: React.FC<NutritionCardProps> = ({ data }) => {
    const {
        name_ES,
        name_EN,
        energy_kcal,
        carbohydrates_g,
        fat_g,
        protein_g,
    } = data;

    const displayName = (name_ES || name_EN || "Alimento desconocido").toUpperCase();

    // Configuración del donut
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    const fat = typeof fat_g === "number" && fat_g > 0 ? fat_g : 0;
    const protein = typeof protein_g === "number" && protein_g > 0 ? protein_g : 0;
    const carbs =
        typeof carbohydrates_g === "number" && carbohydrates_g > 0
            ? carbohydrates_g
            : 0;

    const totalMacros = fat + protein + carbs;

    let fatLength = 0;
    let proteinLength = 0;
    let carbsLength = 0;

    if (totalMacros > 0) {
        const fatRatio = fat / totalMacros;
        const proteinRatio = protein / totalMacros;
        const carbsRatio = carbs / totalMacros;

        fatLength = circumference * fatRatio;
        proteinLength = circumference * proteinRatio;
        carbsLength = circumference * carbsRatio;
    }

    const fatOffset = 0;
    const proteinOffset = -fatLength;
    const carbsOffset = -(fatLength + proteinLength);

    return (
        <div className="w-full rounded-3xl p-0 text-white shadow-lg">
            {/* Título */}
            <div className="mb-4">
                <h2 className="text-lg sm:text-xl font-bold leading-tight text-[#d9ff71]">
                    {displayName}
                </h2>
            </div>

            {/* MISMA FILA: Donut (izq) + Info Nutricional (der) */}
            <div className="flex items-start gap-2">
                {/* Donut de kcal - IZQUIERDA */}
                <div className="flex-shrink-0 flex items-center justify-center">
                    <div className="relative flex h-32 w-32 items-center justify-center">
                        <svg className="h-full w-full -rotate-90 transform">
                            {/* Círculo de fondo */}
                            <circle
                                cx="64"
                                cy="64"
                                r={radius}
                                stroke="#0b3a3f"
                                strokeWidth="12"
                                fill="transparent"
                            />

                            {/* Segmentos del pastel (si hay macros) */}
                            {totalMacros > 0 && (
                                <>
                                    {fatLength > 0 && (
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r={radius}
                                            stroke="#fb923c"
                                            strokeWidth="12"
                                            fill="transparent"
                                            strokeDasharray={`${fatLength} ${circumference - fatLength
                                                }`}
                                            strokeDashoffset={fatOffset}
                                            strokeLinecap="round"
                                        />
                                    )}

                                    {proteinLength > 0 && (
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r={radius}
                                            stroke="#f472b6"
                                            strokeWidth="12"
                                            fill="transparent"
                                            strokeDasharray={`${proteinLength} ${circumference - proteinLength
                                                }`}
                                            strokeDashoffset={proteinOffset}
                                            strokeLinecap="round"
                                        />
                                    )}

                                    {carbsLength > 0 && (
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r={radius}
                                            stroke="#22d3ee"
                                            strokeWidth="12"
                                            fill="transparent"
                                            strokeDasharray={`${carbsLength} ${circumference - carbsLength
                                                }`}
                                            strokeDashoffset={carbsOffset}
                                            strokeLinecap="round"
                                        />
                                    )}
                                </>
                            )}
                        </svg>

                        {/* Texto central kcal */}
                        <div className="absolute flex flex-col items-center">
                            <span className="text-2xl font-bold text-[#d9ff71]">
                                {energy_kcal ?? "--"}
                            </span>
                            <span className="text-xs text-[#f3ffe0]">kcal</span>
                        </div>
                    </div>
                </div>

                {/* Información Nutricional - DERECHA */}
                <div className="flex-1 space-y-4">
                    <div>
                        <h3 className="text-lg font-bold text-[#d9ff71]">
                            Información Nutricional
                        </h3>
                        <p className="text-xs text-[#f3ffe0] leading-snug">
                            Esta sección muestra un resumen de los macronutrientes del
                            alimento.
                        </p>
                    </div>

                    <div className="space-y-2 text-sm">
                        {fat_g !== undefined && (
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#fb923c]" />
                                <span className="font-semibold text-[#fb923c]">
                                    Grasas: +{fat_g} g
                                </span>
                            </div>
                        )}
                        {protein_g !== undefined && (
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#f472b6]" />
                                <span className="font-semibold text-[#f472b6]">
                                    Proteínas: +{protein_g} g
                                </span>
                            </div>
                        )}
                        {carbohydrates_g !== undefined && (
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#22d3ee]" />
                                <span className="font-semibold text-[#22d3ee]">
                                    Carbohidratos: +{carbohydrates_g} g
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-6 border-t border-[#1c4a4f] pt-4">
                <p className="text-[10px] text-[#f3ffe0] text-center leading-relaxed">
                    Recuerda que esta información es referencial y puede variar según la
                    preparación y los ingredientes específicos del alimento.
                </p>
            </div>
        </div>
    );
};
