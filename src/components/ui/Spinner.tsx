import { Loader } from "lucide-react";

export const Spinner = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
    </div>
  );
};
