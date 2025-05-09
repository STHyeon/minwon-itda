interface AuthLayoutProps {
  children: React.ReactNode;
}

//
//
//

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="flex flex-col flex-1 bg-info-content">
      <div className="flex flex-col flex-1 relative w-md m-auto bg-[url('/images/bg-auth.png')] bg-contain bg-top bg-no-repeat">
        <div className="absolute bottom-0 w-full h-3/4 p-4 rounded-t-xl bg-base-100 overflow-x-hidden overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
