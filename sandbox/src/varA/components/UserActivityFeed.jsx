import React from 'react';

export default function UserActivityFeed() {
  const data = [
    { id: 1, user: 'John Doe', action: 'Logged in', timestamp: '2022-01-01 12:00:00' },
    { id: 2, user: 'Jane Doe', action: 'Created a new account', timestamp: '2022-01-02 13:00:00' },
    { id: 3, user: 'Bob Smith', action: 'Viewed a report', timestamp: '2022-01-03 14:00:00' }
  ];

  return (
    <div className="bg-zinc-800 py-4 px-6 rounded-lg mt-4 lg:mt-6 xl:mt-8">
      <h2 className="text-lg font-medium text-gray-200">User Activity Feed</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="py-2 lg:py-4">
            <span>{item.user}</span> {item.action} at {item.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
}