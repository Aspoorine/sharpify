import { useQuery } from "@tanstack/react-query";
import { getStats } from "../services/stats";

const fakeStats = [
    { name: 'Number of deploys', value: '405' },
    { name: 'Average deploy time', value: '3.65', unit: 'mins' },
    { name: 'Number of servers', value: '3' },
    { name: 'Success rate', value: '98.5%' },
  ]
  
  export default function StatGrid() {

    const { data: stats, isSuccess } = useQuery({
        queryKey: ["stats"],
        queryFn: () => getStats(),
      });

      console.log(stats)

    return (
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {fakeStats.map((stat) => (
              <div key={stat.name} className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm/6 font-medium text-gray-400">{stat.name}</p>
                <p className="mt-2 flex items-baseline gap-x-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                  {stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  