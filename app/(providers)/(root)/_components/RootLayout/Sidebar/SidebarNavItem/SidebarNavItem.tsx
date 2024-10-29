'use client';

import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: React.JSX.Element;
}

function SidebarNavItem({ href, icon, label }: SidebarNavItemProps) {
  const pathName = usePathname();
  return (
    <Link
      href={href}
      className={cx(
        'flex items-center gap-x-4 text-gray-400 font-semibold hover:text-red-500 transition py-2.5',
        { 'text-red-500': href === pathName },
      )}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default SidebarNavItem;
