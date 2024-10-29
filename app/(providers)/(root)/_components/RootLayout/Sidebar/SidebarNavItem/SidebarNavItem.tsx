import Link from 'next/link';

interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: React.JSX.Element;
}

function SidebarNavItem({ href, icon, label }: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-x-4 text-gray-400 font-semibold hover:text-red-500 transition py-2.5"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default SidebarNavItem;
