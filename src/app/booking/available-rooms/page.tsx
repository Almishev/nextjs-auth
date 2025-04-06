import Image from 'next/image'
import Link from 'next/link'
import type { Room } from '@/types/room'
import { headers } from 'next/headers'

interface Props {
  searchParams: {
    startDate: string;
    endDate: string;
    guests: string;
    name: string;
    email: string;
    phone: string;
  }
}

export default async function AvailableRooms({ searchParams }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bg-BG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  
  const host = headers().get("host");
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
  
  const response = await fetch(`${protocol}://${host}/api/rooms/available?` + 
    new URLSearchParams({
      startDate: searchParams.startDate,
      endDate: searchParams.endDate,
      guests: searchParams.guests
    }),
    {
      cache: 'no-store'
    }
  );
  
  const data = await response.json();
  const availableRoomsFromAPI = data.rooms as Room[];

  return (
    <div>
      <section className="h-[250px] bg-black/50 bg-[url('/images/hotel-hero.jpg')] bg-no-repeat bg-center bg-cover bg-blend-overlay flex items-center justify-center text-center text-white mb-8">
        <div className="max-w-3xl px-5">
          <h1 className="text-4xl font-bold mb-2">Свободни стаи</h1>
          <p className="text-xl">
            За {searchParams.guests} {+searchParams.guests === 1 ? 'гост' : 'гости'} от {formatDate(searchParams.startDate)} до {formatDate(searchParams.endDate)}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableRoomsFromAPI.length > 0 ? (
            availableRoomsFromAPI.map((room: Room) => (
              <div key={room._id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                <div className="relative h-64">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  <span className="block mb-4 text-gray-800">От {room.price}лв / вечер</span>
                  <Link 
                    href={`/booking/confirm?roomId=${room._id}&startDate=${searchParams.startDate}&endDate=${searchParams.endDate}&guests=${searchParams.guests}&name=${searchParams.name}&email=${searchParams.email}&phone=${searchParams.phone}`}
                    className="w-full block py-3 px-4 bg-indigo-400 hover:bg-indigo-500 text-center text-white rounded-lg font-medium transition-colors"
                  >
                    Резервирай сега
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-600 py-8 bg-gray-100 rounded-lg">
              Няма налични стаи за избрания период.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
