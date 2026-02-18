import React from 'react';
import { Users, MapPin, Handshake, Download } from 'lucide-react';

const Main = ({ onLoading, onFilteredProgrammes }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            {onLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-light rounded-lg shadow-md overflow-hidden animate-pulse">
                            <div className="h-48 sm:h-56 bg-skeleton1"></div>
                            <div className="p-5 sm:p-6 space-y-3">
                                <div className="h-6 bg-skeleton1 rounded w-3/4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-skeleton2 rounded"></div>
                                    <div className="h-4 bg-skeleton2 rounded w-5/6"></div>
                                </div>
                                <div className="h-10 bg-skeleton1 rounded w-1/3"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : onFilteredProgrammes.length > 0 ? (
                <>
                    <div className="text-center mb-8">
                        <p className="text-skeleton2 text-sm sm:text-base">
                            {onFilteredProgrammes.length} programme{onFilteredProgrammes.length > 1 ? 's' : ''} trouv\u00e9{onFilteredProgrammes.length > 1 ? 's' : ''}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {onFilteredProgrammes.map((p) => (
                            <div
                                key={p.id}
                                className="bg-light rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-light_gray group hover:-translate-y-2"
                            >
                                <div className="relative overflow-hidden h-48 sm:h-56">
                                    <img
                                        src={p.image}
                                        alt={p.title_fr}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                                        <span
                                            className={`inline-block text-xs sm:text-sm font-bold px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg shadow-lg ${
                                                p.status === "En cours"
                                                    ? "bg-beta text-light"
                                                    : "bg-alpha text-light"
                                            }`}
                                        >
                                            {p.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6">
                                    <h2 className="text-lg sm:text-xl font-bold mb-3 text-alpha group-hover:text-beta transition-colors duration-300 line-clamp-2">
                                        {p.title_fr}
                                    </h2>
                                    <p className="text-skeleton2 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
                                        {p.summary_fr}
                                    </p>

                                    {/* Impact indicators */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {p.beneficiaires && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-beta)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-alpha)]">
                                                <Users className="h-3 w-3" />
                                                {p.beneficiaires.toLocaleString('fr-FR')}
                                            </span>
                                        )}
                                        {p.region && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-beta)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-alpha)]">
                                                <MapPin className="h-3 w-3" />
                                                {p.region}
                                            </span>
                                        )}
                                        {p.partenaires && p.partenaires.length > 0 && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-beta)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-alpha)]">
                                                <Handshake className="h-3 w-3" />
                                                {p.partenaires.join(', ')}
                                            </span>
                                        )}
                                        {p.budget && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-beta)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-alpha)]">
                                                {p.budget}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-alpha text-light px-4 py-3 rounded-lg text-sm font-semibold hover:bg-beta transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                            <span>En savoir plus</span>
                                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        <button
                                            className="flex items-center justify-center gap-1.5 rounded-lg border-2 border-alpha px-3 py-3 text-sm font-semibold text-alpha hover:bg-alpha hover:text-light transition-all duration-300 active:scale-95"
                                            title="T\u00e9l\u00e9charger la fiche projet"
                                        >
                                            <Download className="h-4 w-4" />
                                            <span className="hidden sm:inline">PDF</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-16 sm:py-20">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-light_gray rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-skeleton2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-alpha mb-3">
                        Aucun programme trouv\u00e9
                    </h3>
                    <p className="text-skeleton2 text-sm sm:text-base mb-6 max-w-md mx-auto">
                        Il n'y a pas de programmes disponibles pour ce filtre.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Main;
