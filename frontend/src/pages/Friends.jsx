import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { UsersIcon } from "lucide-react";

const Friends = () => {
  const {
    data: friends = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <UsersIcon className="size-6 opacity-70" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h1>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="alert alert-error">
            Failed to load friends. Please try again.
          </div>
        )}

        {/* Empty state */}
        {!isLoading && friends.length === 0 && <NoFriendsFound />}

        {/* Friends Grid */}
        {!isLoading && friends.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
