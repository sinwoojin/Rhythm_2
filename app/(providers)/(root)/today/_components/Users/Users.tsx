'use client';

import { api } from '@/api/spotifyApi';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

function Users() {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.getUser.getUserProfiles(),
  });

  return (
    <div>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <Link href={`profiles/${user.id}`}>
              <p>{user.userName}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
