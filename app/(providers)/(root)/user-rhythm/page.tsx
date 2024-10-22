import Link from 'next/link';
import Page from '../_components/Page/Page';

function PlaylistsPage() {
  return (
    <Page title="RHYTHM">
      <section className="w-full h-[480px] grid grid-rows-2 grid-flow-col gap-6 auto-cols-fr">
        <Link
          href={`user-rhythm/k-pop?imgUrl=https://cf.asiaartistawards.com/news/21/2024/05/2024051011141860321_1.jpg`}
        >
          <div className="w-full h-full rounded-md overflow-hidden bg-[url('https://cf.asiaartistawards.com/news/21/2024/05/2024051011141860321_1.jpg')] group grayscale-[20%] relative">
            <p className="opacity-0 group-hover:opacity-100 absolute z-20 text-8xl font-thin top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200">
              K-POP
            </p>
            <div className="object-contain backdrop-blur-sm backdrop-brightness-90 w-full h-full absolute group-hover:backdrop-grayscale-[100%] group-hover:backdrop-brightness-50 group-active:backdrop-brightness-[40%] transition-all duration-200"></div>
            <div className="h-full aspect-[4/3] absolute left-1/2 -translate-x-1/2 overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:grayscale-[100%] group-hover:brightness-50 transition-all duration-200"
                src="https://cf.asiaartistawards.com/news/21/2024/05/2024051011141860321_1.jpg"
                alt="https://cf.asiaartistawards.com/news/21/2024/05/2024051011141860321_1.jpg"
              />
            </div>
          </div>
        </Link>
        <Link href="user-rhythm/pop">
          <div className="w-full h-full rounded-md overflow-hidden bg-[url('https://image.yes24.com/goods/110691746/XL')] group grayscale-[20%] relative">
            <p className="opacity-0 group-hover:opacity-100 absolute z-20 text-8xl font-thin top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200">
              POP
            </p>
            <div className="object-contain backdrop-blur-sm backdrop-brightness-90 w-full h-full absolute group-hover:backdrop-grayscale-[100%] group-hover:backdrop-brightness-50 group-active:backdrop-brightness-[40%] transition-all duration-200"></div>
            <div className="h-full aspect-[4/3] absolute left-1/2 -translate-x-1/2 overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:grayscale-[100%] group-hover:brightness-50 transition-all duration-200"
                src="https://image.yes24.com/goods/110691746/XL"
                alt="https://image.yes24.com/goods/110691746/XL"
              />
            </div>
          </div>
        </Link>
        <Link href="user-rhythm/j-pop">
          <div className="w-full h-full rounded-md overflow-hidden bg-[url('https://i.namu.wiki/i/Ql3pHzdIzbAQm50q4rEtjY8AYskA4BteBMo3ly63UMJTeUBxZZGxSBZ4VEaKcFGpuV3oCXmdUK55SgwVimMWVN8e1oZ5TpZzCqoQRXLBaOavSKMGOo5GFjXW_IiRmHUFeNf7RLrn2psiriosIplH8Q.webp')] group grayscale-[20%] relative">
            <p className="opacity-0 group-hover:opacity-100 absolute z-20 text-8xl font-thin top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200">
              J-POP
            </p>
            <div className="object-contain backdrop-blur-sm backdrop-brightness-90 w-full h-full absolute group-hover:backdrop-grayscale-[100%] group-hover:backdrop-brightness-50 group-active:backdrop-brightness-[40%] transition-all duration-200"></div>
            <div className="h-full aspect-[4/3] absolute left-1/2 -translate-x-1/2 overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:grayscale-[100%] group-hover:brightness-50 transition-all duration-200"
                src="https://i.namu.wiki/i/Ql3pHzdIzbAQm50q4rEtjY8AYskA4BteBMo3ly63UMJTeUBxZZGxSBZ4VEaKcFGpuV3oCXmdUK55SgwVimMWVN8e1oZ5TpZzCqoQRXLBaOavSKMGOo5GFjXW_IiRmHUFeNf7RLrn2psiriosIplH8Q.webp"
                alt="https://i.namu.wiki/i/Ql3pHzdIzbAQm50q4rEtjY8AYskA4BteBMo3ly63UMJTeUBxZZGxSBZ4VEaKcFGpuV3oCXmdUK55SgwVimMWVN8e1oZ5TpZzCqoQRXLBaOavSKMGOo5GFjXW_IiRmHUFeNf7RLrn2psiriosIplH8Q.webp"
              />
            </div>
          </div>
        </Link>
        <Link href="user-rhythm/ballade">
          <div className="w-full h-full rounded-md overflow-hidden bg-[url('https://img.vogue.co.kr/vogue/2021/06/style_60d57fc23f951-930x620.jpeg')] group grayscale-[20%] relative">
            <p className="opacity-0 group-hover:opacity-100 absolute z-20 text-8xl font-thin top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-200">
              BALLADE
            </p>
            <div className="object-contain backdrop-blur-sm backdrop-brightness-90 w-full h-full absolute group-hover:backdrop-grayscale-[100%] group-hover:backdrop-brightness-50 group-active:backdrop-brightness-[40%] transition-all duration-200"></div>
            <div className="h-full aspect-[4/3] absolute left-1/2 -translate-x-1/2 overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:grayscale-[100%] group-hover:brightness-50 transition-all duration-200"
                src="https://img.vogue.co.kr/vogue/2021/06/style_60d57fc23f951-930x620.jpeg"
                alt="https://img.vogue.co.kr/vogue/2021/06/style_60d57fc23f951-930x620.jpeg"
              />
            </div>
          </div>
        </Link>
      </section>
    </Page>
  );
}

export default PlaylistsPage;
