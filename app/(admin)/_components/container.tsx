import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-h-[750px] overflow-y-auto rounded-md bg-gray-200 bg-opacity-90 p-8 shadow-lg lg:max-h-full lg:w-[800px] xl:w-full">
      {children}
    </div>
  );
};

export default Container;
