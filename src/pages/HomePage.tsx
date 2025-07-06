import { Link } from "react-router-dom";
import {
    PhotoIcon,
    DocumentDuplicateIcon,
    ChartPieIcon,
    ArrowRightIcon,
    SparklesIcon,
    BoltIcon,
    CloudArrowUpIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 pb-8 px-2 flex flex-col items-center justify-center space-y-12 text-center">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                        <SparklesIcon className="h-8 w-8 text-indigo-400" />
                        <h1 className="text-5xl font-bold text-white">
                            Sharpify
                        </h1>
                    </div>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Optimisez et convertissez vos images en quelques clics.
                        Une solution moderne pour tous vos besoins de traitement
                        d'images.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/convert"
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                        <PhotoIcon className="h-5 w-5 mr-2" />
                        Commencer la conversion
                        <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Link>
                    <Link
                        to="/documents"
                        className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
                    >
                        <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                        Voir mes documents
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto w-full">
                <h2 className="text-3xl font-bold text-white mb-12">
                    Fonctionnalités principales
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                        <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-lg mb-4 mx-auto">
                            <CloudArrowUpIcon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                            Upload par Drag & Drop
                        </h3>
                        <p className="text-gray-400">
                            Glissez-déposez vos images directement dans
                            l'interface. Support de multiples fichiers pour un
                            traitement en lot.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mb-4 mx-auto">
                            <BoltIcon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                            Conversion rapide
                        </h3>
                        <p className="text-gray-400">
                            Convertissez vers WebP, AVIF, JPEG ou PNG. Optimisez
                            la qualité et redimensionnez selon vos besoins.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-4 mx-auto">
                            <DocumentDuplicateIcon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                            Gestion des documents
                        </h3>
                        <p className="text-gray-400">
                            Visualisez, téléchargez et gérez tous vos fichiers
                            convertis dans une interface intuitive et organisée.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4 mx-auto">
                            <ChartPieIcon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                            Statistiques détaillées
                        </h3>
                        <p className="text-gray-400">
                            Suivez vos conversions, optimisations et
                            l'utilisation de votre espace de stockage en temps
                            réel.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                        <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-lg mb-4 mx-auto">
                            <SparklesIcon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                            Interface moderne
                        </h3>
                        <p className="text-gray-400">
                            Design sombre élégant avec une navigation fluide.
                            Responsive et optimisé pour tous les appareils.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                        <div className="flex items-center justify-center w-12 h-12 bg-teal-600 rounded-lg mb-4 mx-auto">
                            <PhotoIcon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                            Formats supportés
                        </h3>
                        <p className="text-gray-400">
                            Support complet des formats modernes : WebP, AVIF,
                            ainsi que les classiques JPEG et PNG.
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="max-w-4xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/30">
                        <div className="text-3xl font-bold text-indigo-400 mb-2">
                            4
                        </div>
                        <div className="text-gray-400">Formats supportés</div>
                    </div>
                    <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/30">
                        <div className="text-3xl font-bold text-green-400 mb-2">
                            ∞
                        </div>
                        <div className="text-gray-400">Images par batch</div>
                    </div>
                    <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/30">
                        <div className="text-3xl font-bold text-purple-400 mb-2">
                            100%
                        </div>
                        <div className="text-gray-400">Gratuit</div>
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div className="text-center space-y-4">
                <p className="text-gray-400">Prêt à optimiser vos images ?</p>
                <Link
                    to="/convert"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                    <PhotoIcon className="h-5 w-5 mr-2" />
                    Commencer maintenant
                    <ArrowRightIcon className="h-5 w-5 ml-2" />
                </Link>
            </div>
        </div>
    );
}
