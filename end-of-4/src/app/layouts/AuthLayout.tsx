const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-bg min-h-screen min-w-screen p-12">
      <div className="grid grid-cols-2 min-h-[calc(100vh-96px)] rounded-xl border-2 border-[#D6D5C5]">
        <div className="relative center bg-[url('/images/bg.png')] bg-repeat rounded-l-xl">
          <div className="-top-[100px] relative">
            <img src="/images/logo.svg" alt="Apply Wize" className="mx-auto" />
            <div className="text-5xl text-white font-bold">Apply Wize</div>
          </div>
          <div className="text-white text-sm absolute bottom-0 left-0 right-0 p-10">
            “Transform the job hunt from a maze into a map.”
          </div>
        </div>
        <div className="center bg-white rounded-r-xl relative">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export { AuthLayout };
