import React from "react";
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session, status } = useSession();

  return (
    <aside className="text-gray-500 p-5 text-sm border-r border-gray-900">
      <div className="space-y-4">
        <p className="cursor-pointer hover:text-white">Playlist ...</p>
        <p className="cursor-pointer hover:text-white">Playlist ...</p>
        <p className="cursor-pointer hover:text-white">Playlist ...</p>
        <p className="cursor-pointer hover:text-white">Playlist ...</p>
        <p className="cursor-pointer hover:text-white">Playlist ...</p>
        <p className="cursor-pointer hover:text-white">Playlist ...</p>
      </div>
    </aside>
  );
};

export default Sidebar;
