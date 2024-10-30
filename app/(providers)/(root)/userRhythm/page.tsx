import Link from 'next/link';
import Page from '../_components/Page/Page';
import { getCategories } from '@/api/supabaseGetCategories';

export const revalidate = 0;

async function PlaylistsPage() {
  const categories = await getCategories();

  return (
    <Page title="RHYTHM">
      <section>
        <ul className="w-full h-[480px] grid grid-rows-2 grid-flow-col gap-6 auto-cols-fr">
          {categories?.map((category) => (
            <li key={category.id}>
              <Link href={`userRhythm/${category?.name}`}>
                <div className="w-full h-full rounded-md overflow-hidden group relative">
                  <img
                    className="w-full h-full object-cover grayscale-[20%] absolute"
                    src={category?.url}
                    alt={category?.name}
                  />
                  <p className="opacity-0 group-hover:opacity-100 absolute z-20 text-8xl font-thin top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200">
                    {category.name}
                  </p>
                  <div className="object-contain backdrop-blur-sm backdrop-brightness-90 w-full h-full absolute group-hover:backdrop-grayscale-[100%] group-hover:backdrop-brightness-50 group-active:backdrop-brightness-[40%] transition-all duration-200"></div>
                  <div className="h-full aspect-[4/3] absolute left-1/2 -translate-x-1/2 overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:grayscale-[100%] group-hover:brightness-50 transition-all duration-200"
                      src={category?.url}
                      alt={category?.name}
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}

export default PlaylistsPage;
