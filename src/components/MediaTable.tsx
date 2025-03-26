import { MediaItem } from "../../type";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

type MediaTableProps = {
    mediaList: MediaItem[];
};

const statusStyles = {
    Pending: "text-yellow-400 bg-yellow-400/10",
    Uploaded: "text-green-400 bg-green-400/10",
    Error: "text-rose-400 bg-rose-400/10",
    Loading: "text-blue-400 bg-blue-400/10",
};

export default function MediaTable({ mediaList }: MediaTableProps) {
    if (mediaList.length === 0) return null;

    return (
        <div className="py-10 w-full max-w-4xl">
            <h2 className="px-4 text-xl font-semibold text-white sm:px-6 lg:px-8">
                Fichiers
            </h2>
            <table className="mt-6 w-full text-left whitespace-nowrap">
                <thead className="border-b border-white/10 text-sm text-white">
                    <tr>
                        <th className="py-2 pr-8 pl-4 font-semibold">Nom</th>
                        <th className="py-2 pr-8 font-semibold">Taille</th>
                        <th className="py-2 pr-8 font-semibold">Type</th>
                        <th className="py-2 pr-4 text-right font-semibold">
                            Statut
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                    {mediaList.map((item) => (
                        
                        <tr key={item.id}>
                            <td className="py-4 pr-8 pl-4 text-white">
                                {item.name}
                            </td>
                            <td className="py-4 pr-8 text-gray-400">
                                {item.size}
                            </td>
                            <td className="py-4 pr-8 text-gray-400">
                                {item.type}
                            </td>
                            <td className="py-4 pr-4 text-right">
                                <span
                                    className={classNames(
                                        statusStyles[item.status],
                                        "px-2 py-1 rounded-full text-xs font-medium"
                                    )}
                                >
                                    {item.status}
                                </span>
                            </td>                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
